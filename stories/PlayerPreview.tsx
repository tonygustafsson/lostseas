import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

import { PLAYER_QUERY_KEY } from "@/hooks/queries/usePlayer"

type Props = {
  data: Player
  children: ReactNode
}

const PlayerPreview = ({ data, children }: Props) => {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    })
    client.setQueryData([PLAYER_QUERY_KEY], data)
    return client
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default PlayerPreview
