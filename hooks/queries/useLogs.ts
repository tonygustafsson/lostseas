import { useQuery } from "@tanstack/react-query"

export const LOGS_QUERY_KEY = "logs"

const fetchLogsForPlayer = async (playerId?: Player["id"]) => {
  if (!playerId) return []

  const res = await fetch("/api/logs/get", { cache: "no-store" })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(body || `Failed to fetch logs for ${playerId}`)
  }

  return (await res.json()) as any[]
}

export const useGetLogs = (playerId?: Player["id"], enabled = true) =>
  useQuery<any[], Error>({
    queryKey: [LOGS_QUERY_KEY, playerId],
    queryFn: () => fetchLogsForPlayer(playerId),
    enabled: !!playerId && enabled,
    staleTime: 0,
  })

export default useGetLogs
