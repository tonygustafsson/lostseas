import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GiShoonerSailboat } from "react-icons/gi"
import { fn } from "storybook/test"

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
  title: "components/DrawerPanel",
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
