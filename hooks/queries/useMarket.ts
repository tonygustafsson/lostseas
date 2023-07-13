import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useSound } from "@/components/Sound/context"
import { useToast } from "@/components/ui/Toast/context"
import { MERCHANDISE } from "@/constants/merchandise"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useMarket = () => {
  const queryClient = useQueryClient()
  const { setToast } = useToast()
  const { playSoundEffect } = useSound()

  const { mutate: acceptMarketBargain, isLoading: isAcceptingMarketBargain } =
    useMutation(
      (data: { item: keyof LocationStateMarketItems }) =>
        apiRequest("/api/market/accept", data, "POST"),
      {
        onSuccess: ({ error, quantity, item, totalPrice, totalQuantity }) => {
          if (error) {
            setToast({
              title: `Could not accept ${item}`,
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

  return {
    acceptMarketBargain,
    isAcceptingMarketBargain,
  }
}
