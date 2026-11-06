import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import StatisticsSeriesChart from "@/components/charts/StatisticsSeriesChart"

import { statistics } from "../../fixtures"

const meta = {
  title: "game/Statistics/StatisticsSeriesChart",
  component: StatisticsSeriesChart,
  args: {
    title: "Cannons",
    entries: statistics,
    series: [
      { metric: "mannedCannons", label: "Manned", color: "var(--gold)" },
      { metric: "cannons", label: "Owned", color: "var(--muted-foreground)" },
    ],
    stacked: false,
    delay: 0,
  },
  argTypes: { delay: { control: { type: "number", min: 0, step: 100 } } },
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
      { metric: "battlesLost", label: "Lost", color: "var(--error)" },
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

export const Delayed: Story = { args: { delay: 600 } }

export const Empty: Story = { args: { entries: [] } }
