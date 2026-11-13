import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import TownMap from "@/components/game-ui/LocationScene/TownMap"
import { TOWNS } from "@/constants/locations"
import { getTownMap } from "@/constants/townMaps"

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
  onMove: (location: TownLocation) => void
}

const meta = {
  title: "game/Harbor/TownMap",
  args: { town: "Port Royale", weather: "foggy", onMove: fn() },
  argTypes: {
    town: {
      control: "select",
      options: Object.keys(TOWNS).sort(),
    },
    weather: {
      control: "radio",
      options: WEATHER,
    },
  },
  render: ({ town, weather, onMove }) => (
    <div className="mx-auto max-w-6xl">
      <TownMap
        key={town}
        map={getTownMap(town)!}
        alt={`Map of ${town}`}
        weather={weather}
        onMove={onMove}
      />
    </div>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
