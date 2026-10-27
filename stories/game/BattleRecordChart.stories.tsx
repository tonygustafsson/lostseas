import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import BattleRecordChart from "@/components/charts/BattleRecordChart"

const meta = {
  component: BattleRecordChart,
  args: {
    battles: {
      England: { won: 2, lost: 1 },
      France: { won: 5 },
      Spain: { won: 9, lost: 2 },
      Holland: { lost: 1 },
      Pirate: { won: 3, lost: 4 },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BattleRecordChart>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OneNation: Story = {
  args: { battles: { Pirate: { won: 1, lost: 2 } } as Character["battles"] },
}

export const NoBattles: Story = { args: { battles: undefined } }
