import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MotionConfig } from "framer-motion"
import { fn } from "storybook/test"

import TypewriterText from "@/components/npc/TypewriterText"

const meta = {
  title: "game/Townsfolk/TypewriterText",
  component: TypewriterText,
  args: {
    text: "Three days out of Tortuga the cook swore the fog was following us. By the fifth day it had started asking for rum.",
    charactersPerSecond: 100,
    onDone: fn(),
  },
  argTypes: {
    charactersPerSecond: { control: { type: "range", min: 5, max: 200 } },
  },
  decorators: [
    (Story) => (
      <p className="max-w-md text-base">
        <Story />
      </p>
    ),
  ],
} satisfies Meta<typeof TypewriterText>

export default meta

type Story = StoryObj<typeof meta>

/** Click the text to skip to the end */
export const Default: Story = {}

export const Slow: Story = {
  args: { charactersPerSecond: 10 },
}

export const Fast: Story = {
  args: { charactersPerSecond: 200 },
}

/** Forces reduced motion, like the device setting does, so the text shows at once */
export const ReducedMotion: Story = {
  decorators: [
    (Story) => (
      <MotionConfig reducedMotion="always">
        <Story />
      </MotionConfig>
    ),
  ],
}
