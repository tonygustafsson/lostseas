"use client"

import DismissCrewMembers from "@/components/crew/DismissCrewMembers"
import GiveGold from "@/components/crew/GiveGold"
import GiveMedicine from "@/components/crew/GiveMedicine"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Props = {
  /** For the button that opens the dialog. */
  className?: string
}

const ManageCrewDialog = ({ className }: Props) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className={className}>
        Manage Crew
      </Button>
    </DialogTrigger>

    <DialogContent
      className="max-h-[90dvh] gap-4 overflow-y-auto overscroll-contain sm:max-w-lg"
      // Focusing the first amount would pop up the keyboard on phones
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <DialogHeader>
        <DialogTitle>Manage Crew</DialogTitle>

        <DialogDescription>
          Keep your crew healthy and in good spirits, or let some of them go.
        </DialogDescription>
      </DialogHeader>

      <div className="flex min-w-0 flex-col gap-2">
        <GiveMedicine />
        <GiveGold />
        <DismissCrewMembers />
      </div>
    </DialogContent>
  </Dialog>
)

export default ManageCrewDialog
