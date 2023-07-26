import { m as motion } from "framer-motion"
import Image from "next/image"

type Props = {
  title: string
  children: React.ReactNode
}

const ParrotBox = ({ title, children }: Props) => (
  <>
    <div className="flex">
      <Image
        src="/img/parrot.webp"
        alt="Parrot"
        width={100}
        height={57}
        draggable={false}
        className="mx-6 select-none"
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
        className="chat chat-start"
      >
        <div className="chat-bubble bg-slate-600 min-w-fit">{title}</div>
      </motion.div>
    </div>

    <div className="flex flex-col bg-gray-900 rounded-lg p-6">{children}</div>
  </>
)

export default ParrotBox
