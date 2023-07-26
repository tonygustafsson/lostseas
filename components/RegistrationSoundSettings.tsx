type Props = {
  musicOn: boolean
  setMusicOn: (musicOn: boolean) => void
  soundEffectsOn: boolean
  setSoundEffectsOn: (soundEffectsOn: boolean) => void
}

const RegistrationSoundSettings = ({
  musicOn,
  setMusicOn,
  soundEffectsOn,
  setSoundEffectsOn,
}: Props) => (
  <div className="flex flex-col gap-4 pb-4">
    <div className="flex items-center gap-4">
      <input
        id="toggleMusic"
        type="checkbox"
        className="toggle toggle-sm toggle-info"
        value="musicOn"
        checked={musicOn}
        onChange={(e) => {
          setMusicOn(e.target.checked)
        }}
      />
      <label htmlFor="toggleMusic">Music</label>
    </div>

    <div className="flex items-center gap-4">
      <input
        id="soundEffects"
        type="checkbox"
        className="toggle toggle-sm toggle-info"
        checked={soundEffectsOn}
        onChange={(e) => {
          setSoundEffectsOn(e.target.checked)
        }}
      />
      <label htmlFor="soundEffects">Sound effects</label>
    </div>
  </div>
)

export default RegistrationSoundSettings
