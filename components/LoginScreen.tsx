import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import QrScanner from "qr-scanner"
import { useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { FiCheckCircle } from "react-icons/fi"
import { z } from "zod"

import { useGetPlayer, usePlayer } from "@/hooks/queries/usePlayer"
import { loginValidationSchema } from "@/utils/validation"

import { useModal } from "./ui/Modal/context"
import TextField from "./ui/TextField"

type ValidationSchema = z.infer<typeof loginValidationSchema>

const LoginScreen = () => {
  const { data: player } = useGetPlayer()
  const router = useRouter()
  const { setModal, removeModal } = useModal()
  const { login } = usePlayer()

  const error = router.query.error

  const restoreplayerIdVideoRef = useRef<HTMLVideoElement>(null)
  const [qrScanner, setQrScanner] = useState<QrScanner | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(loginValidationSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    login(data.playerId?.toString() || "")
  }

  useEffect(() => {
    if (!restoreplayerIdVideoRef.current) return

    const qrScanner = new QrScanner(
      restoreplayerIdVideoRef.current,
      (result) => {
        const playerId = result.data
        login(playerId)

        qrScanner.stop()
        removeModal("qrScanner")
      },
      {}
    )

    qrScanner.start()

    setQrScanner(qrScanner)
  }, [login, removeModal, restoreplayerIdVideoRef, router])

  const openQrScannerModal = () => {
    setModal({
      id: "qrScanner",
      title: "Scan QR code",
      onClose: () => qrScanner?.stop(),
      content: (
        <>
          <p className="mb-4">Scan the QR code to sign in</p>

          <video width={500} height={500} ref={restoreplayerIdVideoRef}></video>
        </>
      ),
    })
  }

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
            <h1 className="font-serif mb-5 text-5xl text-center">Lost Seas</h1>

            <p className="mb-4">
              Welcome to Lost Seas. You are placed in year 1640 and will begin
              as a simple pirate. You will work your way up to get nicer titles,
              more ships, crew members and wealth.
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
                <FiCheckCircle size={28} className="text-success" />
                It&apos;s free. Nothing to buy. No ads. Promise.
              </li>
              <li className="flex gap-4">
                <FiCheckCircle size={28} className="text-success" />
                We don&apos;t want to know anything about you. Not your email
                adress, your name or your credit card.
              </li>
              <li className="flex gap-4">
                <FiCheckCircle size={28} className="text-success" />
                You can play from whatever device you like. You can register on
                desktop, photo a QR code and sign in using that on your phone
                later on.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:max-w-2xl bg-base-300 bg-opacity-70 rounded-lg p-6 lg:p-8">
          <h1 className="font-serif mb-5 text-5xl text-center lg:hidden">
            Lost Seas
          </h1>

          <h2 className="font-serif text-3xl">Sign in</h2>

          <form
            method="post"
            action="/api/user/login"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <TextField
              label="User ID"
              autoFocus
              {...register("playerId")}
              error={errors.playerId?.message}
              className="bg-gray-300 text-black"
            />

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={!isValid && isDirty}
              >
                Sign in
              </button>

              <button
                onClick={openQrScannerModal}
                className="btn btn-secondary flex-1"
              >
                Scan QR Code
              </button>
            </div>
          </form>

          <h2 className="font-serif text-3xl text-left mt-4">Register</h2>

          <p>
            No account yet? Go ahead and register. We don&apos;t want to know
            anything about you, not even your email address.
          </p>

          <Link href="/register">
            <button className="btn btn-primary w-full btn-large mt-4">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
