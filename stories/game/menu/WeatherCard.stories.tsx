import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import WeatherCard from "@/components/menu/WeatherCard"
import { WEATHER_NAMES } from "@/utils/weather"

const meta = {
  title: "game/Menu/WeatherCard",
  component: WeatherCard,
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
} satisfies Meta<typeof WeatherCard>

export default meta
type Story = StoryObj<typeof meta>

export const PartlySunny: Story = {}

export const Rainy: Story = { args: { weather: "rainy" } }

export const Cloudy: Story = { args: { weather: "cloudy" } }

export const Sunny: Story = { args: { weather: "sunny" } }

export const Foggy: Story = { args: { weather: "foggy" } }

export const AllWeathers: Story = {
  render: ({ day }) => (
    <div className="flex flex-col gap-4">
      {(Object.keys(WEATHER_NAMES) as WeatherType[]).map((weather) => (
        <WeatherCard key={weather} day={day} weather={weather} />
      ))}
    </div>
  ),
}
