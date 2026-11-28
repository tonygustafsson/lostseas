import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FaCoins } from "react-icons/fa"

import CrewAction, { CrewActionChange } from "@/components/crew/CrewAction"
import { Button } from "@/components/ui/button"

type Args = {
  title: string
  owned: string
  description: string
  label: string
  from: number
  to: number
  max: number
  suffix: string
}

/** The change bar takes its own props, so they are controls here too */
const CrewActionPreview = ({ label, from, to, max, suffix, ...rest }: Args) => (
  <CrewAction
    icon={<FaCoins />}
    change={
      <CrewActionChange
        label={label}
        from={from}
        to={to}
        max={max}
        suffix={suffix}
      />
    }
    {...rest}
  >
    <span className="text-sm">Amount</span>

    <Button size="sm" variant="secondary">
      Give
    </Button>
  </CrewAction>
)

const meta = {
  title: "game/Crew/CrewAction",
  component: CrewActionPreview,
  args: {
    title: "Gold",
    owned: "2 500",
    description: "Lifts the mood of your crew. A larger crew needs more gold.",
    label: "Mood",
    from: 40,
    to: 65,
    max: 100,
    suffix: "%",
  },
  argTypes: {
    from: { control: { type: "number", min: 0 } },
    to: { control: { type: "number", min: 0 } },
    max: { control: { type: "number", min: 0 } },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CrewActionPreview>

export default meta
type Story = StoryObj<typeof meta>

export const CrewActionStory: Story = { name: "CrewAction" }
