"use client"

import { AnimatePresence, m as motion, PanInfo } from "framer-motion"
import { useEffect } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

type Props = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  maxHeightPercent?: number
}

const DrawerBottom = ({ isOpen, onClose, children, className }: Props) => {
  const handleDrag = (info: PanInfo) => {
    if (info.offset.y > 50) onClose()
  }

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ translateY: "100%", opacity: 0 }}
            animate={{
              translateY: -70,
              opacity: 1,
              transition: {
                translateY: { type: "spring", duration: 0.25 },
                opacity: { duration: 0.2 },
              },
            }}
            exit={{ translateY: "100%", opacity: 0 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 50 }}
            whileDrag={{ opacity: 0.95, transition: { duration: 0.1 } }}
            onDrag={(_, info) => handleDrag(info)}
            className={cn(
              "fixed bottom-0 left-0 z-50 max-h-[80vh] w-full overflow-y-auto border-neutral-900 bg-neutral-950 px-6 pt-12 pb-6 shadow-2xl sm:border-l-2 md:py-10",
              className
            )}
          >
            <Button
              variant="ghost"
              className="text-info absolute top-2 right-2"
              onClick={onClose}
            >
              <AiOutlineCloseCircle className="h-6 w-6" />
            </Button>

            {children}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5, transition: { duration: 0.15 } }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 z-40 h-screen w-screen bg-black"
            onClick={onClose}
          />
        </>
      )}
    </AnimatePresence>
  )
}

export default DrawerBottom
