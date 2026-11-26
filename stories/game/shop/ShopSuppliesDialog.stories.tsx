import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn, screen } from "storybook/test"

import ShopSuppliesDialog from "@/components/location/Shop/ShopSuppliesDialog"

// 40 crew use 4 food and 8 water a day
const meta = {
  title: "game/Shop/ShopSuppliesDialog",
  component: ShopSuppliesDialog,
  args: {
    crewMembers: 40,
    food: 180,
    water: 240,
    gold: 500,
    changes: [
      { item: "food", quantity: 20 },
      { item: "water", quantity: 15 },
    ],
    cargoAfter: 55,
    cargoCapacity: 300,
    canSellBarterGoods: true,
    onApply: fn(),
    onSellBarterGoods: fn(),
    onReset: fn(),
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Stock up for a voyage" })
    )
  },
} satisfies Meta<typeof ShopSuppliesDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Days the player already has covered are shown as sea buttons */
export const Covered: Story = {
  args: { food: 160, water: 320 },
  play: async (context) => {
    await meta.play(context)

    await expect(
      screen.getByRole("button", { name: "40 days" })
    ).toHaveAttribute("data-variant", "secondary")
    await expect(
      screen.getByRole("button", { name: "50 days" })
    ).toHaveAttribute("data-variant", "outline")
  },
}

export const NoCrew: Story = { args: { crewMembers: 0 } }

export const RunningLow: Story = { args: { food: 8, water: 16 } }

export const NoBarterGoods: Story = {
  args: { canSellBarterGoods: false },
  play: async (context) => {
    await meta.play(context)

    await expect(
      screen.getByRole("button", { name: "Sell all barter goods" })
    ).toBeDisabled()
  },
}

export const NotEnoughCargoSpace: Story = {
  args: { food: 8, water: 16, cargoAfter: 200 },
  play: async (context) => {
    await meta.play(context)

    await expect(screen.getByRole("button", { name: "10 days" })).toBeEnabled()
    await expect(
      screen.getByRole("button", { name: "100 days" })
    ).toBeDisabled()
    await expect(
      screen.getByText("Not enough cargo space for the longer voyages.")
    ).toBeVisible()
  },
}
