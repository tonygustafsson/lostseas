"use client"

import { AnimatePresence, m as motion } from "framer-motion"
import { GiPirateCoat } from "react-icons/gi"

import useDrawer from "@/app/stores/drawer"
import DrawerPanel from "@/components/DrawerPanel"
import CharacterInfo from "@/components/status/CharacterInfo"

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

  return (
    <DrawerPanel isOpen={isOpen} onClose={closeDrawer} className="sm:w-lg">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key="status"
          variants={slideVariants}
          initial="enterFromLeft"
          animate="center"
          exit="exitToLeft"
          transition={{ duration: 0.18 }}
        >
          <h1 className="mb-2 flex font-serif text-2xl">
            <div className="flex gap-2">
              <GiPirateCoat className="text-yellow-400" />
              Status
            </div>
          </h1>

          <CharacterInfo />
        </motion.div>
      </AnimatePresence>
    </DrawerPanel>
  )
}

export default StatusDrawer
