import { useAnimate } from "framer-motion"
import Image from "next/image"
import { useEffect } from "react"

import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getRandomInt } from "@/utils/random"
import { getTownsNationality } from "@/utils/townNation"

import AttackFailureContent from "./AttackFailureContent"
import AttackSuccessContent from "./AttackSuccessContent"
import PostAttackActions from "./PostAttackActions"
import SeaContent from "./SeaContent"
import ShipMeetingActions from "./ShipMeetingActions"
import ShipMeetingContent from "./ShipMeetingContent"
import TownActions from "./TownActions"
import TownContent from "./TownContent"

const LocationHero = () => {
  const { data: player } = useGetPlayer()
  const [scope, animate] = useAnimate()

  const getBackgroundImage = (
    town: Character["town"],
    location: Character["location"],
    shipMeeting?: ShipMeetingState | null
  ) => {
    if (location === "Shop") {
      const nation = getTownsNationality(town)
      return `/img/place/${location.toLowerCase()}/${nation?.toLowerCase()}.webp`
    }

    if (location === "Sea" && shipMeeting) {
      const randomImageNumber = getRandomInt(1, 6)
      return `/img/place/ship-meeting/ship-meeting${randomImageNumber}.webp`
    }

    if (location === "Sea") {
      const randomImageNumber = getRandomInt(1, 7)
      return `/img/place/sea/sea${randomImageNumber}.webp`
    }

    return `/img/place/${player?.character.location
      .replace(" ", "-")
      .toLowerCase()}.webp`
  }

  useEffect(() => {
    animate(
      "img",
      { objectPosition: "50% 50%", filter: "sepia(0)" },
      { objectPosition: { duration: 1 }, filter: { duration: 2 } }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player?.character.location])

  if (!player) return null

  return (
    <>
      <div
        key={
          player?.character.location === "Sea"
            ? `sea-${Math.random()}`
            : `${player?.character.town}-${player?.character.location}`
        }
        className="hero relative rounded-lg rounded-b-none lg:max-h-[500px] overflow-hidden"
      >
        <div className="hero-overlay bg-opacity-20"></div>

        <div className="absolute top-0 left-0 z-10 w-full h-full" ref={scope}>
          <Image
            src={getBackgroundImage(
              player?.character.town,
              player?.character.location,
              player?.locationStates?.sea?.shipMeeting
            )}
            fill
            draggable={false}
            placeholder="blur"
            alt="Background image"
            className="object-cover select-none"
            style={{ objectPosition: "50% 40%", filter: "sepia(1)" }}
          />
        </div>

        <div className="hero-content z-20 text-center text-neutral-content py-8 lg:py-24">
          <div className="max-w-full lg:max-w-2xl lg:min-w-[600px] bg-base-300 bg-opacity-60 p-8 rounded-lg">
            {player?.character.location !== "Sea" && (
              <TownContent
                town={player?.character.town}
                location={player?.character.location}
              />
            )}

            {player?.character.location === "Sea" &&
              !player?.locationStates?.sea?.shipMeeting &&
              !player?.locationStates?.sea?.attackSuccessReport &&
              !player?.locationStates?.sea?.attackFailureReport && (
                <SeaContent
                  location={player?.character.location}
                  journey={player?.character.journey}
                  day={player?.character.day}
                />
              )}

            {player?.character.location === "Sea" &&
              player?.locationStates?.sea?.shipMeeting && (
                <ShipMeetingContent
                  shipMeeting={player?.locationStates?.sea?.shipMeeting}
                  crewMembers={player?.crewMembers.count}
                  cannons={player?.inventory?.cannons}
                />
              )}

            {player?.character.location === "Sea" &&
              player?.locationStates?.sea?.attackSuccessReport && (
                <AttackSuccessContent />
              )}

            {player?.character.location === "Sea" &&
              player?.locationStates?.sea?.attackFailureReport && (
                <AttackFailureContent />
              )}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-b-lg flex items-center flex-col">
        {player?.character.location !== "Sea" && (
          <TownActions location={player?.character.location} />
        )}

        {player?.character.location === "Sea" &&
          player?.locationStates?.sea?.shipMeeting && <ShipMeetingActions />}

        {player?.character.location === "Sea" &&
          (player?.locationStates?.sea?.attackSuccessReport ||
            player?.locationStates?.sea?.attackFailureReport) && (
            <PostAttackActions />
          )}
      </div>
    </>
  )
}

export default LocationHero
