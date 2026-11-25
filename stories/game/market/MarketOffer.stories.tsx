import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import MarketOffer from "@/components/location/Market/MarketOffer"

const meta = {
  title: "game/Market/MarketOffer",
  component: MarketOffer,
  args: {
    item: "rum",
    price: 30,
    quantity: 12,
    owned: 4,
    gold: 1000,
    cargoFree: 200,
    onBuy: fn(),
  },
  render: (args) => (
    <ul className="max-w-sm">
      <MarketOffer {...args} />
    </ul>
  ),
} satisfies Meta<typeof MarketOffer>

export default meta
type Story = StoryObj<typeof meta>

export const Bargain: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Buy for 360 gold" })
    )
    await expect(args.onBuy).toHaveBeenCalledOnce()
    await expect(canvas.queryByText("You cannot afford this")).toBeNull()
  },
}

export const CannotAfford: Story = {
  args: { gold: 100 },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("You cannot afford this")).toBeVisible()
    await expect(
      canvas.getByRole("button", { name: "Buy for 360 gold" })
    ).toBeDisabled()
  },
}

export const NoCargoSpace: Story = {
  args: { cargoFree: 5 },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(
        "You cannot buy this, there is not enough space in your hold"
      )
    ).toBeVisible()
    await expect(
      canvas.getByRole("button", { name: "Buy for 360 gold" })
    ).toBeDisabled()
  },
}

// Repair kits don't take up space in the hold
export const RepairKits: Story = {
  args: { item: "repairKits", price: 20, quantity: 5, cargoFree: 0 },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText("A trader offers 5 kits of repair kits.")
    ).toBeVisible()
    await expect(
      canvas.getByRole("button", { name: "Buy for 100 gold" })
    ).toBeEnabled()
  },
}

export const NoDiscount: Story = { args: { item: "food", price: 16 } }

export const Row: Story = {
  render: (args) => (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MarketOffer {...args} />

      <MarketOffer {...args} item="medicine" price={9} quantity={5} />

      <MarketOffer {...args} item="silk" price={40} quantity={30} owned={0} />
    </ul>
  ),
}
