"use client"

import { AnimatePresence, m as motion, PanInfo } from "framer-motion"
import { useEffect, useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

const MOBILE_BREAKPOINT = 1024 // tailwind lg

type Props = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

const DrawerPanel = ({ isOpen, onClose, children, className }: Props) => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT
  )

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const xFrom = isMobile ? "-100%" : "100%"

  const handleDrag = (info: PanInfo) => {
    if (isMobile && info.offset.x < -50) onClose()
    if (!isMobile && info.offset.x > 50) onClose()
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
            initial={{ translateX: xFrom, opacity: 0 }}
            animate={{
              translateX: 0,
              opacity: 1,
              transition: {
                translateX: { type: "spring", duration: 0.25 },
                opacity: { duration: 0.2 },
              },
            }}
            exit={{ translateX: xFrom, opacity: 0 }}
            drag="x"
            dragElastic={false}
            dragConstraints={
              isMobile ? { left: -50, right: 0 } : { left: 0, right: 50 }
            }
            whileDrag={{ opacity: 0.85, transition: { duration: 0.1 } }}
            onDrag={(_, info) => handleDrag(info)}
            className={cn(
              "fixed top-0 z-50 h-full w-full overflow-y-auto border-neutral-900 bg-neutral-950 px-6 py-6 shadow-2xl sm:border-l-2 md:py-10",
              isMobile ? "left-0" : "right-0",
              className
            )}
          >
            <Button
              variant="ghost"
              className={cn(
                "text-info absolute top-1",
                isMobile ? "right-2" : "left-2"
              )}
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

export default DrawerPanel
