"use client"

import Image from "next/image"
import Link from "next/link"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import SocialMedia from "../SocialMedia"
import SoundControls from "../Sound/Controls"
import { Sidebar, SidebarContent, SidebarGroup } from "../ui/sidebar"
import CharacterCard from "./CharacterCard"
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
      <SidebarContent>
        <SidebarGroup>
          <Link
            href="/"
            className="mx-3 mb-2 flex items-baseline gap-3 font-serif text-3xl"
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

        <SidebarGroup>
          <QuickButtonMenu />
          <SoundControls />
          <CharacterCard player={player} />
          <WeatherCard day={player.character.day} />
          <SocialMedia />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default DesktopMenu
