import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GiProgression, GiSwordsEmblem, GiTwoCoins } from "react-icons/gi"

import BattleRecordChart from "@/components/charts/BattleRecordChart"
import ChartCard from "@/components/charts/ChartCard"
import StatisticsAreaChart from "@/components/charts/StatisticsAreaChart"

const entries = [1, 3, 6, 8, 11, 14].map((day, index) => ({
  day,
  timestamp: 1704067200000 + index * 86400000,
  score: 0,
  netWorth: [500, 800, 650, 1200, 1800, 2500][index],
}))

const icons = {
  Coins: <GiTwoCoins />,
  Progression: <GiProgression />,
  Swords: <GiSwordsEmblem />,
}

const charts = {
  "Net worth": (
    <StatisticsAreaChart
      metric="netWorth"
      label="Net worth"
      entries={entries}
    />
  ),
  "Battle record": (
    <BattleRecordChart
      battles={{
        England: { won: 2, lost: 1 },
        France: { won: 5 },
        Holland: { lost: 1 },
        Spain: { won: 9, lost: 2 },
        Pirate: { won: 3, lost: 4 },
      }}
    />
  ),
  Text: <p className="text-sm">Any content can sit inside the card.</p>,
}

const meta = {
  component: ChartCard,
  args: {
    label: "Net worth over time",
    icon: "Coins",
    children: "Net worth",
  },
  argTypes: {
    icon: { control: "select", options: Object.keys(icons), mapping: icons },
    children: {
      control: "select",
      options: Object.keys(charts),
      mapping: charts,
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChartCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const BattleRecord: Story = {
  args: { label: "Battle record", icon: "Swords", children: "Battle record" },
}

export const TextContent: Story = {
  args: { label: "Score over time", icon: "Progression", children: "Text" },
}
