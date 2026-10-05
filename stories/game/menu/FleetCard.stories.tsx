import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import FleetCard from "@/components/menu/FleetCard"
import { player } from "@/stories/fixtures"

const meta = {
  component: FleetCard,
  args: { player },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FleetCard>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const EmptyFleet: Story = {
  args: {
    player: {
      ...player,
      ships: {},
      crewMembers: { count: 0, health: 100, mood: 100 },
    },
  },
}
