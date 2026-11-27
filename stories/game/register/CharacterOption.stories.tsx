import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import CharacterOption from "@/components/character/CharacterOption"
import { CHARACTERS } from "@/constants/characters"

const characters = Object.fromEntries(
  CHARACTERS.map((character) => [character.name, character])
)

const meta = {
  title: "game/Register/CharacterOption",
  component: CharacterOption,
  args: { character: CHARACTERS[0], selected: false, onSelect: fn() },
  argTypes: {
    character: {
      control: "select",
      options: Object.keys(characters),
      mapping: characters,
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CharacterOption>

export default meta
type Story = StoryObj<typeof meta>

export const CharacterOptionStory: Story = { name: "CharacterOption" }
