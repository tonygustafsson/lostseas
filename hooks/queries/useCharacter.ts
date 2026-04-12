import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useToasts } from "@/app/stores/toasts"
import apiRequest from "@/utils/apiRequest"
import { patchDeep } from "@/utils/patchDeep"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useCharacter = () => {
  const queryClient = useQueryClient()

  const setToast = useToasts((s) => s.setToast)

  const handleError = (
    title: string,
    message: string,
    previousState?: Player
  ) => {
    if (previousState) {
      queryClient.setQueryData([PLAYER_QUERY_KEY], previousState)
    }

    setToast({ title, message, variant: "error" })
  }

  const { mutate: move, isPending: isMoving } = useMutation({
    mutationFn: (data: {
      location: TownLocation | SeaLocation
      locationState?: DeepPartial<LocationStates>
    }) => apiRequest("/api/character/move", data, "POST"),
    onMutate: async (data: {
      location: TownLocation | SeaLocation
      locationState?: DeepPartial<LocationStates>
    }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const playerUpdates: DeepPartial<Player> = {
          character: {
            location: data.location,
          },
          ...(data.locationState && { locationStates: data.locationState }),
        }

        const newPlayer = patchDeep(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onError: (err, { location }, context) => {
      handleError(
        `Could not move to ${location}`,
        err?.message,
        context?.previous
      )
    },
    onSuccess: (response, { location }, context) => {
      const { updatedPlayer, error } = response?.data

      if (error) {
        handleError(`Could not move to ${location}`, error, context?.previous)
        return
      }

      queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
    },
  })

  const { mutate: update, isPending: updateIsLoading } = useMutation({
    mutationFn: (characterData: Partial<Character>) =>
      apiRequest("/api/character/update", characterData, "POST"),
    onMutate: async (characterData: Partial<Character>) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const playerUpdates: DeepPartial<Player> = {
          character: characterData,
        }

        const newPlayer = patchDeep(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onError: (err, _vars, context) => {
      handleError("Could not update character", err?.message, context?.previous)
    },
    onSuccess: (response, _vars, context) => {
      const { updatedPlayer, error } = response?.data

      if (error) {
        handleError("Could not update character", error, context?.previous)
        return
      }

      queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
    },
  })

  return {
    move,
    isMoving,
    update,
    updateIsLoading,
  }
}
