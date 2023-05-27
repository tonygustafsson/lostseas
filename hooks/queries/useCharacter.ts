import { useMutation, useQueryClient } from "@tanstack/react-query"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useCharacterMutations = () => {
  const queryClient = useQueryClient()

  const { mutate: travel, isLoading: travelIsLoading } = useMutation(
    async (data: { userId: Player["id"]; town: Town }) => {
      const inputData = await fetch("/api/character/travel", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const result = await inputData.json()

      return result
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: move, isLoading: isMoving } = useMutation(
    async (data: {
      userId: Player["id"]
      location: TownLocation | SeaLocation
    }) => {
      const inputData = await fetch("/api/character/move", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const result = await inputData.json()

      return result
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
      },
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
