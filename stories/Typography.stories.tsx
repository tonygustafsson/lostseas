import { StoryObj } from "@storybook/react"
import React from "react"

const TypographySansDisplay = () => (
  <>
    <p className="text-xs">Lorem ipsum xs</p>
    <p className="text-sm">Lorem ipsum sm</p>
    <p className="text-base">Lorem ipsum base</p>
    <p className="text-lg">Lorem ipsum lg</p>
    <p className="text-xl">Lorem ipsum xl</p>
    <p className="text-2xl">Lorem ipsum 2xl</p>
    <p className="text-3xl">Lorem ipsum 3xl</p>
    <p className="text-4xl">Lorem ipsum 4xl</p>
    <p className="text-5xl">Lorem ipsum 5xl</p>
    <p className="text-6xl">Lorem ipsum 6xl</p>
    <p className="text-7xl">Lorem ipsum 7xl</p>
    <p className="text-8xl">Lorem ipsum 8xl</p>
    <p className="text-9xl">Lorem ipsum 9xl</p>
  </>
)

const TypographySerifDisplay = () => (
  <>
    <p className="text-xs font-serif">Lorem ipsum xs</p>
    <p className="text-sm font-serif">Lorem ipsum sm</p>
    <p className="text-base font-serif">Lorem ipsum base</p>
    <p className="text-lg font-serif">Lorem ipsum lg</p>
    <p className="text-xl font-serif">Lorem ipsum xl</p>
    <p className="text-2xl font-serif">Lorem ipsum 2xl</p>
    <p className="text-3xl font-serif">Lorem ipsum 3xl</p>
    <p className="text-4xl font-serif">Lorem ipsum 4xl</p>
    <p className="text-5xl font-serif">Lorem ipsum 5xl</p>
    <p className="text-6xl font-serif">Lorem ipsum 6xl</p>
    <p className="text-7xl font-serif">Lorem ipsum 7xl</p>
    <p className="text-8xl font-serif">Lorem ipsum 8xl</p>
    <p className="text-9xl font-serif">Lorem ipsum 9xl</p>
  </>
)

export default {
  component: TypographySansDisplay,
}

export const Sans: StoryObj<typeof TypographySansDisplay> = {
  render: TypographySansDisplay,
}
export const Serif: StoryObj<typeof TypographySerifDisplay> = {
  render: TypographySerifDisplay,
}
