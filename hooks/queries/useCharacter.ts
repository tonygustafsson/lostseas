import { useMutation, useQueryClient } from "@tanstack/react-query"

import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useCharacter = () => {
  const queryClient = useQueryClient()

  const { mutate: travel, isLoading: travelIsLoading } = useMutation(
    (data: { userId: Player["id"]; town: Town }) =>
      apiRequest("/api/character/travel", data, "POST"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  const { mutate: move, isLoading: isMoving } = useMutation(
    (data: { userId: Player["id"]; location: TownLocation | SeaLocation }) =>
      apiRequest("/api/character/move", data, "POST"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  return {
    travel,
    travelIsLoading,
    move,
    isMoving,
  }
}
