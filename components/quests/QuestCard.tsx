"use client"

import { Mail, Package, Search } from "lucide-react"
import type { ReactNode } from "react"
import { GiScrollUnfurled } from "react-icons/gi"

import useModal from "@/app/stores/modals"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getNpcById, getNpcPlace } from "@/constants/npcs"
import { useQuest } from "@/hooks/queries/useQuest"
import { formatReward, getQuestObjective } from "@/utils/npc/questText"

type Props = {
  quest: Quest
  /** Replaces the default confirmation and abandon request, for stories and tests */
  onAbandon?: () => void
}

const QUEST_ICONS: Record<QuestType, ReactNode> = {
  delivery: <Mail />,
  procurement: <Package />,
  messageChain: <GiScrollUnfurled />,
  findPerson: <Search />,
}

const QuestCard = ({ quest, onAbandon }: Props) => {
  const { abandonQuest, isPending } = useQuest()
  const { setModal, removeModal } = useModal()

  const giver = getNpcById(quest.giverId)
  const { reward } = quest
  const ruledOut = quest.type === "findPerson" ? (quest.ruledOut ?? []) : []

  const handleAbandon = async () => {
    removeModal("abandonQuest")

    try {
      await abandonQuest({ questId: quest.id })
    } catch {
      // The hook already shows a toast
    }
  }

  const openAbandonModal = () => {
    setModal({
      id: "abandonQuest",
      title: "Are you sure?",
      content: (
        <div className="flex flex-col gap-4">
          <p>
            Do you really want to abandon the quest for {giver?.name}? You will
            not receive the reward.
          </p>

          <div className="flex gap-2">
            <Button size="sm" onClick={handleAbandon}>
              Yes, abandon quest
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => removeModal("abandonQuest")}
            >
              Cancel
            </Button>
          </div>
        </div>
      ),
    })
  }

  return (
    <Card className="min-w-0 gap-2 p-4">
      <div className="flex items-center gap-2">
        <span className="text-gold [&_svg]:size-5">
          {QUEST_ICONS[quest.type]}
        </span>

        <div className="min-w-0">
          <p className="truncate font-serif font-semibold">{giver?.name}</p>

          {giver && (
            <p className="text-muted-foreground truncate text-xs">
              {getNpcPlace(giver)}
            </p>
          )}
        </div>
      </div>

      <p className="text-sm">{getQuestObjective(quest)}</p>

      {!!ruledOut.length && (
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-muted-foreground text-xs">Ruled out</span>

          {ruledOut.map((town) => (
            <Badge key={town} variant="secondary">
              {town}
            </Badge>
          ))}
        </div>
      )}

      <p className="text-gold text-sm">Reward: {formatReward(reward)}</p>

      <div className="flex justify-end">
        <Button
          variant="secondary"
          size="xs"
          onClick={onAbandon ?? openAbandonModal}
          disabled={isPending}
        >
          Abandon
        </Button>
      </div>
    </Card>
  )
}

export default QuestCard
