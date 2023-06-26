import { useMutation, useQueryClient } from "@tanstack/react-query"

import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useShips = () => {
  const queryClient = useQueryClient()

  const { mutate: remove, isLoading: removingIsLoading } = useMutation(
    ({ shipId }: { shipId: Ship["id"] }) =>
      apiRequest(`/api/ship/remove/${shipId}`, { shipId }, "DELETE"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  return {
    remove,
    removingIsLoading,
  }
}
