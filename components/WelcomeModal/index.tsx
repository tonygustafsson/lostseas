import { getCookie } from "cookies-next"
import { useEffect } from "react"

import { MUSIC_STATE_COOKIE_NAME } from "@/constants/system"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import { useModal } from "../ui/Modal/context"
import WelcomeExistingUser from "./WelcomeExistingUser"
import WelcomeNewUser from "./WelcomeNewUser"

const WelcomeModal = () => {
  const { data: player } = useGetPlayer()
  const { setModal, removeModal } = useModal()

  const musicCookieValue = getCookie(MUSIC_STATE_COOKIE_NAME)

  useEffect(() => {
    if (!player || typeof musicCookieValue !== "undefined") {
      return
    }

    const isNewUser = player.createdDate >= Date.now() - 1000 * 60
    const title = isNewUser ? "Welcome!" : "Welcome back!"

    setModal({
      id: "welcome",
      title,
      content: isNewUser ? (
        <WelcomeNewUser
          player={player}
          onClose={() => removeModal("welcome")}
        />
      ) : (
        <WelcomeExistingUser
          player={player}
          onClose={() => removeModal("welcome")}
        />
      ),
    })
  }, [])

  return null
}

export default WelcomeModal
