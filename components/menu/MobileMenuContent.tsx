"use client"

import { FaBook } from "react-icons/fa"
import { FiLogOut, FiSettings } from "react-icons/fi"
import { TbHelp } from "react-icons/tb"

import useDrawer, { DrawerId } from "@/app/stores/drawer"
import { usePlayer } from "@/hooks/queries/usePlayer"

import AdvisorDrawerTrigger from "../advisor/AdvisorDrawerTrigger"
import { Button } from "../ui/button"

type Props = {
  onClose: () => void
}

const rowClassName =
  "border-gold/30 from-gold/10 justify-start gap-4 rounded-xl border bg-linear-to-r to-neutral-900 text-lg font-normal! transition-transform active:scale-95"

const iconClassName =
  "border-gold/60 bg-sidebar text-accent box-content size-5 rounded-full border-2 p-2"

const MobileMenuContent = ({ onClose }: Props) => {
  const { open: openDrawer } = useDrawer()
  const { logout } = usePlayer()

  const handleLogout = async () => {
    const response = await logout()

    if (response?.status === 200) {
      window.location.reload()
    }
  }

  const handleOpen = (key: DrawerId) => {
    openDrawer(key)
    onClose()
  }

  return (
    <div className="flex flex-col gap-3">
      <AdvisorDrawerTrigger
        onClick={() => handleOpen("advisor")}
        className={rowClassName}
      />

      <Button
        variant="secondary"
        size="lg"
        className={rowClassName}
        onClick={() => handleOpen("logs")}
      >
        <FaBook className={iconClassName} />
        Log book
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className={rowClassName}
        onClick={() => handleOpen("guide")}
      >
        <TbHelp className={iconClassName} />
        Player guide
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className={rowClassName}
        onClick={() => handleOpen("settings")}
      >
        <FiSettings className={iconClassName} />
        Settings
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className={rowClassName}
        onClick={handleLogout}
      >
        <FiLogOut className={iconClassName} />
        Logout
      </Button>
    </div>
  )
}

export default MobileMenuContent
