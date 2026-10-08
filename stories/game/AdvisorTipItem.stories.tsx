import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TriangleAlert } from "lucide-react"

import AdvisorTipItem from "@/components/advisor/AdvisorTipItem"

const meta = {
  component: AdvisorTipItem,
  args: {
    icon: <TriangleAlert />,
    children: "Your crew needs more food before the next voyage.",
  },
  argTypes: { icon: { control: false } },
  decorators: [
    (Story) => (
      <ul className="max-w-lg">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof AdvisorTipItem>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Warning: Story = { args: { variant: "warning" } }
export const Error: Story = { args: { variant: "error" } }
export const Success: Story = {
  args: { variant: "success", children: "Your fleet is ready to sail." },
}
