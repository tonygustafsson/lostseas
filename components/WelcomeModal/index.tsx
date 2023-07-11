import { useEffect } from "react"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import { useModal } from "../ui/Modal/context"
import WelcomeExistingUser from "./WelcomeExistingUser"
import WelcomeNewUser from "./WelcomeNewUser"

const WelcomeModal = () => {
  const { data: player } = useGetPlayer()
  const { setModal, removeModal } = useModal()

  useEffect(() => {
    if (!player) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default WelcomeModal
