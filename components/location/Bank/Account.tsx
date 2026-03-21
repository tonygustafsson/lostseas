import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import TextField from "@/components/TextField"
import { Button } from "@/components/ui/button"
import { useBank } from "@/hooks/queries/useBank"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const BankAccount = () => {
  const { data: player } = useGetPlayer()
  const { deposit, withdraw } = useBank()

  const accountValidationSchema = z.object({
    amount: z
      .number()
      .min(1)
      .max(player?.character.loan ? 0 : player?.character.gold || 0, {
        message: player?.character.loan
          ? "You cannot deposit any money until your loan has been fully repaid."
          : "You don't have enough gold to deposit.",
      }),
  })

  type AccountValidationSchema = z.infer<typeof accountValidationSchema>

  const withdrawalValidationSchema = z.object({
    amount: z
      .number()
      .min(1)
      .max(player?.character.account || 0),
  })

  type WithdrawalValidationSchema = z.infer<typeof withdrawalValidationSchema>

  const {
    register: accountRegister,
    handleSubmit: accountHandleSubmit,
    reset: accountReset,
    formState: { errors: accountErrors, isValid: accountIsValid },
  } = useForm<AccountValidationSchema>({
    resolver: zodResolver(accountValidationSchema),
    mode: "onChange",
  })

  const {
    register: withdrawalRegister,
    handleSubmit: withdrawalHandleSubmit,
    reset: withdrawalReset,
    formState: { errors: withdrawalErrors, isValid: withdrawalIsValid },
  } = useForm<WithdrawalValidationSchema>({
    resolver: zodResolver(withdrawalValidationSchema),
    mode: "onChange",
  })

  const handleDeposit: SubmitHandler<AccountValidationSchema> = (data) => {
    deposit(data)
    accountReset()
  }

  const handleWithdrawal: SubmitHandler<WithdrawalValidationSchema> = (
    data
  ) => {
    withdraw(data)
    withdrawalReset()
  }

  return (
    <div className="flex w-full flex-col lg:flex-row lg:gap-8">
      <form
        className="mt-4 w-full"
        onSubmit={accountHandleSubmit(handleDeposit)}
      >
        <h2 className="mt-8 mb-4 font-serif text-2xl font-semibold">
          Make deposit
        </h2>

        <div className="min-h-16">
          <p className="text-sm">
            When gold are stored at the bank you will not risk loosing it at
            sea.
          </p>

          {player?.character.loan && (
            <strong className="mt-4 block text-sm">
              You cannot deposit any money until your loan has been fully
              repaid.
            </strong>
          )}
        </div>

        <TextField
          label="Amount"
          type="number"
          {...accountRegister("amount", { valueAsNumber: true })}
          error={accountErrors.amount?.message}
        />

        <Button type="submit" className="mt-4" disabled={!accountIsValid}>
          Deposit
        </Button>
      </form>

      <form
        className="mt-4 flex w-full flex-col items-start justify-between"
        onSubmit={withdrawalHandleSubmit(handleWithdrawal)}
      >
        <h2 className="mt-8 mb-4 font-serif text-2xl font-semibold">
          Make withdrawal
        </h2>

        <p className="min-h-16 text-sm">
          Take out your gold in order to spend it.
        </p>

        <TextField
          label="Amount"
          type="number"
          {...withdrawalRegister("amount", { valueAsNumber: true })}
          error={withdrawalErrors.amount?.message}
        />

        <Button type="submit" className="mt-4" disabled={!withdrawalIsValid}>
          Withdrawal
        </Button>
      </form>
    </div>
  )
}

export default BankAccount
