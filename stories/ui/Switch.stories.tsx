import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const meta = {
  component: Switch,
  args: { id: "sound-switch", onCheckedChange: fn() },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Switch {...args} />
      <Label htmlFor={args.id}>Sound effects</Label>
    </div>
  ),
} satisfies Meta<typeof Switch>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Toggle: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const control = canvas.getByRole("switch", { name: "Sound effects" })
    await userEvent.click(control)
    await expect(control).toBeChecked()
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true)
    await userEvent.keyboard(" ")
    await expect(control).not.toBeChecked()
  },
}
