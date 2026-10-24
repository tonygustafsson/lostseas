import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import ShopTradeSummary from "@/components/location/Shop/ShopTradeSummary"

const meta = {
  component: ShopTradeSummary,
  args: {
    gold: 100,
    changes: [
      { item: "food", quantity: -20 },
      { item: "water", quantity: 15 },
    ],
    cargoAfter: 55,
    cargoCapacity: 300,
    onReset: fn(),
    onTransfer: fn(),
  },
} satisfies Meta<typeof ShopTradeSummary>

export default meta
type Story = StoryObj<typeof meta>

export const Receiving: Story = {}

export const Paying: Story = {
  args: { changes: [{ item: "water", quantity: 5 }] },
}

export const NoChanges: Story = {
  args: { changes: [] },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("No changes")).toBeVisible()
    await expect(
      canvas.getByRole("button", { name: "Transfer" })
    ).toBeDisabled()
  },
}

export const ShortOfGold: Story = {
  args: { gold: 10, changes: [{ item: "water", quantity: 5 }] },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Short of gold")).toBeVisible()
    await expect(canvas.getByText("−60")).toBeVisible()
    await expect(
      canvas.getByRole("button", { name: "Transfer" })
    ).toBeDisabled()
  },
}

export const OverCapacity: Story = {
  args: {
    gold: 1000,
    changes: [{ item: "water", quantity: 50 }],
    cargoAfter: 320,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Over capacity")).toBeVisible()
    await expect(
      canvas.getByRole("button", { name: "Transfer" })
    ).toBeDisabled()
  },
}

export const OverloadedButSelling: Story = {
  args: { changes: [{ item: "food", quantity: -20 }], cargoAfter: 320 },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Cargo after trade")).toBeVisible()
    await expect(canvas.getByRole("button", { name: "Transfer" })).toBeEnabled()
  },
}

export const Trading: Story = { args: { isTrading: true } }

export const Transfer: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Transfer" }))

    await expect(args.onTransfer).toHaveBeenCalledOnce()
  },
}
