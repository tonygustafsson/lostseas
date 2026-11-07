import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn, screen } from "storybook/test"

import TavernEventDialog from "@/components/location/Tavern/TavernEventDialog"

const meta = {
  title: "game/Tavern/TavernEventDialog",
  component: TavernEventDialog,
  args: {
    noOfSailors: 4,
    isHostile: false,
    onAccept: fn(),
    onFight: fn(),
    onIgnore: fn(),
    onContinue: fn(),
  },
} satisfies Meta<typeof TavernEventDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Joining: Story = {}

export const Hostile: Story = {
  args: { isHostile: true },
}

/** The fight request is on its way */
export const Fighting: Story = {
  args: { isHostile: true, isPending: true },
}

export const Won: Story = {
  args: {
    isHostile: true,
    result: { numberOfSailors: 4, success: true, loot: 350, healthLoss: 8 },
  },
}

export const Lost: Story = {
  args: {
    isHostile: true,
    result: { numberOfSailors: 4, success: false, loot: 0, healthLoss: 22 },
  },
}

/** Escape does nothing, the player has to pick an answer */
export const CannotClose: Story = {
  play: async ({ args, userEvent }) => {
    await userEvent.keyboard("{Escape}")
    await expect(screen.getByRole("dialog")).toBeVisible()

    await userEvent.click(screen.getByRole("button", { name: "Pass" }))
    await expect(args.onIgnore).toHaveBeenCalledOnce()
  },
}
