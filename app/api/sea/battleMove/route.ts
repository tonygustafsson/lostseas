import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getDefeatUpdate, getVictoryUpdate } from "@/utils/battleOutcome"
import { patchDeep } from "@/utils/patchDeep"
import { getBattleLosses, resolveBattleRound } from "@/utils/seaBattle"

const BATTLE_ACTIONS: BattleAction[] = ["fire", "evade"]

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const action = body?.action as BattleAction

  if (!BATTLE_ACTIONS.includes(action)) {
    return NextResponse.json(
      { error: "Not a valid battle action" },
      { status: 400 }
    )
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const shipMeeting = player.locationStates?.sea?.shipMeeting
  const battle = player.locationStates?.sea?.battle

  if (!shipMeeting || !battle) {
    return NextResponse.json(
      { error: "You are not currently in a battle" },
      { status: 409 }
    )
  }

  const result = resolveBattleRound(battle, action, player, shipMeeting.cannons)
  const lastRound = result.battle.rounds.at(-1)

  if (result.outcome === "ongoing") {
    const newPlayer = patchDeep<Player>(player, {
      ships: result.ships,
      crewMembers: { health: result.crewHealth },
      locationStates: { sea: { battle: result.battle } },
    })

    try {
      await savePlayer(newPlayer)
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ outcome: result.outcome, round: lastRound })
  }

  const getUpdate =
    result.outcome === "victory" ? getVictoryUpdate : getDefeatUpdate
  const { dbUpdate, report, logMessage } = getUpdate(
    {
      ...player,
      ships: result.ships,
      crewMembers: { ...player.crewMembers, health: result.crewHealth },
    },
    shipMeeting,
    getBattleLosses(result.battle)
  )

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    await savePlayer(newPlayer, logMessage)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({
    outcome: result.outcome,
    round: lastRound,
    ...report,
  })
}
