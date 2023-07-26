import { useState } from "react"

import { sound$ } from "../Sound/state"

type Props = {
  player: Player
  onClose: () => void
}

const WelcomeExistingUser = ({ player, onClose }: Props) => {
  const [musicPlay, setMusicPlay] = useState<boolean>(sound$.musicOn.get())
  const [soundEffectsOn, setSoundEffectsOn] = useState<boolean>(
    sound$.soundEffectsOn.get()
  )

  const continueGame = () => {
    sound$.musicOn.set(musicPlay)
    sound$.musicPlay.set(musicPlay)
    sound$.soundEffectsOn.set(soundEffectsOn)

    onClose()
  }

  return (
    <>
      <p>
        Nice to see you again. You are located at {player.character.town}s{" "}
        {player.character.location}.
      </p>

      <div className="flex flex-col gap-4 py-4">
        <div className="flex items-center gap-4">
          <input
            id="toggleMusic"
            type="checkbox"
            className="toggle toggle-sm toggle-info"
            checked={musicPlay}
            onChange={() => setMusicPlay(!musicPlay)}
          />
          <label htmlFor="toggleMusic">Music</label>
        </div>

        <div className="flex items-center gap-4">
          <input
            id="soundEffects"
            type="checkbox"
            className="toggle toggle-sm toggle-info"
            checked={soundEffectsOn}
            onChange={() => setSoundEffectsOn(!soundEffectsOn)}
          />
          <label htmlFor="soundEffects">Sound effects</label>
        </div>
      </div>

      <button className="btn btn-primary w-full mt-4" onClick={continueGame}>
        Continue game
      </button>
    </>
  )
}

export default WelcomeExistingUser
