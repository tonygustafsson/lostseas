import "@/styles/globals.css"

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { AppProps } from "next/app"
import { useState } from "react"

import Modal from "@/components/ui/Modal"
import { ModalProvider } from "@/components/ui/Modal/context"
import Toast from "@/components/ui/Toast"
import { ToastProvider } from "@/components/ui/Toast/context"

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 60000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ToastProvider>
          <ModalProvider>
            <Component {...pageProps} />

            <Toast />
            <Modal />
          </ModalProvider>
        </ToastProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
