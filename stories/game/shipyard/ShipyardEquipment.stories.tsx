import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import ShipyardEquipment from "@/components/location/Shipyard/Equipment"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

const atShipyard = (gold: number, cannons = 4, repairKits = 2): Player => ({
  ...player,
  character: { ...player.character, location: "Shipyard", gold },
  inventory: { ...player.inventory, cannons, repairKits },
})

// ShipyardEquipment reads the player from the query cache, so variants swap the player
const meta = {
  title: "game/Shipyard/ShipyardEquipment",
  component: ShipyardEquipment,
  parameters: { player: atShipyard(5000) },
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={context.parameters.player}>
        <Story />
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof ShipyardEquipment>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** The picker can go over budget. Only Transfer is stopped, with a message */
export const OverBudget: Story = {
  parameters: { player: atShipyard(100) },
  play: async ({ canvas, userEvent }) => {
    const moreCannons = canvas.getByRole("button", { name: "One more Cannons" })

    await userEvent.click(moreCannons)
    await userEvent.click(moreCannons)

    await expect(canvas.getByText("Not enough gold")).toBeVisible()
    // Equipment doesn't use the hold, so there's no cargo total
    await expect(canvas.queryByText("Cargo after trade")).toBeNull()
    await expect(
      canvas.getByRole("button", { name: "Transfer" })
    ).toBeDisabled()
  },
}

/** Selling cannons plans a sale, and the label shows what you'll own */
export const Selling: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "One less Cannons" })
    )

    await expect(canvas.getByText("3 cannons")).toBeVisible()
    await expect(canvas.getByRole("button", { name: "Transfer" })).toBeEnabled()
  },
}
