import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import useModal from "@/app/stores/modals"
import ShipyardShips from "@/components/location/Shipyard/Ships"
import Modal from "@/components/Modal"
import { SHIP_TYPES } from "@/constants/ship"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = {
  gold: number
  ships: number
  shipType: ShipType
  /** Health of every ship, repairs are only offered for damaged ones */
  shipHealth: number
}

// ShipyardShips reads the player from the query cache, so the args build one
const meta = {
  title: "game/Shipyard",
  component: ShipyardShips,
  args: { gold: 20000, ships: 1, shipType: "Brig", shipHealth: 100 },
  argTypes: {
    gold: { control: { type: "number", min: 0 } },
    ships: { control: { type: "number", min: 0 } },
    shipType: { control: "select", options: Object.keys(SHIP_TYPES) },
    shipHealth: { control: { type: "range", min: 0, max: 100 } },
  },
  beforeEach: () => {
    useModal.setState({ modals: {} })
    return () => useModal.getState().removeAllModals()
  },
  render: ({ gold, ships, shipType, shipHealth }) => (
    <PlayerPreview
      key={`${gold}-${ships}-${shipType}-${shipHealth}`}
      data={{
        ...player,
        character: { ...player.character, location: "Shipyard", gold },
        ships: Object.fromEntries(
          Array.from({ length: ships }, (_, index) => [
            `brig-${index}`,
            {
              id: `brig-${index}`,
              name: `${shipType} ${index + 1}`,
              type: shipType,
              health: shipHealth,
              createdDay: 1,
            },
          ])
        ),
      }}
    >
      <ShipyardShips />

      <Modal />
    </PlayerPreview>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Change the gold and the number of ships to see what can be bought, from too poor to a full fleet */
export const BuyShips: Story = {
  argTypes: {
    shipType: { table: { disable: true } },
    shipHealth: { table: { disable: true } },
  },
}

// Hides the sections after the repair list, ships for sale and your fleet
export const Repair: Story = {
  args: { shipHealth: 40 },
  decorators: [
    (Story) => (
      <div className="[&_section:not(:first-child)]:hidden">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Ships needing repair")).toBeVisible()
    await expect(
      canvas.getByRole("button", { name: /^Repair for/ })
    ).toBeVisible()
  },
}

// Hides the sections before your fleet
export const SellShips: Story = {
  decorators: [
    (Story) => (
      <div className="[&_section:not(:last-child)]:hidden">
        <Story />
      </div>
    ),
  ],
}
