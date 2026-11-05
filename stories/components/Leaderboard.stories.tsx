import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import Leaderboard from "@/components/Leaderboard"
import type { LeaderboardEntry } from "@/firebase/db"

const entries: LeaderboardEntry[] = [
  {
    name: "Mateo Salazar",
    characterId: "mateo-salazar",
    title: "Duke",
    nationality: "Spain",
    score: 1240,
    day: 412,
  },
  {
    name: "Silas Harrow",
    characterId: "silas-harrow",
    title: "Marquis",
    nationality: "England",
    score: 860,
    day: 301,
  },
  {
    name: "Noor Visser",
    characterId: "noor-visser",
    title: "Colonel",
    nationality: "Holland",
    score: 512,
    day: 188,
  },
  {
    name: "Kofi Bellamy",
    characterId: "kofi-bellamy",
    title: "Captain",
    nationality: "France",
    score: 140,
    day: 42,
  },
  {
    name: "Captain Bartholomew Montgomery Fitzwilliam the Third",
    characterId: "unknown",
    title: "Pirate",
    nationality: "France",
    score: 3,
    day: 2,
  },
]

const meta = {
  component: Leaderboard,
  args: { entries },
} satisfies Meta<typeof Leaderboard>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

// A full board of ten, with the second column filled from 6 down
export const FullBoard: Story = {
  args: {
    entries: [...entries, ...entries].map((entry, index) => ({
      ...entry,
      score: 1500 - index * 120,
    })),
  },
}

export const SingleCaptain: Story = { args: { entries: [entries[0]] } }

export const Empty: Story = { args: { entries: [] } }
