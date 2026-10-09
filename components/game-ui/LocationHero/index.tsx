import { useAnimate } from "framer-motion"
import Image from "next/image"

import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { cn } from "@/lib/utils"
import { getLocationBackground } from "@/utils/location"

import TownActions from "./TownActions"
import TownContent from "./TownContent"

const LocationHero = () => {
  const { data: player } = useGetPlayer()
  const [scope, animate] = useAnimate()

  const onImageLoad = () => {
    animate(
      "img",
      { objectPosition: "50% 50%", filter: "sepia(0)" },
      { objectPosition: { duration: 1 }, filter: { duration: 2 } }
    )
  }

  if (!player || player.character.location === "Sea") return null

  return (
    <>
      <div
        key={`${player.character.town}-${player.character.location}`}
        className={cn(
          "relative grid min-h-88 place-items-center overflow-hidden rounded-b-none border bg-slate-950 shadow-2xl lg:max-h-125"
        )}
      >
        <div className="absolute inset-0" ref={scope}>
          <Image
            src={getLocationBackground(
              player.character.town,
              player.character.location
            )}
            unoptimized
            fill
            priority
            loading="eager"
            draggable={false}
            onLoad={onImageLoad}
            alt="Background image"
            className="object-cover opacity-80 select-none"
            style={{ objectPosition: "50% 55%", filter: "sepia(1)" }}
          />
        </div>

        <div className="z-20 flex w-full items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-10 lg:py-20">
          <div className="border-border w-full max-w-3xl rounded-[2rem] border bg-black/55 px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-[2px] sm:px-8 lg:min-w-[600px] lg:px-14 lg:py-12">
            <TownContent
              town={player.character.town}
              location={player.character.location}
            />
          </div>
        </div>
      </div>

      <div className="bg-card border-t-0] rounded-b-xl border border-t-0">
        <TownActions location={player.character.location} />
      </div>
    </>
  )
}

export default LocationHero
