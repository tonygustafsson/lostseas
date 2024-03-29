import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useSound } from "@/components/Sound/context"
import { useToast } from "@/components/ui/Toast/context"
import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_TYPES } from "@/constants/ship"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useShipyard = () => {
  const queryClient = useQueryClient()
  const { setToast } = useToast()
  const { playSoundEffect } = useSound()

  const { mutate: buyShip, isLoading: isBuyingShip } = useMutation(
    (data: { item: keyof typeof SHIP_TYPES }) =>
      apiRequest("/api/shipyard/buyShip", data, "POST"),
    {
      onSuccess: (response) => {
        const { error, item, totalPrice } = response?.data

        if (error) {
          setToast({
            title: `Could not buy ${item}`,
            message: error,
            variant: "error",
          })

          return
        }

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

        setToast({
          title: `You bought a ${item}`,
          message: `It cost you ${totalPrice} gold.`,
          variant: "success",
        })

        playSoundEffect("tools")
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: sellShip, isLoading: isSellingShip } = useMutation(
    (data: { id: Ship["id"] }) =>
      apiRequest("/api/shipyard/sellShip", data, "POST"),
    {
      onSuccess: (response) => {
        const { error, ship, totalPrice } = response?.data

        if (error) {
          setToast({
            title: `Could not sell your ship`,
            message: error,
            variant: "error",
          })

          return
        }

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

        setToast({
          title: `You sold your ${ship.type} ${ship.name}`,
          message: `It received ${totalPrice} gold.`,
          variant: "success",
        })

        playSoundEffect("coins")
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: buyFittings, isLoading: isBuyingFittings } = useMutation(
    (data: { item: keyof Inventory; quantity: number }) =>
      apiRequest("/api/shipyard/buyFittings", data, "POST"),
    {
      onSuccess: (response) => {
        const { error, quantity, item, totalPrice, totalQuantity } =
          response?.data

        if (error) {
          setToast({
            title: `Could not buy ${item}`,
            message: error,
            variant: "error",
          })

          return
        }

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

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
      onError: (error) => console.error(error),
    }
  )

  const { mutate: sellFittings, isLoading: isSellingFittings } = useMutation(
    (data: { item: keyof Inventory; quantity: number }) =>
      apiRequest("/api/shipyard/sellFittings", data, "POST"),
    {
      onSuccess: (response) => {
        const { error, quantity, item, totalPrice, totalQuantity } =
          response?.data

        if (error) {
          setToast({
            title: `Could not sell ${item}`,
            message: error,
            variant: "error",
          })

          return
        }

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

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
      onError: (error) => console.error(error),
    }
  )

  const { mutate: repairShip, isLoading: isRepairingShip } = useMutation(
    (data: { id: Ship["id"] }) =>
      apiRequest("/api/shipyard/repairShip", data, "POST"),
    {
      onSuccess: (response) => {
        const { error, ship, totalPrice } = response?.data

        if (error) {
          setToast({
            title: `Could not repair your ship`,
            message: error,
            variant: "error",
          })

          return
        }

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

        setToast({
          title: `You repaired your ${ship.type} ${ship.name}`,
          message: `It costed you ${totalPrice} gold.`,
          variant: "success",
        })
      },
      onError: (error) => console.error(error),
    }
  )

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
