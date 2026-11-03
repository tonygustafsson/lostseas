"use client"

import { KeyRound, X } from "lucide-react"
import Image from "next/image"

import { getCharacterById } from "@/constants/characters"
import type { RememberedAccount } from "@/utils/rememberedAccounts"

import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"

type Props = {
  accounts: RememberedAccount[]
  pendingId?: RememberedAccount["id"]
  onSelect: (account: RememberedAccount) => void
  onForget: (account: RememberedAccount) => void
}

const RememberedAccountList = ({
  accounts,
  pendingId,
  onSelect,
  onForget,
}: Props) => (
  <ul className="flex flex-col gap-2">
    {accounts.map((account) => {
      const image = getCharacterById(account.characterId)?.image
      const hasPasskey = !!account.credentialIds?.length

      return (
        <li
          key={account.id}
          className="bg-muted-foreground/10 hover:bg-muted-foreground/15 flex items-center gap-2 rounded-lg pr-2 transition-colors"
        >
          <button
            type="button"
            onClick={() => onSelect(account)}
            disabled={!!pendingId}
            className="focus-visible:ring-ring flex min-w-0 flex-1 cursor-pointer items-center gap-4 rounded-lg p-2 text-left focus-visible:ring-2 focus-visible:outline-none disabled:cursor-default"
          >
            <span className="bg-muted relative size-12 shrink-0 overflow-hidden rounded-md">
              {image && (
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              )}
            </span>

            <span className="flex min-w-0 flex-col">
              <span className="truncate font-serif text-lg">
                {account.name}
              </span>

              <span className="text-muted-foreground flex items-center gap-1 text-sm">
                {hasPasskey && <KeyRound className="size-4" />}
                {hasPasskey ? "Passkey sign-in" : "Tap to sign in"}
              </span>
            </span>

            {pendingId === account.id && <Spinner className="ml-auto" />}
          </button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Forget ${account.name} on this device`}
            disabled={!!pendingId}
            onClick={() => onForget(account)}
          >
            <X />
          </Button>
        </li>
      )
    })}
  </ul>
)

export default RememberedAccountList
