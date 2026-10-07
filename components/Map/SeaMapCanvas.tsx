"use client"

import { useEffect, useRef, useState } from "react"

import { TOWNS } from "@/constants/locations"
import { SEA_TRAVEL_SPEED } from "@/constants/sea"
import { splitRoute } from "@/utils/seaPath"
import { getJourneyOrigin, getSeaRoute } from "@/utils/seaRoutes"

import Tooltip from "./Tooltip"

const MAP_WIDTH = 850
const MAP_HEIGHT = 540
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
  white: "#fff",
  trail: "oklch(0.577 0.245 27.325 / 0.6)",
  trailTravelled: "oklch(0.577 0.245 27.325)",
}

const imageCache: Record<string, HTMLImageElement> = {}

const getImage = (src: string) => {
  if (!imageCache[src]) {
    imageCache[src] = new Image()
    imageCache[src].src = src
  }

  return imageCache[src]
}

const isLoaded = (image: HTMLImageElement) =>
  image.complete && image.naturalWidth > 0

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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animation = useRef({ routeKey: "", progress: 0 })
  const view = useRef({
    scale: 1,
    scaleY: 1,
    x: MAP_WIDTH / 2,
    y: MAP_HEIGHT / 2,
  })
  const centeredTown = useRef<Town | undefined>(undefined)
  const initializedView = useRef(false)
  const drag = useRef({
    pointerId: -1,
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
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

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

    const fromProgress = animation.current.progress
    const toProgress = isPaused ? fromProgress : targetProgress
    const startTime = performance.now()

    const mapImage = getImage("/img/map/spanish-main.png")
    const townImage = getImage("/img/map/town.svg")
    const shipImage = getImage("/img/logo.svg")
    const townLayer = document.createElement("canvas")
    const townContext = townLayer.getContext("2d")
    if (!townContext) return
    let townImageLoaded = false

    const drawShip = (
      x: number,
      y: number,
      width: number,
      now: number,
      flip: boolean
    ) => {
      if (!isLoaded(shipImage)) return

      const height = width * SHIP_ASPECT_RATIO
      const wave = Math.sin((now / 1500) * Math.PI * 2)

      context.save()
      context.translate(x, y + wave * 0.5)
      context.rotate((wave * 3 * Math.PI) / 180)
      if (flip) context.scale(-1, 1)
      context.drawImage(shipImage, -width / 2, -height / 2, width, height)
      context.restore()
    }

    const drawShipBox = (x: number, y: number, size: number) => {
      context.fillStyle = colors.lightBlue
      context.strokeStyle = colors.black
      context.lineWidth = 0.75
      context.fillRect(x, y, size, size)
      context.strokeRect(x, y, size, size)
    }

    const drawRoute = (points: { x: number; y: number }[], color: string) => {
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

    const drawTown = (town: Town) => {
      const { x, y, textAlign } = TOWNS[town].map
      const isCurrentTown = town === currentTown
      const scale = town === hoveredTown ? 1.1 : 1
      const size = TOWN_SIZE * scale
      const offset = (TOWN_ANCHOR_SIZE - size) / 2

      if (isLoaded(townImage)) {
        townContext.drawImage(townImage, x + offset, y + offset, size, size)
      }

      const label = `\u00a0${town}\u00a0`
      const labelX =
        textAlign === "right"
          ? x + 26 / MAP_ZOOM
          : x - (town.length * 2) / MAP_ZOOM
      const labelY = y + (textAlign === "right" ? 15 : 34) / MAP_ZOOM
      const labelWidth = townContext.measureText(label).width

      townContext.save()
      townContext.globalAlpha = isCurrentTown ? 0.9 : 0.8
      townContext.fillStyle = isCurrentTown ? colors.darkBlue : colors.black
      townContext.fillRect(
        labelX,
        labelY - 9 / MAP_ZOOM,
        labelWidth,
        12 / MAP_ZOOM
      )
      townContext.fillStyle = colors.white
      townContext.fillText(label, labelX, labelY)
      townContext.restore()
    }

    let frame = 0
    let lastDrawTime = -Infinity

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw)
      if (document.hidden || now - lastDrawTime < FRAME_INTERVAL) return
      lastDrawTime = Number.isFinite(lastDrawTime)
        ? now - ((now - lastDrawTime) % FRAME_INTERVAL)
        : now

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.round(canvas.clientWidth * pixelRatio)
      const height = Math.round(canvas.clientHeight * pixelRatio)
      const scale = Math.max(
        1,
        canvas.clientWidth / MAP_WIDTH,
        canvas.clientHeight / MAP_HEIGHT
      )

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, width, height)

      const elapsed = Math.min(1, (now - startTime) / SEA_TRAVEL_SPEED)
      const progress = fromProgress + (toProgress - fromProgress) * elapsed
      const routeProgress = route ? splitRoute(route, progress) : null
      const shipPosition = routeProgress
        ? routeProgress.position
        : currentTown
          ? TOWNS[currentTown].map
          : { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 }

      if (isAtSea) {
        view.current.x = shipPosition.x
        view.current.y = shipPosition.y
      } else if (
        !initializedView.current ||
        centeredTown.current !== currentTown
      ) {
        const center = currentTown
          ? TOWNS[currentTown].map
          : { x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 }
        view.current.x = center.x
        view.current.y = center.y
        centeredTown.current = currentTown
        initializedView.current = true
      }
      const mapYScale = isLoaded(mapImage)
        ? (MAP_WIDTH * mapImage.naturalHeight) /
          (mapImage.naturalWidth * MAP_HEIGHT)
        : 1
      const viewScale = scale * MAP_ZOOM
      view.current.scale = viewScale
      view.current.scaleY = viewScale * mapYScale
      const focus = isAtSea ? shipPosition : view.current
      context.setTransform(
        viewScale * pixelRatio,
        0,
        0,
        view.current.scaleY * pixelRatio,
        (canvas.clientWidth / 2 - focus.x * viewScale) * pixelRatio,
        (canvas.clientHeight / 2 - focus.y * view.current.scaleY) * pixelRatio
      )
      if (isLoaded(mapImage)) {
        context.drawImage(mapImage, 0, 0, MAP_WIDTH, MAP_HEIGHT)
      }

      if (previewRoute) drawRoute(previewRoute, colors.trailTravelled)

      const townWidth = Math.ceil(MAP_WIDTH * viewScale * pixelRatio)
      const townHeight = Math.ceil(
        MAP_HEIGHT * view.current.scaleY * pixelRatio
      )
      const isTownImageLoaded = isLoaded(townImage)

      if (
        townLayer.width !== townWidth ||
        townLayer.height !== townHeight ||
        townImageLoaded !== isTownImageLoaded
      ) {
        townLayer.width = townWidth
        townLayer.height = townHeight
        townContext.setTransform(
          townWidth / MAP_WIDTH,
          0,
          0,
          townHeight / MAP_HEIGHT,
          0,
          0
        )
        townContext.font = `${10 / MAP_ZOOM}px monospace`
        towns.forEach(drawTown)
        townImageLoaded = isTownImageLoaded
      }

      context.drawImage(townLayer, 0, 0, MAP_WIDTH, MAP_HEIGHT)

      if (currentTown && !isAtSea) {
        const { x, y } = TOWNS[currentTown].map

        drawShipBox(x - 16, y, 14)
        drawShip(x - 9, y + 7, SHIP_WIDTH, now, false)
      }

      if (route && routeProgress) {
        const { position, heading, travelledRoute } = routeProgress

        animation.current.progress = progress

        drawRoute(route, colors.trail)
        drawRoute(travelledRoute, colors.trailTravelled)
        drawShipBox(
          position.x - SEA_SHIP_WIDTH / 2 - 0.5,
          position.y - SEA_SHIP_WIDTH / 2 - 0.5,
          SEA_SHIP_WIDTH + 1
        )
        drawShip(position.x, position.y, SEA_SHIP_WIDTH, now, heading.x < 0)
      }
    }

    frame = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(frame)
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

  const getTownAt = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x =
      view.current.x +
      (event.clientX - rect.left - rect.width / 2) / view.current.scale
    const y =
      view.current.y +
      (event.clientY - rect.top - rect.height / 2) / view.current.scaleY

    return towns.find((town) => {
      const { map } = TOWNS[town]

      return (
        town !== currentTown &&
        x >= map.x - TOWN_HIT_PADDING &&
        x <= map.x + TOWN_ANCHOR_SIZE + TOWN_HIT_PADDING &&
        y >= map.y - TOWN_HIT_PADDING &&
        y <= map.y + TOWN_ANCHOR_SIZE + TOWN_HIT_PADDING
      )
    })
  }

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (drag.current.pointerId === event.pointerId) {
      const deltaX = event.clientX - drag.current.lastX
      const deltaY = event.clientY - drag.current.lastY
      drag.current.lastX = event.clientX
      drag.current.lastY = event.clientY
      drag.current.moved ||= Math.abs(deltaX) + Math.abs(deltaY) > 2

      if (drag.current.moved) {
        view.current.x -= deltaX / view.current.scale
        view.current.y -= deltaY / view.current.scaleY
      }

      setHovered(null)
      return
    }

    const town = getTownAt(event)

    setHovered(
      town ? { town, top: event.clientY + 20, left: event.clientX + 20 } : null
    )
  }

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (isAtSea || event.button !== 0) return

    drag.current = {
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastY: event.clientY,
      moved: false,
      suppressClick: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (drag.current.pointerId !== event.pointerId) return

    drag.current.suppressClick = drag.current.moved
    drag.current.pointerId = -1
  }

  const onPointerCancel = () => {
    drag.current.pointerId = -1
    drag.current.moved = false
    drag.current.suppressClick = false
  }

  const onWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
    if (isAtSea) return

    event.preventDefault()
    view.current.x += event.deltaX / view.current.scale
    view.current.y += event.deltaY / view.current.scaleY
  }

  const onClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (drag.current.suppressClick) {
      drag.current.suppressClick = false
      return
    }

    const town = getTownAt(event)
    if (town) onSelectTown?.(town)
  }

  return (
    <div className="mx-auto w-full bg-neutral-700 opacity-80 lg:max-w-7xl">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={
          journey
            ? `Sea map, sailing to ${journey.destination}`
            : "Sea map of the Spanish Main"
        }
        className={`aspect-850/540 w-full touch-none portrait:aspect-auto portrait:h-[calc(95dvh-8rem)] ${isAtSea ? "" : "cursor-grab active:cursor-grabbing"} ${hovered ? "cursor-pointer" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onSelectTown ? onPointerMove : undefined}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={() => setHovered(null)}
        onWheel={onWheel}
        onClick={onSelectTown ? onClick : undefined}
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
