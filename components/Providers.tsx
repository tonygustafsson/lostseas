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
import MotionProvider from "@/components/MotionProvider"
import Sound from "@/components/Sound"
import Toast from "@/components/Toast"
import WelcomeModal from "@/components/WelcomeModal"

import Drawer from "./drawer"

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
          {children}

          <Toast />
          <Modal />
          <Sound />
          <WelcomeModal />
          <Drawer />
        </MotionProvider>

        <ReactQueryDevtools />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
