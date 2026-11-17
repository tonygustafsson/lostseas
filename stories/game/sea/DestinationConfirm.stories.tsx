import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import DestinationConfirm from "@/components/Map/DestinationConfirm"
import { TOWNS } from "@/constants/locations"

import { player } from "../../fixtures"

// The fixture player is British and sails from Kingston.
// Havana (Spain) is 7 days away and needs 28 food and 56 water.
// Fort Louis (France, at war with Great Britain) is 10 days away and needs 40 food and 80 water.
const withSupplies = (food: number, water: number) => ({
  ...player,
  inventory: { ...player.inventory, food, water },
})

const meta = {
  title: "game/Sea/DestinationConfirm",
  component: DestinationConfirm,
  decorators: [
    (Story) => (
      <div className="relative h-160">
        <Story />
      </div>
    ),
  ],
  args: {
    player,
    origin: player.character.town!,
    destination: "havana",
    isPending: false,
    onConfirm: fn(),
    onCancel: fn(),
  },
  argTypes: {
    origin: { control: "select", options: Object.keys(TOWNS) },
    destination: { control: "select", options: Object.keys(TOWNS) },
  },
} satisfies Meta<typeof DestinationConfirm>

export default meta
type Story = StoryObj<typeof meta>

export const NeutralPort: Story = {}

export const HomePort: Story = {
  args: { destination: "nassau" },
}

export const EnemyPort: Story = {
  args: { destination: "cap-francais" },
}

// Arrives with an empty hold, but the voyage is still allowed
export const JustEnoughSupplies: Story = {
  args: { player: withSupplies(28, 56) },
}

export const ShortOnFood: Story = {
  args: { player: withSupplies(4, 160) },
}

export const ShortOnWater: Story = {
  args: { player: withSupplies(100, 10) },
}

export const ShortOnBoth: Story = {
  args: { player: withSupplies(4, 10) },
}

export const EmptyHold: Story = {
  args: { player: withSupplies(0, 0) },
}

export const EnemyPortOutOfReach: Story = {
  args: { destination: "fort-louis", player: withSupplies(100, 20) },
}

export const SettingSail: Story = {
  args: { isPending: true },
}
