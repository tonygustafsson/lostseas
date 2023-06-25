import { useMutation, useQueryClient } from "@tanstack/react-query"

import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useCrew = () => {
  const queryClient = useQueryClient()

  const { mutate: giveMedicine, isLoading: isGivingMedicine } = useMutation(
    (data: { playerId: Player["id"]; medicine: Inventory["medicine"] }) =>
      apiRequest("/api/crew/giveMedicine", data, "POST"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  const { mutate: giveGold, isLoading: isGivingGold } = useMutation(
    (data: { playerId: Player["id"]; gold: Character["gold"] }) =>
      apiRequest("/api/crew/giveGold", data, "POST"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
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
