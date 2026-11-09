import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import StatusDrawer from "@/components/drawer/drawerContent/Status"

import { player, statistics } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"
import { quests } from "../../questFixtures"

const veteran: Player = {
  ...player,
  character: {
    ...player.character,
    loan: 500,
    battles: {
      England: { lost: 1 },
      Spain: { won: 9, lost: 2 },
      France: { won: 3 },
      Pirate: { won: 3, lost: 4 },
    } as Character["battles"],
  },
}

const meta = {
  title: "game/Status/StatusDrawer",
  component: StatusDrawer,
  parameters: { player: veteran, statistics },
  decorators: [
    (Story, context) => (
      <PlayerPreview
        key={context.id}
        data={context.parameters.player}
        statistics={context.parameters.statistics}
      >
        <div className="max-w-lg">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof StatusDrawer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NewCaptain: Story = {
  parameters: { player, statistics: [] },
}

export const WithQuests: Story = {
  parameters: {
    player: {
      ...veteran,
      quests,
      character: { ...veteran.character, questsCompleted: 3 },
    },
    statistics,
  },
}
