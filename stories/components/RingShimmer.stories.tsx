import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import RingShimmer from "@/components/RingShimmer"

const meta = {
  title: "components/RingShimmer",
  component: RingShimmer,
  args: { className: "animate-ring-shimmer" },
  decorators: [
    (Story) => (
      <div className="border-gold relative size-32 rounded-full border-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RingShimmer>

export default meta
type Story = StoryObj<typeof meta>

export const RingShimmerStory: Story = { name: "RingShimmer" }
