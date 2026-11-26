import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import Cityhall from "@/components/location/Cityhall"
import { getNpcAt } from "@/constants/npcs"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

// A British captain in Kingston. Great Britain is at war with France.
const atCityhall = ({
  character,
  ...rest
}: Partial<Omit<Player, "character">> & {
  character?: DeepPartial<Character>
} = {}): Player => ({
  ...player,
  ...rest,
  character: {
    ...player.character,
    location: "City hall",
    ...character,
    battles: (character?.battles ?? {}) as Character["battles"],
  } as Character,
})

const meta = {
  title: "game/City hall/Cityhall",
  component: Cityhall,
  parameters: { player: atCityhall() },
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={context.parameters.player}>
        <Story />
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof Cityhall>

export default meta

type Story = StoryObj<typeof meta>

/** Home nation, no victories against the enemy yet */
export const Welcome: Story = {}

/** Home nation, thanked for victories but not enough for the next title */
export const ThankedForVictories: Story = {
  parameters: {
    player: atCityhall({
      character: { battles: { France: { won: 9 } } },
    }),
  },
}

/** Home nation, enough victories for a promotion with a reward */
export const PromotionAvailable: Story = {
  parameters: {
    player: atCityhall({
      character: { battles: { France: { won: 14 } } },
    }),
  },
}

/** Promotion to a title that was already rewarded after changing citizenship */
export const PromotionWithoutReward: Story = {
  parameters: {
    player: atCityhall({
      character: {
        highestRewardedTitle: "Admiral",
        battles: { France: { won: 14 } },
      },
    }),
  },
}

/** Foreign town, no victories against its enemy */
export const ForeignTown: Story = {
  parameters: {
    player: atCityhall({ character: { town: "havana" } }),
  },
}

/** Foreign town, victories against its enemy earn an offer of citizenship */
export const CitizenshipOffer: Story = {
  parameters: {
    player: atCityhall({
      character: { town: "havana", battles: { Holland: { won: 20 } } },
    }),
  },
}

/** A delivery for the governor shows the quest badge */
export const GovernorQuestBusiness: Story = {
  parameters: {
    player: atCityhall({
      quests: {
        "quest-1": {
          id: "quest-1",
          giverId: getNpcAt("havana", "market").id,
          acceptedDay: 5,
          pitch: "Take this sealed letter to the governor of Kingston.",
          reward: { gold: 600 },
          type: "delivery",
          parcel: "a sealed letter",
          targetNpcId: getNpcAt("kingston", "governor").id,
        },
      },
    }),
  },
}
