import { getCookie } from "cookies-next"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  MUSIC_STATE_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"

import { useSound } from "../Sound/context"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"

type Props = {
  player: Player
  onClose: () => void
}

const WelcomeExistingUser = ({ player, onClose }: Props) => {
  const { setMusic, setSoundEffects } = useSound()

  const musicCookieValue = getCookie(MUSIC_STATE_COOKIE_NAME)
  const soundEffectsCookieValue = getCookie(SOUND_EFFECTS_STATE_COOKIE_NAME)

  const [musicOn, setMusicOn] = useState<boolean>(
    typeof musicCookieValue !== "undefined" ? Boolean(musicCookieValue) : true
  )
  const [soundEffectsOn, setSoundEffectsOn] = useState<boolean>(
    typeof soundEffectsCookieValue !== "undefined"
      ? Boolean(soundEffectsCookieValue)
      : true
  )

  const continueGame = () => {
    setMusic(musicOn)
    setSoundEffects(soundEffectsOn)

    onClose()
  }

  return (
    <>
      <p>
        Nice to see you again. You are located at {player.character.town}s{" "}
        {player.character.location}.
      </p>

      <div className="my-8 flex flex-col gap-4">
        <div className="flex items-center space-x-4">
          <Switch
            id="toggleMusic"
            checked={musicOn}
            onCheckedChange={(val) => setMusicOn(Boolean(val))}
          />
          <Label htmlFor="toggleMusic">Music</Label>
        </div>

        <div className="flex items-center space-x-4">
          <Switch
            id="soundEffects"
            checked={soundEffectsOn}
            onCheckedChange={(val) => setSoundEffectsOn(Boolean(val))}
          />
          <Label htmlFor="soundEffects">SoundFX</Label>
        </div>
      </div>

      <Button size="lg" className="mt-4 w-full" onClick={continueGame}>
        Continue game
      </Button>
    </>
  )
}

export default WelcomeExistingUser
