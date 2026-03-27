"use client"

import { AnimatePresence, m as motion, PanInfo } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import SocialMedia from "../SocialMedia"
import SoundControls from "../Sound/Controls"
import { Button } from "../ui/button"
import CharacterCard from "./CharacterCard"
import MainMenu from "./MainMenu"
import MobileBottomNav from "./MobileBottomNav"
import QuickButtonMenu from "./QuickButtonMenu"
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
              className="fixed top-0 left-0 z-40 h-full w-72 overflow-y-auto bg-gray-900 px-4 py-8 shadow-2xl"
            >
              <Button
                className="text-info absolute top-2 right-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <AiOutlineCloseCircle className="h-6 w-6" />
              </Button>

              <h1 className="flex items-baseline gap-2 bg-gray-900 p-2 text-center font-serif text-2xl">
                <Image
                  src="/img/logo.svg"
                  alt="Lost Seas logotype"
                  width={30}
                  height={24}
                  style={{ height: 24 }}
                />
                Lost Seas
              </h1>

              <MainMenu />

              <div className="mt-4 flex flex-col gap-6">
                <QuickButtonMenu />
                <SoundControls />
                <CharacterCard player={player} />
                <WeatherCard day={player.character.day} />
                <SocialMedia />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5, transition: { duration: 0.15 } }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 z-30 h-screen w-screen bg-black"
              onClick={() => setMobileMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileMenu
