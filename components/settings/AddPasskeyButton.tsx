"use client"

import { WebAuthnError } from "@simplewebauthn/browser"
import { Check, KeyRound } from "lucide-react"
import { useState } from "react"

import { useGetPasskeys } from "@/hooks/queries/usePasskeys"
import { usePlayer } from "@/hooks/queries/usePlayer"

import { Button } from "../ui/button"

type Props = Pick<React.ComponentProps<typeof Button>, "size" | "variant"> & {
  className?: string
}

const AddPasskeyButton = ({ className, ...buttonProps }: Props) => {
  const { addPasskey, isAddingPasskey } = usePlayer()
  const { data } = useGetPasskeys()
  const passkeyCount = data?.passkeys?.length ?? 0

  const [status, setStatus] = useState<"added" | "exists" | "failed">()

  const onAddPasskey = async () => {
    setStatus(undefined)

    try {
      const response = await addPasskey()
      setStatus(response?.status === 200 ? "added" : "failed")
    } catch (error) {
      const alreadyOnDevice =
        error instanceof WebAuthnError &&
        error.code === "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED"

      setStatus(alreadyOnDevice ? "exists" : "failed")
    }
  }

  return (
    <>
      <Button
        {...buttonProps}
        className={className}
        onClick={onAddPasskey}
        disabled={isAddingPasskey || status === "added"}
      >
        {status === "added" ? <Check /> : <KeyRound />}
        {status === "added"
          ? "Passkey added"
          : passkeyCount > 0
            ? "Add another passkey"
            : "Add a passkey"}
      </Button>

      {status === "added" && (
        <p className="text-success w-full">
          You can now sign in with your passkey.
        </p>
      )}

      {status === "exists" && (
        <p className="text-accent w-full">
          This device already has a passkey for this character.
        </p>
      )}

      {status === "failed" && (
        <p className="text-destructive w-full">
          The passkey was not added. It may have been cancelled, or this device
          does not support passkeys.
        </p>
      )}
    </>
  )
}

export default AddPasskeyButton
