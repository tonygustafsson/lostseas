import { Meta, StoryObj } from "@storybook/react"
import React from "react"

const palettes = ["slate", "gray", "zink"]
const paletteVariations = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const ColorsDisplay = () => (
  <>
    {palettes.map((palette) => (
      <div key={palette} className="flex flex-row flex-wrap">
        {paletteVariations.map((variation) => (
          <div
            key={variation}
            className={`w-16 h-16 bg-${palette}-${variation}`}
          />
        ))}
      </div>
    ))}
  </>
)

const Story: Meta = {
  component: ColorsDisplay,
}

export default Story

export const Colors: StoryObj<typeof ColorsDisplay> = {}
