import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import JourneyProgress from "@/components/location/Sea/JourneyProgress"
import { TOWNS } from "@/constants/locations"
import { WEATHER_NAMES } from "@/utils/weather"

const towns = Object.keys(TOWNS)

const meta = {
  title: "game/Sea/JourneyProgress",
  component: JourneyProgress,
  args: {
    journey: {
      origin: "Port Royale",
      destination: "Havana",
      day: 3,
      totalDays: 6,
    },
    day: 15,
    weather: "partlySunny",
  },
  argTypes: {
    day: { control: { type: "number", min: 1 } },
    weather: { control: "radio", options: Object.keys(WEATHER_NAMES) },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof JourneyProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Underway: Story = {}

export const FirstDay: Story = {
  args: {
    journey: { destination: "Tortuga", day: 1, totalDays: 4 },
    day: 13,
  },
}

export const ArrivingToday: Story = {
  args: {
    journey: { destination: "Villa Hermosa", day: 8, totalDays: 8 },
    day: 20,
  },
}

export const Rainy: Story = { args: { weather: "rainy" } }

export const Foggy: Story = { args: { weather: "foggy" } }

// Nothing is shown in port
export const NoJourney: Story = { args: { journey: undefined } }

export const Destinations: Story = {
  argTypes: { journey: { control: false } },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {towns.slice(0, 4).map((town) => (
        <JourneyProgress
          key={town}
          day={args.day}
          weather={args.weather}
          journey={{ ...args.journey!, destination: town as Town }}
        />
      ))}
    </div>
  ),
}
