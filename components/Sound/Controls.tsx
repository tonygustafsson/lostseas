import { useSound } from "./context"

const SoundControls = () => {
  const { musicOn, setMusic, soundEffectsOn, setSoundEffects } = useSound()

  return (
    <div className="mx-4 mb-8 mt-2 flex gap-4">
      <div className="flex items-center gap-2">
        <input
          id="toggleMusic"
          type="checkbox"
          className="toggle toggle-info toggle-xs"
          checked={musicOn}
          onChange={() => setMusic(!musicOn)}
        />
        <label htmlFor="toggleMusic" className="text-xs">
          Music
        </label>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="soundEffects"
          type="checkbox"
          className="toggle toggle-info toggle-xs"
          checked={soundEffectsOn}
          onChange={() => setSoundEffects(!soundEffectsOn)}
        />
        <label htmlFor="soundEffects" className="text-xs">
          SoundFX
        </label>
      </div>
    </div>
  )
}

export default SoundControls
