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
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

        setToast({
          title: "Item purchased",
          message: "You bought x of y for 500 dbl",
          autoHideDuration: 5000,
        })
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: sell, isLoading: isSelling } = useMutation(
    (data: { userId: Player["id"]; item: keyof Inventory; quantity: number }) =>
      apiRequest("/api/shop/sell", data, "POST"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

        setToast({
          message: "Item sold",
          autoHideDuration: 5000,
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
