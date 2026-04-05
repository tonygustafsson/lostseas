"use client"

import { useQRCode } from "next-qrcode"
import { FiSettings } from "react-icons/fi"

import useDrawer from "@/app/stores/drawer"
import DrawerPanel from "@/components/DrawerPanel"
import SoundControls from "@/components/Sound/Controls"
import { Separator } from "@/components/ui/separator"
import { useGetPlayer, usePlayer } from "@/hooks/queries/usePlayer"

import { Button } from "../ui/button"
import UserIdDisplay from "./UserIdDisplay"

const SettingsDrawer = () => {
  const { active: activeDrawer, close: closeDrawer } = useDrawer()
  const isOpen = activeDrawer === "settings"
  const { data: player } = useGetPlayer()
  const { logout } = usePlayer()
  const { SVG } = useQRCode()

  if (!player) return null

  return (
    <DrawerPanel isOpen={isOpen} onClose={closeDrawer} className="sm:w-lg">
      <h1 className="mb-6 flex items-center gap-2 font-serif text-2xl">
        <FiSettings className="text-yellow-400" />
        Settings
      </h1>

      <div className="flex w-full max-w-xl flex-col gap-4">
        <div className="lg:hidden">
          <h2 className="mb-4 font-serif text-xl">Sound</h2>

          <SoundControls />

          <Separator className="mt-8 mb-2" />
        </div>

        <div className="lg:hidden">
          <h2 className="mb-4 font-serif text-xl">Log out</h2>

          <Button onClick={() => logout()}>Log out</Button>

          <Separator className="mt-8 mb-2" />
        </div>

        <p>
          Your account were created{" "}
          {new Date(player.createdDate).toLocaleDateString()}.
        </p>

        <Separator className="my-2" />

        <h2 className="font-serif text-2xl">Save your game</h2>

        <p>
          You will login using a user ID that is randomly created for you. This
          ID is remembered by your browser, but if you clear your browser cache
          or want to login on another device you should save your ID so that you
          can login using it.
        </p>

        <h3 className="font-serif text-xl">Your ID</h3>

        <UserIdDisplay playerId={player.id} />

        <h3 className="font-serif text-xl">QR code</h3>

        <p>
          You can also download or photograph the QR code below and login with
          it using your phone camera or webcam.
        </p>

        <SVG
          text={player.id}
          options={{
            margin: 2,
            width: 300,
            color: { dark: "#000000", light: "#ffffff" },
          }}
        />
      </div>
    </DrawerPanel>
  )
}

export default SettingsDrawer
