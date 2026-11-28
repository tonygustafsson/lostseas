import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import TavernBuy from "@/components/location/Tavern/Buy"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = { gold: number; crew: number; health: number; mood: number }

// Buy reads the player from the query cache, so the args build one
const meta = {
  title: "game/Tavern/Buy",
  component: TavernBuy,
  args: { gold: 2500, crew: 40, health: 85, mood: 75 },
  argTypes: {
    gold: { control: { type: "number", min: 0 } },
    crew: { control: { type: "number", min: 0 } },
    health: { control: { type: "range", min: 0, max: 100 } },
    mood: { control: { type: "range", min: 0, max: 100 } },
  },
  render: ({ gold, crew, health, mood }) => (
    <PlayerPreview
      key={`${gold}-${crew}-${health}-${mood}`}
      data={{
        ...player,
        character: { ...player.character, location: "Tavern", gold },
        crewMembers: { count: crew, health, mood },
      }}
    >
      <TavernBuy />
    </PlayerPreview>
  ),
} satisfies Meta<Args>
export default meta
type Story = StoryObj<typeof meta>

export const BuyStory: Story = { name: "Buy" }
