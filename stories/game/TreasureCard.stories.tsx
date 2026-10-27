import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import InventoryItemCard from "@/components/InventoryItemCard"
import TreasureCard from "@/components/TreasureCard"

const meta = {
  component: TreasureCard,
  args: {
    treasure: { id: "treasure-1", name: "Inca mask", rewarder: "Havana" },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TreasureCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const KeyOfSouls: Story = {
  args: {
    treasure: { id: "treasure-2", name: "Key of souls", rewarder: "Tortuga" },
  },
}

/** Beside ordinary inventory cards, as in the Inventory drawer */
export const WithInventoryCards: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <InventoryItemCard item="food" quantity={40} />
        <InventoryItemCard item="rum" quantity={12} />
      </div>

      <TreasureCard {...args} />
    </div>
  ),
}
