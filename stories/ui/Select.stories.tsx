import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn, within } from "storybook/test"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const meta = {
  component: Select,
  args: { onValueChange: fn() },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger aria-label="Destination" className="w-64">
        <SelectValue placeholder="Choose a destination" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="bridgetown">Bridgetown</SelectItem>
        <SelectItem value="kingston">Kingston</SelectItem>
        <SelectItem value="cap-francais">Cap-Français</SelectItem>
      </SelectContent>
    </Select>
  ),
} satisfies Meta<typeof Select>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Selected: Story = { args: { defaultValue: "bridgetown" } }
export const Disabled: Story = { args: { disabled: true } }
export const ChooseDestination: Story = {
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox", { name: "Destination" }))
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(
      await body.findByRole("option", { name: "cap-francais" })
    )
    await expect(args.onValueChange).toHaveBeenCalledWith("cap-francais")
    await expect(canvas.getByRole("combobox")).toHaveTextContent("cap-francais")
  },
}
