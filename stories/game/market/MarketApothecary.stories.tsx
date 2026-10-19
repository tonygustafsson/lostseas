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

export const HealthyCrew: Story = {
  args: { player: withCrew(100) },
  play: async ({ canvas }) => {
    for (const button of canvas.getAllByRole("button", { name: "Buy" })) {
      await expect(button).toBeDisabled()
    }
  },
}

export const InjuredCrew: Story = {
  args: { player: withCrew(40, 5000) },
}

export const NoGold: Story = {
  args: { player: withCrew(40, 10) },
  play: async ({ canvas }) => {
    for (const button of canvas.getAllByRole("button", { name: "Buy" })) {
      await expect(button).toBeDisabled()
    }
  },
}

export const NoCrew: Story = {
  args: {
    player: {
      ...withCrew(40),
      crewMembers: { ...player.crewMembers, count: 0, health: 40 },
    },
  },
  play: async ({ canvas }) => {
    for (const button of canvas.getAllByRole("button", { name: "Buy" })) {
      await expect(button).toBeDisabled()
    }
  },
}
