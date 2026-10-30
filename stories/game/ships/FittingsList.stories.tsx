import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import useModal from "@/app/stores/modals"
import Modal from "@/components/Modal"
import FittingsList from "@/components/ships/FittingsList"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = {
  cannons: number
  repairKits: number
  /** Health of the only ship, the Use button needs a damaged ship */
  shipHealth: number
}

// FittingsList reads the player from the query cache, so the args build one
const meta = {
  title: "game/Ships/FittingsList",
  component: FittingsList,
  args: { cannons: 8, repairKits: 3, shipHealth: 85 },
  argTypes: {
    cannons: { control: { type: "number", min: 0 } },
    repairKits: { control: { type: "number", min: 0 } },
    shipHealth: { control: { type: "range", min: 0, max: 100 } },
  },
  beforeEach() {
    useModal.setState(useModal.getInitialState(), true)
  },
  render: ({ cannons, repairKits, shipHealth }) => (
    <PlayerPreview
      key={`${cannons}-${repairKits}-${shipHealth}`}
      data={{
        ...player,
        ships: {
          endeavour: { ...player.ships.endeavour, health: shipHealth },
        },
        inventory: { ...player.inventory, cannons, repairKits },
      }}
    >
      <div className="max-w-md">
        <FittingsList />
      </div>

      <Modal />
    </PlayerPreview>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleOfEach: Story = { args: { cannons: 1, repairKits: 1 } }

// Repair kits cannot be used when every ship is at full health
export const FullHealth: Story = { args: { shipHealth: 100 } }

export const Empty: Story = { args: { cannons: 0, repairKits: 0 } }
