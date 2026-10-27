import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

import type { StatisticsEntry } from "@/firebase/db"
import { PLAYER_QUERY_KEY } from "@/hooks/queries/usePlayer"
import { STATISTICS_QUERY_KEY } from "@/hooks/queries/useStatistics"

type Props = {
  data: Player
  /** Statistics history for the charts */
  statistics?: StatisticsEntry[]
  children: ReactNode
}

const PlayerPreview = ({ data, statistics, children }: Props) => {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    })
    client.setQueryData([PLAYER_QUERY_KEY], data)
    if (statistics) {
      client.setQueryData([STATISTICS_QUERY_KEY, data.id], statistics)
    }
    return client
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default PlayerPreview
