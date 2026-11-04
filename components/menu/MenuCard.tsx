"use client"

import { ChevronRight } from "lucide-react"
import type { KeyboardEvent, ReactNode } from "react"

import useDrawer, { type DrawerId } from "@/app/stores/drawer"

import { Card } from "../ui/card"

type Props = {
  ariaLabel: string
  drawerId: DrawerId
  children: ReactNode
}

const MenuCard = ({ ariaLabel, drawerId, children }: Props) => {
  const { open: openDrawer } = useDrawer()

  const open = () => openDrawer(drawerId)
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.repeat || (event.key !== "Enter" && event.key !== " ")) return

    event.preventDefault()
    open()
  }

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={open}
      onKeyDown={handleKeyDown}
      className="group/menu-card hover:bg-card hover:ring-gold/50 focus-visible:ring-ring bg-card w-full cursor-pointer gap-2 p-2 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      {children}
    </Card>
  )
}

export const MenuCardChevron = () => (
  <span className="bg-muted text-muted-foreground group-hover/menu-card:bg-gold group-hover/menu-card:text-primary-foreground group-focus-visible/menu-card:bg-gold group-focus-visible/menu-card:text-primary-foreground inline-flex size-6 shrink-0 items-center justify-center rounded-full transition-colors">
    <ChevronRight className="size-3" />
  </span>
)

export default MenuCard
