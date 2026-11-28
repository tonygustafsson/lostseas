import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import Modal from "@/components/Modal"
import QrScanner from "@/components/QrScanner"

import { player } from "../fixtures"
import PlayerPreview from "../PlayerPreview"

// Needs a camera and a QR code to scan. The button opens the modal, and where
// there is no camera the error is only logged.
const meta = {
  title: "components/QrScanner",
  component: QrScanner,
  decorators: [
    (Story) => (
      <PlayerPreview data={player}>
        <Story />
        <Modal />
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof QrScanner>

export default meta
type Story = StoryObj<typeof meta>

export const QrScannerStory: Story = { name: "QrScanner" }
