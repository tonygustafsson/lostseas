import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ComponentProps } from "react"

import AddPasskeyButton from "@/components/settings/AddPasskeyButton"
import { PASSKEYS_QUERY_KEY } from "@/hooks/queries/usePasskeys"

import { player } from "../../../fixtures"
import PlayerPreview from "../../../PlayerPreview"

type Args = ComponentProps<typeof AddPasskeyButton> & { passkeyCount: number }

const meta = {
  title: "game/Drawers/Settings/AddPasskeyButton",
  component: AddPasskeyButton,
  args: { variant: "default", size: "default", className: "", passkeyCount: 0 },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: { control: "select", options: ["default", "xs", "sm", "lg"] },
    passkeyCount: { control: { type: "number", min: 0, max: 5 } },
  },
  decorators: [
    (Story, { args }) => {
      const { passkeyCount } = args as Args
      const client = new QueryClient({
        defaultOptions: { queries: { retry: false, staleTime: Infinity } },
      })

      client.setQueryData([PASSKEYS_QUERY_KEY], {
        rpID: "localhost",
        userID: player.id,
        passkeys: Array.from({ length: passkeyCount }, (_, i) => ({
          id: `passkey-${i}`,
          deviceType: "multiDevice",
          backedUp: true,
          createdAt: 1704067200000,
        })),
      })

      return (
        <PlayerPreview data={player}>
          <QueryClientProvider client={client}>
            <div className="flex max-w-xl flex-wrap gap-2">
              <Story />
            </div>
          </QueryClientProvider>
        </PlayerPreview>
      )
    },
  ],
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const AddPasskeyButtonStory: Story = { name: "AddPasskeyButton" }
