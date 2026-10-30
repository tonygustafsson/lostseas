import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import Cityhall from "@/components/location/Cityhall"

import { player } from "../fixtures"
import PlayerPreview from "../PlayerPreview"

// An English captain in Port Royale. England is at war with France.
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

const treasures: Player["treasures"] = {
  "treasure-1": {
    id: "treasure-1",
    name: "Inca mask",
    rewarder: "Port Royale",
  },
  "treasure-2": {
    id: "treasure-2",
    name: "Cursed star",
    rewarder: "Port Royale",
  },
  // Belongs to another town, so it is not offered here
  "treasure-3": { id: "treasure-3", name: "Golden hen", rewarder: "Havana" },
}

const wantedPirates: Player["wantedPirates"] = {
  "pirate-1": {
    id: "pirate-1",
    name: 'Jack "Mad" Flint',
    crimeId: "rum-warehouse",
    rewarder: "Port Royale",
  },
  "pirate-2": {
    id: "pirate-2",
    name: 'Grace "Bloody" Morgan',
    crimeId: "sacked-town",
    rewarder: "Port Royale",
  },
  // Wanted in another town, so it is not offered here
  "pirate-3": {
    id: "pirate-3",
    name: 'Diego "Salty" Mendoza',
    crimeId: "mail-ship",
    rewarder: "Tortuga",
  },
}

const meta = {
  title: "game/Cityhall",
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
      character: { battles: { France: { won: 22 } } },
    }),
  },
}

/** Home nation, enough victories for a promotion with a reward */
export const PromotionAvailable: Story = {
  parameters: {
    player: atCityhall({
      character: { battles: { France: { won: 34 } } },
    }),
  },
}

/** Promotion to a title that was already rewarded after changing citizenship */
export const PromotionWithoutReward: Story = {
  parameters: {
    player: atCityhall({
      character: {
        highestRewardedTitle: "Admiral",
        battles: { France: { won: 34 } },
      },
    }),
  },
}

/** Foreign town, no victories against its enemy */
export const ForeignTown: Story = {
  parameters: {
    player: atCityhall({ character: { town: "Havana" } }),
  },
}

/** Foreign town, victories against its enemy earn an offer of citizenship */
export const CitizenshipOffer: Story = {
  parameters: {
    player: atCityhall({
      character: { town: "Havana", battles: { Holland: { won: 42 } } },
    }),
  },
}

export const WithTreasures: Story = {
  parameters: { player: atCityhall({ treasures }) },
}

export const WithWantedPirates: Story = {
  parameters: { player: atCityhall({ wantedPirates }) },
}

export const WithTreasuresAndWantedPirates: Story = {
  parameters: {
    player: atCityhall({
      treasures,
      wantedPirates,
      character: { battles: { France: { won: 34 } } },
    }),
  },
}

/** Treasures and pirates aboard belong to other towns, so nothing is offered */
export const NothingToHandOverHere: Story = {
  parameters: {
    player: atCityhall({
      treasures: { "treasure-3": treasures["treasure-3"] },
      wantedPirates: { "pirate-3": wantedPirates["pirate-3"] },
    }),
  },
}
