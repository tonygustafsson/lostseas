"use client"

import { useMemo } from "react"

import AdvisorTips from "@/components/advisor/AdvisorTips"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import {
  getHarborArrivedQuip,
  getHarborBlockedQuip,
} from "@/utils/getPirateQuip"

const Harbor = () => {
  const { data: player } = useGetPlayer()
  const arrivedFromJourney =
    player?.locationStates?.harbor?.lastHarborReason === "arrived"

  const title = useMemo(
    () =>
      arrivedFromJourney ? getHarborArrivedQuip() : getHarborBlockedQuip(),
    [arrivedFromJourney]
  )

  return <AdvisorTips title={title} />
}

export default Harbor
