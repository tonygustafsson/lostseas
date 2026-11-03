"use client"

import { ChevronDown, UserPlus } from "lucide-react"
import { useState, useSyncExternalStore } from "react"

import { cn } from "@/lib/utils"
import {
  readAccounts,
  type RememberedAccount,
  subscribeToAccounts,
} from "@/utils/rememberedAccounts"

import LoginForm from "./LoginForm"
import RememberedAccounts from "./RememberedAccounts"
import { Button } from "./ui/button"

// The server can't see this device's storage, so it renders without accounts
const NO_ACCOUNTS: RememberedAccount[] = []

// Remembered characters come first. The other ways to sign in stay folded away
// until the player asks for them.
const SignInOptions = () => {
  const accounts = useSyncExternalStore(
    subscribeToAccounts,
    readAccounts,
    () => NO_ACCOUNTS
  )
  const [showOtherLogins, setShowOtherLogins] = useState(false)

  if (accounts.length === 0) return <LoginForm />

  return (
    <div className="flex flex-col gap-4">
      <RememberedAccounts accounts={accounts} />

      <Button
        type="button"
        variant="outline"
        aria-expanded={showOtherLogins}
        onClick={() => setShowOtherLogins((show) => !show)}
        className="w-full"
      >
        <UserPlus />
        Use another character
        <ChevronDown
          className={cn(
            "transition-transform",
            showOtherLogins && "rotate-180"
          )}
        />
      </Button>

      {showOtherLogins && <LoginForm />}
    </div>
  )
}

export default SignInOptions
