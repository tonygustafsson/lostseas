"use client"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

import BankAccount from "./Account"
import Balances from "./Balances"
import BankLoan from "./Loan"
import BankVentures from "./Ventures"

const Bank = () => {
  const { data: player } = useGetPlayer()
  const character = player?.character

  return (
    <div className="flex flex-col gap-8">
      <Balances
        gold={character?.gold ?? 0}
        account={character?.account ?? 0}
        loan={character?.loan ?? 0}
      />

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        <BankAccount />
        <BankLoan />
      </div>

      <BankVentures />
    </div>
  )
}

export default Bank
