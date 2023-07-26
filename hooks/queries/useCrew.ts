import { useMutation, useQueryClient } from "@tanstack/react-query"

import { playSoundEffect } from "@/components/Sound/state"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useCrew = () => {
  const queryClient = useQueryClient()

  const { mutate: giveMedicine, isLoading: isGivingMedicine } = useMutation(
    (data: { medicine: Inventory["medicine"] }) =>
      apiRequest("/api/crew/giveMedicine", data, "POST"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
        playSoundEffect("drink")
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: giveGold, isLoading: isGivingGold } = useMutation(
    (data: { gold: Character["gold"] }) =>
      apiRequest("/api/crew/giveGold", data, "POST"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
        playSoundEffect("cheers")
      },
      onError: (error) => console.error(error),
    }
  )

  return {
    giveMedicine,
    isGivingMedicine,
    giveGold,
    isGivingGold,
  }
}
