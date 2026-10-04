"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { BadgeCheck, ScrollText } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import MerchandiseCard from "@/components/MerchandiseCard"
import TextField from "@/components/TextField"
import { Button } from "@/components/ui/button"
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
      .max(Math.min(player?.character.loan || 0, player?.character.gold || 0)),
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
    <>
      <MerchandiseCard
        image="/img/cards/bank/loan.png"
        icon={<ScrollText />}
        title="Take a loan"
        fullWidth
        body={
          <p>
            Borrow up to {LOAN_LIMIT} gold. Repay it before making deposits.
          </p>
        }
        actions={
          <form
            onSubmit={loanHandleSubmit(handleLoan)}
            className="flex flex-col gap-4"
          >
            <TextField
              label="Amount"
              type="number"
              {...loanRegister("amount", { valueAsNumber: true })}
              error={loanErrors.amount?.message}
              className="border-border bg-background/80"
            />
            <Button
              type="submit"
              className="mt-auto w-full font-serif text-base"
              disabled={!loanIsValid}
            >
              Take loan
            </Button>
          </form>
        }
      />

      <MerchandiseCard
        image="/img/cards/bank/repay.png"
        icon={<BadgeCheck />}
        title="Repay loan"
        fullWidth
        body={<p>Settle your debt to open the way to future borrowing.</p>}
        actions={
          <form
            onSubmit={repayHandleSubmit(handleRepay)}
            className="flex flex-col gap-4"
          >
            <TextField
              label="Amount"
              type="number"
              {...repayRegister("amount", { valueAsNumber: true })}
              error={repayErrors.amount?.message}
              className="border-border bg-background/80"
            />
            <Button
              type="submit"
              className="mt-auto w-full font-serif text-base"
              disabled={!repayIsValid}
            >
              Repay loan
            </Button>
          </form>
        }
      />
    </>
  )
}

export default BankLoan
