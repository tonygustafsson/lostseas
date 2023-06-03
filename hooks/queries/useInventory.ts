import { useMutation, useQueryClient } from "@tanstack/react-query"

import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useInventory = () => {
  const queryClient = useQueryClient()

  const { mutate: buy, isLoading: isBuying } = useMutation(
    (data: { userId: Player["id"]; item: keyof Inventory }) =>
      apiRequest("/api/shop/buy", data, "POST"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  const { mutate: sell, isLoading: isSelling } = useMutation(
    (data: { userId: Player["id"]; item: keyof Inventory }) =>
      apiRequest("/api/shop/sell", data, "POST"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
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
