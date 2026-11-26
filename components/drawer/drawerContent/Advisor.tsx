"use client"

import { useMemo } from "react"
import { IoArrowBack } from "react-icons/io5"

import useDrawer from "@/app/stores/drawer"
import AdvisorTips from "@/components/advisor/AdvisorTips"
import { Button } from "@/components/ui/button"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getPirateQuip } from "@/utils/getPirateQuip"

const AdvisorDrawer = () => {
  const { data: player } = useGetPlayer()
  const { open: openDrawer } = useDrawer()

  const quip = useMemo(
    () => getPirateQuip(player?.crewMembers, player?.character?.weather),
    [player?.character?.weather, player?.crewMembers]
  )

  return (
    <>
      {/* On mobile the advisor is only reached from the Fleet drawer */}
      <Button
        variant="secondary"
        className="mb-6 lg:hidden"
        onClick={() => openDrawer("fleet")}
      >
        <IoArrowBack />
        Back to Fleet
      </Button>

      <AdvisorTips title={quip} />
    </>
  )
}

export default AdvisorDrawer
