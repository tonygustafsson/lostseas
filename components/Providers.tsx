"use client"

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { usePathname } from "next/navigation"
import React, { useState } from "react"

import Modal from "@/components/Modal"
import MotionProvider from "@/components/MotionProvider"
import ServiceWorker from "@/components/ServiceWorker"
import Sound from "@/components/Sound"
import Toast from "@/components/Toast"
import { TooltipProvider } from "@/components/ui/tooltip"
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

  // The guide often opens in a tab next to the game, so it stays silent
  const isGuide = usePathname() === "/guide"

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <MotionProvider>
          <TooltipProvider>
            {children}

            <Toast />
            <Modal />
            {!isGuide && <Sound />}
            <WelcomeModal />
            <Drawer />
          </TooltipProvider>
        </MotionProvider>

        <ServiceWorker />
        <ReactQueryDevtools />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
