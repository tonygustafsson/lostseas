"use client"

import { Cloud, KeyRound, Trash2 } from "lucide-react"
import { useState } from "react"

import useModal from "@/app/stores/modals"
import {
  PasskeySummary,
  useGetPasskeys,
  useRemovePasskey,
} from "@/hooks/queries/usePasskeys"

import { Button } from "../ui/button"

const formatDate = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString()

const PasskeyList = () => {
  const { data } = useGetPasskeys()
  const { mutateAsync: removePasskey, isPending } = useRemovePasskey()
  const { setModal, removeModal } = useModal()

  const [removed, setRemoved] = useState(false)

  const passkeys = data?.passkeys ?? []

  const onRemove = async (id: PasskeySummary["id"]) => {
    removeModal("removePasskey")

    const response = await removePasskey(id)
    setRemoved(response?.status === 200)
  }

  const confirmRemove = (passkey: PasskeySummary) => {
    setRemoved(false)

    setModal({
      id: "removePasskey",
      title: "Remove passkey?",
      content: (
        <div className="flex flex-col gap-4">
          <p>
            You will no longer be able to sign in with this passkey. You can
            still sign in with your user ID or another passkey.
          </p>

          <div className="flex gap-2">
            <Button size="sm" onClick={() => onRemove(passkey.id)}>
              Yes, remove it
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => removeModal("removePasskey")}
            >
              Cancel
            </Button>
          </div>
        </div>
      ),
    })
  }

  if (!passkeys.length && !removed) return null

  return (
    <div className="flex w-full flex-col gap-2">
      {passkeys.map((passkey) => {
        const Icon = passkey.backedUp ? Cloud : KeyRound

        return (
          <div
            key={passkey.id}
            className="border-border flex items-center gap-4 rounded-lg border p-2"
          >
            <Icon className="text-accent size-5 shrink-0" />

            <div className="flex-1">
              <p>{passkey.backedUp ? "Synced passkey" : "This device only"}</p>

              <p className="text-muted-foreground text-sm">
                Added {formatDate(passkey.createdAt)} · Last used{" "}
                {passkey.lastUsedAt ? formatDate(passkey.lastUsedAt) : "never"}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon-sm"
              title="Remove passkey"
              aria-label="Remove passkey"
              disabled={isPending}
              onClick={() => confirmRemove(passkey)}
            >
              <Trash2 />
            </Button>
          </div>
        )
      })}

      {removed && (
        <p className="text-accent">
          Passkey removed. Also remove it from your password manager so it is no
          longer offered when you sign in.
        </p>
      )}
    </div>
  )
}

export default PasskeyList
