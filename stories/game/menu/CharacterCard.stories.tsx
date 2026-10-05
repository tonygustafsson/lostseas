import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import CharacterCard from "@/components/menu/CharacterCard"
import { player } from "@/stories/fixtures"

const meta = {
  component: CharacterCard,
  args: { player },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CharacterCard>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const LongName: Story = {
  args: {
    player: {
      ...player,
      character: {
        ...player.character,
        name: "Captain Morgan of the Spanish Main",
      },
    },
  },
}
