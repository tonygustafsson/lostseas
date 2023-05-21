import { useRouter } from "next/router"
import QrScanner from "qr-scanner"
import { useEffect, useRef } from "react"

import CenteredLayout from "@/components/layouts/centered"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"

const Login = () => {
  const router = useRouter()
  const error = router.query.error

  const restoreUserIdVideoRef = useRef<HTMLVideoElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userId = formData.get("userId")

    window.localStorage.setItem("userId", userId?.toString() || "")
    router.push("/")
  }

  useEffect(() => {
    const startQrScanner = async () => {
      if (!restoreUserIdVideoRef.current) return

      const qrScanner = new QrScanner(
        restoreUserIdVideoRef.current,
        (result) => {
          const userId = result.data
          window.localStorage.setItem("userId", userId)
          router.push("/")
        },
        {}
      )
      await qrScanner.start()
    }

    startQrScanner()
  }, [restoreUserIdVideoRef, router])

  return (
    <CenteredLayout>
      <h1 className="font-serif text-4xl mb-8">Sign in</h1>

      <form
        method="post"
        action="/api/user/login"
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-2 max-w-md"
      >
        <TextField label="User ID" id="userId" name="userId" autoFocus />

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" className="mt-4">
          Sign in
        </Button>
      </form>

      <h2 className="font-serif text-4xl mb-8">Sign in using QR code</h2>

      <video width={300} height={300} ref={restoreUserIdVideoRef}></video>
    </CenteredLayout>
  )
}

export default Login
