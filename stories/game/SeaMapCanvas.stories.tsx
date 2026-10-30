import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import SeaMapCanvas from "@/components/Map/SeaMapCanvas"
import { TOWNS } from "@/constants/locations"

const towns = Object.keys(TOWNS)

const meta = {
  component: SeaMapCanvas,
  args: { isPaused: false },
  argTypes: {
    currentTown: { control: "select", options: towns },
    selectedTown: { control: "select", options: towns },
    suppliesDays: { control: { type: "number", min: 0 } },
  },
} satisfies Meta<typeof SeaMapCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const InTown: Story = {
  args: { currentTown: "Havana", onSelectTown: fn() },
}

export const AtSea: Story = {
  args: {
    journey: {
      origin: "Havana",
      destination: "Barbados",
      day: 3,
      totalDays: 6,
    },
  },
}

export const LimitedSupplies: Story = {
  args: {
    currentTown: "Havana",
    selectedTown: "Port Royale",
    suppliesDays: 2,
    onSelectTown: fn(),
  },
}

// The ship stays put instead of sailing towards today's position
export const Paused: Story = {
  args: { ...AtSea.args, isPaused: true },
}
