import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useSound } from "@/components/Sound/context"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

const SEA_TRAVEL_SPEED = 5000 // Milliseconds per step

export const useSea = () => {
  const queryClient = useQueryClient()
  const { playSoundEffect } = useSound()

  const { mutate: startJourney, isPending: isStartingJourney } = useMutation({
    mutationFn: (data: { town: Town }) =>
      apiRequest("/api/sea/startJourney", data, "POST"),
    onSuccess: (response) => {
      const { success } = response?.data

      queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })

      if (success) {
        playSoundEffect("journey")
        setTimeout(() => continueJourney(), SEA_TRAVEL_SPEED)
      }
    },
    onError: (error) => console.error(error),
  })

  const { mutate: continueJourney, isPending: isContinueingJourney } =
    useMutation({
      mutationFn: () => apiRequest("/api/sea/continueJourney", null, "POST"),
      onSuccess: (response) => {
        const {
          destinationReached,
          shipMeetingState,
          error,
        }: Character["journey"] & {
          success: boolean
          destinationReached: boolean
          shipMeetingState: ShipMeetingState
          error?: string
        } = response?.data

        queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })
        if (shipMeetingState) {
          playSoundEffect("sailho")
        } else if (destinationReached) {
          playSoundEffect("landho")
        } else {
          playSoundEffect("journey")
        }

        if (!error && !destinationReached && !shipMeetingState) {
          setTimeout(() => continueJourney(), SEA_TRAVEL_SPEED)
        }
      },
      onError: (error) => console.error(error),
    })

  const { mutate: attackShip, isPending: isAttackingShip } = useMutation({
    mutationFn: () => apiRequest("/api/sea/attackShip", null, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })
      playSoundEffect("cannons")
    },
    onError: (error) => console.error(error),
  })

  const { mutate: ignoreShip, isPending: isIgnoringShip } = useMutation({
    mutationFn: () => apiRequest("/api/sea/ignoreShip", null, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })

      continueJourney()
    },
    onError: (error) => console.error(error),
  })

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
