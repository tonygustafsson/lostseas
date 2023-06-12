import { child, get, ref, set } from "firebase/database"

import db from "@/firebase/db"

type Props = {
  playerId: Player["id"]
  destination: Character["location"]
}

export const createMoveEvents = async ({ playerId, destination }: Props) => {
  if (destination === "Market") {
    const dbRef = ref(db)

    const existingEvent = await get(
      child(dbRef, `${playerId}/locationStates/market`)
    )

    if (!existingEvent.exists()) {
      const newEvent: LocationState["market"] = {
        items: {
          food: 12,
        },
      }

      const eventResult = { ...existingEvent.val(), ...newEvent }

      await set(
        ref(db, `${playerId}/locationStates/market`),
        eventResult
      ).catch((error) => {
        throw new Error(error)
      })
    }
  }
}
