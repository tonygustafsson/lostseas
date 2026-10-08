import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import SeaMapCanvas from "@/components/Map/SeaMapCanvas"

const meta = {
  component: SeaMapCanvas,
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
