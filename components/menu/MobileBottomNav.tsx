"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GiPirateHat } from "react-icons/gi"
import { HiMenu } from "react-icons/hi"
import { RiTreasureMapLine } from "react-icons/ri"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Map from "../Map"
import { Button } from "../ui/button"
import { useModal } from "../ui/Modal/context"

type Props = {
  setMobileMenuOpen: (open: (prev: boolean) => boolean) => void
}

const MobileBottomNav = ({ setMobileMenuOpen }: Props) => {
  const pathname = usePathname()
  const { data: player } = useGetPlayer()
  const { setModal } = useModal()

  const showMap = () => {
    setModal({
      id: "map",
      title: "Pick your destination",
      fullWidth: true,
      content: <Map currentTown={player?.character.town} />,
    })
  }

  return (
    <div className="btm-nav z-10">
      <Link href="/" className={`${pathname === "/" ? "active" : ""}`}>
        <GiPirateHat className="h-5 w-5" />
        Play
      </Link>

      <Button
        onClick={() => setMobileMenuOpen((mobileMenuOpen) => !mobileMenuOpen)}
      >
        <HiMenu className="h-5 w-5" />
        Menu
      </Button>

      <Button onClick={showMap} disabled={!!player?.character.journey}>
        <RiTreasureMapLine className="h-5 w-5" />
        Map
      </Button>
    </div>
  )
}

export default MobileBottomNav
