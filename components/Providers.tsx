"use client"

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React, { useState } from "react"

import Modal from "@/components/Modal"
import { ModalProvider } from "@/components/Modal/context"
import MotionProvider from "@/components/MotionProvider"
import Sound from "@/components/Sound"
import { SoundProvider } from "@/components/Sound/context"
import Toast from "@/components/Toast"
import { ToastProvider } from "@/components/Toast/context"
import WelcomeModal from "@/components/WelcomeModal"

type Props = {
  children: React.ReactNode
  dehydratedState?: DehydratedState
}

export default function Providers({ children, dehydratedState }: Props) {
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
      <HydrationBoundary state={dehydratedState}>
        <MotionProvider>
          <ToastProvider>
            <ModalProvider>
              <SoundProvider>
                {children}

                <Toast />
                <Modal />
                <WelcomeModal />
                <Sound />
              </SoundProvider>
            </ModalProvider>
          </ToastProvider>
        </MotionProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
