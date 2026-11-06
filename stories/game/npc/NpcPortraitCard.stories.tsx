import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import NpcPortraitCard from "@/components/npc/NpcPortraitCard"
import { Button } from "@/components/ui/button"
import { getNpcAt } from "@/constants/npcs"

const governor = getNpcAt("Havana", "governor")

const meta = {
  title: "game/Townsfolk/NpcPortraitCard",
  component: NpcPortraitCard,
  args: {
    npc: governor,
    title: `Governor ${governor.name}`,
    children: <p>Welcome captain Morgan Reed.</p>,
    actions: <Button variant="secondary">Talk</Button>,
  },
  argTypes: {
    children: { control: false },
    actions: { control: false },
    footer: { control: false },
  },
} satisfies Meta<typeof NpcPortraitCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** The governor shows who they are below the actions */
export const WithFooter: Story = {
  args: { footer: <p>{governor.description}</p> },
}
