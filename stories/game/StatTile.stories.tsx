import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FaCoins } from "react-icons/fa"
import { GiProgression } from "react-icons/gi"

import StatTile from "@/components/StatTile"

const meta = {
  component: StatTile,
  args: {
    label: "Gold",
    value: 2500,
    unit: "gold",
    icon: <FaCoins />,
  },
  argTypes: {
    icon: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="max-w-48">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatTile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutUnit: Story = {
  args: {
    label: "Score",
    value: 1240,
    unit: undefined,
    icon: <GiProgression />,
  },
}
