import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import TreasureCard from "@/components/TreasureCard"

const meta = {
  title: "game/Drawers/Inventory/TreasureCard",
  component: TreasureCard,
  args: {
    treasure: { id: "treasure-1", name: "Inca mask", rewarder: "havana" },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TreasureCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = { name: "TreasureCard" }
