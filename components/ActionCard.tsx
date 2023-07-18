type Props = {
  title?: string
  message: string | React.ReactNode
  actions?: React.ReactNode
  icon?: React.ReactNode
}

const ActionCard = ({ title, message, actions, icon }: Props) => (
  <div className="hero mb-8 bg-gray-800 border border-gray-700 rounded-lg">
    <div className="hero-content max-w-none w-full items-start justify-start flex-col lg:flex-row p-8 gap-8">
      {icon}

      <div className="max-w-3xl">
        <h1 className="text-2xl font-serif font-bold">{title}</h1>

        <p className="pt-2">{message}</p>

        {actions && <div className="flex gap-4 pt-4">{actions}</div>}
      </div>
    </div>
  </div>
)

export default ActionCard
