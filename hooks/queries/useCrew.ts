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

  const { mutate: giveDoubloons, isLoading: isGivingDoubloons } = useMutation(
    (data: { playerId: Player["id"]; doubloons: Character["doubloons"] }) =>
      apiRequest("/api/crew/giveDoubloons", data, "POST"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  return {
    giveMedicine,
    isGivingMedicine,
    giveDoubloons,
    isGivingDoubloons,
  }
}
