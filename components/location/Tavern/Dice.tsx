import { useState } from "react"

import {
  DICE_JACKPOT_MULTIPLIER,
  DICE_PERCENTAGE_DEFAULT_VALUE,
  DICE_PERCENTAGE_VALUES,
  DICE_WON_MULTIPLIER_MAX,
  DICE_WON_MULTIPLIER_MIN,
} from "@/constants/tavern"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useTavern } from "@/hooks/queries/useTavern"
import { getBet } from "@/utils/dice"

export type TavernTab = "Buy" | "Dice"

const TavernDice = () => {
  const { data: player } = useGetPlayer()
  const { playDice } = useTavern()

  const [betPercentage, setBetPercentage] = useState(
    DICE_PERCENTAGE_DEFAULT_VALUE
  )

  const bet = getBet(betPercentage, player?.character.gold || 0)
  const profitMin = Math.floor(bet * DICE_WON_MULTIPLIER_MIN)
  const profitMax = Math.floor(bet * DICE_WON_MULTIPLIER_MAX)
  const profitJackpot = Math.floor(bet * DICE_JACKPOT_MULTIPLIER)

  const disabled = bet > (player?.character.gold || 0)

  const handlePlayDice = () => {
    playDice({ betPercentage })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row join mb-8">
        <div className="flex items-center">
          {DICE_PERCENTAGE_VALUES.map((value) => (
            <button
              key={`tavern-dice-bet-${value}`}
              className={`btn join-item ${
                betPercentage === value ? "btn-primary" : "bg-gray-800"
              }`}
              onClick={() => setBetPercentage(value)}
            >
              Bet {value === 100 ? "all" : `${value}%`}
            </button>
          ))}

          <button
            className="btn btn-lg btn-primary ml-4"
            disabled={disabled}
            onClick={handlePlayDice}
          >
            Play
          </button>
        </div>
      </div>

      <p className="text-lg font-serif">You will bet {bet} gold</p>

      <p className="text-sm mt-2">
        You have 1/6 change of winning between {profitMin} and {profitMax} gold.
        If you hit jackpot you would get {profitJackpot} gold.
      </p>
    </div>
  )
}

export default TavernDice
