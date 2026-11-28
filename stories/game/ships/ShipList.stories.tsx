import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import ShipList from "@/components/ships/ShipList"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = { ships: number }

/** The list reads the player, so the fleet size is a control */
const ShipListPreview = ({ ships }: Args) => {
  const fleet = Object.fromEntries(
    Array.from({ length: ships }, (_, index) => {
      const id = `ship-${index}`

      return [id, { ...player.ships.endeavour, id, name: `Ship ${index + 1}` }]
    })
  )

  return (
    <PlayerPreview key={ships} data={{ ...player, ships: fleet }}>
      <ShipList />
    </PlayerPreview>
  )
}

const meta = {
  title: "game/Ships/ShipList",
  component: ShipListPreview,
  args: { ships: 3 },
  argTypes: { ships: { control: { type: "number", min: 0, max: 8 } } },
} satisfies Meta<typeof ShipListPreview>

export default meta
type Story = StoryObj<typeof meta>

export const ShipListStory: Story = { name: "ShipList" }
