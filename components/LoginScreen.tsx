"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { FiCheckCircle } from "react-icons/fi"
import { GiArchiveRegister } from "react-icons/gi"
import { PiBookOpenTextBold } from "react-icons/pi"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import LoginForm from "./LoginForm"
import RegistrationForm from "./RegistrationForm"
import Screenshots from "./Screenshots"
import SocialMedia from "./SocialMedia"
import { Button } from "./ui/button"

const LoginScreen = () => {
  const { data: player } = useGetPlayer()

  const [showRegistrationForm, setShowRegistrationForm] = useState(false)

  if (player) return null

  return (
    <div className="relative p-4 lg:p-8">
      <Image
        src="/img/startpage-bg.webp"
        fill
        alt="Lost Seas background"
        className="absolute top-0 left-0 z-10 object-cover opacity-50"
      />

      <div className="relative z-20 flex min-h-screen w-full flex-col justify-items-stretch gap-4 lg:flex-row lg:gap-8">
        <div className="order-last w-full rounded-lg bg-black/70 p-6 lg:order-first lg:p-8">
          <div className="mx-auto max-w-3xl text-lg">
            <h1 className="mb-5 text-center font-serif text-5xl lg:text-6xl">
              Lost Seas
            </h1>

            <p className="mb-4">
              Welcome to the Lost Seas. You are placed in year 1640 and will
              begin as a simple pirate. You will work your way up to get nicer
              titles, more ships, crew members and wealth.
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

            <h2 className="mt-8 mb-4 font-serif text-2xl lg:text-3xl">
              Screenshots
            </h2>

            <Screenshots />
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-lg bg-black/70 p-6 lg:w-1/3 lg:p-8">
          <h1 className="mb-5 text-center font-serif text-5xl lg:hidden">
            Lost Seas
          </h1>

          {showRegistrationForm ? (
            <>
              <h2 className="font-serif text-3xl">Register</h2>

              <p className="mb-6">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowRegistrationForm(false)}
                >
                  <AiOutlineArrowLeft />
                  Sign in
                </Button>
              </p>

              <RegistrationForm />
            </>
          ) : (
            <>
              <h2 className="font-serif text-3xl">Sign in</h2>

              <LoginForm />

              <h2 className="mt-4 text-left font-serif text-3xl">Register</h2>

              <p>
                No account yet? Go ahead and register. We don&apos;t want to
                know anything about you, not even your email address.
              </p>

              <Button
                size="lg"
                className="mt-4 w-full"
                onClick={() => setShowRegistrationForm(true)}
              >
                <GiArchiveRegister size={24} />
                Register
              </Button>

              <Button variant="secondary" className="mt-2">
                <Link
                  href="/guide"
                  className="flex w-full content-center justify-center gap-2"
                >
                  <PiBookOpenTextBold size={26} />
                  Check out the Player Guide
                </Link>
              </Button>

              <SocialMedia />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
