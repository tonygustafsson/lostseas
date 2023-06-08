import { useState } from "react"
import { GiCoins } from "react-icons/gi"

import TextField from "@/components/ui/TextField"
import { LOAN_LIMIT } from "@/constants/bank"
import { useBank } from "@/hooks/queries/useBank"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const Bank = () => {
  const { data: player } = useGetPlayer()
  const { deposit, withdraw, loan, repay } = useBank()

  const maxDeposit = player?.character.doubloons
  const maxWithdrawal = player?.character.account || 0
  const maxLoan = LOAN_LIMIT - (player?.character.loan || 0)
  const maxRepay = player?.character.loan || 0

  const [accountInput, setAccountInput] = useState("")
  const [withdrawalInput, setWithdrawalInput] = useState("")
  const [loanInput, setLoanInput] = useState("")
  const [repayInput, setRepayInput] = useState("")

  const getFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const userId = formData.get("userId") as string
    const amount = parseInt(formData.get("amount") as string)

    return { userId, amount }
  }

  const handleDeposit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { userId, amount } = getFormData(e)
    deposit({ userId, amount })

    setAccountInput("")
  }

  const handleWithdrawal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { userId, amount } = getFormData(e)
    withdraw({ userId, amount })

    setWithdrawalInput("")
  }

  const handleLoan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { userId, amount } = getFormData(e)
    loan({ userId, amount })

    setLoanInput("")
  }

  const handleRepay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { userId, amount } = getFormData(e)
    repay({ userId, amount })

    setRepayInput("")
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

      <div className="w-full flex gap-8">
        <form className="w-full mt-4" onSubmit={handleLoan}>
          <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">
            Take a loan
          </h2>

          <p>
            You can loan up to {LOAN_LIMIT} doubloons. It will come with an
            interest of 10% though.
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
            max={maxLoan}
            value={loanInput}
            onChange={(value) => setLoanInput(value)}
            min={1}
            required
          />

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={
              parseInt(loanInput) + (player?.character.loan || 0) > LOAN_LIMIT
            }
          >
            Take loan
          </button>
        </form>

        <form className="w-full mt-4" onSubmit={handleRepay}>
          <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">
            Repay loan
          </h2>

          <p>Repay your loan to be able to take more loans down the road.</p>

          <TextField
            type="hidden"
            name="userId"
            defaultValue={player?.id || ""}
          />

          <TextField
            name="amount"
            label="Amount"
            type="number"
            max={maxRepay}
            value={repayInput}
            onChange={(value) => setRepayInput(value)}
            min={1}
            required
          />

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={
              parseInt(repayInput) > (player?.character.loan || 0) ||
              parseInt(repayInput) > (player?.character.doubloons || 0)
            }
          >
            Repay loan
          </button>
        </form>
      </div>
    </>
  )
}

export default Bank
