import { useMutation, useQueryClient } from "@tanstack/react-query"

import useSound from "@/app/stores/sound"
import { useToasts } from "@/app/stores/toasts"
import { TAVERN_ITEMS } from "@/constants/tavern"
import apiRequest from "@/utils/apiRequest"
import { dbPatchToObj } from "@/utils/dbUpdateToObj"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useTavern = () => {
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
    mutationFn: (data: { item: keyof typeof TAVERN_ITEMS }) =>
      apiRequest("/api/tavern/buy", data, "POST"),
    onMutate: async (data: { item: keyof typeof TAVERN_ITEMS }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const tavernItem = data.item
        const totalPrice =
          TAVERN_ITEMS[tavernItem].price * (previous.crewMembers.count || 0)

        const healthIncrease = TAVERN_ITEMS[tavernItem].healthIncrease
        const moodIncrease = TAVERN_ITEMS[tavernItem].moodIncrease

        const newMood =
          previous.crewMembers.mood + moodIncrease > 40
            ? 40
            : previous.crewMembers.mood + moodIncrease
        const newHealth =
          previous.crewMembers.health + healthIncrease > 100
            ? 100
            : previous.crewMembers.health + healthIncrease

        const playerUpdates = {
          "character/gold": previous.character.gold - totalPrice,
          "crewMembers/mood": newMood,
          "crewMembers/health": newHealth,
        } satisfies PlayerDB

        const newPlayer = dbPatchToObj(previous, playerUpdates)

        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onSuccess: (response, _, context) => {
      const { error, newMood, newHealth, item, totalPrice } = response?.data

      if (error) {
        handleError(`Could not buy ${item}`, error, context?.previous)
        return
      }

      setToast({
        title: `You bought ${item} for you and your crew`,
        message: `It cost you ${totalPrice} gold and your crew now have the health ${newHealth} and mood ${newMood}`,
        variant: "success",
      })

      playSoundEffect("cheers")
    },
    onError: (err: any, { item }, context: any) => {
      handleError(`Could not buy ${item}`, err, context?.previous)
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

          const playerUpdates = {
            "crewMembers/count": previous.crewMembers.count + numberOfSailors,
            "locationStates/tavern/noOfSailors": 0,
          } satisfies PlayerDB

          const newPlayer = dbPatchToObj(previous, playerUpdates)
          queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
        }

        return { previous }
      },
      onSuccess: (response, _, context) => {
        const { error, numberOfSailors } = response?.data

        if (error) {
          handleError(
            `Could not accept new crew members`,
            error,
            context?.previous
          )
          return
        }

        setToast({
          title: `You took ${numberOfSailors} in as your crew`,
          message: `Your whole crew couldn't be happier`,
          variant: "success",
        })

        playSoundEffect("cheers")
      },
      onError: (err: any, _, context: any) => {
        handleError(`Could not accept new crew members`, err, context?.previous)
      },
    })

  const { mutate: fightSailors, isPending: isFightingSailors } = useMutation({
    mutationFn: () => apiRequest("/api/tavern/fightSailors", null, "POST"),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const playerUpdates = {
          "locationStates/tavern/noOfSailors": 0,
        } satisfies PlayerDB

        const newPlayer = dbPatchToObj(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onSuccess: (response, _, context) => {
      const { error, numberOfSailors, success, loot, healthLoss } =
        response?.data

      if (error) {
        handleError(`Could not fight sailors`, error, context?.previous)
        return
      }

      if (success) {
        setToast({
          title: `You fought ${numberOfSailors} sailors sailors and won!`,
          message: `You got ${loot} gold. Your crew lost ${healthLoss}% health.`,
          variant: "success",
        })

        playSoundEffect("cheers")
      } else {
        setToast({
          title: `You fought ${numberOfSailors} sailors and lost`,
          message: `Ouch! Your crew lost ${healthLoss}% health.`,
          variant: "error",
        })

        playSoundEffect("hurt")
      }
    },
    onError: (err: any, _, context: any) => {
      handleError(`Could not fight sailors`, err, context?.previous)
    },
  })

  const { mutate: ignoreSailors, isPending: isIgnoringSailors } = useMutation({
    mutationFn: () =>
      apiRequest("/api/tavern/ignoreSailors", null, "POST") as Promise<any>,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const playerUpdates = {
          "locationStates/tavern/noOfSailors": 0,
        } satisfies PlayerDB

        const newPlayer = dbPatchToObj(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onSuccess: (
      response: {
        data: { error?: string; numberOfSailors: number }
      },
      _,
      context
    ) => {
      const { error, numberOfSailors } = response?.data

      if (error) {
        handleError(`Could not ignore sailors`, error, context?.previous)
        return
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
      apiRequest("/api/tavern/cards", data, "POST"),
    onSuccess: (response) => {
      const { bet, gold, cardsResults } = response?.data

      let title = ""

      if (cardsResults === "won") {
        title = `You played made a bet of ${bet} gold and won!`
      } else {
        title = `You played made a bet of ${bet} gold and lost`
      }

      setToast({
        title,
        message: `You now have ${gold} gold in total.`,
        variant: cardsResults === "won" ? "success" : "error",
      })

      if (cardsResults === "won") {
        playSoundEffect("cheers")
      } else {
        playSoundEffect("frustration")
      }
    },
    onError: (err: any, _, context: any) => {
      handleError(`Could not place bet`, err, context?.previous)
    },
  })

  return {
    buy,
    isBuying,
    acceptNewCrewMembers,
    isAcceptingNewCrewMembers,
    fightSailors,
    isFightingSailors,
    ignoreSailors,
    isIgnoringSailors,
    playCards,
    isPlayingCard,
  }
}
