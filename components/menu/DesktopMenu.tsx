"use client"

import Image from "next/image"
import Link from "next/link"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import SocialMedia from "../SocialMedia"
import SoundControls from "../Sound/Controls"
import { Sidebar, SidebarContent, SidebarGroup } from "../ui/sidebar"
import CharacterCard from "./CharacterCard"
import FleetCard from "./FleetCard"
import InventoryCard from "./InventoryCard"
import MainMenu from "./MainMenu"
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
      <SidebarContent className="mx-2 mt-4">
        <SidebarGroup>
          <Link
            href="/"
            className="mx-3 flex items-baseline gap-3 font-serif text-3xl"
          >
            <Image
              src="/img/logo.svg"
              alt="Lost Seas logotype"
              width={42}
              height={32}
              style={{ height: 32 }}
            />
            Lost Seas
          </Link>
        </SidebarGroup>

        <SidebarGroup>
          <MainMenu />
        </SidebarGroup>

        <SidebarGroup className="gap-4">
          <CharacterCard player={player} />
          <FleetCard player={player} />
          <InventoryCard player={player} />
          <WeatherCard day={player.character.day} />
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
