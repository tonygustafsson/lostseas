"use client"

import { Dialog } from "@/components/ui/dialog"
import { useGodMode } from "@/hooks/queries/useGodMode"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import GodModeEditor from "./GodModeEditor"
import GodModeUnlock from "./GodModeUnlock"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Hidden editor for every part of the player. Opened from the status drawer. */
const GodMode = ({ open, onOpenChange }: Props) => {
  const { data: player } = useGetPlayer()
  const { isUnlocked, isCheckingAccess, unlock, isUnlocking, save, isSaving } =
    useGodMode(open)

  if (!open || !player || isCheckingAccess) return null

  return (
    <Dialog open onOpenChange={onOpenChange}>
      {isUnlocked ? (
        <GodModeEditor player={player} isSaving={isSaving} onSave={save} />
      ) : (
        <GodModeUnlock isUnlocking={isUnlocking} onUnlock={unlock} />
      )}
    </Dialog>
  )
}

export default GodMode
