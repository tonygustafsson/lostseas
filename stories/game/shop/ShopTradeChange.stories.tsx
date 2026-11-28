import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import ShopTradeChange from "@/components/location/Shop/ShopTradeChange"
import { MERCHANDISE } from "@/constants/merchandise"

const meta = {
  title: "game/Shop/ShopTradeChange",
  component: ShopTradeChange,
  args: { item: "food", owned: 40, target: 15 },
  argTypes: {
    item: { control: "select", options: Object.keys(MERCHANDISE) },
    owned: { control: "number" },
    target: { control: "number" },
  },
} satisfies Meta<typeof ShopTradeChange>

export default meta
type Story = StoryObj<typeof meta>

export const ShopTradeChangeStory: Story = { name: "ShopTradeChange" }
