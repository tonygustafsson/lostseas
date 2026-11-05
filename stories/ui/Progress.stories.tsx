import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { barColors, type BarVariant } from "@/components/ui/bar"
import { Progress } from "@/components/ui/progress"

const VARIANTS = Object.keys(barColors) as BarVariant[]

const meta = {
  component: Progress,
  args: { value: 60, "aria-label": "Progress", variant: "default" },
  argTypes: { variant: { control: "select", options: VARIANTS } },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="text-muted-foreground w-16 text-sm">{variant}</span>

          <Progress {...args} variant={variant} aria-label={variant} />
        </div>
      ))}
    </div>
  ),
}

export const Empty: Story = { args: { value: 0 } }

export const Low: Story = { args: { value: 10 } }

export const Full: Story = { args: { value: 100 } }

/** Thin bar, like the win rate per nation in the battle statistics. */
export const Thin: Story = {
  args: { className: "h-1 w-2/3" },
}

/** Every step from empty to full, to compare the gradient. */
export const AllValues: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {[0, 10, 25, 50, 75, 90, 100].map((value) => (
        <div key={value} className="flex items-center gap-4">
          <span className="text-muted-foreground w-10 text-sm tabular-nums">
            {value}%
          </span>

          <Progress value={value} aria-label={`${value}%`} />
        </div>
      ))}
    </div>
  ),
}
