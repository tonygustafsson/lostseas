import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import BankVentures from "@/components/location/Bank/Ventures"
import { VENTURES } from "@/constants/ventures"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = {
  gold: number
  day: number
  ventureId: keyof typeof VENTURES
  /** Day the stake was invested, empty for no share in the venture */
  investedDay: number | null
  returnDay: number
}

// Ventures reads the player from the query cache, so the args build one
const meta = {
  title: "game/Bank/Ventures",
  component: BankVentures,
  args: {
    gold: 5000,
    day: 12,
    ventureId: "tobaccoRun",
    investedDay: null,
    returnDay: 30,
  },
  argTypes: {
    gold: { control: { type: "number", min: 0 } },
    day: { control: { type: "number", min: 0 } },
    ventureId: { control: "select", options: Object.keys(VENTURES) },
    investedDay: { control: "number" },
    returnDay: { control: "number" },
  },
  render: ({ gold, day, ventureId, investedDay, returnDay }) => (
    <PlayerPreview
      key={`${gold}-${day}-${ventureId}-${investedDay}-${returnDay}`}
      data={{
        ...player,
        character: {
          ...player.character,
          location: "Bank",
          gold,
          day,
          ventures:
            investedDay === null
              ? undefined
              : { [ventureId]: { investedDay, returnDay } },
        },
      }}
    >
      <BankVentures />
    </PlayerPreview>
  ),
} satisfies Meta<Args>
export default meta
type Story = StoryObj<typeof meta>

export const VenturesStory: Story = { name: "Ventures" }
