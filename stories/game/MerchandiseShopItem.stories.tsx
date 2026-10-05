import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

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
export const NoStockToSell: Story = {
  args: { type: "Sell", player: { ...player, inventory: {} } },
}
export const BuyQuantity: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "+" }))
    await expect(canvas.getByRole("spinbutton")).toHaveValue(2)
    await userEvent.click(canvas.getByRole("button", { name: "Buy" }))
    await expect(args.onBuy).toHaveBeenCalledWith({ item: "food", quantity: 2 })
  },
}
export const SellAll: Story = {
  args: { type: "Sell" },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "All" }))
    await expect(args.onSell).toHaveBeenCalledWith({
      item: "food",
      quantity: 180,
    })
  },
}
