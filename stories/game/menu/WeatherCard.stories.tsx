import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import WeatherCard from "@/components/menu/WeatherCard"
import { player } from "@/stories/fixtures"
import PlayerPreview from "@/stories/PlayerPreview"

const meta = {
  title: "game/Menu/WeatherCard",
  component: WeatherCard,
  args: { day: 3 },
  argTypes: { day: { control: { type: "number", min: 1 } } },
  decorators: [
    // The weather icon reads the day from the player, so it follows the arg
    (Story, context) => (
      <PlayerPreview
        key={context.args.day}
        data={{
          ...player,
          character: { ...player.character, day: context.args.day },
        }}
      >
        <div className="max-w-sm">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof WeatherCard>

export default meta
type Story = StoryObj<typeof meta>

export const PartlySunny: Story = {}

export const Rainy: Story = { args: { day: 7 } }

export const Cloudy: Story = { args: { day: 1 } }

export const Sunny: Story = { args: { day: 5 } }
