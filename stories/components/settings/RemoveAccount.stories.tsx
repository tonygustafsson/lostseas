import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import useModal from "@/app/stores/modals"
import Modal from "@/components/Modal"
import RemoveAccount from "@/components/settings/RemoveAccount"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

const meta = {
  title: "components/settings/RemoveAccount",
  component: RemoveAccount,
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
} satisfies Meta<typeof RemoveAccount>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Confirmation: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Remove account" })
    )

    const dialog = await within(canvasElement.ownerDocument.body).findByRole(
      "dialog"
    )

    await expect(dialog).toHaveTextContent("This cannot be undone.")
    await expect(
      within(dialog).getByRole("button", { name: "Yes, remove account" })
    ).toBeVisible()
  },
}
