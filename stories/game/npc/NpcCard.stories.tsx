import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import NpcCard from "@/components/npc/NpcCard"
import { getNpcAt } from "@/constants/npcs"

const meta = {
  title: "game/Townsfolk/NpcCard",
  component: NpcCard,
  args: {
    npc: getNpcAt("Port Royale", "tavern"),
    talksLeft: 3,
    hasQuestBusiness: false,
    disabled: false,
    onTalk: fn(),
  },
  argTypes: {
    talksLeft: { control: { type: "range", min: 0, max: 3 } },
  },
} satisfies Meta<typeof NpcCard>

export default meta

type Story = StoryObj<typeof meta>

export const TalksLeft: Story = {}

export const NoTalksLeft: Story = {
  args: { talksLeft: 0 },
}

/** Quest business keeps the conversation open even without talks left */
export const QuestBadge: Story = {
  args: { talksLeft: 0, hasQuestBusiness: true },
}

/** While a request is on its way */
export const Pending: Story = {
  args: { disabled: true },
}

export const Market: Story = {
  args: { npc: getNpcAt("Havana", "market") },
}
