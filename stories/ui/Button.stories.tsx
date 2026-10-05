import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Anchor, Plus } from "lucide-react"
import { expect, fn } from "storybook/test"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

const meta = {
  component: Button,
  args: {
    children: "Set sail",
    variant: "default",
    size: "default",
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "highlight",
        "secondary",
        "outline",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
    },
  },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          "default",
          "highlight",
          "secondary",
          "outline",
          "ghost",
          "destructive",
          "link",
        ] as const
      ).map((variant) => (
        <Button {...args} key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
}
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <Button {...args} key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
}
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Anchor /> Set sail
      </>
    ),
  },
}
export const IconOnly: Story = {
  args: { children: <Plus />, size: "icon", "aria-label": "Add ship" },
}
export const Disabled: Story = { args: { disabled: true } }
export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Spinner /> Loading
      </>
    ),
  },
}
export const Click: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Set sail" }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}
