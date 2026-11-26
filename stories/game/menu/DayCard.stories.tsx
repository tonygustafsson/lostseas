import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import DayCard from "@/components/menu/DayCard"
import { WEATHER_NAMES } from "@/utils/weather"

const meta = {
  title: "game/Menu/DayCard",
  component: DayCard,
  args: { day: 3, weather: "partlySunny" },
  argTypes: {
    day: { control: { type: "number", min: 1 } },
    weather: { control: "radio", options: Object.keys(WEATHER_NAMES) },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DayCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: "DayCard" }
