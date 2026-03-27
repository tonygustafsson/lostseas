import Image from "next/image"
import Link from "next/link"
import { AiOutlineArrowLeft } from "react-icons/ai"

import GuideContent from "@/components/GuideContent"
import DefaultLayout from "@/components/layouts/default"
import FullscreenLayout from "@/components/layouts/fullscreen"
import { getLoggedInPlayer } from "@/utils/app/getLoggedInPlayer"

export const metadata = {
  title: "Player Guide",
}

export default async function Page() {
  const player = await getLoggedInPlayer()

  if (!player) {
    return (
      <FullscreenLayout>
        <div className="relative p-4 lg:p-8">
          <Image
            src="/img/startpage-bg.webp"
            fill
            alt="Lost Seas background"
            className="absolute top-0 left-0 z-10 object-cover opacity-50"
          />

          <div className="relative z-20 flex min-h-screen w-full flex-col justify-items-stretch gap-4 lg:gap-8">
            <div className="w-full rounded-lg bg-gray-900/70 p-6 lg:p-8">
              <div className="mx-auto max-w-3xl text-lg">
                <h1 className="mb-5 text-center font-serif text-5xl lg:text-6xl">
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
      <h1 className="font-serif text-4xl">Player guide</h1>

      <GuideContent />
    </DefaultLayout>
  )
}
