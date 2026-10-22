import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import CharacterPickerDialog from "@/components/character/CharacterPickerDialog"

const meta = {
  component: CharacterPickerDialog,
  args: {
    open: true,
    onOpenChange: fn(),
    onSelect: fn(),
  },
} satisfies Meta<typeof CharacterPickerDialog>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
}
