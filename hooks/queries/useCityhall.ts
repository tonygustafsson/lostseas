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
        onSuccess: ({ error, titleInfo }) => {
          if (error) {
            setToast({
              title: `Could not accept new title ${titleInfo.title}`,
              message: error,
              variant: "error",
            })

            return
          }

          queryClient.invalidateQueries([PLAYER_QUERY_KEY])
          playSoundEffect("journey")

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

  return {
    acceptNewTitle,
    isAcceptingNewTitle,
  }
}
