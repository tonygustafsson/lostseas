import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import VentureCard from "@/components/location/Bank/VentureCard"
import { VENTURES } from "@/constants/ventures"

const meta = {
  title: "game/Bank/VentureCard",
  component: VentureCard,
  args: {
    ventureId: "tobaccoRun",
    day: 10,
    gold: 5000,
    onInvest: fn(),
    onCollect: fn(),
  },
  argTypes: {
    ventureId: { control: "select", options: Object.keys(VENTURES) },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VentureCard>
export default meta
type Story = StoryObj<typeof meta>
export const Available: Story = {}
export const CannotAfford: Story = {
  args: { ventureId: "silverFleet", gold: 1200 },
}
export const Ongoing: Story = {
  args: { share: { investedDay: 5, returnDay: 26 } },
}
export const Returned: Story = {
  args: { share: { investedDay: 1, returnDay: 10 } },
}
