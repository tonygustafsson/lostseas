import { m as motion } from "framer-motion"

import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getRandomInt } from "@/utils/random"
import { getTownsNationality } from "@/utils/townNation"

import SeaContent from "./SeaContent"
import TownActions from "./TownActions"
import TownContent from "./TownContent"

const LocationHero = () => {
  const { data: player } = useGetPlayer()

  const getBackgroundImage = (
    town: Character["town"],
    location: Character["location"]
  ) => {
    if (location === "Shop") {
      const nation = getTownsNationality(town)
      return `url("img/place/${location.toLowerCase()}/${nation?.toLowerCase()}.webp")`
    }

    if (location === "Sea") {
      const randomImageNumber = getRandomInt(1, 7)
      return `url("img/place/sea${randomImageNumber}.webp")`
    }

    return `url("img/place/${player?.character.location
      .replace(" ", "-")
      .toLowerCase()}.webp")`
  }

  if (!player) return null

  return (
    <>
      <motion.div
        key={
          player?.character.location === "Sea"
            ? `sea-${Math.random()}`
            : `${player?.character.town}-${player?.character.location}`
        }
        initial={{
          filter: "sepia(1)",
          backgroundPositionY: "55%",
        }}
        animate={{
          filter: "sepia(0)",
          backgroundPositionY: "50%",
          transition: {
            filter: { duration: 1 },
            backgroundPositionY: {
              duration: 1,
              type: "tween",
            },
          },
        }}
        className="hero rounded-lg rounded-b-none lg:max-h-[500px]"
        style={{
          backgroundImage: getBackgroundImage(
            player?.character.town,
            player?.character.location
          ),
        }}
      >
        <div className="hero-overlay bg-opacity-20"></div>

        <div className="hero-content text-center text-neutral-content py-8 lg:py-24">
          <div className="max-w-full lg:max-w-2xl lg:min-w-[600px] bg-base-300 bg-opacity-60 p-8 rounded-lg">
            {player?.character.location !== "Sea" && (
              <TownContent
                town={player?.character.town}
                location={player?.character.location}
              />
            )}

            {player?.character.location === "Sea" && (
              <SeaContent
                location={player?.character.location}
                journey={player?.character.journey}
                day={player?.character.day}
              />
            )}
          </div>
        </div>
      </motion.div>

      <div className="bg-gray-900 rounded-b-lg p-4 flex items-center flex-col pb-8">
        {player?.character.location !== "Sea" && (
          <TownActions location={player?.character.location} />
        )}
      </div>
    </>
  )
}

export default LocationHero
