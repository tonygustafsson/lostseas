"use client"

import { useMemo } from "react"

import AdvisorTips from "@/components/advisor/AdvisorTips"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getAdvisorWarnings } from "@/utils/getAdvisorWarnings"
import {
  getHarborArrivedQuip,
  getHarborBlockedQuip,
} from "@/utils/getPirateQuip"

const Harbor = () => {
  const { data: player } = useGetPlayer()
  const warnings = getAdvisorWarnings(player)
  const isBlocked = warnings.some((w) => w.blocksTravel)

  const title = useMemo(
    () => (isBlocked ? getHarborBlockedQuip() : getHarborArrivedQuip()),
    [isBlocked]
  )

  return <AdvisorTips title={title} />
}

export default Harbor
