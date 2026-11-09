import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useToasts } from "@/app/stores/toasts"
import { getNpcById } from "@/constants/npcs"
import { PLAYER_QUERY_KEY } from "@/constants/system"
import type { TalkLine } from "@/utils/actions/npc"
import apiRequest from "@/utils/apiRequest"
import { formatReward, goodsName } from "@/utils/npc/questText"

type NpcResponse = { success: true; updatedPlayer: Player }

type TalkResponse = NpcResponse & { npcId: string; line: TalkLine }

type AnswerResponse = NpcResponse & { reply: string }
type AcceptResponse = NpcResponse & { quest: Quest; text: string }
type DeclineResponse = NpcResponse & { text: string }
type AbandonResponse = NpcResponse & { quest: Quest }

export const useNpc = () => {
  const queryClient = useQueryClient()
  const setToast = useToasts((s) => s.setToast)

  // Rejects on failure, so callers only ever get a successful response
  const request = async <T extends NpcResponse>(
    url: string,
    data: object
  ): Promise<T> => {
    const response = await apiRequest(url, data, "POST")

    if (!response || response.data?.error) {
      throw new Error(response?.data?.error ?? "Something went wrong.")
    }

    return response.data
  }

  const handleSuccess = ({ updatedPlayer }: NpcResponse) => {
    queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
  }

  const handleError = (title: string) => (error: Error) => {
    setToast({ title, message: error.message, variant: "error" })
  }

  const giverName = (quest: Quest) => getNpcById(quest.giverId)?.name

  // Talking and handing in goods can both complete a quest
  const handleTalkSuccess = (response: TalkResponse) => {
    handleSuccess(response)

    const { line } = response

    if (line.kind === "questProgress" && line.completed && line.reward) {
      // The reward only holds the goods that fit, the quest has the full amount
      const promised = line.quest.reward.item
      const leftBehind = promised
        ? promised.quantity - (line.reward.item?.quantity ?? 0)
        : 0
      const leftBehindMessage =
        promised && leftBehind > 0
          ? ` Your hold was full, so ${leftBehind} ${goodsName(promised.name)} were left behind.`
          : ""

      setToast({
        title: "Quest completed",
        message: `You earned ${formatReward(line.reward)}.${leftBehindMessage}`,
        variant: "success",
      })
    }
  }

  const { mutateAsync: talk, isPending: isTalking } = useMutation({
    mutationFn: (data: { npcId: string; skipHandIn?: boolean }) =>
      request<TalkResponse>("/api/npc/talk", data),
    onSuccess: handleTalkSuccess,
    onError: handleError("Could not talk"),
  })

  const { mutateAsync: handIn, isPending: isHandingIn } = useMutation({
    mutationFn: (data: { npcId: string }) =>
      request<TalkResponse>("/api/npc/handin", data),
    onSuccess: handleTalkSuccess,
    onError: handleError("Could not hand over the goods"),
  })

  const { mutateAsync: answer, isPending: isAnswering } = useMutation({
    mutationFn: (data: { npcId: string; answerIndex: number }) =>
      request<AnswerResponse>("/api/npc/answer", data),
    onSuccess: handleSuccess,
    onError: handleError("Could not answer"),
  })

  const { mutateAsync: acceptQuest, isPending: isAcceptingQuest } = useMutation(
    {
      mutationFn: (data: { npcId: string }) =>
        request<AcceptResponse>("/api/npc/accept", data),
      onSuccess: (response) => {
        handleSuccess(response)

        setToast({
          title: "Quest accepted",
          message: `You took on a quest for ${giverName(response.quest)}. ${formatReward(response.quest.reward)} awaits on completion.`,
          variant: "success",
        })
      },
      onError: handleError("Could not accept the quest"),
    }
  )

  const { mutateAsync: declineQuest, isPending: isDecliningQuest } =
    useMutation({
      mutationFn: (data: { npcId: string }) =>
        request<DeclineResponse>("/api/npc/decline", data),
      onSuccess: handleSuccess,
      onError: handleError("Could not decline the quest"),
    })

  const { mutateAsync: abandonQuest, isPending: isAbandoningQuest } =
    useMutation({
      mutationFn: (data: { questId: string }) =>
        request<AbandonResponse>("/api/npc/abandon", data),
      onSuccess: handleSuccess,
      onError: handleError("Could not abandon the quest"),
    })

  const isPending =
    isTalking ||
    isHandingIn ||
    isAnswering ||
    isAcceptingQuest ||
    isDecliningQuest ||
    isAbandoningQuest

  return {
    talk,
    handIn,
    answer,
    acceptQuest,
    declineQuest,
    abandonQuest,
    isPending,
  }
}
