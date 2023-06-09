import { useRouter } from "next/router"
import QrScanner from "qr-scanner"
import { useEffect, useRef, useState } from "react"

import DefaultLayout from "@/components/layouts/default"
import { useModal } from "@/components/ui/Modal/context"
import TextField from "@/components/ui/TextField"
import { LOCAL_STORAGE_PLAYER_ID_KEY } from "@/constants/system"

const Login = () => {
  const router = useRouter()
  const { setModal, removeModal } = useModal()

  const error = router.query.error

  const restoreUserIdVideoRef = useRef<HTMLVideoElement>(null)
  const [qrScanner, setQrScanner] = useState<QrScanner | null>(null)

  useEffect(() => {
    console.log({ qrScanner, restoreUserIdVideoRef })
  }, [qrScanner, restoreUserIdVideoRef])

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
    if (!restoreUserIdVideoRef.current) return

    const qrScanner = new QrScanner(
      restoreUserIdVideoRef.current,
      (result) => {
        const userId = result.data
        window.localStorage.setItem(LOCAL_STORAGE_PLAYER_ID_KEY, userId)
        router.push("/")

        qrScanner.stop()
        removeModal("qrscanner")
      },
      {}
    )

    qrScanner.start()

    setQrScanner(qrScanner)
  }, [removeModal, restoreUserIdVideoRef, router])

  const openQrScannerModal = () => {
    setModal({
      id: "qrscanner",
      title: "Scan QR code",
      onClose: () => qrScanner?.stop(),
      content: (
        <>
          <p className="mb-4">Scan the QR code to sign in</p>

          <video width={500} height={500} ref={restoreUserIdVideoRef}></video>
        </>
      ),
    })
  }

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

      <button
        onClick={openQrScannerModal}
        className="btn btn-secondary mt-8 w-full max-w-md"
      >
        Sign in using QR code
      </button>
    </DefaultLayout>
  )
}

export default Login
