"use client"

import AttackReport from "@/components/location/AttackReport"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import PostAttackActions from "../LocationHero/PostAttackActions"
import ShipMeetingActions from "../LocationHero/ShipMeetingActions"
import ShipMeetingContent from "../LocationHero/ShipMeetingContent"

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
        <DialogTitle className="sr-only">
          {shipMeeting ? "Ship encounter" : "Battle report"}
        </DialogTitle>

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
