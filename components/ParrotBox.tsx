import { m as motion } from "framer-motion"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"

type Props = {
  title: string
  children: React.ReactNode
}

const ParrotBox = ({ title, children }: Props) => (
  <>
    <div className="flex items-start gap-2">
      <Image
        src="/img/parrot.svg"
        alt="Parrot"
        width={100}
        height={100}
        draggable={false}
        className="mx-4 mt-1 shrink-0 select-none"
      />

      <motion.div
        initial={{
          translateX: -50,
          opacity: 0,
          scale: 0,
        }}
        animate={{
          translateX: [-50, 0],
          opacity: [0, 1],
          scale: [0, 1],
        }}
        className="max-w-full"
      >
        <Card className="w-fit max-w-full gap-0 py-0 shadow-sm">
          <CardContent className="font-heading px-4 py-3 text-sm font-medium">
            {title}
          </CardContent>
        </Card>
      </motion.div>
    </div>

    {children}
  </>
)

export default ParrotBox
