import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getMannedCannons } from "@/utils/crew"
import { getLandingTips } from "@/utils/getLandingTips"
import { createMeetingShip } from "@/utils/shipMeeting"

export async function POST() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const player = await getPlayer(playerId)

  if (player.character.location !== "Sea") {
    return NextResponse.json(
      { error: `You cannot journey from ${player.character.location}.` },
      { status: 500 }
    )
  }

  if (!player.character.journey?.destination) {
    return NextResponse.json(
      { error: "Not a valid journey destination." },
      { status: 500 }
    )
  }

  if (player.character.journey?.day > player.character.journey?.totalDays) {
    return NextResponse.json(
      { error: "Your journey is already finished." },
      { status: 500 }
    )
  }

  const destinationReached =
    player.character.journey.day === player.character.journey.totalDays

  const shipMeeting = !destinationReached ? Math.random() < 0.33 : false
  const mannedCannons = getMannedCannons(
    player.crewMembers.count,
    player.inventory?.cannons
  )
  const previouslyHadAShipMeeting =
    player.locationStates?.sea?.attackSuccessReport ||
    player.locationStates?.sea?.attackFailureReport
  const shipMeetingState =
    shipMeeting && !previouslyHadAShipMeeting
      ? createMeetingShip(mannedCannons, player.character.journey.destination)
      : null

  const foodConsumption = player.crewMembers.count * 0.1
  let newFood = Math.round((player.inventory?.food || 0) - foodConsumption)
  if (newFood < 0) newFood = 0

  const waterConsumption = player.crewMembers.count * 0.2
  let newWater = Math.round((player.inventory?.water || 0) - waterConsumption)
  if (newWater < 0) newWater = 0

  if (destinationReached) {
    const landingTips = getLandingTips(player)

    const playerResult: Player = {
      ...player,
      character: {
        ...player.character,
        town: player.character.journey.destination,
        location: "Harbor",
        day: player.character.day + 1,
        journey: null,
      } as Omit<Character, "journey">,
      inventory: {
        ...player.inventory,
        food: newFood,
        water: newWater,
      },
      locationStates: {
        ...player.locationStates,
        ...(landingTips && {
          harbor: {
            ...player.locationStates?.harbor,
            landingTips,
          },
        }),
        sea: {
          ...player.locationStates?.sea,
          attackSuccessReport: null!,
          attackFailureReport: null!,
          shipMeeting: shipMeetingState,
        },
      },
    }

    try {
      await savePlayer(playerId, playerResult)
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
  } else {
    const playerResult: Player = {
      ...player,
      character: {
        ...player.character,
        ...(!previouslyHadAShipMeeting && {
          day: player.character.day + 1,
          journey: {
            ...player.character.journey,
            day: player.character.journey.day + 1,
          },
        }),
      },
      locationStates: {
        ...player.locationStates,
        sea: {
          ...player.locationStates?.sea,
          attackSuccessReport: null!,
          attackFailureReport: null!,
          shipMeeting: shipMeetingState,
        },
      },
      inventory: {
        ...player.inventory,
        food: newFood,
        water: newWater,
      },
      crewMembers: {
        ...player.crewMembers,
        mood: player.crewMembers.mood - 1,
      },
    }

    try {
      await savePlayer(playerId, playerResult)
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
  }

  return NextResponse.json({
    success: true,
    day: player.character.journey.day + 1,
    totalDays: player.character.journey.totalDays,
    destination: player.character.journey.destination,
    destinationReached,
    shipMeetingState,
  })
}
