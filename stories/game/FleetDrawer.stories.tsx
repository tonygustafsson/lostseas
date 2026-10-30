import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import FleetDrawer from "@/components/drawer/drawerContent/Fleet"

import { player } from "../fixtures"
import PlayerPreview from "../PlayerPreview"

const withPrisoners: Player = {
  ...player,
  wantedPirates: {
    "pirate-1": {
      id: "pirate-1",
      name: 'Jack "Mad" Flint',
      crimeId: "rum-warehouse",
      rewarder: "Havana",
    },
    "pirate-2": {
      id: "pirate-2",
      name: 'Grace "Bloody" Morgan',
      crimeId: "sacked-town",
      rewarder: "Tortuga",
    },
  },
}

const meta = {
  title: "game/FleetDrawer",
  component: FleetDrawer,
  parameters: { player },
  decorators: [
    (Story, context) => (
      <PlayerPreview
        key={context.id}
        data={context.parameters.player}
        statistics={[]}
      >
        <div className="max-w-lg">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof FleetDrawer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPrisoners: Story = {
  parameters: { player: withPrisoners },
}
