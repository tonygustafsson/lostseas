import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

import type { LogEntry, StatisticsEntry } from "@/firebase/db"
import { LOGS_QUERY_KEY } from "@/hooks/queries/useLogs"
import { PLAYER_QUERY_KEY } from "@/hooks/queries/usePlayer"
import { STATISTICS_QUERY_KEY } from "@/hooks/queries/useStatistics"

type Props = {
  data: Player
  statistics?: StatisticsEntry[]
  logs?: LogEntry[]
  children: ReactNode
}

const PlayerPreview = ({ data, statistics, logs, children }: Props) => {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    })
    client.setQueryData([PLAYER_QUERY_KEY], data)
    if (statistics) {
      client.setQueryData([STATISTICS_QUERY_KEY, data.id], statistics)
    }
    if (logs) {
      client.setQueryData([LOGS_QUERY_KEY, data.id], logs)
    }
    return client
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default PlayerPreview
