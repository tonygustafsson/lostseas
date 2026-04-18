import { useAnimate } from "framer-motion"
import Image from "next/image"
import { useId } from "react"

import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { cn } from "@/lib/utils"
import { getLocationBackground } from "@/utils/location"

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

  const randomId = useId()

  const onImageLoad = () => {
    animate(
      "img",
      { objectPosition: "50% 50%", filter: "sepia(0)" },
      { objectPosition: { duration: 1 }, filter: { duration: 2 } }
    )
  }

  if (!player) return null

  return (
    <>
      <div
        key={
          player?.character.location === "Sea"
            ? `sea-${player.character.journey?.day}-${randomId}`
            : `${player?.character.town}-${player?.character.location}`
        }
        className={cn(
          "relative grid min-h-88 place-items-center overflow-hidden border bg-slate-950 shadow-2xl",
          {
            "rounded-b-none lg:max-h-125": player?.character.location !== "Sea",
          }
        )}
      >
        <div className="absolute inset-0" ref={scope}>
          <Image
            src={getLocationBackground(
              player?.character.town,
              player?.character.location,
              player?.locationStates?.sea?.shipMeeting
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
          <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-black/55 px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-[2px] sm:px-8 lg:min-w-[600px] lg:px-14 lg:py-12">
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
                  journey={player?.character.journey}
                  nationality={player?.character.nationality}
                  day={player?.character.day}
                />
              )}

            {player?.character.location === "Sea" &&
              player?.locationStates?.sea?.attackSuccessReport && (
                <AttackSuccessContent
                  journey={player?.character.journey}
                  day={player?.character.day}
                />
              )}

            {player?.character.location === "Sea" &&
              player?.locationStates?.sea?.attackFailureReport && (
                <AttackFailureContent
                  journey={player?.character.journey}
                  day={player?.character.day}
                />
              )}
          </div>
        </div>
      </div>

      <div className="bg-card border-t-0] rounded-b-xl border border-t-0">
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
