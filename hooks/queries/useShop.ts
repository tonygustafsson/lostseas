import { useMutation, useQueryClient } from "@tanstack/react-query"

import useSound from "@/app/stores/sound"
import { useToasts } from "@/app/stores/toasts"
import apiRequest from "@/utils/apiRequest"
import {
  applyTradeChanges,
  getTradeToast,
  type TradeChange,
} from "@/utils/shop"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useShop = () => {
  const queryClient = useQueryClient()
  const setToast = useToasts((s) => s.setToast)
  const { playSoundEffect } = useSound()

  const { mutate: trade, isPending: isTrading } = useMutation({
    // Throws on a failed trade, so callers' onSuccess only runs when it worked
    mutationFn: async (changes: TradeChange[]) => {
      const response = await apiRequest("/api/shop/trade", { changes }, "POST")
      const data = response?.data

      if (!data?.updatedPlayer || data.error) {
        throw new Error(
          typeof data?.error === "string" ? data.error : "Something went wrong"
        )
      }

      return data
    },
    onMutate: async (changes: TradeChange[]) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })
      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        queryClient.setQueryData(
          [PLAYER_QUERY_KEY],
          applyTradeChanges(previous, changes)
        )
      }

      return { previous }
    },
    onError: (error: Error, _, context) => {
      if (context?.previous) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], context.previous)
      }

      setToast({
        title: "Could not complete the trade",
        message: error.message,
        variant: "error",
      })
    },
    onSuccess: (data) => {
      queryClient.setQueryData([PLAYER_QUERY_KEY], data.updatedPlayer)

      setToast({ ...getTradeToast(data), variant: "success" })

      playSoundEffect("coins")
    },
  })

  return { trade, isTrading }
}
