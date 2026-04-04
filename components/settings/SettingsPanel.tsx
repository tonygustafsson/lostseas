"use client"

import { useQRCode } from "next-qrcode"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import UserIdDisplay from "./UserIdDisplay"

const SettingsPanel = () => {
  const { data: player } = useGetPlayer()
  const { SVG } = useQRCode()

  if (!player) return null

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <p className="mb-4">
        Your account were created{" "}
        {new Date(player.createdDate).toLocaleDateString()}.
      </p>

      <h2 className="font-serif text-2xl">Save your game</h2>

      <p>
        You will login using a user ID that is randomly created for you. This ID
        is remembered by your browser, but if you clear your browser cache or
        want to login on another device you should save your ID so that you can
        login using it.
      </p>

      <h3 className="font-serif text-xl">Your ID</h3>

      <UserIdDisplay playerId={player.id} />

      <h3 className="font-serif text-xl">QR code</h3>

      <p>
        You can also download or photograph the QR code below and login with it
        using your phone camera or webcam.
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
  )
}

export default SettingsPanel
