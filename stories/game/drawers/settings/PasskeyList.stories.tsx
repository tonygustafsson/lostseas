import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import PasskeyList from "@/components/settings/PasskeyList"
import { PASSKEYS_QUERY_KEY } from "@/hooks/queries/usePasskeys"

import { player } from "../../../fixtures"

type Args = { passkeyCount: number }

const DAY = 86400000

const meta = {
  title: "game/Drawers/Settings/PasskeyList",
  component: PasskeyList,
  args: { passkeyCount: 2 },
  argTypes: { passkeyCount: { control: { type: "number", min: 0, max: 5 } } },
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
          deviceType: i % 2 ? "singleDevice" : "multiDevice",
          backedUp: i % 2 === 0,
          createdAt: 1704067200000 + i * DAY,
          lastUsedAt: i === 0 ? undefined : 1704067200000 + i * 2 * DAY,
        })),
      })

      return (
        <QueryClientProvider client={client}>
          <div className="max-w-xl">
            <Story />
          </div>
        </QueryClientProvider>
      )
    },
  ],
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const PasskeyListStory: Story = { name: "PasskeyList" }
