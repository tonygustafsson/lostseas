import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { type ComponentProps, useState } from "react"
import { expect, fn, within } from "storybook/test"

import Select from "@/components/Select"

function SelectExample(args: ComponentProps<typeof Select>) {
  const [value, setValue] = useState(args.value)
  return (
    <Select
      {...args}
      value={value}
      onChange={(nextValue) => {
        args.onChange?.(nextValue)
        setValue(nextValue)
      }}
    />
  )
}

const meta = {
  component: Select,
  args: {
    label: "Nationality",
    name: "nationality",
    value: "England",
    options: ["England", "France", "Spain", "Holland"],
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <SelectExample key={args.value ?? "unselected"} {...args} />
  ),
} satisfies Meta<typeof Select>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Unselected: Story = { args: { value: undefined } }
export const ChangeNationality: Story = {
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox", { name: "Nationality" }))
    await userEvent.click(
      await within(canvasElement.ownerDocument.body).findByRole("option", {
        name: "France",
      })
    )
    await expect(args.onChange).toHaveBeenCalledWith("France")
    await expect(canvas.getByRole("combobox")).toHaveTextContent("France")
  },
}
