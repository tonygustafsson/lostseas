"use client"

import { FaBookDead } from "react-icons/fa"
import { FiLogOut, FiSettings } from "react-icons/fi"
import { GiPirateCoat } from "react-icons/gi"
import { PiBookOpenTextBold } from "react-icons/pi"

import useDrawer, { DrawerId } from "@/app/stores/drawer"
import { usePlayer } from "@/hooks/queries/usePlayer"

import { Button } from "../ui/button"

type Props = {
  onClose: () => void
}

const MobileMenuContent = ({ onClose }: Props) => {
  const { open: openDrawer } = useDrawer()
  const { logout } = usePlayer()

  const handleOpen = (key: DrawerId) => {
    openDrawer(key)
    onClose()
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="secondary"
        size="lg"
        className="justify-start gap-4 bg-neutral-900 text-lg font-normal!"
        onClick={() => handleOpen("status")}
      >
        <GiPirateCoat className="size-5" />
        Status
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="justify-start gap-4 bg-neutral-900 text-lg font-normal!"
        onClick={() => handleOpen("logs")}
      >
        <FaBookDead className="size-5" />
        Log book
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="justify-start gap-4 bg-neutral-900 text-lg font-normal!"
        onClick={() => handleOpen("settings")}
      >
        <FiSettings className="size-5" />
        Settings
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="justify-start gap-4 bg-neutral-900 text-lg font-normal!"
        onClick={() => handleOpen("guide")}
      >
        <PiBookOpenTextBold className="size-5" />
        Player guide
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="justify-start gap-4 bg-neutral-900 text-lg font-normal!"
        onClick={() => logout()}
      >
        <FiLogOut className="size-5" />
        Logout
      </Button>
    </div>
  )
}

export default MobileMenuContent
