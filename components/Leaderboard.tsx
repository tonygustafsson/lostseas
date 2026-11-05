import Image from "next/image"

import { getCharacterById } from "@/constants/characters"
import type { LeaderboardEntry } from "@/firebase/db"

import Flag from "./icons/Flag"

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
      {entries.map((entry, index) => {
        const image = getCharacterById(entry.characterId)?.image

        return (
          <li
            key={`${entry.name}-${index}`}
            className="bg-card/80 border-border flex min-w-0 items-center gap-2 rounded-2xl border p-2 pr-4 backdrop-blur sm:gap-4"
          >
            <span className="text-muted-foreground w-6 shrink-0 text-center font-serif text-lg">
              {index + 1}
            </span>

            <span className="bg-muted relative size-12 shrink-0 overflow-hidden rounded-xl">
              {image && (
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              )}
            </span>

            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-parchment truncate font-serif text-lg">
                {entry.name}
              </span>

              <span className="text-muted-foreground flex items-center gap-2 text-sm">
                <Flag
                  nation={entry.nationality}
                  size={16}
                  decorative
                  className="shrink-0"
                />
                <span className="truncate">
                  {entry.title} of {entry.nationality}
                  <span className="hidden sm:inline"> · Day {entry.day}</span>
                </span>
              </span>
            </span>

            <span className="text-gold shrink-0 font-semibold tabular-nums">
              {entry.score}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export default Leaderboard
