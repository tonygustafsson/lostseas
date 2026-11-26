import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import AdvisorDrawer from "@/components/drawer/drawerContent/Advisor"

import { player } from "../../../fixtures"
import PlayerPreview from "../../../PlayerPreview"

const warnings: Player = {
  ...player,
  crewMembers: { count: 40, health: 10, mood: 0 },
  inventory: { ...player.inventory, food: 5, water: 4 },
}

const meta = {
  title: "game/Drawers/Advisor/AdvisorDrawer",
  component: AdvisorDrawer,
  parameters: { player: warnings },
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={context.parameters.player}>
        <div className="max-w-lg">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof AdvisorDrawer>

export default meta

type Story = StoryObj<typeof meta>

/** No back button, as the advisor opens from the menu on desktop */
export const Default: Story = { name: "AdvisorDrawer" }
