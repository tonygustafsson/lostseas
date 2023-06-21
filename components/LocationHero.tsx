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
    move({ playerId: player?.id || "", location })
  }

  const handleExplore = () => {
    explore({ playerId: player?.id || "" })
  }

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

  if (!player) return null

  return (
    <>
      <div
        className="hero rounded-lg rounded-b-none"
        style={{
          backgroundImage: `url("img/place/${player?.character.location
            .replace(" ", "-")
            .toLowerCase()}.webp")`,
        }}
      >
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content text-center text-neutral-content py-24">
          <div className="max-w-2xl min-w-[600px] bg-base-300 bg-opacity-60 p-8 rounded-lg">
            <h1 className="font-serif mb-4 text-5xl">
              {player?.character.location === "Sea"
                ? "Open Seas"
                : `${player?.character.town}s ${player?.character.location}`}
            </h1>

            {player?.character.location !== "Sea" && (
              <h2 className="font-serif mb-5 text-2xl flex gap-3 justify-center items-center">
                <Flag nation={nation} className="opacity-[0.8]" />
                {nation}
              </h2>
            )}

            <p className="mb-5 text-sm">
              {LOCATION_DESCRIPTION[player?.character.location]}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-b-lg p-4 flex items-center flex-col pb-8">
        {!isOnSeas && (
          <>
            <span className="text-xl font-serif">Change location</span>

            <div className="flex flex-wrap mt-4 justify-center join">
              {Object.entries(TownMoveMap).map(([location, { icon }]) => (
                <button
                  key={`change-location-${location}`}
                  className={`btn text-base ${
                    location === "Harbor" ? "btn-primary" : " bg-gray-800"
                  } btn capitalize  join-item`}
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
              className="btn text-base bg-gray-800 capitalize join-item"
              onClick={() => handleMove("Docks")}
            >
              <GiAnchor className="text-cyan-600 w-5 h-5" />
              Land
            </button>

            <button
              className="btn text-base bg-gray-800 capitalize join-item"
              onClick={handleExplore}
            >
              <GiSmallFishingSailboat className="text-cyan-600 w-6 h-6" />
              Sail Out
            </button>
          </div>
        )}

        {player.character.location === "Sea" && (
          <button
            className="btn text-base bg-gray-800 capitalize join-item"
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
