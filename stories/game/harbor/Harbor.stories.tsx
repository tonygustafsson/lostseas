import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import HarborScene from "@/components/game-ui/LocationScene/HarborScene"
import { TOWNS } from "@/constants/locations"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

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

const meta = {
  title: "game/Harbor/Harbor",
  component: HarborScene,
  parameters: { player: readyToSail },
  args: { town: "kingston" },
  argTypes: {
    town: {
      control: "select",
      options: Object.keys(TOWNS).sort(),
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

export const Harbor: Story = {}
