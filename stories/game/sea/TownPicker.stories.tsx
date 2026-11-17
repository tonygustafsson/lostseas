import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import TownPicker from "@/components/Map/TownPicker"
import { TOWNS } from "@/constants/locations"

const meta = {
  title: "game/Sea/TownPicker",
  component: TownPicker,
  args: {
    currentTown: "st-georges",
    onSelectTown: fn(),
  },
  argTypes: {
    currentTown: { control: "select", options: Object.keys(TOWNS) },
    suppliesDays: { control: { type: "number", min: 0 } },
  },
} satisfies Meta<typeof TownPicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Towns further than the supplies last are greyed out */
export const LimitedSupplies: Story = { args: { suppliesDays: 10 } }
