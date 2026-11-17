import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import { MAP_ZOOM_LEVELS } from "@/components/Map/constants"
import ZoomControl from "@/components/Map/ZoomControl"

const meta = {
  title: "game/Sea/ZoomControl",
  component: ZoomControl,
  args: {
    zoom: 1,
    canZoomIn: true,
    canZoomOut: true,
    onZoomIn: fn(),
    onZoomOut: fn(),
  },
  argTypes: {
    zoom: { control: "select", options: MAP_ZOOM_LEVELS },
  },
} satisfies Meta<typeof ZoomControl>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FullyZoomedIn: Story = {
  args: { zoom: MAP_ZOOM_LEVELS.at(-1), canZoomIn: false },
}

export const FullyZoomedOut: Story = {
  args: { zoom: MAP_ZOOM_LEVELS[0], canZoomOut: false },
}
