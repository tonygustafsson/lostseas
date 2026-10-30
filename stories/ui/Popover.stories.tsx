import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

type Args = React.ComponentProps<typeof Popover> &
  Pick<
    React.ComponentProps<typeof PopoverContent>,
    "side" | "align" | "sideOffset"
  > & {
    title: string
    description: string
  }

const meta = {
  component: Popover,
  args: {
    defaultOpen: false,
    modal: false,
    side: "bottom",
    align: "center",
    sideOffset: 4,
    title: "Mateo Salazar",
    description:
      "Raised among the forts of the coast, he still believes his fortune waits in the next port.",
  },
  argTypes: {
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
    },
    align: { control: "inline-radio", options: ["start", "center", "end"] },
    sideOffset: { control: { type: "number", min: 0 } },
    open: { control: "boolean" },
  },
  render: ({ side, align, sideOffset, title, description, ...args }) => (
    <div className="flex min-h-64 items-center justify-center">
      <Popover {...args}>
        <PopoverTrigger asChild>
          <Button variant="outline">Character details</Button>
        </PopoverTrigger>

        <PopoverContent side={side} align={align} sideOffset={sideOffset}>
          <PopoverHeader>
            <PopoverTitle>{title}</PopoverTitle>
            <PopoverDescription>{description}</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Open: Story = { args: { defaultOpen: true } }

export const Top: Story = { args: { defaultOpen: true, side: "top" } }

export const Click: Story = {
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Character details" })
    )
    await expect(
      await within(canvasElement.ownerDocument.body).findByText(args.title!)
    ).toBeVisible()
  },
}
