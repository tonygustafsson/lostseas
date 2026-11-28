import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import RenameShipForm from "@/components/RenameShipForm"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

const meta = {
  title: "game/Ships/RenameShipForm",
  component: RenameShipForm,
  args: { id: player.ships.endeavour.id, name: player.ships.endeavour.name },
  decorators: [
    (Story) => (
      <PlayerPreview data={player}>
        <Story />
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof RenameShipForm>

export default meta
type Story = StoryObj<typeof meta>

export const RenameShipFormStory: Story = { name: "RenameShipForm" }
