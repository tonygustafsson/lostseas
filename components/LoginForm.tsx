import { zodResolver } from "@hookform/resolvers/zod"
import jsQR from "jsqr"
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { AiOutlineQrcode } from "react-icons/ai"
import { FiLogIn } from "react-icons/fi"
import { z } from "zod"

import { useGetPlayer, usePlayer } from "@/hooks/queries/usePlayer"
import { loginValidationSchema } from "@/utils/validation"

import { useModal } from "./ui/Modal/context"
import TextField from "./ui/TextField"

type ValidationSchema = z.infer<typeof loginValidationSchema>

const LoginForm = () => {
  const { data: player } = useGetPlayer()
  const router = useRouter()
  const { setModal } = useModal()
  const { login } = usePlayer()

  const error = router.query.error

  const restoreplayerIdVideoRef = useRef<HTMLVideoElement>(null)
  const canvasElement = useRef<HTMLCanvasElement>(null)
  const canvas = canvasElement.current?.getContext("2d")

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

  const tick = useCallback(() => {
    // Draw the video frame to the canvas
    if (!restoreplayerIdVideoRef.current || !canvasElement.current) {
      return
    }

    canvas?.drawImage(
      restoreplayerIdVideoRef.current,
      0,
      0,
      canvasElement.current.width,
      canvasElement.current.height
    )
    const imageData = canvas?.getImageData(
      0,
      0,
      canvasElement.current.width,
      canvasElement.current.height
    )

    if (!imageData) return

    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    })

    if (code) {
      login(code.data)
    }

    requestAnimationFrame(tick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasElement, canvas])

  useEffect(() => {
    window.navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (!restoreplayerIdVideoRef.current) return

        restoreplayerIdVideoRef.current.srcObject = stream
        restoreplayerIdVideoRef.current.setAttribute("playsinline", "true") // required to tell iOS safari we don't want fullscreen
        restoreplayerIdVideoRef.current.play()
        requestAnimationFrame(tick)
      })
  }, [restoreplayerIdVideoRef, tick])

  const openQrScannerModal = () => {
    setModal({
      id: "qrScanner",
      title: "Scan QR code",
      //onClose: () => qrScanner?.stop(),
      content: (
        <>
          <p className="mb-4">Scan the QR code to sign in</p>

          <video width={500} height={500} ref={restoreplayerIdVideoRef}></video>
          <canvas className="hidden" ref={canvasElement}></canvas>
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
          <FiLogIn size={22} />
          Sign in
        </button>

        <button
          onClick={openQrScannerModal}
          className="btn btn-secondary flex-1"
        >
          <AiOutlineQrcode size={24} />
          Scan QR Code
        </button>
      </div>
    </form>
  )
}

export default LoginForm
