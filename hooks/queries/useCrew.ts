import { useMutation, useQueryClient } from "@tanstack/react-query"

import useSound from "@/app/stores/sound"
import { useToasts } from "@/app/stores/toasts"
import apiRequest from "@/utils/apiRequest"
import { getGoldEffectiveness, getMedicineEffectiveness } from "@/utils/crew"
import { dbPatchToObj } from "@/utils/dbUpdateToObj"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useCrew = () => {
  const queryClient = useQueryClient()
  const { playSoundEffect } = useSound()
  const setToast = useToasts((s) => s.setToast)

  const handleError = (
    title: string,
    message: string | undefined,
    previousState: Player | undefined
  ) => {
    if (previousState) {
      queryClient.setQueryData([PLAYER_QUERY_KEY], previousState)
    }

    setToast({
      title,
      message: message ?? "",
      variant: "error",
    })
  }

  const { mutate: giveMedicine, isPending: isGivingMedicine } = useMutation({
    mutationFn: (data: { medicine: Inventory["medicine"] }) =>
      apiRequest("/api/crew/giveMedicine", data, "POST"),
    onMutate: async (data: { medicine: Inventory["medicine"] }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const medicine = data.medicine ?? 0
        const newHealth = getMedicineEffectiveness(
          previous.crewMembers.count,
          previous.crewMembers.health,
          medicine
        )

        const playerUpdates = {
          "inventory/medicine":
            (previous.inventory?.medicine || 0) - (medicine ?? 0),
          "crewMembers/health": newHealth,
        } satisfies PlayerDB

        const newPlayer = dbPatchToObj(previous, playerUpdates)

        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onSuccess: (response, _, context) => {
      const { updatedPlayer, error } = response?.data

      if (error) {
        handleError(`Could not give medicine`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      playSoundEffect("drink")
    },
    onError: (err: unknown, _variables, context) => {
      handleError(`Could not give medicine`, String(err), context?.previous)
    },
  })

  const { mutate: giveGold, isPending: isGivingGold } = useMutation({
    mutationFn: (data: { gold: Character["gold"] }) =>
      apiRequest("/api/crew/giveGold", data, "POST"),
    onMutate: async (data: { gold: Character["gold"] }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const gold = data.gold ?? 0
        const newMood = getGoldEffectiveness(
          previous.crewMembers.count,
          previous.crewMembers.mood,
          gold
        )

        const playerUpdates = {
          "character/gold": (previous.character.gold || 0) - gold,
          "crewMembers/mood": newMood,
        } satisfies PlayerDB

        const newPlayer = dbPatchToObj(previous, playerUpdates)

        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onSuccess: (response, _, context) => {
      const { updatedPlayer, error } = response?.data

      if (error) {
        handleError(`Could not give gold`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      playSoundEffect("cheers")
    },
    onError: (err: unknown, _variables, context) => {
      handleError(`Could not give gold`, String(err), context?.previous)
    },
  })

  const { mutate: dismiss, isPending: isDismissing } = useMutation({
    mutationFn: (data: { count: CrewMembers["count"] }) =>
      apiRequest("/api/crew/dismiss", data, "POST"),
    onMutate: async (data: { count: CrewMembers["count"] }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const newCount = (previous.crewMembers.count || 0) - (data.count ?? 0)

        const playerUpdates = {
          "crewMembers/count": newCount,
        } satisfies PlayerDB

        const newPlayer = dbPatchToObj(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onSuccess: (response, _, context) => {
      const { updatedPlayer, error } = response?.data

      if (error) {
        handleError(`Could not dismiss crew`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      playSoundEffect("frustration")
    },
    onError: (err: unknown, _variables, context) => {
      handleError(`Could not dismiss crew`, String(err), context?.previous)
    },
  })

  return {
    giveMedicine,
    isGivingMedicine,
    giveGold,
    isGivingGold,
    dismiss,
    isDismissing,
  }
}
