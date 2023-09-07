import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { SubmitHandler, useForm } from "react-hook-form"
import { FiLogIn } from "react-icons/fi"
import { z } from "zod"

import { useGetPlayer, usePlayer } from "@/hooks/queries/usePlayer"
import { loginValidationSchema } from "@/utils/validation"

import QrScanner from "./QrScanner"
import TextField from "./ui/TextField"

type ValidationSchema = z.infer<typeof loginValidationSchema>

const LoginForm = () => {
  const { data: player } = useGetPlayer()
  const router = useRouter()
  const { login } = usePlayer()

  const error = router.query.error

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

        <QrScanner />
      </div>
    </form>
  )
}

export default LoginForm
