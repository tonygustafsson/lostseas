import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import LootPicker from "@/components/location/Sea/LootPicker"

const meta = {
  component: LootPicker,
  args: {
    offer: { food: 8, rum: 3, silk: 5, cannons: 2 },
    load: 60,
    capacity: 300,
    onTake: fn(),
  },
} satisfies Meta<typeof LootPicker>

export default meta
type Story = StoryObj<typeof meta>

export const TakeAll: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Take loot and sail on" })
    )

    await expect(args.onTake).toHaveBeenCalledWith({
      food: 8,
      rum: 3,
      silk: 5,
      cannons: 2,
    })
  },
}

// Only 10 slots are free: supplies first, then the most valuable goods
export const AlmostFull: Story = {
  args: { load: 290 },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Take loot and sail on" })
    )

    await expect(args.onTake).toHaveBeenCalledWith({
      food: 8,
      rum: 2,
      silk: 0,
      cannons: 2,
    })
  },
}

export const Taking: Story = { args: { isTaking: true } }
