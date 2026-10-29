import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FaBook } from "react-icons/fa"
import { fn } from "storybook/test"

import MobileMenuContent from "@/components/menu/MobileMenuContent"
import MobileMenuItem from "@/components/menu/MobileMenuItem"

import { player } from "../fixtures"
import PlayerPreview from "../PlayerPreview"

const warnings: Player = {
  ...player,
  character: { ...player.character, loan: 500 },
  inventory: { ...player.inventory, food: 5, water: 4 },
}

const meta = {
  title: "game/MobileMenuItem",
  component: MobileMenuItem,
  args: {
    icon: <FaBook />,
    label: "Log book",
    onClick: fn(),
    tone: "default",
  },
  argTypes: {
    icon: { control: false },
    tone: { control: "inline-radio", options: ["default", "danger"] },
    badge: { control: "number" },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MobileMenuItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithBadge: Story = { args: { label: "Advisor", badge: 3 } }

export const Danger: Story = { args: { label: "Logout", tone: "danger" } }

export const FullMenu: Story = {
  parameters: { player: warnings },
  render: () => <MobileMenuContent onClose={fn()} />,
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={context.parameters.player}>
        <Story />
      </PlayerPreview>
    ),
  ],
}
