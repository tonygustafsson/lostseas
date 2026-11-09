import Image from "next/image"
import type { ReactNode } from "react"

import { getGuideChapter, type GuideChapterId } from "./chapters"

type Props = {
  id: GuideChapterId
  lead: ReactNode
  image?: { src: string; alt: string }
  children: ReactNode
}

const GuideChapter = ({ id, lead, image, children }: Props) => {
  const { title, icon: Icon } = getGuideChapter(id)

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-card/85 border-border scroll-mt-16 overflow-hidden rounded-3xl border backdrop-blur-xl lg:scroll-mt-8"
    >
      {image && (
        <div className="relative aspect-[2.4]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={id === "welcome"}
            sizes="(min-width: 1024px) 48rem, 100vw"
            className="object-cover"
          />
          <div className="from-card absolute inset-0 bg-linear-to-t to-transparent to-60%" />
        </div>
      )}

      <div className="p-6 sm:p-8">
        <h2
          id={`${id}-title`}
          className="text-parchment flex items-center gap-4 font-serif text-2xl sm:text-4xl"
        >
          <span className="border-gold/20 bg-gold/10 text-gold-light flex size-8 shrink-0 items-center justify-center rounded-xl border sm:size-10">
            <Icon className="size-4 sm:size-5" aria-hidden="true" />
          </span>
          {title}
        </h2>

        <p className="text-foreground mt-4 font-serif text-lg leading-7 italic sm:text-xl sm:leading-8">
          {lead}
        </p>

        <div className="text-foreground/85 [&_h3]:text-parchment [&_li]:marker:text-gold [&_strong]:text-parchment mt-6 flex flex-col gap-4 text-base leading-7 sm:text-lg sm:leading-8 [&_h3]:pt-4 [&_h3]:font-serif [&_h3]:text-xl sm:[&_h3]:text-2xl [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </section>
  )
}

export default GuideChapter
