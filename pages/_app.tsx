import "@/styles/globals.css"

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { AppProps } from "next/app"
import { useState } from "react"

import MotionProvider from "@/components/MotionProvider"
import Sound from "@/components/Sound"
import { SoundProvider } from "@/components/Sound/context"
import Modal from "@/components/ui/Modal"
import { ModalProvider } from "@/components/ui/Modal/context"
import Toast from "@/components/ui/Toast"
import { ToastProvider } from "@/components/ui/Toast/context"
import WelcomeModal from "@/components/WelcomeModal"

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: true,
            staleTime: 60000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MotionProvider>
          <ToastProvider>
            <ModalProvider>
              <SoundProvider>
                <Component {...pageProps} />

                <Toast />
                <Modal />
                <WelcomeModal />
                <Sound />
              </SoundProvider>
            </ModalProvider>
          </ToastProvider>
        </MotionProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
