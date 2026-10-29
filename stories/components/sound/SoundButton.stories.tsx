import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import useModal from "@/app/stores/modals"
import useSound from "@/app/stores/sound"
import Modal from "@/components/Modal"
import SoundButton from "@/components/Sound/SoundButton"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

const harborPlayer: Player = {
  ...player,
  character: { ...player.character, location: "Harbor" },
}

const meta = {
  title: "components/sound/SoundButton",
  component: SoundButton,
  beforeEach: () => {
    useModal.setState({ modals: {} })
    useSound.setState({
      musicOn: true,
      ambienceOn: true,
      soundEffectsOn: false,
      nextTrackRequest: 0,
      changingTrack: false,
    })
    return () => useModal.getState().removeAllModals()
  },
  decorators: [
    (Story) => (
      <PlayerPreview data={harborPlayer}>
        <Story />
        <Modal />
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof SoundButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", {
        name: "Sound (Music on, Ambience on, SoundFX off)",
      })
    ).toBeInTheDocument()
  },
}

export const OpenModal: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: /^Sound/ }))

    const body = within(document.body)
    const ambience = await body.findByRole("switch", { name: /Ambience/ })

    await expect(body.getByText("Harbor sounds")).toBeInTheDocument()
    await expect(body.getByText("Playing town tunes")).toBeInTheDocument()

    await userEvent.click(ambience)
    await expect(ambience).not.toBeChecked()
    await expect(body.queryByText("Harbor sounds")).not.toBeInTheDocument()

    await userEvent.click(body.getByRole("button", { name: "Next track" }))
    await expect(useSound.getState().nextTrackRequest).toBe(1)

    await userEvent.click(body.getByRole("switch", { name: /Music/ }))
    await expect(
      body.queryByRole("button", { name: "Next track" })
    ).not.toBeInTheDocument()
  },
}

export const ChangingTrack: Story = {
  beforeEach: () => {
    useSound.setState({ changingTrack: true })
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: /^Sound/ }))

    const body = within(document.body)

    await expect(
      await body.findByRole("button", { name: "Next track" })
    ).toBeDisabled()
  },
}
