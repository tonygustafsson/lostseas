import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import BuildingIntro from "@/components/game-ui/LocationScene/BuildingIntro"
import { TOWNS } from "@/constants/locations"

const locations: TownLocation[] = [
  "Bank",
  "Tavern",
  "Market",
  "Shop",
  "Shipyard",
  "City hall",
]

const meta = {
  title: "game/BuildingIntro",
  component: BuildingIntro,
  args: { town: "Port Royale", location: "Tavern" },
  argTypes: {
    town: { control: "select", options: Object.keys(TOWNS) },
    location: { control: "select", options: [...locations, "Harbor", "Sea"] },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-2xl text-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BuildingIntro>

export default meta
type Story = StoryObj<typeof meta>

export const Tavern: Story = {}

export const Shipyard: Story = {
  args: { town: "Havana", location: "Shipyard" },
}

export const FrenchMarket: Story = {
  args: { town: "Tortuga", location: "Market" },
}

// Places without a building fall back to a plain name and no description
export const NoBuilding: Story = {
  args: { town: "Barbados", location: "Harbor" },
}
