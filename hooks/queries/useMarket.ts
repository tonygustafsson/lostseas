import { useMutation, useQueryClient } from "@tanstack/react-query"

import useSound from "@/app/stores/sound"
import { useToasts } from "@/app/stores/toasts"
import { MERCHANDISE } from "@/constants/merchandise"
import apiRequest from "@/utils/apiRequest"
import { patchDeep } from "@/utils/patchDeep"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useMarket = () => {
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

  const { mutate: acceptMarketBargain, isPending: isAcceptingMarketBargain } =
    useMutation({
      mutationFn: (data: { item: keyof LocationStateMarketItems }) =>
        apiRequest("/api/market/accept", data, "POST"),
      onMutate: async (data: { item: keyof LocationStateMarketItems }) => {
        await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

        const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

        if (previous) {
          const item = data.item
          const stateItem = previous.locationStates?.market?.items?.[item]

          if (stateItem) {
            const totalPrice = stateItem.price * stateItem.quantity
            const prevQuantity = previous.inventory?.[item] ?? 0
            const marketItems =
              previous.locationStates?.market?.items ??
              ({} as LocationStateMarketItems)
            const { [item]: _, ...remainingMarketItems } = marketItems

            const playerUpdates: DeepPartial<Player> = {
              character: {
                gold: previous.character.gold - totalPrice,
              },
              inventory: {
                [item]: prevQuantity + stateItem.quantity,
              },
              locationStates: {
                market: {
                  items: remainingMarketItems,
                },
              },
            }

            const newPlayer = patchDeep(previous, playerUpdates)

            queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
          }
        }

        return { previous }
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
          handleError(`Could not accept ${item}`, error, context?.previous)
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
      onError: (error, variables, context) => {
        handleError(
          `Could not accept ${variables?.item}`,
          String(error),
          context?.previous
        )
      },
    })

  return {
    acceptMarketBargain,
    isAcceptingMarketBargain,
  }
}
