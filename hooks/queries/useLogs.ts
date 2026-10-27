import { useInfiniteQuery } from "@tanstack/react-query"

import type { LogCursor, LogPage } from "@/firebase/db"

export const LOGS_QUERY_KEY = "logs"

const fetchLogsForPlayer = async (
  playerId?: Player["id"],
  before?: LogCursor
): Promise<LogPage> => {
  if (!playerId) return { entries: [], hasMore: false }

  const params = before
    ? `?${new URLSearchParams({ before: String(before.timestamp), beforeId: before.id })}`
    : ""

  const res = await fetch(`/api/logs/get${params}`, { cache: "no-store" })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(body || `Failed to fetch logs for ${playerId}`)
  }

  return (await res.json()) as LogPage
}

/** The newest page first, then older pages of the same size on demand */
export const useGetLogs = (playerId?: Player["id"], enabled = true) =>
  useInfiniteQuery({
    queryKey: [LOGS_QUERY_KEY, playerId],
    queryFn: ({ pageParam }) => fetchLogsForPlayer(playerId, pageParam),
    initialPageParam: undefined as LogCursor | undefined,
    // Each page is oldest first, so its first entry is where the next one starts
    getNextPageParam: ({ entries, hasMore }): LogCursor | undefined => {
      const oldest = entries[0]

      return hasMore && oldest
        ? { timestamp: oldest.timestamp, id: oldest.id }
        : undefined
    },
    enabled: !!playerId && enabled,
    staleTime: 0,
  })

export default useGetLogs
