import { useAnimate } from "framer-motion"
import Image from "next/image"

import { getLocationBackground } from "@/utils/location"

import TownActions from "./TownActions"
import TownContent from "./TownContent"

type Props = {
  town: Character["town"] | undefined
  location: Character["location"] | undefined
}

const TownHero = ({ town, location }: Props) => {
  const [scope, animate] = useAnimate()

  const onImageLoad = () => {
    animate(
      "img",
      { objectPosition: "50% 50%", filter: "sepia(0)" },
      { objectPosition: { duration: 1 }, filter: { duration: 2 } }
    )
  }

  if (!town || !location) return null

  return (
    <>
      <div
        key={`${town}-${location}`}
        className="hero relative rounded-lg overflow-hidden"
      >
        <div className="hero-overlay bg-opacity-20"></div>

        <div
          className="absolute top-0 left-0 z-10 w-full h-full"
          ref={scope}
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(34,38,56,1) 35%, rgba(20,21,40,1) 100%)",
          }}
        >
          <Image
            src={getLocationBackground(town, location, null)}
            unoptimized
            fill
            priority
            loading="eager"
            draggable={false}
            onLoadingComplete={onImageLoad}
            alt="Background image"
            className="object-cover select-none opacity-70"
            style={{ objectPosition: "50% 55%", filter: "sepia(1)" }}
          />
        </div>

        <div className="hero-content z-20 text-center text-neutral-content py-8 lg:py-24">
          <div className="max-w-full lg:max-w-2xl lg:min-w-[600px] bg-base-300 bg-opacity-60 p-8 rounded-lg">
            <TownContent town={town} location={location} />
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-b-lg flex items-center flex-col">
        <TownActions location={location} />
      </div>
    </>
  )
}

export default TownHero
