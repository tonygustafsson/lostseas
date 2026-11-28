import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import ShipMeetingActions from "@/components/location/Sea/ShipMeetingActions"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

const meta = {
  title: "game/Ship meetings/ShipMeetingActions",
  component: ShipMeetingActions,
  args: { isAggressive: false, isAllied: false },
  argTypes: {
    isAggressive: { control: "boolean" },
    isAllied: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <PlayerPreview data={player}>
        <div className="max-w-xl">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof ShipMeetingActions>

export default meta
type Story = StoryObj<typeof meta>

export const ShipMeetingActionsStory: Story = { name: "ShipMeetingActions" }
