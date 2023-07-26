import Link from "next/link"

import { soundState$ } from "../Sound/context"

type Props = {
  player: Player
  onClose: () => void
}

const WelcomeNewUser = ({ player, onClose }: Props) => {
  const startExploring = () => {
    if (soundState$.musicOn.get()) {
      soundState$.musicPlay.set(true)
    }

    onClose()
  }

  return (
    <>
      <p className="mb-2">
        Nice to see you. You are located at {player.character.town}s{" "}
        {player.character.location}. You can either check out the town, or head
        out to the open seas.
      </p>

      <p className="mb-2">
        Don&apos;t forget to save your user ID in the{" "}
        <Link href="/settings" onClick={onClose}>
          settings page
        </Link>
        . That way you can login again if you loose your browser settings.
      </p>

      <button className="btn btn-primary w-full mt-4" onClick={startExploring}>
        Start exploring
      </button>
    </>
  )
}

export default WelcomeNewUser
