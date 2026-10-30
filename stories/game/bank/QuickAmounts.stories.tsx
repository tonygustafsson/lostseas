import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import { fn } from "storybook/test"

import QuickAmounts from "@/components/location/Bank/QuickAmounts"

const icons = {
  Deposit: <ArrowDownToLine />,
  Withdraw: <ArrowUpFromLine />,
}

const meta = {
  title: "game/Bank/QuickAmounts",
  component: QuickAmounts,
  args: {
    icon: "Deposit",
    title: "Make deposit",
    description: undefined,
    verb: "Deposit",
    max: 2500,
    emptyMessage: "You have no gold to deposit.",
    disabled: false,
    onSelect: fn(),
  },
  argTypes: {
    icon: { control: "select", options: Object.keys(icons), mapping: icons },
    description: { control: "text" },
    max: { control: { type: "number", min: 0 } },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof QuickAmounts>

export default meta
type Story = StoryObj<typeof meta>

export const Deposit: Story = {}

export const Withdraw: Story = {
  args: {
    icon: "Withdraw",
    title: "Make withdrawal",
    description: "Bring your saved gold back aboard to spend it.",
    verb: "Withdraw",
    max: 1200,
    emptyMessage: "Your account is empty.",
  },
}

// Shares that round down to nothing are left out
export const SmallAmount: Story = { args: { max: 3 } }

export const Empty: Story = { args: { max: 0 } }

export const Disabled: Story = { args: { disabled: true } }
