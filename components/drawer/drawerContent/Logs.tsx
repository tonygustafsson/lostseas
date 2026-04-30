"use client"

import { FaBook } from "react-icons/fa"

import { useGetLogs } from "@/hooks/queries/useLogs"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { toDateTime } from "@/utils/date"

const LogsDrawer = () => {
  const { data: player } = useGetPlayer()

  const { data: logs } = useGetLogs(player?.id)

  return (
    <>
      <h1 className="mb-4 flex items-center gap-2 font-serif text-2xl">
        <FaBook className="text-yellow-400" />
        Log Book
      </h1>

      {!logs?.length ? (
        <div className="text-muted-foreground">No logs available.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {logs.map((entry: any, idx: number) => (
            <div
              key={`log-${entry.timestamp}-${idx}`}
              className="rounded-lg bg-neutral-900 p-4 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm">
                  Day {entry.day}
                </div>
                <div className="text-muted-foreground text-xs">
                  {toDateTime(new Date(entry.timestamp))}
                </div>
              </div>

              <div className="mt-2 text-sm">{entry.message}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default LogsDrawer
