import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Input } from "@/components/ui/input"

const meta = {
  component: Input,
  args: {
    "aria-label": "Ship name",
    placeholder: "Enter a ship name",
    className: "max-w-sm",
  },
} satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Endeavour" },
}
export const Invalid: Story = { args: { "aria-invalid": true } }
export const Number: Story = {
  args: {
    type: "number",
    min: 1,
    defaultValue: 1,
    "aria-label": "Quantity",
    placeholder: undefined,
  },
}
export const Typing: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "Ship name" })
    await userEvent.type(input, "Endeavour")
    await expect(input).toHaveValue("Endeavour")
  },
}
