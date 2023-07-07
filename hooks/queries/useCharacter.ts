import { useMutation, useQueryClient } from "@tanstack/react-query"

import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useCharacter = () => {
  const queryClient = useQueryClient()

  const { mutate: move, isLoading: isMoving } = useMutation(
    (data: { location: TownLocation | SeaLocation }) =>
      apiRequest("/api/character/move", data, "POST"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  const { mutate: update, isLoading: updateIsLoading } = useMutation(
    (characterData: Partial<Character>) =>
      apiRequest("/api/character/update", characterData, "POST"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
      },
      onError: (error) => console.error(error),
    }
  )

  return {
    move,
    isMoving,
    update,
    updateIsLoading,
  }
}
