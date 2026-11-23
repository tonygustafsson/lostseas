import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { TOWNS } from "@/constants/locations"

import BuildingSceneEditor from "./BuildingSceneEditor"

const LOCATIONS: TownLocation[] = [
  "Bank",
  "City hall",
  "Market",
  "Shipyard",
  "Shop",
  "Tavern",
]

const WEATHER: WeatherType[] = [
  "sunny",
  "partlySunny",
  "cloudy",
  "rainy",
  "foggy",
]

type Args = {
  town: Town
  location: TownLocation
  weather: WeatherType
  zoom: number
}

// A tool for placing fires in building pictures. Saving writes
// constants/buildings/fires.json, so it only works in Storybook started
// locally.
const meta = {
  title: "Ambience editors/Building",
  parameters: { layout: "fullscreen" },
  args: {
    town: "nassau",
    location: "Tavern",
    weather: "sunny",
    zoom: 1,
  },
  argTypes: {
    town: {
      control: "select",
      options: Object.keys(TOWNS).sort(),
    },
    location: {
      control: "select",
      options: LOCATIONS,
    },
    weather: {
      control: "radio",
      options: WEATHER,
    },
    zoom: {
      control: "radio",
      options: [1, 1.5, 2],
    },
  },
  render: (args) => (
    <BuildingSceneEditor key={`${args.town}-${args.location}`} {...args} />
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
