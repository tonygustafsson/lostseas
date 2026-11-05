import { Shuffle, Square } from "lucide-react"
import { useRef, useState } from "react"

import { SOUND_EFFECTS, type SoundEffect } from "@/app/stores/sound"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  getSoundEffectFiles,
  getSoundEffectSrcs,
  LOCATION_AMBIENCE_SOUNDS,
  SEA_SONGS,
  TOWN_SONGS,
} from "@/utils/sound"

// Same volumes as the game
const MUSIC_VOLUME = 0.8
const AMBIENCE_VOLUME = 0.75

const fileName = (src: string) => src.split("/").pop()?.replace(".opus", "")

// Music and ambience have one player each, so a song, an ambience loop and any
// number of sound effects can play together
const useChannel = (volume: number, loop = false) => {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState<string>()

  const play = (src: string) => {
    audio.current?.pause()

    const next = new Audio(src)
    next.volume = volume
    next.loop = loop
    next.onended = () => setPlaying(undefined)
    next.play().catch(console.error)

    audio.current = next
    setPlaying(src)
  }

  const stop = () => {
    audio.current?.pause()
    audio.current = null
    setPlaying(undefined)
  }

  return { playing, play, stop }
}

type ChannelRowProps = {
  label: string
  files: string[]
  playing?: string
  onPlay: (src: string) => void
}

const ChannelRow = ({ label, files, playing, onPlay }: ChannelRowProps) => (
  <div className="flex flex-col gap-2">
    <h3 className="text-muted-foreground text-sm font-medium">{label}</h3>

    <div className="flex flex-wrap gap-2">
      {files.map((src, i) => (
        <Button
          key={src}
          size="sm"
          variant={playing === src ? "secondary" : "outline"}
          aria-label={`${label} ${i + 1}`}
          aria-pressed={playing === src}
          onClick={() => onPlay(src)}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  </div>
)

type SoundEffectRowProps = {
  soundEffect: SoundEffect
}

const SoundEffectRow = ({ soundEffect }: SoundEffectRowProps) => {
  const files = getSoundEffectFiles(soundEffect)

  const play = (srcs: string[]) =>
    srcs.forEach((src) => new Audio(src).play().catch(console.error))

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-muted-foreground text-sm font-medium">
        {soundEffect}
      </h3>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="secondary"
          aria-label={`Play ${soundEffect}`}
          onClick={() => play(getSoundEffectSrcs(soundEffect))}
        >
          <Shuffle />
          {files.length > 1 ? "Random" : "Play"}
        </Button>

        {files.length > 1 &&
          files.map((src, i) => (
            <Button
              key={src}
              size="sm"
              variant="outline"
              aria-label={fileName(src)}
              onClick={() => play([src])}
            >
              {i + 1}
            </Button>
          ))}
      </div>
    </div>
  )
}

type StopButtonProps = {
  playing?: string
  onStop: () => void
}

const StopButton = ({ playing, onStop }: StopButtonProps) => (
  <Button size="sm" variant="ghost" disabled={!playing} onClick={onStop}>
    <Square />
    Stop {playing && fileName(playing)}
  </Button>
)

const SoundBoard = () => {
  const music = useChannel(MUSIC_VOLUME)
  const ambience = useChannel(AMBIENCE_VOLUME, true)

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Music</CardTitle>
          <StopButton playing={music.playing} onStop={music.stop} />
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <ChannelRow
            label="Town"
            files={TOWN_SONGS}
            playing={music.playing}
            onPlay={music.play}
          />

          <ChannelRow
            label="Sea"
            files={SEA_SONGS}
            playing={music.playing}
            onPlay={music.play}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Ambience</CardTitle>
          <StopButton playing={ambience.playing} onStop={ambience.stop} />
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {Object.entries(LOCATION_AMBIENCE_SOUNDS).map(([location, files]) => (
            <ChannelRow
              key={location}
              label={location}
              files={files}
              playing={ambience.playing}
              onPlay={ambience.play}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sound effects</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {SOUND_EFFECTS.map((soundEffect) => (
            <SoundEffectRow key={soundEffect} soundEffect={soundEffect} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default SoundBoard
