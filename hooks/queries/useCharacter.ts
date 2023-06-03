import { useMutation, useQueryClient } from "@tanstack/react-query"

import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useCharacter = () => {
  const queryClient = useQueryClient()

  const { mutate: travel, isLoading: isTraveling } = useMutation(
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

  const { mutate: sailOut, isLoading: isSailingOut } = useMutation(
    (data: { userId: Player["id"] }) =>
      apiRequest("/api/character/sailout", data, "POST"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  const { mutate: update, isLoading: updateIsLoading } = useMutation(
    (userData: UpdatePlayerClientRequest) =>
      apiRequest("/api/character/update", userData, "POST"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
      },
      onError: (error) => console.error(error),
    }
  )

  return {
    travel,
    isTraveling,
    move,
    isMoving,
    sailOut,
    isSailingOut,
    update,
    updateIsLoading,
  }
}
