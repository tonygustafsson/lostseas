"use client"

import { useMemo } from "react"

import AdvisorTips from "@/components/advisor/AdvisorTips"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getPirateQuip } from "@/utils/getPirateQuip"

const AdvisorDrawer = () => {
  const { data: player } = useGetPlayer()

  const quip = useMemo(
    () => getPirateQuip(player?.crewMembers, player?.character?.day),
    [player?.character?.day, player?.crewMembers]
  )

  return <AdvisorTips title={quip} />
}

export default AdvisorDrawer
