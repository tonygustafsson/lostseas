"use client"

import { AnimatePresence, m as motion } from "framer-motion"
import { useEffect, useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { GiPirateCoat } from "react-icons/gi"
import { PiBookOpenTextBold } from "react-icons/pi"

import useDrawer from "@/app/stores/drawer"
import DrawerPanel from "@/components/DrawerPanel"
import GuideContent from "@/components/GuideContent"
import CharacterInfo from "@/components/status/CharacterInfo"
import { Button } from "@/components/ui/button"

type View = "status" | "guide"

const slideVariants = {
  enterFromRight: { x: "30%", opacity: 0 },
  enterFromLeft: { x: "-30%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: "-30%", opacity: 0 },
  exitToRight: { x: "30%", opacity: 0 },
}

const StatusDrawer = () => {
  const { active: activeDrawer, close: closeDrawer } = useDrawer()
  const isOpen = activeDrawer === "status"
  const [view, setView] = useState<View>("status")

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setView("status"), 300)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  return (
    <DrawerPanel isOpen={isOpen} onClose={closeDrawer} className="sm:w-lg">
      <AnimatePresence mode="wait" initial={false}>
        {view === "status" ? (
          <motion.div
            key="status"
            variants={slideVariants}
            initial="enterFromLeft"
            animate="center"
            exit="exitToLeft"
            transition={{ duration: 0.18 }}
          >
            <h1 className="mb-2 flex items-center justify-between gap-2 font-serif text-2xl">
              <div className="flex gap-2">
                <GiPirateCoat className="text-yellow-400" />
                Status
              </div>

              <Button variant="secondary" onClick={() => setView("guide")}>
                <PiBookOpenTextBold className="h-4 w-4" />
                Player Guide
              </Button>
            </h1>

            <CharacterInfo />
          </motion.div>
        ) : (
          <motion.div
            key="guide"
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
                onClick={() => setView("status")}
                className="-ml-2"
              >
                <AiOutlineArrowLeft className="h-4 w-4" />
                Back to Status
              </Button>
            </div>

            <h1 className="mb-2 flex items-center gap-2 font-serif text-2xl">
              <PiBookOpenTextBold className="text-yellow-400" />
              Player Guide
            </h1>

            <GuideContent />
          </motion.div>
        )}
      </AnimatePresence>
    </DrawerPanel>
  )
}

export default StatusDrawer
