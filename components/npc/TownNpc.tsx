import { useState } from "react"

import NpcCard from "@/components/npc/NpcCard"
import TalkDialog from "@/components/npc/TalkDialog"
import { getNpcAt, GO_ON_LABELS } from "@/constants/npcs"
import { useNpc } from "@/hooks/queries/useNpc"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useQuest } from "@/hooks/queries/useQuest"
import type { TalkLine } from "@/utils/actions/npc"
import { getQuestBusiness } from "@/utils/npc/questBusiness"
import { playNpcVoice, stopNpcVoice } from "@/utils/npc/voice"
import { pickRandom } from "@/utils/random"

export const getFirstName = (npc: Npc) => npc.name.split(" ")[0]

/** Talking to the NPC in this building: the state for the Talk button and the dialog */
export const useTownNpcTalk = (placement: NpcPlacement) => {
  const { data: player } = useGetPlayer()
  const { talk, answer, isPending: isNpcPending } = useNpc()
  const {
    handIn,
    acceptQuest,
    declineQuest,
    isPending: isQuestPending,
  } = useQuest()
  const isPending = isNpcPending || isQuestPending

  const [open, setOpen] = useState(false)
  const [line, setLine] = useState<TalkLine | null>(null)
  const [lineId, setLineId] = useState(0)
  const [reply, setReply] = useState<string | null>(null)
  const [goOnLabel, setGoOnLabel] = useState(GO_ON_LABELS[0])

  const town = player?.character.town
  const npc = town ? getNpcAt(town, placement) : undefined
  const conversation = npc
    ? player?.locationStates?.conversations?.[npc.id]
    : undefined

  // An offer left open counts too, so the player can get back to it
  const hasQuestBusiness = !!(
    conversation?.questOffer ||
    (player && npc && getQuestBusiness(player, npc))
  )

  const showLine = (next: TalkLine) => {
    setLine(next)
    setLineId((id) => id + 1)
    setReply(null)
    setGoOnLabel(pickRandom(GO_ON_LABELS))
  }

  // useNpc and useQuest show a toast when a request fails, so the handlers only catch
  const handleTalk = async (skipHandIn?: boolean) => {
    if (!npc) {
      return
    }

    try {
      const response = await talk({ npcId: npc.id, skipHandIn })
      showLine(response.line)

      // The voice starts with the conversation, not again for every line
      if (!open) {
        playNpcVoice(npc)
      }

      setOpen(true)
    } catch {}
  }

  const handleHandIn = async () => {
    if (!npc) {
      return
    }

    try {
      const response = await handIn({ npcId: npc.id })
      showLine(response.line)
    } catch {}
  }

  const handleClose = () => {
    stopNpcVoice()
    setOpen(false)
  }

  // "Not yet" and "Go on" carry on with a normal chat instead of asking for goods
  const handleChat = () => handleTalk(true)

  const handleAnswer = async (answerIndex: number) => {
    if (!npc) {
      return
    }

    try {
      const response = await answer({ npcId: npc.id, answerIndex })
      setReply(response.reply)
    } catch {}
  }

  const handleAccept = async () => {
    if (!npc) {
      return
    }

    try {
      const response = await acceptQuest({ npcId: npc.id })
      showLine({ kind: "statement", text: response.text })
    } catch {}
  }

  const handleDecline = async () => {
    if (!npc) {
      return
    }

    try {
      const response = await declineQuest({ npcId: npc.id })
      showLine({ kind: "statement", text: response.text })
    } catch {}
  }

  const dialog = npc && (
    <TalkDialog
      npc={npc}
      open={open}
      line={line}
      lineId={lineId}
      reply={reply}
      isPending={isPending}
      onAnswer={handleAnswer}
      onAccept={handleAccept}
      onDecline={handleDecline}
      onHandIn={handleHandIn}
      onNotYet={handleChat}
      goOnLabel={goOnLabel}
      onGoOn={handleChat}
      onClose={handleClose}
    />
  )

  return {
    npc,
    hasQuestBusiness,
    isPending,
    onTalk: () => handleTalk(),
    dialog,
  }
}

type Props = { talk: ReturnType<typeof useTownNpcTalk> }

/** The NPC card and dialog. The parent owns the talk state, as it also labels the tab. */
const TownNpc = ({ talk }: Props) => {
  const { npc, hasQuestBusiness, isPending, onTalk, dialog } = talk

  if (!npc) {
    return null
  }

  return (
    <>
      <NpcCard
        npc={npc}
        hasQuestBusiness={hasQuestBusiness}
        disabled={isPending}
        onTalk={onTalk}
      />

      {dialog}
    </>
  )
}

export default TownNpc
