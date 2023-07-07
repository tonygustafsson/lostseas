import { useMutation, useQueryClient } from "@tanstack/react-query"

import apiRequest from "@/utils/apiRequest"

import { useCharacter } from "./useCharacter"
import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useSea = () => {
  const queryClient = useQueryClient()
  const { continueJourney } = useCharacter()

  const { mutate: ignoreShip, isLoading: isIgnoringShip } = useMutation(
    () => apiRequest("/api/sea/ignoreShip", null, "POST"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

        continueJourney()
      },
      onError: (error) => console.error(error),
    }
  )

  return {
    ignoreShip,
    isIgnoringShip,
  }
}
