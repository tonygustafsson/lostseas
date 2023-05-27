import { useMutation, useQueryClient } from "@tanstack/react-query"

import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useShips = () => {
  const queryClient = useQueryClient()

  const { mutate: create, isLoading: creatingIsLoading } = useMutation(
    (shipData: CreateShipClientRequest & { userId: Player["id"] }) =>
      apiRequest(`/api/ship/create`, shipData, "PUT"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  const { mutate: remove, isLoading: removingIsLoading } = useMutation(
    ({ userId, shipId }: { shipId: Ship["id"]; userId: Player["id"] }) =>
      apiRequest(
        `/api/ship/remove/${userId}/${shipId}`,
        { userId, shipId },
        "DELETE"
      ),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  return {
    create,
    creatingIsLoading,
    remove,
    removingIsLoading,
  }
}
