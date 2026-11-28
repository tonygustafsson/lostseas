import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import RepairShipForm from "@/components/ships/RepairShipForm"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = { health: number; repairKits: number }

/** The form reads the player, so the ship health and kits are controls */
const RepairShipFormPreview = ({ health, repairKits }: Args) => (
  <PlayerPreview
    key={`${health}-${repairKits}`}
    data={{
      ...player,
      ships: {
        endeavour: { ...player.ships.endeavour, health },
        sequitur: {
          ...player.ships.endeavour,
          id: "sequitur",
          name: "Sequitur",
          health: 40,
        },
      },
      inventory: { ...player.inventory, repairKits },
    }}
  >
    <div className="max-w-sm">
      <RepairShipForm />
    </div>
  </PlayerPreview>
)

const meta = {
  title: "game/Ships/RepairShipForm",
  component: RepairShipFormPreview,
  args: { health: 60, repairKits: 5 },
  argTypes: {
    health: { control: { type: "range", min: 0, max: 100 } },
    repairKits: { control: { type: "number", min: 0 } },
  },
} satisfies Meta<typeof RepairShipFormPreview>

export default meta
type Story = StoryObj<typeof meta>

export const RepairShipFormStory: Story = { name: "RepairShipForm" }
