"use client"

import { useState } from "react"
import { FaCoins } from "react-icons/fa"

import LocationTabs from "@/components/LocationTabs"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import BankAccount from "./Account"
import BankLoan from "./Loan"

export type BankTab = "account" | "loan"

const Bank = () => {
  const { data: player } = useGetPlayer()

  const [tab, setTab] = useState<BankTab>("account")

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

      <div className="flex w-full flex-wrap justify-center gap-6">
        <div className="stats mt-4 gap-1">
          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <FaCoins className="h-7 w-7" />
            </div>
            <div className="stat-title">Gold</div>
            <div className="stat-value">{player?.character.gold}</div>
          </div>

          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <FaCoins className="h-7 w-7" />
            </div>
            <div className="stat-title">Account</div>
            <div className="stat-value">{player?.character.account || 0}</div>
          </div>

          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <FaCoins className="h-7 w-7" />
            </div>
            <div className="stat-title">Loan</div>
            <div className="stat-value">{player?.character.loan || 0}</div>
          </div>
        </div>
      </div>

      {tab === "account" && <BankAccount />}
      {tab === "loan" && <BankLoan />}
    </>
  )
}

export default Bank
