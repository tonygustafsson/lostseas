import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

import * as prettier from "prettier"
import type { Plugin } from "vite"

// Lets the mask editor story save what was changed into the harbour data in
// constants/harbor. Only while Storybook runs locally, a built Storybook has no
// server.
export const SAVE_PATH = "/__mask-editor/save"

const FOLDER = "constants/harbor"

// Where each kind of data lives
const KINDS = {
  // Boxes round what people walk behind
  things: {
    file: "front.json",
    size: 4,
    set: (config: Config, town: string, variant: string, data: unknown) => {
      config.towns[town][variant] = {
        ...config.towns[town][variant],
        things: data,
      }
    },
  },
  // Shapes round what a box is too coarse for, like lampposts
  shapes: {
    file: "front.json",
    size: 0,
    set: (config: Config, town: string, variant: string, data: unknown) => {
      config.towns[town][variant] = {
        ...config.towns[town][variant],
        shapes: data,
      }
    },
  },
  // Polygons round the water that ripples. A town may not have any yet.
  water: {
    file: "water.json",
    size: 0,
    set: (config: Config, town: string, variant: string, data: unknown) => {
      config[town] = { ...config[town], [variant]: data }
    },
  },
  // Flags the shader draws, [x start, x end, top and bottom at the pole, top
  // and bottom at the free end, nation, pole]. A town may not have any
  // yet.
  sprites: {
    file: "flagSprites.json",
    size: 8,
    set: (config: Config, town: string, variant: string, data: unknown) => {
      config[town] = { ...config[town], [variant]: data }
    },
  },
  // Street levels, [x start, x end, feet, half width, person size]
  lanes: {
    file: "lanes.json",
    size: 5,
    set: (config: Config, town: string, variant: string, data: unknown) => {
      config.towns[town][variant] = data
    },
  },
} as const

type Config = Record<string, any>

// Written the way Prettier writes it, so saving changes only what changed
export const format = async (config: unknown, path: string) =>
  prettier.format(JSON.stringify(config, null, 2), {
    ...(await prettier.resolveConfig(path)),
    filepath: path,
  })

const save = async (body: string, root: string) => {
  const { kind, town, variant, data } = JSON.parse(body)
  const settings = KINDS[kind as keyof typeof KINDS]

  if (
    !settings ||
    !/^[a-z-]+$/.test(town) ||
    !["desktop", "mobile"].includes(variant) ||
    !Array.isArray(data) ||
    !data.every(
      (entry) =>
        Array.isArray(entry) &&
        // A shape has at least three corners
        (entry.length === settings.size ||
          (settings.size === 0 &&
            entry.length >= 6 &&
            entry.length % 2 === 0)) &&
        entry.every((value) => Number.isFinite(value) && value >= 0)
    )
  ) {
    throw new Error("Not a kind, a town, a variant and a list of numbers")
  }

  const path = join(root, FOLDER, settings.file)
  const config = JSON.parse(await readFile(path, "utf8"))

  if (!["sprites", "water"].includes(kind) && !(config.towns ?? config)[town]) {
    throw new Error(`There is no ${town} in ${settings.file}`)
  }

  settings.set(config, town, variant, data)
  await writeFile(path, await format(config, path))

  return `Saved ${settings.file}`
}

export const maskEditorServer = (): Plugin => ({
  name: "mask-editor-server",
  configureServer(server) {
    server.middlewares.use(SAVE_PATH, (request, response) => {
      if (request.method !== "POST") {
        response.statusCode = 405
        response.end()

        return
      }

      let body = ""
      request.on("data", (chunk) => {
        body += chunk
      })
      request.on("end", () => {
        // Storybook runs from the project folder
        save(body, process.cwd())
          .then((output) => {
            response.setHeader("Content-Type", "application/json")
            response.end(JSON.stringify({ ok: true, output }))
          })
          .catch((error: Error) => {
            response.statusCode = 400
            response.setHeader("Content-Type", "application/json")
            response.end(JSON.stringify({ ok: false, output: error.message }))
          })
      })
    })
  },
})
