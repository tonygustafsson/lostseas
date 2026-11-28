import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import WeatherIcon from "@/components/WeatherIcon"

const meta = {
  title: "components/WeatherIcon",
  component: WeatherIcon,
  args: { weather: "sunny", className: "size-16" },
  argTypes: {
    weather: {
      control: "select",
      options: ["sunny", "partlySunny", "cloudy", "rainy", "foggy"],
    },
  },
} satisfies Meta<typeof WeatherIcon>

export default meta
type Story = StoryObj<typeof meta>

export const WeatherIconStory: Story = { name: "WeatherIcon" }
