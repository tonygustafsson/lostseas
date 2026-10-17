"use client"

import Image from "next/image"

import useModal from "@/app/stores/modals"

const SCREENSHOTS = [
  { id: "harbor", title: "Harbor", alt: "The harbor of Curacao" },
  { id: "map", title: "Map", alt: "Picking a destination on the map" },
  { id: "battle-won", title: "Battle won", alt: "The spoils of a won battle" },
  {
    id: "tavern",
    title: "Tavern",
    alt: "Buying supper and drinks at the tavern",
  },
  { id: "shipyard", title: "Shipyard", alt: "Buying ships at the shipyard" },
  { id: "market", title: "Market", alt: "Trading goods at the market" },
  { id: "crew", title: "Crew & fleet", alt: "Overview of ships and crew" },
  { id: "status", title: "Status", alt: "The character status" },
] as const

const BUTTON_CLASS_NAME =
  "group cursor-pointer overflow-hidden rounded-xl border border-border bg-black/30 transition hover:-translate-y-0.5 hover:border-amber-200/50 hover:shadow-lg hover:shadow-black/30 focus-visible:ring-2 focus-visible:ring-amber-200"
const IMAGE_CLASS_NAME =
  "aspect-[200/137] w-full object-cover transition duration-300 group-hover:scale-[1.03]"

const Screenshots = () => {
  const { setModal } = useModal()

  const imageZoom = ({ id, title, alt }: (typeof SCREENSHOTS)[number]) => {
    setModal({
      id: "screenshot",
      title,
      fullWidth: true,
      content: (
        <div className="-mx-6 flex h-full flex-col justify-center md:mx-0">
          <Image
            src={`/img/screenshots/${id}.png`}
            width={1700}
            height={1162}
            sizes="(max-width: 767px) 1280px, 95vw"
            alt={alt}
            className="h-auto w-full rounded-lg md:max-h-[calc(95vh-13rem)] md:object-contain"
          />
        </div>
      ),
    })
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {SCREENSHOTS.map((screenshot) => (
        <button
          key={screenshot.id}
          type="button"
          aria-label={`View ${screenshot.title.toLowerCase()} screenshot`}
          className={BUTTON_CLASS_NAME}
          onClick={() => imageZoom(screenshot)}
        >
          <Image
            width={200}
            height={137}
            src={`/img/screenshots/${screenshot.id}.png`}
            alt={screenshot.alt}
            className={IMAGE_CLASS_NAME}
          />
        </button>
      ))}
    </div>
  )
}

export default Screenshots
