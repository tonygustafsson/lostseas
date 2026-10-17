import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import InventoryItemCard from "@/components/InventoryItemCard"

const meta = {
  component: InventoryItemCard,
  args: {
    item: "food",
    quantity: 180,
  },
  decorators: [
    (Story) => (
      <div className="max-w-48">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InventoryItemCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleUnit: Story = { args: { item: "cannons", quantity: 1 } }

export const RepairKits: Story = { args: { item: "repairKits", quantity: 4 } }
