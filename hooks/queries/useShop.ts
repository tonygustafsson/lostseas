import { useMutation, useQueryClient } from "@tanstack/react-query"

import useSound from "@/app/stores/sound"
import { useToasts } from "@/app/stores/toasts"
import {
  BARTER_GOODS,
  isTradeGoodAvailableInTown,
  MERCHANDISE,
} from "@/constants/merchandise"
import apiRequest from "@/utils/apiRequest"
import { patchDeep } from "@/utils/patchDeep"
import { getBarterGoodsValue, getNecessitiesInfo } from "@/utils/shop"

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

        const playerUpdates: DeepPartial<Player> = {
          character: {
            gold: previous.character.gold - price,
          },
          inventory: {
            [data.item]: prevQuantity + data.quantity,
          },
        }

        const newPlayer = patchDeep(previous, playerUpdates)

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

        const playerUpdates: DeepPartial<Player> = {
          character: {
            gold: previous.character.gold + price,
          },
          inventory: {
            [data.item]: prevQuantity - data.quantity,
          },
        }

        const newPlayer = patchDeep(previous, playerUpdates)
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

      playSoundEffect("coins")
    },
  })

  const { mutate: buyNecessities, isPending: isBuyingNecessities } =
    useMutation({
      mutationFn: (days: number) =>
        apiRequest("/api/shop/buyNecessities", { days }, "POST"),
      onMutate: async (days: number) => {
        await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

        const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

        if (previous) {
          const { cost, foodNeeded, waterNeeded } = getNecessitiesInfo({
            crewMembers: previous.crewMembers.count || 0,
            currentFood: previous.inventory?.food || 0,
            currentWater: previous.inventory?.water || 0,
            days,
          })

          const playerUpdates: DeepPartial<Player> = {
            character: {
              gold: previous.character.gold - cost,
            },
            inventory: {
              food: (previous.inventory?.food || 0) + foodNeeded,
              water: (previous.inventory?.water || 0) + waterNeeded,
            },
          }

          const newPlayer = patchDeep(previous, playerUpdates)

          queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
        }

        return { previous }
      },
      onError: (err: any, variables, context: any) => {
        handleError(
          `Could not buy necessities`,
          err?.message,
          context?.previous
        )
      },
      onSuccess: (response, _, context) => {
        const { updatedPlayer, error, foodNeeded, waterNeeded, cost } =
          response?.data

        if (error) {
          handleError(`Could not buy necessities`, error, context?.previous)
          return
        }

        if (updatedPlayer) {
          queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
        }

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
    })

  const { mutate: sellBarterGoods, isPending: isSellingBarterGoods } =
    useMutation({
      mutationFn: () => apiRequest("/api/shop/sellBarterGoods", null, "POST"),
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

        const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

        if (previous) {
          const town = previous.character.town
          const value = getBarterGoodsValue(previous)

          // Zero out only town-available barter goods (mirrors server logic)
          const inventoryUpdate = Object.fromEntries(
            BARTER_GOODS.filter((item) =>
              isTradeGoodAvailableInTown(item as keyof Inventory, town)
            ).map((item) => [item, 0])
          )

          const playerUpdates: DeepPartial<Player> = {
            character: {
              gold: previous.character.gold + value,
            },
            inventory: inventoryUpdate,
          }

          const newPlayer = patchDeep(previous, playerUpdates)
          queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
        }

        return { previous }
      },
      onError: (err: any, _, context: any) => {
        handleError(
          `Could not sell barter goods`,
          err?.message,
          context?.previous
        )
      },
      onSuccess: (response, _, context) => {
        const { updatedPlayer, error, value } = response?.data

        if (error) {
          handleError(`Could not sell barter goods`, error, context?.previous)
          return
        }

        if (updatedPlayer) {
          queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
        }

        setToast({
          title: `You sold all barter goods`,
          message: `You received ${value} gold.`,
          variant: "success",
        })

        playSoundEffect("coins")
      },
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
