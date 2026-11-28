import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Music, Waves } from "lucide-react"
import { fn } from "storybook/test"

import SoundChannel from "@/components/Sound/SoundChannel"

const icons = { Music, Waves }

const meta = {
  title: "components/Sound/SoundChannel",
  component: SoundChannel,
  args: {
    id: "channel",
    icon: Music,
    title: "Music",
    checked: true,
    onCheckedChange: fn(),
    children: "Shown while the channel is on",
  },
  argTypes: {
    icon: { control: "select", options: Object.keys(icons), mapping: icons },
    children: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SoundChannel>

export default meta
type Story = StoryObj<typeof meta>

export const SoundChannelStory: Story = { name: "SoundChannel" }
