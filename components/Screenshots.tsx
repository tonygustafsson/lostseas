"use client"

import Image from "next/image"

import useModal from "@/app/stores/modals"
import { capitalize } from "@/utils/string"

const SCREENSHOTS = [
  { id: "harbor", alt: "Screenshot of the harbor" },
  { id: "map", alt: "Screenshot of the map" },
  { id: "status", alt: "Screenshot of the status" },
  { id: "crew", alt: "Screenshot of the crew members" },
  { id: "battle", alt: "Screenshot of a ship encounter" },
  { id: "battle-won", alt: "Screenshot of a battle won" },
  { id: "inventory", alt: "Screenshot of the inventory" },
  { id: "shop", alt: "Screenshot of the shop" },
] as const

const BUTTON_CLASS_NAME =
  "group overflow-hidden rounded-xl border border-white/10 bg-black/30 transition hover:-translate-y-0.5 hover:border-amber-200/50 hover:shadow-lg hover:shadow-black/30 focus-visible:ring-2 focus-visible:ring-amber-200"
const IMAGE_CLASS_NAME =
  "aspect-[200/137] w-full object-cover transition duration-300 group-hover:scale-[1.03]"

const Screenshots = () => {
  const { setModal } = useModal()

  const imageZoom = (imgId: string) => {
    setModal({
      id: "screenshot",
      title: capitalize(imgId),
      fullWidth: true,
      content: (
        <div className="min-h-screen overflow-auto">
          <Image
            src={`/img/screenshots/${imgId}.png`}
            width={1700}
            height={1162}
            alt={`Screenshot of ${imgId}`}
            className="max-w-none object-cover"
          />
        </div>
      ),
    })
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {SCREENSHOTS.map(({ id, alt }) => (
        <button
          key={id}
          type="button"
          aria-label={`View ${id.replaceAll("-", " ")} screenshot`}
          className={BUTTON_CLASS_NAME}
          onClick={() => imageZoom(id)}
        >
          <Image
            width={200}
            height={137}
            src={`/img/screenshots/${id}.png`}
            alt={alt}
            className={IMAGE_CLASS_NAME}
          />
        </button>
      ))}
    </div>
  )
}

export default Screenshots
