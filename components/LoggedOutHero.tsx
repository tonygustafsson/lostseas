import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import QrScanner from "qr-scanner"
import { useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { useGetPlayer, usePlayer } from "@/hooks/queries/usePlayer"
import { loginValidationSchema } from "@/utils/validation"

import { useModal } from "./ui/Modal/context"
import TextField from "./ui/TextField"

type ValidationSchema = z.infer<typeof loginValidationSchema>

const LoggedOutHero = () => {
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
    <div className="hero justify-items-stretch rounded-lg relative">
      <Image
        src="/img/place/tavern.webp"
        layout="fill"
        objectFit="cover"
        alt="Lost Seas background"
        className="absolute top-0 left-0 opacity-50 z-10"
      />

      <div className="hero-overlay bg-opacity-50"></div>

      <div className="hero-content justify-self-center md:w-[600px] max-w-full text-neutral-content py-24 z-20">
        <div className="w-full bg-base-300 bg-opacity-60 p-8 rounded-lg">
          <h1 className="font-serif mb-5 text-5xl text-center">Lost Seas</h1>

          <div className="flex flex-col gap-4 mt-4">
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
              />

              {error && <p className="text-red-500">{error}</p>}

              <div className="flex flex-col gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={!isValid && isDirty}
                >
                  Sign in
                </button>

                <button
                  onClick={openQrScannerModal}
                  className="btn btn-secondary w-full"
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
    </div>
  )
}

export default LoggedOutHero
