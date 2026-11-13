import { useEffect } from "react"

import useModal from "@/app/stores/modals"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getStorageItem, setStorageItem } from "@/utils/storage"

import WelcomeNewUser from "./WelcomeNewUser"

// Logging out and back in shortly after registering would show the welcome
// again, so remember for the browser session that it has been shown
const storageKey = (playerId: string) => `welcome-seen-${playerId}`

const WelcomeModal = () => {
  const { data: player } = useGetPlayer()
  const { setModal, removeModal } = useModal()

  useEffect(() => {
    if (!player) {
      return
    }

    const isNewUser = player.createdDate >= Date.now() - 1000 * 60

    if (isNewUser && !getStorageItem("session", storageKey(player.id))) {
      setStorageItem("session", storageKey(player.id), "1")

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
  }, [player?.id])

  return null
}

export default WelcomeModal
