import { MouseEvent, PointerEvent, useEffect, useRef, useState } from "react"

import {
  FLAG_NATIONS,
  getFlagArrays,
  MAX_FLAGS,
} from "@/components/game-ui/LocationScene/flagUniforms"
import {
  GLOOM_AREA,
  makeAreaMaskUrl,
  makeFrontMaskUrl,
} from "@/components/game-ui/LocationScene/frontMask"
import {
  getGullArrays,
  HARBOUR_GULLS,
} from "@/components/game-ui/LocationScene/gulls"
import { GULL_SHEET } from "@/components/game-ui/LocationScene/gullSprites"
import { createTownMapRenderer } from "@/components/game-ui/LocationScene/townMapShader"
import { useAmbienceCanvas } from "@/components/game-ui/LocationScene/useAmbienceCanvas"
import { getWalkerArrays } from "@/components/game-ui/LocationScene/walkers"
import { WALKER_SHEET } from "@/components/game-ui/LocationScene/walkSprites"
import { getWalkArrays } from "@/components/game-ui/LocationScene/walkUniforms"
import { getWeatherAmbience } from "@/components/game-ui/LocationScene/weatherAmbience"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import flagSpritesConfig from "@/constants/harbor/flagSprites.json"
import frontConfig from "@/constants/harbor/front.json"
import lanesConfig from "@/constants/harbor/lanes.json"
import skyConfig from "@/constants/harbor/sky.json"
import waterConfig from "@/constants/harbor/water.json"
import { TOWNS } from "@/constants/locations"
import { getTownMap } from "@/constants/townMaps"
import { cn } from "@/lib/utils"

// Served by .storybook/maskEditorServer.ts
const SAVE_PATH = "/__mask-editor/save"

// x0, y0, x1, y1, and for a flag a 1 when the whole box waves
type Box = [number, number, number, number, ...number[]]
type Variant = "desktop" | "mobile"
type Kind = "things" | "sprites" | "lanes" | "water" | "sky"
type Tool = "box" | "polygon"
type Edges = { left: boolean; top: boolean; right: boolean; bottom: boolean }
type Drag = {
  index: number
  edges: Edges | "move"
  start: [number, number]
  origin: Box
}
// A drawn flag is dragged by one of its four corners (pole top, free end top,
// free end bottom, pole bottom), or as a whole
type SpriteDrag = {
  index: number
  corner: number | null
  start: [number, number]
  origin: number[]
}
// Everything that can be changed. A street level is edited as a box round its
// lane, the feet in the middle, with the size of a person kept beside it.
type Data = {
  things: Box[]
  // [x, y, x, y, ...] round the corners
  shapes: number[][]
  // Where the water ripples, polygons like the shapes
  water: number[][]
  // Where clouds drift, polygons like the water
  sky: number[][]
  // The flags the shader draws, see flagUniforms.ts
  sprites: number[][]
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
    kind: "sprites",
    label: "Flags",
    help: "Flags the shader draws and waves. Drag on the picture to draw a new one, drag a corner to shape it (the two corners at the pole share their x, so do the two at the free end), drag the inside to move it. Pick the nation, and turn the pole on when the picture has none there (it grows with the flag). Put the flag where the old one was, the picture without flags (if there is one) shows around it.",
  },
  {
    kind: "water",
    label: "Water",
    help: "Where the water ripples. Click to start a polygon, click for every corner and click the first dot to close it. Leave out boats and piers by drawing a polygon inside the water, it makes a hole. Drag a corner or a polygon to change it, double-click an edge to add a corner.",
  },
  {
    kind: "sky",
    label: "Sky",
    help: "Where clouds drift. Draw it like the water, up to the top edge of the picture, and leave out roofs, masts and painted clouds as holes. A picture without polygons has no clouds.",
  },
  {
    kind: "lanes",
    label: "Streets",
    help: "One band for every street level, at most 7. People walk with their feet inside the band. Drag it up and down, its ends to shorten it and its top or bottom to make it wider.",
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
  const sprites = flagSpritesConfig as Record<
    string,
    Record<string, number[][]>
  >
  const lanes = lanesConfig as unknown as {
    towns: Record<string, Record<string, number[][]>>
  }
  const water = waterConfig as Record<string, Record<string, number[][]>>
  const sky = skyConfig as Record<string, Record<string, number[][]>>
  const levels = lanes.towns[town]?.[variant] ?? []

  return {
    things: front.towns[town]?.[variant]?.things ?? [],
    shapes: front.towns[town]?.[variant]?.shapes ?? [],
    water: water[town]?.[variant] ?? [],
    sky: sky[town]?.[variant] ?? [],
    sprites: sprites[town]?.[variant] ?? [],
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

// The corners of a drawn flag as x, y pairs: pole top, free end top, free end
// bottom, pole bottom. Corners at the same end share their x.
const getSpriteCorners = ([
  x0,
  x1,
  topStart,
  bottomStart,
  topEnd,
  bottomEnd,
]: number[]) => [x0, topStart, x1, topEnd, x1, bottomEnd, x0, bottomStart]

// A drawn flag moved as a whole, or one corner of it, in whole pixels
const moveSprite = (
  sprite: number[],
  dx: number,
  dy: number,
  corner: number | null = null
) => {
  const [x0, x1, topStart, bottomStart, topEnd, bottomEnd, ...rest] = sprite
  const round = (value: number) => Math.max(0, Math.round(value))

  if (corner === null) {
    return [
      round(x0 + dx),
      round(x1 + dx),
      round(topStart + dy),
      round(bottomStart + dy),
      round(topEnd + dy),
      round(bottomEnd + dy),
      ...rest,
    ]
  }

  // The pole and the free end each stay straight, so a corner moves the x of
  // both corners at its end
  const next = [x0, x1, topStart, bottomStart, topEnd, bottomEnd, ...rest]

  if (corner === 0 || corner === 3) {
    next[0] = Math.min(round(x0 + dx), x1 - 4)
    next[corner === 0 ? 2 : 3] = round(
      (corner === 0 ? topStart : bottomStart) + dy
    )
  } else {
    next[1] = Math.max(round(x1 + dx), x0 + 4)
    next[corner === 1 ? 4 : 5] = round((corner === 1 ? topEnd : bottomEnd) + dy)
  }

  return next
}

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
// the result live. Saving writes constants/harbor.
const Editor = ({ town, variant, weather, zoom, onVariantChange }: Props) => {
  const map = getTownMap(town)![variant]
  const imageRef = useRef<HTMLImageElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [kind, setKind] = useState<Kind>("things")
  const [data, setData] = useState(() => loadData(town, variant))
  const [saved, setSaved] = useState(data)
  const [history, setHistory] = useState<Data[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [selectedShape, setSelectedShape] = useState<number | null>(null)
  const [tool, setTool] = useState<Tool>("box")
  const [drag, setDrag] = useState<Drag | null>(null)
  const [draft, setDraft] = useState<Box | null>(null)
  const [cursor, setCursor] = useState("crosshair")
  const [frontUrl, setFrontUrl] = useState<string>()
  const [waterUrl, setWaterUrl] = useState<string>()
  const [skyUrls, setSkyUrls] = useState<{ sky: string; gloom: string }>()
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
  const [spriteDrag, setSpriteDrag] = useState<SpriteDrag | null>(null)
  const [draftSprite, setDraftSprite] = useState<number[] | null>(null)
  const [showBoxes, setShowBoxes] = useState(true)
  const [showShapes, setShowShapes] = useState(true)
  // The flags the shader draws, and the frames to edit them by
  const [showFlags, setShowFlags] = useState(true)
  const [showFlagFrames, setShowFlagFrames] = useState(true)
  const [status, setStatus] = useState("")
  const isAreaKind = kind === "water" || kind === "sky"
  const isPolygonKind = kind === "things" || isAreaKind
  // The shapes people walk behind, the water and the sky are edited the same way
  const polygonKey = isAreaKind ? kind : "shapes"
  const polygons = data[polygonKey]
  const boxes = kind === "sprites" || isAreaKind ? [] : data[kind]

  // A box or a street never reaches past the edge of the picture
  const within = (box: number[], from?: Box): Box => {
    const [x0, y0, x1, y1, ...rest] = normalise(box, from)

    return [x0, y0, Math.min(x1, map.width), Math.min(y1, map.height), ...rest]
  }

  // The flags as they are while one is being dragged
  const shownSprites = data.sprites.map((sprite, i) =>
    draftSprite && spriteDrag?.index === i ? draftSprite : sprite
  )

  if (draftSprite && spriteDrag?.index === -1) {
    shownSprites.push(draftSprite)
  }

  const ambienceRef = useAmbienceCanvas(
    imageRef,
    createTownMapRenderer,
    frontUrl && waterUrl && skyUrls
      ? [
          waterUrl,
          skyUrls.sky,
          skyUrls.gloom,
          frontUrl,
          WALKER_SHEET.url,
          GULL_SHEET.url,
        ]
      : undefined,
    {
      uniforms: getWeatherAmbience(weather),
      arrays: {
        desktop: {
          ...getWalkArrays(toLevels(data), map.width, map.height),
          ...getFlagArrays(showFlags ? shownSprites : []),
        },
      },
      frameArrays: {
        desktop: (time) => ({
          ...getWalkerArrays(
            time,
            toLevels(data),
            getWeatherAmbience(weather)?.u_activity ?? 1
          ),
          ...getGullArrays(time, HARBOUR_GULLS),
        }),
      },
    }
  )

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

  // The water, made the way the game makes it
  useEffect(() => {
    let made = ""
    let isCancelled = false

    makeAreaMaskUrl(map.width, map.height, data.water).then((url) => {
      made = url

      if (!isCancelled) {
        setWaterUrl(url)
      }
    })

    return () => {
      isCancelled = true
      setTimeout(() => URL.revokeObjectURL(made), 5000)
    }
  }, [map.width, map.height, data.water])

  useEffect(() => {
    let made: string[] = []
    let isCancelled = false

    Promise.all([
      makeAreaMaskUrl(map.width, map.height, data.sky),
      makeAreaMaskUrl(map.width, map.height, data.sky, GLOOM_AREA),
    ]).then(([sky, gloom]) => {
      made = [sky, gloom]

      if (!isCancelled) {
        setSkyUrls({ sky, gloom })
      }
    })

    return () => {
      isCancelled = true
      setTimeout(() => made.forEach((url) => URL.revokeObjectURL(url)), 5000)
    }
  }, [map.width, map.height, data.sky])

  const commit = (next: Data) => {
    setHistory((past) => [...past, data])
    setData(next)
  }

  const setShapes = (next: number[][]) =>
    commit({ ...data, [polygonKey]: next })

  const setSprites = (next: number[][]) => commit({ ...data, sprites: next })

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

    if (kind === "sprites") {
      if (selected !== null) {
        setSprites(data.sprites.filter((_, i) => i !== selected))
        select(null)
      }

      return
    }

    if (selectedShape !== null) {
      setShapes(polygons.filter((_, i) => i !== selectedShape))
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
    if (kind === "sprites") {
      if (selected !== null) {
        setSprites(
          data.sprites.map((sprite, i) =>
            i === selected ? moveSprite(sprite, dx, dy) : sprite
          )
        )
      }

      return
    }

    if (selectedShape !== null) {
      setShapes(
        polygons.map((shape, i) =>
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
  const nearestEdge = (x: number, y: number, list = polygons) => {
    const rect = svgRef.current!.getBoundingClientRect()
    const near = (5 * map.width) / rect.width
    let best: { index: number; corner: number; at: [number, number] } | null =
      null
    let bestDistance = near

    list.forEach((shape, index) => {
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
    const order = polygons
      .map((_, i) => i)
      .sort((a, b) => Number(b === selectedShape) - Number(a === selectedShape))

    for (const index of order) {
      const shape = polygons[index]

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
      .find((index) => isInsideShape(polygons[index], x, y))

    return inside === undefined ? null : { index: inside, corner: null }
  }

  const handleDoubleClick = (event: MouseEvent<SVGSVGElement>) => {
    if (!isPolygonKind) {
      return
    }

    const [x, y] = toPicture(event)
    const edge = nearestEdge(x, y)

    if (!edge) {
      // Only a box can become a polygon
      if (kind !== "things") {
        return
      }

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
      polygons.map((shape, i) =>
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
        setShapes([...polygons, points.flat()])
        select(null, polygons.length)
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
        origin: polygons[hit.index],
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
        polygons.map((shape, i) => (i === shapeDrag.index ? draftShape : shape))
      )
    }

    setShapeDrag(null)
    setDraftShape(null)
  }

  // The corner, or the inside, of a drawn flag under the pointer. The corners
  // of the selected flag come first.
  const hitSprite = (x: number, y: number) => {
    const rect = svgRef.current!.getBoundingClientRect()
    const near = (8 * map.width) / rect.width
    const order = data.sprites
      .map((_, i) => i)
      .sort((a, b) => Number(b === selected) - Number(a === selected))

    for (const index of order) {
      const corners = getSpriteCorners(data.sprites[index])

      for (let corner = 0; corner < 4; corner++) {
        if (
          Math.hypot(corners[corner * 2] - x, corners[corner * 2 + 1] - y) <
          near
        ) {
          return { index, corner }
        }
      }
    }

    const inside = [...order]
      .sort((a, b) => b - a)
      .find((index) =>
        isInsideShape(getSpriteCorners(data.sprites[index]), x, y)
      )

    return inside === undefined ? null : { index: inside, corner: null }
  }

  const handleSpriteDown = (event: PointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    const [x, y] = toPicture(event)
    const hit = hitSprite(x, y)

    if (!hit) {
      // A new flag, drawn as a box from the corner where the pointer went down
      select(null)
      setSpriteDrag({
        index: -1,
        corner: null,
        start: [x, y],
        origin: [x, x, y, y, y, y, getTownNation(), 1],
      })

      return
    }

    select(hit.index)
    setSpriteDrag({ ...hit, start: [x, y], origin: data.sprites[hit.index] })
  }

  const handleSpriteMove = (event: PointerEvent<SVGSVGElement>) => {
    const [x, y] = toPicture(event)

    if (!spriteDrag) {
      const hit = hitSprite(x, y)

      setCursor(hit ? (hit.corner === null ? "move" : "pointer") : "default")

      return
    }

    if (spriteDrag.index === -1) {
      const [startX, startY] = spriteDrag.start
      const [x0, x1] = [Math.min(startX, x), Math.max(startX, x)]
      const [y0, y1] = [Math.min(startY, y), Math.max(startY, y)]
      const [, , , , , , nation, pole] = spriteDrag.origin

      setDraftSprite(
        [x0, x1, y0, y1, y0, y1, nation, pole].map((value) =>
          Math.max(0, Math.round(value))
        )
      )

      return
    }

    setDraftSprite(
      moveSprite(
        spriteDrag.origin,
        x - spriteDrag.start[0],
        y - spriteDrag.start[1],
        spriteDrag.corner
      )
    )
  }

  const handleSpriteUp = () => {
    if (spriteDrag && draftSprite) {
      if (spriteDrag.index === -1) {
        // A click without a drag only clears the selection
        if (
          draftSprite[1] - draftSprite[0] >= 6 &&
          draftSprite[3] - draftSprite[2] >= 6
        ) {
          if (data.sprites.length < MAX_FLAGS) {
            setSprites([...data.sprites, draftSprite])
            select(data.sprites.length)
          } else {
            setStatus(`A picture can have at most ${MAX_FLAGS} flags`)
          }
        }
      } else if (
        JSON.stringify(draftSprite) !== JSON.stringify(spriteDrag.origin)
      ) {
        setSprites(
          data.sprites.map((sprite, i) =>
            i === spriteDrag.index ? draftSprite : sprite
          )
        )
      }
    }

    setSpriteDrag(null)
    setDraftSprite(null)
  }

  // The nation of the town, as the index the flag stores
  const getTownNation = () =>
    Math.max(0, FLAG_NATIONS.indexOf(TOWNS[town].nation))

  // A new flag in the upper middle of the picture, for when drawing one on
  // the picture is awkward
  const addSprite = () => {
    if (data.sprites.length >= MAX_FLAGS) {
      setStatus(`A picture can have at most ${MAX_FLAGS} flags`)

      return
    }

    const x = Math.round(map.width / 2)
    const y = Math.round(map.height / 3)

    setSprites([
      ...data.sprites,
      [x, x + 60, y, y + 30, y, y + 30, getTownNation(), 1],
    ])
    select(data.sprites.length)
  }

  // Changes one value of the selected flag, the nation or whether it has a pole
  const setSpriteValue = (position: 6 | 7, value: number) => {
    if (selected !== null && Number.isFinite(value) && value >= 0) {
      setSprites(
        data.sprites.map((sprite, i) =>
          i === selected
            ? sprite.map((old, k) => (k === position ? Math.round(value) : old))
            : sprite
        )
      )
    }
  }

  const handlePointerDown = (event: PointerEvent<SVGSVGElement>) => {
    if (event.button !== 0) {
      return
    }

    if (kind === "sprites") {
      handleSpriteDown(event)

      return
    }

    // Water and sky are only polygons. For what people walk behind, a polygon or
    // something that is already one is not a box.
    if (
      isAreaKind ||
      (kind === "things" &&
        (tool === "polygon" || points.length || hitShape(...toPicture(event))))
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
    if (kind === "sprites") {
      handleSpriteMove(event)

      return
    }

    if (isPolygonKind) {
      handleShapeMove(event)
    }

    if (shapeDrag || points.length) {
      return
    }

    if (!drag) {
      const [x, y] = toPicture(event)

      setCursor(
        isPolygonKind && hitShape(x, y)
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
    if (spriteDrag) {
      handleSpriteUp()

      return
    }

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
    water: JSON.stringify(data.water) !== JSON.stringify(saved.water),
    sky: JSON.stringify(data.sky) !== JSON.stringify(saved.sky),
    sprites: JSON.stringify(data.sprites) !== JSON.stringify(saved.sprites),
    lanes: JSON.stringify(toLevels(data)) !== JSON.stringify(toLevels(saved)),
  }
  const isChanged =
    changed.things ||
    changed.shapes ||
    changed.water ||
    changed.sky ||
    changed.sprites ||
    changed.lanes

  const save = async () => {
    setStatus("Saving…")

    const payloads = {
      things: data.things,
      shapes: data.shapes,
      water: data.water,
      sky: data.sky,
      sprites: data.sprites,
      lanes: toLevels(data),
    }

    try {
      for (const name of [
        "lanes",
        "things",
        "shapes",
        "water",
        "sky",
        "sprites",
      ] as const) {
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

  const shownShapes = polygons.map((shape, i) =>
    draftShape && shapeDrag?.index === i ? draftShape : shape
  )
  const selectedBox = selected !== null ? shown[selected] : null
  const shapeUrl = kind === "things" ? frontUrl : undefined
  const streets = kind === "lanes" ? [] : toLevels(data)

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
            {(changed[option.kind] ||
              (option.kind === "things" && changed.shapes)) &&
              " •"}
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
          disabled={selected === null && selectedShape === null}
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

        {kind === "things" && (
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

        {kind === "sprites" && (
          <Button variant="secondary" onClick={addSprite}>
            Add flag
          </Button>
        )}

        {[
          ["Boxes", showBoxes, setShowBoxes],
          ["Shapes", showShapes, setShowShapes],
          ["Flags", showFlags, setShowFlags],
          ["Flag frames", showFlagFrames, setShowFlagFrames],
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
        {kind === "sprites"
          ? `${KINDS.find((option) => option.kind === kind)!.help} Delete removes the selected flag, arrows nudge it (Shift for 10 px), Ctrl+Z undoes.`
          : isAreaKind
            ? `${KINDS.find((option) => option.kind === kind)!.help} Delete removes the selected polygon (the last corner of one being drawn), Escape stops a polygon, arrows nudge it (Shift for 10 px), Ctrl+Z undoes.`
            : `${KINDS.find((option) => option.kind === kind)!.help} Drag on the picture to draw a new one, drag one to move it and its edges to resize it. Delete removes it (the last corner of a polygon being drawn), Escape stops a polygon, arrows nudge it (Shift for 10 px), Ctrl+Z undoes.`}
      </p>

      {/* Always one line high, so the picture never moves under the pointer */}
      <div className="flex h-9 items-center gap-4 overflow-hidden text-sm whitespace-nowrap">
        <span className="text-muted-foreground">
          {kind === "sprites"
            ? `${data.sprites.length} flags`
            : isAreaKind
              ? `${data[kind].length} polygons`
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

        {kind === "sprites" && selected !== null && data.sprites[selected] && (
          <>
            <div className="flex items-center gap-2">
              <Label>Nation</Label>
              <Select
                value={String(data.sprites[selected][6] ?? 0)}
                onValueChange={(value) => setSpriteValue(6, Number(value))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {FLAG_NATIONS.map((nation, index) => (
                    <SelectItem key={nation} value={String(index)}>
                      {nation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="editor-pole"
                checked={data.sprites[selected][7] === 1}
                onCheckedChange={(pole) => setSpriteValue(7, pole ? 1 : 0)}
              />
              <Label htmlFor="editor-pole">Pole</Label>
            </div>
          </>
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
              className={cn(
                "bg-warning/50 pointer-events-none absolute inset-0"
              )}
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
              isPolygonKind &&
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
                      className={
                        kind === "things" ? "fill-warning/20" : "fill-sea/20"
                      }
                      strokeWidth={i === selectedShape ? 2 : 1}
                      vectorEffect="non-scaling-stroke"
                    />

                    {kind === "things" && (
                      <line
                        x1={Math.min(...xs)}
                        x2={Math.max(...xs)}
                        y1={base}
                        y2={base}
                        className="stroke-error"
                        strokeWidth={3}
                        vectorEffect="non-scaling-stroke"
                      />
                    )}

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

            {kind === "sprites" &&
              showFlagFrames &&
              shownSprites.map((sprite, i) => {
                const corners = getSpriteCorners(sprite)
                const points = [0, 1, 2, 3]
                  .map(
                    (corner) =>
                      `${corners[corner * 2]},${corners[corner * 2 + 1]}`
                  )
                  .join(" ")

                return (
                  <g
                    key={`sprite-${i}`}
                    className={i === selected ? "stroke-gold" : "stroke-sea"}
                  >
                    <polygon
                      points={points}
                      fill="none"
                      strokeWidth={i === selected ? 2 : 1}
                      vectorEffect="non-scaling-stroke"
                    />

                    {i === selected &&
                      [0, 1, 2, 3].map((corner) => (
                        <circle
                          key={corner}
                          cx={corners[corner * 2]}
                          cy={corners[corner * 2 + 1]}
                          r={6}
                          className="fill-gold stroke-none"
                        />
                      ))}
                  </g>
                )
              })}

            {isPolygonKind && points.length > 0 && (
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
