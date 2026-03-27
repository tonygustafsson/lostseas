"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GiPirateHat } from "react-icons/gi"
import { HiMenu } from "react-icons/hi"
import { RiTreasureMapLine } from "react-icons/ri"

import { useModal } from "@/app/stores/modals"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { cn } from "@/lib/utils"

import Map from "../Map"
import { Button } from "../ui/button"

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
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-slate-950/95 px-3 pt-2 shadow-[0_-12px_32px_rgba(2,6,23,0.45)] backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-3 gap-2 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
        <Button
          asChild
          variant="ghost"
          className={cn(
            "h-auto flex-col gap-1 rounded-2xl px-2 py-2 text-[0.7rem] leading-none font-semibold text-slate-400 transition-colors hover:bg-white/5 hover:text-amber-50",
            pathname === "/" &&
              "border border-white/10 bg-white/10 text-amber-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          )}
        >
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
            <GiPirateHat className="h-5 w-5" />
            Play
          </Link>
        </Button>

        <Button
          variant="ghost"
          onClick={() => setMobileMenuOpen((mobileMenuOpen) => !mobileMenuOpen)}
          className="h-auto flex-col gap-1 rounded-2xl px-2 py-2 text-[0.7rem] leading-none font-semibold text-slate-400 transition-colors hover:bg-white/5 hover:text-amber-50"
        >
          <HiMenu className="h-5 w-5" />
          Menu
        </Button>

        <Button
          variant="ghost"
          onClick={showMap}
          disabled={!!player?.character.journey}
          className="h-auto flex-col gap-1 rounded-2xl px-2 py-2 text-[0.7rem] leading-none font-semibold text-slate-400 transition-colors hover:bg-white/5 hover:text-amber-50"
        >
          <RiTreasureMapLine className="h-5 w-5" />
          Map
        </Button>
      </div>
    </div>
  )
}

export default MobileBottomNav
