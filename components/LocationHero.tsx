import { m as motion } from "framer-motion"
import { AiOutlineShop } from "react-icons/ai"
import { BsTools } from "react-icons/bs"
import {
  GiAnchor,
  GiBank,
  GiFarmer,
  GiSmallFishingSailboat,
  GiTavernSign,
} from "react-icons/gi"

import { LOCATION_DESCRIPTION } from "@/constants/text"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getCurrentDate } from "@/utils/date"
import { getTownsNationality } from "@/utils/townNation"

import Flag from "./icons/Flag"

const LocationHero = () => {
  const { data: player } = useGetPlayer()
  const { move, explore } = useCharacter()

  const nation = getTownsNationality(player?.character.town)

  const isOnSeas =
    player?.character.location === "Sea" ||
    player?.character.location === "Harbor"

  const handleMove = (location: SeaLocation | TownLocation) => {
    move({ location })
  }

  const handleExplore = () => explore()

  const TownMoveMap = {
    Shop: {
      icon: <AiOutlineShop className="text-cyan-600 w-6 h-6" />,
    },
    Tavern: {
      icon: <GiTavernSign className="text-cyan-600 w-6 h-6" />,
    },
    Bank: {
      icon: <GiBank className="text-cyan-600 w-6 h-6" />,
    },
    Market: {
      icon: <GiFarmer className="text-cyan-600 w-6 h-6" />,
    },
    Shipyard: {
      icon: <BsTools className="text-cyan-600 w-5 h-5" />,
    },
    Harbor: {
      icon: <GiSmallFishingSailboat className="text-white w-6 h-6" />,
    },
  }

  const getBackgroundImage = (
    town: Character["town"],
    location: Character["location"]
  ) => {
    if (location === "Shop") {
      const nation = getTownsNationality(town)
      return `url("img/place/${location.toLowerCase()}/${nation?.toLowerCase()}.webp")`
    }

    return `url("img/place/${player?.character.location
      .replace(" ", "-")
      .toLowerCase()}.webp")`
  }

  if (!player) return null

  return (
    <>
      <motion.div
        key={`${player?.character.town}s ${player?.character.location}`}
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
            <h1 className="font-serif mb-4 text-3xl lg:text-5xl">
              {player?.character.location === "Sea"
                ? "Open Seas"
                : `${player?.character.town}s ${player?.character.location}`}
            </h1>

            {player?.character.location !== "Sea" && (
              <h2 className="font-serif mb-3 lg:mb-5 text-lg lg:text-2xl flex gap-3 justify-center items-center">
                <Flag
                  nation={nation}
                  className="w-5 h-5 lg:w-7 lg:h-7 opacity-[0.8]"
                />
                {nation}
              </h2>
            )}

            <p className="lg:mb-5 text-sm">
              {player?.character.location === "Sea" &&
              player?.character.journey?.destination ? (
                <>
                  <p>
                    Traveling to {player?.character.journey?.destination}, day{" "}
                    {player?.character.journey?.day} of{" "}
                    {player?.character.journey?.totalDays}
                  </p>

                  <p>{getCurrentDate(player.character.day)}</p>
                </>
              ) : (
                LOCATION_DESCRIPTION[player?.character.location]
              )}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="bg-gray-900 rounded-b-lg p-4 flex items-center flex-col pb-8">
        {!isOnSeas && (
          <>
            <span className="text-xl font-serif">Change location</span>

            <div className="flex flex-wrap mt-4 justify-center gap-2 lg:gap-0 lg:join">
              {Object.entries(TownMoveMap).map(([location, { icon }]) => (
                <button
                  key={`change-location-${location}`}
                  className={`btn text-base ${
                    location === "Harbor" ? "btn-primary" : " bg-gray-800"
                  } btn join-item`}
                  onClick={() =>
                    handleMove(location as TownLocation | SeaLocation)
                  }
                  disabled={player?.character.location === location}
                >
                  {icon}
                  {location === "Harbor" ? "Set Sails" : location}
                </button>
              ))}
            </div>
          </>
        )}

        {player.character.location === "Harbor" && (
          <div className="flex flex-wrap mt-4 justify-center join">
            <button
              className="btn text-base bg-gray-800 join-item"
              onClick={() => handleMove("Docks")}
            >
              <GiAnchor className="text-cyan-600 w-5 h-5" />
              Land
            </button>

            <button
              className="btn text-base bg-gray-800 join-item"
              onClick={handleExplore}
            >
              <GiSmallFishingSailboat className="text-cyan-600 w-6 h-6" />
              Sail Out
            </button>
          </div>
        )}

        {player.character.location === "Sea" && (
          <button
            className="btn text-base bg-gray-800 join-item"
            onClick={handleExplore}
          >
            <GiSmallFishingSailboat className="text-cyan-600 w-7 h-7" />
            Explore
          </button>
        )}
      </div>
    </>
  )
}

export default LocationHero
