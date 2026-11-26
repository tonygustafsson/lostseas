import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps } from "react"
import { fn } from "storybook/test"

import { MAP_ZOOM_LEVELS } from "@/components/Map/constants"
import TownPicker from "@/components/Map/TownPicker"
import ZoomControl from "@/components/Map/ZoomControl"
import { TOWNS } from "@/constants/locations"

type MapToolsArgs = ComponentProps<typeof ZoomControl> &
  ComponentProps<typeof TownPicker>

// The map tools sit side by side in the corner of the sea map
const MapTools = (args: MapToolsArgs) => (
  <div className="flex gap-2">
    <ZoomControl {...args} />

    <TownPicker {...args} />
  </div>
)

const meta = {
  title: "game/Sea/MapTools",
  component: MapTools,
  args: {
    zoom: 1,
    canZoomIn: true,
    canZoomOut: true,
    onZoomIn: fn(),
    onZoomOut: fn(),
    currentTown: "st-georges",
    onSelectTown: fn(),
  },
  argTypes: {
    zoom: { control: "select", options: MAP_ZOOM_LEVELS },
    currentTown: { control: "select", options: Object.keys(TOWNS) },
    suppliesDays: { control: { type: "number", min: 0 } },
  },
} satisfies Meta<typeof MapTools>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FullyZoomedIn: Story = {
  args: { zoom: MAP_ZOOM_LEVELS.at(-1), canZoomIn: false },
}

export const FullyZoomedOut: Story = {
  args: { zoom: MAP_ZOOM_LEVELS[0], canZoomOut: false },
}
