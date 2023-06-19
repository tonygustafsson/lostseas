import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useToast } from "@/components/ui/Toast/context"
import { TAVERN_ITEMS } from "@/constants/tavern"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useTavern = () => {
  const queryClient = useQueryClient()
  const { setToast } = useToast()

  const { mutate: buy, isLoading: isBuying } = useMutation(
    (data: { playerId: Player["id"]; item: keyof typeof TAVERN_ITEMS }) =>
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
          message: `It cost you ${totalPrice} dbl and your crew now have the health ${newHealth} and mood ${newMood}`,
          variant: "success",
        })
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: acceptNewCrewMembers, isLoading: isAcceptingNewCrewMembers } =
    useMutation(
      (data: { playerId: Player["id"] }) =>
        apiRequest("/api/tavern/acceptNewCrewMembers", data, "POST"),
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
        },
        onError: (error) => console.error(error),
      }
    )

  const { mutate: ignoreSailors, isLoading: isIgnoringSailors } = useMutation(
    (data: { playerId: Player["id"] }) =>
      apiRequest("/api/tavern/ignoreSailors", data, "POST"),
    {
      onSuccess: ({ error, numberOfSailors }) => {
        if (error) {
          setToast({
            title: `Could ignore sailors`,
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

  return {
    buy,
    isBuying,
    acceptNewCrewMembers,
    isAcceptingNewCrewMembers,
    ignoreSailors,
    isIgnoringSailors,
  }
}
