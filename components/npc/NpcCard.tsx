import { MessageCircle } from "lucide-react"

import ActionCard from "@/components/ActionCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getNpcImage } from "@/constants/npcs"

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

/** The character in their own tab, so they can take the full card */
const NpcCard = (props: Props) => (
  <ActionCard
    title={props.npc.name}
    message={props.npc.description}
    image={getNpcImage(props.npc)}
    icon={<MessageCircle />}
    actions={
      <div className="flex items-center gap-4">
        <TalkButton {...props} />

        {props.hasQuestBusiness && <QuestBadge />}
      </div>
    }
  />
)

export default NpcCard
