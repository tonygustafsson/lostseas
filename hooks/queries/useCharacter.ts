import { useMutation, useQueryClient } from "@tanstack/react-query"

import { PLAYER_QUERY_KEY } from "./usePlayer"

const apiRequest = async (url: string, data: any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error(`An error occurred while fetching the data from ${url}`)
    }

    const result = await response.json()

    return result
  } catch (error) {
    console.error(error)
  }
}

export const useCharacterMutations = () => {
  const queryClient = useQueryClient()

  const { mutate: travel, isLoading: travelIsLoading } = useMutation(
    (data: { userId: Player["id"]; town: Town }) =>
      apiRequest("/api/character/travel", data),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  const { mutate: move, isLoading: isMoving } = useMutation(
    (data: { userId: Player["id"]; location: TownLocation | SeaLocation }) =>
      apiRequest("/api/character/move", data),
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
