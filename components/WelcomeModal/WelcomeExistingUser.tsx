import { getCookie, setCookie } from "cookies-next"
import { useState } from "react"

import {
  MUSIC_STATE_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"

type Props = {
  player: Player
  onClose: () => void
}

const WelcomeExistingUser = ({ player, onClose }: Props) => {
  const musicCookieValue = getCookie(MUSIC_STATE_COOKIE_NAME)
  const soundEffectsCookieValue = getCookie(SOUND_EFFECTS_STATE_COOKIE_NAME)

  console.log({
    musicCookieValue,
    boolmusicCookieValue: Boolean(musicCookieValue),
    soundEffectsCookieValue,
    boolsoundEffectsCookieValue: Boolean(soundEffectsCookieValue),
  })

  const [musicOn, setMusicOn] = useState<boolean>(
    typeof musicCookieValue !== "undefined" ? Boolean(musicCookieValue) : true
  )
  const [soundEffectsOn, setSoundEffectsOn] = useState<boolean>(
    typeof soundEffectsCookieValue !== "undefined"
      ? Boolean(soundEffectsCookieValue)
      : true
  )

  const continueGame = () => {
    setCookie(MUSIC_STATE_COOKIE_NAME, musicOn)
    setCookie(SOUND_EFFECTS_STATE_COOKIE_NAME, soundEffectsOn)

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
            checked={musicOn}
            onChange={() => setMusicOn(!musicOn)}
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
