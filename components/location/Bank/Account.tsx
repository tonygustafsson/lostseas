import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react"

import { useBank } from "@/hooks/queries/useBank"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import BankArea from "./BankArea"
import QuickAmounts from "./QuickAmounts"

const BankAccount = () => {
  const { data: player } = useGetPlayer()
  const { deposit, isDepositing, withdraw, isWithdrawing } = useBank()

  const gold = player?.character.gold ?? 0
  const account = player?.character.account ?? 0
  const hasLoan = !!player?.character.loan

  return (
    <BankArea
      image="/img/cards/bank/deposit.png"
      title="Account"
      description={
        <>
          Gold in your account is safe if you lose a sea battle, and works in
          every town. You cannot deposit while you owe the bank money.
        </>
      }
    >
      <QuickAmounts
        icon={<ArrowDownToLine />}
        title="Make deposit"
        verb="Deposit"
        max={hasLoan ? 0 : gold}
        emptyMessage={
          hasLoan
            ? "Repay your loan before adding money to your account."
            : "You have no gold to deposit."
        }
        disabled={isDepositing}
        onSelect={(amount) => deposit({ amount })}
      />

      {account > 0 && (
        <QuickAmounts
          icon={<ArrowUpFromLine />}
          title="Make withdrawal"
          description="Bring your saved gold back aboard to spend it."
          verb="Withdraw"
          max={account}
          emptyMessage=""
          disabled={isWithdrawing}
          onSelect={(amount) => withdraw({ amount })}
        />
      )}
    </BankArea>
  )
}

export default BankAccount
