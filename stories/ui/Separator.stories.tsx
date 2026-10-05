import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Separator } from "@/components/ui/separator"

const meta = {
  component: Separator,
  render: (args) => (
    <div className="grid max-w-sm gap-4">
      <p>Fleet</p>
      <Separator {...args} />
      <p>Crew</p>
    </div>
  ),
} satisfies Meta<typeof Separator>
export default meta
type Story = StoryObj<typeof meta>
export const Horizontal: Story = {}
export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex h-8 items-center gap-4">
      <span>Fleet</span>
      <Separator {...args} />
      <span>Crew</span>
    </div>
  ),
}
