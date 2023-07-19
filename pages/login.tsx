import { zodResolver } from "@hookform/resolvers/zod"
import Head from "next/head"
import { useRouter } from "next/router"
import QrScanner from "qr-scanner"
import { useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import DefaultLayout from "@/components/layouts/default"
import { useModal } from "@/components/ui/Modal/context"
import TextField from "@/components/ui/TextField"
import { usePlayer } from "@/hooks/queries/usePlayer"
import { loginValidationSchema } from "@/utils/validation"

type ValidationSchema = z.infer<typeof loginValidationSchema>

const Login = () => {
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
        removeModal("qrscanner")
      },
      {}
    )

    qrScanner.start()

    setQrScanner(qrScanner)
  }, [login, removeModal, restoreplayerIdVideoRef, router])

  const openQrScannerModal = () => {
    setModal({
      id: "qrscanner",
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

  return (
    <>
      <Head>
        <title>Sign in - Lost Seas</title>
      </Head>

      <DefaultLayout>
        <h1 className="font-serif text-4xl mb-8">Sign in</h1>

        <form
          method="post"
          action="/api/user/login"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2 max-w-md"
        >
          <TextField
            label="User ID"
            autoFocus
            {...register("playerId")}
            error={errors.playerId?.message}
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="btn btn-primary btn-large mt-4"
            disabled={!isValid && isDirty}
          >
            Sign in
          </button>
        </form>

        <button
          onClick={openQrScannerModal}
          className="btn btn-secondary mt-8 w-full max-w-md"
        >
          Sign in using QR code
        </button>
      </DefaultLayout>
    </>
  )
}

export default Login
