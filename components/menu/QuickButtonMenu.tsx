"use client"

import React from "react"
import { FaBookDead } from "react-icons/fa"
import { FiLogOut, FiSettings } from "react-icons/fi"
import { PiBookOpenTextBold } from "react-icons/pi"

import useDrawer from "@/app/stores/drawer"
import { usePlayer } from "@/hooks/queries/usePlayer"

import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const QuickButtonMenu = () => {
  const { logout } = usePlayer()
  const { open: openDrawer } = useDrawer()

  return (
    <ul className="flex justify-center gap-3">
      <li>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => openDrawer("settings")}
            >
              <FiSettings className="h-5 w-5" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Settings</TooltipContent>
        </Tooltip>
      </li>

      <li>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => openDrawer("logs")}
            >
              <FaBookDead className="h-5 w-5" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Log book</TooltipContent>
        </Tooltip>
      </li>

      <li>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => openDrawer("guide")}
            >
              <PiBookOpenTextBold className="h-5 w-5" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Player guide</TooltipContent>
        </Tooltip>
      </li>

      <li>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => logout()}
              aria-label="Sign out"
            >
              <FiLogOut className="h-5 w-5" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Sign out</TooltipContent>
        </Tooltip>
      </li>
    </ul>
  )
}

export default QuickButtonMenu
