"use client"

import { useState } from "react"
import { BsClipboardCheck } from "react-icons/bs"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"

type Props = {
  playerId: Player["id"]
}

const UserIdDisplay = ({ playerId }: Props) => {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  const copyIdToClipboard = () => {
    navigator.clipboard.writeText(playerId)
    setCopiedToClipboard(true)

    setTimeout(() => {
      setCopiedToClipboard(false)
    }, 2000)
  }

  return (
    <Alert className="mb-8 bg-gray-800">
      <AlertTitle>Copy the ID in order to login again</AlertTitle>

      <AlertDescription>{playerId}</AlertDescription>

      <AlertAction>
        <Button onClick={copyIdToClipboard} title="Copy User ID to clipboard">
          {copiedToClipboard ? (
            <span className="text-sm">Copied!</span>
          ) : (
            <BsClipboardCheck className="h-6 w-6" />
          )}
        </Button>
      </AlertAction>
    </Alert>
  )
}

export default UserIdDisplay
