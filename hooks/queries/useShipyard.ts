import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useToasts } from "@/app/stores/toasts"
import { SHIP_REPAIR_COST, SHIP_TYPES } from "@/constants/ship"
import { PLAYER_QUERY_KEY } from "@/constants/system"
import apiRequest from "@/utils/apiRequest"
import { formatGold } from "@/utils/number"
import { patchDeep } from "@/utils/patchDeep"
import { playSoundEffect } from "@/utils/sound"

export const useShipyard = () => {
  const queryClient = useQueryClient()
  const setToast = useToasts((s) => s.setToast)

  const handleError = (
    title: string,
    message: string,
    previousState: Player | undefined
  ) => {
    if (previousState) {
      queryClient.setQueryData([PLAYER_QUERY_KEY], previousState)
    }

    setToast({
      title,
      message,
      variant: "error",
    })
  }

  const { mutate: buyShip, isPending: isBuyingShip } = useMutation({
    mutationFn: (data: { item: keyof typeof SHIP_TYPES }) =>
      apiRequest("/api/shipyard/buyShip", data, "POST"),
    onMutate: async (data: { item: keyof typeof SHIP_TYPES }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const shipType = data.item
        const totalPrice = SHIP_TYPES[shipType].buy

        const dbUpdate: DeepPartial<Player> = {
          character: {
            gold: previous.character.gold - totalPrice,
          },
        }

        const newPlayer = patchDeep(previous, dbUpdate)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onSuccess: (response, _, context) => {
      const { updatedPlayer, error, item, totalPrice } = response?.data

      if (error) {
        handleError(`Could not buy ${item}`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      setToast({
        title: `You bought a ${item}`,
        message: `It cost you ${formatGold(totalPrice)}.`,
        variant: "success",
      })

      playSoundEffect("hammer")
    },
    onError: (err, variables, context: { previous?: Player } | undefined) => {
      handleError(
        `Could not buy ${variables?.item}`,
        String(err),
        context?.previous
      )
    },
  })

  const { mutate: sellShip, isPending: isSellingShip } = useMutation({
    mutationFn: (data: { id: Ship["id"] }) =>
      apiRequest("/api/shipyard/sellShip", data, "POST"),
    onMutate: async (data: { id: Ship["id"] }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const id = data.id
        const ship = (previous.ships || {})[id]
        const totalPrice = SHIP_TYPES[ship.type as keyof typeof SHIP_TYPES].sell

        const dbUpdate: DeepPartial<Player> = {
          character: {
            gold: previous.character.gold + totalPrice,
          },
          ships: {
            [id]: null,
          },
        }

        const newPlayer = patchDeep(previous, dbUpdate)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onSuccess: (response, _, context) => {
      const { updatedPlayer, error, ship, totalPrice } = response?.data

      if (error) {
        handleError(`Could not sell your ship`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      setToast({
        title: `You sold your ${ship.type} ${ship.name}`,
        message: `It received ${formatGold(totalPrice)}.`,
        variant: "success",
      })

      playSoundEffect("transaction")
    },
    onError: (err, variables, context: { previous?: Player } | undefined) => {
      handleError(`Could not sell your ship`, String(err), context?.previous)
    },
  })

  const { mutate: repairShip, isPending: isRepairingShip } = useMutation({
    mutationFn: (data: { id: Ship["id"] }) =>
      apiRequest("/api/shipyard/repairShip", data, "POST"),
    onMutate: async (data: { id: Ship["id"] }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const id = data.id
        const ship = (previous.ships || {})[id]
        const totalPrice = (100 - ship.health) * SHIP_REPAIR_COST

        const dbUpdate: DeepPartial<Player> = {
          character: {
            gold: previous.character.gold - totalPrice,
          },
          ships: {
            [id]: {
              health: 100,
            },
          },
        }

        const newPlayer = patchDeep(previous, dbUpdate)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onSuccess: (response, _, context) => {
      const { updatedPlayer, error, ship, totalPrice } = response?.data

      if (error) {
        handleError(`Could not repair your ship`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      setToast({
        title: `You repaired your ${ship.type} ${ship.name}`,
        message: `It costed you ${formatGold(totalPrice)}.`,
        variant: "success",
      })

      playSoundEffect("hammer")
    },
    onError: (err, variables, context: { previous?: Player } | undefined) => {
      handleError(`Could not repair your ship`, String(err), context?.previous)
    },
  })

  return {
    buyShip,
    isBuyingShip,
    sellShip,
    isSellingShip,
    repairShip,
    isRepairingShip,
  }
}
