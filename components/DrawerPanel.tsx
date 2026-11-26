"use client"

import { AnimatePresence, m as motion } from "framer-motion"
import { XIcon } from "lucide-react"
import { Fragment, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

const MOBILE_BREAKPOINT = 1024 // tailwind lg

// Seconds to slide in or out. Switching drawers does one of each.
const DURATION = 0.15

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
  exit: { opacity: 0 },
}

type Props = {
  isOpen: boolean
  onClose: () => void
  /** A new id slides the old drawer out before the new one slides in. */
  id?: string | null
  children: React.ReactNode
  className?: string
}

const DrawerPanel = ({ isOpen, onClose, id, children, className }: Props) => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT
  )

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Mobile drawers come from the left, desktop ones from the right
  const dir = isMobile ? -1 : 1
  const xFrom = `${dir * 100}%`

  const panelVariants = {
    hidden: { translateX: xFrom, opacity: 0 },
    visible: { translateX: 0, opacity: 1 },
    exit: { translateX: xFrom, opacity: 0 },
  }

  // Close on ESC key, unless a dialog on top of the drawer already handled it
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Fragment key={id}>
          <motion.div
            variants={panelVariants}
            transition={{ duration: DURATION, ease: "easeOut" }}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="x"
            dragDirectionLock
            dragMomentum={false}
            // A drag that doesn't close the drawer must not leave it displaced
            dragSnapToOrigin
            dragConstraints={
              isMobile ? { left: -50, right: 0 } : { left: 0, right: 50 }
            }
            whileDrag={{ opacity: 0.85, transition: { duration: 0.1 } }}
            // Close on release, so the exit doesn't fight a drag in progress
            onDragEnd={(_, info) => {
              if (info.offset.x * dir > 50) {
                onClose()
              }
            }}
            className={cn(
              "gilded-edge bg-background fixed top-0 z-50 h-full w-[95dvw]",
              // The gold edge faces the game, so it flips with the drawer
              isMobile
                ? "left-0 border-r-4 [--edge-x:-1]"
                : "right-0 border-l-4 [--edge-x:1]",
              className
            )}
          >
            {/* Sits on the inside edge, outside the scrolling area so it isn't
                clipped. Pointer events bubble up to the drag on the panel. */}
            <div
              aria-hidden
              className={cn(
                "absolute top-1/2 size-16 -translate-y-1/2 cursor-grab touch-none bg-[url(/img/ui/gilded-corners.svg)] bg-[length:128px_128px] bg-no-repeat active:cursor-grabbing",
                // The corner's point faces away from the drawer
                isMobile
                  ? "-right-6 rotate-45 bg-[position:100%_0]"
                  : "-left-6 -rotate-45 bg-[position:0_0]"
              )}
            />

            <div className="h-full touch-pan-y overflow-y-auto overscroll-contain px-6 pt-4 pb-6 md:pt-6 md:pb-10 [&>h1]:pr-12">
              {/* Zero height and sticky, so the button lines up with the content's
                  right edge (the scrollbar takes space) and stays in view */}
              <div className="sticky top-0 z-10 h-0">
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="text-gold hover:text-gold absolute top-0 right-0"
                  onClick={onClose}
                >
                  <XIcon />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              {children}
            </div>
          </motion.div>

          <motion.div
            variants={backdropVariants}
            transition={{ duration: DURATION }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 z-40 h-screen w-screen bg-black"
            onClick={onClose}
          />
        </Fragment>
      )}
    </AnimatePresence>
  )
}

export default DrawerPanel
