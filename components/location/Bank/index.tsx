"use client"

import { useState } from "react"
import { FaCoins } from "react-icons/fa"

import LocationTabs from "@/components/LocationTabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import BankAccount from "./Account"
import BankLoan from "./Loan"

export type BankTab = "account" | "loan"

const Bank = () => {
  const { data: player } = useGetPlayer()

  const [tab, setTab] = useState<BankTab>("account")

  const balances = [
    { label: "Gold", value: player?.character.gold || 0 },
    { label: "Account", value: player?.character.account || 0 },
    { label: "Loan", value: player?.character.loan || 0 },
  ]

  return (
    <>
      <LocationTabs<BankTab>
        items={[
          { id: "account", label: "Account" },
          { id: "loan", label: "Loan" },
        ]}
        currentTab={tab}
        setCurrentTab={setTab}
      />

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

      {tab === "account" && <BankAccount />}
      {tab === "loan" && <BankLoan />}
    </>
  )
}

export default Bank
