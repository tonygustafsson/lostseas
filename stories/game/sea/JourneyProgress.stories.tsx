import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps } from "react"

import JourneyProgress from "@/components/location/Sea/JourneyProgress"
import { TOWNS } from "@/constants/locations"
import { WEATHER_NAMES } from "@/utils/weather"

type JourneyProgressArgs = ComponentProps<typeof JourneyProgress> & {
  journeyDay: number
  daysLeft: number
  destination: Town
}

const meta = {
  title: "game/Sea/JourneyProgress",
  component: JourneyProgress,
  args: {
    journeyDay: 3,
    daysLeft: 3,
    destination: "havana",
    day: 15,
    weather: "partlySunny",
  },
  argTypes: {
    journeyDay: { control: { type: "number", min: 1 } },
    daysLeft: { control: { type: "number", min: 0 } },
    destination: { control: "select", options: Object.keys(TOWNS) },
    weather: { control: "radio", options: Object.keys(WEATHER_NAMES) },
    day: { table: { disable: true } },
    journey: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<JourneyProgressArgs>

export default meta
type Story = StoryObj<JourneyProgressArgs>

export const Default: Story = {
  name: "JourneyProgress",
  render: ({ journeyDay, daysLeft, destination, ...args }) => (
    <JourneyProgress
      {...args}
      journey={{
        origin: "kingston",
        destination,
        day: journeyDay,
        totalDays: journeyDay + daysLeft,
      }}
    />
  ),
}
