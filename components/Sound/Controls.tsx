import { useSound } from "./context"

const SoundControls = () => {
  const { musicOn, setMusic, soundEffectsOn, setSoundEffects } = useSound()

  return (
    <div className="flex gap-4 mt-2 mb-8 mx-4">
      <div className="flex items-center gap-2">
        <input
          id="toggleMusic"
          type="checkbox"
          className="toggle toggle-xs toggle-info"
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
          className="toggle toggle-xs toggle-info"
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
