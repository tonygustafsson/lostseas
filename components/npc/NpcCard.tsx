import { MessageCircle, ScrollText } from "lucide-react"

import NpcPortraitCard from "@/components/npc/NpcPortraitCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type TalkButtonProps = {
  disabled?: boolean
  variant?: "default" | "secondary"
  onTalk: () => void
}

export const QuestBadge = () => (
  <Badge className="bg-info/10 text-info">
    <ScrollText />
    Quest
  </Badge>
)

/** Shared by the NPC card and the governor card */
export const TalkButton = ({
  disabled,
  variant = "default",
  onTalk,
}: TalkButtonProps) => (
  <Button
    size="lg"
    variant={variant}
    disabled={disabled}
    onClick={onTalk}
    className="w-full @xl:w-auto"
  >
    <MessageCircle />
    Talk
  </Button>
)

type Props = {
  npc: Npc
  hasQuestBusiness: boolean
  disabled?: boolean
  onTalk: () => void
}

/** The character in their own tab, with a round portrait beside their story */
const NpcCard = (props: Props) => (
  <NpcPortraitCard
    npc={props.npc}
    title={props.npc.name}
    actions={
      <>
        <TalkButton disabled={props.disabled} onTalk={props.onTalk} />

        {props.hasQuestBusiness && <QuestBadge />}
      </>
    }
  >
    <p>{props.npc.description}</p>
  </NpcPortraitCard>
)

export default NpcCard
