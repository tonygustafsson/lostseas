import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import ShipCard from "@/components/ships/ShipCard"

import { player } from "../fixtures"
import PlayerPreview from "../PlayerPreview"

const meta = {
  component: ShipCard,
  args: {
    ship: player.ships.endeavour,
  },
  decorators: [
    (Story) => (
      <PlayerPreview data={player}>
        <div className="max-w-xs">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof ShipCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Damaged: Story = {
  args: { ship: { ...player.ships.endeavour, health: 25 } },
}

export const Merchantman: Story = {
  args: {
    ship: { ...player.ships.endeavour, name: "Sequitur", type: "Merchantman" },
  },
}

export const RemoveBlocked: Story = {
  args: { removeBlocker: "You cannot remove your last ship" },
}
