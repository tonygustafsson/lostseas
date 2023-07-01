import { GetServerSideProps } from "next"
import { useQRCode } from "next-qrcode"
import { useState } from "react"
import { BsClipboardCheck } from "react-icons/bs"

import DefaultLayout from "@/components/layouts/default"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getLoggedInServerSideProps } from "@/utils/next/getLoggedInServerSideProps"

const Settings = () => {
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
      <h1 className="text-3xl font-serif text mb-6">Settings</h1>

      <div className="w-full flex flex-col gap-4 max-w-xl">
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

        <h3 className="text-xl font-serif">Your ID</h3>

        <div className="alert alert-info flex justify-between">
          {player?.id}
          <button onClick={copyIdToClipboard} title="Copy User ID to clipboard">
            {copiedToClipboard ? (
              <span className="text-sm">Copied!</span>
            ) : (
              <BsClipboardCheck className="w-6 h-6" />
            )}
          </button>
        </div>

        <h3 className="text-xl font-serif">QR code</h3>

        <p>
          You can also download or photograph the QR code below and login with
          it using your phone camera or webcam.
        </p>

        <SVG
          text={player?.id || ""}
          options={{
            margin: 2,
            width: 300,
            color: {
              dark: "#000000",
              light: "#ffffff",
            },
          }}
        />
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Settings
