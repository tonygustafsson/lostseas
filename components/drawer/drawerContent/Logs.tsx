"use client"

import { FaBook } from "react-icons/fa"

import LogBookEntry from "@/components/LogBookEntry"
import { Button } from "@/components/ui/button"
import { useGetLogs } from "@/hooks/queries/useLogs"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getCurrentDate } from "@/utils/date"
import { groupLogsByDay } from "@/utils/logs"

const LogsDrawer = () => {
  const { data: player } = useGetPlayer()

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetLogs(
    player?.id
  )

  const days = groupLogsByDay(
    data?.pages.flatMap(({ entries }) => entries) ?? []
  )

  return (
    <>
      <h1 className="flex items-center gap-2 font-serif text-2xl">
        <FaBook className="text-accent" />
        Log Book
      </h1>

      {player && (
        <p className="text-muted-foreground mb-8 font-serif italic">
          The journal of {player.character.title} {player.character.name}
        </p>
      )}

      {!days.length ? (
        <p className="text-muted-foreground font-serif italic">
          The pages are still blank, Captain.
        </p>
      ) : (
        <div className="flex flex-col gap-8 pb-8">
          {days.map(({ day, entries }) => (
            <section key={day}>
              <header className="border-gold/30 mb-4 flex items-baseline justify-between gap-4 border-b pb-1">
                <h2 className="text-gold font-serif text-lg">
                  {getCurrentDate(day)}
                </h2>

                <span className="text-muted-foreground text-xs tracking-wide uppercase">
                  Day {day}
                </span>
              </header>

              <ol className="border-border ml-4 flex flex-col gap-4 border-l py-1 pl-8">
                {entries.map((entry) => (
                  <LogBookEntry key={entry.id} entry={entry} />
                ))}
              </ol>
            </section>
          ))}

          {hasNextPage && (
            <Button
              variant="outline"
              className="w-full"
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage ? "Loading..." : "Load more"}
            </Button>
          )}
        </div>
      )}
    </>
  )
}

export default LogsDrawer
