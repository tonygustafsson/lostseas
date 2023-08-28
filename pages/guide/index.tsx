import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"

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

        <div className="relative p-4 lg:p-8">
          <Image
            src="/img/startpage-bg.webp"
            layout="fill"
            objectFit="cover"
            alt="Lost Seas background"
            className="absolute top-0 left-0 opacity-50 z-10"
          />

          <div className="flex flex-col gap-4 lg:gap-8 min-h-screen justify-items-stretch w-full relative z-20">
            <div className="bg-base-300 bg-opacity-70 w-full rounded-lg p-6 lg:p-8">
              <div className="max-w-3xl mx-auto text-lg">
                <h1 className="font-serif mb-5 text-5xl lg:text-6xl text-center">
                  Player guide
                </h1>

                <div className="flex justify-center">
                  <Link
                    href="/"
                    className="flex items-center gap-2 self-center text-xl"
                  >
                    <AiOutlineArrowLeft />
                    Back to startpage
                  </Link>
                </div>

                <GuideContent />
              </div>
            </div>
          </div>
        </div>
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
