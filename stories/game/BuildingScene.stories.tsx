import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import BuildingScene from "@/components/game-ui/LocationScene/BuildingScene"
import { TOWNS } from "@/constants/locations"

import { player } from "../fixtures"
import PlayerPreview from "../PlayerPreview"

const LOCATIONS: TownLocation[] = [
  "Bank",
  "City hall",
  "Market",
  "Shipyard",
  "Shop",
  "Tavern",
]

const meta = {
  title: "game/BuildingScene",
  component: BuildingScene,
  args: { town: "Tortuga", location: "Tavern" },
  argTypes: {
    town: {
      control: "select",
      options: Object.keys(TOWNS).sort(),
    },
    location: {
      control: "select",
      options: LOCATIONS,
    },
  },
  decorators: [
    (Story, context) => (
      <PlayerPreview key={context.id} data={player}>
        <div className="mx-auto max-w-6xl">
          <Story key={`${context.args.town}-${context.args.location}`} />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof BuildingScene>

export default meta
type Story = StoryObj<typeof meta>

export const Tavern: Story = {}
export const Bank: Story = { args: { location: "Bank" } }
export const CityHall: Story = { args: { location: "City hall" } }
export const Market: Story = { args: { location: "Market" } }
export const Shipyard: Story = { args: { location: "Shipyard" } }
export const Shop: Story = { args: { location: "Shop" } }
export const Mobile: Story = {
  parameters: { viewport: { value: "iphone12" } },
  globals: { viewport: { value: "iphone12" } },
}
