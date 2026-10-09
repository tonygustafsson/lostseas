"use client"

import AdvisorTips from "@/components/advisor/AdvisorTips"
import { getHarborArrivedQuip } from "@/utils/getPirateQuip"

const Harbor = () => {
  const title = getHarborArrivedQuip()

  return <AdvisorTips heading="Land ho!" title={title} />
}

export default Harbor
