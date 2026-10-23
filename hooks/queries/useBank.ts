import { useMutation, useQueryClient } from "@tanstack/react-query"

import useSound from "@/app/stores/sound"
import { useToasts } from "@/app/stores/toasts"
import { VENTURES } from "@/constants/ventures"
import apiRequest from "@/utils/apiRequest"
import { formatGold, formatNumber } from "@/utils/number"
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
        title: `You deposited ${formatNumber(amount)} doubloons`,
        message: `You now have ${formatGold(gold)}.`,
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
        title: `You withdrew ${formatNumber(amount)} doubloons`,
        message: `You now have ${formatGold(gold)}.`,
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
        title: `You took a loan of ${formatGold(amount)}`,
        message: `You now have ${formatGold(gold)} and ${formatGold(loanAmount)} loan.`,
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
        title: `You repaid ${formatGold(amount)}`,
        message: `You now have ${formatGold(gold)} and ${formatGold(loanAmount ?? 0)} loan.`,
        variant: "success",
      })

      playSoundEffect("coins")
    },
  })

  const { mutate: investInVenture, isPending: isInvesting } = useMutation({
    mutationFn: (data: { ventureId: VentureId }) =>
      apiRequest("/api/bank/ventures/invest", data, "POST"),
    onMutate: async (data: { ventureId: VentureId }) => {
      await queryClient.cancelQueries({ queryKey: [PLAYER_QUERY_KEY] })

      const previous = queryClient.getQueryData<Player>([PLAYER_QUERY_KEY])

      if (previous) {
        const { stake, days } = VENTURES[data.ventureId]
        const investedDay = previous.character.day

        const playerUpdates: DeepPartial<Player> = {
          character: {
            gold: previous.character.gold - stake,
            ventures: {
              [data.ventureId]: { investedDay, returnDay: investedDay + days },
            },
          },
        }

        const newPlayer = patchDeep(previous, playerUpdates)
        queryClient.setQueryData([PLAYER_QUERY_KEY], newPlayer)
      }

      return { previous }
    },
    onError: (err, _, context) => {
      handleError(`Could not invest`, err?.message, context?.previous)
    },
    onSuccess: (response, _, context) => {
      const { updatedPlayer, error, ventureId, returnDay } = response?.data

      if (error) {
        handleError(`Could not invest`, error, context?.previous)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      const venture = VENTURES[ventureId as VentureId]

      setToast({
        title: `You invested ${formatGold(venture.stake)}`,
        message: `${venture.name} has set sail. Expect word on day ${returnDay}.`,
        variant: "success",
      })

      playSoundEffect("coins")
    },
  })

  const { mutate: collectVenture, isPending: isCollecting } = useMutation({
    mutationFn: (data: { ventureId: VentureId }) =>
      apiRequest("/api/bank/ventures/collect", data, "POST"),
    onError: (err) => {
      handleError(`Could not collect`, err?.message, undefined)
    },
    onSuccess: (response) => {
      const { updatedPlayer, error, returns, message } = response?.data

      if (error) {
        handleError(`Could not collect`, error, undefined)
        return
      }

      if (updatedPlayer) {
        queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
      }

      setToast({
        title:
          returns > 0 ? `You collected ${formatGold(returns)}` : "A total loss",
        message,
        variant: returns > 0 ? "success" : "error",
      })

      if (returns > 0) {
        playSoundEffect("coins")
      }
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
    investInVenture,
    isInvesting,
    collectVenture,
    isCollecting,
  }
}
