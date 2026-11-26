import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import PasskeySettings from "@/components/settings/PasskeySettings"

import { player } from "../../../fixtures"
import PlayerPreview from "../../../PlayerPreview"

const meta = {
  title: "game/Drawers/Settings/PasskeySettings",
  component: PasskeySettings,
  decorators: [
    (Story) => (
      <PlayerPreview data={player}>
        <div className="max-w-xl">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof PasskeySettings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: "PasskeySettings" }
