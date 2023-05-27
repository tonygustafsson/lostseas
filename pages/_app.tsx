import "@/styles/globals.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { AppProps } from "next/app"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 60000,
    },
  },
})

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

export default App
