import type { LeaderboardEntry } from "@/firebase/db"

import LeaderboardItem from "./LeaderboardItem"

type Props = {
  entries: LeaderboardEntry[]
}

const Leaderboard = ({ entries }: Props) => {
  if (!entries.length) {
    return null
  }

  return (
    // Fills top to bottom, so 1-5 sit in the first column and 6-10 in the second
    <ol className="grid gap-2 md:auto-cols-fr md:grid-flow-col md:grid-rows-5">
      {entries.map((entry, index) => (
        <LeaderboardItem
          key={`${entry.name}-${index}`}
          entry={entry}
          rank={index + 1}
        />
      ))}
    </ol>
  )
}

export default Leaderboard
