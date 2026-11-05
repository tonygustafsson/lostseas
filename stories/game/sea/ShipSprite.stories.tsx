import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SHIP_DIRECTIONS, SHIP_FRAMES } from "@/components/Map/shipFrames"
import ShipSprite from "@/components/Map/ShipSprite"

// Room for the most enlarged direction, so no ship spills out of its frame
const largestScale = Math.max(
  ...Object.values(SHIP_FRAMES).map(({ scale }) => scale)
)

const meta = {
  title: "game/Sea/ShipSprite",
  component: ShipSprite,
  args: { direction: "right", size: 128 },
  argTypes: {
    direction: { control: "select", options: SHIP_DIRECTIONS },
    size: { control: { type: "range", min: 16, max: 448, step: 8 } },
  },
} satisfies Meta<typeof ShipSprite>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// Every direction at once, to check the ships line up when turning
export const AllDirections: Story = {
  argTypes: { direction: { table: { disable: true } } },
  render: ({ size = 128 }) => (
    <div className="grid grid-cols-4 gap-8">
      {SHIP_DIRECTIONS.map((direction) => (
        <div key={direction} className="flex flex-col items-center gap-2">
          <div
            className="border-border flex items-center justify-center border"
            style={{ width: size * largestScale, height: size * largestScale }}
          >
            <ShipSprite direction={direction} size={size} />
          </div>

          <span className="text-muted-foreground text-sm">{direction}</span>
        </div>
      ))}
    </div>
  ),
}
