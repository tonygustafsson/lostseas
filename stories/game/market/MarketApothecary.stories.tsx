import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import MarketApothecary from "@/components/location/Market/MarketApothecary"
import { player } from "@/stories/fixtures"

const withCrew = (health: number, gold = player.character.gold) => ({
  ...player,
  character: { ...player.character, location: "Market" as const, gold },
  crewMembers: { ...player.crewMembers, health },
})

const meta = {
  title: "game/Market/MarketApothecary",
  component: MarketApothecary,
  args: {
    player: withCrew(40),
    onBuy: fn(),
    isBuying: false,
  },
  argTypes: {
    player: { control: false },
  },
} satisfies Meta<typeof MarketApothecary>

export default meta
type Story = StoryObj<typeof meta>

const expectAllDisabledWith = async (
  canvas: Parameters<NonNullable<Story["play"]>>[0]["canvas"],
  message: string
) => {
  for (const button of canvas.getAllByRole("button", { name: /^Buy for/ })) {
    await expect(button).toBeDisabled()
  }

  await expect(canvas.getAllByText(message)).toHaveLength(4)
}

export const HealthyCrew: Story = {
  args: { player: withCrew(100) },
  play: ({ canvas }) =>
    expectAllDisabledWith(canvas, "Your crew is already healthy"),
}

export const InjuredCrew: Story = {
  args: { player: withCrew(40, 5000) },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getAllByRole("button", { name: /^Buy for/ })[0]
    )
    await expect(args.onBuy).toHaveBeenCalledOnce()
  },
}

export const NoGold: Story = {
  args: { player: withCrew(40, 10) },
  play: ({ canvas }) => expectAllDisabledWith(canvas, "You cannot afford this"),
}

export const NoCrew: Story = {
  args: {
    player: {
      ...withCrew(40),
      crewMembers: { ...player.crewMembers, count: 0, health: 40 },
    },
  },
  play: ({ canvas }) =>
    expectAllDisabledWith(canvas, "You have no crew to heal"),
}

export const Buying: Story = {
  args: { player: withCrew(40, 5000), isBuying: true },
}
