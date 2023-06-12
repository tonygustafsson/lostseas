import { LOCATION_DESCRIPTION } from "@/constants/text"
import { useCharacter } from "@/hooks/queries/useCharacter"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getTownsNationality } from "@/utils/townNation"

import Flag from "./icons/Flag"
import Move from "./Move"
import Travel from "./Travel"

const LocationHero = () => {
  const { data: player } = useGetPlayer()
  const { move, sailOut } = useCharacter()

  const nation = getTownsNationality(player?.character.town)

  const isOnSeas =
    player?.character.location === "Sea" ||
    player?.character.location === "Harbor"

  const handleLand = () => {
    move({ playerId: player?.id || "", location: "Docks" })
  }

  const handleSailOut = () => {
    sailOut({ playerId: player?.id || "" })
  }

  if (!player) return null

  return (
    <div
      className="hero rounded-lg"
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
            <h2 className="font-serif mb-5 text-2xl flex gap-3 justify-center">
              <Flag nation={nation} className="opacity-[0.8]" />
              {nation}
            </h2>
          )}

          <p className="mb-5">
            {LOCATION_DESCRIPTION[player?.character.location]}
          </p>

          <div className="flex gap-4 mt-4 justify-center">
            {!isOnSeas && (
              <>
                <Move />
                <button className="btn btn-primary" onClick={handleSailOut}>
                  Sail the Seas
                </button>
              </>
            )}
            {isOnSeas && <Travel />}
            {player?.character.location === "Harbor" && (
              <button className="btn btn-primary" onClick={handleLand}>
                Land
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationHero
