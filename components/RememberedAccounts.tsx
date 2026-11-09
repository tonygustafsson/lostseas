"use client"

import { useState } from "react"

import { usePlayer } from "@/hooks/queries/usePlayer"
import { reloadAtTop } from "@/utils/reloadAtTop"
import {
  forgetAccount,
  type RememberedAccount,
} from "@/utils/rememberedAccounts"

import RememberedAccountList from "./RememberedAccountList"

type Props = {
  accounts: RememberedAccount[]
}

const RememberedAccounts = ({ accounts }: Props) => {
  const { login, loginWithPasskey } = usePlayer()

  const [pendingId, setPendingId] = useState<RememberedAccount["id"]>()
  const [error, setError] = useState<string>()

  const onSelect = async (account: RememberedAccount) => {
    setPendingId(account.id)
    setError(undefined)

    try {
      const response = account.credentialIds?.length
        ? await loginWithPasskey(account.credentialIds)
        : await login(account.playerId ?? "")

      if (response?.status === 200) {
        reloadAtTop()
        return
      }

      setError(`Could not sign in as ${account.name}.`)
    } catch {
      setError("Passkey sign-in was cancelled or is not supported here.")
    }

    setPendingId(undefined)
  }

  return (
    <div className="flex flex-col gap-2">
      <RememberedAccountList
        accounts={accounts}
        pendingId={pendingId}
        onSelect={onSelect}
        onForget={(account) => forgetAccount(account.id)}
      />

      {error && <p className="text-error">{error}</p>}
    </div>
  )
}

export default RememberedAccounts
