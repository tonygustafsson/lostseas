import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import GiveGold from "@/components/crew/GiveGold"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = { count: number; mood: number; gold: number }

/** The component reads the player, so the crew and gold are controls */
const GiveGoldPreview = ({ count, mood, gold }: Args) => (
  <PlayerPreview
    key={`${count}-${mood}-${gold}`}
    data={{
      ...player,
      character: { ...player.character, gold },
      crewMembers: { ...player.crewMembers, count, mood },
    }}
  >
    <div className="max-w-sm">
      <GiveGold />
    </div>
  </PlayerPreview>
)

const meta = {
  title: "game/Crew/GiveGold",
  component: GiveGoldPreview,
  args: {
    count: player.crewMembers.count,
    mood: player.crewMembers.mood,
    gold: player.character.gold,
  },
  argTypes: {
    count: { control: { type: "number", min: 0 } },
    mood: { control: { type: "range", min: 0, max: 100 } },
    gold: { control: { type: "number", min: 0 } },
  },
} satisfies Meta<typeof GiveGoldPreview>

export default meta
type Story = StoryObj<typeof meta>

export const GiveGoldStory: Story = { name: "GiveGold" }
