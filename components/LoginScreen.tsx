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
        <div className="flex flex-col gap-4 lg:max-w-sm bg-base-300 bg-opacity-70 rounded-lg p-6 lg:p-8">
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
              className="bg-gray-400 text-black"
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

        <div className="bg-base-300 bg-opacity-70 w-full rounded-lg p-6 lg:p-8">
          <h1 className="font-serif mb-5 text-5xl text-center">Lost Seas</h1>

          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque pellentesque ipsum id lorem pellentesque faucibus.
            Praesent elementum ex vel tortor viverra, vitae viverra diam
            porttitor. Pellentesque volutpat nisl diam, sit amet finibus orci
            lobortis sed. Aenean eu dapibus sapien, at sodales ante. Praesent
            ullamcorper est eu ultrices volutpat. In venenatis leo rhoncus,
            rhoncus ipsum et, tincidunt lorem. Vivamus condimentum, magna vitae
            dignissim mollis, mauris neque convallis quam, lacinia molestie leo
            nunc eu justo. Nam sed risus euismod, suscipit nisl quis, varius
            tortor. Integer finibus, justo commodo vehicula suscipit, quam mi
            pharetra odio, eget tristique odio dolor eu erat. Nulla nec faucibus
            neque.
          </p>
          <p className="mb-4">
            Aliquam odio quam, ultrices placerat nisi a, tempus consequat ipsum.
            Curabitur venenatis dapibus efficitur. Maecenas sodales porttitor
            ligula sit amet suscipit. Nam ante nulla, pharetra et dolor id,
            vestibulum euismod leo. Quisque malesuada finibus porttitor. Integer
            et ultrices nibh. Mauris pharetra posuere urna, vel pretium turpis
            mollis pulvinar.
          </p>
          <p className="mb-4">
            Donec auctor libero non metus fermentum, et accumsan neque pulvinar.
            Nulla porta elit eu rhoncus auctor. Aliquam sit amet elementum
            sapien. Mauris lacinia metus consequat aliquam pellentesque.
            Suspendisse volutpat felis eu ex blandit, in ornare dui ultricies.
            Pellentesque maximus porta diam, non condimentum ligula sollicitudin
            ut. Vestibulum massa ante, venenatis maximus urna eget, luctus
            varius urna. Cras eu orci nunc. Nullam gravida magna ac ultrices
            imperdiet. Vestibulum aliquet augue id turpis fringilla feugiat.
            Aliquam erat volutpat. Nunc auctor elementum magna luctus efficitur.
          </p>
          <p className="mb-4">
            Cras sodales laoreet varius. Nunc ultricies nibh non fringilla
            commodo. Duis pretium tempus tellus ac ullamcorper. Quisque ex
            magna, tincidunt nec nibh pharetra, commodo porttitor magna. Nunc
            accumsan, lectus ut posuere pulvinar, dolor magna bibendum tellus,
            non vehicula purus est sed est. Proin rhoncus massa et purus rhoncus
            dictum. Etiam mi libero, sollicitudin at finibus quis, tempor non
            enim. Aliquam erat volutpat. Morbi porta interdum rutrum. Donec ac
            eleifend velit. Proin rhoncus enim nec gravida facilisis. Aenean
            ultrices ullamcorper orci ut consequat. Maecenas malesuada finibus
            erat, nec ornare odio.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
