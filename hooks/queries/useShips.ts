import { useMutation, useQueryClient } from "@tanstack/react-query"

import useModal from "@/app/stores/modals"
import { useToasts } from "@/app/stores/toasts"
import apiRequest from "@/utils/apiRequest"
import { patchDeep } from "@/utils/patchDeep"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useShips = () => {
  const queryClient = useQueryClient()
  const { removeModal } = useModal()
  const setToast = useToasts((s) => s.setToast)

  const handleError = (
    title: string,
    message: string | undefined,
    previousState: Player | undefined
  ) => {
    if (previousState) {
      queryClient.setQueryData([PLAYER_QUERY_KEY], previousState)
    }

    setToast({
      title,
      message: message ?? "",
      variant: "error",
    })
  }

  const { mutate: rename, isPending: isRenaming } = useMutation({
    mutationFn: ({ id, name }: { id: Ship["id"]; name: Ship["name"] }) =>
      apiRequest(`/api/ship/rename/${id}`, { name }, "POST"),
    onMutate: async ({ id, name }: { id: Ship["id"]; name: Ship["name"] }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const playerUpdates: DeepPartial<Player> = {
          ships: {
            [id]: {
              name,
            },
          },
        }

        const newPlayer = patchDeep(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)

        removeModal("renameShip")
      }

      return { previous }
    },
    onSuccess: (response, _variables, context) => {
      const { name, ship, updatedPlayer, error } = response?.data

      if (error) {
        handleError(`Could not rename ship`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      setToast({
        title: `You renamed the ship to ${name}`,
        message: `You renamed your ${ship.type} to ${name}`,
        variant: "success",
      })
    },
    onError: (err: unknown, _variables, context) => {
      handleError(`Could not rename ship`, String(err), context?.previous)
    },
  })

  const { mutate: remove, isPending: isRemoving } = useMutation({
    mutationFn: ({ shipId }: { shipId: Ship["id"] }) =>
      apiRequest(`/api/ship/remove/${shipId}`, undefined, "DELETE"),
    onMutate: async ({ shipId }: { shipId: Ship["id"] }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const playerUpdates: DeepPartial<Player> = {
          ships: {
            [shipId]: null,
          },
        }

        const newPlayer = patchDeep(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onSuccess: (response, _variables, context) => {
      const { updatedPlayer, error } = response?.data

      if (error) {
        handleError(`Could not remove ship`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }
    },
    onError: (err: unknown, _variables, context) => {
      handleError(`Could not remove ship`, String(err), context?.previous)
    },
  })

  return {
    remove,
    isRemoving,
    rename,
    isRenaming,
  }
}
