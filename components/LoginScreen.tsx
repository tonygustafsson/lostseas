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

const LoginScreen = () => {
  const { data: player } = useGetPlayer()

  const [showRegistrationForm, setShowRegistrationForm] = useState(false)

  if (player) return null

  return (
    <div className="relative p-4 lg:p-8">
      <Image
        src="/img/startpage-bg.webp"
        layout="fill"
        objectFit="cover"
        alt="Lost Seas background"
        className="absolute top-0 left-0 opacity-50 z-10"
      />

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 min-h-screen justify-items-stretch w-full relative z-20">
        <div className="bg-base-300 bg-opacity-70 w-full rounded-lg p-6 lg:p-8 order-last lg:order-first">
          <div className="max-w-3xl mx-auto text-lg">
            <h1 className="font-serif mb-5 text-5xl lg:text-6xl text-center">
              Lost Seas
            </h1>

            <p className="mb-4">
              Welcome to the Lost Seas. You are placed in year 1640 and will
              begin as a simple pirate. You will work your way up to get nicer
              titles, more ships, crew members and wealth.
            </p>

            <p className="mb-4">
              There are four nations: England, France, Spain and Holland. Each
              having 4 towns. There are things to explore, and while traveling
              the open seas you will meet ships that you could attack.
            </p>

            <p className="mb-4">
              This is an old time game, so there is no fancy graphics. Just
              beautiful images, animations and descriptions created by AI. But
              do not expect any 3D graphics. It will work in your phone or
              tablet just as well as on your computer though.
            </p>

            <ul className="flex flex-col gap-4 mt-8">
              <li className="flex gap-4">
                <FiCheckCircle size={28} className="text-success mt-1" />
                <span className="flex-1">
                  It&apos;s free. Nothing to buy. No ads. Promise.
                </span>
              </li>
              <li className="flex gap-4">
                <FiCheckCircle size={28} className="text-success mt-1" />
                <span className="flex-1">
                  We don&apos;t want to know anything about you. Not your email
                  adress, your name or your credit card.
                </span>
              </li>
              <li className="flex gap-4">
                <FiCheckCircle size={28} className="text-success mt-1" />
                <span className="flex-1">
                  You can play from whatever device you like. You can register
                  on desktop, photo a QR code and sign in using that on your
                  phone later on.
                </span>
              </li>
            </ul>

            <Link href="/guide" className="btn btn-secondary mt-8">
              <PiBookOpenTextBold size={26} />
              Check out the Player Guide
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:w-1/3 bg-base-300 bg-opacity-70 rounded-lg p-6 lg:p-8">
          <h1 className="font-serif mb-5 text-5xl text-center lg:hidden">
            Lost Seas
          </h1>

          {showRegistrationForm ? (
            <>
              <h2 className="font-serif text-3xl">Register</h2>

              <p className="mb-6">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowRegistrationForm(false)}
                >
                  <AiOutlineArrowLeft />
                  Sign in
                </button>
              </p>

              <RegistrationForm />
            </>
          ) : (
            <>
              <h2 className="font-serif text-3xl">Sign in</h2>

              <LoginForm />

              <h2 className="font-serif text-3xl text-left mt-4">Register</h2>

              <p>
                No account yet? Go ahead and register. We don&apos;t want to
                know anything about you, not even your email address.
              </p>

              <button
                className="btn btn-primary w-full btn-large mt-4"
                onClick={() => setShowRegistrationForm(true)}
              >
                <GiArchiveRegister size={24} />
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
