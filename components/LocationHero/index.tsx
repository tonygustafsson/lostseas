"use client"

import { useAnimate } from "framer-motion"
import Image from "next/image"
import { useId } from "react"

import { useGetPlayer } from "@/hooks/queries/usePlayer"
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
            ? `sea-${randomId}`
            : `${player?.character.town}-${player?.character.location}`
        }
        className={`hero relative rounded-lg ${
          player?.character.location !== "Sea"
            ? "rounded-b-none lg:max-h-[500px]"
            : ""
        } overflow-hidden`}
      >
        <div className="hero-overlay bg-black/20"></div>

        <div
          className="absolute top-0 left-0 z-10 h-full w-full"
          ref={scope}
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(34,38,56,1) 35%, rgba(20,21,40,1) 100%)",
          }}
        >
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
            className="object-cover opacity-70 select-none"
            style={{ objectPosition: "50% 55%", filter: "sepia(1)" }}
          />
        </div>

        <div className="hero-content text-neutral-content z-20 py-8 text-center lg:py-24">
          <div className="max-w-full rounded-lg bg-black/60 bg-slate-300 p-8 lg:max-w-2xl lg:min-w-[600px]">
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

      <div className="flex flex-col items-center rounded-b-lg bg-gray-900">
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
