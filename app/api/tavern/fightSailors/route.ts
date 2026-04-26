import { randomInt } from "crypto"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { patchDeep } from "@/utils/patchDeep"

export async function POST() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const numberOfSailors = player?.locationStates?.tavern?.noOfSailors || 0

  if (!numberOfSailors) {
    return NextResponse.json({ error: "No sailors to fight" }, { status: 500 })
  }

  const won = Math.random() > 0.3

  if (won) {
    const loot = Math.round(randomInt(10, 100))
    const healthLoss = Math.round(randomInt(1, 10))

    const dbUpdate: DeepPartial<Player> = {
      character: {
        gold: player.character.gold + loot,
      },
      crewMembers: {
        health:
          player.crewMembers.health - healthLoss > 0
            ? player.crewMembers.health - healthLoss
            : 0,
      },
      locationStates: {
        tavern: {
          noOfSailors: 0,
        },
      },
    }

    const newPlayer = patchDeep<Player>(player, dbUpdate)

    try {
      const updatedPlayer = await savePlayer(
        newPlayer,
        `Fought sailors and won; loot ${loot}, health loss ${healthLoss}.`
      )

      return NextResponse.json({
        success: true,
        updatedPlayer,
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
    const dbUpdate: DeepPartial<Player> = {
      crewMembers: {
        health:
          player.crewMembers.health - healthLoss > 0
            ? player.crewMembers.health - healthLoss
            : 0,
      },
      locationStates: {
        tavern: {
          noOfSailors: 0,
        },
      },
    }

    const newPlayer = patchDeep<Player>(player, dbUpdate)

    try {
      const updatedPlayer = await savePlayer(
        newPlayer,
        `Fought sailors and lost; health loss ${healthLoss}.`
      )

      return NextResponse.json({
        success: false,
        updatedPlayer,
        numberOfSailors,
        healthLoss,
      })
    } catch (error) {
      return NextResponse.json(
        { error, numberOfSailors, healthLoss },
        { status: 500 }
      )
    }
  }
}
