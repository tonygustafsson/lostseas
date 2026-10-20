"use client"

import { useQRCode } from "next-qrcode"
import { FiSettings } from "react-icons/fi"

import SoundControls from "@/components/Sound/Controls"
import { Separator } from "@/components/ui/separator"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import PasskeySettings from "../../settings/PasskeySettings"
import ResetGame from "../../settings/ResetGame"
import UserIdDisplay from "../../settings/UserIdDisplay"

const SettingsDrawer = () => {
  const { data: player } = useGetPlayer()
  const { SVG } = useQRCode()

  if (!player) return null

  return (
    <>
      <h1 className="mb-6 flex items-center gap-2 font-serif text-2xl">
        <FiSettings className="text-accent" />
        Settings
      </h1>

      <div className="flex w-full max-w-xl flex-col gap-4">
        <div className="lg:hidden">
          <h2 className="mb-4 font-serif text-xl">Sound</h2>

          <SoundControls />

          <Separator className="mt-8 mb-2" />
        </div>

        <p>
          Your account were created{" "}
          {new Date(player.createdDate).toLocaleDateString()}.
        </p>

        <Separator className="my-2" />

        <h2 className="font-serif text-2xl">Save your game</h2>

        <p>
          Your browser remembers you, but if you clear your browser cache or
          want to play on another device you need a way to sign in again. A
          passkey is the easiest option.
        </p>

        <h3 className="mt-4 font-serif text-xl">Passkey</h3>

        <PasskeySettings />

        <h3 className="mt-4 font-serif text-xl">Your ID</h3>

        <p>
          You can always sign in with your user ID instead. Keep it somewhere
          safe.
        </p>

        <div className="mb-4">
          <UserIdDisplay playerId={player.id} />
        </div>

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

        <Separator className="my-2" />

        <h2 className="font-serif text-2xl">Start over</h2>

        <ResetGame player={player} />
      </div>
    </>
  )
}

export default SettingsDrawer
