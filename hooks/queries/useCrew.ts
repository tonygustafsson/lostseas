import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useSound } from "@/components/Sound/context"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useCrew = () => {
  const queryClient = useQueryClient()
  const { playSoundEffect } = useSound()

  const { mutate: giveMedicine, isPending: isGivingMedicine } = useMutation({
    mutationFn: (data: { medicine: Inventory["medicine"] }) =>
      apiRequest("/api/crew/giveMedicine", data, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })
      playSoundEffect("drink")
    },
    onError: (error) => console.error(error),
  })

  const { mutate: giveGold, isPending: isGivingGold } = useMutation({
    mutationFn: (data: { gold: Character["gold"] }) =>
      apiRequest("/api/crew/giveGold", data, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })
      playSoundEffect("cheers")
    },
    onError: (error) => console.error(error),
  })

  const { mutate: dismiss, isPending: isDismissing } = useMutation({
    mutationFn: (data: { count: CrewMembers["count"] }) =>
      apiRequest("/api/crew/dismiss", data, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })
      playSoundEffect("frustration")
    },
    onError: (error) => console.error(error),
  })

  return {
    giveMedicine,
    isGivingMedicine,
    giveGold,
    isGivingGold,
    dismiss,
    isDismissing,
  }
}
