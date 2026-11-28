import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { fn } from "storybook/test"

import CrewQuantity from "@/components/crew/CrewQuantity"

const meta = {
  title: "game/Crew/CrewQuantity",
  component: CrewQuantity,
  args: { value: 1, max: 10, label: "Gold", onChange: fn() },
  argTypes: {
    value: { control: { type: "number", min: 1 } },
    max: { control: { type: "number", min: 0 } },
  },
  // Keeps the chosen value so the buttons and input can be tried
  render: function Render({ value, onChange, ...args }) {
    const [current, setCurrent] = useState(value)

    return (
      <CrewQuantity
        {...args}
        value={current}
        onChange={(next) => {
          setCurrent(next)
          onChange(next)
        }}
      />
    )
  },
} satisfies Meta<typeof CrewQuantity>

export default meta
type Story = StoryObj<typeof meta>

export const CrewQuantityStory: Story = { name: "CrewQuantity" }
