import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import InventoryItemCard from "@/components/InventoryItemCard"
import { MERCHANDISE } from "@/constants/merchandise"

const meta = {
  title: "game/Drawers/Inventory/InventoryItemCard",
  component: InventoryItemCard,
  args: {
    item: "food",
    quantity: 180,
  },
  argTypes: {
    item: { control: "select", options: Object.keys(MERCHANDISE) },
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

export const Default: Story = { name: "InventoryItemCard" }
