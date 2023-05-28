import "@/styles/globals.css"

import { ThemeProvider } from "@material-tailwind/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { AppProps } from "next/app"

import MaterialTailwindConfig from "../material-tailwind.config"

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
    <ThemeProvider value={MaterialTailwindConfig}>
      <Component {...pageProps} />
    </ThemeProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

export default App
