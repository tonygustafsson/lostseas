import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import StatisticsSeriesChart from "@/components/charts/StatisticsSeriesChart"

const entries = [1, 3, 6, 8, 11, 14].map((day, index) => ({
  day,
  timestamp: 1704067200000 + index * 86400000,
  score: 0,
  mannedCannons: [2, 4, 4, 8, 10, 12][index],
  cannons: [4, 4, 10, 10, 16, 16][index],
  battlesWon: [0, 1, 3, 4, 7, 9][index],
  battlesLost: [0, 0, 1, 1, 1, 2][index],
  scoreTitle: [0, 0, 50, 50, 100, 100][index],
  scoreWealth: [1, 3, 5, 9, 12, 18][index],
  scoreShips: [10, 10, 10, 20, 20, 30][index],
  scoreCannons: [20, 40, 40, 80, 100, 120][index],
}))

const meta = {
  component: StatisticsSeriesChart,
  args: {
    title: "Cannons",
    entries,
    series: [
      { metric: "mannedCannons", label: "Manned", color: "var(--gold)" },
      { metric: "cannons", label: "Owned", color: "var(--muted-foreground)" },
    ],
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatisticsSeriesChart>

export default meta

type Story = StoryObj<typeof meta>

export const Cannons: Story = {}

export const Battles: Story = {
  args: {
    title: "Battles",
    series: [
      { metric: "battlesWon", label: "Won", color: "var(--success)" },
      { metric: "battlesLost", label: "Lost", color: "var(--destructive)" },
    ],
  },
}

export const StackedScore: Story = {
  args: {
    title: "Score",
    stacked: true,
    series: [
      { metric: "scoreTitle", label: "Title", color: "var(--chart-1)" },
      { metric: "scoreWealth", label: "Wealth", color: "var(--chart-2)" },
      { metric: "scoreShips", label: "Ships", color: "var(--chart-3)" },
      { metric: "scoreCannons", label: "Cannons", color: "var(--chart-4)" },
    ],
  },
}

export const Empty: Story = { args: { entries: [] } }
