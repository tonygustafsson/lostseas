"use client"
import { BadgeCheck, ScrollText } from "lucide-react"

import { LOAN_LIMIT } from "@/constants/bank"
import { useBank } from "@/hooks/queries/useBank"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { formatGold } from "@/utils/number"

import BankArea from "./BankArea"
import QuickAmounts from "./QuickAmounts"

const BankLoan = () => {
  const { data: player } = useGetPlayer()
  const { loan, isLoaning, repay, isRepaying } = useBank()

  const gold = player?.character.gold ?? 0
  const debt = player?.character.loan ?? 0

  return (
    <BankArea
      image="/img/cards/bank/loan.png"
      title="Loans"
      description={
        <>
          Borrow up to {formatGold(LOAN_LIMIT)} with no interest. Repay it in
          full before you can make deposits.
        </>
      }
    >
      <QuickAmounts
        icon={<ScrollText />}
        title="Take a loan"
        verb="Borrow"
        max={LOAN_LIMIT - debt}
        emptyMessage="You have reached the loan limit."
        disabled={isLoaning}
        onSelect={(amount) => loan({ amount })}
      />

      {debt > 0 && (
        <QuickAmounts
          icon={<BadgeCheck />}
          title="Repay loan"
          description="Settle your debt to open the way to future borrowing."
          verb="Repay"
          max={Math.min(debt, gold)}
          emptyMessage="You have no gold to repay your loan with."
          disabled={isRepaying}
          onSelect={(amount) => repay({ amount })}
        />
      )}
    </BankArea>
  )
}

export default BankLoan
