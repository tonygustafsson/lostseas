import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getMannedCannons } from "@/utils/crew"
import { patchDeep } from "@/utils/patchDeep"
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
    const dbUpdate: DeepPartial<Player> = {
      character: {
        town: player.character.journey.destination,
        location: "Harbor",
        day: player.character.day + 1,
        journey: null,
      },
      inventory: {
        food: newFood,
        water: newWater,
      },
      locationStates: {
        sea: {
          shipMeeting: shipMeetingState,
          attackSuccessReport: null,
          attackFailureReport: null,
        },
      },
    }

    const newPlayer = patchDeep<Player>(player, dbUpdate)

    try {
      await savePlayer(newPlayer)
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
  } else {
    const dbUpdates: DeepPartial<Player> = {
      character: {
        ...(!previouslyHadAShipMeeting && {
          day: player.character.day + 1,
          journey: {
            day: player.character.journey.day + 1,
          },
        }),
      },
      locationStates: {
        sea: {
          shipMeeting: shipMeetingState,
          attackSuccessReport: null,
          attackFailureReport: null,
        },
      },
      inventory: {
        food: newFood,
        water: newWater,
      },
      crewMembers: {
        mood: player.crewMembers.mood - 1,
      },
    }

    const newPlayer = patchDeep<Player>(player, dbUpdates)

    try {
      await savePlayer(newPlayer)
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
