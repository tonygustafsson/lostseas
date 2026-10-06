import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import MerchandiseShopItem from "@/components/MerchandiseShopItem"
import { player } from "@/stories/fixtures"

const meta = {
  component: MerchandiseShopItem,
  args: { player, item: "food", type: "Buy", onBuy: fn(), onSell: fn() },
} satisfies Meta<typeof MerchandiseShopItem>

export default meta
type Story = StoryObj<typeof meta>

export const Buy: Story = {}

export const Sell: Story = { args: { type: "Sell" } }

export const CannotAfford: Story = {
  args: { player: { ...player, character: { ...player.character, gold: 0 } } },
}
