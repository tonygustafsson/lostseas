"use client"

import { FaBook } from "react-icons/fa"
import { FiLogOut, FiSettings } from "react-icons/fi"
import { GiPirateCoat } from "react-icons/gi"
import { TbHelp } from "react-icons/tb"

import useDrawer, { DrawerId } from "@/app/stores/drawer"
import { usePlayer } from "@/hooks/queries/usePlayer"

import AdvisorDrawerTrigger from "../advisor/AdvisorDrawerTrigger"
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
      <AdvisorDrawerTrigger
        onClick={() => openDrawer("advisor")}
        className="justify-start gap-4 bg-neutral-900 text-lg font-normal!"
      />

      <Button
        variant="secondary"
        size="lg"
        className="justify-start gap-4 bg-neutral-900 text-lg font-normal!"
        onClick={() => handleOpen("status")}
      >
        <GiPirateCoat className="text-accent size-5" />
        Status
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="justify-start gap-4 bg-neutral-900 text-lg font-normal!"
        onClick={() => handleOpen("logs")}
      >
        <FaBook className="text-accent size-5" />
        Log book
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="justify-start gap-4 bg-neutral-900 text-lg font-normal!"
        onClick={() => handleOpen("settings")}
      >
        <FiSettings className="text-accent size-5" />
        Settings
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="justify-start gap-4 bg-neutral-900 text-lg font-normal!"
        onClick={() => handleOpen("guide")}
      >
        <TbHelp className="text-accent size-5" />
        Player guide
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="justify-start gap-4 bg-neutral-900 text-lg font-normal!"
        onClick={() => logout()}
      >
        <FiLogOut className="text-accent size-5" />
        Logout
      </Button>
    </div>
  )
}

export default MobileMenuContent
