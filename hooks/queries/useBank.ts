import { useMutation, useQueryClient } from "@tanstack/react-query"

import apiRequest from "@/utils/apiRequest"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useBank = () => {
  const queryClient = useQueryClient()

  const { mutate: deposit, isLoading: isDepositing } = useMutation(
    (data: { userId: Player["id"]; amount: number }) =>
      apiRequest("/api/bank/deposit", data, "POST"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  const { mutate: withdraw, isLoading: isWithdrawing } = useMutation(
    (data: { userId: Player["id"]; amount: number }) =>
      apiRequest("/api/bank/withdraw", data, "POST"),
    {
      onSuccess: () => queryClient.invalidateQueries([PLAYER_QUERY_KEY]),
      onError: (error) => console.error(error),
    }
  )

  return {
    deposit,
    isDepositing,
    withdraw,
    isWithdrawing,
  }
}
