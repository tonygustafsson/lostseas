import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import JourneyProgress from "@/components/location/Sea/JourneyProgress"
import { TOWNS } from "@/constants/locations"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

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
  },
  argTypes: {
    day: { control: { type: "number", min: 1 } },
  },
  decorators: [
    // The weather icon reads the day from the player, so it follows the arg
    (Story, context) => (
      <PlayerPreview
        key={context.args.day}
        data={{
          ...player,
          character: { ...player.character, day: context.args.day },
        }}
      >
        <div className="max-w-md">
          <Story />
        </div>
      </PlayerPreview>
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
          journey={{ ...args.journey!, destination: town as Town }}
        />
      ))}
    </div>
  ),
}
