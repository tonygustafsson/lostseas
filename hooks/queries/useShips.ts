import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useModal } from "@/components/ui/Modal/context"
import { useToast } from "@/components/ui/Toast/context"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useShips = () => {
  const queryClient = useQueryClient()
  const { removeModal } = useModal()
  const { setToast } = useToast()

  const { mutate: rename, isLoading: isRenaming } = useMutation(
    ({ id, name }: { id: Ship["id"]; name: Ship["name"] }) =>
      apiRequest(`/api/ship/rename/${id}`, { name }, "POST"),
    {
      onSuccess: (response) => {
        const { name, ship } = response?.data
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

        removeModal("renameShip")

        setToast({
          title: `You renamed the ship to ${name}`,
          message: `You renamed your ${ship.type} to ${name}`,
          variant: "success",
        })
      },
      onError: (error) => {
        console.error(error)

        setToast({
          title: `Could not rename ship`,
          message: `Something went wrong when you tried to change the name of the ship.`,
          variant: "error",
        })
      },
    }
  )

  const { mutate: remove, isLoading: isRemoving } = useMutation(
    ({ shipId }: { shipId: Ship["id"] }) =>
      apiRequest(`/api/ship/remove/${shipId}`, { shipId }, "DELETE"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  return {
    remove,
    isRemoving,
    rename,
    isRenaming,
  }
}
