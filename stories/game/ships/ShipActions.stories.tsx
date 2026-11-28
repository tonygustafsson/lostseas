import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import useModal from "@/app/stores/modals"
import Modal from "@/components/Modal"
import ShipActions from "@/components/ships/ShipActions"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

const { endeavour } = player.ships

const meta = {
  title: "game/Ships/ShipActions",
  component: ShipActions,
  args: {
    shipId: endeavour.id,
    shipName: endeavour.name,
    shipType: endeavour.type,
    removeBlocker: undefined,
    removeWarning: undefined,
  },
  argTypes: {
    shipType: { control: "select", options: ["Brig", "Sloop", "Galleon"] },
    removeBlocker: { control: "text" },
    removeWarning: { control: "text" },
  },
  beforeEach: () => {
    useModal.setState({ modals: {} })
    return () => useModal.getState().removeAllModals()
  },
  decorators: [
    (Story) => (
      <PlayerPreview data={player}>
        <div className="max-w-xs">
          <Story />
        </div>

        <Modal />
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof ShipActions>

export default meta
type Story = StoryObj<typeof meta>

export const ShipActionsStory: Story = { name: "ShipActions" }
