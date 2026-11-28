import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import Equalizer from "@/components/Sound/Equalizer"

const meta = {
  title: "components/Sound/Equalizer",
  component: Equalizer,
} satisfies Meta<typeof Equalizer>

export default meta
type Story = StoryObj<typeof meta>

export const EqualizerStory: Story = { name: "Equalizer" }
