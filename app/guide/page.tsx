import Link from "next/link"
import { AiOutlineArrowLeft } from "react-icons/ai"

import GuideContent from "@/components/GuideContent"
import FullscreenLayout from "@/components/layouts/fullscreen"

export const metadata = {
  title: "Player Guide",
}

export default async function Page() {
  return (
    <FullscreenLayout>
      <div className="relative z-20 mx-auto my-8 flex min-h-screen w-full max-w-3xl flex-col justify-items-stretch gap-4 lg:gap-8">
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

        <GuideContent defaultOpen />
      </div>
    </FullscreenLayout>
  )
}
