import "@/styles/globals.css"

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { AppProps } from "next/app"
import Head from "next/head"
import { useState } from "react"

import MotionProvider from "@/components/MotionProvider"
import Sound from "@/components/Sound"
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
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />

        <title>Lost Seas</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <MotionProvider>
            <ToastProvider>
              <ModalProvider>
                <Component {...pageProps} />

                <Toast />
                <Modal />
                <WelcomeModal />
                <Sound />
              </ModalProvider>
            </ToastProvider>
          </MotionProvider>

          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default App
