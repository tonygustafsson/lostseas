import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import QuickButtonMenu from "@/components/menu/QuickButtonMenu"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

const meta = {
  title: "game/Menu/QuickButtonMenu",
  component: QuickButtonMenu,
  decorators: [
    (Story) => (
      <PlayerPreview data={player}>
        <div className="max-w-sm">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof QuickButtonMenu>

export default meta
type Story = StoryObj<typeof meta>

export const QuickButtonMenuStory: Story = { name: "QuickButtonMenu" }
