import Link from "next/link"
import React from "react"
import { FiLogOut, FiSettings } from "react-icons/fi"
import { PiBookOpenTextBold } from "react-icons/pi"

import { usePlayer } from "@/hooks/queries/usePlayer"

import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const QuickButtonMenu = () => {
  const { logout } = usePlayer()

  return (
    <ul className="flex justify-center gap-4">
      <li>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/settings">
              <Button variant="secondary" size="sm">
                <FiSettings className="h-5 w-5" />
              </Button>
            </Link>
          </TooltipTrigger>

          <TooltipContent>Settings</TooltipContent>
        </Tooltip>
      </li>

      <li>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/guide">
              <Button variant="secondary" size="sm">
                <PiBookOpenTextBold className="h-5 w-5" />
              </Button>
            </Link>
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
