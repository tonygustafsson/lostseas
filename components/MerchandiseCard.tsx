type Props = {
  title: string
  icon: React.ReactNode
  indicator?: string
  body: React.ReactNode
  actions?: React.ReactNode
  disabled?: boolean
  fullWidth?: boolean
}

const MerchandiseCard = ({
  title,
  icon,
  indicator,
  body,
  actions,
  disabled,
  fullWidth,
}: Props) => (
  <div
    className={`card ${
      fullWidth ? "w-full" : "w-full lg:w-80"
    } bg-gray-50 shadow-xl ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
  >
    <figure className="mb-2 gap-3 bg-gray-800 px-6 py-3">
      {icon}

      {indicator ? (
        <div className="indicator">
          <h2 className="card-title mr-8 font-serif text-xl">{title}</h2>

          <span className="badge indicator-item badge-primary indicator-middle text-xs">
            {indicator}
          </span>
        </div>
      ) : (
        <h2 className="card-title mr-8 font-serif">{title}</h2>
      )}
    </figure>

    <div className="card-body px-6 pt-2 pb-2 text-sm">{body}</div>

    {actions && (
      <div className="card-actions mx-6 my-6 justify-between gap-2">
        {actions}
      </div>
    )}
  </div>
)

export default MerchandiseCard
