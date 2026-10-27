import type { LogEntry } from "@/firebase/db"

/** Entries grouped by game day, newest day and newest entry first */
export const groupLogsByDay = (logs: LogEntry[]) => {
  const newestFirst = [...logs].sort((a, b) => b.timestamp - a.timestamp)

  return newestFirst.reduce<{ day: number; entries: LogEntry[] }[]>(
    (days, entry) => {
      const current = days.at(-1)

      if (current?.day === entry.day) {
        current.entries.push(entry)
      } else {
        days.push({ day: entry.day, entries: [entry] })
      }

      return days
    },
    []
  )
}
