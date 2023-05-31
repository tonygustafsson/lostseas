import { useRouter } from "next/router"
import QrScanner from "qr-scanner"
import { useEffect, useRef } from "react"

import DefaultLayout from "@/components/layouts/default"
import Modal from "@/components/ui/Modal"
import TextField from "@/components/ui/TextField"
import { LOCAL_STORAGE_PLAYER_ID_KEY } from "@/constants/system"

const modalId = "qrscanner-modal"

const Login = () => {
  const router = useRouter()
  const error = router.query.error

  const restoreUserIdVideoRef = useRef<HTMLVideoElement>(null)
  const modalControlRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userId = formData.get("userId")

    window.localStorage.setItem(
      LOCAL_STORAGE_PLAYER_ID_KEY,
      userId?.toString() || ""
    )

    router.push("/")
  }

  useEffect(() => {
    const startQrScanner = async () => {
      requestAnimationFrame(async () => {
        if (!restoreUserIdVideoRef.current) return

        const qrScanner = new QrScanner(
          restoreUserIdVideoRef.current,
          (result) => {
            const userId = result.data
            window.localStorage.setItem(LOCAL_STORAGE_PLAYER_ID_KEY, userId)
            router.push("/")
          },
          {}
        )
        await qrScanner.start()
      })
    }

    modalControlRef.current?.addEventListener("change", (e) => {
      if (e.target instanceof HTMLInputElement) {
        if (e.target.checked) {
          console.log("start qr scanner")
          startQrScanner()
        } else {
          restoreUserIdVideoRef.current?.pause()
        }
      }
    })
  }, [restoreUserIdVideoRef, router, modalControlRef])

  return (
    <DefaultLayout>
      <h1 className="font-serif text-4xl mb-8">Sign in</h1>

      <form
        method="post"
        action="/api/user/login"
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-2 max-w-md"
      >
        <TextField
          label="User ID"
          id="userId"
          name="userId"
          autoFocus
          pattern="^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$"
          title="User ID must be a valid UUID"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="btn btn-primary btn-large mt-4">
          Sign in
        </button>
      </form>

      <label
        htmlFor={modalId}
        className="btn btn-secondary mt-8 w-full max-w-md"
      >
        Sign in using QR code
      </label>

      <Modal id={modalId} title="Scan QR code" ref={modalControlRef}>
        <p className="mb-4">Scan the QR code to sign in</p>

        <video width={500} height={500} ref={restoreUserIdVideoRef}></video>
      </Modal>
    </DefaultLayout>
  )
}

export default Login
