"use client"

import { TbHelp } from "react-icons/tb"

import GuideContent from "@/components/GuideContent"

const GuideDrawer = () => (
  <>
    <h1 className="mb-2 flex items-center gap-2 font-serif text-2xl">
      <TbHelp className="text-yellow-400" />
      Player Guide
    </h1>

    <GuideContent />
  </>
)

export default GuideDrawer
