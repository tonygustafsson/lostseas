import "@/styles/globals.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"

const queryClient = new QueryClient()

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => (
  <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </SessionProvider>
)

export default App
