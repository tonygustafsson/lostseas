import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import SocialMedia from "@/components/SocialMedia"

const meta = {
  component: SocialMedia,
} satisfies Meta<typeof SocialMedia>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
