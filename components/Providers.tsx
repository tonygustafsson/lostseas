"use client"

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React, { useState } from "react"

import AdvisorDrawer from "@/components/advisor/AdvisorDrawer"
import FleetDrawer from "@/components/fleet/FleetDrawer"
import GuideDrawer from "@/components/guide/GuideDrawer"
import InventoryDrawer from "@/components/inventory/InventoryDrawer"
import Modal from "@/components/Modal"
import MotionProvider from "@/components/MotionProvider"
import SettingsDrawer from "@/components/settings/SettingsDrawer"
import Sound from "@/components/Sound"
import StatusDrawer from "@/components/status/StatusDrawer"
import Toast from "@/components/Toast"
import WelcomeModal from "@/components/WelcomeModal"

import LogsDrawer from "./logs/LogsDrawer"

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
          <InventoryDrawer />
          <StatusDrawer />
          <FleetDrawer />
          <SettingsDrawer />
          <GuideDrawer />
          <AdvisorDrawer />
          <LogsDrawer />
          <WelcomeModal />
          <Sound />
        </MotionProvider>

        <ReactQueryDevtools />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
