import { randomInt } from "crypto"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"

export async function POST() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const player = await getPlayer(playerId)

  const numberOfSailors = player?.locationStates?.tavern?.noOfSailors || 0

  if (!numberOfSailors) {
    return NextResponse.json({ error: "No sailors to fight" }, { status: 500 })
  }

  const won = Math.random() > 0.3

  if (won) {
    const loot = Math.round(randomInt(10, 100))
    const healthLoss = Math.round(randomInt(1, 10))

    const dbUpdate = {
      "character/gold": player.character.gold + loot,
      "crewMembers/health":
        player.crewMembers.health - healthLoss > 0
          ? player.crewMembers.health - healthLoss
          : 0,
      "locationStates/tavern/noOfSailors": 0,
    }

    try {
      await savePlayer(playerId, dbUpdate)

      return NextResponse.json({
        success: true,
        numberOfSailors,
        healthLoss,
        loot,
      })
    } catch (error) {
      return NextResponse.json(
        { error, numberOfSailors, loot, healthLoss },
        { status: 500 }
      )
    }
  } else {
    const healthLoss = Math.round(randomInt(10, 30))
    const dbUpdate = {
      crewMembers: {
        ...player.crewMembers,
        health:
          player.crewMembers.health - healthLoss > 0
            ? player.crewMembers.health - healthLoss
            : 0,
      },
      "locationStates/tavern/noOfSailors": 0,
    } satisfies PlayerDB

    try {
      await savePlayer(playerId, dbUpdate)
    } catch (error) {
      return NextResponse.json(
        { error, numberOfSailors, healthLoss },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: false, numberOfSailors, healthLoss })
  }
}
