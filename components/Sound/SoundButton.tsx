"use client"

import { FiVolume2 } from "react-icons/fi"

import useModal from "@/app/stores/modals"
import useSound from "@/app/stores/sound"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import SoundControls from "./Controls"

const SoundButton = () => {
  const { setModal } = useModal()
  const { musicOn, ambienceOn, soundEffectsOn } = useSound()

  const channels = [
    { name: "Music", on: musicOn },
    { name: "Ambience", on: ambienceOn },
    { name: "SoundFX", on: soundEffectsOn },
  ]

  const status = channels
    .map(({ name, on }) => `${name} ${on ? "on" : "off"}`)
    .join(", ")

  const openSoundModal = () =>
    setModal({
      id: "sound",
      title: "Sound",
      content: (
        <div className="-mt-4">
          <SoundControls />
        </div>
      ),
    })

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary" size="lg" onClick={openSoundModal}>
          <FiVolume2 />
          Sound
          <span className="sr-only">({status})</span>
          <span aria-hidden className="ml-1 flex gap-1">
            {channels.map(({ name, on }) => (
              <span
                key={name}
                className={cn(
                  "size-2 rounded-full transition-colors",
                  on ? "bg-green-300" : "bg-red-300"
                )}
              />
            ))}
          </span>
        </Button>
      </TooltipTrigger>

      <TooltipContent>{status}</TooltipContent>
    </Tooltip>
  )
}

export default SoundButton
