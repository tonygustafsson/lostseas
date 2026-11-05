"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { useAmbienceCanvas } from "@/components/game-ui/LocationScene/useAmbienceCanvas"
import { TOWNS } from "@/constants/locations"
import { SEA_TRAVEL_SPEED } from "@/constants/sea"

import {
  MAP_HEIGHT,
  MAP_IMAGE_HEIGHT,
  MAP_IMAGE_WIDTH,
  MAP_WIDTH,
  MAP_ZOOM,
  mapColorVariables,
} from "./constants"
import { createFishJumps, getWaterLookup } from "./fishJumps"
import { createSeaMapRenderer } from "./seaMapShader"
import SeaMapTowns from "./SeaMapTowns"
import {
  getDrawnRoute,
  getJourneyOrigin,
  getRouteLength,
  getSeaRoute,
  getTownIconCentre,
  type Point,
  splitRoute,
  startAtTownIcon,
  stopAtTownIcon,
} from "./seaRoutes"
import {
  getShipDirection,
  SHIP_FRAMES,
  SHIP_SPRITE,
  SHIP_SPRITE_FRAME,
} from "./shipFrames"
import Tooltip from "./Tooltip"

const MAP_CENTER = { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 }
const FRAME_INTERVAL = 1000 / 30
// Size of a whole sprite frame in map units, the ship fills most of it
const SHIP_SIZE = 22
const DOCKED_SHIP_FRAME = SHIP_FRAMES.down
const WATER_MASKS = ["/img/map/spanish-main-mask.png"]

const imageCache: Record<string, HTMLImageElement> = {}

const getCachedImage = (src: string) => {
  if (!imageCache[src]) {
    imageCache[src] = new window.Image()
    imageCache[src].src = src
  }

  return imageCache[src]
}

type Props = {
  currentTown?: Town
  journey?: Journey
  isPaused?: boolean
  selectedTown?: Town
  suppliesDays?: number
  onSelectTown?: (town: Town) => void
}

const SeaMapCanvas = ({
  currentTown,
  journey,
  isPaused = false,
  selectedTown,
  suppliesDays,
  onSelectTown,
}: Props) => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const mapImageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animation = useRef({ routeKey: "", progress: 0 })
  // Kept across redraws, so hovering a town doesn't restart the fish
  const fish = useRef<ReturnType<typeof createFishJumps> | null>(null)
  // Wave crests on the water, panned along with the map
  const ambienceRef = useAmbienceCanvas(
    mapImageRef,
    createSeaMapRenderer,
    WATER_MASKS
  )
  const camera = useRef({ ...MAP_CENTER, scale: 1, scaleY: 1 })
  const centeredTown = useRef<Town | undefined>(undefined)
  const drag = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    moved: false,
    suppressClick: false,
  })

  const [hovered, setHovered] = useState<{
    town: Town
    top: number
    left: number
  } | null>(null)

  const origin = journey ? getJourneyOrigin(journey) : undefined
  const destination = journey?.destination
  const startProgress = journey ? (journey.day - 1) / journey.totalDays : 0
  const targetProgress = journey ? journey.day / journey.totalDays : 0
  const previewTown = hovered?.town ?? selectedTown
  const isAtSea = !!journey

  useEffect(() => {
    const viewport = viewportRef.current
    const background = backgroundRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!viewport || !background || !canvas || !context) return

    const route =
      origin && destination ? getSeaRoute(origin, destination) : null
    const routeLength = route ? getRouteLength(route) : 0
    // The ship sails the sea route, the lines are drawn on to the town icons
    const drawnRoute =
      origin && destination ? getDrawnRoute(origin, destination) : null
    const previewRoute =
      currentTown && previewTown && !isAtSea
        ? getDrawnRoute(currentTown, previewTown)
        : null
    const routeKey = `${origin}|${destination}`

    if (animation.current.routeKey !== routeKey) {
      animation.current = { routeKey, progress: startProgress }
    }

    if (!isAtSea && centeredTown.current !== currentTown) {
      const center = currentTown ? getTownIconCentre(currentTown) : MAP_CENTER
      camera.current.x = center.x
      camera.current.y = center.y
      centeredTown.current = currentTown
    }

    const fromProgress = animation.current.progress
    const toProgress = isPaused ? fromProgress : targetProgress
    const startTime = performance.now()
    const shipImage = getCachedImage(SHIP_SPRITE)
    const styles = getComputedStyle(canvas)
    const readColor = (name: keyof typeof mapColorVariables) =>
      styles.getPropertyValue(mapColorVariables[name]).trim()
    const shipGlowColor = readColor("shipGlow")
    const trailColor = readColor("trail")
    const trailTravelledColor = readColor("trailTravelled")
    const fishColors = {
      fish: readColor("fish"),
      blueFish: readColor("blueFish"),
      splash: readColor("fishSplash"),
    }
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (!prefersReducedMotion) {
      fish.current ??= createFishJumps()
    }

    // Motion may have been reduced after the fish were created
    const fishJumps = prefersReducedMotion ? null : fish.current
    const waterMask = getCachedImage(WATER_MASKS[0])
    let previousTransform = ""

    // Align the DOM background and transparent canvas to the same camera.
    const prepareFrame = (shipPosition?: Point) => {
      if (shipPosition) {
        camera.current.x = shipPosition.x
        camera.current.y = shipPosition.y
      }

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const width = viewport.clientWidth
      const height = viewport.clientHeight
      const canvasWidth = Math.round(width * pixelRatio)
      const canvasHeight = Math.round(height * pixelRatio)

      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
        canvas.width = canvasWidth
        canvas.height = canvasHeight
      }

      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, canvasWidth, canvasHeight)

      const mapImage = mapImageRef.current
      const mapYScale = mapImage?.naturalWidth
        ? (MAP_WIDTH * mapImage.naturalHeight) /
          (mapImage.naturalWidth * MAP_HEIGHT)
        : 1
      const scale =
        Math.max(1, width / MAP_WIDTH, height / MAP_HEIGHT) * MAP_ZOOM
      const scaleY = scale * mapYScale

      // Keep the camera inside the map so its edge never shows. The map always
      // covers the viewport, so there is always room to do so. At sea the
      // ship drifts off centre near an edge instead.
      const halfWidth = width / 2 / scale
      const halfHeight = height / 2 / scaleY
      camera.current.x = Math.min(
        Math.max(camera.current.x, halfWidth),
        MAP_WIDTH - halfWidth
      )
      camera.current.y = Math.min(
        Math.max(camera.current.y, halfHeight),
        MAP_HEIGHT - halfHeight
      )

      const offsetX = width / 2 - camera.current.x * scale
      const offsetY = height / 2 - camera.current.y * scaleY
      const transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale}, ${scaleY})`

      camera.current.scale = scale
      camera.current.scaleY = scaleY

      if (previousTransform !== transform) {
        background.style.transform = transform
        previousTransform = transform
      }

      context.setTransform(
        scale * pixelRatio,
        0,
        0,
        scaleY * pixelRatio,
        offsetX * pixelRatio,
        offsetY * pixelRatio
      )
    }

    const drawDashedRoute = (points: Point[], color: string) => {
      context.save()
      context.strokeStyle = color
      context.lineWidth = 2
      context.setLineDash([4, 4])
      context.beginPath()
      points.forEach(({ x, y }, i) =>
        i === 0 ? context.moveTo(x, y) : context.lineTo(x, y)
      )
      context.stroke()
      context.restore()
    }

    const drawShip = (
      { x, y }: Point,
      now: number,
      shipFrame = DOCKED_SHIP_FRAME
    ) => {
      const radius = SHIP_SIZE * 0.9
      const glow = context.createRadialGradient(x, y, 0, x, y, radius)
      glow.addColorStop(0, shipGlowColor)
      glow.addColorStop(1, "transparent")

      context.save()
      context.globalAlpha = 0.65
      context.fillStyle = glow
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fill()
      context.globalAlpha = 1

      if (shipImage.complete && shipImage.naturalWidth > 0) {
        // Narrow views are drawn a bit larger, see SHIP_FRAMES
        const scale = (SHIP_SIZE / SHIP_SPRITE_FRAME) * shipFrame.scale
        const width = shipFrame.width * scale
        const height = shipFrame.height * scale
        // The ship bobs on the waves, unless motion is reduced
        const wave = prefersReducedMotion
          ? 0
          : Math.sin((now / 1500) * Math.PI * 2)

        context.drawImage(
          shipImage,
          shipFrame.x,
          shipFrame.y,
          shipFrame.width,
          shipFrame.height,
          x - width / 2,
          y - height / 2 + wave * 0.5,
          width,
          height
        )
      }

      context.restore()
    }

    // Animate only the ship and route; map imagery and towns stay in the DOM.
    let frame = 0
    let lastDrawTime = -Infinity

    const drawFrame = (now: number) => {
      frame = requestAnimationFrame(drawFrame)
      if (document.hidden || now - lastDrawTime < FRAME_INTERVAL) return
      lastDrawTime = Number.isFinite(lastDrawTime)
        ? now - ((now - lastDrawTime) % FRAME_INTERVAL)
        : now

      const elapsed = Math.min(1, (now - startTime) / SEA_TRAVEL_SPEED)
      const progress = fromProgress + (toProgress - fromProgress) * elapsed
      const routeProgress = route
        ? splitRoute(route, progress, routeLength)
        : null

      prepareFrame(
        isAtSea ? (routeProgress?.position ?? MAP_CENTER) : undefined
      )

      if (fishJumps && waterMask.complete && waterMask.naturalWidth > 0) {
        const isOpenWater = getWaterLookup(waterMask)
        const { x, y, scale, scaleY } = camera.current
        const halfWidth = viewport.clientWidth / 2 / scale
        const halfHeight = viewport.clientHeight / 2 / scaleY

        if (isOpenWater) {
          fishJumps.update(
            now,
            {
              left: x - halfWidth,
              top: y - halfHeight,
              right: x + halfWidth,
              bottom: y + halfHeight,
            },
            isOpenWater
          )
          fishJumps.draw(context, now, fishColors)
        }
      }

      if (previewRoute) drawDashedRoute(previewRoute, trailColor)

      if (route && routeProgress) {
        animation.current.progress = progress
        drawDashedRoute(drawnRoute ?? route, trailColor)
        // Trimmed at both town icons, like the route it is drawn over
        drawDashedRoute(
          origin && destination
            ? stopAtTownIcon(
                startAtTownIcon(routeProgress.travelledRoute, origin),
                destination
              )
            : routeProgress.travelledRoute,
          trailTravelledColor
        )

        drawShip(
          routeProgress.position,
          now,
          SHIP_FRAMES[getShipDirection(routeProgress.heading)]
        )
      } else if (currentTown && !isAtSea) {
        drawShip(TOWNS[currentTown].map.harbor, now)
      }
    }

    const panWithWheel = (event: WheelEvent) => {
      if (isAtSea) return

      event.preventDefault()
      camera.current.x += event.deltaX / camera.current.scale
      camera.current.y += event.deltaY / camera.current.scaleY
    }

    viewport.addEventListener("wheel", panWithWheel, { passive: false })
    frame = requestAnimationFrame(drawFrame)

    return () => {
      cancelAnimationFrame(frame)
      viewport.removeEventListener("wheel", panWithWheel)
    }
  }, [
    origin,
    destination,
    startProgress,
    targetProgress,
    isPaused,
    currentTown,
    isAtSea,
    previewTown,
  ])

  const startPanning = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isAtSea || event.button !== 0) return

    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      moved: false,
      suppressClick: false,
    }
  }

  const panMap = (event: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current.pointerId !== event.pointerId) return

    const deltaX = event.clientX - drag.current.lastX
    const deltaY = event.clientY - drag.current.lastY
    drag.current.lastX = event.clientX
    drag.current.lastY = event.clientY
    drag.current.moved ||=
      Math.hypot(
        event.clientX - drag.current.startX,
        event.clientY - drag.current.startY
      ) > 2

    if (drag.current.moved) {
      // Capture only after dragging starts so a town still receives a click.
      event.currentTarget.setPointerCapture(event.pointerId)
      camera.current.x -= deltaX / camera.current.scale
      camera.current.y -= deltaY / camera.current.scaleY
      setHovered(null)
    }
  }

  const stopPanning = (event: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current.pointerId !== event.pointerId) return

    drag.current.suppressClick = drag.current.moved
    drag.current.pointerId = -1
  }

  const cancelPanning = () => {
    drag.current.pointerId = -1
    drag.current.moved = false
    drag.current.suppressClick = false
  }

  const hideTownTooltip = () => setHovered(null)

  const showTownTooltip = (
    town: Town,
    event: React.PointerEvent<HTMLButtonElement>
  ) => {
    if (drag.current.moved && drag.current.pointerId !== -1) return

    setHovered({ town, top: event.clientY + 20, left: event.clientX + 20 })
  }

  // Bring keyboard-focused towns into view without moving the map on a mouse click.
  const focusTown = (
    town: Town,
    event: React.FocusEvent<HTMLButtonElement>
  ) => {
    const viewport = viewportRef.current
    if (!viewport || !event.currentTarget.matches(":focus-visible")) return

    const { x, y } = getTownIconCentre(town)
    camera.current.x = x
    camera.current.y = y
    const rect = viewport.getBoundingClientRect()

    setHovered({
      town,
      top: rect.top + rect.height / 2 + 20,
      left: rect.left + rect.width / 2 + 20,
    })
  }

  const selectTown = (
    town: Town,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (drag.current.suppressClick && event.detail !== 0) {
      drag.current.suppressClick = false
      return
    }

    onSelectTown?.(town)
  }

  return (
    <div
      ref={viewportRef}
      className={`relative mx-auto aspect-850/540 w-full touch-none overflow-clip bg-neutral-700 opacity-80 lg:max-w-7xl portrait:aspect-auto portrait:h-[calc(95dvh-8rem)] ${isAtSea ? "" : "cursor-grab active:cursor-grabbing"}`}
      onPointerDown={startPanning}
      onPointerMove={panMap}
      onPointerUp={stopPanning}
      onPointerCancel={cancelPanning}
      onPointerLeave={(event) => {
        hideTownTooltip()
        if (!event.currentTarget.hasPointerCapture(drag.current.pointerId)) {
          cancelPanning()
        }
      }}
    >
      <div
        ref={backgroundRef}
        className="absolute top-0 left-0 origin-top-left will-change-transform select-none"
        style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
      >
        <Image
          ref={mapImageRef}
          src="/img/map/spanish-main.png"
          alt=""
          width={MAP_IMAGE_WIDTH}
          height={MAP_IMAGE_HEIGHT}
          loading="eager"
          draggable={false}
          className="pointer-events-none absolute inset-0 size-full"
        />

        <div
          ref={ambienceRef}
          className="pointer-events-none absolute inset-0"
        />

        <SeaMapTowns
          currentTown={currentTown}
          suppliesDays={suppliesDays}
          canSelectTowns={!!onSelectTown && !isAtSea}
          onHoverTown={showTownTooltip}
          onLeaveTown={hideTownTooltip}
          onFocusTown={focusTown}
          onSelectTown={selectTown}
        />
      </div>

      <canvas
        ref={canvasRef}
        role="img"
        aria-label={
          journey
            ? `Sea map, sailing to ${journey.destination}`
            : "Sea map of the Spanish Main"
        }
        className="pointer-events-none absolute inset-0 size-full"
      />

      <Tooltip
        show={!!hovered}
        currentTown={currentTown}
        destination={hovered?.town}
        suppliesDays={suppliesDays}
        top={hovered?.top}
        left={hovered?.left}
      />
    </div>
  )
}

export default SeaMapCanvas
