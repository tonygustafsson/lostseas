import { useMutation, useQueryClient } from "@tanstack/react-query"

import useSound from "@/app/stores/sound"
import { useToasts } from "@/app/stores/toasts"
import { MERCHANDISE } from "@/constants/merchandise"
import apiRequest from "@/utils/apiRequest"
import { dbPatchToObj } from "@/utils/dbUpdateToObj"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useShop = () => {
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

  const { mutate: buy, isPending: isBuying } = useMutation({
    mutationFn: (data: { item: keyof Inventory; quantity: number }) =>
      apiRequest("/api/shop/buy", data, "POST"),
    onMutate: async (data: { item: keyof Inventory; quantity: number }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })
      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const price =
          MERCHANDISE[data.item as keyof typeof MERCHANDISE].buy * data.quantity
        const prevQuantity = previous.inventory?.[data.item] ?? 0

        const playerUpdates = {
          "character/gold": previous.character.gold - price,
          [`inventory/${data.item}`]: prevQuantity + data.quantity,
        } satisfies PlayerDB

        const newPlayer = dbPatchToObj(previous, playerUpdates)

        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onError: (err: any, variables, context: any) => {
      handleError(
        `Could not buy ${variables.item}`,
        err?.message,
        context?.previous
      )
    },
    onSuccess: (response, _, context) => {
      const { error, quantity, item, totalPrice, totalQuantity } =
        response?.data

      if (error) {
        handleError(`Could not buy ${item}`, error, context?.previous)
        return
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
  })

  const { mutate: sell, isPending: isSelling } = useMutation({
    mutationFn: (data: { item: keyof Inventory; quantity: number }) =>
      apiRequest("/api/shop/sell", data, "POST"),
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
    onError: (err: any, variables, context: any) => {
      handleError(
        `Could not sell ${variables.item}`,
        err?.message,
        context?.previous
      )
    },
    onSuccess: (response, _, context) => {
      const { error, quantity, item, totalPrice, totalQuantity } =
        response?.data

      if (error) {
        handleError(`Could not sell ${item}`, error, context?.previous)
        return
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

      playSoundEffect("coins")
    },
  })

  const { mutate: buyNecessities, isPending: isBuyingNecessities } =
    useMutation({
      mutationFn: (days: number) =>
        apiRequest("/api/shop/buyNecessities", { days }, "POST"),
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

        queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })

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
    })

  const { mutate: sellBarterGoods, isPending: isSellingBarterGoods } =
    useMutation({
      mutationFn: () => apiRequest("/api/shop/sellBarterGoods", null, "POST"),
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

        queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })

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
