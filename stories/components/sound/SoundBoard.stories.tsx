import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import SoundBoard from "./SoundBoard"

const meta = {
  title: "components/sound/SoundBoard",
  component: SoundBoard,
  parameters: { layout: "padded" },
} satisfies Meta<typeof SoundBoard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Music")).toBeInTheDocument()
    await expect(canvas.getByText("Ambience")).toBeInTheDocument()
    await expect(canvas.getByText("Sound effects")).toBeInTheDocument()

    await expect(
      canvas.getByRole("button", { name: "Play victory" })
    ).toBeInTheDocument()
    await expect(
      canvas.getByRole("button", { name: "victory-talk7" })
    ).toBeInTheDocument()
    await expect(
      canvas.getByRole("button", { name: "Harbor 1" })
    ).toBeInTheDocument()
  },
}
