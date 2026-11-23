import { PointerEvent, useEffect, useRef, useState } from "react"

import { createBuildingSceneRenderer } from "@/components/game-ui/LocationScene/buildingSceneShader"
import {
  BUILDING_HEIGHT,
  BUILDING_WIDTH,
} from "@/components/game-ui/LocationScene/fireMask"
import { useAmbienceCanvas } from "@/components/game-ui/LocationScene/useAmbienceCanvas"
import { useBuildingMasks } from "@/components/game-ui/LocationScene/useBuildingMasks"
import { getWeatherAmbience } from "@/components/game-ui/LocationScene/weatherAmbience"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  type Fire,
  getLocationAmbience,
  getLocationBackground,
  getLocationFires,
  toSlug,
} from "@/utils/location"

const SAVE_PATH = "/__mask-editor/save"

// Radius in picture pixels of a fire made by a click, and the smallest and
// largest a fire can be
const DEFAULT_RADIUS = 60
const MIN_RADIUS = 10
const MAX_RADIUS = 600

type Drag = {
  // -1 for a fire being made
  index: number
  mode: "move" | "resize" | "create"
  start: [number, number]
  origin: Fire
}

type Props = {
  town: Town
  location: TownLocation
  weather: WeatherType
  zoom: number
}

// Place fires on a building picture. Each is a circle with light that is
// strongest in the middle and fades out to the edge. Saving writes
// constants/buildings/fires.json. A building without fires keeps its light
// mask picture, with one fire the picture is not used any more.
const BuildingSceneEditor = ({ town, location, weather, zoom }: Props) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [fires, setFires] = useState<Fire[]>(() => [
    ...getLocationFires(town, location),
  ])
  const [saved, setSaved] = useState(fires)
  const [history, setHistory] = useState<Fire[][]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [drag, setDrag] = useState<Drag | null>(null)
  const [draft, setDraft] = useState<Fire | null>(null)
  const [showCircles, setShowCircles] = useState(true)
  const [showGuide, setShowGuide] = useState(false)
  const [status, setStatus] = useState("")
  const ambience = getLocationAmbience(town, location)!
  const isChanged = JSON.stringify(fires) !== JSON.stringify(saved)

  // The scene follows the fires that are placed, not the one being dragged
  const masks = useBuildingMasks(town, location, fires)
  const ambienceRef = useAmbienceCanvas(
    imageRef,
    createBuildingSceneRenderer,
    masks,
    { uniforms: getWeatherAmbience(weather) }
  )

  const commit = (next: Fire[]) => {
    setHistory([...history, fires])
    setFires(next)
  }

  const undo = () => {
    const previous = history.at(-1)

    if (previous) {
      setFires(previous)
      setHistory(history.slice(0, -1))
      setSelected(null)
    }
  }

  const remove = () => {
    if (selected !== null) {
      commit(fires.filter((_, i) => i !== selected))
      setSelected(null)
    }
  }

  // Keyboard shortcuts, the window listener is replaced on every render so it
  // always sees the latest fires
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) {
        return
      }

      if (event.key === "Delete" || event.key === "Backspace") {
        remove()
      } else if (event.key === "Escape") {
        setSelected(null)
      } else if (event.key === "z" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        undo()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  })

  const toPicture = (event: { clientX: number; clientY: number }) => {
    const rect = svgRef.current!.getBoundingClientRect()

    return [
      Math.round(((event.clientX - rect.left) / rect.width) * BUILDING_WIDTH),
      Math.round(((event.clientY - rect.top) / rect.height) * BUILDING_HEIGHT),
    ] as [number, number]
  }

  // The fire under the pointer, the smallest one when they overlap so a small
  // fire inside a big one can still be picked. Near its edge it is resized.
  const hit = (x: number, y: number) => {
    const rect = svgRef.current!.getBoundingClientRect()
    // About 8 screen pixels in picture pixels
    const edge = (8 * BUILDING_WIDTH) / rect.width
    let found: { index: number; mode: Drag["mode"] } | null = null
    let foundRadius = Infinity

    fires.forEach(([fx, fy, radius], index) => {
      const distance = Math.hypot(x - fx, y - fy)

      if (distance <= radius + edge && radius < foundRadius) {
        found = {
          index,
          mode: Math.abs(distance - radius) <= edge ? "resize" : "move",
        }
        foundRadius = radius
      }
    })

    return found as { index: number; mode: Drag["mode"] } | null
  }

  const handlePointerDown = (event: PointerEvent<SVGSVGElement>) => {
    const [x, y] = toPicture(event)
    const target = hit(x, y)

    event.currentTarget.setPointerCapture(event.pointerId)

    if (target) {
      setSelected(target.index)
      setDrag({
        ...target,
        start: [x, y],
        origin: fires[target.index],
      })
      setDraft(fires[target.index])
    } else {
      setSelected(null)
      setDrag({ index: -1, mode: "create", start: [x, y], origin: [x, y, 0] })
      setDraft([x, y, 0])
    }
  }

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!drag) {
      return
    }

    const [x, y] = toPicture(event)
    const [startX, startY] = drag.start
    const [originX, originY, originRadius] = drag.origin
    const clamp = (value: number, max: number) =>
      Math.min(Math.max(Math.round(value), 0), max)
    const radius = (cx: number, cy: number) =>
      Math.min(Math.round(Math.hypot(x - cx, y - cy)), MAX_RADIUS)

    if (drag.mode === "move") {
      setDraft([
        clamp(originX + x - startX, BUILDING_WIDTH),
        clamp(originY + y - startY, BUILDING_HEIGHT),
        originRadius,
      ])
    } else if (drag.mode === "resize") {
      setDraft([
        originX,
        originY,
        Math.max(radius(originX, originY), MIN_RADIUS),
      ])
    } else {
      setDraft([startX, startY, radius(startX, startY)])
    }
  }

  const handlePointerUp = () => {
    if (!drag || !draft) {
      return
    }

    if (drag.mode === "create") {
      // A click without dragging gets a normal size
      const fire: Fire =
        draft[2] < MIN_RADIUS ? [draft[0], draft[1], DEFAULT_RADIUS] : draft

      commit([...fires, fire])
      setSelected(fires.length)
    } else if (JSON.stringify(draft) !== JSON.stringify(drag.origin)) {
      commit(fires.map((fire, i) => (i === drag.index ? draft : fire)))
    }

    setDrag(null)
    setDraft(null)
  }

  const save = async () => {
    setStatus("Saving…")

    try {
      const response = await fetch(SAVE_PATH, {
        method: "POST",
        body: JSON.stringify({
          kind: "fires",
          town,
          variant: toSlug(location),
          data: fires,
        }),
      })
      const result = await response.json()

      if (!result.ok) {
        setStatus(`Not saved: ${result.output}`)

        return
      }

      setSaved(fires)
      setStatus("Saved")
    } catch {
      setStatus("Not saved, saving only works in Storybook started locally")
    }
  }

  const shown =
    draft && drag && drag.index >= 0
      ? fires.map((fire, i) => (i === drag.index ? draft : fire))
      : drag?.mode === "create" && draft
        ? [...fires, draft]
        : fires

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={save} disabled={!isChanged}>
          Save
        </Button>

        <Button variant="secondary" onClick={undo} disabled={!history.length}>
          Undo
        </Button>

        <Button
          variant="secondary"
          onClick={remove}
          disabled={selected === null}
        >
          Delete
        </Button>

        <Button
          variant="secondary"
          onClick={() => {
            commit(saved)
            setSelected(null)
          }}
          disabled={!isChanged}
        >
          Back to saved
        </Button>

        {[
          ["Circles", showCircles, setShowCircles],
          ["Old light picture", showGuide, setShowGuide],
        ].map(([label, checked, onChange]) => (
          <div key={label as string} className="flex items-center gap-2">
            <Switch
              id={`fire-editor-${label}`}
              checked={checked as boolean}
              onCheckedChange={onChange as (value: boolean) => void}
            />
            <Label htmlFor={`fire-editor-${label}`}>{label as string}</Label>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground text-sm">
        Click to place a fire, or drag to place one of the size you want. Drag a
        fire to move it and its edge to change the size. The light is strongest
        in the middle and fades out to the edge. Delete removes the selected
        fire, Escape deselects, Ctrl+Z undoes. Without fires the building keeps
        its old light picture, with one fire the picture is not used any more.
      </p>

      {/* Always one line high, so the picture never moves under the pointer */}
      <div className="flex h-9 items-center gap-4 overflow-hidden text-sm whitespace-nowrap">
        <span className="text-muted-foreground">
          {fires.length} fires
          {selected !== null &&
            fires[selected] &&
            `, selected [${fires[selected].join(", ")}]`}
          {isChanged && ", not saved"}
        </span>

        <span className="truncate" title={status}>
          {status}
        </span>
      </div>

      <div className="overflow-auto">
        <div className="relative" style={{ width: `${zoom * 100}%` }}>
          {/* The shader needs the full picture, not an optimised copy */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={getLocationBackground(town, location)}
            width={BUILDING_WIDTH}
            height={BUILDING_HEIGHT}
            alt={`${town} ${location}`}
            draggable={false}
            className="block h-auto w-full select-none"
          />

          <div
            ref={ambienceRef}
            aria-hidden
            className="pointer-events-none absolute inset-0"
          />

          {showGuide && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={ambience.light}
              alt=""
              draggable={false}
              className="pointer-events-none absolute inset-0 size-full opacity-60 mix-blend-screen"
            />
          )}

          <svg
            ref={svgRef}
            viewBox={`0 0 ${BUILDING_WIDTH} ${BUILDING_HEIGHT}`}
            preserveAspectRatio="none"
            className="absolute inset-0 size-full cursor-crosshair touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {showCircles &&
              shown.map(([x, y, radius], i) => (
                <g
                  key={i}
                  className={i === selected ? "stroke-gold" : "stroke-sea"}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={radius}
                    fill="none"
                    strokeWidth={i === selected ? 2 : 1}
                    vectorEffect="non-scaling-stroke"
                  />

                  <circle
                    cx={x}
                    cy={y}
                    r={radius * 0.3}
                    fill="none"
                    strokeDasharray="4 3"
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ))}
          </svg>
        </div>
      </div>
    </div>
  )
}

export default BuildingSceneEditor
