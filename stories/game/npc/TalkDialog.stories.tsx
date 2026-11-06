import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import TalkDialog from "@/components/npc/TalkDialog"
import { getNpcAt } from "@/constants/npcs"
import type { TalkLine } from "@/utils/actions/npc"

const npc = getNpcAt("Port Royale", "tavern")

const quest: Quest = {
  id: "quest-1",
  giverId: npc.id,
  acceptedDay: 12,
  pitch:
    "Would you carry a sealed letter to Catalina Ruiz in Havana? Try the market first.",
  reward: { gold: 900 },
  type: "delivery",
  parcel: "a sealed letter",
  targetNpcId: getNpcAt("Havana", "market").id,
}

const meta = {
  title: "game/Townsfolk/TalkDialog",
  component: TalkDialog,
  args: {
    npc,
    open: true,
    line: {
      kind: "statement",
      text: "I once arm wrestled a Spanish admiral. He cheated, of course. He used both arms and his first mate.",
    },
    lineId: 1,
    reply: null,
    isPending: false,
    onAnswer: fn(),
    onAccept: fn(),
    onDecline: fn(),
    onHandIn: fn(),
    onNotYet: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof TalkDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Statement: Story = {}

const question: TalkLine = {
  kind: "question",
  text: "Tell me, captain, what is the finest thing a sailor can own?",
  answers: [
    "A fast ship.",
    "A loyal crew.",
    "A hat with a bigger feather than yours.",
  ],
}

export const Question: Story = {
  args: { line: question },
}

export const ReplyShown: Story = {
  args: {
    line: question,
    reply:
      "Bigger than mine? Ha! There is not a bird in the Caribbean brave enough.",
  },
}

export const QuestOffer: Story = {
  args: { line: { kind: "questOffer", text: quest.pitch, quest } },
}

export const QuestProgress: Story = {
  args: {
    line: {
      kind: "questProgress",
      text: "A letter for me? From Port Royale? Well, I never. Thank you, captain.",
      quest,
      completed: false,
    },
  },
}

export const QuestProgressWithReward: Story = {
  args: {
    line: {
      kind: "questProgress",
      text: "You found them all! I knew you were more than a pretty hat.",
      quest,
      completed: true,
      reward: { gold: 900, item: { name: "rum", quantity: 20 } },
    },
  },
}

/** Procurement goods are only handed over when the player agrees */
export const HandIn: Story = {
  args: {
    line: {
      kind: "handIn",
      text: "Ah, 40 barrels of rum, just as I asked. Shall we trade, or did you only come to gloat?",
      quest: {
        id: "quest-2",
        giverId: npc.id,
        acceptedDay: 12,
        pitch: "Bring me 40 barrels of rum.",
        reward: { gold: 900 },
        type: "procurement",
        item: "rum",
        quantity: 40,
      },
    },
  },
}

/** Buttons are disabled while a request is on its way */
export const Pending: Story = {
  args: { isPending: true },
}

export const PendingAnswer: Story = {
  args: {
    line: question,
    isPending: true,
  },
}

export const Closed: Story = {
  args: { open: false },
}
