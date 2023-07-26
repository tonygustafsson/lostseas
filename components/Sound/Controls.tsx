import { observer } from "@legendapp/state/react"

import { soundState$, toggleMusic, toggleSoundEffects } from "./context"

const SoundControls = observer(() => (
  <div className="flex gap-4 mt-2 mb-8 mx-4">
    <div className="flex items-center gap-2">
      <input
        id="toggleMusic"
        type="checkbox"
        className="toggle toggle-xs toggle-info"
        checked={soundState$.musicPlay.get()}
        onChange={toggleMusic}
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
        checked={soundState$.soundEffectsOn.get()}
        onChange={toggleSoundEffects}
      />
      <label htmlFor="soundEffects" className="text-xs">
        SoundFX
      </label>
    </div>
  </div>
))

export default SoundControls
