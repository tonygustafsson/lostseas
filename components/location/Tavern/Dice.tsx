import { useState } from "react"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

export type TavernTab = "Buy" | "Dice"

const betValues = [5, 10, 25, 50, 75, 100]
const defaultBet = 10

const TavernDice = () => {
  const { data: player } = useGetPlayer()

  const [betPercentage, setBetPercentage] = useState(defaultBet)
  const [bet, setBet] = useState(0)

  const isEnabled = (player?.character.doubloons || 0) >= betPercentage

  return (
    <>
      <p>Play dice and get a chance of winning some money.</p>
      <p>
        You have 1/6 chance to win. If you get really lucky you will win the
        huge Jackpot.
      </p>

      <div className="flex flex-col items-center">
        <div className="flex flex-row join my-8">
          {betValues.map((value) => (
            <button
              key={`tavern-dice-bet-${value}`}
              className={`btn join-item ${
                betPercentage === value ? "btn-primary" : "bg-gray-800"
              }`}
              onClick={() => setBetPercentage(value)}
            >
              Bet {value === 100 ? "All" : `${value}%`}
            </button>
          ))}
        </div>

        <button className="btn btn-lg btn-primary">Play</button>
      </div>
    </>
  )
}

export default TavernDice
