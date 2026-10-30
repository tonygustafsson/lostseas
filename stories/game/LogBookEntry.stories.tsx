import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import LogBookEntry from "@/components/LogBookEntry"

const types: LogType[] = [
  "beginning",
  "victory",
  "defeat",
  "honour",
  "loot",
  "attack",
  "voyage",
  "bank",
  "trade",
  "ship",
  "crew",
  "cards",
]

const entry = {
  timestamp: 1704067200000,
  day: 4,
  type: "victory",
  message: "Won a battle against France; looted 420 gold.",
} satisfies Parameters<typeof LogBookEntry>[0]["entry"]

const meta = {
  component: LogBookEntry,
  args: { entry },
  decorators: [
    (Story) => (
      // Same timeline rail as the Log book, which leaves room for the icon
      <ol className="border-border ml-4 flex max-w-lg flex-col gap-4 border-l py-1 pl-8">
        <Story />
      </ol>
    ),
  ],
} satisfies Meta<typeof LogBookEntry>

export default meta
type Story = StoryObj<typeof meta>

export const Notable: Story = {}

export const Routine: Story = {
  args: {
    entry: {
      ...entry,
      type: "trade",
      message: "Bought 100 crates of food for 1600 gold.",
    },
  },
}

// Entries saved before log types existed fall back to a quill
export const Untyped: Story = {
  args: {
    entry: { ...entry, type: undefined, message: "Arrived at Havana." },
  },
}

export const AllTypes: Story = {
  render: (args) => (
    <>
      {types.map((type) => (
        <LogBookEntry
          key={type}
          entry={{ ...args.entry, type, message: `A ${type} entry.` }}
        />
      ))}
    </>
  ),
}
