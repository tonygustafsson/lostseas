import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import type { TavernFightResult } from "@/hooks/queries/useTavern"
import { formatGold } from "@/utils/number"

type Props = {
  noOfSailors: number
  isHostile: boolean
  /** Set once a fight is over, the dialog then shows how it went */
  result?: TavernFightResult
  isPending?: boolean
  onAccept: () => void
  onFight: () => void
  onIgnore: () => void
  onContinue: () => void
}

const getContent = ({
  noOfSailors,
  isHostile,
  result,
}: Pick<Props, "noOfSailors" | "isHostile" | "result">) => {
  if (result?.success) {
    return {
      title: `You beat ${result.numberOfSailors} sailors`,
      message: `They empty their pockets and you get ${formatGold(result.loot)}. Your crew lost ${result.healthLoss}% health.`,
    }
  }

  if (result) {
    return {
      title: `${result.numberOfSailors} sailors beat you`,
      message: `Ouch! Your crew lost ${result.healthLoss}% health.`,
    }
  }

  return {
    title: `${noOfSailors} sailors approach you`,
    message: isHostile
      ? "After a couple of drinks they start to get aggressive and want to fight you."
      : "After a couple of drinks and a few games of cards, it turns out they want to join you on your adventure.",
  }
}

/** Sailors who walk up to the player. There is no way out but to answer them. */
const TavernEventDialog = ({
  noOfSailors,
  isHostile,
  result,
  isPending,
  onAccept,
  onFight,
  onIgnore,
  onContinue,
}: Props) => {
  const { title, message } = getContent({ noOfSailors, isHostile, result })

  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        className="gap-0 p-6 pb-8 sm:max-w-xl"
      >
        <div className="pointer-events-none relative h-48 overflow-hidden rounded-lg select-none sm:h-56">
          <Image
            src={`/img/cards/tavern/${isHostile || result ? "crew-fight" : "crew-joining"}.png`}
            alt=""
            fill
            sizes="(min-width: 640px) 576px, 100vw"
            className="object-cover"
          />
        </div>

        <DialogTitle className="from-gold-light via-gold to-gold-dark mt-6 bg-linear-to-b bg-clip-text font-serif text-2xl font-bold text-transparent">
          {title}
        </DialogTitle>

        <div className="from-gold/60 mt-4 h-px w-32 bg-linear-to-r to-transparent" />

        <DialogDescription className="mt-4 text-base">
          {message}
        </DialogDescription>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {result && (
            <Button size="lg" className="sm:col-span-2" onClick={onContinue}>
              Continue
            </Button>
          )}

          {!result && isHostile && (
            <>
              <Button size="lg" disabled={isPending} onClick={onFight}>
                Fight them
              </Button>

              <Button
                size="lg"
                variant="secondary"
                disabled={isPending}
                onClick={onIgnore}
              >
                Avoid
              </Button>
            </>
          )}

          {!result && !isHostile && (
            <>
              <Button size="lg" onClick={onAccept}>
                Take them in
              </Button>

              <Button size="lg" variant="secondary" onClick={onIgnore}>
                Pass
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TavernEventDialog
