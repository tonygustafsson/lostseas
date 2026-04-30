import { useQuery } from "@tanstack/react-query"

import { StatisticsEntry } from "@/firebase/db"

export const STATISTICS_QUERY_KEY = "statistics"

const fetchStatisticsForPlayer = async (playerId?: Player["id"]) => {
  if (!playerId) return []

  const res = await fetch("/api/statistics/get", { cache: "no-store" })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(body || `Failed to fetch statistics for ${playerId}`)
  }

  return (await res.json()) as StatisticsEntry[]
}

export const useGetStatistics = (playerId?: Player["id"], enabled = true) =>
  useQuery({
    queryKey: [STATISTICS_QUERY_KEY, playerId],
    queryFn: () => fetchStatisticsForPlayer(playerId),
    enabled: !!playerId && enabled,
    staleTime: 0,
  })

export default useGetStatistics
