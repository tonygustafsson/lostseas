import { useEffect } from "react"

import useModal from "@/app/stores/modals"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import WelcomeNewUser from "./WelcomeNewUser"

const WelcomeModal = () => {
  const { data: player } = useGetPlayer()
  const { setModal, removeModal } = useModal()

  useEffect(() => {
    if (!player) {
      return
    }

    const isNewUser = player.createdDate >= Date.now() - 1000 * 60

    if (isNewUser) {
      setModal({
        id: "welcome",
        title: "Welcome!",
        content: (
          <WelcomeNewUser
            player={player}
            onClose={() => removeModal("welcome")}
          />
        ),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default WelcomeModal
