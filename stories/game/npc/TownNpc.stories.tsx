import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import TownNpc, { useTownNpcTalk } from "@/components/npc/TownNpc"
import { TOWNS } from "@/constants/locations"
import { PLACEMENT_LOCATION } from "@/constants/npcs"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = { town: Town; placement: NpcPlacement }

// TownNpc takes the talk state from its parent, so the story owns it like a building does
const TownNpcDemo = ({ placement }: Args) => {
  const talk = useTownNpcTalk(placement)

  return <TownNpc talk={talk} />
}

const meta = {
  title: "game/Townsfolk/TownNpc",
  component: TownNpcDemo,
  args: { town: "kingston", placement: "tavern" },
  argTypes: {
    town: { control: "select", options: Object.keys(TOWNS) },
    placement: {
      control: "inline-radio",
      options: Object.keys(PLACEMENT_LOCATION),
    },
  },
  decorators: [
    (Story, { args }) => (
      <PlayerPreview
        key={args.town}
        data={{
          ...player,
          character: { ...player.character, town: args.town },
        }}
      >
        <div className="max-w-sm">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof TownNpcDemo>

export default meta
type Story = StoryObj<typeof meta>

export const TownNpcStory: Story = { name: "TownNpc" }
