import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { GiShoonerSailboat } from "react-icons/gi"
import { expect, fn, waitFor } from "storybook/test"

import DrawerPanel from "@/components/DrawerPanel"

const Content = ({ lines }: { lines: number }) => (
  <>
    <h1 className="mb-6 flex items-center gap-2 font-serif text-2xl">
      <GiShoonerSailboat className="text-gold" />
      Crew & Fleet
    </h1>

    <div className="flex flex-col gap-4">
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="bg-card rounded-xl border p-4">
          Card {i + 1}
        </div>
      ))}
    </div>
  </>
)

const meta = {
  title: "game/Menu/DrawerPanel",
  component: DrawerPanel,
  parameters: { layout: "fullscreen" },
  args: {
    isOpen: true,
    className: "sm:w-lg",
    onClose: fn(),
    children: <Content lines={4} />,
  },
  argTypes: {
    isOpen: { control: "boolean" },
    className: { control: "text" },
  },
} satisfies Meta<typeof DrawerPanel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Scrolls inside the drawer, the close button stays in view */
export const LongContent: Story = {
  args: { children: <Content lines={30} /> },
}

/** A new id slides the open drawer out first, then the next one in */
export const Switching: Story = {
  render: (args) => {
    const [id, setId] = useState("fleet")

    return (
      <DrawerPanel {...args} id={id}>
        <h1 className="mb-6 font-serif text-2xl">{id}</h1>

        <div className="flex gap-2">
          <button onClick={() => setId("fleet")}>Fleet</button>
          <button onClick={() => setId("logs")}>Logs</button>
        </div>
      </DrawerPanel>
    )
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(await canvas.findByRole("button", { name: "Logs" }))

    // The new drawer is still fading in when it first appears
    await waitFor(async () =>
      expect(await canvas.findByRole("heading", { name: "logs" })).toBeVisible()
    )
  },
}

export const Closes: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
      <DrawerPanel
        {...args}
        isOpen={isOpen}
        onClose={() => {
          args.onClose()
          setIsOpen(false)
        }}
      />
    )
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(await canvas.findByRole("button", { name: "Close" }))

    await expect(args.onClose).toHaveBeenCalled()
  },
}
