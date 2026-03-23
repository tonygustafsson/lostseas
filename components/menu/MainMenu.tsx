"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  GiBandana,
  GiOpenedFoodCan,
  GiPirateCoat,
  GiPirateHat,
  GiShoonerSailboat,
} from "react-icons/gi"
import { RiTreasureMapLine } from "react-icons/ri"

import { useModal } from "@/components/Modal/context"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Map from "../Map"
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"

const MainMenu = () => {
  const { data: player } = useGetPlayer()
  const pathname = usePathname()
  const { setModal } = useModal()

  const numberOfShips = Object.values(player?.ships ?? {}).length
  const numberOfInventoryItems = Object.values(player?.inventory ?? {}).length

  const showMap = () => {
    setModal({
      id: "map",
      title: "Pick your destination",
      fullWidth: true,
      content: <Map currentTown={player?.character.town} />,
    })
  }

  return (
    <ul className="main-menu">
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/">
            <GiPirateHat className="h-5 w-5" />
            Play
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={showMap}
          disabled={!!player?.character.journey}
        >
          <RiTreasureMapLine className="h-5 w-5" />
          Map
        </SidebarMenuButton>
      </SidebarMenuItem>

      <li className="main-menu-separator" aria-hidden></li>

      <SidebarMenuItem>
        <SidebarMenuButton isActive={pathname === "/status"} asChild>
          <Link href="/status">
            <GiPirateCoat className="h-5 w-5" />
            Status
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton isActive={pathname === "/ships"} asChild>
          <Link href="/ships">
            <GiShoonerSailboat className="h-5 w-5" />
            Ships
          </Link>
        </SidebarMenuButton>

        <SidebarMenuBadge>{numberOfShips}</SidebarMenuBadge>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton isActive={pathname === "/crew"} asChild>
          <Link href="/crew">
            <GiBandana className="h-5 w-5" />
            Crew members
          </Link>
        </SidebarMenuButton>

        <SidebarMenuBadge>{player?.crewMembers.count}</SidebarMenuBadge>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton isActive={pathname === "/inventory"} asChild>
          <Link href="/inventory">
            <GiOpenedFoodCan className="h-5 w-5" />
            Inventory
          </Link>
        </SidebarMenuButton>

        <SidebarMenuBadge>{numberOfInventoryItems}</SidebarMenuBadge>
      </SidebarMenuItem>

      <li className="main-menu-separator !mb-0" aria-hidden></li>
    </ul>
  )
}

export default MainMenu
