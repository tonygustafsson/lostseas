import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Coins } from "lucide-react"

import { Badge } from "@/components/ui/badge"

const meta = {
  component: Badge,
  args: { children: "Captain", variant: "default" },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
  },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          "default",
          "secondary",
          "destructive",
          "outline",
          "ghost",
          "link",
        ] as const
      ).map((variant) => (
        <Badge {...args} key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
}
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Coins /> 500 gold
      </>
    ),
  },
}
