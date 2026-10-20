"use client"

import AddPasskeyButton from "./AddPasskeyButton"
import PasskeyList from "./PasskeyList"

const PasskeySettings = () => (
  <div className="flex flex-col items-start gap-2">
    <p>
      A passkey lets you sign in with your fingerprint, face or device PIN. It
      is stored in your device or password manager, so it also works on your
      other devices that share it.
    </p>

    <PasskeyList />

    <AddPasskeyButton />
  </div>
)

export default PasskeySettings
