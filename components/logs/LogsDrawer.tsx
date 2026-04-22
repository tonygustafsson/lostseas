"use client"

import { PiBookOpenTextBold } from "react-icons/pi"

import useDrawer from "@/app/stores/drawer"
import DrawerPanel from "@/components/DrawerPanel"
import { useGetLogs } from "@/hooks/queries/useLogs"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const LogsDrawer = () => {
  const { active: activeDrawer, close: closeDrawer } = useDrawer()
  const isOpen = activeDrawer === "logs"
  const { data: player } = useGetPlayer()

  const { data: logs } = useGetLogs(player?.id, isOpen)

  const sorted = (logs || [])
    .slice()
    .sort((a: any, b: any) => b.timestamp - a.timestamp)

  return (
    <DrawerPanel isOpen={isOpen} onClose={closeDrawer} className="sm:w-lg">
      <h1 className="mb-4 flex items-center gap-2 font-serif text-2xl">
        <PiBookOpenTextBold className="text-yellow-400" />
        Log Book
      </h1>

      {!sorted.length ? (
        <div className="text-muted-foreground">No logs available.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((entry: any, idx: number) => (
            <div
              key={`log-${entry.timestamp}-${idx}`}
              className="rounded-lg bg-neutral-900 p-4 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm">
                  Day {entry.day}
                </div>
                <div className="text-muted-foreground text-xs">
                  {new Date(entry.timestamp).toLocaleString()}
                </div>
              </div>

              <div className="mt-2 text-sm">{entry.message}</div>
            </div>
          ))}
        </div>
      )}
    </DrawerPanel>
  )
}

export default LogsDrawer
