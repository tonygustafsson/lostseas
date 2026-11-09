import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FlaskConical, MessageCircle, Store } from "lucide-react"
import { fn } from "storybook/test"

import LocationNavigation from "@/components/LocationNavigation"

const meta = {
  title: "components/LocationNavigation",
  component: LocationNavigation,
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
} satisfies Meta<typeof LocationNavigation>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** The NPC medallion gets a scroll badge when they have quest business with the player */
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

export const QuestIndicatorSelected: Story = {
  args: { ...QuestIndicator.args, currentTab: "talk" },
}
