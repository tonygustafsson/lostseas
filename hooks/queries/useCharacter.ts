import { useMutation, useQueryClient } from "@tanstack/react-query"

import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

const SEA_TRAVEL_SPEED = 3000 // Milliseconds per step

export const useCharacter = () => {
  const queryClient = useQueryClient()

  const { mutate: startJourney, isLoading: isStartingJourney } = useMutation(
    (data: { town: Town }) =>
      apiRequest("/api/character/startJourney", data, "POST"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

        setTimeout(() => continueJourney(), SEA_TRAVEL_SPEED)
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: continueJourney, isLoading: isContinueingJourney } =
    useMutation(
      () => apiRequest("/api/character/continueJourney", null, "POST"),
      {
        onSuccess: ({
          destinationReached,
          error,
        }: Character["journey"] & {
          success: boolean
          destinationReached: boolean
          error?: string
        }) => {
          queryClient.invalidateQueries([PLAYER_QUERY_KEY])

          if (!error && !destinationReached) {
            setTimeout(() => continueJourney(), SEA_TRAVEL_SPEED)
          }
        },
        onError: (error) => console.error(error),
      }
    )

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
    startJourney,
    isStartingJourney,
    continueJourney,
    isContinueingJourney,
    move,
    isMoving,
    update,
    updateIsLoading,
  }
}
