import { useState } from "react"

import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { useTavern } from "@/hooks/queries/useTavern"

export type TavernTab = "Buy" | "Dice"

const BET_VALUES = [5, 10, 25, 50, 75, 100]
const BET_DEFAULT = 10
const PROFIT_MIN = 2
const PROFIT_MAX = 5
const PROFIT_JACKPOT = 20

const getBet = (percentage: number, doubloons: number) => {
  if (percentage === 100) return doubloons

  return Math.floor((percentage / 100) * doubloons)
}

const TavernDice = () => {
  const { data: player } = useGetPlayer()
  const { playDice } = useTavern()

  const [betPercentage, setBetPercentage] = useState(BET_DEFAULT)

  const bet = getBet(betPercentage, player?.character.doubloons || 0)
  const profitMin = Math.floor(bet * PROFIT_MIN)
  const profitMax = Math.floor(bet * PROFIT_MAX)
  const profitJackpot = Math.floor(bet * PROFIT_JACKPOT)

  const disabled = bet > (player?.character.doubloons || 0)

  const handlePlayDice = () => {
    playDice({ playerId: player?.id || "", betPercentage })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row join mb-8">
        <div className="flex items-center">
          {BET_VALUES.map((value) => (
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

      <p className="text-lg font-serif">You will bet {bet} doubloons</p>

      <p className="text-sm mt-2">
        You have 1/6 change of winning between {profitMin} and {profitMax}{" "}
        doubloons. If you hit jackpot you would get {profitJackpot} doubloons.
      </p>
    </div>
  )
}

export default TavernDice
