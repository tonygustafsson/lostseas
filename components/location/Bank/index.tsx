"use client"

import { FaCoins } from "react-icons/fa"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import BankAccount from "./Account"
import BankLoan from "./Loan"

const Bank = () => {
  const { data: player } = useGetPlayer()

  const balances = [
    { label: "Gold", value: player?.character.gold || 0 },
    { label: "Account", value: player?.character.account || 0 },
    { label: "Loan", value: player?.character.loan || 0 },
  ]

  return (
    <>
      <div className="mt-4 grid w-full gap-6 md:grid-cols-3">
        {balances.map((balance) => (
          <Card key={balance.label} className="gap-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {balance.label}
              </CardTitle>
              <FaCoins className="h-5 w-5 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold tracking-tight">
                {balance.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <BankAccount
          key={`account_${player?.character?.loan}_${player?.character?.gold}`}
        />
        <BankLoan
          key={`loan_${player?.character?.loan}_${player?.character?.gold}`}
        />
      </div>
    </>
  )
}

export default Bank
