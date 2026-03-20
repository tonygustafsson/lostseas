"use client"

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React, { useState } from "react"

import MotionProvider from "@/components/MotionProvider"
import Sound from "@/components/Sound"
import { SoundProvider } from "@/components/Sound/context"
import Modal from "@/components/ui/Modal"
import { ModalProvider } from "@/components/ui/Modal/context"
import Toast from "@/components/ui/Toast"
import { ToastProvider } from "@/components/ui/Toast/context"
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
