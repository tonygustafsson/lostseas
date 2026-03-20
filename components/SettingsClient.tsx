"use client"

import { useQRCode } from "next-qrcode"
import { useState } from "react"
import { BsClipboardCheck } from "react-icons/bs"

import DefaultLayout from "@/components/layouts/default"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const SettingsClient = () => {
  const { data: player } = useGetPlayer()
  const { SVG } = useQRCode()

  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  const copyIdToClipboard = () => {
    navigator.clipboard.writeText(player?.id || "")
    setCopiedToClipboard(true)

    setTimeout(() => {
      setCopiedToClipboard(false)
    }, 2000)
  }

  if (!player) {
    return <p>Access denied</p>
  }

  return (
    <DefaultLayout>
      <h1 className="text mb-6 font-serif text-3xl">Settings</h1>

      <div className="flex w-full max-w-xl flex-col gap-4">
        <p className="mb-4">
          Your account were created{" "}
          {new Date(player?.createdDate).toLocaleDateString()}.
        </p>

        <h2 className="font-serif text-2xl">Save your game</h2>

        <p>
          You will login using a user ID that is randomly created for you. This
          ID is remembered by your browser, but if you clear your browser cache
          or want to login on another device you should save your ID so that you
          can login using it.
        </p>

        <h3 className="font-serif text-xl">Your ID</h3>

        <div className="alert alert-info flex justify-between">
          {player?.id}
          <button onClick={copyIdToClipboard} title="Copy User ID to clipboard">
            {copiedToClipboard ? (
              <span className="text-sm">Copied!</span>
            ) : (
              <BsClipboardCheck className="h-6 w-6" />
            )}
          </button>
        </div>

        <h3 className="font-serif text-xl">QR code</h3>

        <p>
          You can also download or photograph the QR code below and login with
          it using your phone camera or webcam.
        </p>

        <SVG
          text={player?.id || ""}
          options={{
            margin: 2,
            width: 300,
            color: { dark: "#000000", light: "#ffffff" },
          }}
        />
      </div>
    </DefaultLayout>
  )
}

export default SettingsClient
