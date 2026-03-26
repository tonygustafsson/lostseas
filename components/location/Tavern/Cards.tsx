import { useMemo, useState } from "react"
import {
  GiAcorn,
  GiAnchor,
  GiAncientSword,
  GiBarbedStar,
  GiBoar,
  GiBrandyBottle,
  GiCat,
  GiCeremonialMask,
  GiChestnutLeaf,
  GiChicken,
  GiCirclingFish,
  GiCrossedSwords,
  GiCurvyKnife,
  GiEel,
  GiFallingLeaf,
  GiHarryPotterSkull,
  GiHeartBottle,
  GiIbis,
  GiOwl,
  GiPirateHat,
  GiPotionBall,
  GiSuperMushroom,
} from "react-icons/gi"

import { Button } from "@/components/ui/button"
import {
  CARDS_PERCENTAGE_DEFAULT_VALUE,
  CARDS_PERCENTAGE_VALUES,
} from "@/constants/tavern"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useTavern } from "@/hooks/queries/useTavern"
import { getRandomInt } from "@/utils/random"
import { getCardsBet } from "@/utils/tavern"

const CARDS = [
  { text: "The Acorn", icon: <GiAcorn className="text-accent size-12!" /> },
  { text: "The Hat", icon: <GiPirateHat className="text-accent size-12!" /> },
  { text: "The Anchor", icon: <GiAnchor className="text-accent size-12!" /> },
  {
    text: "The Sword",
    icon: <GiAncientSword className="text-accent size-12!" />,
  },
  {
    text: "The Star",
    icon: <GiBarbedStar className="text-accent size-12!" />,
  },
  { text: "The Boar", icon: <GiBoar className="text-accent size-12!" /> },
  {
    text: "The Bottle",
    icon: <GiBrandyBottle className="text-accent size-12!" />,
  },
  { text: "The Cat", icon: <GiCat className="text-accent size-12!" /> },
  {
    text: "The Mask",
    icon: <GiCeremonialMask className="text-accent size-12!" />,
  },
  {
    text: "The Leaf",
    icon: <GiChestnutLeaf className="text-accent size-12!" />,
  },
  {
    text: "The Chicken",
    icon: <GiChicken className="text-accent size-12!" />,
  },
  {
    text: "The Fish",
    icon: <GiCirclingFish className="text-accent size-12!" />,
  },
  {
    text: "The Swords",
    icon: <GiCrossedSwords className="text-accent size-12!" />,
  },
  {
    text: "The Knife",
    icon: <GiCurvyKnife className="text-accent size-12!" />,
  },
  { text: "The Eel", icon: <GiEel className="text-accent size-12!" /> },
  {
    text: "The Leaf",
    icon: <GiFallingLeaf className="text-accent size-12!" />,
  },
  {
    text: "The Skull",
    icon: <GiHarryPotterSkull className="text-accent size-12!" />,
  },
  {
    text: "The Bottle",
    icon: <GiHeartBottle className="text-accent size-12!" />,
  },
  { text: "The Bird", icon: <GiIbis className="text-accent size-12!" /> },
  {
    text: "The Mushroom",
    icon: <GiSuperMushroom className="text-accent size-12!" />,
  },
  { text: "The Owl", icon: <GiOwl className="text-accent size-12!" /> },
  {
    text: "The Potion",
    icon: <GiPotionBall className="text-accent size-12!" />,
  },
]

const TavernCards = () => {
  const { data: player } = useGetPlayer()
  const { playCards } = useTavern()

  const [betPercentage, setBetPercentage] = useState(
    CARDS_PERCENTAGE_DEFAULT_VALUE
  )
  const [selectedCard, setSelectedCard] = useState<number>()
  const [correctCard, setCorrectCard] = useState<number>()

  const activeCardIndexes = useMemo(() => {
    const cards: number[] = []

    for (let i = 0; i < 5; i++) {
      let randomCardIndex = getRandomInt(0, CARDS.length - 1)

      while (cards.includes(randomCardIndex)) {
        randomCardIndex = getRandomInt(0, CARDS.length - 1)
      }

      cards.push(randomCardIndex)
    }

    return cards
  }, [])

  const bet = getCardsBet(betPercentage, player?.character.gold || 0)
  const potentialProfit = Math.floor(bet * 5)

  const disabled =
    !bet ||
    bet > (player?.character.gold || 0) ||
    typeof selectedCard === "undefined"

  const handleSelectCard = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    cardIndex: number
  ) => {
    setSelectedCard(selectedCard === cardIndex ? undefined : cardIndex)

    const element = (e.target as HTMLElement).closest("button")
    element?.blur()

    setCorrectCard(undefined)
  }

  const handlePlayCards = async () => {
    if (typeof selectedCard === "undefined") return

    console.log({ selectedCard, betPercentage })

    const cardsResult = await playCards({ betPercentage, selectedCard })
    const correctCard = cardsResult?.data?.correctCard

    setCorrectCard(correctCard)
  }

  const getCardClassNames = (index: number) => {
    if (index === correctCard)
      return "bg-green-900 hover:bg-green-800 border-green-700"
    if (index === selectedCard)
      return "bg-pink-900 hover:bg-pink-800 border-pink-700"
    return "bg-slate-800 hover:bg-slate-700 border-gray-700"
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 flex flex-row">
        <div className="flex flex-wrap items-center gap-1">
          {CARDS_PERCENTAGE_VALUES.map((value) => (
            <Button
              key={`tavern-cards-bet-${value}`}
              variant={betPercentage === value ? "default" : "secondary"}
              className="w-1/2 lg:w-auto"
              onClick={() => setBetPercentage(value)}
            >
              Bet {value === 100 ? "all" : `${value}%`}
            </Button>
          ))}

          <Button
            className="mt-4 w-full lg:mt-0 lg:ml-4 lg:w-fit"
            disabled={disabled}
            onClick={() => handlePlayCards()}
          >
            Play
          </Button>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-4">
        {activeCardIndexes.map((activeCardIndex, index) => (
          <Button
            key={`tavern-card-${activeCardIndex}`}
            onClick={(e) => handleSelectCard(e, index)}
            className={`flex h-44 w-32 items-center justify-center rounded-lg border ${getCardClassNames(
              index
            )}`}
          >
            <div className="flex flex-col items-center gap-3">
              {CARDS[activeCardIndex].icon}

              <p className="text-gray-400">{CARDS[activeCardIndex].text}</p>
            </div>
          </Button>
        ))}
      </div>

      <p className="mt-8 font-serif text-lg">You will bet {bet} gold</p>

      <p className="mt-2 text-sm">
        You have 1/5 change of winning {potentialProfit} gold.
      </p>
    </div>
  )
}

export default TavernCards
