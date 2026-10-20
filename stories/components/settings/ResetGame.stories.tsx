import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import useModal from "@/app/stores/modals"
import Modal from "@/components/Modal"
import ResetGame from "@/components/settings/ResetGame"
import {
  STARTING_CREW_COUNT,
  STARTING_GOLD,
  STARTING_SHIP_TYPE,
  STARTING_TITLE,
} from "@/constants/player"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

const meta = {
  title: "components/settings/ResetGame",
  component: ResetGame,
  args: { player },
  beforeEach: () => {
    useModal.setState({ modals: {} })
    return () => useModal.getState().removeAllModals()
  },
  decorators: [
    (Story) => (
      <PlayerPreview data={player}>
        <div className="max-w-xl">
          <Story />
        </div>
        <Modal />
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof ResetGame>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Confirmation: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Reset game" })
    )

    const dialog = await within(canvasElement.ownerDocument.body).findByRole(
      "dialog"
    )

    await expect(dialog).toHaveTextContent(
      `${player.character.name} will start over as a ${STARTING_TITLE} with ${STARTING_GOLD} gold, a ${STARTING_SHIP_TYPE} and ${STARTING_CREW_COUNT} crew members`
    )
    await expect(dialog).toHaveTextContent("journey log and statistics")
  },
}
