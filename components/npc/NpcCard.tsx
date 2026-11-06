import { MessageCircle } from "lucide-react"

import NpcPortraitCard from "@/components/npc/NpcPortraitCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type TalkButtonProps = {
  npc: Npc
  talksLeft: number
  hasQuestBusiness: boolean
  disabled?: boolean
  /** Gold unless another action on the card is the main one */
  variant?: "default" | "secondary"
  onTalk: () => void
}

export const QuestBadge = () => (
  <Badge className="bg-info/10 text-info">Quest</Badge>
)

/** Shared by the NPC card and the governor card */
export const TalkButton = ({
  talksLeft,
  hasQuestBusiness,
  disabled,
  variant = "default",
  onTalk,
}: TalkButtonProps) => {
  // Quest business never uses a talk, so it is always possible
  const canTalk = talksLeft > 0 || hasQuestBusiness

  return (
    <Button
      size="lg"
      variant={variant}
      disabled={!canTalk || disabled}
      onClick={onTalk}
      className="w-full @xl:w-auto"
    >
      <MessageCircle />
      Talk
    </Button>
  )
}

type Props = Omit<TalkButtonProps, "variant">

/** The character in their own tab, with a round portrait beside their story */
const NpcCard = (props: Props) => (
  <NpcPortraitCard
    npc={props.npc}
    title={props.npc.name}
    actions={
      <>
        <TalkButton {...props} />

        {props.hasQuestBusiness && <QuestBadge />}
      </>
    }
  >
    <p>{props.npc.description}</p>
  </NpcPortraitCard>
)

export default NpcCard
