import { useAnimate } from "framer-motion"
import Image from "next/image"

import { getLocationBackground } from "@/utils/location"

import BackToTown from "./BackToTown"
import BuildingIntro from "./BuildingIntro"

type Props = {
  town: Character["town"]
  location: Character["location"]
}

const BuildingScene = ({ town, location }: Props) => {
  const [scope, animate] = useAnimate()

  const onImageLoad = () => {
    animate(
      "img",
      { objectPosition: "50% 50%", filter: "sepia(0)" },
      { objectPosition: { duration: 1 }, filter: { duration: 2 } }
    )
  }

  return (
    <>
      <div className="relative grid min-h-88 place-items-center overflow-hidden rounded-b-none border bg-slate-950 shadow-2xl lg:max-h-125">
        <div className="absolute inset-0" ref={scope}>
          <Image
            src={getLocationBackground(town, location)}
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
            <BuildingIntro town={town} location={location} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-b-xl border border-t-0">
        <BackToTown />
      </div>
    </>
  )
}

export default BuildingScene
