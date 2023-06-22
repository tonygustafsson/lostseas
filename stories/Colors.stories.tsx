import { Meta, StoryObj } from "@storybook/react"
import React from "react"

import { capitalize } from "../utils/string"

const palettes = [
  "slate",
  "gray",
  "zink",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
]
const paletteVariations = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const ColorsDisplay = () => (
  <div className="flex flex-col gap-2">
    {palettes.map((palette) => (
      <>
        <h1 className="text-2xl font-serif">{capitalize(palette)}</h1>

        <div key={palette} className="flex flex-row flex-wrap gap-2">
          {paletteVariations.map((variation) => (
            <div
              key={variation}
              className={`w-20 h-20 flex justify-center border border-gray-700 items-center bg-${palette}-${variation}`}
            >
              <p className="text-xs text-white">{`${palette}-${variation}`}</p>
            </div>
          ))}
        </div>
      </>
    ))}
  </div>
)

const Story: Meta = {
  component: ColorsDisplay,
}

export default Story

export const Colors: StoryObj<typeof ColorsDisplay> = {}
