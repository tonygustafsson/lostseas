import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import AdvisorDrawerTrigger from "@/components/advisor/AdvisorDrawerTrigger"

import { player } from "../../../fixtures"
import PlayerPreview from "../../../PlayerPreview"

// The button only shows when the advisor has something to warn about
const warnings: Player = {
  ...player,
  crewMembers: { count: 40, health: 10, mood: 0 },
  inventory: { ...player.inventory, food: 5, water: 4 },
}

const meta = {
  title: "game/Drawers/Fleet/AdvisorDrawerTrigger",
  component: AdvisorDrawerTrigger,
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={warnings}>
        <Story />
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof AdvisorDrawerTrigger>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: "AdvisorDrawerTrigger" }
