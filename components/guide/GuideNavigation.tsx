"use client"

import { ListTree } from "lucide-react"
import { useEffect, useState } from "react"

import DrawerPanel from "@/components/DrawerPanel"
import { Button } from "@/components/ui/button"

import {
  getGuideChapter,
  GUIDE_CHAPTERS,
  type GuideChapterId,
} from "./chapters"
import GuideMenu, { scrollToChapter } from "./GuideMenu"

/** Highlights the chapter whose heading most recently scrolled past the top third of the screen */
const useActiveChapter = () => {
  const [activeId, setActiveId] = useState<GuideChapterId>(GUIDE_CHAPTERS[0].id)

  useEffect(() => {
    const updateActiveChapter = () => {
      const threshold = window.innerHeight / 3

      const current = GUIDE_CHAPTERS.findLast(
        ({ id }) =>
          (document.getElementById(id)?.getBoundingClientRect().top ?? 0) <=
          threshold
      )

      setActiveId(current?.id ?? GUIDE_CHAPTERS[0].id)
    }

    updateActiveChapter()
    window.addEventListener("scroll", updateActiveChapter, { passive: true })

    return () => window.removeEventListener("scroll", updateActiveChapter)
  }, [])

  return activeId
}

const GuideNavigation = () => {
  const activeId = useActiveChapter()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="bg-background/90 border-border sticky top-0 z-20 -mx-4 border-b px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6 lg:hidden">
        <Button
          className="w-full justify-start"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
        >
          <ListTree aria-hidden="true" />
          <span className="opacity-75">Chapter:</span>
          {getGuideChapter(activeId).title}
        </Button>
      </div>

      {/* Same drawer as in the game, so it can be swiped away */}
      <DrawerPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="pt-12 sm:w-lg lg:hidden"
      >
        <GuideMenu
          activeId={activeId}
          onNavigate={(id) => {
            setIsOpen(false)
            scrollToChapter(id)
          }}
        />
      </DrawerPanel>

      <aside className="bg-foreground/5 border-border sticky top-8 hidden max-h-[calc(100dvh-4rem)] self-start overflow-y-auto rounded-3xl border p-4 backdrop-blur-sm lg:block">
        <GuideMenu activeId={activeId} />
      </aside>
    </>
  )
}

export default GuideNavigation
