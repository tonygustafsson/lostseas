import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { type ComponentProps, useState } from "react"
import { fn } from "storybook/test"

import DestinationConfirm from "@/components/Map/DestinationConfirm"
import SeaMapCanvas from "@/components/Map/SeaMapCanvas"
import { TOWNS } from "@/constants/locations"
import { getJourneyLength, getSuppliesDays } from "@/utils/journey"

import { player } from "../../fixtures"

const towns = Object.keys(TOWNS)
const weather: WeatherType[] = [
  "sunny",
  "partlySunny",
  "cloudy",
  "rainy",
  "foggy",
]

// Mirrors the map modal: picking a town opens the confirm card on top
const MapWithConfirm = ({
  initialDestination,
}: {
  initialDestination?: Town
}) => {
  const [destination, setDestination] = useState(initialDestination)

  return (
    <div className="relative">
      <SeaMapCanvas
        weather="partlySunny"
        currentTown={player.character.town}
        selectedTown={destination}
        suppliesDays={getSuppliesDays(player).days}
        onSelectTown={setDestination}
      />

      {destination && (
        <DestinationConfirm
          key={destination}
          player={player}
          origin={player.character.town!}
          destination={destination}
          isPending={false}
          onConfirm={fn()}
          onCancel={() => setDestination(undefined)}
        />
      )}
    </div>
  )
}

const meta = {
  title: "game/Sea/SeaMapCanvas",
  component: SeaMapCanvas,
  args: { isPaused: false, weather: "partlySunny" },
  argTypes: {
    weather: { control: "radio", options: weather },
    currentTown: { control: "select", options: towns },
    selectedTown: { control: "select", options: towns },
    suppliesDays: { control: { type: "number", min: 0 } },
  },
} satisfies Meta<typeof SeaMapCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const InTown: Story = {
  args: { currentTown: "Havana", onSelectTown: fn() },
}

// Each town icon swapped for a dot at the town's location, where the bottom
// of its icon stands, to check town positions against the map
export const TownPositions: Story = {
  args: InTown.args,
  render: (args) => (
    <div className="[&_button]:after:bg-error [&_button]:after:absolute [&_button]:after:bottom-1.5 [&_button]:after:left-1/2 [&_button]:after:size-1 [&_button]:after:-translate-x-1/2 [&_button]:after:translate-y-1/2 [&_button]:after:rounded-full [&_button]:after:content-[''] [&_button_img]:hidden">
      <SeaMapCanvas {...args} />
    </div>
  ),
}

type AtSeaArgs = ComponentProps<typeof SeaMapCanvas> & {
  origin: Town
  destination: Town
  day: number
}

// Pick any two towns and step through the days to watch the ship sail
export const AtSea: StoryObj<AtSeaArgs> = {
  args: { origin: "Havana", destination: "Barbados", day: 3 },
  argTypes: {
    origin: { control: "select", options: towns },
    destination: { control: "select", options: towns },
    day: { control: { type: "number", min: 1 } },
    journey: { table: { disable: true } },
  },
  render: ({ origin, destination, day, ...args }) => {
    const totalDays = getJourneyLength(origin, destination)

    return (
      <SeaMapCanvas
        {...args}
        journey={{
          origin,
          destination,
          day: Math.min(Math.max(day, 1), totalDays),
          totalDays,
        }}
      />
    )
  },
}

export const Rainy: StoryObj<AtSeaArgs> = {
  ...AtSea,
  args: { ...AtSea.args, weather: "rainy" },
}

export const Foggy: StoryObj<AtSeaArgs> = {
  ...AtSea,
  args: { ...AtSea.args, weather: "foggy" },
}

export const LimitedSupplies: Story = {
  args: {
    currentTown: "Havana",
    selectedTown: "Port Royale",
    suppliesDays: 2,
    onSelectTown: fn(),
  },
}

// The ship stays put instead of sailing towards today's position
export const Paused: StoryObj<AtSeaArgs> = {
  ...AtSea,
  args: { ...AtSea.args, isPaused: true },
}

export const WithDestinationConfirm: Story = {
  parameters: { controls: { disable: true } },
  render: () => <MapWithConfirm initialDestination="Havana" />,
}
