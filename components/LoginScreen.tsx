"use client"

import Image from "next/image"
import Link from "next/link"
import { FiCheckCircle } from "react-icons/fi"
import { PiBookOpenTextBold } from "react-icons/pi"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import LoginForm from "./LoginForm"
import RegistrationForm from "./RegistrationForm"
import Screenshots from "./Screenshots"
import SocialMedia from "./SocialMedia"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

const LoginScreen = () => {
  const { data: player } = useGetPlayer()

  if (player) return null

  return (
    <div className="relative p-4 lg:p-8">
      <Image
        src="/img/startpage-bg.webp"
        fill
        alt="Lost Seas background"
        className="absolute top-0 left-0 z-10 object-cover"
      />

      <div className="relative z-20 flex min-h-screen w-full flex-col justify-items-stretch gap-4 lg:flex-row">
        <div className="flex flex-col gap-4 rounded-lg bg-black/80 p-6 lg:w-1/2 lg:p-8">
          <h1 className="mb-5 text-center font-serif text-5xl lg:text-5xl">
            Lost Seas
          </h1>

          <h2 className="font-serif text-2xl">Register</h2>

          <p>
            Come on, start playing already! It&apos;s free and we don&apos;t
            want to know anything about you, not even your email address.
          </p>

          <RegistrationForm />

          <Separator className="mt-4 mb-2 lg:mt-8 lg:mb-4" />

          <h2 className="font-serif text-2xl">Sign in</h2>

          <LoginForm />
        </div>

        <div className="order-last w-full rounded-lg bg-black/80 p-6 lg:order-last lg:w-1/2 lg:p-8">
          <div className="mx-auto max-w-3xl text-lg">
            <h2 className="mb-5 font-serif text-4xl lg:text-3xl">
              Welcome to the open seas
            </h2>

            <p className="mb-4">
              You are placed in year 1640 and will begin as a simple pirate. You
              will work your way up to get nicer titles, more ships, crew
              members and wealth.
            </p>

            <p className="mb-4">
              There are four nations: England, France, Spain and Holland. Each
              having 4 towns. There are things to explore, treasures to be found
              and ships to attack.
            </p>

            <p className="mb-4">
              Each town has it&apos;s own atmosphere and imagery. There are
              music that adapts to what is happening, and sound effects. The
              images are created by AI, and the music royalty free.
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              <li className="flex gap-4">
                <FiCheckCircle size={28} className="mt-1 text-green-600" />
                <span className="flex-1">
                  It&apos;s free. Nothing to buy. No ads. Promise.
                </span>
              </li>
              <li className="flex gap-4">
                <FiCheckCircle size={28} className="mt-1 text-green-600" />
                <span className="flex-1">
                  We don&apos;t want to know anything about you. Not your email
                  adress, your name or your credit card.
                </span>
              </li>
              <li className="flex gap-4">
                <FiCheckCircle size={28} className="mt-1 text-green-600" />
                <span className="flex-1">
                  You can play from whatever device you like. You can register
                  on desktop, photo a QR code and sign in using that on your
                  phone later on.
                </span>
              </li>
            </ul>

            <Button variant="secondary" className="mt-4 self-start">
              <Link
                href="/guide"
                className="flex content-center justify-center gap-2"
              >
                <PiBookOpenTextBold size={26} />
                Check out the Player Guide
              </Link>
            </Button>

            <h2 className="mt-8 mb-4 font-serif text-2xl lg:text-3xl">
              Screenshots
            </h2>

            <Screenshots />

            <SocialMedia />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
