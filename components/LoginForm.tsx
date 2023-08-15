import { zodResolver } from "@hookform/resolvers/zod"
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

const LoginForm = () => {
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
  )
}

export default LoginForm
