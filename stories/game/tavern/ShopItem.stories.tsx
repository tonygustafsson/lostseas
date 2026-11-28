import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import ShopItem from "@/components/location/Tavern/ShopItem"
import { TAVERN_ITEMS } from "@/constants/tavern"

import { player } from "../../fixtures"
import PlayerPreview from "../../PlayerPreview"

type Args = {
  item: keyof typeof TAVERN_ITEMS
  gold: number
  crew: number
  health: number
  mood: number
}

// ShopItem uses the tavern mutations, so it needs the query provider
const meta = {
  title: "game/Tavern/ShopItem",
  component: ShopItem,
  args: { item: "pass-the-rum", gold: 2500, crew: 40, health: 85, mood: 75 },
  argTypes: {
    item: { control: "select", options: Object.keys(TAVERN_ITEMS) },
    gold: { control: { type: "number", min: 0 } },
    crew: { control: { type: "number", min: 0 } },
    health: { control: { type: "range", min: 0, max: 100 } },
    mood: { control: { type: "range", min: 0, max: 100 } },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
  render: ({ item, gold, crew, health, mood }) => {
    const data = {
      ...player,
      character: { ...player.character, location: "Tavern", gold },
      crewMembers: { count: crew, health, mood },
    } satisfies Player

    return (
      <PlayerPreview key={`${gold}-${crew}-${health}-${mood}`} data={data}>
        <ShopItem item={item} player={data} />
      </PlayerPreview>
    )
  },
} satisfies Meta<Args>
export default meta
type Story = StoryObj<typeof meta>

export const ShopItemStory: Story = { name: "ShopItem" }
