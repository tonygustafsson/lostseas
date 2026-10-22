import { useState } from "react"

import TextField from "@/components/TextField"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Props = {
  isUnlocking: boolean
  onUnlock: (passphrase: string) => Promise<unknown>
}

const GodModeUnlock = ({ isUnlocking, onUnlock }: Props) => {
  const [passphrase, setPassphrase] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // A wrong passphrase does nothing visible, it only empties the field.
    await onUnlock(passphrase)
    setPassphrase("")
  }

  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader className="pr-12">
        <DialogTitle>Passphrase</DialogTitle>

        <DialogDescription className="sr-only">
          Enter the passphrase.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          aria-label="Passphrase"
          type="password"
          autoComplete="off"
          autoFocus
          value={passphrase}
          onChange={(event) => setPassphrase(event.target.value)}
        />

        <Button type="submit" disabled={!passphrase || isUnlocking}>
          Continue
        </Button>
      </form>
    </DialogContent>
  )
}

export default GodModeUnlock
