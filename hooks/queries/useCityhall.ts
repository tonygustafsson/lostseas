import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useSound } from "@/components/Sound/context"
import { useToast } from "@/components/ui/Toast/context"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useCityhall = () => {
  const queryClient = useQueryClient()
  const { playSoundEffect } = useSound()
  const { setToast } = useToast()

  const { mutate: acceptNewTitle, isLoading: isAcceptingNewTitle } =
    useMutation(
      () => apiRequest("/api/cityhall/acceptNewTitle", null, "POST"),
      {
        onSuccess: (response) => {
          const { error, titleInfo } = response?.data

          if (error) {
            setToast({
              title: `Could not accept new title ${titleInfo.title}`,
              message: error,
              variant: "error",
            })

            return
          }

          queryClient.invalidateQueries([PLAYER_QUERY_KEY])
          playSoundEffect("fanfare")

          setToast({
            title: `You are now a ${titleInfo.title}`,
            message: `You also got a reward of ${titleInfo.reward} gold.`,
            variant: "success",
          })
        },
        onError: (error) => {
          console.error(error)
        },
      }
    )

  const { mutate: changeCitizenship, isLoading: isChangingCitizenship } =
    useMutation(
      () => apiRequest("/api/cityhall/changeCitizenship", null, "POST"),
      {
        onSuccess: (response) => {
          const { error, titleInfo, newNationality } = response?.data

          if (error) {
            setToast({
              title: `Could not change citizenship to ${newNationality}`,
              message: error,
              variant: "error",
            })

            return
          }

          queryClient.invalidateQueries([PLAYER_QUERY_KEY])
          playSoundEffect("fanfare")

          setToast({
            title: `You are now a ${titleInfo.title} from ${newNationality}`,
            message: `You also got a reward of ${titleInfo.reward} gold.`,
            variant: "success",
          })
        },
        onError: (error) => {
          console.error(error)
        },
      }
    )

  const { mutate: handOver, isLoading: isHandingOver } = useMutation(
    (id: Treasure["id"]) =>
      apiRequest("/api/cityhall/handover", { id }, "POST"),
    {
      onSuccess: (response) => {
        const { error, treasure, treasureInfo } = response?.data

        if (error) {
          setToast({
            title: `Could not handover treasure ${treasure.name}`,
            message: error,
            variant: "error",
          })

          return
        }

        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
        playSoundEffect("coins")

        setToast({
          title: `You handed over the ${treasure.name} to the cityhall`,
          message: `You got a reward of ${treasureInfo.value} gold.`,
          variant: "success",
        })
      },
      onError: (error) => {
        console.error(error)
      },
    }
  )

  return {
    acceptNewTitle,
    isAcceptingNewTitle,
    changeCitizenship,
    isChangingCitizenship,
    handOver,
    isHandingOver,
  }
}
