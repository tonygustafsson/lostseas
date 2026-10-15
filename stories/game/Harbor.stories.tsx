import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import HarborScene from "@/components/game-ui/LocationScene/HarborScene"

import { player } from "../fixtures"
import PlayerPreview from "../PlayerPreview"

const inHarbor = (overrides: Partial<Player> = {}): Player => ({
  ...player,
  character: { ...player.character, location: "Harbor" },
  ...overrides,
})

const readyToSail = inHarbor({
  character: { ...player.character, location: "Harbor", gold: 400 },
  ships: { endeavour: { ...player.ships.endeavour, health: 100 } },
  crewMembers: { ...player.crewMembers, count: 16 },
})

const fewWarnings = inHarbor({
  crewMembers: { ...player.crewMembers, mood: 20 },
})

const manyWarnings = inHarbor({
  character: { ...player.character, location: "Harbor", loan: 500 },
  crewMembers: { count: 40, health: 10, mood: 0 },
  inventory: { ...player.inventory, food: 5, water: 4 },
  locationStates: { harbor: { lastHarborReason: "arrived" } },
})

const meta = {
  title: "game/Harbor",
  component: HarborScene,
  parameters: { player: fewWarnings },
  args: { town: "Port Royale" },
  argTypes: {
    town: {
      control: "select",
      options: [
        "Barbados",
        "Belize",
        "Biloxi",
        "Bonaire",
        "Charles Towne",
        "Curacao",
        "Havana",
        "Leogane",
        "Martinique",
        "Panama",
        "Port Royale",
        "San Juan",
        "St. Eustatius",
        "St. Martin",
        "Tortuga",
        "Villa Hermosa",
      ],
    },
  },
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={context.parameters.player}>
        <div className="mx-auto max-w-6xl">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof HarborScene>

export default meta
type Story = StoryObj<typeof meta>

export const ReadyToSail: Story = { parameters: { player: readyToSail } }
export const FewWarnings: Story = {}
export const ManyWarnings: Story = { parameters: { player: manyWarnings } }
export const Mobile: Story = {
  parameters: {
    player: manyWarnings,
    viewport: { value: "iphone12" },
  },
  globals: { viewport: { value: "iphone12" } },
}
