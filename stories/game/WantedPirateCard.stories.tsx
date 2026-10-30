import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import WantedPirateCard from "@/components/WantedPirateCard"
import { TOWNS } from "@/constants/locations"
import { PIRATE_CRIMES } from "@/constants/wantedPirates"

type Args = {
  name: string
  crimeId: string
  rewarder: Town
}

const meta = {
  title: "game/WantedPirateCard",
  args: {
    name: 'Jack "Mad" Flint',
    crimeId: "rum-warehouse",
    rewarder: "Havana",
  },
  argTypes: {
    name: { control: "text" },
    crimeId: {
      control: "select",
      options: PIRATE_CRIMES.map(({ id }) => id),
    },
    rewarder: { control: "select", options: Object.keys(TOWNS) },
  },
  render: (args) => (
    <div className="max-w-xl">
      <WantedPirateCard pirate={{ id: "pirate-1", ...args }} />
    </div>
  ),
} satisfies Meta<Args>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const HighestBounty: Story = {
  args: {
    name: 'Grace "Bloody" Morgan',
    crimeId: "sacked-town",
    rewarder: "Tortuga",
  },
}
