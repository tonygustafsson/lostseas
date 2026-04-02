import { getCookie } from "cookies-next/client"
import Link from "next/link"

import useSound from "@/app/stores/sound"
import { Button } from "@/components/ui/button"
import {
  MUSIC_STATE_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"

import UserIdDisplay from "../settings/UserIdDisplay"

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
      <p>
        Nice to see you. You are located at{" "}
        <span className="text-green-400">
          {player.character.town}s {player.character.location}
        </span>
        . You can either check out the town, or head out to the open seas.
      </p>

      <UserIdDisplay playerId={player.id} />

      <div className="flex flex-col">
        <Button size="lg" className="mt-4 w-full" onClick={startExploring}>
          Start exploring
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="mt-4 w-full"
          onClick={startExploring}
        >
          <Link href="/settings" onClick={onClose}>
            Get QR code
          </Link>
        </Button>
      </div>
    </>
  )
}

export default WelcomeNewUser
