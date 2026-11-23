import { PointerEvent, useEffect, useRef, useState } from "react"

import { createBuildingSceneRenderer } from "@/components/game-ui/LocationScene/buildingSceneShader"
import {
  BUILDING_HEIGHT,
  BUILDING_WIDTH,
} from "@/components/game-ui/LocationScene/lightMask"
import { useAmbienceCanvas } from "@/components/game-ui/LocationScene/useAmbienceCanvas"
import { useBuildingMasks } from "@/components/game-ui/LocationScene/useBuildingMasks"
import { getWeatherAmbience } from "@/components/game-ui/LocationScene/weatherAmbience"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  type DustSource,
  type Fire,
  getLocationAmbience,
  getLocationBackground,
  getLocationDust,
  getLocationFires,
  toSlug,
} from "@/utils/location"

const SAVE_PATH = "/__mask-editor/save"

// Radius in picture pixels of a fire made by a click, and the smallest and
// largest a fire can be
const DEFAULT_RADIUS = 60
const MIN_RADIUS = 10
const MAX_RADIUS = 600

// Screen pixels within which a corner is picked, or the first corner closes
// the polygon being drawn
const CORNER_REACH = 10

type Kind = "fires" | "dust"
type Point = [number, number]

type Data = { fires: Fire[]; dust: DustSource[] }

type FireDrag = {
  // -1 for a fire being made
  index: number
  mode: "move" | "resize" | "create"
  start: Point
  origin: Fire
}

type ShapeDrag = {
  index: number
  // The corner being moved, or null for the whole polygon
  corner: number | null
  start: Point
  origin: DustSource
}

type Props = {
  town: Town
  location: TownLocation
  weather: WeatherType
  zoom: number
}

const KINDS: { kind: Kind; label: string; help: string }[] = [
  {
    kind: "fires",
    label: "Fires",
    help: "Click to place a fire, or drag to place one of the size you want. Drag a fire to move it and its edge to change the size. The light is strongest in the middle and fades out to the edge.",
  },
  {
    kind: "dust",
    label: "Dust",
    help: "Click corners round a window or opening, click the first corner to close it. Drag a corner or the inside to move it. Dust floats from the polygon into the room and thins out as it goes. It only shows in sunny weather.",
  },
]

const isInside = (polygon: number[], [x, y]: Point) => {
  let inside = false

  for (let i = 0, j = polygon.length - 2; i < polygon.length; j = i, i += 2) {
    const [xi, yi, xj, yj] = [
      polygon[i],
      polygon[i + 1],
      polygon[j],
      polygon[j + 1],
    ]

    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside
    }
  }

  return inside
}

const movePolygon = (
  origin: number[],
  corner: number | null,
  dx: number,
  dy: number
) =>
  origin.map((value, i) =>
    corner === null || Math.floor(i / 2) === corner
      ? Math.round(value + (i % 2 ? dy : dx))
      : value
  )

// Place the light sources of a building picture, fires and dust. A fire is a
// circle with light that is strongest in the middle and fades out to the edge.
// Dust floats in from polygons round windows and openings. Saving writes
// constants/buildings/fires.json and dust.json. A building without either
// keeps its light mask picture, with one the picture is not used any more.
const BuildingSceneEditor = ({ town, location, weather, zoom }: Props) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [kind, setKind] = useState<Kind>("fires")
  const [data, setData] = useState<Data>(() => ({
    fires: [...getLocationFires(town, location)],
    dust: [...getLocationDust(town, location)],
  }))
  const [saved, setSaved] = useState(data)
  const [history, setHistory] = useState<Data[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [drag, setDrag] = useState<FireDrag | null>(null)
  const [draft, setDraft] = useState<Fire | null>(null)
  // A polygon being drawn, the pointer for its next line, and a polygon or
  // corner being dragged
  const [points, setPoints] = useState<Point[]>([])
  const [pointer, setPointer] = useState<Point | null>(null)
  const [shapeDrag, setShapeDrag] = useState<ShapeDrag | null>(null)
  const [draftShape, setDraftShape] = useState<DustSource | null>(null)
  const [showShapes, setShowShapes] = useState(true)
  const [showGuide, setShowGuide] = useState(false)
  const [status, setStatus] = useState("")
  const ambience = getLocationAmbience(town, location)!
  const changed = {
    fires: JSON.stringify(data.fires) !== JSON.stringify(saved.fires),
    dust: JSON.stringify(data.dust) !== JSON.stringify(saved.dust),
  }
  const isChanged = changed.fires || changed.dust

  // The scene follows what is placed, not what is being dragged
  const masks = useBuildingMasks(town, location, data.fires, data.dust)
  const ambienceRef = useAmbienceCanvas(
    imageRef,
    createBuildingSceneRenderer,
    masks,
    { uniforms: getWeatherAmbience(weather) }
  )

  const commit = (next: Data) => {
    setHistory([...history, data])
    setData(next)
  }

  const undo = () => {
    const previous = history.at(-1)

    if (previous) {
      setData(previous)
      setHistory(history.slice(0, -1))
      setSelected(null)
    }
  }

  const remove = () => {
    // Takes back the last corner of a polygon being drawn
    if (points.length) {
      setPoints(points.slice(0, -1))

      return
    }

    if (selected !== null) {
      commit({
        ...data,
        [kind]: data[kind].filter((_, i) => i !== selected),
      })
      setSelected(null)
    }
  }

  const chooseKind = (next: Kind) => {
    setKind(next)
    setSelected(null)
    setPoints([])
  }

  // Keyboard shortcuts, the window listener is replaced on every render so it
  // always sees the latest data
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) {
        return
      }

      if (event.key === "Delete" || event.key === "Backspace") {
        remove()
      } else if (event.key === "Escape") {
        setSelected(null)
        setPoints([])
      } else if (event.key === "z" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        undo()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  })

  const toPicture = (event: { clientX: number; clientY: number }): Point => {
    const rect = svgRef.current!.getBoundingClientRect()

    return [
      Math.round(((event.clientX - rect.left) / rect.width) * BUILDING_WIDTH),
      Math.round(((event.clientY - rect.top) / rect.height) * BUILDING_HEIGHT),
    ]
  }

  // Screen pixels in picture pixels
  const reach = (pixels: number) =>
    (pixels * BUILDING_WIDTH) / svgRef.current!.getBoundingClientRect().width

  const clamp = (value: number, max: number) =>
    Math.min(Math.max(Math.round(value), 0), max)

  // The fire under the pointer, the smallest one when they overlap so a small
  // fire inside a big one can still be picked. Near its edge it is resized.
  const hitFire = (x: number, y: number) => {
    const edge = reach(8)
    let found: { index: number; mode: FireDrag["mode"] } | null = null
    let foundRadius = Infinity

    data.fires.forEach(([fx, fy, radius], index) => {
      const distance = Math.hypot(x - fx, y - fy)

      if (distance <= radius + edge && radius < foundRadius) {
        found = {
          index,
          mode: Math.abs(distance - radius) <= edge ? "resize" : "move",
        }
        foundRadius = radius
      }
    })

    return found as { index: number; mode: FireDrag["mode"] } | null
  }

  // A corner of a polygon within reach of the pointer, else the last polygon
  // the pointer is inside
  const hitShape = (point: Point) => {
    const range = reach(CORNER_REACH)

    for (const [index, polygon] of data.dust.entries()) {
      for (let i = 0; i < polygon.length; i += 2) {
        if (
          Math.hypot(point[0] - polygon[i], point[1] - polygon[i + 1]) <= range
        ) {
          return { index, corner: i / 2 }
        }
      }
    }

    const index = data.dust.findLastIndex((polygon) => isInside(polygon, point))

    return index >= 0 ? { index, corner: null } : null
  }

  const handlePointerDown = (event: PointerEvent<SVGSVGElement>) => {
    const point = toPicture(event)
    const [x, y] = point

    event.currentTarget.setPointerCapture(event.pointerId)

    if (kind === "dust") {
      // Clicking the first corner closes the polygon being drawn
      if (points.length) {
        if (
          points.length >= 3 &&
          Math.hypot(x - points[0][0], y - points[0][1]) <= reach(CORNER_REACH)
        ) {
          commit({ ...data, dust: [...data.dust, points.flat()] })
          setSelected(data.dust.length)
          setPoints([])
        } else {
          setPoints([...points, point])
        }

        return
      }

      const target = hitShape(point)

      if (target) {
        setSelected(target.index)
        setShapeDrag({
          ...target,
          start: point,
          origin: data.dust[target.index],
        })
        setDraftShape(data.dust[target.index])
      } else {
        setSelected(null)
        setPoints([point])
      }

      return
    }

    const target = hitFire(x, y)

    if (target) {
      setSelected(target.index)
      setDrag({
        ...target,
        start: point,
        origin: data.fires[target.index],
      })
      setDraft(data.fires[target.index])
    } else {
      setSelected(null)
      setDrag({ index: -1, mode: "create", start: point, origin: [x, y, 0] })
      setDraft([x, y, 0])
    }
  }

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const [x, y] = toPicture(event)

    if (kind === "dust") {
      setPointer([x, y])

      if (shapeDrag) {
        setDraftShape(
          movePolygon(
            shapeDrag.origin,
            shapeDrag.corner,
            x - shapeDrag.start[0],
            y - shapeDrag.start[1]
          ).map((value, i) =>
            clamp(value, i % 2 ? BUILDING_HEIGHT : BUILDING_WIDTH)
          )
        )
      }

      return
    }

    if (!drag) {
      return
    }

    const [startX, startY] = drag.start
    const [originX, originY, originRadius] = drag.origin
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
    if (kind === "dust") {
      if (
        shapeDrag &&
        draftShape &&
        JSON.stringify(draftShape) !== JSON.stringify(shapeDrag.origin)
      ) {
        commit({
          ...data,
          dust: data.dust.map((polygon, i) =>
            i === shapeDrag.index ? draftShape : polygon
          ),
        })
      }

      setShapeDrag(null)
      setDraftShape(null)

      return
    }

    if (!drag || !draft) {
      return
    }

    if (drag.mode === "create") {
      // A click without dragging gets a normal size
      const fire: Fire =
        draft[2] < MIN_RADIUS ? [draft[0], draft[1], DEFAULT_RADIUS] : draft

      commit({ ...data, fires: [...data.fires, fire] })
      setSelected(data.fires.length)
    } else if (JSON.stringify(draft) !== JSON.stringify(drag.origin)) {
      commit({
        ...data,
        fires: data.fires.map((fire, i) => (i === drag.index ? draft : fire)),
      })
    }

    setDrag(null)
    setDraft(null)
  }

  const save = async () => {
    setStatus("Saving…")

    try {
      for (const name of ["fires", "dust"] as const) {
        if (!changed[name]) {
          continue
        }

        const response = await fetch(SAVE_PATH, {
          method: "POST",
          body: JSON.stringify({
            kind: name,
            town,
            variant: toSlug(location),
            data: data[name],
          }),
        })
        const result = await response.json()

        if (!result.ok) {
          setStatus(`Not saved: ${result.output}`)

          return
        }
      }

      setSaved(data)
      setStatus("Saved")
    } catch {
      setStatus("Not saved, saving only works in Storybook started locally")
    }
  }

  const shownFires =
    draft && drag && drag.index >= 0
      ? data.fires.map((fire, i) => (i === drag.index ? draft : fire))
      : drag?.mode === "create" && draft
        ? [...data.fires, draft]
        : data.fires
  const shownDust =
    draftShape && shapeDrag
      ? data.dust.map((polygon, i) =>
          i === shapeDrag.index ? draftShape : polygon
        )
      : data.dust
  const count = data[kind].length
  const selectedItem = selected !== null ? data[kind][selected] : undefined

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap items-center gap-2">
        {KINDS.map((option) => (
          <Button
            key={option.kind}
            variant={option.kind === kind ? "secondary" : "ghost"}
            onClick={() => chooseKind(option.kind)}
          >
            {option.label}
            {changed[option.kind] && " •"}
          </Button>
        ))}
      </div>

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
          disabled={selected === null && !points.length}
        >
          Delete
        </Button>

        <Button
          variant="secondary"
          onClick={() => {
            commit(saved)
            setSelected(null)
            setPoints([])
          }}
          disabled={!isChanged}
        >
          Back to saved
        </Button>

        {[
          [
            kind === "fires" ? "Circles" : "Polygons",
            showShapes,
            setShowShapes,
          ],
          ["Old light picture", showGuide, setShowGuide],
        ].map(([label, checked, onChange]) => (
          <div key={label as string} className="flex items-center gap-2">
            <Switch
              id={`building-editor-${label}`}
              checked={checked as boolean}
              onCheckedChange={onChange as (value: boolean) => void}
            />
            <Label htmlFor={`building-editor-${label}`}>
              {label as string}
            </Label>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground text-sm">
        {KINDS.find((option) => option.kind === kind)!.help} Delete removes the
        selected one (the last corner of a polygon being drawn), Escape
        deselects or stops a polygon, Ctrl+Z undoes. Without fires or dust the
        building keeps its old light picture, with one the picture is not used
        any more.
      </p>

      {/* Always one line high, so the picture never moves under the pointer */}
      <div className="flex h-9 items-center gap-4 overflow-hidden text-sm whitespace-nowrap">
        <span className="text-muted-foreground">
          {count} {kind === "fires" ? "fires" : "polygons"}
          {selectedItem &&
            kind === "fires" &&
            `, selected [${selectedItem.join(", ")}]`}
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
            {showShapes &&
              kind === "fires" &&
              shownFires.map(([x, y, radius], i) => (
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

            {showShapes &&
              kind === "dust" &&
              shownDust.map((polygon, i) => (
                <g
                  key={i}
                  className={i === selected ? "stroke-gold" : "stroke-warning"}
                >
                  <polygon
                    points={polygon.join(" ")}
                    className={
                      i === selected ? "fill-gold/30" : "fill-warning/30"
                    }
                    strokeWidth={i === selected ? 4 : 3}
                    vectorEffect="non-scaling-stroke"
                  />

                  {i === selected &&
                    Array.from({ length: polygon.length / 2 }, (_, corner) => (
                      <circle
                        key={corner}
                        cx={polygon[corner * 2]}
                        cy={polygon[corner * 2 + 1]}
                        r={6}
                        className="fill-gold stroke-none"
                      />
                    ))}
                </g>
              ))}

            {kind === "dust" && points.length > 0 && (
              <g className="stroke-gold">
                <polyline
                  points={[...points, ...(pointer ? [pointer] : [])]
                    .map((point) => point.join(","))
                    .join(" ")}
                  fill="none"
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                />

                {points.map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={i === 0 ? 12 : 6}
                    className="fill-gold stroke-none"
                  />
                ))}
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  )
}

export default BuildingSceneEditor
