import { getCookie } from "cookies-next/client"
import { AiOutlineQrcode } from "react-icons/ai"

import useDrawer from "@/app/stores/drawer"
import useSound from "@/app/stores/sound"
import { Button } from "@/components/ui/button"
import {
  AMBIENCE_STATE_COOKIE_NAME,
  MUSIC_STATE_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"

import AddPasskeyButton from "../settings/AddPasskeyButton"
import UserIdDisplay from "../settings/UserIdDisplay"

type Props = {
  player: Player
  onClose: () => void
}

const WelcomeNewUser = ({ player, onClose }: Props) => {
  const { setMusic, setAmbience, setSoundEffects } = useSound()
  const { open: openDrawer } = useDrawer()

  const startExploring = () => {
    setMusic(getCookie(MUSIC_STATE_COOKIE_NAME) === "true")
    setAmbience(getCookie(AMBIENCE_STATE_COOKIE_NAME) === "true")
    setSoundEffects(getCookie(SOUND_EFFECTS_STATE_COOKIE_NAME) === "true")

    onClose()
  }

  const getQrCode = () => {
    onClose()
    openDrawer("settings")
  }

  return (
    <>
      <p className="text-lg">
        Nice to see you. You are located at{" "}
        <span className="text-success">
          {player.character.town}s {player.character.location}
        </span>
        . You can either check out the town, or head out to the open seas.
      </p>

      <div className="mb-8 flex flex-col gap-4">
        <UserIdDisplay playerId={player.id} />

        <div className="flex flex-wrap gap-2">
          <AddPasskeyButton size="sm" variant="secondary" />

          <Button size="sm" variant="secondary" onClick={getQrCode}>
            <AiOutlineQrcode />
            Get QR code
          </Button>
        </div>
      </div>

      <Button
        size="lg"
        variant="highlight"
        className="w-full"
        onClick={startExploring}
      >
        Start exploring
      </Button>
    </>
  )
}

export default WelcomeNewUser
