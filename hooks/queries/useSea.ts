import { useMutation, useQueryClient } from "@tanstack/react-query"

import useSound from "@/app/stores/sound"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useSea = () => {
  const queryClient = useQueryClient()
  const { playSoundEffect } = useSound()

  const { mutate: startJourney, isPending: isStartingJourney } = useMutation({
    mutationFn: (data: { town: Town }) =>
      apiRequest("/api/sea/startJourney", data, "POST"),
    onSuccess: async (response) => {
      const { success } = response?.data ?? {}

      await queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })

      if (success) {
        playSoundEffect("journey")
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
      playSoundEffect("sailho")
    } else if (destinationReached) {
      playSoundEffect("landho")
    } else {
      playSoundEffect("journey")
    }
  }

  const { mutate: continueJourney, isPending: isContinueingJourney } =
    useMutation({
      mutationFn: () => apiRequest("/api/sea/continueJourney", null, "POST"),
      onSuccess: onSailed,
      onError: (error) => console.error(error),
    })

  const { mutate: attackShip, isPending: isAttackingShip } = useMutation({
    mutationFn: () => apiRequest("/api/sea/attackShip", null, "POST"),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })
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
        playSoundEffect("cheers")
      } else if (outcome === "defeat") {
        playSoundEffect("frustration")
      } else if (action === "fire") {
        playSoundEffect("cannons")
      }
    },
    onError: (error) => console.error(error),
  })

  const { mutate: takeLoot, isPending: isTakingLoot } = useMutation({
    mutationFn: (loot: Partial<Record<keyof Inventory, number>>) =>
      apiRequest("/api/sea/takeLoot", { loot }, "POST"),
    onSuccess: onSailed,
    onError: (error) => console.error(error),
  })

  const { mutate: ignoreShip, isPending: isIgnoringShip } = useMutation({
    mutationFn: () => apiRequest("/api/sea/ignoreShip", null, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })

      continueJourney()
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
    takeLoot,
    isTakingLoot,
  }
}
