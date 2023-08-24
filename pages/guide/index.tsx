import Head from "next/head"
import React from "react"

import GuideContent from "@/components/GuideContent"
import DefaultLayout from "@/components/layouts/default"
import FullscreenLayout from "@/components/layouts/fullscreen"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Guide = () => {
  const { data: player } = useGetPlayer()

  if (!player) {
    return (
      <FullscreenLayout>
        <Head>
          <title>Lost Seas</title>
        </Head>
        <h1 className="text-4xl font-serif">Player guide</h1>
        <GuideContent />
      </FullscreenLayout>
    )
  }

  return (
    <DefaultLayout>
      <h1 className="text-4xl font-serif">Player guide</h1>

      <GuideContent />
    </DefaultLayout>
  )
}

export default Guide
