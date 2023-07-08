import Link from "next/link"
import { useRouter } from "next/router"
import { GiPirateHat } from "react-icons/gi"
import { HiMenu } from "react-icons/hi"
import { RiTreasureMapLine } from "react-icons/ri"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Map from "../Map"
import { useModal } from "../ui/Modal/context"

type Props = {
  setMobileMenuOpen: (open: (prev: boolean) => boolean) => void
}

const MobileBottomNav = ({ setMobileMenuOpen }: Props) => {
  const { pathname } = useRouter()
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

      <button
        onClick={() => setMobileMenuOpen((mobileMenuOpen) => !mobileMenuOpen)}
      >
        <HiMenu className="h-5 w-5" />
        Menu
      </button>

      <button onClick={showMap} disabled={!!player?.character.journey}>
        <RiTreasureMapLine className="h-5 w-5" />
        Map
      </button>
    </div>
  )
}

export default MobileBottomNav
