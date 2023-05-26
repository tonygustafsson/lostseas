import { useMutation, useQueryClient } from "@tanstack/react-query"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useShipMutations = () => {
  const queryClient = useQueryClient()

  const { mutate: createShip, isLoading: creatingShipIsLoading } = useMutation(
    async (shipData: CreateShipClientRequest & { userId: Player["id"] }) => {
      const data = await fetch("/api/ship/create", {
        method: "PUT",
        body: JSON.stringify(shipData),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const shipId = await data.json()

      return shipId
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: removeShip, isLoading: removingShipIsLoading } = useMutation(
    async ({
      userId,
      shipId,
    }: {
      shipId: Ship["id"]
      userId: Player["id"]
    }) => {
      const url = `/api/ship/remove/${userId}/${shipId}`

      const data = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const response = await data.json()

      return response
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
      },
      onError: (error) => console.error(error),
    }
  )

  return {
    createShip,
    creatingShipIsLoading,
    removeShip,
    removingShipIsLoading,
  }
}
