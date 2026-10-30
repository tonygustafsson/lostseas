import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import ShipList from "@/components/ships/ShipList"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

const fleet: Player = {
  ...player,
  ships: {
    ...player.ships,
    sequitur: {
      id: "sequitur",
      name: "Sequitur",
      type: "Merchantman",
      health: 40,
      createdDay: 6,
    },
  },
}

// ShipList reads the player from the query cache, so variants swap the player
const meta = {
  title: "game/Ships/ShipList",
  component: ShipList,
  parameters: { player: fleet },
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={context.parameters.player}>
        <div className="max-w-3xl">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof ShipList>

export default meta
type Story = StoryObj<typeof meta>

export const Fleet: Story = {}

// The last ship can never be removed
export const SingleShip: Story = { parameters: { player } }

export const AtSea: Story = {
  parameters: {
    player: { ...fleet, character: { ...fleet.character, location: "Sea" } },
  },
}

// Removing the Merchantman would leave the Brig overloaded
export const CargoWarning: Story = {
  parameters: {
    player: { ...fleet, inventory: { ...fleet.inventory, rum: 500 } },
  },
}

export const NoShips: Story = {
  parameters: { player: { ...player, ships: {} } },
}
