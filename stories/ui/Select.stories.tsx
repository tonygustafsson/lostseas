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
        <SelectItem value="Barbados">Barbados</SelectItem>
        <SelectItem value="Port Royale">Port Royale</SelectItem>
        <SelectItem value="Tortuga">Tortuga</SelectItem>
      </SelectContent>
    </Select>
  ),
} satisfies Meta<typeof Select>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Selected: Story = { args: { defaultValue: "Barbados" } }
export const Disabled: Story = { args: { disabled: true } }
export const ChooseDestination: Story = {
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox", { name: "Destination" }))
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(await body.findByRole("option", { name: "Tortuga" }))
    await expect(args.onValueChange).toHaveBeenCalledWith("Tortuga")
    await expect(canvas.getByRole("combobox")).toHaveTextContent("Tortuga")
  },
}
