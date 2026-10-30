import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import useDrawer, { type DrawerId } from "@/app/stores/drawer"
import MenuCard, { MenuCardChevron } from "@/components/menu/MenuCard"
import { CardContent, CardHeader } from "@/components/ui/card"

const drawers: DrawerId[] = [
  "inventory",
  "status",
  "fleet",
  "settings",
  "guide",
  "advisor",
  "logs",
  "manageCrew",
]

const contents = {
  "Header and chevron": (
    <>
      <CardHeader className="flex items-center gap-2 px-2 font-serif text-lg">
        <span className="flex-1">Fleet</span>
        <MenuCardChevron />
      </CardHeader>

      <CardContent className="text-muted-foreground px-2 text-sm">
        1 ship, 40 crew members
      </CardContent>
    </>
  ),
  "Plain text": <p className="px-2 text-sm">Open the log book</p>,
}

const meta = {
  title: "game/Menu/MenuCard",
  component: MenuCard,
  args: {
    ariaLabel: "Open fleet details",
    drawerId: "fleet",
    children: "Header and chevron",
  },
  argTypes: {
    drawerId: { control: "select", options: drawers },
    children: {
      control: "select",
      options: Object.keys(contents),
      mapping: contents,
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MenuCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const PlainText: Story = {
  args: {
    ariaLabel: "Open the log book",
    drawerId: "logs",
    children: "Plain text",
  },
}

export const OpensDrawer: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: args.ariaLabel }))
    await expect(useDrawer.getState().active).toBe(args.drawerId)
  },
}

export const OpensWithKeyboard: Story = {
  play: async ({ args, canvas, userEvent }) => {
    canvas.getByRole("button", { name: args.ariaLabel }).focus()
    await userEvent.keyboard("{Enter}")
    await expect(useDrawer.getState().active).toBe(args.drawerId)
  },
}
