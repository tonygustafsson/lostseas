import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FlaskConical, MessageCircle, Store } from "lucide-react"
import { fn } from "storybook/test"

import LocationTabs from "@/components/LocationTabs"

const meta = {
  title: "components/LocationTabs",
  component: LocationTabs,
  argTypes: { items: { control: false } },
  args: {
    items: [
      { id: "traders", label: "Traders", icon: <Store /> },
      { id: "apothecary", label: "Apothecary", icon: <FlaskConical /> },
      { id: "talk", label: "Joaquina", icon: <MessageCircle /> },
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
      { id: "traders", label: "Traders", icon: <Store /> },
      { id: "apothecary", label: "Apothecary", icon: <FlaskConical /> },
      {
        id: "talk",
        label: "Joaquina",
        icon: <MessageCircle />,
        indicator: true,
      },
    ],
  },
}

export const TalkSelected: Story = {
  args: { currentTab: "talk" },
}
