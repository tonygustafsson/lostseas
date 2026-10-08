"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import AttackReport from "./AttackReport"
import PostAttackActions from "./PostAttackActions"
import ShipMeetingActions from "./ShipMeetingActions"
import ShipMeetingContent from "./ShipMeetingContent"

const SeaEventDialog = () => {
  const { data: player } = useGetPlayer()
  const seaState = player?.locationStates?.sea
  const shipMeeting = seaState?.shipMeeting
  const hasAttackReport = !!(
    seaState?.attackSuccessReport || seaState?.attackFailureReport
  )
  const isOpen = !!player && (!!shipMeeting || hasAttackReport)

  if (!player || !isOpen) return null

  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        className="border-border bg-background/95 max-h-[90dvh] gap-2 overflow-y-auto p-4 shadow-2xl backdrop-blur-md sm:max-w-lg"
      >
        {!shipMeeting && (
          <DialogTitle className="sr-only">Battle report</DialogTitle>
        )}

        {shipMeeting && (
          <>
            <ShipMeetingContent
              shipMeeting={shipMeeting}
              crewMembers={player.crewMembers.count}
              cannons={player.inventory?.cannons}
              nationality={player.character.nationality}
            />
            <ShipMeetingActions />
          </>
        )}

        {hasAttackReport && (
          <>
            <AttackReport />
            <PostAttackActions />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SeaEventDialog
