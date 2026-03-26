"use client"

import useSound from "@/app/stores/sound"
import { Switch } from "@/components/ui/switch"

import { Label } from "../ui/label"

const SoundControls = () => {
  const { musicOn, setMusic, soundEffectsOn, setSoundEffects } = useSound()

  return (
    <div className="mx-4 flex gap-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="toggleMusic"
          checked={musicOn}
          onCheckedChange={(val) => setMusic(Boolean(val))}
        />
        <Label htmlFor="toggleMusic">Music</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="soundEffects"
          checked={soundEffectsOn}
          onCheckedChange={(val) => setSoundEffects(Boolean(val))}
        />
        <Label htmlFor="soundEffects">SoundFX</Label>
      </div>
    </div>
  )
}

export default SoundControls
