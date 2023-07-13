import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useSound } from "@/components/Sound/context"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

const SEA_TRAVEL_SPEED = 3000 // Milliseconds per step

export const useSea = () => {
  const queryClient = useQueryClient()
  const { playSoundEffect } = useSound()

  const { mutate: startJourney, isLoading: isStartingJourney } = useMutation(
    (data: { town: Town }) => apiRequest("/api/sea/startJourney", data, "POST"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
        playSoundEffect("waves")

        setTimeout(() => continueJourney(), SEA_TRAVEL_SPEED)
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: continueJourney, isLoading: isContinueingJourney } =
    useMutation(() => apiRequest("/api/sea/continueJourney", null, "POST"), {
      onSuccess: ({
        destinationReached,
        shipMeetingState,
        error,
      }: Character["journey"] & {
        success: boolean
        destinationReached: boolean
        shipMeetingState: ShipMeetingState
        error?: string
      }) => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
        if (shipMeetingState) {
          playSoundEffect("sailho")
        } else if (destinationReached) {
          playSoundEffect("landho")
        } else {
          playSoundEffect("waves")
        }

        if (!error && !destinationReached && !shipMeetingState) {
          setTimeout(() => continueJourney(), SEA_TRAVEL_SPEED)
        }
      },
      onError: (error) => console.error(error),
    })

  const { mutate: attackShip, isLoading: isAttackingShip } = useMutation(
    () => apiRequest("/api/sea/attackShip", null, "POST"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])
      },
      onError: (error) => console.error(error),
    }
  )

  const { mutate: ignoreShip, isLoading: isIgnoringShip } = useMutation(
    () => apiRequest("/api/sea/ignoreShip", null, "POST"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PLAYER_QUERY_KEY])

        continueJourney()
      },
      onError: (error) => console.error(error),
    }
  )

  return {
    startJourney,
    isStartingJourney,
    continueJourney,
    isContinueingJourney,
    attackShip,
    isAttackingShip,
    ignoreShip,
    isIgnoringShip,
  }
}
