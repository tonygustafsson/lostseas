import { useMutation, useQueryClient } from "@tanstack/react-query"

import { PLAYER_QUERY_KEY } from "@/constants/system"
import apiRequest from "@/utils/apiRequest"
import { patchDeep } from "@/utils/patchDeep"
import { playSoundEffect } from "@/utils/sound"

export const useSea = () => {
  const queryClient = useQueryClient()

  const { mutate: startJourney, isPending: isStartingJourney } = useMutation({
    mutationFn: (data: { town: Town }) =>
      apiRequest("/api/sea/startJourney", data, "POST"),
    onSuccess: async (response) => {
      const { success } = response?.data ?? {}

      await queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })

      if (success) {
        playSoundEffect("leave-port")
      }
    },
    onError: (error) => console.error(error),
  })

  // Sailing on, with or without taking loot first, plays what happens next
  const onSailed = async (response: Awaited<ReturnType<typeof apiRequest>>) => {
    const {
      destinationReached,
      shipMeetingState,
    }: {
      destinationReached: boolean
      shipMeetingState: ShipMeetingState | null
    } = response?.data

    await queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })

    if (shipMeetingState) {
      playSoundEffect("ship-meeting")
    } else if (destinationReached) {
      playSoundEffect("arrive-port")
    }
  }

  const { mutate: continueJourney, isPending: isContinueingJourney } =
    useMutation({
      mutationFn: () => apiRequest("/api/sea/continueJourney", null, "POST"),
      // Sail the next day straight away so the ship doesn't stop while the
      // server answers. The refetch corrects it, and errors put it back.
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

        const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])
        const journey = previous?.character.journey

        // Arriving moves the player to the harbour, so leave that to the server
        if (previous && journey && journey.day < journey.totalDays) {
          queryClient.setQueryData(
            [PLAYER_QUERY_KEY],
            patchDeep(previous, {
              character: { journey: { day: journey.day + 1 } },
            })
          )
        }

        return { previous }
      },
      onSuccess: onSailed,
      onError: (error, _, context) => {
        console.error(error)

        if (context?.previous) {
          queryClient.setQueryData([PLAYER_QUERY_KEY], context.previous)
        }
      },
      // Keeps a late timer from sailing two days at once
      scope: { id: "continueJourney" },
    })

  const { mutate: attackShip, isPending: isAttackingShip } = useMutation({
    mutationFn: () => apiRequest("/api/sea/attackShip", null, "POST"),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })

      playSoundEffect("war-drums")
    },
    onError: (error) => console.error(error),
  })

  const { mutate: battleMove, isPending: isMakingBattleMove } = useMutation({
    mutationFn: (action: BattleAction) =>
      apiRequest("/api/sea/battleMove", { action }, "POST"),
    onSuccess: async (response, action) => {
      const { outcome }: { outcome?: BattleOutcome } = response?.data ?? {}

      await queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })

      if (outcome === "victory") {
        playSoundEffect("victory-with-speech")
      } else if (outcome === "defeat") {
        playSoundEffect("defeat-with-speech")
      } else if (action === "fire") {
        playSoundEffect("cannons-firing")
      } else {
        playSoundEffect("evade-ship")
      }
    },
    onError: (error) => console.error(error),
  })

  const { mutate: takeLoot, isPending: isTakingLoot } = useMutation({
    mutationFn: (loot: Partial<Record<keyof Inventory, number>>) =>
      apiRequest("/api/sea/takeLoot", { loot }, "POST"),
    onSuccess: (response) => {
      playSoundEffect("transaction")
      return onSailed(response)
    },
    onError: (error) => console.error(error),
  })

  const { mutate: ignoreShip, isPending: isIgnoringShip } = useMutation({
    mutationFn: () => apiRequest("/api/sea/ignoreShip", null, "POST"),
    // The sea timer sails on, so the ship moves at its usual pace
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })
    },
    onError: (error) => console.error(error),
  })

  const { mutate: fleeShip, isPending: isFleeingShip } = useMutation({
    mutationFn: () => apiRequest("/api/sea/fleeShip", null, "POST"),
    onSuccess: async (response) => {
      const { escaped }: { escaped?: boolean } = response?.data ?? {}

      await queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })

      playSoundEffect(escaped ? "evade-ship" : "cannons-firing")
    },
    onError: (error) => console.error(error),
  })

  return {
    startJourney,
    isStartingJourney,
    continueJourney,
    isContinueingJourney,
    attackShip,
    isAttackingShip,
    battleMove,
    isMakingBattleMove,
    ignoreShip,
    isIgnoringShip,
    fleeShip,
    isFleeingShip,
    takeLoot,
    isTakingLoot,
  }
}
