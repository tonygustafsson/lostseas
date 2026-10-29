"use client"

import { Music, SkipForward, Swords, Waves } from "lucide-react"

import useSound from "@/app/stores/sound"
import { Button } from "@/components/ui/button"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import Equalizer from "./Equalizer"
import SoundChannel from "./SoundChannel"
import SoundToggle from "./SoundToggle"

const SoundControls = () => {
  const { data: player } = useGetPlayer()
  const location = player?.character?.location

  const {
    musicOn,
    setMusic,
    ambienceOn,
    setAmbience,
    soundEffectsOn,
    setSoundEffects,
    nextTrack,
    changingTrack,
  } = useSound()

  return (
    <div className="flex flex-col gap-4">
      <SoundChannel
        id="toggleMusic"
        icon={Music}
        title="Music"
        checked={musicOn}
        onCheckedChange={setMusic}
      >
        <span className="flex items-center gap-2 text-sm">
          <Equalizer />
          {location === "Sea" ? "Playing sea tunes" : "Playing town tunes"}
        </span>

        <Button
          variant="secondary"
          size="sm"
          disabled={changingTrack}
          onClick={nextTrack}
        >
          <SkipForward />
          Next track
        </Button>
      </SoundChannel>

      <div className="grid gap-4 sm:grid-cols-2">
        <SoundToggle
          id="toggleAmbience"
          icon={Waves}
          title="Ambience"
          checked={ambienceOn}
          onCheckedChange={setAmbience}
        />

        <SoundToggle
          id="soundEffects"
          icon={Swords}
          title="SoundFX"
          checked={soundEffectsOn}
          onCheckedChange={setSoundEffects}
        />
      </div>
    </div>
  )
}

export default SoundControls
