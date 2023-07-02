type Props = {
  percentage: number
  strokeWidth?: number
  className?: string
}

const WIDTH = 80
const HEIGHT = 80
const RADIAL = 30
const CX = WIDTH / 2
const CY = HEIGHT / 2
const CIRCUMFERENCE = RADIAL * 2 * Math.PI

const getStrokeColor = (percentage: number) => {
  if (percentage > 65) {
    return "text-success"
  }

  if (percentage > 40) {
    return "text-warning"
  }

  return "text-error"
}

const RadialProgressBar = ({
  percentage,
  strokeWidth = 12,
  className,
}: Props) => {
  const strokeDashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE
  const strokeColor = getStrokeColor(percentage)

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

      <circle
        strokeWidth={strokeWidth}
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={RADIAL}
        cx={CX}
        cy={CY}
        className={strokeColor}
        style={{ rotate: "-85deg", transformOrigin: "50% 50%" }}
      />
    </svg>
  )
}

export default RadialProgressBar
