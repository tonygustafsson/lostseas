import { useMutation, useQueryClient } from "@tanstack/react-query"

import { playSoundEffect } from "@/components/Sound/context"
import { useToast } from "@/components/ui/Toast/context"
import { TAVERN_ITEMS } from "@/constants/tavern"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useTavern = () => {
  const queryClient = useQueryClient()
  const { setToast } = useToast()

  const { mutate: buy, isLoading: isBuying } = useMutation(
    (data: { item: keyof typeof TAVERN_ITEMS }) =>
      apiRequest("/api/tavern/buy", data, "POST"),
    {
      onSuccess: ({ error, newMood, newHealth, item, totalPrice }) => {
        if (error) {
          setToast({
            title: `Could not buy ${item}`,
            message: error,
            variant: "error",
          })

          return
        }

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

        setToast({
          title: `You bought ${item} for you and your crew`,
          message: `It cost you ${totalPrice} gold and your crew now have the health ${newHealth} and mood ${newMood}`,
          variant: "success",
        })

        playSoundEffect("cheers")
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: acceptNewCrewMembers, isLoading: isAcceptingNewCrewMembers } =
    useMutation(
      () => apiRequest("/api/tavern/acceptNewCrewMembers", null, "POST"),
      {
        onSuccess: ({ error, numberOfSailors }) => {
          if (error) {
            setToast({
              title: `Could accept new crew members`,
              message: error,
              variant: "error",
            })

            return
          }

          queryClient.invalidateQueries([PLAYER_QUERY_KEY])

          setToast({
            title: `You took ${numberOfSailors} in as your crew`,
            message: `Your whole crew couldn't be happier`,
            variant: "success",
          })

          playSoundEffect("cheers")
        },
        onError: (error) => console.error(error),
      }
    )

  const { mutate: fightSailors, isLoading: isFightingSailors } = useMutation(
    () => apiRequest("/api/tavern/fightSailors", null, "POST"),
    {
      onSuccess: ({ error, numberOfSailors, success, loot, healthLoss }) => {
        if (error) {
          setToast({
            title: `Could ignore sailors`,
            message: error,
            variant: "error",
          })

          return
        }

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

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
      onError: (error) => console.error(error),
    }
  )

  const { mutate: ignoreSailors, isLoading: isIgnoringSailors } = useMutation(
    () => apiRequest("/api/tavern/ignoreSailors", null, "POST"),
    {
      onSuccess: ({ error, numberOfSailors }) => {
        if (error) {
          setToast({
            title: `Could not ignore sailors`,
            message: error,
            variant: "error",
          })

          return
        }

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

        setToast({
          title: `You ignored the ${numberOfSailors} sailors`,
          message: `You said "No thank you" and just walked away`,
          variant: "success",
        })
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: playDice, isLoading: isPlayingDice } = useMutation(
    (data: { betPercentage: number }) =>
      apiRequest("/api/tavern/dice", data, "POST"),
    {
      onSuccess: ({ error, bet, gold, diceResults }) => {
        if (error) {
          setToast({
            title: `Could not place bet`,
            message: error,
            variant: "error",
          })

          return
        }

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

        let title = ""

        if (diceResults === "won") {
          title = `You played made a bet of ${bet} gold and won!`
        } else if (diceResults === "jackpot") {
          title = `You played made a bet of ${bet} gold and won the jackpot!`
        } else {
          title = `You played made a bet of ${bet} gold and lost`
        }

        setToast({
          title,
          message: `You now have ${gold} gold in total.`,
          variant:
            diceResults === "won" || diceResults === "jackpot"
              ? "success"
              : "error",
        })

        if (diceResults === "won" || diceResults === "jackpot") {
          playSoundEffect("cheers")
        } else {
          playSoundEffect("frustration")
        }
      },
      onError: (error) => console.error(error),
    }
  )

  return {
    buy,
    isBuying,
    acceptNewCrewMembers,
    isAcceptingNewCrewMembers,
    fightSailors,
    isFightingSailors,
    ignoreSailors,
    isIgnoringSailors,
    playDice,
    isPlayingDice,
  }
}
