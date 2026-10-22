"use client"

import { RotateCcw } from "lucide-react"
import { useState } from "react"

import useModal from "@/app/stores/modals"
import {
  STARTING_CREW_COUNT,
  STARTING_GOLD,
  STARTING_SHIP_TYPE,
  STARTING_TITLE,
} from "@/constants/player"
import { usePlayer } from "@/hooks/queries/usePlayer"

import { Button } from "../ui/button"

type Props = {
  player: Player
}

const ResetGame = ({ player }: Props) => {
  const { resetGame, isResettingGame } = usePlayer()
  const { setModal, removeModal } = useModal()

  const [failed, setFailed] = useState(false)

  const onReset = async () => {
    removeModal("resetGame")

    const response = await resetGame()

    if (response?.status === 200) {
      window.location.reload()
    } else {
      setFailed(true)
    }
  }

  const confirmReset = () => {
    setFailed(false)

    setModal({
      id: "resetGame",
      title: "Start over?",
      content: (
        <div className="flex flex-col gap-4">
          <p>
            {player.character.name} will start over as a {STARTING_TITLE} with{" "}
            {STARTING_GOLD} gold, a {STARTING_SHIP_TYPE} and{" "}
            {STARTING_CREW_COUNT} crew members in a random town in{" "}
            {player.character.nationality}. Your gold, bank account, ships,
            crew, goods, cannons, title, journey log and statistics will be
            lost.
          </p>

          <p>This cannot be undone.</p>

          <div className="flex gap-2">
            <Button size="sm" variant="destructive" onClick={onReset}>
              Yes, start over
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => removeModal("resetGame")}
            >
              Cancel
            </Button>
          </div>
        </div>
      ),
    })
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <p>
        Start the game over with the same character, name and nationality. Your
        user ID and passkeys are kept. All game progress is reset.
      </p>

      <Button
        variant="destructive"
        onClick={confirmReset}
        disabled={isResettingGame}
      >
        <RotateCcw />
        Reset game
      </Button>

      {failed && (
        <p className="text-destructive">
          The game could not be reset. Try again.
        </p>
      )}
    </div>
  )
}

export default ResetGame
