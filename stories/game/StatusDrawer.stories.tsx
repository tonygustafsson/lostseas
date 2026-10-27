import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import StatusDrawer from "@/components/drawer/drawerContent/Status"
import type { StatisticsEntry } from "@/firebase/db"

import { player } from "../fixtures"
import PlayerPreview from "../PlayerPreview"

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

const statistics: StatisticsEntry[] = [1, 3, 6, 8, 11, 14].map(
  (day, index) => ({
    day,
    timestamp: 1704067200000 + index * 86400000,
    score: [31, 53, 105, 159, 232, 268][index],
    netWorth: [500, 800, 650, 1200, 1800, 3200][index],
    scoreTitle: [0, 0, 50, 50, 100, 100][index],
    scoreWealth: [1, 3, 5, 9, 12, 18][index],
    scoreShips: [10, 10, 10, 20, 20, 30][index],
    scoreCannons: [20, 40, 40, 80, 100, 120][index],
  })
)

const meta = {
  title: "game/StatusDrawer",
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
