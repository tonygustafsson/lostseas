import Link from "next/link"
import React from "react"
import { FiLogOut, FiSettings } from "react-icons/fi"
import { PiBookOpenTextBold } from "react-icons/pi"

import { usePlayer } from "@/hooks/queries/usePlayer"

const QuickButtonMenu = () => {
  const { logout } = usePlayer()

  return (
    <ul className="menu menu-horizontal quick-icon-menu rounded-box flex justify-center mb-6">
      <li>
        <Link href="/settings" className="tooltip" data-tip="Settings">
          <FiSettings className="h-5 w-5" />
        </Link>
      </li>

      <li>
        <Link href="/guide" className="tooltip" data-tip="Player guide">
          <PiBookOpenTextBold className="h-5 w-5" />
        </Link>
      </li>

      <li>
        <a onClick={() => logout()} className="tooltip" data-tip="Sign out">
          <FiLogOut className="h-5 w-5" />
        </a>
      </li>
    </ul>
  )
}

export default QuickButtonMenu
