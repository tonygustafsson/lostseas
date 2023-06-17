type Props = {
  title: string
  icon: React.ReactNode
  indicator?: string
  body: React.ReactNode
  actions?: React.ReactNode
}

const MerchandiseCard = ({ title, icon, indicator, body, actions }: Props) => (
  <div className="card w-80 bg-base-100 shadow-xl">
    <figure className="gap-3 bg-gray-800 py-3 mb-2 px-6">
      {icon}

      {indicator ? (
        <div className="indicator">
          <h2 className="card-title mr-8">{title}</h2>

          <span className="indicator-item indicator-middle badge badge-primary">
            {indicator}
          </span>
        </div>
      ) : (
        <h2 className="card-title mr-8">{title}</h2>
      )}
    </figure>

    <div className="card-body pt-2 pb-2 px-6">{body}</div>

    {actions && (
      <div className="card-actions mx-6 my-6 gap-2 justify-between">
        {actions}
      </div>
    )}
  </div>
)

export default MerchandiseCard
