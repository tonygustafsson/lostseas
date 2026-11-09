import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import GuideTip from "@/components/guide/GuideTip"

const meta = {
  title: "game/Guide/GuideTip",
  component: GuideTip,
  args: {
    variant: "tip",
    children: "Bank your gold before you sail. Pirates don't rob banks.",
  },
  argTypes: {
    variant: { control: "select", options: ["tip", "warning"] },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GuideTip>

export default meta
type Story = StoryObj<typeof meta>

export const Tip: Story = {}
export const Warning: Story = { args: { variant: "warning" } }
export const CustomTitle: Story = { args: { title: "A word from the parrot" } }
