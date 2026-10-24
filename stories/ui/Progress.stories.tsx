import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Progress } from "@/components/ui/progress"

const meta = {
  component: Progress,
  args: { value: 60, "aria-label": "Progress" },
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

export const Gilded: Story = { args: { variant: "gilded" } }

export const Empty: Story = { args: { value: 0 } }

export const Low: Story = { args: { value: 10 } }

export const Full: Story = { args: { value: 100 } }

/** Thin bar, like the win rate per nation in the battle statistics. */
export const Thin: Story = {
  args: { variant: "gilded", className: "h-1 w-2/3" },
}

/** Battle strength bars set their own colours. */
export const BattleStrength: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress value={70} aria-label="Enemy" className="*:bg-destructive" />

      <Progress value={45} aria-label="Your fleet" className="*:bg-success" />
    </div>
  ),
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

          <Progress value={value} variant="gilded" aria-label={`${value}%`} />
        </div>
      ))}
    </div>
  ),
}
