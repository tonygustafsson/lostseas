type Props = {
  title?: string
  message: string | React.ReactNode
  actions?: React.ReactNode
  icon?: React.ReactNode
}

const ActionCard = ({ title, message, actions, icon }: Props) => (
  <div className="mb-8 rounded-lg border bg-gray-900">
    <div className="flex w-full max-w-none flex-col items-start justify-start gap-4 p-8 lg:flex-row">
      {icon}

      <div className="max-w-3xl">
        <h1 className="font-serif text-2xl font-bold">{title}</h1>

        {typeof message === "string" ? (
          <p className="pt-2">{message}</p>
        ) : (
          message
        )}

        {actions && <div className="flex gap-4 pt-4">{actions}</div>}
      </div>
    </div>
  </div>
)

export default ActionCard
