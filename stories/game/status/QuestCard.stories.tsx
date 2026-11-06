import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import QuestCard from "@/components/quests/QuestCard"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"
import {
  deliveryQuest,
  findPersonFoundQuest,
  findPersonQuest,
  itemRewardQuest,
  messageChainQuest,
  procurementQuest,
} from "../../questFixtures"

const meta = {
  title: "game/Status/QuestCard",
  component: QuestCard,
  args: { quest: deliveryQuest, onAbandon: fn() },
  decorators: [
    (Story) => (
      <PlayerPreview data={player}>
        <div className="max-w-sm">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof QuestCard>

export default meta

type Story = StoryObj<typeof meta>

export const Delivery: Story = {}

export const Procurement: Story = { args: { quest: procurementQuest } }

export const MessageChainStep2Of3: Story = {
  args: { quest: messageChainQuest },
}

export const FindPerson: Story = { args: { quest: findPersonQuest } }

export const FindPersonFound: Story = {
  args: { quest: findPersonFoundQuest },
}

export const ItemReward: Story = { args: { quest: itemRewardQuest } }
