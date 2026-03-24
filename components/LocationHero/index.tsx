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
        className={`relative grid min-h-88 place-items-center overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-[0_30px_80px_rgba(15,23,42,0.45)] ${
          player?.character.location !== "Sea"
            ? "rounded-b-none lg:max-h-125"
            : ""
        }`}
      >
        <div
          className="absolute inset-0"
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
            className="object-cover opacity-80 select-none"
            style={{ objectPosition: "50% 55%", filter: "sepia(1)" }}
          />
        </div>

        <div className="z-20 flex w-full items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-10 lg:py-20">
          <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-black/55 px-6 py-8 text-stone-100 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-[2px] sm:px-8 lg:min-w-[600px] lg:px-14 lg:py-12">
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

      <div className="bg-card rounded-b-3xl border border-t-0 shadow-[0_18px_48px_rgba(15,23,42,0.3)]">
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
