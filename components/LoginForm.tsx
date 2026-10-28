"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { KeyRound } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { FiLogIn } from "react-icons/fi"
import { z } from "zod"

import { useGetPlayer, usePlayer } from "@/hooks/queries/usePlayer"
import { loginValidationSchema } from "@/utils/validation"

import QrScanner from "./QrScanner"
import TextField from "./TextField"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

type ValidationSchema = z.infer<typeof loginValidationSchema>

const LoginForm = () => {
  const { data: player } = useGetPlayer()
  const searchParams = useSearchParams()
  const { login, loginWithPasskey, isLoggingInWithPasskey } = usePlayer()

  const [apiError, setApiError] = useState<string>()

  const error = searchParams.get("error")

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(loginValidationSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const response = await login(data.playerId?.toString() || "")

    if (response?.status === 200) {
      window.location.reload()
    } else {
      setApiError("Could not sign in. Incorrect user ID?")
    }
  }

  const onPasskeyLogin = async () => {
    setApiError(undefined)

    try {
      const response = await loginWithPasskey()

      if (response?.status === 200) {
        window.location.reload()
      } else {
        setApiError("Could not sign in with that passkey.")
      }
    } catch {
      setApiError("Passkey sign-in was cancelled or is not supported here.")
    }
  }

  if (player) return null

  return (
    <form
      method="post"
      action="/api/user/login"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
    >
      <Button
        type="button"
        onClick={onPasskeyLogin}
        disabled={isLoggingInWithPasskey}
      >
        <KeyRound />
        Sign in with passkey
      </Button>

      <div className="text-muted-foreground my-4 flex items-center gap-4 text-sm">
        <Separator className="flex-1" />
        or use your user ID
        <Separator className="flex-1" />
      </div>

      <TextField
        label="User ID"
        {...register("playerId")}
        error={errors.playerId?.message}
      />

      {error && <p className="text-error">{error}</p>}
      {apiError && <p className="text-error">{apiError}</p>}

      <div className="mt-3 flex flex-col gap-2 md:flex-row">
        <Button
          type="submit"
          className="md:flex-1"
          disabled={!isValid && isDirty}
        >
          <FiLogIn size={22} />
          Sign in
        </Button>

        <QrScanner />
      </div>
    </form>
  )
}

export default LoginForm
