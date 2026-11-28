import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import ShopTradeTotals from "@/components/location/Shop/ShopTradeTotals"

const meta = {
  title: "game/Shop/ShopTradeTotals",
  component: ShopTradeTotals,
  args: {
    gold: 500,
    changes: [
      { item: "food", quantity: 20 },
      { item: "water", quantity: -15 },
    ],
    cargoAfter: 55,
    cargoCapacity: 300,
  },
  argTypes: {
    gold: { control: "number" },
    changes: { control: "object" },
    cargoAfter: { control: "number" },
    cargoCapacity: { control: "number" },
  },
} satisfies Meta<typeof ShopTradeTotals>

export default meta
type Story = StoryObj<typeof meta>

export const ShopTradeTotalsStory: Story = { name: "ShopTradeTotals" }
