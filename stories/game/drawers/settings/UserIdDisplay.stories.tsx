import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import UserIdDisplay from "@/components/settings/UserIdDisplay"

const meta = {
  title: "game/Drawers/Settings/UserIdDisplay",
  component: UserIdDisplay,
  args: { playerId: "3f9c2a1e-7b4d-4c8e-9a52-1d6e0b8f7c34" },
  argTypes: { playerId: { control: "text" } },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserIdDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const UserIdDisplayStory: Story = { name: "UserIdDisplay" }
