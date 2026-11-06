import { useState } from "react"

import NpcCard from "@/components/npc/NpcCard"
import TalkDialog from "@/components/npc/TalkDialog"
import { getNpcAt } from "@/constants/npcs"
import { TALKS_PER_VISIT } from "@/constants/quests"
import { useNpc } from "@/hooks/queries/useNpc"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import type { TalkLine } from "@/utils/actions/npc"
import { getQuestBusiness } from "@/utils/npc/questBusiness"

export const getFirstName = (npc: Npc) => npc.name.split(" ")[0]

/** Talking to the NPC in this building: the state for the Talk button and the dialog */
export const useTownNpcTalk = (placement: NpcPlacement) => {
  const { data: player } = useGetPlayer()
  const { talk, handIn, answer, acceptQuest, declineQuest, isPending } =
    useNpc()

  const [open, setOpen] = useState(false)
  const [line, setLine] = useState<TalkLine | null>(null)
  const [lineId, setLineId] = useState(0)
  const [reply, setReply] = useState<string | null>(null)

  const town = player?.character.town
  const npc = town ? getNpcAt(town, placement) : undefined
  const conversation = npc
    ? player?.locationStates?.conversations?.[npc.id]
    : undefined

  const talksLeft = Math.max(0, TALKS_PER_VISIT - (conversation?.talks ?? 0))

  // An offer left open counts too, so the player can get back to it
  const hasQuestBusiness = !!(
    conversation?.questOffer ||
    (player && npc && getQuestBusiness(player, npc))
  )

  const showLine = (next: TalkLine) => {
    setLine(next)
    setLineId((id) => id + 1)
    setReply(null)
  }

  // useNpc shows a toast when a request fails, so the handlers only catch
  const handleTalk = async (skipHandIn?: boolean) => {
    if (!npc) {
      return
    }

    try {
      const response = await talk({ npcId: npc.id, skipHandIn })
      showLine(response.line)
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

  // "Not yet" carries on with a normal chat, as long as there are talks left
  const handleNotYet = () => {
    if (talksLeft > 0) {
      handleTalk(true)
    } else {
      setOpen(false)
    }
  }

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
      onNotYet={handleNotYet}
      onClose={() => setOpen(false)}
    />
  )

  return {
    npc,
    talksLeft,
    hasQuestBusiness,
    isPending,
    onTalk: () => handleTalk(),
    dialog,
  }
}

type Props = { talk: ReturnType<typeof useTownNpcTalk> }

/** The NPC card and dialog. The parent owns the talk state, as it also labels the tab. */
const TownNpc = ({ talk }: Props) => {
  const { npc, talksLeft, hasQuestBusiness, isPending, onTalk, dialog } = talk

  if (!npc) {
    return null
  }

  return (
    <>
      <NpcCard
        npc={npc}
        talksLeft={talksLeft}
        hasQuestBusiness={hasQuestBusiness}
        disabled={isPending}
        onTalk={onTalk}
      />

      {dialog}
    </>
  )
}

export default TownNpc
