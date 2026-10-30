import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn, within } from "storybook/test"

import CharacterOption from "@/components/character/CharacterOption"
import { CHARACTERS } from "@/constants/characters"

const characters = Object.fromEntries(
  CHARACTERS.map((character) => [character.name, character])
)

const meta = {
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

export const Default: Story = {}

export const Selected: Story = { args: { selected: true } }

export const Female: Story = {
  args: {
    character: CHARACTERS.find(({ gender }) => gender === "Female"),
  },
}

export const Description: Story = {
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", {
        name: `Description for ${args.character.name}`,
      })
    )
    await expect(
      await within(canvasElement.ownerDocument.body).findByText(
        args.character.description
      )
    ).toBeVisible()
  },
}
