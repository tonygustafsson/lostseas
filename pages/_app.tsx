import "@/styles/globals.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { AppProps } from "next/app"

import Modal from "@/components/ui/Modal"
import { ModalProvider } from "@/components/ui/Modal/context"
import Toast from "@/components/ui/Toast"
import { ToastProvider } from "@/components/ui/Toast/context"

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
    <ToastProvider>
      <ModalProvider>
        <Component {...pageProps} />

        <Toast />
        <Modal />
      </ModalProvider>
    </ToastProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

export default App
