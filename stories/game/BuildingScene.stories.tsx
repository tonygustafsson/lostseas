import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import BuildingScene from "@/components/game-ui/LocationScene/BuildingScene"
import { TOWNS } from "@/constants/locations"

import { player } from "../fixtures"
import PlayerPreview from "../PlayerPreview"

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

const meta = {
  title: "game/BuildingScene",
  component: BuildingScene,
  args: { town: "cap-francais", location: "Tavern", weather: "partlySunny" },
  argTypes: {
    weather: { control: "radio", options: WEATHER },
    town: {
      control: "select",
      options: Object.keys(TOWNS).sort(),
    },
    location: {
      control: "select",
      options: LOCATIONS,
    },
    hide: {
      control: "check",
      options: ["water", "sky", "dust", "beams", "fire", "intro"],
    },
  },
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={player}>
        <div className="mx-auto max-w-6xl">
          <Story key={`${context.args.town}-${context.args.location}`} />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof BuildingScene>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: "BuildingScene" }
