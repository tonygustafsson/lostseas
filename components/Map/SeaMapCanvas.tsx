"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { TOWNS } from "@/constants/locations"
import { SEA_TRAVEL_SPEED } from "@/constants/sea"
import { type Point, splitRoute } from "@/utils/seaPath"
import { getJourneyOrigin, getSeaRoute } from "@/utils/seaRoutes"

import Tooltip from "./Tooltip"

const MAP_WIDTH = 850
const MAP_HEIGHT = 540
const MAP_CENTER = { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 }
const MAP_ZOOM = 1.5
const FRAME_INTERVAL = 1000 / 30
const TOWN_SIZE = 12
const TOWN_ANCHOR_SIZE = 20
const TOWN_HIT_PADDING = 6
const SHIP_WIDTH = 12
const SEA_SHIP_WIDTH = 16
const SHIP_ASPECT_RATIO = 494 / 642

const colors = {
  lightBlue: "#3e9cbe",
  darkBlue: "#00435c",
  black: "#000",
  trail: "oklch(0.577 0.245 27.325 / 0.6)",
  trailTravelled: "oklch(0.577 0.245 27.325)",
}

const imageCache: Record<string, HTMLImageElement> = {}

const getCachedImage = (src: string) => {
  if (!imageCache[src]) {
    imageCache[src] = new window.Image()
    imageCache[src].src = src
  }

  return imageCache[src]
}

const towns = Object.keys(TOWNS) as Town[]

type Props = {
  currentTown?: Town
  journey?: Journey
  isPaused?: boolean
  onSelectTown?: (town: Town) => void
}

const SeaMapCanvas = ({
  currentTown,
  journey,
  isPaused = false,
  onSelectTown,
}: Props) => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const mapImageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animation = useRef({ routeKey: "", progress: 0 })
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
  const hoveredTown = hovered?.town
  const isAtSea = !!journey

  useEffect(() => {
    const viewport = viewportRef.current
    const background = backgroundRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!viewport || !background || !canvas || !context) return

    const route =
      origin && destination ? getSeaRoute(origin, destination) : null
    const previewRoute =
      currentTown && hoveredTown && !isAtSea
        ? getSeaRoute(currentTown, hoveredTown)
        : null
    const routeKey = `${origin}|${destination}`

    if (animation.current.routeKey !== routeKey) {
      animation.current = { routeKey, progress: startProgress }
    }

    if (!isAtSea && centeredTown.current !== currentTown) {
      const center = currentTown ? TOWNS[currentTown].map : MAP_CENTER
      camera.current.x = center.x
      camera.current.y = center.y
      centeredTown.current = currentTown
    }

    const fromProgress = animation.current.progress
    const toProgress = isPaused ? fromProgress : targetProgress
    const startTime = performance.now()
    const shipImage = getCachedImage("/img/logo.svg")
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

    const drawShip = ({ x, y }: Point, now: number, flip = false) => {
      const width = isAtSea ? SEA_SHIP_WIDTH : SHIP_WIDTH
      const boxSize = width + (isAtSea ? 1 : 2)

      context.save()
      context.fillStyle = colors.lightBlue
      context.strokeStyle = colors.black
      context.lineWidth = 0.75
      context.fillRect(x - boxSize / 2, y - boxSize / 2, boxSize, boxSize)
      context.strokeRect(x - boxSize / 2, y - boxSize / 2, boxSize, boxSize)

      if (shipImage.complete && shipImage.naturalWidth > 0) {
        const height = width * SHIP_ASPECT_RATIO
        const wave = Math.sin((now / 1500) * Math.PI * 2)

        context.translate(x, y + wave * 0.5)
        context.rotate((wave * 3 * Math.PI) / 180)
        if (flip) context.scale(-1, 1)
        context.drawImage(shipImage, -width / 2, -height / 2, width, height)
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
      const routeProgress = route ? splitRoute(route, progress) : null

      prepareFrame(
        isAtSea ? (routeProgress?.position ?? MAP_CENTER) : undefined
      )

      if (previewRoute) drawDashedRoute(previewRoute, colors.trailTravelled)

      if (route && routeProgress) {
        animation.current.progress = progress
        drawDashedRoute(route, colors.trail)
        drawDashedRoute(routeProgress.travelledRoute, colors.trailTravelled)
        drawShip(routeProgress.position, now, routeProgress.heading.x < 0)
      } else if (currentTown && !isAtSea) {
        const { x, y } = TOWNS[currentTown].map
        drawShip({ x: x - 9, y: y + 7 }, now)
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
    hoveredTown,
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

    const { x, y } = TOWNS[town].map
    camera.current.x = x + TOWN_ANCHOR_SIZE / 2
    camera.current.y = y + TOWN_ANCHOR_SIZE / 2
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
        setHovered(null)
        if (!event.currentTarget.hasPointerCapture(drag.current.pointerId)) {
          cancelPanning()
        }
      }}
    >
      <div
        ref={backgroundRef}
        className="absolute top-0 left-0 origin-top-left select-none"
        style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
      >
        <Image
          ref={mapImageRef}
          src="/img/map/spanish-main.png"
          alt=""
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          unoptimized
          loading="eager"
          draggable={false}
          className="pointer-events-none absolute inset-0 size-full"
        />

        {towns.map((town) => {
          const { x, y, textAlign } = TOWNS[town].map
          const isCurrentTown = town === currentTown
          const canSelectTown = !!onSelectTown && !isAtSea && !isCurrentTown

          return (
            <button
              key={town}
              type="button"
              disabled={!canSelectTown}
              aria-label={
                isCurrentTown ? `${town}, current town` : `Sail to ${town}`
              }
              className="group absolute flex items-center justify-center outline-offset-2 focus-visible:outline-2 enabled:cursor-pointer disabled:pointer-events-none"
              style={{
                left: x - TOWN_HIT_PADDING,
                top: y - TOWN_HIT_PADDING,
                width: TOWN_ANCHOR_SIZE + TOWN_HIT_PADDING * 2,
                height: TOWN_ANCHOR_SIZE + TOWN_HIT_PADDING * 2,
              }}
              onPointerMove={(event) => showTownTooltip(town, event)}
              onPointerLeave={() => setHovered(null)}
              onFocus={(event) => focusTown(town, event)}
              onBlur={() => setHovered(null)}
              onClick={(event) => selectTown(town, event)}
            >
              <Image
                src="/img/map/town.svg"
                alt=""
                width={TOWN_SIZE}
                height={TOWN_SIZE}
                style={{ width: TOWN_SIZE, height: TOWN_SIZE }}
                unoptimized
                draggable={false}
                className={
                  canSelectTown
                    ? "group-hover:scale-110 group-focus-visible:scale-110"
                    : undefined
                }
              />

              <span
                className="pointer-events-none absolute font-mono whitespace-nowrap text-white"
                style={{
                  left:
                    TOWN_HIT_PADDING +
                    (textAlign === "right"
                      ? 26 / MAP_ZOOM
                      : -(town.length * 2) / MAP_ZOOM),
                  top:
                    TOWN_HIT_PADDING +
                    (textAlign === "right" ? 6 : 25) / MAP_ZOOM,
                  fontSize: 10 / MAP_ZOOM,
                  lineHeight: `${12 / MAP_ZOOM}px`,
                  backgroundColor: isCurrentTown
                    ? colors.darkBlue
                    : colors.black,
                  opacity: isCurrentTown ? 0.9 : 0.8,
                }}
              >
                {`\u00a0${town}\u00a0`}
              </span>
            </button>
          )
        })}
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
        top={hovered?.top}
        left={hovered?.left}
      />
    </div>
  )
}

export default SeaMapCanvas
