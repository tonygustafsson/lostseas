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

import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getRandomInt } from "@/utils/random"

const pickedCards: number[] = []

const CARDS = [
  { text: "The Acorn", icon: <GiAcorn className="w-12 h-12 text-primary" /> },
  { text: "The Hat", icon: <GiPirateHat className="w-12 h-12 text-primary" /> },
  { text: "The Anchor", icon: <GiAnchor className="w-12 h-12 text-primary" /> },
  {
    text: "The Sword",
    icon: <GiAncientSword className="w-12 h-12 text-primary" />,
  },
  {
    text: "The Star",
    icon: <GiBarbedStar className="w-12 h-12 text-primary" />,
  },
  { text: "The Boar", icon: <GiBoar className="w-12 h-12 text-primary" /> },
  {
    text: "The Bottle",
    icon: <GiBrandyBottle className="w-12 h-12 text-primary" />,
  },
  { text: "The Cat", icon: <GiCat className="w-12 h-12 text-primary" /> },
  {
    text: "The Mask",
    icon: <GiCeremonialMask className="w-12 h-12 text-primary" />,
  },
  {
    text: "The Leaf",
    icon: <GiChestnutLeaf className="w-12 h-12 text-primary" />,
  },
  {
    text: "The Chicken",
    icon: <GiChicken className="w-12 h-12 text-primary" />,
  },
  {
    text: "The Fish",
    icon: <GiCirclingFish className="w-12 h-12 text-primary" />,
  },
  {
    text: "The Swords",
    icon: <GiCrossedSwords className="w-12 h-12 text-primary" />,
  },
  {
    text: "The Knife",
    icon: <GiCurvyKnife className="w-12 h-12 text-primary" />,
  },
  { text: "The Eel", icon: <GiEel className="w-12 h-12 text-primary" /> },
  {
    text: "The Leaf",
    icon: <GiFallingLeaf className="w-12 h-12 text-primary" />,
  },
  {
    text: "The Skull",
    icon: <GiHarryPotterSkull className="w-12 h-12 text-primary" />,
  },
  {
    text: "The Bottle",
    icon: <GiHeartBottle className="w-12 h-12 text-primary" />,
  },
  { text: "The Bird", icon: <GiIbis className="w-12 h-12 text-primary" /> },
  {
    text: "The Mushroom",
    icon: <GiSuperMushroom className="w-12 h-12 text-primary" />,
  },
  { text: "The Owl", icon: <GiOwl className="w-12 h-12 text-primary" /> },
  {
    text: "The Potion",
    icon: <GiPotionBall className="w-12 h-12 text-primary" />,
  },
]

const RandomCard = () => {
  let randomCardIndex = getRandomInt(0, CARDS.length - 1)

  while (pickedCards.includes(randomCardIndex)) {
    randomCardIndex = getRandomInt(0, CARDS.length - 1)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {CARDS[randomCardIndex].icon}
      <p className="text-gray-400">{CARDS[randomCardIndex].text}</p>
    </div>
  )
}

const TavernCards = () => {
  const { data: player } = useGetPlayer()

  return (
    <div>
      <p>Hej {player?.character.name}</p>

      <div className="flex justify-center gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={`tavern-card-${index}`}
            className="flex items-center justify-center w-32 h-44 rounded-lg bg-slate-800 hover:bg-slate-700 focus:bg-pink-900 border border-gray-700"
          >
            <RandomCard />
          </button>
        ))}
      </div>
    </div>
  )
}

export default TavernCards
