import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Skeleton } from "@/components/ui/skeleton"

const meta = {
  component: Skeleton,
  args: { className: "h-8 w-64" },
} satisfies Meta<typeof Skeleton>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const LoadingCard: Story = {
  render: () => (
    <div
      className="grid max-w-sm gap-4"
      role="status"
      aria-label="Loading card"
    >
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
}
