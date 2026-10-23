import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import VentureCard from "@/components/location/Bank/VentureCard"

const meta = {
  component: VentureCard,
  args: {
    ventureId: "tobaccoRun",
    day: 10,
    gold: 5000,
    onInvest: fn(),
    onCollect: fn(),
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
export const AtSea: Story = {
  args: { share: { investedDay: 5, returnDay: 26 } },
}
export const ReturnsTomorrow: Story = {
  args: { share: { investedDay: 4, returnDay: 11 } },
}
export const Returned: Story = {
  args: { share: { investedDay: 1, returnDay: 10 } },
}
export const LowRisk: Story = { args: { ventureId: "sugarConvoy" } }
export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
}
