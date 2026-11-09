import { Coins } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import TypewriterText from "@/components/npc/TypewriterText"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getNpcImage, getNpcPlace } from "@/constants/npcs"
import { cn } from "@/lib/utils"
import type { TalkLine } from "@/utils/actions/npc"
import { formatReward } from "@/utils/npc/questText"
import { capitalize } from "@/utils/string"

type Props = {
  npc: Npc
  open: boolean
  line: TalkLine | null
  /** Changes with every new line, even when its text repeats, so it types out again */
  lineId: number
  reply: string | null
  isPending: boolean
  onAnswer: (index: number) => void
  onAccept: () => void
  onDecline: () => void
  onHandIn: () => void
  onNotYet: () => void
  /** Varies between lines, so the button does not get repetitive */
  goOnLabel: string
  /** Carries the conversation on with a new line */
  onGoOn: () => void
  onClose: () => void
}

const TalkDialog = ({
  npc,
  open,
  line,
  lineId,
  reply,
  isPending,
  onAnswer,
  onAccept,
  onDecline,
  onHandIn,
  onNotYet,
  goOnLabel,
  onGoOn,
  onClose,
}: Props) => {
  // Which line and reply have finished typing, so buttons wait for the text
  const [typedLineId, setTypedLineId] = useState<number | null>(null)
  const [typedReplyId, setTypedReplyId] = useState<number | null>(null)
  const [typedFarewellId, setTypedFarewellId] = useState<number | null>(null)

  const isAnswering = line?.kind === "question" && !reply
  const isSpoken = reply ? typedReplyId === lineId : typedLineId === lineId

  // A tired NPC says their farewell last, after any reply to a question
  const farewell =
    (line?.kind === "statement" || line?.kind === "question") && !isAnswering
      ? line.farewell
      : undefined
  const isTyped = farewell ? typedFarewellId === lineId : isSpoken

  // Nothing more to say, so leaving is all that is left
  const isDone = !!farewell || line?.kind === "tired"

  const reward = line?.kind === "questProgress" ? line.reward : undefined

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex-row items-center gap-4">
          <div className="border-gold/30 relative size-16 shrink-0 overflow-hidden rounded-xl border">
            <Image
              src={getNpcImage(npc)}
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <DialogTitle className="font-serif text-xl">{npc.name}</DialogTitle>
            <DialogDescription>
              {capitalize(getNpcPlace(npc))}
            </DialogDescription>
          </div>
        </DialogHeader>

        {line && (
          <div className="bg-secondary/50 border-border text-foreground flex flex-col gap-4 rounded-xl border p-4 text-base">
            <p>
              <TypewriterText
                key={lineId}
                text={line.text}
                onDone={() => setTypedLineId(lineId)}
              />
            </p>

            {reply && (
              <p>
                <TypewriterText
                  key={lineId}
                  text={reply}
                  onDone={() => setTypedReplyId(lineId)}
                />
              </p>
            )}

            {farewell && isSpoken && (
              <p className="text-muted-foreground italic">
                <TypewriterText
                  key={lineId}
                  text={farewell}
                  onDone={() => setTypedFarewellId(lineId)}
                />
              </p>
            )}

            {reward && (
              <p
                className={cn(
                  "text-gold flex items-center gap-2 font-medium",
                  !isTyped && "invisible"
                )}
              >
                <Coins className="size-5" />
                Reward: {formatReward(reward)}
              </p>
            )}
          </div>
        )}

        {/* Buttons keep their space while the text types, so nothing jumps */}
        {isAnswering && (
          <div
            className={cn("flex flex-col gap-2", !isTyped && "invisible")}
            aria-hidden={!isTyped}
          >
            {line.answers.map((answer, index) => (
              <Button
                key={`answer-${index}`}
                variant="secondary"
                disabled={isPending}
                onClick={() => onAnswer(index)}
                className="h-auto w-full justify-start py-2 text-left whitespace-normal"
              >
                {answer}
              </Button>
            ))}
          </div>
        )}

        {line && !isAnswering && (
          <DialogFooter
            className={cn(!isTyped && "invisible")}
            aria-hidden={!isTyped}
          >
            {line.kind === "questOffer" && (
              <>
                <Button
                  variant="secondary"
                  disabled={isPending}
                  onClick={onDecline}
                >
                  Decline
                </Button>

                <Button disabled={isPending} onClick={onAccept}>
                  Accept
                </Button>
              </>
            )}

            {line.kind === "handIn" && (
              <>
                <Button
                  variant="secondary"
                  disabled={isPending}
                  onClick={onNotYet}
                >
                  Not yet
                </Button>

                <Button disabled={isPending} onClick={onHandIn}>
                  Hand over
                </Button>
              </>
            )}

            {line.kind !== "questOffer" && line.kind !== "handIn" && (
              <>
                <Button
                  variant={isDone ? "default" : "secondary"}
                  onClick={onClose}
                >
                  {isDone ? "Farewell" : "Leave"}
                </Button>

                {!isDone && (
                  <Button disabled={isPending} onClick={onGoOn}>
                    {goOnLabel}
                  </Button>
                )}
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default TalkDialog
