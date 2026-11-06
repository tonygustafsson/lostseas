import { MessageCircle } from "lucide-react"

import NpcPortraitCard from "@/components/npc/NpcPortraitCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type TalkButtonProps = {
  npc: Npc
  talksLeft: number
  hasQuestBusiness: boolean
  disabled?: boolean
  size?: "default" | "lg"
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
  size = "lg",
  onTalk,
}: TalkButtonProps) => {
  // Quest business never uses a talk, so it is always possible
  const canTalk = talksLeft > 0 || hasQuestBusiness

  return (
    <Button
      size={size}
      variant="secondary"
      disabled={!canTalk || disabled}
      onClick={onTalk}
    >
      <MessageCircle className={size === "lg" ? "size-6" : undefined} />
      Talk
    </Button>
  )
}

type Props = Omit<TalkButtonProps, "size">

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
