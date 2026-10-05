import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Anchor, Coins, Ship } from "lucide-react"
import { expect, fn } from "storybook/test"

import ActionCard from "@/components/ActionCard"
import { Button } from "@/components/ui/button"

const onContinue = fn()

const meta = {
  component: ActionCard,
  args: {
    title: "Welcome to the harbor",
    message: "Your crew is ready. Stock up on supplies before setting sail.",
    icon: <Anchor />,
    image: "/img/location/port-royale/harbor.webp",
    actions: (
      <Button variant="highlight" size="lg" onClick={onContinue}>
        Continue
      </Button>
    ),
  },
  argTypes: {
    icon: { control: false },
    actions: { control: false },
  },
} satisfies Meta<typeof ActionCard>

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {}
export const WithoutImage: Story = { args: { image: undefined } }
export const MessageOnly: Story = {
  args: {
    title: undefined,
    icon: undefined,
    image: undefined,
    actions: undefined,
  },
}
export const MultipleActions: Story = {
  args: {
    title: "A ship is waiting",
    icon: <Ship />,
    actions: (
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <Button variant="highlight" size="lg" onClick={fn()}>
          Set sail
        </Button>
        <Button variant="secondary" size="lg" onClick={fn()}>
          Stay in port
        </Button>
      </div>
    ),
  },
}
export const RichMessage: Story = {
  args: {
    title: "A reward awaits",
    icon: <Coins />,
    message: (
      <p>
        The governor offers <strong>500 gold</strong> for your service.
      </p>
    ),
    image: "/img/cards/cityhall/governor-excited.png",
  },
}
export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
}
export const ContinueAction: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Continue" }))
    await expect(onContinue).toHaveBeenCalledOnce()
  },
}
