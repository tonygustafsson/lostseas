import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GiPirateCaptain } from "react-icons/gi"
import { fn } from "storybook/test"

import HandOverCard from "@/components/location/Cityhall/HandOverCard"
import TreasureIcon from "@/components/TreasureIcon"
import { TREASURES } from "@/constants/treasures"
import { PIRATE_CRIMES } from "@/constants/wantedPirates"

const incaMask = TREASURES[0]
const sackedTown = PIRATE_CRIMES[PIRATE_CRIMES.length - 1]

const icons = {
  "Wanted pirate": <GiPirateCaptain />,
  ...Object.fromEntries(
    TREASURES.map(({ name }) => [
      name,
      <TreasureIcon key={name} item={name as TreasureName} />,
    ])
  ),
}

const meta = {
  title: "game/HandOverCard",
  component: HandOverCard,
  args: {
    title: incaMask.name,
    icon: "Inca mask",
    description: incaMask.description,
    rewardLabel: "Value",
    reward: incaMask.value,
    onHandOver: fn(),
  },
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(icons),
      mapping: icons,
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HandOverCard>

export default meta

type Story = StoryObj<typeof meta>

export const Treasure: Story = {}

export const WantedPirate: Story = {
  args: {
    title: 'Grace "Bloody" Morgan',
    icon: "Wanted pirate",
    description: sackedTown.description,
    rewardLabel: "Bounty",
    reward: sackedTown.bounty,
  },
}

export const WithoutDescription: Story = {
  args: { description: undefined },
}

export const Disabled: Story = {
  args: { disabled: true },
}
