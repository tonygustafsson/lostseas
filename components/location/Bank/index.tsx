import { zodResolver } from "@hookform/resolvers/zod"
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

  const accountValidationSchema = z.object({
    userId: validationRules.userId,
    amount: z
      .number()
      .min(1)
      .max(player?.character.loan ? 0 : player?.character.doubloons || 0),
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

  const loanValidationSchema = z.object({
    userId: validationRules.userId,
    amount: z
      .number()
      .min(1)
      .max(LOAN_LIMIT - (player?.character.loan || 0)),
  })

  type LoanValidationSchema = z.infer<typeof loanValidationSchema>

  const repayValidationSchema = z.object({
    userId: validationRules.userId,
    amount: z
      .number()
      .min(1)
      .max(player?.character.loan || player?.character.doubloons || 0),
  })

  type RepayValidationSchema = z.infer<typeof repayValidationSchema>

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

  const {
    register: loanRegister,
    handleSubmit: loanHandleSubmit,
    reset: loanReset,
    formState: { errors: loanErrors, isValid: loanIsValid },
  } = useForm<LoanValidationSchema>({
    resolver: zodResolver(loanValidationSchema),
    mode: "onChange",
  })

  const {
    register: repayRegister,
    handleSubmit: repayHandleSubmit,
    reset: repayReset,
    formState: { errors: repayErrors, isValid: repayIsValid },
  } = useForm<RepayValidationSchema>({
    resolver: zodResolver(repayValidationSchema),
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

  const handleLoan: SubmitHandler<WithdrawalValidationSchema> = (data) => {
    loan(data)
    loanReset()
  }

  const handleRepay: SubmitHandler<RepayValidationSchema> = (data) => {
    repay(data)
    repayReset()
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

          {player?.character.loan && (
            <strong className="mt-4 block">
              You cannot deposit any money until your loan has been fully
              repaid.
            </strong>
          )}

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
        <form className="w-full mt-4" onSubmit={loanHandleSubmit(handleLoan)}>
          <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">
            Take a loan
          </h2>

          <p>
            You can loan up to {LOAN_LIMIT} doubloons. If you have a loan you
            cannot add funds to your account though until it has been repaid.
          </p>

          <TextField
            type="hidden"
            {...loanRegister("userId", { value: player?.id || "" })}
          />

          <TextField
            label="Amount"
            type="number"
            {...loanRegister("amount", { valueAsNumber: true })}
            error={loanErrors.amount?.message}
          />

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={!loanIsValid}
          >
            Take loan
          </button>
        </form>

        <form className="w-full mt-4" onSubmit={repayHandleSubmit(handleRepay)}>
          <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">
            Repay loan
          </h2>

          <p>Repay your loan to be able to take more loans down the road.</p>

          <TextField
            type="hidden"
            {...repayRegister("userId", { value: player?.id || "" })}
          />

          <TextField
            label="Amount"
            type="number"
            {...repayRegister("amount", { valueAsNumber: true })}
            error={repayErrors.amount?.message}
          />

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={!repayIsValid}
          >
            Repay loan
          </button>
        </form>
      </div>
    </>
  )
}

export default Bank
