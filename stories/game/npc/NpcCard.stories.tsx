import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import NpcCard from "@/components/npc/NpcCard"
import { getNpcAt } from "@/constants/npcs"

const meta = {
  title: "game/Townsfolk/NpcCard",
  component: NpcCard,
  args: {
    npc: getNpcAt("Port Royale", "tavern"),
    hasQuestBusiness: false,
    disabled: false,
    onTalk: fn(),
  },
} satisfies Meta<typeof NpcCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const QuestBadge: Story = {
  args: { hasQuestBusiness: true },
}

/** While a request is on its way */
export const Pending: Story = {
  args: { disabled: true },
}

export const Market: Story = {
  args: { npc: getNpcAt("Havana", "market") },
}
