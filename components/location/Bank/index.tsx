import { useState } from "react"
import { GiCoins } from "react-icons/gi"

import TextField from "@/components/ui/TextField"
import { useBank } from "@/hooks/queries/useBank"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Bank = () => {
  const { data: player } = useGetPlayer()
  const { deposit, withdraw } = useBank()

  const maxDeposit = player?.character.doubloons
  const maxWithdrawal = player?.character.account || 0

  const [accountInput, setAccountInput] = useState("")
  const [withdrawalInput, setWithdrawalInput] = useState("")

  const handleDeposit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const userId = formData.get("userId") as string
    const amount = parseInt(formData.get("amount") as string)

    deposit({ userId, amount })
    e.currentTarget["amount"].value = ""
  }

  const handleWithdrawal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const userId = formData.get("userId") as string
    const amount = parseInt(formData.get("amount") as string)

    withdraw({ userId, amount })
    e.currentTarget["amount"].value = ""
  }

  return (
    <>
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

      <div className="w-full flex gap-8">
        <form className="w-full mt-4" onSubmit={handleDeposit}>
          <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">
            Make deposit
          </h2>

          <p>
            When doubloons are stored at the bank you will not risk loosing it
            at sea.
          </p>

          <TextField
            type="hidden"
            name="userId"
            defaultValue={player?.id || ""}
          />

          <TextField
            name="amount"
            label="Amount"
            type="number"
            max={maxDeposit}
            value={accountInput}
            onChange={(value) => setAccountInput(value)}
            min={1}
            required
          />

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={
              parseInt(accountInput) > (player?.character.doubloons || 0)
            }
          >
            Deposit
          </button>
        </form>

        <form className="w-full mt-4" onSubmit={handleWithdrawal}>
          <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">
            Make withdrawal
          </h2>

          <p>Take out your doubloons in order to spend it.</p>

          <TextField
            type="hidden"
            name="userId"
            defaultValue={player?.id || ""}
          />

          <TextField
            name="amount"
            label="Amount"
            type="number"
            max={maxWithdrawal}
            value={withdrawalInput}
            onChange={(value) => setWithdrawalInput(value)}
            min={1}
            required
          />

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={
              parseInt(withdrawalInput) > (player?.character.account || 0)
            }
          >
            Withdrawal
          </button>
        </form>
      </div>
    </>
  )
}

export default Bank
