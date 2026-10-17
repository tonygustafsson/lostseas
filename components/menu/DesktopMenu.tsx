"use client"

import AdvisorDrawerTrigger from "@/components/advisor/AdvisorDrawerTrigger"
import { almendra } from "@/fonts"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import SocialMedia from "../SocialMedia"
import SoundControls from "../Sound/Controls"
import { Sidebar, SidebarContent, SidebarGroup } from "../ui/sidebar"
import CharacterCard from "./CharacterCard"
import FleetCard from "./FleetCard"
import InventoryCard from "./InventoryCard"
import QuickButtonMenu from "./QuickButtonMenu"
import WeatherCard from "./WeatherCard"

type Props = {
  className?: string
}

const DesktopMenu = ({ className }: Props) => {
  const { data: player } = useGetPlayer()

  if (!player) return null

  return (
    <Sidebar className={className}>
      <SidebarContent className="mx-2">
        <SidebarGroup
          className={`${almendra.variable} relative mb-4 shrink-0 overflow-hidden`}
        >
          <div className="bg-gold/10 absolute inset-x-0 -top-16 mx-auto h-24 w-48 rounded-full blur-2xl" />

          <div className="relative flex items-center justify-center gap-4 py-2">
            <div className="to-gold/60 h-px flex-1 bg-linear-to-r from-transparent" />

            <span className="from-gold-light via-gold to-gold-dark bg-linear-to-b bg-clip-text font-serif text-2xl tracking-widest text-transparent uppercase">
              Lost Seas
            </span>

            <div className="to-gold/60 h-px flex-1 bg-linear-to-l from-transparent" />
          </div>

          <div className="via-gold/70 absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent to-transparent" />
        </SidebarGroup>

        <SidebarGroup className="gap-4">
          <CharacterCard player={player} />
          <FleetCard player={player} />
          <InventoryCard player={player} />
          <WeatherCard day={player.character.day} />

          <AdvisorDrawerTrigger />

          <div className="mb-4 flex flex-col gap-8">
            <QuickButtonMenu />
            <SoundControls />
          </div>
          <SocialMedia />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default DesktopMenu
