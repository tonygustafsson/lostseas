import { useMutation, useQueryClient } from "@tanstack/react-query"

import useSound from "@/app/stores/sound"
import { useToasts } from "@/app/stores/toasts"
import { APOTHECARY_REMEDIES, type Remedy } from "@/constants/apothecary"
import { MERCHANDISE } from "@/constants/merchandise"
import apiRequest from "@/utils/apiRequest"
import { getRemedyResult } from "@/utils/apothecary"
import { formatGold } from "@/utils/number"
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

            const dbUpdate: DeepPartial<Player> = {
              character: {
                gold: previous.character.gold - totalPrice,
              },
              inventory: {
                [item]: prevQuantity + stateItem.quantity,
              },
              locationStates: {
                market: {
                  items: {
                    [item]: null,
                  },
                },
              },
            }

            const newPlayer = patchDeep(previous, dbUpdate)
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
          message: `It cost you ${formatGold(totalPrice)} and your now have ${totalQuantity} ${unit} of ${item}`,
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

  const { mutate: buyRemedy, isPending: isBuyingRemedy } = useMutation({
    mutationFn: (data: { remedy: Remedy }) =>
      apiRequest("/api/market/remedy", data, "POST"),
    onMutate: async (data: { remedy: Remedy }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const { hasCrew, healed, newHealth, price } = getRemedyResult(
          previous.crewMembers,
          data.remedy
        )

        // Only show the change straight away when the server will accept it
        if (hasCrew && healed > 0 && price <= previous.character.gold) {
          const newPlayer = patchDeep(previous, {
            character: { gold: previous.character.gold - price },
            crewMembers: { health: newHealth },
          })

          queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
        }
      }

      return { previous }
    },
    onSuccess: (response, _, context) => {
      const { updatedPlayer, error, remedy, newHealth } = response?.data

      if (error) {
        handleError("Could not buy the remedy", error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      setToast({
        title: `You bought ${APOTHECARY_REMEDIES[remedy as Remedy].label}`,
        message: `Your crew's health is now ${newHealth}%.`,
        variant: "success",
      })

      playSoundEffect("coins")
    },
    onError: (error, _, context) => {
      handleError("Could not buy the remedy", String(error), context?.previous)
    },
  })

  return {
    acceptMarketBargain,
    isAcceptingMarketBargain,
    buyRemedy,
    isBuyingRemedy,
  }
}
