import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import InventoryCard from "@/components/menu/InventoryCard"
import { player } from "@/stories/fixtures"

const meta = {
  component: InventoryCard,
  args: { player },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InventoryCard>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Empty: Story = { args: { player: { ...player, inventory: {} } } }
