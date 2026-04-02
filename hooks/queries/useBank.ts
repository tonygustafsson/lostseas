import { useMutation, useQueryClient } from "@tanstack/react-query"

import useSound from "@/app/stores/sound"
import { useToasts } from "@/app/stores/toasts"
import apiRequest from "@/utils/apiRequest"
import { patchDeep } from "@/utils/patchDeep"

import { PLAYER_QUERY_KEY } from "./usePlayer"

export const useBank = () => {
  const queryClient = useQueryClient()
  const { playSoundEffect } = useSound()
  const setToast = useToasts((s) => s.setToast)

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

  const { mutate: deposit, isPending: isDepositing } = useMutation({
    mutationFn: (data: { amount: number }) =>
      apiRequest("/api/bank/deposit", data, "POST"),
    onMutate: async (data: { amount: number }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const playerUpdates: DeepPartial<Player> = {
          character: {
            gold: previous.character.gold - data.amount,
            account: (previous.character.account || 0) + data.amount,
          },
        }

        const newPlayer = patchDeep(previous, playerUpdates)

        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onError: (err: any, _, context: any) => {
      handleError(`Could not deposit`, err?.message, context?.previous)
    },
    onSuccess: (response, _, context) => {
      const { updatedPlayer, error, amount, gold } = response?.data

      if (error) {
        handleError(`Could not deposit`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      setToast({
        title: `You deposited ${amount} doubloons`,
        message: `You now have ${gold} gold.`,
        variant: "success",
      })

      playSoundEffect("coins")
    },
  })

  const { mutate: withdraw, isPending: isWithdrawing } = useMutation({
    mutationFn: (data: { amount: number }) =>
      apiRequest("/api/bank/withdraw", data, "POST"),
    onMutate: async (data: { amount: number }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const currentAccount = previous.character.account || 0

        const playerUpdates: DeepPartial<Player> = {
          character: {
            gold: previous.character.gold + data.amount,
            account: currentAccount - data.amount,
          },
        }

        const newPlayer = patchDeep(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onError: (err, _, context) => {
      handleError(`Could not withdraw`, err?.message, context?.previous)
    },
    onSuccess: (response, _, context) => {
      const { updatedPlayer, error, amount, gold } = response?.data

      if (error) {
        handleError(`Could not withdraw`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      setToast({
        title: `You withdrew ${amount} doubloons`,
        message: `You now have ${gold} gold.`,
        variant: "success",
      })

      playSoundEffect("coins")
    },
  })

  const { mutate: loan, isPending: isLoaning } = useMutation({
    mutationFn: (data: { amount: number }) =>
      apiRequest("/api/bank/loan", data, "POST"),
    onMutate: async (data: { amount: number }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const playerUpdates: DeepPartial<Player> = {
          character: {
            gold: previous.character.gold + data.amount,
            loan: (previous.character.loan || 0) + data.amount,
          },
        }

        const newPlayer = patchDeep(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onError: (err, _, context) => {
      handleError(`Could not take loan`, err?.message, context?.previous)
    },
    onSuccess: (response, _, context) => {
      const {
        updatedPlayer,
        error,
        amount,
        gold,
        loan: loanAmount,
      } = response?.data

      if (error) {
        handleError(`Could not take loan`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      setToast({
        title: `You took a loan of ${amount} gold`,
        message: `You now have ${gold} gold and ${loanAmount} gold loan.`,
        variant: "success",
      })

      playSoundEffect("coins")
    },
  })

  const { mutate: repay, isPending: isRepaying } = useMutation({
    mutationFn: (data: { amount: number }) =>
      apiRequest("/api/bank/repay", data, "POST"),
    onMutate: async (data: { amount: number }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const currentLoan = previous.character.loan || 0

        const playerUpdates: DeepPartial<Player> = {
          character: {
            gold: previous.character.gold - data.amount,
            loan: currentLoan - data.amount,
          },
        }

        const newPlayer = patchDeep(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onError: (err, _, context) => {
      handleError(`Could not repay loan`, err?.message, context?.previous)
    },
    onSuccess: (response, _, context) => {
      const {
        updatedPlayer,
        error,
        amount,
        gold,
        loan: loanAmount,
      } = response?.data

      if (error) {
        handleError(`Could not repay loan`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      setToast({
        title: `You repaid ${amount} gold`,
        message: `You now have ${gold} gold and ${loanAmount ?? 0} gold loan.`,
        variant: "success",
      })

      playSoundEffect("coins")
    },
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
