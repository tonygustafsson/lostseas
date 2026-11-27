import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import LeaderboardItem from "@/components/LeaderboardItem"

const meta = {
  component: LeaderboardItem,
  args: {
    rank: 1,
    entry: {
      name: "Mateo Salazar",
      characterId: "mateo-salazar",
      title: "Duke",
      nationality: "Spain",
      score: 1240,
      day: 412,
    },
  },
  decorators: [
    (Story) => (
      <ol>
        <Story />
      </ol>
    ),
  ],
} satisfies Meta<typeof LeaderboardItem>
export default meta

type Story = StoryObj<typeof meta>

export const LeaderboardItemStory: Story = { name: "LeaderboardItem" }
