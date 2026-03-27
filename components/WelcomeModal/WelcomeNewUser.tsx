import { getCookie } from "cookies-next/client"
import Link from "next/link"

import useSound from "@/app/stores/sound"
import { Button } from "@/components/ui/button"
import {
  MUSIC_STATE_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"

type Props = {
  player: Player
  onClose: () => void
}

const WelcomeNewUser = ({ player, onClose }: Props) => {
  const { setMusic, setSoundEffects } = useSound()

  const startExploring = () => {
    const musicOn = Boolean(getCookie(MUSIC_STATE_COOKIE_NAME))
    const soundEffectsOn = Boolean(getCookie(SOUND_EFFECTS_STATE_COOKIE_NAME))

    setMusic(musicOn)
    setSoundEffects(soundEffectsOn)

    onClose()
  }

  return (
    <>
      <p className="mb-2">
        Nice to see you. You are located at {player.character.town}s{" "}
        {player.character.location}. You can either check out the town, or head
        out to the open seas.
      </p>

      <p className="mb-2">
        Don&apos;t forget to save your user ID in the{" "}
        <Link href="/settings" onClick={onClose}>
          settings page
        </Link>
        . That way you can login again if you loose your browser settings.
      </p>

      <Button className="mt-4 w-full" onClick={startExploring}>
        Start exploring
      </Button>
    </>
  )
}

export default WelcomeNewUser
