import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import GiveMedicine from "@/components/crew/GiveMedicine"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = { count: number; health: number; medicine: number }

/** The component reads the player, so the crew and medicine are controls */
const GiveMedicinePreview = ({ count, health, medicine }: Args) => (
  <PlayerPreview
    key={`${count}-${health}-${medicine}`}
    data={{
      ...player,
      crewMembers: { ...player.crewMembers, count, health },
      inventory: { ...player.inventory, medicine },
    }}
  >
    <div className="max-w-sm">
      <GiveMedicine />
    </div>
  </PlayerPreview>
)

const meta = {
  title: "game/Crew/GiveMedicine",
  component: GiveMedicinePreview,
  args: {
    count: player.crewMembers.count,
    health: player.crewMembers.health,
    medicine: player.inventory.medicine,
  },
  argTypes: {
    count: { control: { type: "number", min: 0 } },
    health: { control: { type: "range", min: 0, max: 100 } },
    medicine: { control: { type: "number", min: 0 } },
  },
} satisfies Meta<typeof GiveMedicinePreview>

export default meta
type Story = StoryObj<typeof meta>

export const GiveMedicineStory: Story = { name: "GiveMedicine" }
