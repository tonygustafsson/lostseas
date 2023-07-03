import { animate, m as motion } from "framer-motion"
import { useEffect, useRef } from "react"

type Props = {
  percentage: number
  strokeWidth?: number
  autoStrokeColor?: boolean
  showLabel?: boolean
  startPercentage?: number
  className?: string
}

const WIDTH = 80
const HEIGHT = 80
const RADIAL = 30
const CX = WIDTH / 2
const CY = HEIGHT / 2
const CIRCUMFERENCE = RADIAL * 2 * Math.PI
const CIRCLE_ANIMATION_TIME = 1
const TEXT_ANIMATION_TIME = 0.5

const getStrokeColor = (percentage: number) => {
  if (percentage > 65) {
    return "text-success"
  }

  if (percentage > 40) {
    return "text-warning"
  }

  return "text-error"
}

const getFontPosition = (percentage: number) => {
  if (percentage.toString().length === 1) {
    return { x: CX - 8, y: CY + 5 }
  }

  if (percentage.toString().length === 3) {
    return { x: CX - 19, y: CY + 5 }
  }

  return { x: CX - 14, y: CY + 5 }
}

const RadialProgressBar = ({
  percentage,
  strokeWidth = 8,
  showLabel = true,
  autoStrokeColor = true,
  startPercentage,
  className,
}: Props) => {
  const circleRef = useRef<SVGCircleElement>(null)
  const textRef = useRef<SVGTextElement>(null)

  console.log({ percentage, startPercentage })

  const strokeStartDashoffset = startPercentage
    ? CIRCUMFERENCE - (startPercentage / 100) * CIRCUMFERENCE
    : CIRCUMFERENCE
  const strokeEndDashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE
  const strokeColor = autoStrokeColor
    ? getStrokeColor(percentage)
    : "currentColor"

  useEffect(() => {
    const circle = circleRef.current

    if (!circle) return

    const controls = animate(strokeStartDashoffset, strokeEndDashoffset, {
      duration: CIRCLE_ANIMATION_TIME,
      onUpdate(value) {
        circle.setAttribute("stroke-dashoffset", value.toString())
      },
    })

    return () => controls.stop()
  }, [percentage, strokeEndDashoffset, circleRef, strokeStartDashoffset])

  useEffect(() => {
    const text = textRef.current
    if (!text) return

    const controls = animate(0, percentage, {
      duration: TEXT_ANIMATION_TIME,
      onUpdate(value) {
        const fontPosition = getFontPosition(value)

        text.textContent = `${Math.round(value).toString()}%`
        text.setAttribute("x", fontPosition.x.toString())
        text.setAttribute("y", fontPosition.y.toString())
      },
    })

    return () => controls.stop()
  }, [percentage, strokeEndDashoffset, circleRef])

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className={className}>
      <circle
        className="text-gray-400"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        fill="transparent"
        r={RADIAL}
        cx={CX}
        cy={CY}
      />

      <motion.circle
        strokeWidth={strokeWidth}
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={strokeStartDashoffset}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={RADIAL}
        cx={CX}
        cy={CY}
        className={strokeColor}
        style={{ rotate: "-85deg", transformOrigin: "50% 50%" }}
        ref={circleRef}
      />

      {showLabel && <motion.text ref={textRef} fontSize={15} fill="white" />}
    </svg>
  )
}

export default RadialProgressBar
