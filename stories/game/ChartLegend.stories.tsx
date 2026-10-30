import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import ChartLegend from "@/components/charts/ChartLegend"

const meta = {
  component: ChartLegend,
  args: {
    items: [
      { label: "Won", color: "var(--success)" },
      { label: "Lost", color: "var(--error)" },
    ],
  },
} satisfies Meta<typeof ChartLegend>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ManyItems: Story = {
  args: {
    items: [
      { label: "Title", color: "var(--chart-1)" },
      { label: "Wealth", color: "var(--chart-2)" },
      { label: "Ships", color: "var(--chart-3)" },
      { label: "Cannons", color: "var(--chart-4)" },
      { label: "Manned", color: "var(--gold)" },
      { label: "Owned", color: "var(--muted-foreground)" },
    ],
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
}

export const Empty: Story = { args: { items: [] } }
