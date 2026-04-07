import { getCookie } from "cookies-next/client"

import useDrawer from "@/app/stores/drawer"
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
  const { open: openDrawer } = useDrawer()

  const startExploring = () => {
    const musicOn = Boolean(getCookie(MUSIC_STATE_COOKIE_NAME))
    const soundEffectsOn = Boolean(getCookie(SOUND_EFFECTS_STATE_COOKIE_NAME))

    setMusic(musicOn)
    setSoundEffects(soundEffectsOn)

    onClose()
  }

  const getQrCode = () => {
    onClose()
    openDrawer("settings")
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
          onClick={getQrCode}
        >
          Get QR code
        </Button>
      </div>
    </>
  )
}

export default WelcomeNewUser
