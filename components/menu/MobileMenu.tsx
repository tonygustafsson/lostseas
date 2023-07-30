import { AnimatePresence, m as motion, PanInfo } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import SoundControls from "../Sound/Controls"
import CharacterCard from "./CharacterCard"
import MainMenu from "./MainMenu"
import MobileBottomNav from "./MobileBottomNav"
import WeatherCard from "./WeatherCard"

type Props = {
  className?: string
}

const MobileMenu = ({ className }: Props) => {
  const { data: player } = useGetPlayer()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleDrag = (info: PanInfo) => {
    if (info.offset.x < -50) {
      setMobileMenuOpen(false)
    }
  }

  if (!player) return null

  return (
    <div className={className}>
      <h1 className="flex items-baseline font-serif text-2xl text-center p-2 justify-center gap-2 bg-gray-900">
        <Image
          src="/img/logo.svg"
          alt="Lost Seas logotype"
          width={30}
          height={24}
          style={{ height: 24 }}
        />
        Lost Seas
      </h1>

      <MobileBottomNav setMobileMenuOpen={setMobileMenuOpen} />

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ translateX: "-100%", opacity: 0 }}
              animate={{
                translateX: 0,
                opacity: 1,
                transition: {
                  translateX: { type: "spring", duration: 0.25 },
                  opacity: { duration: 0.2 },
                },
              }}
              exit={{ translateX: "-100%", opacity: 0 }}
              drag="x"
              dragElastic={false}
              dragConstraints={{ left: -50, right: 0 }}
              whileDrag={{ opacity: 0.85, transition: { duration: 0.1 } }}
              onDrag={(_, info) => handleDrag(info)}
              className="fixed top-0 left-0 shadow-2xl overflow-y-auto z-30 w-72 h-full py-8 px-4 bg-gray-900"
            >
              <button
                className="absolute right-2 top-2 text-info"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <AiOutlineCloseCircle className="h-6 w-6" />
              </button>

              <MainMenu />
              <SoundControls />
              <CharacterCard player={player} />
              <WeatherCard day={player.character.day} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5, transition: { duration: 0.15 } }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 w-screen h-screen z-10 bg-black"
              onClick={() => setMobileMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileMenu
