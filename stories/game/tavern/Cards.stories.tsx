import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import TavernCards from "@/components/location/Tavern/Cards"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = { gold: number }

// Cards reads the player from the query cache, so the args build one
const meta = {
  title: "game/Tavern/Cards",
  component: TavernCards,
  args: { gold: 2500 },
  argTypes: { gold: { control: { type: "number", min: 0 } } },
  render: ({ gold }) => (
    <PlayerPreview
      key={gold}
      data={{
        ...player,
        character: { ...player.character, location: "Tavern", gold },
      }}
    >
      <TavernCards />
    </PlayerPreview>
  ),
} satisfies Meta<Args>
export default meta
type Story = StoryObj<typeof meta>

export const CardsStory: Story = { name: "Cards" }
