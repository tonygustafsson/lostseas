import { MouseEvent, PointerEvent, useEffect, useRef, useState } from "react"

import {
  createBuildingSceneRenderer,
  MAX_FIRES,
} from "@/components/game-ui/LocationScene/buildingSceneShader"
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
  type BuildingAreas,
  type Fire,
  getLocationBackground,
  getLocationFires,
  loadLocationAreas,
  type Polygon,
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

type Kind = "fires" | "water" | "sky"
type AreaKind = Exclude<Kind, "fires">
type Point = [number, number]

type Data = { fires: Fire[]; areas: BuildingAreas }

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
  origin: Polygon
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
    kind: "water",
    label: "Water",
    help: "Click corners round water seen through a window or opening, click the first corner to close it. A polygon inside another is a hole. Drag a corner or the inside to move it, double-click an edge of the selected polygon to add a corner. The water ripples, and dust comes in through it.",
  },
  {
    kind: "sky",
    label: "Sky",
    help: "Click corners round sky seen through a window or opening, click the first corner to close it. A polygon inside another is a hole, for bars and roofs. Drag a corner or the inside to move it, double-click an edge of the selected polygon to add a corner. Clouds, rain and fog show in it, and dust comes in through it. Clouds and dust show in sunny and cloudy weather.",
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

// The edge of a polygon nearest to a point, as the corner it starts at, how far
// away it is and the closest point on it
const findEdge = (polygon: Polygon, [x, y]: Point) => {
  let best: { corner: number; distance: number; point: Point } | null = null
  const corners = polygon.length / 2

  for (let i = 0; i < corners; i++) {
    const j = (i + 1) % corners
    const [ax, ay, bx, by] = [
      polygon[i * 2],
      polygon[i * 2 + 1],
      polygon[j * 2],
      polygon[j * 2 + 1],
    ]
    const [dx, dy] = [bx - ax, by - ay]
    const length = dx * dx + dy * dy
    const t = length
      ? Math.min(1, Math.max(0, ((x - ax) * dx + (y - ay) * dy) / length))
      : 0
    const [px, py] = [ax + t * dx, ay + t * dy]
    const distance = Math.hypot(x - px, y - py)

    if (!best || distance < best.distance) {
      best = { corner: i, distance, point: [Math.round(px), Math.round(py)] }
    }
  }

  return best
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

// Place what makes a building picture alive: fires, and the water and sky seen
// through its windows. A fire is a circle with light that is strongest in the
// middle and fades out to the edge. Water and sky are polygons, even-odd so a
// polygon inside another is a hole. Dust comes in through the water and the
// sky. Saving writes constants/buildings/fires.json and the file of the town
// in constants/buildings/areas.
const Editor = ({
  town,
  location,
  weather,
  zoom,
  savedAreas,
}: Props & { savedAreas: BuildingAreas }) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [kind, setKind] = useState<Kind>("fires")
  const [data, setData] = useState<Data>(() => ({
    fires: [...getLocationFires(town, location)],
    areas: savedAreas,
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
  const [draftShape, setDraftShape] = useState<Polygon | null>(null)
  const [showShapes, setShowShapes] = useState(true)
  const [status, setStatus] = useState("")
  const isArea = kind !== "fires"
  const changed = {
    fires: JSON.stringify(data.fires) !== JSON.stringify(saved.fires),
    water: data.areas.water !== saved.areas.water,
    sky: data.areas.sky !== saved.areas.sky,
  }
  const isChanged = changed.fires || changed.water || changed.sky

  // The scene follows what is placed, not what is being dragged
  const masks = useBuildingMasks(town, location, data.fires, data.areas)
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

  const setAreas = (next: Polygon[]) =>
    commit({ ...data, areas: { ...data.areas, [kind]: next } })

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

    if (selected === null) {
      return
    }

    if (isArea) {
      setAreas(data.areas[kind].filter((_, i) => i !== selected))
    } else {
      commit({ ...data, fires: data.fires.filter((_, i) => i !== selected) })
    }

    setSelected(null)
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
  // the pointer is inside, so a hole is picked before what it is a hole in
  const hitShape = (point: Point) => {
    const range = reach(CORNER_REACH)
    const polygons = data.areas[kind as AreaKind]

    for (const [index, polygon] of polygons.entries()) {
      for (let i = 0; i < polygon.length; i += 2) {
        if (
          Math.hypot(point[0] - polygon[i], point[1] - polygon[i + 1]) <= range
        ) {
          return { index, corner: i / 2 }
        }
      }
    }

    // The edge of the selected polygon counts too, so double-clicking it to add
    // a corner does not start a new polygon
    if (selected !== null && polygons[selected]) {
      const edge = findEdge(polygons[selected], point)

      if (edge && edge.distance <= range) {
        return { index: selected, corner: null }
      }
    }

    const index = polygons.findLastIndex((polygon) => isInside(polygon, point))

    return index >= 0 ? { index, corner: null } : null
  }

  // Double-click an edge of the selected polygon to add a corner there
  const handleDoubleClick = (event: MouseEvent<SVGSVGElement>) => {
    if (!isArea || selected === null || points.length) {
      return
    }

    const polygon = data.areas[kind][selected]
    const edge = polygon && findEdge(polygon, toPicture(event))

    if (!edge || edge.distance > reach(CORNER_REACH)) {
      return
    }

    const at = (edge.corner + 1) * 2

    setAreas(
      data.areas[kind].map((existing, i) =>
        i === selected
          ? [...existing.slice(0, at), ...edge.point, ...existing.slice(at)]
          : existing
      )
    )
  }

  const handlePointerDown = (event: PointerEvent<SVGSVGElement>) => {
    const point = toPicture(event)
    const [x, y] = point

    event.currentTarget.setPointerCapture(event.pointerId)

    if (isArea) {
      // Clicking the first corner closes the polygon being drawn
      if (points.length) {
        if (
          points.length >= 3 &&
          Math.hypot(x - points[0][0], y - points[0][1]) <= reach(CORNER_REACH)
        ) {
          setAreas([...data.areas[kind], points.flat()])
          setSelected(data.areas[kind].length)
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
          origin: data.areas[kind][target.index],
        })
        setDraftShape(data.areas[kind][target.index])
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

    if (isArea) {
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
    if (isArea) {
      if (
        shapeDrag &&
        draftShape &&
        JSON.stringify(draftShape) !== JSON.stringify(shapeDrag.origin)
      ) {
        setAreas(
          data.areas[kind].map((polygon, i) =>
            i === shapeDrag.index ? draftShape : polygon
          )
        )
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

      // The shader has a fixed number of fire slots, so more would be ignored
      if (data.fires.length < MAX_FIRES) {
        commit({ ...data, fires: [...data.fires, fire] })
        setSelected(data.fires.length)
      }
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

    const payloads = {
      fires: { kind: "fires", data: data.fires },
      water: { kind: "buildingWater", data: data.areas.water },
      sky: { kind: "buildingSky", data: data.areas.sky },
    }

    try {
      for (const name of ["fires", "water", "sky"] as const) {
        if (!changed[name]) {
          continue
        }

        const response = await fetch(SAVE_PATH, {
          method: "POST",
          body: JSON.stringify({
            ...payloads[name],
            town,
            variant: toSlug(location),
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
  const shownPolygons = isArea
    ? draftShape && shapeDrag
      ? data.areas[kind].map((polygon, i) =>
          i === shapeDrag.index ? draftShape : polygon
        )
      : data.areas[kind]
    : []
  const count = isArea ? data.areas[kind].length : data.fires.length
  const selectedFire =
    !isArea && selected !== null ? data.fires[selected] : undefined

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

        <div className="flex items-center gap-2">
          <Switch
            id="building-editor-shapes"
            checked={showShapes}
            onCheckedChange={setShowShapes}
          />

          <Label htmlFor="building-editor-shapes">
            {isArea ? "Polygons" : "Circles"}
          </Label>
        </div>
      </div>

      <p className="text-muted-foreground text-sm">
        {KINDS.find((option) => option.kind === kind)!.help} Delete removes the
        selected one (the last corner of a polygon being drawn), Escape
        deselects or stops a polygon, Ctrl+Z undoes.
      </p>

      {/* Always one line high, so the picture never moves under the pointer */}
      <div className="flex h-9 items-center gap-4 overflow-hidden text-sm whitespace-nowrap">
        <span className="text-muted-foreground">
          {count} {isArea ? "polygons" : "fires"}
          {selectedFire && `, selected [${selectedFire.join(", ")}]`}
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

          <svg
            ref={svgRef}
            viewBox={`0 0 ${BUILDING_WIDTH} ${BUILDING_HEIGHT}`}
            preserveAspectRatio="none"
            className="absolute inset-0 size-full cursor-crosshair touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDoubleClick={handleDoubleClick}
          >
            {showShapes &&
              !isArea &&
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

            {showShapes && isArea && (
              <>
                {/* Even-odd, like the mask, so holes show as holes */}
                <path
                  d={shownPolygons
                    .map((polygon) => `M${polygon.join(" ")}Z`)
                    .join("")}
                  fillRule="evenodd"
                  className="fill-warning/30"
                />

                {shownPolygons.map((polygon, i) => (
                  <g
                    key={i}
                    className={
                      i === selected ? "stroke-gold" : "stroke-warning"
                    }
                  >
                    <polygon
                      points={polygon.join(" ")}
                      fill="none"
                      strokeWidth={i === selected ? 4 : 2}
                      vectorEffect="non-scaling-stroke"
                    />

                    {i === selected &&
                      Array.from(
                        { length: polygon.length / 2 },
                        (_, corner) => (
                          <circle
                            key={corner}
                            cx={polygon[corner * 2]}
                            cy={polygon[corner * 2 + 1]}
                            r={6}
                            className="fill-gold stroke-none"
                          />
                        )
                      )}
                  </g>
                ))}
              </>
            )}

            {isArea && points.length > 0 && (
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

// The polygons of a building are loaded the way the game loads them, before
// the editor starts with them
const BuildingSceneEditor = (props: Props) => {
  const [areas, setAreas] = useState<BuildingAreas>()

  useEffect(() => {
    loadLocationAreas(props.town, props.location).then((loaded) =>
      setAreas(loaded ?? { sky: [], water: [] })
    )
  }, [props.town, props.location])

  return areas ? (
    <Editor {...props} savedAreas={areas} />
  ) : (
    <p className="text-muted-foreground p-4 text-sm">Loading…</p>
  )
}

export default BuildingSceneEditor
