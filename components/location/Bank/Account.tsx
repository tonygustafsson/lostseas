import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import TextField from "@/components/ui/TextField"
import { useBank } from "@/hooks/queries/useBank"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const BankAccount = () => {
  const { data: player } = useGetPlayer()
  const { deposit, withdraw } = useBank()

  const accountValidationSchema = z.object({
    amount: z
      .number()
      .min(1)
      .max(player?.character.loan ? 0 : player?.character.gold || 0),
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
    <div className="w-full flex flex-col lg:flex-row lg:gap-8">
      <form
        className="w-full mt-4 min-h-[350px]"
        onSubmit={accountHandleSubmit(handleDeposit)}
      >
        <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">
          Make deposit
        </h2>

        <p className="text-sm">
          When gold are stored at the bank you will not risk loosing it at sea.
        </p>

        {player?.character.loan && (
          <strong className="mt-4 block text-sm">
            You cannot deposit any money until your loan has been fully repaid.
          </strong>
        )}

        <TextField
          label="Amount"
          type="number"
          {...accountRegister("amount", { valueAsNumber: true })}
          error={accountErrors.amount?.message}
        />

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={!accountIsValid}
        >
          Deposit
        </button>
      </form>

      <form
        className="flex flex-col justify-between items-start w-full mt-4 min-h-[350px]"
        onSubmit={withdrawalHandleSubmit(handleWithdrawal)}
      >
        <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">
          Make withdrawal
        </h2>

        <p className="text-sm">Take out your gold in order to spend it.</p>

        <TextField
          label="Amount"
          type="number"
          {...withdrawalRegister("amount", { valueAsNumber: true })}
          error={withdrawalErrors.amount?.message}
        />

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={!withdrawalIsValid}
        >
          Withdrawal
        </button>
      </form>
    </div>
  )
}

export default BankAccount
