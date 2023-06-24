import { useState } from "react"
import { GiCoins } from "react-icons/gi"

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

      <div className="flex flex-wrap gap-6 w-full justify-center">
        <div className="stats bg-transparent gap-2 mt-4">
          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <GiCoins className="h-8 w-8" />
            </div>
            <div className="stat-title">Doubloons</div>
            <div className="stat-value text-2xl">
              {player?.character.doubloons}
            </div>
          </div>

          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <GiCoins className="h-8 w-8" />
            </div>
            <div className="stat-title">Bank account</div>
            <div className="stat-value text-2xl">
              {player?.character.account || 0}
            </div>
          </div>

          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <GiCoins className="h-8 w-8" />
            </div>
            <div className="stat-title">Bank loan</div>
            <div className="stat-value text-2xl">
              {player?.character.loan || 0}
            </div>
          </div>
        </div>
      </div>

      {tab === "account" && <BankAccount />}
      {tab === "loan" && <BankLoan />}
    </>
  )
}

export default Bank
