import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import ShopBuyLimit from "@/components/location/Shop/ShopBuyLimit"
import { MERCHANDISE } from "@/constants/merchandise"

const meta = {
  title: "game/Shop/ShopBuyLimit",
  component: ShopBuyLimit,
  args: { item: "food", max: 196, limitedBy: "gold" },
  argTypes: {
    item: { control: "select", options: Object.keys(MERCHANDISE) },
    max: { control: "number" },
    limitedBy: { control: "inline-radio", options: ["gold", "cargo"] },
  },
} satisfies Meta<typeof ShopBuyLimit>

export default meta
type Story = StoryObj<typeof meta>

export const ShopBuyLimitStory: Story = { name: "ShopBuyLimit" }
