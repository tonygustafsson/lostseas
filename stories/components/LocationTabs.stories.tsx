import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import LocationTabs from "@/components/LocationTabs"

const meta = {
  title: "components/LocationTabs",
  component: LocationTabs,
  args: {
    items: [
      { id: "traders", label: "Traders" },
      { id: "apothecary", label: "Apothecary" },
      { id: "talk", label: "Joaquina" },
    ],
    currentTab: "traders",
    setCurrentTab: fn(),
  },
} satisfies Meta<typeof LocationTabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** The NPC tab gets a dot when they have quest business with the player */
export const QuestIndicator: Story = {
  args: {
    items: [
      { id: "traders", label: "Traders" },
      { id: "apothecary", label: "Apothecary" },
      { id: "talk", label: "Joaquina", indicator: true },
    ],
  },
}

export const TalkSelected: Story = {
  args: { currentTab: "talk" },
}
