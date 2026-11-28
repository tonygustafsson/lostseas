import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import ShipyardEquipment from "@/components/location/Shipyard/Equipment"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = { gold: number; cannons: number }

// Equipment reads the player from the query cache, so the args build one
const meta = {
  title: "game/Shipyard/Equipment",
  component: ShipyardEquipment,
  args: { gold: 5000, cannons: 8 },
  argTypes: {
    gold: { control: { type: "number", min: 0 } },
    cannons: { control: { type: "number", min: 0 } },
  },
  render: ({ gold, cannons }) => (
    <PlayerPreview
      key={`${gold}-${cannons}`}
      data={{
        ...player,
        character: { ...player.character, location: "Shipyard", gold },
        inventory: { ...player.inventory, cannons },
      }}
    >
      <ShipyardEquipment />
    </PlayerPreview>
  ),
} satisfies Meta<Args>
export default meta
type Story = StoryObj<typeof meta>

export const EquipmentStory: Story = { name: "Equipment" }
