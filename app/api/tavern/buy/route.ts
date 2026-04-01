import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { TAVERN_ITEMS } from "@/constants/tavern"
import { getPlayer, savePlayer } from "@/firebase/db"
import { patchDeep } from "@/utils/patchDeep"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const body = await req.json()
  const { item }: { item: keyof typeof TAVERN_ITEMS } = body

  if (!item || !Object.keys(TAVERN_ITEMS).includes(item || "")) {
    return NextResponse.json({ error: "Not a valid item" }, { status: 400 })
  }

  const player = await getPlayer(playerId)

  const tavernItem = item as keyof typeof TAVERN_ITEMS
  const totalPrice = TAVERN_ITEMS[tavernItem].price * player.crewMembers.count

  if (player.character.gold < totalPrice) {
    return NextResponse.json({ error: "Not enough gold" }, { status: 400 })
  }

  const healthIncrease = TAVERN_ITEMS[tavernItem].healthIncrease
  const moodIncrease = TAVERN_ITEMS[tavernItem].moodIncrease
  const newMood =
    player.crewMembers.mood + moodIncrease > 40
      ? 40
      : player.crewMembers.mood + moodIncrease
  const newHealth =
    player.crewMembers.health + healthIncrease > 100
      ? 100
      : player.crewMembers.health + healthIncrease

  const dbUpdate: DeepPartial<Player> = {
    character: {
      gold: player.character.gold - totalPrice,
    },
    crewMembers: {
      mood: newMood,
      health: newHealth,
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(newPlayer)

    return NextResponse.json({
      success: true,
      updatedPlayer,
      item,
      newMood,
      newHealth,
      totalPrice,
    })
  } catch (error) {
    return NextResponse.json({ error, item }, { status: 500 })
  }
}
