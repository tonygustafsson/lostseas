import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useSound } from "@/components/Sound/context"
import { useToast } from "@/components/ui/Toast/context"
import { MERCHANDISE } from "@/constants/merchandise"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useShop = () => {
  const queryClient = useQueryClient()
  const { setToast } = useToast()
  const { playSoundEffect } = useSound()

  const { mutate: buy, isLoading: isBuying } = useMutation(
    (data: { item: keyof Inventory; quantity: number }) =>
      apiRequest("/api/shop/buy", data, "POST"),
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

  const { mutate: sell, isLoading: isSelling } = useMutation(
    (data: { item: keyof Inventory; quantity: number }) =>
      apiRequest("/api/shop/sell", data, "POST"),
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

        playSoundEffect("coins")
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: buyNecessities, isLoading: isBuyingNecessities } =
    useMutation(
      (days: number) =>
        apiRequest("/api/shop/buyNecessities", { days }, "POST"),
      {
        onSuccess: (response) => {
          const { error, foodNeeded, waterNeeded, cost } = response?.data

          if (error) {
            setToast({
              title: `Could not buy necessities`,
              message: error,
              variant: "error",
            })

            return
          }

          queryClient.invalidateQueries([PLAYER_QUERY_KEY])

          const foodUnit =
            foodNeeded === 1
              ? MERCHANDISE["food"].singleUnit
              : MERCHANDISE["food"].unit
          const waterUnit =
            waterNeeded === 1
              ? MERCHANDISE["water"].singleUnit
              : MERCHANDISE["water"].unit

          setToast({
            title: `You bought necessities for ${cost} gold`,
            message: `You got ${foodNeeded} ${foodUnit} food and ${waterNeeded} ${waterUnit} water.`,
            variant: "success",
          })

          playSoundEffect("coins")
        },
        onError: (error) => console.error(error),
      }
    )

  const { mutate: sellBarterGoods, isLoading: isSellingBarterGoods } =
    useMutation(() => apiRequest("/api/shop/sellBarterGoods", null, "POST"), {
      onSuccess: (response) => {
        const { error, value } = response?.data

        if (error) {
          setToast({
            title: `Could not sell barter goods`,
            message: error,
            variant: "error",
          })

          return
        }

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

        setToast({
          title: `You sold all barter goods`,
          message: `You received ${value} gold.`,
          variant: "success",
        })

        playSoundEffect("coins")
      },
      onError: (error) => console.error(error),
    })

  return {
    buy,
    isBuying,
    sell,
    isSelling,
    buyNecessities,
    isBuyingNecessities,
    sellBarterGoods,
    isSellingBarterGoods,
  }
}
