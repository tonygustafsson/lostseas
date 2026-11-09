import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import PlayerGuide from "@/components/guide/PlayerGuide"

const meta = {
  title: "game/Guide/PlayerGuide",
  component: PlayerGuide,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="bg-background mx-auto max-w-7xl p-4 sm:p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PlayerGuide>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithFooter: Story = {
  args: {
    children: (
      <p className="text-muted-foreground">Content after the last chapter</p>
    ),
  },
}
