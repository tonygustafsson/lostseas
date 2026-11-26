import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import FleetCard from "@/components/menu/FleetCard"
import { player } from "@/stories/fixtures"

const meta = {
  title: "game/Menu/FleetCard",
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
export const Default: Story = { name: "FleetCard" }
