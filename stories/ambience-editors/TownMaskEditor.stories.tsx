import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { TOWNS } from "@/constants/locations"

import TownMaskEditor from "./TownMaskEditor"

const WEATHER: WeatherType[] = [
  "sunny",
  "partlySunny",
  "cloudy",
  "rainy",
  "foggy",
]

type Args = {
  town: Town
  weather: WeatherType
  zoom: number
}

// A tool for fixing what people walk behind, the flags and the streets of the
// harbour pictures. Saving writes the data in constants/harbor and the flag
// mask picture, so it only works in Storybook started locally.
const meta = {
  title: "Ambience editors/Harbor",
  parameters: { layout: "fullscreen" },
  args: {
    town: "kingston",
    weather: "sunny",
    zoom: 1,
  },
  argTypes: {
    town: {
      control: "select",
      options: Object.keys(TOWNS).sort(),
    },
    weather: {
      control: "radio",
      options: WEATHER,
    },
    zoom: {
      control: "radio",
      options: [1, 1.5, 2, 3],
    },
  },
  render: (args) => <TownMaskEditor key={args.town} {...args} />,
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: "Harbor" }
