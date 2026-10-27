import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import LogsDrawer from "@/components/drawer/drawerContent/Logs"
import type { LogEntry } from "@/firebase/db"

import { player } from "../fixtures"
import PlayerPreview from "../PlayerPreview"

const voyage: [number, LogType, string][] = [
  [1, "beginning", "Created new character Morgan Reed."],
  [1, "trade", "Bought 100 crates of food for 1600 gold."],
  [1, "trade", "Bought 160 barrels of water for 1920 gold."],
  [1, "crew", "Accepted 12 new crew members."],
  [1, "voyage", "Started journey to Havana. Expected arrival in 6 days."],
  [4, "attack", "Attacked a ship from France."],
  [4, "victory", "Won a battle against France; looted 420 gold."],
  [4, "loot", "Took 20 barrels of rum as loot."],
  [7, "voyage", "Arrived at destination Havana."],
  [7, "trade", "Sold 20 barrels of rum for 400 gold."],
  [
    7,
    "bank",
    "Deposited 800 gold into the bank. Current account balance: 1200 gold.",
  ],
  [7, "honour", "Accepted new title Captain from the governor of Havana."],
  [7, "crew", "Tavern action Serve supper for 40 crew members."],
  [8, "cards", "Played cards: bet 50, result loss. Gold change: -50."],
  [8, "voyage", "Started journey to Tortuga. Expected arrival in 4 days."],
  [10, "attack", "Attacked a ship from Pirate."],
  [10, "defeat", "Lost a battle against Pirate; crew health loss 18."],
  [12, "voyage", "Arrived at destination Tortuga."],
  [12, "ship", "Repaired ship Endeavour for 240 gold."],
  [12, "honour", "Handed over Inca mask to the town of Tortuga."],
]

const logs: LogEntry[] = voyage.map(([day, type, message], index) => ({
  day,
  type,
  message,
  timestamp: 1704067200000 + index * 600000,
}))

const meta = {
  title: "game/LogsDrawer",
  component: LogsDrawer,
  parameters: { logs },
  decorators: [
    (Story, context) => (
      <PlayerPreview
        key={context.id}
        data={player}
        logs={context.parameters.logs}
      >
        <div className="max-w-lg">
          <Story />
        </div>
      </PlayerPreview>
    ),
  ],
} satisfies Meta<typeof LogsDrawer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = { parameters: { logs: [] } }

/** Entries saved before log types existed fall back to a quill */
export const Untyped: Story = {
  parameters: { logs: logs.map(({ type: _type, ...entry }) => entry) },
}
