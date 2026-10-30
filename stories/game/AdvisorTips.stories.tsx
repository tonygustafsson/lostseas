import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import AdvisorTips from "@/components/advisor/AdvisorTips"
import { TOWNS } from "@/constants/locations"

import { player } from "../fixtures"
import PlayerPreview from "../PlayerPreview"

const allClear: Player = {
  ...player,
  character: { ...player.character, gold: 400 },
  ships: { endeavour: { ...player.ships.endeavour, health: 100 } },
  crewMembers: { ...player.crewMembers, count: 16 },
}

const warnings: Player = {
  ...player,
  character: { ...player.character, loan: 500 },
  crewMembers: { count: 40, health: 10, mood: 0 },
  inventory: { ...player.inventory, food: 5, water: 4 },
}

const meta = {
  title: "game/AdvisorTips",
  component: AdvisorTips,
  parameters: { player: warnings },
  args: {
    title: "Arrr, a word in yer ear, Cap'n.",
    heading: undefined,
    showAllClear: false,
    destination: undefined,
  },
  argTypes: {
    heading: { control: "text" },
    destination: { control: "select", options: Object.keys(TOWNS) },
  },
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={context.parameters.player}>
        <div className="max-w-lg">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof AdvisorTips>

export default meta
type Story = StoryObj<typeof meta>

export const Warnings: Story = {}
export const WithHeading: Story = { args: { heading: "Land ho!" } }
// Supplies are checked against the voyage length to the destination
export const WithDestination: Story = { args: { destination: "Tortuga" } }
export const AllClear: Story = {
  args: { showAllClear: true },
  parameters: { player: allClear },
}
