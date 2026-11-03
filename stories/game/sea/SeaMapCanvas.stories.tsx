import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { fn } from "storybook/test"

import DestinationConfirm from "@/components/Map/DestinationConfirm"
import SeaMapCanvas from "@/components/Map/SeaMapCanvas"
import { TOWNS } from "@/constants/locations"
import { getSuppliesDays } from "@/utils/journey"

import { player } from "../../fixtures"

const towns = Object.keys(TOWNS)

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
        currentTown={player.character.town}
        selectedTown={destination}
        suppliesDays={getSuppliesDays(player).days}
        onSelectTown={setDestination}
      />

      {destination && (
        <DestinationConfirm
          key={destination}
          player={player}
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
  args: { isPaused: false },
  argTypes: {
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

export const AtSea: Story = {
  args: {
    journey: {
      origin: "Havana",
      destination: "Barbados",
      day: 3,
      totalDays: 6,
    },
  },
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
export const Paused: Story = {
  args: { ...AtSea.args, isPaused: true },
}

export const WithDestinationConfirm: Story = {
  parameters: { controls: { disable: true } },
  render: () => <MapWithConfirm initialDestination="Havana" />,
}
