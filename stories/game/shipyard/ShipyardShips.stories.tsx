import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen } from "storybook/test"

import useModal from "@/app/stores/modals"
import ShipyardShips from "@/components/location/Shipyard/Ships"
import Modal from "@/components/Modal"
import { TITLE_INFO } from "@/constants/title"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

/** A fleet of healthy Brigs */
const withFleet = (count: number, gold = 20000): Player => ({
  ...player,
  character: { ...player.character, location: "Shipyard", gold },
  ships: Object.fromEntries(
    Array.from({ length: count }, (_, index) => [
      `brig-${index}`,
      {
        id: `brig-${index}`,
        name: `Brig ${index + 1}`,
        type: "Brig",
        health: 100,
        createdDay: 1,
      },
    ])
  ),
})

const captainLimit = TITLE_INFO.Captain.maxShips

// ShipyardShips reads the player from the query cache, so variants swap the player
const meta = {
  title: "game/Shipyard/ShipyardShips",
  component: ShipyardShips,
  parameters: { player: withFleet(1) },
  beforeEach: () => {
    useModal.setState({ modals: {} })
    return () => useModal.getState().removeAllModals()
  },
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={context.parameters.player}>
        <Story />
        <Modal />
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof ShipyardShips>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.queryByText("Ships needing repair")).toBeNull()
    await expect(
      canvas.getByRole("button", { name: "Buy for 10,000 gold" })
    ).toBeEnabled()
  },
}

/** A damaged ship is listed for repair above the ships for sale */
export const NeedsRepair: Story = {
  parameters: {
    player: {
      ...player,
      character: { ...player.character, location: "Shipyard" },
      ships: { endeavour: { ...player.ships.endeavour, health: 40 } },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Ships needing repair")).toBeVisible()
    await expect(
      canvas.getByRole("button", { name: /^Repair for/ })
    ).toBeVisible()
  },
}

/** Ships cost more than the player has, but the cards don't look disabled */
export const Poor: Story = {
  parameters: { player: withFleet(1, 1200) },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByText("You cannot afford this")).toHaveLength(3)
    await expect(
      canvas.getByRole("button", { name: "Buy for 1,000 gold" })
    ).toBeEnabled()
  },
}

/** The Captain's fleet is full, so no ship can be bought */
export const MaxShipsReached: Story = {
  parameters: { player: withFleet(captainLimit) },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Max ships reached")).toBeVisible()
    await expect(canvas.getAllByText("Your fleet is full")).toHaveLength(4)
  },
}

/** After changing nation to a lower title, the extra ships are kept */
export const OverTheLimit: Story = {
  parameters: { player: withFleet(captainLimit + 2) },
}

export const NoShips: Story = {
  parameters: { player: withFleet(0) },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText("You do not own any ships currently.")
    ).toBeVisible()
  },
}

/** Selling asks first, since a sold ship is gone for good */
export const SellConfirmation: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Sell for 750 gold" })
    )

    const dialog = await screen.findByRole("dialog")

    await expect(dialog).toHaveTextContent("Sell Brig 1?")
    await expect(dialog).toHaveTextContent(
      "The shipyard pays 750 gold for your brig Brig 1"
    )
  },
}

/** The info button on your own ships tells what the ship type is good for */
export const ShipInfo: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "About Brig" }))

    await expect(await screen.findByText("Cargo 300, crew 2–20")).toBeVisible()
  },
}
