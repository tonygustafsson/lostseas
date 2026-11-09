import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import ShipyardBuy from "@/components/location/Shipyard/Buy"
import { TITLE_INFO } from "@/constants/title"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

/** A fleet of healthy Brigs, so only the limit alert shows */
const withFleet = (count: number): Player => ({
  ...player,
  character: { ...player.character, location: "Shipyard", gold: 20000 },
  ships: Object.fromEntries(
    Array.from({ length: count }, (_, index) => [
      `brig-${index}`,
      {
        id: `brig-${index}`,
        name: `Brig ${index + 1}`,
        type: "Brig",
        health: 100,
        createdDay: 1,
      },
    ])
  ),
})

const captainLimit = TITLE_INFO.Captain.maxShips

// ShipyardBuy reads the player from the query cache, so variants swap the player
const meta = {
  title: "game/Shipyard/ShipyardBuy",
  component: ShipyardBuy,
  parameters: { player: withFleet(1) },
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={context.parameters.player}>
        <Story />
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof ShipyardBuy>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** A damaged ship is offered for repair above the ships for sale */
export const NeedsRepair: Story = {
  parameters: {
    player: {
      ...player,
      character: { ...player.character, location: "Shipyard" },
      ships: { endeavour: { ...player.ships.endeavour, health: 40 } },
    },
  },
}

/** The Captain's fleet is full, so no ship can be bought */
export const MaxShipsReached: Story = {
  parameters: { player: withFleet(captainLimit) },
}

/** After changing nation to a lower title, the extra ships are kept */
export const OverTheLimit: Story = {
  parameters: { player: withFleet(captainLimit + 2) },
}
