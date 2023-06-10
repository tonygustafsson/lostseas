import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { GiCoins } from "react-icons/gi"
import { z } from "zod"

import TextField from "@/components/ui/TextField"
import { LOAN_LIMIT } from "@/constants/bank"
import { useBank } from "@/hooks/queries/useBank"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import validationRules from "@/utils/validation"

const Bank = () => {
  const { data: player } = useGetPlayer()
  const { deposit, withdraw, loan, repay } = useBank()

  const maxLoan = LOAN_LIMIT - (player?.character.loan || 0)
  const maxRepay = player?.character.loan || 0

  const [loanInput, setLoanInput] = useState("")
  const [repayInput, setRepayInput] = useState("")

  const accountValidationSchema = z.object({
    userId: validationRules.userId,
    amount: z
      .number()
      .min(1)
      .max(player?.character.doubloons || 0),
  })

  type AccountValidationSchema = z.infer<typeof accountValidationSchema>

  const withdrawalValidationSchema = z.object({
    userId: validationRules.userId,
    amount: z
      .number()
      .min(1)
      .max(player?.character.account || 0),
  })

  type WithdrawalValidationSchema = z.infer<typeof withdrawalValidationSchema>

  const {
    register: accountRegister,
    handleSubmit: accountHandleSubmit,
    formState: { errors: accountErrors, isValid: accountIsValid },
  } = useForm<AccountValidationSchema>({
    resolver: zodResolver(accountValidationSchema),
    mode: "onChange",
  })

  const {
    register: withdrawalRegister,
    handleSubmit: withdrawalHandleSubmit,
    formState: { errors: withdrawalErrors, isValid: withdrawalIsValid },
  } = useForm<WithdrawalValidationSchema>({
    resolver: zodResolver(withdrawalValidationSchema),
    mode: "onChange",
  })

  const getFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const userId = formData.get("userId") as string
    const amount = parseInt(formData.get("amount") as string)

    return { userId, amount }
  }

  const handleDeposit: SubmitHandler<AccountValidationSchema> = (data) =>
    deposit(data)

  const handleWithdrawal: SubmitHandler<WithdrawalValidationSchema> = (data) =>
    withdraw(data)

  const handleLoan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { userId, amount } = getFormData(e)
    loan({ userId, amount })

    setLoanInput("")
  }

  const handleRepay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { userId, amount } = getFormData(e)
    repay({ userId, amount })

    setRepayInput("")
  }

  return (
    <>
      <div className="flex flex-wrap gap-6 w-full justify-center">
        <div className="stats bg-transparent gap-2 mt-4">
          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <GiCoins className="h-8 w-8" />
            </div>
            <div className="stat-title">Doubloons</div>
            <div className="stat-value text-2xl">
              {player?.character.doubloons}
            </div>
          </div>

          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <GiCoins className="h-8 w-8" />
            </div>
            <div className="stat-title">Bank account</div>
            <div className="stat-value text-2xl">
              {player?.character.account || 0}
            </div>
          </div>

          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <GiCoins className="h-8 w-8" />
            </div>
            <div className="stat-title">Bank loan</div>
            <div className="stat-value text-2xl">
              {player?.character.loan || 0}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-8">
        <form
          className="w-full mt-4"
          onSubmit={accountHandleSubmit(handleDeposit)}
        >
          <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">
            Make deposit
          </h2>

          <p>
            When doubloons are stored at the bank you will not risk loosing it
            at sea.
          </p>

          <TextField
            type="hidden"
            {...accountRegister("userId", { value: player?.id || "" })}
          />

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
          className="w-full mt-4"
          onSubmit={withdrawalHandleSubmit(handleWithdrawal)}
        >
          <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">
            Make withdrawal
          </h2>

          <p>Take out your doubloons in order to spend it.</p>

          <TextField
            type="hidden"
            {...withdrawalRegister("userId", { value: player?.id || "" })}
          />

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

      <div className="w-full flex gap-8">
        <form className="w-full mt-4" onSubmit={handleLoan}>
          <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">
            Take a loan
          </h2>

          <p>
            You can loan up to {LOAN_LIMIT} doubloons. It will come with an
            interest of 10% though.
          </p>

          <TextField
            type="hidden"
            name="userId"
            defaultValue={player?.id || ""}
          />

          <TextField
            name="amount"
            label="Amount"
            type="number"
            max={maxLoan}
            value={loanInput}
            onChange={(value) => setLoanInput(value)}
            min={1}
            required
          />

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={
              parseInt(loanInput) + (player?.character.loan || 0) > LOAN_LIMIT
            }
          >
            Take loan
          </button>
        </form>

        <form className="w-full mt-4" onSubmit={handleRepay}>
          <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">
            Repay loan
          </h2>

          <p>Repay your loan to be able to take more loans down the road.</p>

          <TextField
            type="hidden"
            name="userId"
            defaultValue={player?.id || ""}
          />

          <TextField
            name="amount"
            label="Amount"
            type="number"
            max={maxRepay}
            value={repayInput}
            onChange={(value) => setRepayInput(value)}
            min={1}
            required
          />

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={
              parseInt(repayInput) > (player?.character.loan || 0) ||
              parseInt(repayInput) > (player?.character.doubloons || 0)
            }
          >
            Repay loan
          </button>
        </form>
      </div>
    </>
  )
}

export default Bank
