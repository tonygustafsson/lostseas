import { useMutation, useQueryClient } from "@tanstack/react-query"

import useSound from "@/app/stores/sound"
import { useToasts } from "@/app/stores/toasts"
import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_REPAIR_COST, SHIP_TYPES } from "@/constants/ship"
import apiRequest from "@/utils/apiRequest"
import { dbPatchToObj } from "@/utils/dbUpdateToObj"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useShipyard = () => {
  const queryClient = useQueryClient()
  const setToast = useToasts((s) => s.setToast)
  const { playSoundEffect } = useSound()

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

        const playerUpdates = {
          "character/gold": previous.character.gold - totalPrice,
        } satisfies PlayerDB

        const newPlayer = dbPatchToObj(previous, playerUpdates)
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
        message: `It cost you ${totalPrice} gold.`,
        variant: "success",
      })

      playSoundEffect("tools")
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

        const playerUpdates = {
          "character/gold": previous.character.gold + totalPrice,
          [`ships/${id}`]: null,
        } satisfies PlayerDB

        const newPlayer = dbPatchToObj(previous, playerUpdates)
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
        message: `It received ${totalPrice} gold.`,
        variant: "success",
      })

      playSoundEffect("coins")
    },
    onError: (err, variables, context: { previous?: Player } | undefined) => {
      handleError(`Could not sell your ship`, String(err), context?.previous)
    },
  })

  const { mutate: buyFittings, isPending: isBuyingFittings } = useMutation({
    mutationFn: (data: { item: keyof Inventory; quantity: number }) =>
      apiRequest("/api/shipyard/buyFittings", data, "POST"),
    onMutate: async (data: { item: keyof Inventory; quantity: number }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const price =
          MERCHANDISE[data.item as keyof typeof MERCHANDISE].buy * data.quantity
        const prevQuantity = previous.inventory?.[data.item] ?? 0

        console.log({ price, prevGold: previous.character.gold, prevQuantity })

        const playerUpdates = {
          "character/gold": previous.character.gold - price,
          [`inventory/${data.item}`]: prevQuantity + data.quantity,
        } satisfies PlayerDB

        const newPlayer = dbPatchToObj(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onSuccess: (response, _, context) => {
      const {
        updatedPlayer,
        error,
        quantity,
        item,
        totalPrice,
        totalQuantity,
      } = response?.data

      if (error) {
        handleError(`Could not buy ${item}`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      const unit =
        quantity === 1
          ? MERCHANDISE[item as keyof Inventory].singleUnit
          : MERCHANDISE[item as keyof Inventory].unit

      setToast({
        title: `You bought ${quantity} ${unit} of ${item}`,
        message: `It cost you ${totalPrice} gold and your now have ${totalQuantity} ${unit} of ${item}`,
        variant: "success",
      })

      playSoundEffect("coins")
    },
    onError: (err, variables, context: { previous?: Player } | undefined) => {
      handleError(
        `Could not buy ${variables?.item}`,
        String(err),
        context?.previous
      )
    },
  })

  const { mutate: sellFittings, isPending: isSellingFittings } = useMutation({
    mutationFn: (data: { item: keyof Inventory; quantity: number }) =>
      apiRequest("/api/shipyard/sellFittings", data, "POST"),
    onMutate: async (data: { item: keyof Inventory; quantity: number }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const price =
          MERCHANDISE[data.item as keyof typeof MERCHANDISE].sell *
          data.quantity
        const prevQuantity = previous.inventory?.[data.item] ?? 0

        const playerUpdates = {
          "character/gold": previous.character.gold + price,
          [`inventory/${data.item}`]: prevQuantity - data.quantity,
        } satisfies PlayerDB

        const newPlayer = dbPatchToObj(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onSuccess: (response, _, context) => {
      const {
        updatedPlayer,
        error,
        quantity,
        item,
        totalPrice,
        totalQuantity,
      } = response?.data

      if (error) {
        handleError(`Could not sell ${item}`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      const unit =
        quantity === 1
          ? MERCHANDISE[item as keyof Inventory].singleUnit
          : MERCHANDISE[item as keyof Inventory].unit

      setToast({
        title: `You sold ${quantity} ${unit} of ${item}`,
        message: `It received ${totalPrice} gold and your now have ${totalQuantity} ${unit} of ${item}`,
        variant: "success",
      })
    },
    onError: (err, variables, context: { previous?: Player } | undefined) => {
      handleError(
        `Could not sell ${variables?.item}`,
        String(err),
        context?.previous
      )
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

        const playerUpdates = {
          "character/gold": previous.character.gold - totalPrice,
          [`ships/${id}`]: {
            ...ship,
            health: 100,
          },
        } satisfies PlayerDB

        const newPlayer = dbPatchToObj(previous, playerUpdates)
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
        message: `It costed you ${totalPrice} gold.`,
        variant: "success",
      })
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
    buyFittings,
    isBuyingFittings,
    sellFittings,
    isSellingFittings,
    repairShip,
    isRepairingShip,
  }
}
