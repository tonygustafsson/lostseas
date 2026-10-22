import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { CARDS } from "@/constants/cards"
import {
  CARDS_PERCENTAGE_DEFAULT_VALUE,
  CARDS_PERCENTAGE_VALUES,
} from "@/constants/tavern"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useTavern } from "@/hooks/queries/useTavern"
import { cn } from "@/lib/utils"
import { getRandomInt } from "@/utils/random"
import { getCardsBet } from "@/utils/tavern"

const HAND_SIZE = 5

// Fans the hand out like cards held in a hand. On mobile the cards wrap into
// two rows (3 + 2), so each one tilts outwards from the centre of its row.
const CARD_ROTATIONS = [
  "-rotate-6",
  "rotate-0 xl:-rotate-3",
  "rotate-6 xl:rotate-0",
  "-rotate-6 xl:rotate-3",
  "rotate-6",
]

const TavernCards = () => {
  const { data: player } = useGetPlayer()
  const { playCards, isPlayingCard } = useTavern()

  const [betPercentage, setBetPercentage] = useState(
    CARDS_PERCENTAGE_DEFAULT_VALUE
  )
  const [selectedCard, setSelectedCard] = useState<number>()
  const [correctCard, setCorrectCard] = useState<number>()

  const activeCardIndexes = useMemo(() => {
    const cards: number[] = []

    for (let i = 0; i < HAND_SIZE; i++) {
      let randomCardIndex = getRandomInt(0, CARDS.length - 1)

      while (cards.includes(randomCardIndex)) {
        randomCardIndex = getRandomInt(0, CARDS.length - 1)
      }

      cards.push(randomCardIndex)
    }

    return cards
  }, [])

  const gold = player?.character.gold || 0
  const bet = getCardsBet(betPercentage, gold)
  const potentialProfit = Math.floor(bet * HAND_SIZE)

  const hasSelectedCard = typeof selectedCard !== "undefined"
  const hasResult = typeof correctCard !== "undefined"
  const hasWon = hasResult && selectedCard === correctCard

  const canAfford = bet > 0 && bet <= gold
  const disabled = !canAfford || !hasSelectedCard || isPlayingCard

  const handleSelectCard = (cardIndex: number) => {
    setSelectedCard(selectedCard === cardIndex ? undefined : cardIndex)
    setCorrectCard(undefined)
  }

  const handlePlayCards = async () => {
    if (typeof selectedCard === "undefined") return

    try {
      const cardsResult = await playCards({ betPercentage, selectedCard })

      setCorrectCard(cardsResult?.data?.correctCard)
    } catch {
      // useTavern displays the request error in its toast handler.
    }
  }

  const getPlayLabel = () => {
    if (isPlayingCard) return "Shuffling..."
    if (!canAfford) return "Not enough gold"
    if (!hasSelectedCard) return "Pick a card to play"
    return `Bet ${bet} gold`
  }

  const getCardClassNames = (index: number) => {
    if (hasResult && index === correctCard)
      return "border-success bg-success/30 -translate-y-4 scale-105 sm:scale-110 shadow-lg shadow-success/50"
    if (hasResult && index === selectedCard)
      return "border-destructive bg-destructive/30 opacity-80"
    if (index === selectedCard)
      return "border-gold bg-gold/20 -translate-y-4 scale-105 sm:scale-110 shadow-lg shadow-gold/40"
    return "border-border bg-card hover:border-gold-dark hover:-translate-y-2"
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-4">
      <section className="flex flex-col items-center gap-2">
        <h3 className="font-serif text-lg">Place your bet</h3>

        <div className="flex flex-wrap justify-center gap-2">
          {CARDS_PERCENTAGE_VALUES.map((value) => (
            <Button
              key={`tavern-cards-bet-${value}`}
              variant={betPercentage === value ? "default" : "secondary"}
              disabled={isPlayingCard}
              onClick={() => setBetPercentage(value)}
            >
              {value === 100 ? "All in" : `${value}%`}
            </Button>
          ))}
        </div>

        <p className="text-muted-foreground text-sm">
          You have {gold} gold. Betting {bet}.
        </p>
      </section>

      <section className="flex flex-col items-center gap-8">
        <h3 className="font-serif text-lg">Pick the lucky card</h3>

        <div className="grid max-w-80 grid-cols-6 gap-x-2 gap-y-4 xl:max-w-none xl:grid-cols-5 xl:gap-4">
          {activeCardIndexes.map((activeCardIndex, index) => {
            const { Icon, text } = CARDS[activeCardIndex]

            return (
              <button
                key={`tavern-card-${activeCardIndex}`}
                type="button"
                disabled={isPlayingCard}
                aria-pressed={index === selectedCard}
                onClick={() => handleSelectCard(index)}
                className={cn(
                  "relative flex h-32 w-24 cursor-pointer flex-col items-center justify-center gap-2 justify-self-center rounded-lg border-2 px-1 transition-all duration-200 hover:z-10 xl:h-44 xl:w-32 xl:gap-4",
                  index === 3
                    ? "col-span-2 col-start-2 xl:col-span-1 xl:col-start-auto"
                    : "col-span-2 xl:col-span-1",
                  index !== selectedCard && index !== correctCard
                    ? CARD_ROTATIONS[index]
                    : "z-10 rotate-0",
                  getCardClassNames(index)
                )}
              >
                <Icon className="text-gold size-8 xl:size-12" />

                <span className="text-muted-foreground text-center font-serif text-xs xl:text-sm">
                  {text}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="flex w-full flex-col items-center gap-2 md:w-auto">
        <h3 className="font-serif text-lg">Try your luck</h3>

        <Button
          size="lg"
          variant="highlight"
          className="w-full md:w-auto"
          disabled={disabled}
          onClick={handlePlayCards}
        >
          {getPlayLabel()}
        </Button>

        <p className="text-muted-foreground text-sm">
          One in {HAND_SIZE} chance of winning {potentialProfit} gold.
        </p>

        {hasResult && (
          <p
            className={cn(
              "mt-2 font-serif text-lg",
              hasWon ? "text-success" : "text-destructive"
            )}
          >
            {hasWon
              ? `${CARDS[activeCardIndexes[correctCard]].text} it was! You win!`
              : `Unlucky! It was ${CARDS[activeCardIndexes[correctCard]].text}.`}
          </p>
        )}
      </section>
    </div>
  )
}

export default TavernCards
