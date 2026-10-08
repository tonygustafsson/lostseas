import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

import ShowLocation from "@/components/game-ui/ShowLocation"

const JourneyArrivalCheck = () => {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: false } } })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ShowLocation />
    </QueryClientProvider>
  )
}

export default { title: "game/JourneyArrivalCheck" }
export const FinalDay = { render: () => <JourneyArrivalCheck /> }
