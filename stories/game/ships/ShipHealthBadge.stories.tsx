import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import ShipHealthBadge from "@/components/ships/ShipHealthBadge"

const meta = {
  title: "game/Ships/ShipHealthBadge",
  component: ShipHealthBadge,
  args: { health: 85, className: undefined },
  argTypes: {
    health: { control: { type: "range", min: 0, max: 100 } },
    className: { control: "text" },
  },
} satisfies Meta<typeof ShipHealthBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Healthy: Story = {}

export const Damaged: Story = { args: { health: 50 } }

export const Critical: Story = { args: { health: 20 } }

export const AllStates: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {[100, 76, 75, 31, 30, 0].map((health) => (
        <ShipHealthBadge key={health} {...args} health={health} />
      ))}
    </div>
  ),
}
