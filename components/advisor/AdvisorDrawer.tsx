"use client"

import { useMemo } from "react"

import useDrawer from "@/app/stores/drawer"
import AdvisorTips from "@/components/advisor/AdvisorTips"
import DrawerPanel from "@/components/DrawerPanel"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getPirateQuip } from "@/utils/getPirateQuip"

const AdvisorDrawer = () => {
  const { active, close } = useDrawer()
  const { data: player } = useGetPlayer()

  const quip = useMemo(
    () => getPirateQuip(player?.crewMembers, player?.character?.day),
    [player?.character?.day, player?.crewMembers]
  )

  return (
    <DrawerPanel
      isOpen={active === "advisor"}
      onClose={close}
      className="sm:w-lg"
    >
      <AdvisorTips title={quip} />
    </DrawerPanel>
  )
}

export default AdvisorDrawer
