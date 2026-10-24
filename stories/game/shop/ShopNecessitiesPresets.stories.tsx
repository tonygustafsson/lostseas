import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import ShopNecessitiesPresets from "@/components/location/Shop/ShopNecessitiesPresets"

// 40 crew use 4 food and 8 water a day
const meta = {
  component: ShopNecessitiesPresets,
  args: {
    crewMembers: 40,
    food: 180,
    water: 240,
    freeCargo: 1000,
    onApply: fn(),
  },
} satisfies Meta<typeof ShopNecessitiesPresets>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoCrew: Story = { args: { crewMembers: 0 } }

export const RunningLow: Story = { args: { food: 8, water: 16 } }

export const NotEnoughCargoSpace: Story = {
  args: { food: 8, water: 16, freeCargo: 100 },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "5 days" })).toBeEnabled()
    await expect(canvas.getByRole("button", { name: "25 days" })).toBeDisabled()
    await expect(
      canvas.getByText("Not enough cargo space for longer voyages.")
    ).toBeVisible()
  },
}
