import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import TextField from "@/components/TextField"

const meta = {
  component: TextField,
  args: { label: "Captain name", placeholder: "Morgan Reed" },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Error: Story = {
  args: { error: "Enter a captain name.", "aria-invalid": true },
}
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Morgan Reed" },
}
export const Number: Story = {
  args: {
    label: "Quantity",
    type: "number",
    min: 1,
    defaultValue: 1,
    placeholder: undefined,
  },
}
export const Sizes: Story = {
  render: (args) => (
    <div className="grid gap-4">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <TextField {...args} key={size} size={size} label={`Size ${size}`} />
      ))}
    </div>
  ),
}
export const Typing: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "Captain name" })
    await userEvent.type(input, "Morgan Reed")
    await expect(input).toHaveValue("Morgan Reed")
  },
}
