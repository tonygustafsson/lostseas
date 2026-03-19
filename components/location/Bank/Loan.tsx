import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import TextField from "@/components/ui/TextField"
import { LOAN_LIMIT } from "@/constants/bank"
import { useBank } from "@/hooks/queries/useBank"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const BankLoan = () => {
  const { data: player } = useGetPlayer()
  const { loan, repay } = useBank()

  const loanValidationSchema = z.object({
    amount: z
      .number()
      .min(1)
      .max(LOAN_LIMIT - (player?.character.loan || 0)),
  })

  type LoanValidationSchema = z.infer<typeof loanValidationSchema>

  const repayValidationSchema = z.object({
    amount: z
      .number()
      .min(1)
      .max(player?.character.loan || player?.character.gold || 0),
  })

  type RepayValidationSchema = z.infer<typeof repayValidationSchema>

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

  const handleLoan: SubmitHandler<LoanValidationSchema> = (data) => {
    loan(data)
    loanReset()
  }

  const handleRepay: SubmitHandler<RepayValidationSchema> = (data) => {
    repay(data)
    repayReset()
  }

  return (
    <div className="mt-8 flex w-full flex-wrap justify-center gap-6">
      <div className="flex w-full flex-col lg:flex-row lg:gap-8">
        <form
          className="flex w-full flex-col items-start justify-between"
          onSubmit={loanHandleSubmit(handleLoan)}
        >
          <h2 className="mb-4 font-serif text-2xl font-semibold">
            Take a loan
          </h2>

          <p className="min-h-12 text-sm">
            You can loan up to {LOAN_LIMIT} gold. If you have a loan you cannot
            add funds to your account though until it has been repaid.
          </p>

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

        <form
          className="flex w-full flex-col items-start justify-between"
          onSubmit={repayHandleSubmit(handleRepay)}
        >
          <h2 className="mb-4 font-serif text-2xl font-semibold">Repay loan</h2>

          <p className="min-h-12 text-sm">
            Repay your loan to be able to take more loans down the road.
          </p>

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
    </div>
  )
}

export default BankLoan
