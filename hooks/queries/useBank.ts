import { useMutation, useQueryClient } from "@tanstack/react-query"

import useSound from "@/app/stores/sound"
import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useBank = () => {
  const queryClient = useQueryClient()
  const { playSoundEffect } = useSound()

  const { mutate: deposit, isPending: isDepositing } = useMutation({
    mutationFn: (data: { amount: number }) =>
      apiRequest("/api/bank/deposit", data, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })
      playSoundEffect("coins")
    },
    onError: (error) => console.error(error),
  })

  const { mutate: withdraw, isPending: isWithdrawing } = useMutation({
    mutationFn: (data: { amount: number }) =>
      apiRequest("/api/bank/withdraw", data, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })
      playSoundEffect("coins")
    },
    onError: (error) => console.error(error),
  })

  const { mutate: loan, isPending: isLoaning } = useMutation({
    mutationFn: (data: { amount: number }) =>
      apiRequest("/api/bank/loan", data, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })
      playSoundEffect("coins")
    },
    onError: (error) => console.error(error),
  })

  const { mutate: repay, isPending: isRepaying } = useMutation({
    mutationFn: (data: { amount: number }) =>
      apiRequest("/api/bank/repay", data, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAYER_QUERY_KEY] })
      playSoundEffect("coins")
    },
    onError: (error) => console.error(error),
  })

  return {
    deposit,
    isDepositing,
    withdraw,
    isWithdrawing,
    loan,
    isLoaning,
    repay,
    isRepaying,
  }
}
