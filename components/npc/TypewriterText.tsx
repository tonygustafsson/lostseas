import { useReducedMotionConfig } from "framer-motion"
import { useEffect, useEffectEvent, useState } from "react"

type Props = {
  text: string
  charactersPerSecond?: number
  onDone?: () => void
}

/** Reveals the text a character at a time. Clicking shows it all at once. */
const TypewriterText = ({ text, charactersPerSecond = 100, onDone }: Props) => {
  // Follows the device setting unless a MotionConfig overrides it
  const reduceMotion = useReducedMotionConfig()

  // Remembers which text the count belongs to, so a new text starts from zero
  const [progress, setProgress] = useState({ text, count: 0 })

  const count = progress.text === text ? progress.count : 0
  const isRevealed = count >= text.length
  const showAll = reduceMotion || isRevealed

  const notifyDone = useEffectEvent(() => {
    onDone?.()
  })

  useEffect(() => {
    if (reduceMotion || text.length === 0) {
      notifyDone()
      return
    }

    if (isRevealed) {
      return
    }

    let revealed = 0

    const interval = setInterval(() => {
      revealed += 1
      setProgress({ text, count: revealed })

      if (revealed >= text.length) {
        clearInterval(interval)
        notifyDone()
      }
    }, 1000 / charactersPerSecond)

    return () => clearInterval(interval)
  }, [text, charactersPerSecond, reduceMotion, isRevealed])

  const handleSkip = () => {
    if (showAll) {
      return
    }

    setProgress({ text, count: text.length })
    onDone?.()
  }

  return (
    <span onClick={handleSkip} className={showAll ? "" : "cursor-pointer"}>
      {/* Screen readers get the whole line at once instead of the animation */}
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {showAll ? text : text.slice(0, count)}

        {/* Keeps the box at its final height while the text types out */}
        {!showAll && <span className="invisible">{text.slice(count)}</span>}
      </span>
    </span>
  )
}

export default TypewriterText
