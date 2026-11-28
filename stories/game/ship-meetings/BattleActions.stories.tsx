import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import BattleActions from "@/components/location/Sea/BattleActions"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

const meta = {
  title: "game/Ship meetings/BattleActions",
  component: BattleActions,
  decorators: [
    (Story) => (
      <PlayerPreview data={player}>
        <div className="max-w-xl">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof BattleActions>

export default meta
type Story = StoryObj<typeof meta>

export const BattleActionsStory: Story = { name: "BattleActions" }
