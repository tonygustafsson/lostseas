import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useToast } from "@/components/ui/Toast/context"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useInventory = () => {
  const queryClient = useQueryClient()
  const { setToast } = useToast()

  const { mutate: buy, isLoading: isBuying } = useMutation(
    (data: { userId: Player["id"]; item: keyof Inventory; quantity: number }) =>
      apiRequest("/api/shop/buy", data, "POST"),
    {
      onSuccess: ({ error, quantity, item, totalPrice, totalQuantity }) => {
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
          title: `You bought ${quantity} pcs of ${item}`,
          message: `It cost you ${totalPrice} dbl and your now have ${totalQuantity} pcs of ${item}`,
          variant: "success",
        })
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: sell, isLoading: isSelling } = useMutation(
    (data: { userId: Player["id"]; item: keyof Inventory; quantity: number }) =>
      apiRequest("/api/shop/sell", data, "POST"),
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

        setToast({
          title: `You sold ${quantity} pcs of ${item}`,
          message: `It received ${totalPrice} dbl and your now have ${totalQuantity} pcs of ${item}`,
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
