import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useToasts } from "@/app/stores/toasts"
import { PLAYER_QUERY_KEY } from "@/constants/system"
import type { TalkLine } from "@/utils/actions/npc"
import { postOrThrow } from "@/utils/apiRequest"
import { getQuestCompletedMessage } from "@/utils/npc/questText"

type NpcResponse = { success: true; updatedPlayer: Player }

export type TalkResponse = NpcResponse & { npcId: string; line: TalkLine }

type AnswerResponse = NpcResponse & { reply: string }

export const useNpc = () => {
  const queryClient = useQueryClient()
  const setToast = useToasts((s) => s.setToast)

  const handleSuccess = ({ updatedPlayer }: NpcResponse) => {
    queryClient.setQueryData([PLAYER_QUERY_KEY], updatedPlayer)
  }

  const handleError = (title: string) => (error: Error) => {
    setToast({ title, message: error.message, variant: "error" })
  }

  const { mutateAsync: talk, isPending: isTalking } = useMutation({
    mutationFn: (data: { npcId: string; skipHandIn?: boolean }) =>
      postOrThrow<TalkResponse>("/api/npc/talk", data),
    onSuccess: (response) => {
      handleSuccess(response)

      // Talking to the right person can complete a quest
      const message = getQuestCompletedMessage(response.line)

      if (message) {
        setToast({ title: "Quest completed", message, variant: "success" })
      }
    },
    onError: handleError("Could not talk"),
  })

  const { mutateAsync: answer, isPending: isAnswering } = useMutation({
    mutationFn: (data: { npcId: string; answerIndex: number }) =>
      postOrThrow<AnswerResponse>("/api/npc/answer", data),
    onSuccess: handleSuccess,
    onError: handleError("Could not answer"),
  })

  return {
    talk,
    answer,
    isPending: isTalking || isAnswering,
  }
}
