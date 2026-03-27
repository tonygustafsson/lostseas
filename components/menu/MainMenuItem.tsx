"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import { cn } from "@/lib/utils"

import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"

type MainMenuItemProps = {
  href?: string
  onClick?: () => void
  disabled?: boolean
  icon: React.ReactElement
  label: string
  className?: string
  badge?: React.ReactNode
}

const MainMenuItem = ({
  href,
  onClick,
  disabled,
  className,
  icon,
  label,
  badge,
}: MainMenuItemProps) => {
  const pathname = usePathname()
  const isActive = href ? pathname === href : false

  return (
    <SidebarMenuItem className={className}>
      <SidebarMenuButton
        isActive={isActive}
        onClick={onClick}
        disabled={disabled}
        asChild={!!href}
      >
        {href ? (
          <Link
            href={href}
            className={cn("font-serif text-base!", {
              "text-accent!": isActive,
            })}
            aria-current={isActive ? "page" : undefined}
          >
            {icon}
            {label}
          </Link>
        ) : (
          <div className="flex gap-2 font-serif text-base!">
            {icon}
            {label}
          </div>
        )}
      </SidebarMenuButton>

      {badge ? (
        <SidebarMenuBadge className="bg-primary">{badge}</SidebarMenuBadge>
      ) : null}
    </SidebarMenuItem>
  )
}

export default MainMenuItem
