import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import { barColors, type BarVariant } from "@/components/ui/bar"
import { Slider } from "@/components/ui/slider"

const VARIANTS = Object.keys(barColors) as BarVariant[]

const meta = {
  component: Slider,
  args: {
    defaultValue: [6],
    max: 10,
    step: 1,
    "aria-label": "Rum to take",
    onValueChange: fn(),
    variant: "default",
  },
  argTypes: { variant: { control: "select", options: VARIANTS } },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      {VARIANTS.map((variant) => (
        <Slider
          {...args}
          key={variant}
          variant={variant}
          aria-label={variant}
        />
      ))}
    </div>
  ),
}

export const Empty: Story = { args: { defaultValue: [0] } }

export const Low: Story = { args: { defaultValue: [2] } }

export const Full: Story = { args: { defaultValue: [10] } }

export const Disabled: Story = { args: { disabled: true } }

export const Range: Story = { args: { defaultValue: [2, 8] } }

export const Keyboard: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const thumb = canvas.getByRole("slider")

    await userEvent.click(thumb)
    await userEvent.keyboard("{ArrowRight}")

    await expect(thumb).toHaveAttribute("aria-valuenow", "7")
    await expect(args.onValueChange).toHaveBeenLastCalledWith([7])
  },
}
