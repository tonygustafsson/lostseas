import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import type { StatisticsMetric } from "@/components/charts/chartConfig"
import StatisticsAreaChart from "@/components/charts/StatisticsAreaChart"
import { snakeCaseToTitleCase } from "@/utils/string"

const metrics: StatisticsMetric[] = [
  "netWorth",
  "score",
  "mannedCannons",
  "cannons",
  "battlesWon",
  "battlesLost",
  "scoreTitle",
  "scoreWealth",
  "scoreShips",
  "scoreCannons",
]

const entries = [1, 3, 6, 8, 11, 14].map((day, index) => ({
  day,
  timestamp: 1704067200000 + index * 86400000,
  netWorth: [500, 800, 650, 1200, 1800, 2500][index],
  score: [31, 53, 105, 159, 232, 268][index],
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
  component: StatisticsAreaChart,
  args: { metric: "netWorth", label: "", entries, delay: 0 },
  argTypes: {
    metric: { control: "radio", options: metrics },
    label: { control: "text" },
    delay: { control: { type: "number", min: 0, step: 100 } },
  },
  // An empty label follows the chosen metric
  render: (args) => (
    <StatisticsAreaChart
      {...args}
      label={args.label || snakeCaseToTitleCase(args.metric)}
    />
  ),
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatisticsAreaChart>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const CustomLabel: Story = { args: { label: "Fortune" } }
export const Delayed: Story = { args: { delay: 600 } }
export const SingleEntry: Story = { args: { entries: entries.slice(0, 1) } }
export const Empty: Story = { args: { entries: [] } }
