"use client"

import { useState } from "react"
import { FiTrash2 } from "react-icons/fi"

import useModal from "@/app/stores/modals"
import { usePlayer } from "@/hooks/queries/usePlayer"
import { reloadAtTop } from "@/utils/reloadAtTop"
import { forgetAccount, getAccountKey } from "@/utils/rememberedAccounts"

import { Button } from "../ui/button"

type Props = {
  player: Player
}

const RemoveAccount = ({ player }: Props) => {
  const { deleteAccount, isDeletingAccount } = usePlayer()
  const { setModal, removeModal } = useModal()

  const [failed, setFailed] = useState(false)

  const onRemove = async () => {
    removeModal("removeAccount")

    const response = await deleteAccount()

    if (response?.status === 200) {
      // The remembered entry would only point to an account that no longer exists
      forgetAccount(await getAccountKey(player.id))
      reloadAtTop()
    } else {
      setFailed(true)
    }
  }

  const confirmRemove = () => {
    setFailed(false)

    setModal({
      id: "removeAccount",
      title: "Remove account?",
      content: (
        <div className="flex flex-col gap-4">
          <p>
            {player.character.name} and everything tied to this account will be
            deleted for good. That includes your progress, journey log,
            statistics, leaderboard entry, user ID and passkeys.
          </p>

          <p>This cannot be undone.</p>

          <div className="flex gap-2">
            <Button size="sm" variant="destructive" onClick={onRemove}>
              Yes, remove account
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => removeModal("removeAccount")}
            >
              Cancel
            </Button>
          </div>
        </div>
      ),
    })
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <p>
        Permanently delete your account and all of its data. You can no longer
        sign in with your user ID or passkeys. This cannot be undone.
      </p>

      <Button
        variant="destructive"
        onClick={confirmRemove}
        disabled={isDeletingAccount}
      >
        <FiTrash2 />
        Remove account
      </Button>

      {failed && (
        <p className="text-error">
          The account could not be removed. Try again.
        </p>
      )}
    </div>
  )
}

export default RemoveAccount
