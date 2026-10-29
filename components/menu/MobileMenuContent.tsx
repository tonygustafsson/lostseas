"use client"

import Image from "next/image"
import { FaBook } from "react-icons/fa"
import { FiLogOut, FiSettings } from "react-icons/fi"
import { TbHelp } from "react-icons/tb"

import useDrawer, { DrawerId } from "@/app/stores/drawer"
import { useGetPlayer, usePlayer } from "@/hooks/queries/usePlayer"
import { getAdvisorWarnings } from "@/utils/getAdvisorWarnings"

import MobileMenuItem from "./MobileMenuItem"

type Props = {
  onClose: () => void
}

const groupClassName =
  "border-gold/20 bg-sidebar flex flex-col divide-y divide-white/5 rounded-2xl border p-1"

const MobileMenuContent = ({ onClose }: Props) => {
  const { open: openDrawer } = useDrawer()
  const { data: player } = useGetPlayer()
  const { logout } = usePlayer()

  const warnings = getAdvisorWarnings(player)

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
    <div className="flex flex-col gap-4">
      <div className={groupClassName}>
        {!!warnings.length && (
          <MobileMenuItem
            icon={
              <Image
                src="/img/parrot.svg"
                alt=""
                width={20}
                height={20}
                draggable={false}
                className="size-5 select-none"
              />
            }
            label="Advisor"
            badge={warnings.length}
            onClick={() => handleOpen("advisor")}
          />
        )}

        <MobileMenuItem
          icon={<FaBook />}
          label="Log book"
          onClick={() => handleOpen("logs")}
        />

        <MobileMenuItem
          icon={<TbHelp />}
          label="Player guide"
          onClick={() => handleOpen("guide")}
        />

        <MobileMenuItem
          icon={<FiSettings />}
          label="Settings"
          onClick={() => handleOpen("settings")}
        />
      </div>

      <div className={groupClassName}>
        <MobileMenuItem
          icon={<FiLogOut />}
          label="Logout"
          tone="danger"
          onClick={handleLogout}
        />
      </div>
    </div>
  )
}

export default MobileMenuContent
