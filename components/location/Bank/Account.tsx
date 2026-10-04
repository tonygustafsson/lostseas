import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import MerchandiseCard from "@/components/MerchandiseCard"
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
    <>
      <MerchandiseCard
        image="/img/cards/bank/deposit.png"
        icon={<ArrowDownToLine />}
        title="Make deposit"
        fullWidth
        body={
          <>
            <p>Keep your gold safe from the dangers at sea.</p>
            {!!player?.character.loan && (
              <p className="text-destructive pt-1 text-sm font-semibold">
                Repay your loan before adding money to your account.
              </p>
            )}
          </>
        }
        actions={
          <form
            onSubmit={accountHandleSubmit(handleDeposit)}
            className="flex flex-col gap-4"
          >
            <TextField
              label="Amount"
              type="number"
              {...accountRegister("amount", { valueAsNumber: true })}
              error={accountErrors.amount?.message}
              className="border-border bg-background/80"
            />
            <Button
              type="submit"
              className="mt-auto w-full font-serif text-base"
              disabled={!accountIsValid}
            >
              Deposit
            </Button>
          </form>
        }
      />

      <MerchandiseCard
        image="/img/cards/bank/withdrawal.png"
        icon={<ArrowUpFromLine />}
        title="Make withdrawal"
        fullWidth
        body={<p>Bring your saved gold back aboard to spend it.</p>}
        actions={
          <form
            onSubmit={withdrawalHandleSubmit(handleWithdrawal)}
            className="flex flex-col gap-4"
          >
            <TextField
              id="withdrawal"
              label="Amount"
              type="number"
              {...withdrawalRegister("amount", { valueAsNumber: true })}
              error={withdrawalErrors.amount?.message}
              className="border-border bg-background/80"
            />
            <Button
              type="submit"
              className="mt-auto w-full font-serif text-base"
              disabled={!withdrawalIsValid}
            >
              Withdrawal
            </Button>
          </form>
        }
      />
    </>
  )
}

export default BankAccount
