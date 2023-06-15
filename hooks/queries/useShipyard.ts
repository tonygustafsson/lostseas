import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useToast } from "@/components/ui/Toast/context"
import { MERCHANDISE } from "@/constants/merchandise"
import { SHIP_TYPES } from "@/constants/ship"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useShipyard = () => {
  const queryClient = useQueryClient()
  const { setToast } = useToast()

  const { mutate: buy, isLoading: isBuying } = useMutation(
    (data: { playerId: Player["id"]; item: keyof typeof SHIP_TYPES }) =>
      apiRequest("/api/shipyard/buy", data, "POST"),
    {
      onSuccess: ({ error, item, totalPrice }) => {
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
          message: `It cost you ${totalPrice} dbl.`,
          variant: "success",
        })
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: sell, isLoading: isSelling } = useMutation(
    (data: {
      playerId: Player["id"]
      item: keyof Inventory
      quantity: number
    }) => apiRequest("/api/shop/sell", data, "POST"),
    {
      onSuccess: ({ error, quantity, item, totalPrice, totalQuantity }) => {
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
          message: `It received ${totalPrice} dbl and your now have ${totalQuantity} ${unit} of ${item}`,
          variant: "success",
        })
      },
      onError: (error) => console.error(error),
    }
  )

  return {
    buy,
    isBuying,
    sell,
    isSelling,
  }
}
