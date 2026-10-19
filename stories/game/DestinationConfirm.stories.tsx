import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import DestinationConfirm from "@/components/Map/DestinationConfirm"

import { player } from "../fixtures"

const meta = {
  component: DestinationConfirm,
  decorators: [
    (Story) => (
      <div className="relative h-64">
        <Story />
      </div>
    ),
  ],
  args: {
    player,
    destination: "Havana",
    isPending: false,
    onConfirm: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof DestinationConfirm>

export default meta
type Story = StoryObj<typeof meta>

export const InReach: Story = {}

export const OutOfReach: Story = {
  args: {
    destination: "Biloxi",
    player: { ...player, inventory: { ...player.inventory, water: 20 } },
  },
}
