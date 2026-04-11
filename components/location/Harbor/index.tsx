"use client"

import AdvisorTips from "@/components/advisor/AdvisorTips"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getAdvisorWarnings } from "@/utils/getAdvisorWarnings"

const Harbor = () => {
  const { data: player } = useGetPlayer()
  const warnings = getAdvisorWarnings(player)

  if (!warnings.length) return null

  return <AdvisorTips title="Heads up!" />
}

export default Harbor
