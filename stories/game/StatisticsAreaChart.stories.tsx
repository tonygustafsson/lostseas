import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import StatisticsAreaChart from "@/components/charts/StatisticsAreaChart"

const data = [500, 800, 650, 1200, 1800, 2500].map((gold, index) => ({
  gold,
  day: index + 1,
  timestamp: 1704067200000 + index * 86400000,
  score: gold * 2,
  crewMembers: 40,
  ships: 1,
}))
const meta = {
  component: StatisticsAreaChart,
  args: { metric: "gold", data },
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
export const Gold: Story = {}
export const Score: Story = { args: { metric: "score" } }
export const SingleEntry: Story = { args: { data: data.slice(0, 1) } }
export const Empty: Story = { args: { data: [] } }
