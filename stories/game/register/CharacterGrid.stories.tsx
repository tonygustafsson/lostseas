import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import CharacterGrid from "@/components/character/CharacterGrid"

const nations: Nation[] = ["England", "France", "Spain", "Holland"]

const meta = {
  title: "game/Register/CharacterGrid",
  component: CharacterGrid,
  args: { nationality: "Holland", selectedId: "mateo-salazar", onSelect: fn() },
  argTypes: {
    nationality: { control: "inline-radio", options: nations },
    selectedId: { control: "text" },
  },
  // Picking a character writes its id back to the selectedId control
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()

    return (
      <CharacterGrid
        {...args}
        onSelect={(character) => {
          updateArgs({ selectedId: character.id })
          args.onSelect(character)
        }}
      />
    )
  },
} satisfies Meta<typeof CharacterGrid>
export default meta

type Story = StoryObj<typeof meta>

export const CharacterGridStory: Story = { name: "CharacterGrid" }
