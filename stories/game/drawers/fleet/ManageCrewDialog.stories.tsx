import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen } from "storybook/test"

import ManageCrewDialog from "@/components/crew/ManageCrewDialog"

import { player } from "../../../fixtures"
import PlayerPreview from "../../../PlayerPreview"

const meta = {
  title: "game/Drawers/Fleet/ManageCrewDialog",
  component: ManageCrewDialog,
  parameters: { player },
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={context.parameters.player}>
        <div className="max-w-lg">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
  args: { className: "w-full" },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Manage Crew" }))

    await expect(
      await screen.findByRole("dialog", { name: "Manage Crew" })
    ).toBeInTheDocument()
  },
} satisfies Meta<typeof ManageCrewDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** A few sailors, so a single bottle or coin shows on the bars */
export const SmallCrew: Story = {
  parameters: {
    player: {
      ...player,
      crewMembers: { count: 4, health: 40, mood: 30 },
    },
  },
}

/** Nothing to give, so Give stays disabled */
export const NoMedicineOrGold: Story = {
  parameters: {
    player: {
      ...player,
      character: { ...player.character, gold: 0 },
      inventory: { ...player.inventory, medicine: 0 },
    },
  },
}

/** A healthy, happy crew needs nothing */
export const ContentCrew: Story = {
  parameters: {
    player: {
      ...player,
      crewMembers: { ...player.crewMembers, health: 100, mood: 100 },
    },
  },
}

export const Closed: Story = {
  play: undefined,
}
