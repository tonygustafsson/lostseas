import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import SelectedCharacter from "@/components/character/SelectedCharacter"
import { CHARACTERS } from "@/constants/characters"

const meta = {
  title: "game/Register/SelectedCharacter",
  component: SelectedCharacter,
  args: {
    characterId: "mateo-salazar",
    onChangeClick: fn(),
    onRandomizeClick: fn(),
    isRandomizing: false,
    nameField: <input aria-label="Name" defaultValue="Mateo Salazar" />,
  },
  argTypes: {
    characterId: {
      control: "select",
      options: CHARACTERS.map(({ id }) => id),
    },
  },
} satisfies Meta<typeof SelectedCharacter>
export default meta

type Story = StoryObj<typeof meta>

export const SelectedCharacterStory: Story = { name: "SelectedCharacter" }
