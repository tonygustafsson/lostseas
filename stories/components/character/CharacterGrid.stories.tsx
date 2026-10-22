import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { fn } from "storybook/test"

import CharacterGrid from "@/components/character/CharacterGrid"

const GridDemo = () => {
  const [selectedId, setSelectedId] = useState("mateo-salazar")

  return (
    <CharacterGrid
      nationality="Holland"
      selectedId={selectedId}
      onSelect={(character) => setSelectedId(character.id)}
    />
  )
}

const meta = {
  component: CharacterGrid,
  args: { nationality: "England", onSelect: fn() },
  render: () => <GridDemo />,
} satisfies Meta<typeof CharacterGrid>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
