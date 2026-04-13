"use client"

import { AnimatePresence, m as motion } from "framer-motion"
import { useEffect, useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { GiShoonerSailboat } from "react-icons/gi"
import { MdGroups } from "react-icons/md"

import useDrawer from "@/app/stores/drawer"
import CrewBoard from "@/components/crew/CrewBoard"
import DismissCrewMembers from "@/components/crew/DismissCrewMembers"
import GiveGold from "@/components/crew/GiveGold"
import GiveMedicine from "@/components/crew/GiveMedicine"
import DrawerPanel from "@/components/DrawerPanel"
import FittingsList from "@/components/ships/FittingsList"
import ShipList from "@/components/ships/ShipList"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import AdvisorDrawerTrigger from "../advisor/AdvisorDrawerTrigger"
import AdvisorTips from "../advisor/AdvisorTips"

type View = "fleet" | "manageCrew" | "advisor"

const slideVariants = {
  enterFromRight: { x: "30%", opacity: 0 },
  enterFromLeft: { x: "-30%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: "-30%", opacity: 0 },
  exitToRight: { x: "30%", opacity: 0 },
}

const FleetDrawer = () => {
  const { active: activeDrawer, close: closeDrawer } = useDrawer()
  const isOpen = activeDrawer === "fleet"
  const [view, setView] = useState<View>("fleet")

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setView("fleet"), 300)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  return (
    <DrawerPanel isOpen={isOpen} onClose={closeDrawer} className="sm:w-lg">
      <AnimatePresence mode="wait" initial={false}>
        {view === "fleet" ? (
          <motion.div
            key="fleet"
            variants={slideVariants}
            initial="enterFromLeft"
            animate="center"
            exit="exitToLeft"
            transition={{ duration: 0.18 }}
          >
            <h1 className="mb-6 flex items-center gap-2 font-serif text-2xl">
              <GiShoonerSailboat className="text-yellow-400" />
              Crew & Fleet
            </h1>

            <AdvisorDrawerTrigger
              onClick={() => setView("advisor")}
              className="mb-4 w-full sm:w-auto lg:hidden"
            />

            <span className="my-4 block font-serif text-xl">Ships</span>
            <ShipList />

            <Separator className="my-8" />

            <h2 className="mt-8 mb-4 font-serif text-xl">Ship fittings</h2>
            <FittingsList />

            <Separator className="my-8" />

            <span className="my-4 block font-serif text-xl">Crew members</span>
            <CrewBoard onManage={() => setView("manageCrew")} />
          </motion.div>
        ) : view === "manageCrew" ? (
          <motion.div
            key="manageCrew"
            variants={slideVariants}
            initial="enterFromRight"
            animate="center"
            exit="exitToRight"
            transition={{ duration: 0.18 }}
          >
            <div className="mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView("fleet")}
                className="-ml-2"
              >
                <AiOutlineArrowLeft className="h-4 w-4" />
                Back to Fleet
              </Button>
            </div>

            <h1 className="mb-6 flex items-center gap-2 font-serif text-2xl">
              <MdGroups className="text-yellow-400" />
              Manage Crew
            </h1>

            <div className="grid grid-cols-1 gap-6">
              <GiveMedicine />
              <GiveGold />
              <DismissCrewMembers />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="advisor"
            variants={slideVariants}
            initial="enterFromRight"
            animate="center"
            exit="exitToRight"
            transition={{ duration: 0.18 }}
          >
            <div className="mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView("fleet")}
                className="-ml-2"
              >
                <AiOutlineArrowLeft className="h-4 w-4" />
                Back to Fleet
              </Button>
            </div>

            <AdvisorTips title="Squawk! Here's what needs yer attention, Cap'n!" />
          </motion.div>
        )}
      </AnimatePresence>
    </DrawerPanel>
  )
}

export default FleetDrawer
