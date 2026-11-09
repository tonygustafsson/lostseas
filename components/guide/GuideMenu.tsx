import { cn } from "@/lib/utils"

import { GUIDE_GROUPS, type GuideChapterId } from "./chapters"

type Props = {
  activeId?: GuideChapterId
  /** Takes over scrolling, for menus that need to close first */
  onNavigate?: (id: GuideChapterId) => void
}

export const scrollToChapter = (id: GuideChapterId) => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches

  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })

  // Keep the chapter in the URL so it can be shared
  history.replaceState(null, "", `#${id}`)
}

const GuideMenu = ({ activeId, onNavigate }: Props) => (
  <nav aria-label="Chapters" className="flex flex-col gap-6">
    {GUIDE_GROUPS.map((group) => (
      <div key={group.title}>
        <p className="text-muted-foreground mb-2 px-4 text-xs font-semibold tracking-widest uppercase">
          {group.title}
        </p>

        <ul className="flex flex-col gap-1">
          {group.chapters.map(({ id, title, icon: Icon }) => {
            const isActive = id === activeId

            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(event) => {
                    event.preventDefault()

                    if (onNavigate) {
                      onNavigate(id)
                    } else {
                      scrollToChapter(id)
                    }
                  }}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "text-foreground/75 hover:text-parchment flex items-center gap-2 rounded-lg border-l-2 border-transparent px-4 py-1 font-serif text-lg transition-colors hover:bg-white/5",
                    isActive && "border-gold bg-sea/30 text-parchment"
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "text-muted-foreground size-4 shrink-0",
                      isActive && "text-gold-light"
                    )}
                  />
                  {title}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    ))}
  </nav>
)

export default GuideMenu
