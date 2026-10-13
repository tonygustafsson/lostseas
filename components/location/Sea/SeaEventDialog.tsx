"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { cn } from "@/lib/utils"

import AttackReport from "./AttackReport"
import BattleActions from "./BattleActions"
import BattleContent from "./BattleContent"
import PostAttackActions from "./PostAttackActions"
import ShipMeetingActions from "./ShipMeetingActions"
import ShipMeetingContent from "./ShipMeetingContent"

const SeaEventDialog = () => {
  const { data: player } = useGetPlayer()
  const seaState = player?.locationStates?.sea
  const shipMeeting = seaState?.shipMeeting
  const battle = seaState?.battle
  const isVictory = !!seaState?.attackSuccessReport
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
        className={cn(
          "max-h-[90dvh] gap-4 overflow-y-auto p-6 sm:max-w-xl",
          hasAttackReport &&
            (isVictory
              ? "shadow-success/25 shadow-2xl"
              : "shadow-destructive/25 shadow-2xl")
        )}
      >
        {!shipMeeting && (
          <DialogTitle className="sr-only">
            {isVictory ? "Victory!" : "Defeat at sea"}
          </DialogTitle>
        )}

        {shipMeeting && (
          <>
            <ShipMeetingContent
              shipMeeting={shipMeeting}
              crewMembers={player.crewMembers.count}
              cannons={player.inventory?.cannons}
              nationality={player.character.nationality}
            />

            {battle ? (
              <>
                <BattleContent battle={battle} />
                <BattleActions />
              </>
            ) : (
              <ShipMeetingActions />
            )}
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
