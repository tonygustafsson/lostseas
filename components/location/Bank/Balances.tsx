import { Coins, Landmark, ScrollText } from "lucide-react"

type BalancesProps = {
  gold: number
  account: number
  loan: number
}

const Balances = ({ gold, account, loan }: BalancesProps) => {
  const balances = [
    {
      label: "Gold on hand",
      value: gold,
      icon: Coins,
    },
    {
      label: "Bank balance",
      value: account,
      icon: Landmark,
    },
    {
      label: "Outstanding loan",
      value: loan,
      icon: ScrollText,
    },
  ]

  return (
    <section className="bg-card grid w-full gap-4 rounded-2xl border p-4 md:p-5 lg:grid-cols-4 lg:items-center">
      <div className="flex flex-col gap-2 px-1 py-1 lg:px-2">
        <h2 className="text-accent font-serif text-xl font-semibold">
          Your Finances
        </h2>
        <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
          A summary of your wealth and debts.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:col-span-3 xl:grid-cols-3">
        {balances.map((balance) => {
          const Icon = balance.icon

          return (
            <div
              key={balance.label}
              className="bg-muted flex items-center gap-4 rounded-xl border px-4 py-3"
            >
              <Icon
                aria-hidden="true"
                className="text-accent size-8 shrink-0"
              />

              <div>
                <dt className="text-muted-foreground font-serif text-sm">
                  {balance.label}
                </dt>

                <dd className="text-foreground mt-0.5 text-2xl leading-none font-semibold tracking-tight tabular-nums">
                  {balance.value.toLocaleString("en-US")} gold
                </dd>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Balances
