import { m as motion, useAnimationControls } from "framer-motion"
import { cloneElement, useEffect, useRef } from "react"

type Props = {
  title: string
  value: string | number
  Icon: React.ReactElement
}

export const StatCard = ({ title, value, Icon }: Props) => {
  const controls = useAnimationControls()
  const previousValue = useRef(value)

  useEffect(() => {
    if (previousValue.current === value) return

    previousValue.current = value
    controls.start({
      scale: [1, 1.35, 1],
      color: ["#fff", "var(--color-accent)", "#fff"],
      transition: { duration: 0.5 },
    })
  }, [controls, value])

  const CustomIcon = cloneElement(Icon, {
    className: "text-accent size-5",
  } as any)

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-muted-foreground text-xs">{title}</p>
        <motion.p
          initial={false}
          animate={controls}
          className="stat-value w-fit"
        >
          {value}
        </motion.p>
      </div>

      {CustomIcon}
    </div>
  )
}
