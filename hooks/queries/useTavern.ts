import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useToasts } from "@/app/stores/toasts"
import { PLAYER_QUERY_KEY } from "@/constants/system"
import { TAVERN_ITEMS } from "@/constants/tavern"
import apiRequest from "@/utils/apiRequest"
import { increaseCrewMood } from "@/utils/crew"
import { formatGold } from "@/utils/number"
import { patchDeep } from "@/utils/patchDeep"
import { playSoundEffect } from "@/utils/sound"

export type TavernFightResult = {
  numberOfSailors: number
  success: boolean
  loot: number
  healthLoss: number
}

export const useTavern = () => {
  const queryClient = useQueryClient()
  const setToast = useToasts((s) => s.setToast)

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

  const { mutate: treatCrew, isPending: isTreatingCrew } = useMutation({
    mutationFn: (data: { item: keyof typeof TAVERN_ITEMS }) =>
      apiRequest("/api/tavern/treat-crew", data, "POST"),
    onMutate: async (data: { item: keyof typeof TAVERN_ITEMS }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const tavernItem = data.item
        const totalPrice =
          TAVERN_ITEMS[tavernItem].price * (previous.crewMembers.count || 0)

        const healthIncrease = TAVERN_ITEMS[tavernItem].healthIncrease
        const moodIncrease = TAVERN_ITEMS[tavernItem].moodIncrease

        const newMood = increaseCrewMood(
          previous.crewMembers.mood,
          moodIncrease
        )
        const newHealth =
          previous.crewMembers.health + healthIncrease > 100
            ? 100
            : previous.crewMembers.health + healthIncrease

        const playerUpdates: DeepPartial<Player> = {
          character: {
            gold: previous.character.gold - totalPrice,
          },
          crewMembers: {
            mood: newMood,
            health: newHealth,
          },
        }

        const newPlayer = patchDeep(previous, playerUpdates)

        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onSuccess: (response, { item }, context) => {
      const { updatedPlayer, error, newMood, newHealth, totalPrice } =
        response?.data
      const action = TAVERN_ITEMS[item].label.toLowerCase()

      if (error) {
        handleError(`Could not ${action}`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      setToast({
        title: `You chose to ${action} with your crew`,
        message: `It cost you ${formatGold(totalPrice)} and your crew now have the health ${newHealth} and mood ${newMood}`,
        variant: "success",
      })

      playSoundEffect("victory")
    },
    onError: (err: any, { item }, context: any) => {
      handleError(
        `Could not ${TAVERN_ITEMS[item].label.toLowerCase()}`,
        err,
        context?.previous
      )
    },
  })

  const { mutate: acceptNewCrewMembers, isPending: isAcceptingNewCrewMembers } =
    useMutation({
      mutationFn: () =>
        apiRequest("/api/tavern/acceptNewCrewMembers", null, "POST"),
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

        const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

        if (previous) {
          const numberOfSailors =
            previous?.locationStates?.tavern?.noOfSailors || 0

          const playerUpdates: DeepPartial<Player> = {
            crewMembers: {
              count: previous.crewMembers.count + numberOfSailors,
            },
            locationStates: {
              tavern: {
                noOfSailors: 0,
              },
            },
          }

          const newPlayer = patchDeep(previous, playerUpdates)
          queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
        }

        return { previous }
      },
      onSuccess: (response, _, context) => {
        const { updatedPlayer, error, numberOfSailors } = response?.data

        if (error) {
          handleError(
            `Could not accept new crew members`,
            error,
            context?.previous
          )
          return
        }

        if (updatedPlayer) {
          queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
        }

        setToast({
          title: `You took ${numberOfSailors} in as your crew`,
          message: `Your whole crew couldn't be happier`,
          variant: "success",
        })

        playSoundEffect("victory")
      },
      onError: (err: any, _, context: any) => {
        handleError(`Could not accept new crew members`, err, context?.previous)
      },
    })

  // No optimistic update, the sailors stay in the dialog until the fight result arrives
  const fight = useMutation({
    mutationFn: () => apiRequest("/api/tavern/fightSailors", null, "POST"),
    onSuccess: (response) => {
      const { updatedPlayer, error, success } = response?.data

      if (error) {
        handleError(`Could not fight sailors`, error, undefined)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      playSoundEffect(success ? "victory" : "defeat")
    },
    onError: (err: any) => {
      handleError(`Could not fight sailors`, err, undefined)
    },
  })

  const fightData = fight.data?.data
  const fightResult: TavernFightResult | undefined =
    fightData && !fightData.error ? fightData : undefined

  const { mutate: ignoreSailors, isPending: isIgnoringSailors } = useMutation({
    mutationFn: () =>
      apiRequest("/api/tavern/ignoreSailors", null, "POST") as Promise<any>,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const playerUpdates: DeepPartial<Player> = {
          locationStates: {
            tavern: {
              noOfSailors: 0,
            },
          },
        }

        const newPlayer = patchDeep(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onSuccess: (
      response: {
        data: {
          updatedPlayer?: Player
          error?: string
          numberOfSailors: number
        }
      },
      _,
      context
    ) => {
      const { updatedPlayer, error, numberOfSailors } = response?.data

      if (error) {
        handleError(`Could not ignore sailors`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      setToast({
        title: `You ignored the ${numberOfSailors} sailors`,
        message: `You said "No thank you" and just walked away`,
        variant: "success",
      })
    },
    onError: (err: any, _, context: any) => {
      handleError(`Could not ignore sailors`, err, context?.previous)
    },
  })

  const { mutateAsync: playCards, isPending: isPlayingCard } = useMutation({
    mutationFn: (data: { betPercentage: number; selectedCard: number }) =>
      // Use mutateAsync since client cannot predict if he will win
      apiRequest("/api/tavern/cards", data, "POST"),
    onSuccess: (response) => {
      const { updatedPlayer, error, bet, gold, cardsResults } = response?.data

      if (error) {
        handleError(`Could not place bet`, error, undefined)
        return
      }

      let title = ""

      if (cardsResults === "won") {
        title = `You made a bet of ${formatGold(bet)} and won!`
      } else {
        title = `You made a bet of ${formatGold(bet)} and lost`
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      setToast({
        title,
        message: `You now have ${formatGold(gold)} in total.`,
        variant: cardsResults === "won" ? "success" : "error",
      })

      if (cardsResults === "won") {
        playSoundEffect("victory")
      } else {
        playSoundEffect("frustration")
      }
    },
    onError: (err: any, _, context: any) => {
      handleError(`Could not place bet`, err, context?.previous)
    },
  })

  return {
    treatCrew,
    isTreatingCrew,
    acceptNewCrewMembers,
    isAcceptingNewCrewMembers,
    fightSailors: fight.mutate,
    isFightingSailors: fight.isPending,
    fightResult,
    /** Closes the fight result, the dialog was the only thing showing it */
    dismissFightResult: fight.reset,
    ignoreSailors,
    isIgnoringSailors,
    playCards,
    isPlayingCard,
  }
}
