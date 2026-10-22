import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import SelectedCharacter from "@/components/character/SelectedCharacter"

const meta = {
  component: SelectedCharacter,
  args: {
    characterId: "mateo-salazar",
    onChangeClick: fn(),
    onRandomizeClick: fn(),
    isRandomizing: false,
    nameField: <input aria-label="Name" defaultValue="Mateo Salazar" />,
  },
} satisfies Meta<typeof SelectedCharacter>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
}

export const Randomizing: Story = { args: { isRandomizing: true } }
