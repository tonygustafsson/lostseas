import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Swords, Waves } from "lucide-react"
import { fn } from "storybook/test"

import SoundToggle from "@/components/Sound/SoundToggle"

const icons = { Waves, Swords }

const meta = {
  title: "components/Sound/SoundToggle",
  component: SoundToggle,
  args: {
    id: "toggle",
    icon: Waves,
    title: "Ambience",
    checked: true,
    onCheckedChange: fn(),
  },
  argTypes: {
    icon: { control: "select", options: Object.keys(icons), mapping: icons },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SoundToggle>

export default meta
type Story = StoryObj<typeof meta>

export const SoundToggleStory: Story = { name: "SoundToggle" }
