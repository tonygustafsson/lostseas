"use client"

import { AlertTriangleIcon } from "lucide-react"
import { useQRCode } from "next-qrcode"
import { useState } from "react"
import { BsClipboardCheck } from "react-icons/bs"

import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"

type Props = {
  playerId: Player["id"]
  createdDate: Player["createdDate"]
}

const SettingsPanel = ({ playerId, createdDate }: Props) => {
  const { SVG } = useQRCode()
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  const copyIdToClipboard = () => {
    navigator.clipboard.writeText(playerId)
    setCopiedToClipboard(true)

    setTimeout(() => {
      setCopiedToClipboard(false)
    }, 2000)
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <p className="mb-4">
        Your account were created {new Date(createdDate).toLocaleDateString()}.
      </p>

      <h2 className="font-serif text-2xl">Save your game</h2>

      <p>
        You will login using a user ID that is randomly created for you. This ID
        is remembered by your browser, but if you clear your browser cache or
        want to login on another device you should save your ID so that you can
        login using it.
      </p>

      <h3 className="font-serif text-xl">Your ID</h3>

      <Alert className="mb-8 bg-gray-800">
        <AlertTriangleIcon />
        <AlertTitle>Your ID</AlertTitle>
        <AlertDescription className="flex items-center gap-2">
          {playerId}
          <Button onClick={copyIdToClipboard} title="Copy User ID to clipboard">
            {copiedToClipboard ? (
              <span className="text-sm">Copied!</span>
            ) : (
              <BsClipboardCheck className="h-6 w-6" />
            )}
          </Button>
        </AlertDescription>
      </Alert>

      <h3 className="font-serif text-xl">QR code</h3>

      <p>
        You can also download or photograph the QR code below and login with it
        using your phone camera or webcam.
      </p>

      <SVG
        text={playerId}
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
