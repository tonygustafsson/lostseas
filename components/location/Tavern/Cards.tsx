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

import {
  CARDS_PERCENTAGE_DEFAULT_VALUE,
  CARDS_PERCENTAGE_VALUES,
} from "@/constants/tavern"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useTavern } from "@/hooks/queries/useTavern"
import { getRandomInt } from "@/utils/random"
import { getCardsBet } from "@/utils/tavern"

const CARDS = [
  { text: "The Acorn", icon: <GiAcorn className="h-12 w-12 text-primary" /> },
  { text: "The Hat", icon: <GiPirateHat className="h-12 w-12 text-primary" /> },
  { text: "The Anchor", icon: <GiAnchor className="h-12 w-12 text-primary" /> },
  {
    text: "The Sword",
    icon: <GiAncientSword className="h-12 w-12 text-primary" />,
  },
  {
    text: "The Star",
    icon: <GiBarbedStar className="h-12 w-12 text-primary" />,
  },
  { text: "The Boar", icon: <GiBoar className="h-12 w-12 text-primary" /> },
  {
    text: "The Bottle",
    icon: <GiBrandyBottle className="h-12 w-12 text-primary" />,
  },
  { text: "The Cat", icon: <GiCat className="h-12 w-12 text-primary" /> },
  {
    text: "The Mask",
    icon: <GiCeremonialMask className="h-12 w-12 text-primary" />,
  },
  {
    text: "The Leaf",
    icon: <GiChestnutLeaf className="h-12 w-12 text-primary" />,
  },
  {
    text: "The Chicken",
    icon: <GiChicken className="h-12 w-12 text-primary" />,
  },
  {
    text: "The Fish",
    icon: <GiCirclingFish className="h-12 w-12 text-primary" />,
  },
  {
    text: "The Swords",
    icon: <GiCrossedSwords className="h-12 w-12 text-primary" />,
  },
  {
    text: "The Knife",
    icon: <GiCurvyKnife className="h-12 w-12 text-primary" />,
  },
  { text: "The Eel", icon: <GiEel className="h-12 w-12 text-primary" /> },
  {
    text: "The Leaf",
    icon: <GiFallingLeaf className="h-12 w-12 text-primary" />,
  },
  {
    text: "The Skull",
    icon: <GiHarryPotterSkull className="h-12 w-12 text-primary" />,
  },
  {
    text: "The Bottle",
    icon: <GiHeartBottle className="h-12 w-12 text-primary" />,
  },
  { text: "The Bird", icon: <GiIbis className="h-12 w-12 text-primary" /> },
  {
    text: "The Mushroom",
    icon: <GiSuperMushroom className="h-12 w-12 text-primary" />,
  },
  { text: "The Owl", icon: <GiOwl className="h-12 w-12 text-primary" /> },
  {
    text: "The Potion",
    icon: <GiPotionBall className="h-12 w-12 text-primary" />,
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

  const availableCards = useMemo(() => {
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
    card: number
  ) => {
    if (selectedCard === card) {
      setSelectedCard(undefined)
    } else {
      setSelectedCard(card)
    }

    const element = (e.target as HTMLElement).closest("button")
    element?.blur()

    setCorrectCard(undefined)
  }

  const handlePlayCards = async () => {
    if (typeof selectedCard === "undefined") return

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
      <div className="mb-8 flex flex-row lg:join">
        <div className="flex flex-wrap items-center lg:gap-0">
          {CARDS_PERCENTAGE_VALUES.map((value) => (
            <button
              key={`tavern-cards-bet-${value}`}
              className={`btn join-item w-1/2 lg:w-auto ${
                betPercentage === value ? "btn-primary" : "bg-gray-800"
              }`}
              onClick={() => setBetPercentage(value)}
            >
              Bet {value === 100 ? "all" : `${value}%`}
            </button>
          ))}

          <button
            className="btn btn-primary mt-4 w-full lg:ml-4 lg:mt-0 lg:w-fit"
            disabled={disabled}
            onClick={handlePlayCards}
          >
            Play
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-4">
        {availableCards.map((_, index) => (
          <button
            key={`tavern-card-${index}`}
            onClick={(e) => handleSelectCard(e, index)}
            className={`flex h-44 w-32 items-center justify-center rounded-lg border ${getCardClassNames(
              index
            )}`}
          >
            <div className="flex flex-col items-center gap-3">
              {CARDS[index].icon}
              <p className="text-gray-400">{CARDS[index].text}</p>
            </div>{" "}
          </button>
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
