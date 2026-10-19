import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import ShopNecessitiesPresets from "@/components/location/Shop/ShopNecessitiesPresets"

// 40 crew use 4 food and 8 water a day
const meta = {
  component: ShopNecessitiesPresets,
  args: { crewMembers: 40, food: 180, water: 240, onApply: fn() },
} satisfies Meta<typeof ShopNecessitiesPresets>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoCrew: Story = { args: { crewMembers: 0 } }

export const RunningLow: Story = { args: { food: 8, water: 16 } }
