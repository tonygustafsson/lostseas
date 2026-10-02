"use client"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import BankAccount from "./Account"
import Balances from "./Balances"
import BankLoan from "./Loan"

const Bank = () => {
  const { data: player } = useGetPlayer()
  const character = player?.character

  return (
    <div className="flex flex-col gap-12">
      <Balances
        gold={character?.gold ?? 0}
        account={character?.account ?? 0}
        loan={character?.loan ?? 0}
      />

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <BankAccount key={`account_${character?.loan}_${character?.gold}`} />
        <BankLoan key={`loan_${character?.loan}_${character?.gold}`} />
      </div>
    </div>
  )
}

export default Bank
