import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useToasts } from "@/app/stores/toasts"
import { getNpcById } from "@/constants/npcs"
import { PLAYER_QUERY_KEY } from "@/constants/system"
import type { TalkResponse } from "@/hooks/queries/useNpc"
import { postOrThrow } from "@/utils/apiRequest"
import { formatReward, getQuestCompletedMessage } from "@/utils/npc/questText"

type QuestResponse = { success: true; updatedPlayer: Player }

type AcceptResponse = QuestResponse & { quest: Quest; text: string }
type DeclineResponse = QuestResponse & { text: string }
type AbandonResponse = QuestResponse & { quest: Quest }

export const useQuest = () => {
  const queryClient = useQueryClient()
  const setToast = useToasts((s) => s.setToast)

  const handleSuccess = ({ updatedPlayer }: QuestResponse) => {
    queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
  }

  const handleError = (title: string) => (error: Error) => {
    setToast({ title, message: error.message, variant: "error" })
  }

  const { mutateAsync: acceptQuest, isPending: isAccepting } = useMutation({
    mutationFn: (data: { npcId: string }) =>
      postOrThrow<AcceptResponse>("/api/quest/accept", data),
    onSuccess: (response) => {
      handleSuccess(response)

      const { quest } = response

      setToast({
        title: "Quest accepted",
        message: `You took on a quest for ${getNpcById(quest.giverId)?.name}. ${formatReward(quest.reward)} awaits on completion.`,
        variant: "success",
      })
    },
    onError: handleError("Could not accept the quest"),
  })

  const { mutateAsync: declineQuest, isPending: isDeclining } = useMutation({
    mutationFn: (data: { npcId: string }) =>
      postOrThrow<DeclineResponse>("/api/quest/decline", data),
    onSuccess: handleSuccess,
    onError: handleError("Could not decline the quest"),
  })

  const { mutateAsync: abandonQuest, isPending: isAbandoning } = useMutation({
    mutationFn: (data: { questId: string }) =>
      postOrThrow<AbandonResponse>("/api/quest/abandon", data),
    onSuccess: handleSuccess,
    onError: handleError("Could not abandon the quest"),
  })

  // Handing in goods continues the conversation, so it answers with a talk line
  const { mutateAsync: handIn, isPending: isHandingIn } = useMutation({
    mutationFn: (data: { npcId: string }) =>
      postOrThrow<TalkResponse>("/api/quest/handin", data),
    onSuccess: (response) => {
      handleSuccess(response)

      const message = getQuestCompletedMessage(response.line)

      if (message) {
        setToast({ title: "Quest completed", message, variant: "success" })
      }
    },
    onError: handleError("Could not hand over the goods"),
  })

  return {
    acceptQuest,
    declineQuest,
    abandonQuest,
    handIn,
    isPending: isAccepting || isDeclining || isAbandoning || isHandingIn,
  }
}
