import { MouseEvent, PointerEvent, useEffect, useRef, useState } from "react"

import { makeFrontMaskUrl } from "@/components/game-ui/LocationScene/frontMask"
import { createTownMapRenderer } from "@/components/game-ui/LocationScene/townMapShader"
import { useAmbienceCanvas } from "@/components/game-ui/LocationScene/useAmbienceCanvas"
import { getWalkArrays } from "@/components/game-ui/LocationScene/walkUniforms"
import { getWeatherAmbience } from "@/components/game-ui/LocationScene/weatherAmbience"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import flagsConfig from "@/constants/harbor/flags.json"
import frontConfig from "@/constants/harbor/front.json"
import lanesConfig from "@/constants/harbor/lanes.json"
import { TOWNS } from "@/constants/locations"
import { getTownMap } from "@/constants/townMaps"
import { cn } from "@/lib/utils"

import { detectFlags } from "./detectFlags.mjs"

// Served by .storybook/maskEditorServer.ts
const SAVE_PATH = "/__mask-editor/save"

// x0, y0, x1, y1, and for a flag a 1 when the whole box waves
type Box = [number, number, number, number, ...number[]]
type Variant = "desktop" | "mobile"
type Kind = "things" | "flags" | "lanes"
type Tool = "box" | "polygon"
type Edges = { left: boolean; top: boolean; right: boolean; bottom: boolean }
type Drag = {
  index: number
  edges: Edges | "move"
  start: [number, number]
  origin: Box
}
type Mask = {
  width: number
  height: number
  data: Uint8ClampedArray<ArrayBuffer>
}

// Everything that can be changed. A street level is edited as a box round its
// lane, the feet in the middle, with the size of a person kept beside it.
type Data = {
  things: Box[]
  // [x, y, x, y, ...] round the corners
  shapes: number[][]
  flags: Box[]
  lanes: Box[]
  sizes: number[]
}

const KINDS: { kind: Kind; label: string; help: string }[] = [
  {
    kind: "things",
    label: "Walk behind",
    help: "What people walk behind. A box hides people exactly where it is, the red bottom is where it stands: people whose feet are above it go behind. For what a box gets wrong, like lampposts, use a polygon: click to start, click for every corner and click the first dot to close it. Drag a corner or a polygon to change it, double-click an edge to add a corner. Double-click the edge of a box to turn it into a polygon. Orange is what hides people.",
  },
  {
    kind: "flags",
    label: "Flags",
    help: "A loose box round every flag, the flag itself is found inside it by the colours of the nation, so a box away from a flag waves nothing. When a flag is not found, turn on Wave the whole box (dashed) and fit the box tightly. Blue is what waves.",
  },
  {
    kind: "lanes",
    label: "Streets",
    help: "One band for every street level, at most 7. People walk with their feet inside the band. Drag it up and down, its ends to shorten it and its top or bottom to make it wider.",
  },
]

// Masks found by colour alone, shown over the picture but not edited here
type View = "sky" | "water"

const VIEWS: { view: View; label: string; help: string; className: string }[] =
  [
    {
      view: "sky",
      label: "Sky",
      help: "Where clouds drift, found by colour. Only shown here: change the colours in harbor/sky.mjs.",
      className: "bg-warning/60",
    },
    {
      view: "water",
      label: "Water",
      help: "Where the water ripples, found by colour. Only shown here: change the colours in harbor/water.mjs.",
      className: "bg-error/50",
    },
  ]

const SIZES: Record<Variant, number> = { desktop: 2.26, mobile: 2.8 }
const MAX_LEVELS = 7

const loadData = (town: Town, variant: Variant): Data => {
  const front = frontConfig as unknown as {
    towns: Record<
      string,
      Record<string, { things?: Box[]; shapes?: number[][] }>
    >
  }
  const flags = flagsConfig as unknown as Record<string, Record<string, Box[]>>
  const lanes = lanesConfig as unknown as {
    towns: Record<string, Record<string, number[][]>>
  }
  const levels = lanes.towns[town]?.[variant] ?? []

  return {
    things: front.towns[town]?.[variant]?.things ?? [],
    shapes: front.towns[town]?.[variant]?.shapes ?? [],
    flags: flags[town]?.[variant] ?? [],
    lanes: levels.map(
      ([x0, x1, feet, half]) => [x0, feet - half, x1, feet + half] as Box
    ),
    sizes: levels.map((level) => level[4]),
  }
}

// [x start, x end, feet, half width, person size], as lanes.json has them
const toLevels = ({ lanes, sizes }: Data) =>
  lanes.map(([x0, y0, x1, y1], i) => [
    x0,
    x1,
    (y0 + y1) / 2,
    (y1 - y0) / 2,
    sizes[i],
  ])

// Whole pixels with the corners in order. A box keeps what follows its corners,
// like the 1 of a flag that waves as it is.
const normalise = ([x0, y0, x1, y1]: number[], from?: Box): Box => [
  Math.max(0, Math.round(Math.min(x0, x1))),
  Math.max(0, Math.round(Math.min(y0, y1))),
  Math.round(Math.max(x0, x1)),
  Math.round(Math.max(y0, y1)),
  ...(from ?? []).slice(4),
]

const toUrl = (mask: Mask) =>
  new Promise<string>((resolve) => {
    const canvas = document.createElement("canvas")
    canvas.width = mask.width
    canvas.height = mask.height
    canvas
      .getContext("2d")!
      .putImageData(new ImageData(mask.data, mask.width, mask.height), 0, 0)
    canvas.toBlob((blob) => resolve(URL.createObjectURL(blob!)))
  })

const CURSORS: Record<string, string> = {
  move: "move",
  left: "ew-resize",
  right: "ew-resize",
  top: "ns-resize",
  bottom: "ns-resize",
  "left top": "nwse-resize",
  "right bottom": "nwse-resize",
  "right top": "nesw-resize",
  "left bottom": "nesw-resize",
}

// A whole shape moved, kept inside the picture when it is given a size
const moveShape = (
  shape: number[],
  dx: number,
  dy: number,
  width = Infinity,
  height = Infinity
) =>
  shape.map((value, i) =>
    Math.round(
      Math.min(Math.max(value + (i % 2 ? dy : dx), 0), i % 2 ? height : width)
    )
  )

// Even-odd test, the same rule the mask is drawn with
const isInsideShape = (shape: number[], x: number, y: number) => {
  let isInside = false

  for (let i = 0, j = shape.length - 2; i < shape.length; j = i, i += 2) {
    const [xi, yi, xj, yj] = [shape[i], shape[i + 1], shape[j], shape[j + 1]]

    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      isInside = !isInside
    }
  }

  return isInside
}

type Props = {
  town: Town
  variant: Variant
  weather: WeatherType
  zoom: number
  onVariantChange: (variant: Variant) => void
}

// Draw, move and resize the harbour data of a picture: what people walk behind
// (boxes and shapes), the flags and the streets. The walkers and the flags show
// the result live. Saving writes constants/harbor, and the flag mask picture.
const Editor = ({ town, variant, weather, zoom, onVariantChange }: Props) => {
  const map = getTownMap(town)![variant]
  const imageRef = useRef<HTMLImageElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [kind, setKind] = useState<Kind>("things")
  const [picture, setPicture] = useState<ImageData | null>(null)
  const [data, setData] = useState(() => loadData(town, variant))
  const [saved, setSaved] = useState(data)
  const [history, setHistory] = useState<Data[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [selectedShape, setSelectedShape] = useState<number | null>(null)
  const [tool, setTool] = useState<Tool>("box")
  const [drag, setDrag] = useState<Drag | null>(null)
  const [draft, setDraft] = useState<Box | null>(null)
  const [cursor, setCursor] = useState("crosshair")
  const [flagUrl, setFlagUrl] = useState<string>()
  const [frontUrl, setFrontUrl] = useState<string>()
  // A shape being drawn, the pointer for its next line and a corner or shape
  // being dragged
  const [points, setPoints] = useState<[number, number][]>([])
  const [pointer, setPointer] = useState<[number, number] | null>(null)
  const [shapeDrag, setShapeDrag] = useState<{
    index: number
    corner: number | null
    start: [number, number]
    origin: number[]
  } | null>(null)
  const [draftShape, setDraftShape] = useState<number[] | null>(null)
  const [showBoxes, setShowBoxes] = useState(true)
  const [showShapes, setShowShapes] = useState(true)
  const [status, setStatus] = useState("")
  const [view, setView] = useState<View | null>(null)
  const boxes = view ? [] : data[kind]

  // A box or a street never reaches past the edge of the picture
  const within = (box: number[], from?: Box): Box => {
    const [x0, y0, x1, y1, ...rest] = normalise(box, from)

    return [x0, y0, Math.min(x1, map.width), Math.min(y1, map.height), ...rest]
  }

  const ambienceRef = useAmbienceCanvas(
    imageRef,
    createTownMapRenderer,
    flagUrl && frontUrl
      ? [map.waterMask, map.skyMask, flagUrl, frontUrl]
      : undefined,
    {
      uniforms: getWeatherAmbience(weather),
      arrays: {
        desktop: getWalkArrays(toLevels(data), map.width, map.height),
      },
    }
  )

  // The pixels of the picture, to find the things and the flags in
  useEffect(() => {
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      const context = canvas.getContext("2d", { willReadFrequently: true })!
      context.drawImage(image, 0, 0)
      setPicture(context.getImageData(0, 0, canvas.width, canvas.height))
    }
    image.src = map.src
  }, [map.src])

  // The flag mask made from the data the same way the generator makes it. The
  // streets and what people walk behind go to the shader as they are.
  useEffect(() => {
    if (!picture) {
      return
    }

    let made = ""
    let isCancelled = false

    toUrl(detectFlags(picture, TOWNS[town].nation, data.flags)).then((url) => {
      made = url

      if (!isCancelled) {
        setFlagUrl(url)
      }
    })

    return () => {
      isCancelled = true

      // Kept a moment, the renderer may still be loading it
      setTimeout(() => URL.revokeObjectURL(made), 5000)
    }
  }, [picture, data.flags, town])

  // What people walk behind, made the way the game makes it
  useEffect(() => {
    let made = ""
    let isCancelled = false

    makeFrontMaskUrl(map.width, map.height, data.things, data.shapes).then(
      (url) => {
        made = url

        if (!isCancelled) {
          setFrontUrl(url)
        }
      }
    )

    return () => {
      isCancelled = true
      setTimeout(() => URL.revokeObjectURL(made), 5000)
    }
  }, [map.width, map.height, data.things, data.shapes])

  const commit = (next: Data) => {
    setHistory((past) => [...past, data])
    setData(next)
  }

  const setShapes = (next: number[][]) => commit({ ...data, shapes: next })

  const setBoxes = (next: Box[], sizes = data.sizes) =>
    commit({
      ...data,
      [kind]: next,
      sizes: kind === "lanes" ? sizes : data.sizes,
    })

  const select = (box: number | null, shape: number | null = null) => {
    setSelected(box)
    setSelectedShape(shape)
  }

  const chooseKind = (next: Kind) => {
    setKind(next)
    setPoints([])
    setView(null)
    select(null)
  }

  const chooseView = (next: View) => {
    setView(next)
    setPoints([])
    select(null)
  }

  const undo = () => {
    if (!history.length) {
      return
    }

    setData(history[history.length - 1])
    setHistory((past) => past.slice(0, -1))
    select(null)
  }

  const remove = () => {
    if (points.length) {
      setPoints(points.slice(0, -1))

      return
    }

    if (selectedShape !== null) {
      setShapes(data.shapes.filter((_, i) => i !== selectedShape))
      select(null)

      return
    }

    if (selected === null) {
      return
    }

    setBoxes(
      boxes.filter((_, i) => i !== selected),
      data.sizes.filter((_, i) => i !== selected)
    )
    select(null)
  }

  const nudge = (dx: number, dy: number) => {
    if (selectedShape !== null) {
      setShapes(
        data.shapes.map((shape, i) =>
          i === selectedShape ? moveShape(shape, dx, dy) : shape
        )
      )

      return
    }

    if (selected === null) {
      return
    }

    setBoxes(
      boxes.map((box, i) =>
        i === selected
          ? within([box[0] + dx, box[1] + dy, box[2] + dx, box[3] + dy], box)
          : box
      )
    )
  }

  const setSize = (value: number) => {
    if (selected !== null && value > 0) {
      setBoxes(
        boxes,
        data.sizes.map((size, i) => (i === selected ? value : size))
      )
    }
  }

  // Keys work anywhere on the page, except while typing
  const handleKey = (event: KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement) {
      return
    }

    const step = event.shiftKey ? 10 : 1
    const keys: Record<string, () => void> = {
      Delete: remove,
      Backspace: remove,
      Escape: () => {
        setPoints([])
        select(null)
      },
      ArrowLeft: () => nudge(-step, 0),
      ArrowRight: () => nudge(step, 0),
      ArrowUp: () => nudge(0, -step),
      ArrowDown: () => nudge(0, step),
    }

    if ((event.ctrlKey || event.metaKey) && event.key === "z") {
      event.preventDefault()
      undo()
    } else if (keys[event.key]) {
      event.preventDefault()
      keys[event.key]()
    }
  }
  const keyRef = useRef(handleKey)

  useEffect(() => {
    keyRef.current = handleKey
  })

  useEffect(() => {
    const listener = (event: KeyboardEvent) => keyRef.current(event)
    window.addEventListener("keydown", listener)

    return () => window.removeEventListener("keydown", listener)
  }, [])

  const toPicture = (event: {
    clientX: number
    clientY: number
  }): [number, number] => {
    const rect = svgRef.current!.getBoundingClientRect()

    return [
      ((event.clientX - rect.left) / rect.width) * map.width,
      ((event.clientY - rect.top) / rect.height) * map.height,
    ]
  }

  // The box under the pointer, the smallest when they overlap, and which of its
  // edges are near enough to grab
  const hitTest = (event: PointerEvent) => {
    const [x, y] = toPicture(event)
    const rect = svgRef.current!.getBoundingClientRect()
    const near = (5 * map.width) / rect.width
    let best: number | null = null
    let bestArea = Infinity

    boxes.forEach(([x0, y0, x1, y1], i) => {
      const area = (x1 - x0) * (y1 - y0)

      if (
        x > x0 - near &&
        x < x1 + near &&
        y > y0 - near &&
        y < y1 + near &&
        area < bestArea
      ) {
        best = i
        bestArea = area
      }
    })

    if (best === null) {
      return null
    }

    const [x0, y0, x1, y1] = boxes[best]
    const edges = {
      left: Math.abs(x - x0) < near,
      top: Math.abs(y - y0) < near,
      right: Math.abs(x - x1) < near,
      bottom: Math.abs(y - y1) < near,
    }

    // A street is grabbed by its top or bottom to make it wider, both together
    if (kind === "lanes" && (edges.top || edges.bottom)) {
      edges.top = true
      edges.bottom = true
    }

    const names = (["left", "right", "top", "bottom"] as const).filter(
      (edge) => edges[edge]
    )
    const name =
      kind === "lanes" && edges.top ? "bottom" : names.join(" ") || "move"

    return {
      index: best as number,
      edges: names.length ? edges : ("move" as const),
      cursor: CURSORS[name] ?? "move",
    }
  }

  // The edge of a polygon nearest to a point, if it is near enough: the corner
  // it starts at and the nearest point on it
  const nearestEdge = (x: number, y: number, polygons = data.shapes) => {
    const rect = svgRef.current!.getBoundingClientRect()
    const near = (5 * map.width) / rect.width
    let best: { index: number; corner: number; at: [number, number] } | null =
      null
    let bestDistance = near

    polygons.forEach((shape, index) => {
      const count = shape.length / 2

      for (let corner = 0; corner < count; corner++) {
        const next = (corner + 1) % count
        const [ax, ay] = [shape[corner * 2], shape[corner * 2 + 1]]
        const [bx, by] = [shape[next * 2], shape[next * 2 + 1]]
        const length = (bx - ax) ** 2 + (by - ay) ** 2
        const t = length
          ? Math.min(
              1,
              Math.max(
                0,
                ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / length
              )
            )
          : 0
        const at: [number, number] = [
          Math.round(ax + t * (bx - ax)),
          Math.round(ay + t * (by - ay)),
        ]
        const distance = Math.hypot(at[0] - x, at[1] - y)

        if (distance < bestDistance) {
          bestDistance = distance
          best = { index, corner, at }
        }
      }
    })

    return best as {
      index: number
      corner: number
      at: [number, number]
    } | null
  }

  // The corner, edge or inside of a shape under the pointer, the selected shape
  // and its corners first
  const hitShape = (x: number, y: number) => {
    const rect = svgRef.current!.getBoundingClientRect()
    const near = (6 * map.width) / rect.width
    const order = data.shapes
      .map((_, i) => i)
      .sort((a, b) => Number(b === selectedShape) - Number(a === selectedShape))

    for (const index of order) {
      const shape = data.shapes[index]

      for (let i = 0; i < shape.length; i += 2) {
        if (Math.hypot(shape[i] - x, shape[i + 1] - y) < near) {
          return { index, corner: i / 2 }
        }
      }
    }

    const edge = nearestEdge(x, y)

    if (edge) {
      return { index: edge.index, corner: null }
    }

    // The last drawn is on top
    const inside = [...order]
      .sort((a, b) => b - a)
      .find((index) => isInsideShape(data.shapes[index], x, y))

    return inside === undefined ? null : { index: inside, corner: null }
  }

  const handleDoubleClick = (event: MouseEvent<SVGSVGElement>) => {
    if (kind !== "things" || view) {
      return
    }

    const [x, y] = toPicture(event)
    const edge = nearestEdge(x, y)

    if (!edge) {
      // A box becomes a polygon with the same corners and one more, to be
      // refined from there
      const corners = data.things.map(([x0, y0, x1, y1]) => [
        x0,
        y0,
        x1,
        y0,
        x1,
        y1,
        x0,
        y1,
      ])
      const onBox = nearestEdge(x, y, corners)

      if (onBox) {
        const polygon = corners[onBox.index]

        commit({
          ...data,
          things: data.things.filter((_, i) => i !== onBox.index),
          shapes: [
            ...data.shapes,
            [
              ...polygon.slice(0, onBox.corner * 2 + 2),
              ...onBox.at,
              ...polygon.slice(onBox.corner * 2 + 2),
            ],
          ],
        })
        select(null, data.shapes.length)
      }

      return
    }

    setShapes(
      data.shapes.map((shape, i) =>
        i === edge.index
          ? [
              ...shape.slice(0, edge.corner * 2 + 2),
              ...edge.at,
              ...shape.slice(edge.corner * 2 + 2),
            ]
          : shape
      )
    )
    select(null, edge.index)
  }

  const handleShapeDown = (event: PointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    const [px, py] = toPicture(event)
    const x = Math.round(Math.min(Math.max(px, 0), map.width))
    const y = Math.round(Math.min(Math.max(py, 0), map.height))
    const rect = svgRef.current!.getBoundingClientRect()

    if (points.length) {
      const [firstX, firstY] = points[0]

      // The first dot closes the shape
      if (
        points.length >= 3 &&
        Math.hypot(x - firstX, y - firstY) < (8 * map.width) / rect.width
      ) {
        setShapes([...data.shapes, points.flat()])
        select(null, data.shapes.length)
        setPoints([])
      } else {
        setPoints([...points, [x, y]])
      }

      return
    }

    const hit = hitShape(px, py)

    if (hit) {
      select(null, hit.index)
      setShapeDrag({
        ...hit,
        start: [px, py],
        origin: data.shapes[hit.index],
      })

      return
    }

    select(null)
    setPoints([[x, y]])
  }

  const handleShapeMove = (event: PointerEvent<SVGSVGElement>) => {
    const [x, y] = toPicture(event)
    setPointer([x, y])

    if (!shapeDrag) {
      return
    }

    const dx = x - shapeDrag.start[0]
    const dy = y - shapeDrag.start[1]
    const { origin, corner } = shapeDrag

    setDraftShape(
      corner === null
        ? moveShape(origin, dx, dy, map.width, map.height)
        : origin.map((value, i) =>
            i === corner * 2
              ? Math.round(Math.min(Math.max(value + dx, 0), map.width))
              : i === corner * 2 + 1
                ? Math.round(Math.min(Math.max(value + dy, 0), map.height))
                : value
          )
    )
  }

  const handleShapeUp = () => {
    if (
      shapeDrag &&
      draftShape &&
      JSON.stringify(draftShape) !== JSON.stringify(shapeDrag.origin)
    ) {
      setShapes(
        data.shapes.map((shape, i) =>
          i === shapeDrag.index ? draftShape : shape
        )
      )
    }

    setShapeDrag(null)
    setDraftShape(null)
  }

  const handlePointerDown = (event: PointerEvent<SVGSVGElement>) => {
    if (event.button !== 0) {
      return
    }

    // Nothing to draw on a mask that is only shown
    if (view) {
      return
    }

    // A polygon, or something that is already one, is not a box
    if (
      kind === "things" &&
      (tool === "polygon" || points.length || hitShape(...toPicture(event)))
    ) {
      handleShapeDown(event)

      return
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    const point = toPicture(event)
    const hit = hitTest(event)

    if (hit) {
      select(hit.index)
      setDrag({
        index: hit.index,
        edges: hit.edges,
        start: point,
        origin: boxes[hit.index],
      })

      return
    }

    // A new box, drawn from the corner where the pointer went down
    select(null)
    setDrag({
      index: -1,
      edges: { left: false, top: false, right: true, bottom: true },
      start: point,
      origin: [point[0], point[1], point[0], point[1]],
    })
  }

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (kind === "things" && !view) {
      handleShapeMove(event)
    }

    if (shapeDrag || points.length) {
      return
    }

    if (!drag) {
      const [x, y] = toPicture(event)

      setCursor(
        kind === "things" && hitShape(x, y)
          ? "move"
          : tool === "polygon" && kind === "things"
            ? "crosshair"
            : (hitTest(event)?.cursor ?? "crosshair")
      )

      return
    }

    const [x, y] = toPicture(event)
    const dx = x - drag.start[0]
    const dy = y - drag.start[1]
    const [x0, y0, x1, y1] = drag.origin
    const edges = drag.edges

    if (edges !== "move" && kind === "lanes" && edges.top && edges.bottom) {
      // Wider or narrower round the same feet
      const middle = (y0 + y1) / 2
      const half = Math.max(1, Math.abs(y - middle))
      setDraft(within([x0, middle - half, x1, middle + half]))

      return
    }

    setDraft(
      within(
        edges === "move"
          ? [x0 + dx, y0 + dy, x1 + dx, y1 + dy]
          : [
              x0 + (edges.left ? dx : 0),
              y0 + (edges.top ? dy : 0),
              x1 + (edges.right ? dx : 0),
              y1 + (edges.bottom ? dy : 0),
            ],
        drag.origin
      )
    )
  }

  const handlePointerUp = () => {
    if (shapeDrag) {
      handleShapeUp()

      return
    }

    if (drag && draft) {
      if (drag.index >= 0) {
        setBoxes(boxes.map((box, i) => (i === drag.index ? draft : box)))
      } else if (draft[2] - draft[0] >= 3 && draft[3] - draft[1] >= 3) {
        // A click without a drag only clears the selection
        if (kind !== "lanes" || boxes.length < MAX_LEVELS) {
          setBoxes([...boxes, draft], [...data.sizes, SIZES[variant]])
          select(boxes.length)
        } else {
          setStatus(`A picture can have at most ${MAX_LEVELS} streets`)
        }
      }
    }

    setDrag(null)
    setDraft(null)
  }

  const changed = {
    things: JSON.stringify(data.things) !== JSON.stringify(saved.things),
    shapes: JSON.stringify(data.shapes) !== JSON.stringify(saved.shapes),
    flags: JSON.stringify(data.flags) !== JSON.stringify(saved.flags),
    lanes: JSON.stringify(toLevels(data)) !== JSON.stringify(toLevels(saved)),
  }
  const isChanged =
    changed.things || changed.shapes || changed.flags || changed.lanes

  // The flag mask as it is shown, for the server to keep as a picture
  const getFlagMask = async () => {
    const blob = await (await fetch(flagUrl!)).blob()
    const bytes = new Uint8Array(await blob.arrayBuffer())

    return btoa(
      bytes.reduce((text, byte) => text + String.fromCharCode(byte), "")
    )
  }

  const save = async () => {
    setStatus("Saving…")

    const payloads = {
      things: data.things,
      shapes: data.shapes,
      flags: data.flags,
      lanes: toLevels(data),
    }

    try {
      for (const name of ["lanes", "things", "shapes", "flags"] as const) {
        if (!changed[name]) {
          continue
        }

        const response = await fetch(SAVE_PATH, {
          method: "POST",
          body: JSON.stringify({
            kind: name,
            town,
            variant,
            data: payloads[name],
            mask: name === "flags" ? await getFlagMask() : undefined,
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

  const shown = boxes.map((box, i) =>
    draft && drag?.index === i ? draft : box
  )

  if (draft && drag?.index === -1) {
    shown.push(draft)
  }

  const shownShapes = data.shapes.map((shape, i) =>
    draftShape && shapeDrag?.index === i ? draftShape : shape
  )
  const selectedBox = selected !== null ? shown[selected] : null
  const viewing = VIEWS.find((option) => option.view === view)
  const shapeUrl = view
    ? map[view === "sky" ? "skyMask" : "waterMask"]
    : kind === "flags"
      ? flagUrl
      : kind === "things"
        ? frontUrl
        : undefined
  const shapeClass =
    // Flags are often orange themselves
    viewing?.className ?? (kind === "flags" ? "bg-info/70" : "bg-warning/50")
  const streets = !view && kind === "lanes" ? [] : toLevels(data)

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap items-center gap-2">
        {KINDS.map((option) => (
          <Button
            key={option.kind}
            variant={!view && option.kind === kind ? "secondary" : "ghost"}
            onClick={() => chooseKind(option.kind)}
          >
            {option.label}
            {(changed[option.kind] ||
              (option.kind === "things" && changed.shapes)) &&
              " •"}
          </Button>
        ))}

        {VIEWS.map((option) => (
          <Button
            key={option.view}
            variant={option.view === view ? "secondary" : "ghost"}
            onClick={() => chooseView(option.view)}
          >
            {option.label}
          </Button>
        ))}

        <Separator orientation="vertical" className="mx-2 h-6" />

        {(["desktop", "mobile"] as const).map((option) => (
          <Button
            key={option}
            variant={option === variant ? "secondary" : "ghost"}
            onClick={() => {
              if (
                option !== variant &&
                (!isChanged ||
                  window.confirm("Leave without saving the changes?"))
              ) {
                onVariantChange(option)
              }
            }}
          >
            {option === "desktop" ? "Desktop" : "Mobile"}
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

        {kind === "things" && !view && (
          <div className="flex items-center gap-1">
            {(["box", "polygon"] as const).map((option) => (
              <Button
                key={option}
                variant={option === tool ? "secondary" : "ghost"}
                onClick={() => {
                  setTool(option)
                  setPoints([])
                }}
              >
                {option === "box" ? "Box" : "Polygon"}
              </Button>
            ))}
          </div>
        )}

        {[
          ["Boxes", showBoxes, setShowBoxes],
          ["Shapes", showShapes, setShowShapes],
        ].map(([label, checked, onChange]) => (
          <div key={label as string} className="flex items-center gap-2">
            <Switch
              id={`editor-${label}`}
              checked={checked as boolean}
              onCheckedChange={onChange as (value: boolean) => void}
            />
            <Label htmlFor={`editor-${label}`}>{label as string}</Label>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground text-sm">
        {viewing
          ? viewing.help
          : `${KINDS.find((option) => option.kind === kind)!.help} Drag on the picture to draw a new one, drag one to move it and its edges to resize it. Delete removes it (the last corner of a polygon being drawn), Escape stops a polygon, arrows nudge it (Shift for 10 px), Ctrl+Z undoes.`}
      </p>

      {/* Always one line high, so the picture never moves under the pointer */}
      <div className="flex h-9 items-center gap-4 overflow-hidden text-sm whitespace-nowrap">
        <span className="text-muted-foreground">
          {view
            ? "Only shown"
            : `${boxes.length} ${kind === "lanes" ? "streets" : "boxes"}${kind === "things" ? `, ${data.shapes.length} polygons` : ""}`}
          {selectedBox && `, selected [${selectedBox.join(", ")}]`}
          {isChanged && ", not saved"}
        </span>

        {kind === "lanes" && selected !== null && (
          <div className="flex items-center gap-2">
            <Label htmlFor="editor-size">Person size</Label>
            <Input
              id="editor-size"
              type="number"
              step={0.02}
              min={0.5}
              className="w-24"
              value={data.sizes[selected] ?? ""}
              onChange={(event) => setSize(Number(event.target.value))}
            />
          </div>
        )}

        {kind === "flags" && selectedBox && (
          <div className="flex items-center gap-2">
            <Switch
              id="editor-whole"
              checked={selectedBox[4] === 1}
              onCheckedChange={(whole) =>
                setBoxes(
                  boxes.map((box, i) =>
                    i === selected
                      ? ([...box.slice(0, 4), ...(whole ? [1] : [])] as Box)
                      : box
                  )
                )
              }
            />
            <Label htmlFor="editor-whole">Wave the whole box</Label>
          </div>
        )}

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
            src={map.src}
            width={map.width}
            height={map.height}
            alt={`${town} ${variant}`}
            draggable={false}
            className="block h-auto w-full select-none"
          />

          <div
            ref={ambienceRef}
            aria-hidden
            className="pointer-events-none absolute inset-0"
          />

          {showShapes && shapeUrl && (
            <div
              className={cn("pointer-events-none absolute inset-0", shapeClass)}
              style={{
                maskImage: `url(${shapeUrl})`,
                maskSize: "100% 100%",
                WebkitMaskImage: `url(${shapeUrl})`,
                WebkitMaskSize: "100% 100%",
              }}
            />
          )}

          <svg
            ref={svgRef}
            viewBox={`0 0 ${map.width} ${map.height}`}
            preserveAspectRatio="none"
            className="absolute inset-0 size-full touch-none"
            style={{ cursor: drag ? undefined : cursor }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDoubleClick={handleDoubleClick}
          >
            {streets.map(([x0, x1, feet, half], i) => (
              <g
                key={`street-${i}`}
                className="stroke-info"
                strokeDasharray="6 4"
              >
                {[feet - half, feet + half].map((y) => (
                  <line
                    key={y}
                    x1={x0}
                    x2={x1}
                    y1={y}
                    y2={y}
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>
            ))}

            {showBoxes &&
              shown.map(([x0, y0, x1, y1, whole], i) => (
                <g
                  key={`box-${i}`}
                  className={i === selected ? "stroke-gold" : "stroke-sea"}
                >
                  <rect
                    x={x0}
                    y={y0}
                    width={x1 - x0}
                    height={y1 - y0}
                    className={kind === "lanes" ? "fill-info/20" : undefined}
                    fill={kind === "lanes" ? undefined : "none"}
                    strokeWidth={i === selected ? 2 : 1}
                    strokeDasharray={whole === 1 ? "4 3" : undefined}
                    vectorEffect="non-scaling-stroke"
                  />

                  {kind === "things" && (
                    <line
                      x1={x0}
                      x2={x1}
                      y1={y1}
                      y2={y1}
                      className="stroke-error"
                      strokeWidth={3}
                      vectorEffect="non-scaling-stroke"
                    />
                  )}

                  {kind === "lanes" && (
                    <line
                      x1={x0}
                      x2={x1}
                      y1={(y0 + y1) / 2}
                      y2={(y0 + y1) / 2}
                      className="stroke-error"
                      strokeWidth={2}
                      vectorEffect="non-scaling-stroke"
                    />
                  )}
                </g>
              ))}

            {showBoxes &&
              kind === "things" &&
              shownShapes.map((shape, i) => {
                const xs = shape.filter((_, k) => k % 2 === 0)
                const ys = shape.filter((_, k) => k % 2 === 1)
                const base = Math.max(...ys)

                return (
                  <g
                    key={`shape-${i}`}
                    className={
                      i === selectedShape ? "stroke-gold" : "stroke-sea"
                    }
                  >
                    <polygon
                      points={xs.map((x, k) => `${x},${ys[k]}`).join(" ")}
                      className="fill-warning/20"
                      strokeWidth={i === selectedShape ? 2 : 1}
                      vectorEffect="non-scaling-stroke"
                    />

                    <line
                      x1={Math.min(...xs)}
                      x2={Math.max(...xs)}
                      y1={base}
                      y2={base}
                      className="stroke-error"
                      strokeWidth={3}
                      vectorEffect="non-scaling-stroke"
                    />

                    {i === selectedShape &&
                      xs.map((x, k) => (
                        <circle
                          key={k}
                          cx={x}
                          cy={ys[k]}
                          r={3}
                          className="fill-gold stroke-none"
                        />
                      ))}
                  </g>
                )
              })}

            {kind === "things" && points.length > 0 && (
              <g className="stroke-gold">
                <polyline
                  points={[...points, ...(pointer ? [pointer] : [])]
                    .map(([x, y]) => `${x},${y}`)
                    .join(" ")}
                  fill="none"
                  strokeWidth={1.5}
                  vectorEffect="non-scaling-stroke"
                />

                {points.map(([x, y], k) => (
                  <circle
                    key={k}
                    cx={x}
                    cy={y}
                    r={k === 0 ? 5 : 3}
                    className={k === 0 ? "fill-gold/40" : "fill-gold"}
                    strokeWidth={k === 0 ? 1.5 : 0}
                    vectorEffect="non-scaling-stroke"
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

// Starts afresh for the other picture
const TownMaskEditor = (props: Omit<Props, "variant" | "onVariantChange">) => {
  const [variant, setVariant] = useState<Variant>("desktop")

  return (
    <Editor
      key={variant}
      {...props}
      variant={variant}
      onVariantChange={setVariant}
    />
  )
}

export default TownMaskEditor
