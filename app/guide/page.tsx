import Link from "next/link"
import { AiOutlineArrowLeft } from "react-icons/ai"

import GuideContent from "@/components/GuideContent"
import FullscreenLayout from "@/components/layouts/fullscreen"
import PublicGuidePage from "@/components/PublicGuidePage"
import { getLoggedInPlayer } from "@/utils/app/getLoggedInPlayer"

export const metadata = {
  title: "Player Guide",
}

export default async function Page() {
  const player = await getLoggedInPlayer()

  if (!player) return <PublicGuidePage />

  return (
    <FullscreenLayout>
      <div className="relative z-20 mx-auto my-8 flex min-h-screen w-full max-w-3xl flex-col gap-4 lg:gap-8">
        <h1 className="mb-5 text-center font-serif text-5xl lg:text-6xl">
          Player guide
        </h1>

        <Link href="/" className="flex items-center gap-2 self-center text-xl">
          <AiOutlineArrowLeft />
          Back to startpage
        </Link>

        <GuideContent defaultOpen />
      </div>
    </FullscreenLayout>
  )
}
