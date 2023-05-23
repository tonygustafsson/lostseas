type Props = {
  type?: "button" | "submit" | "reset"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

const Button = ({
  type = "button",
  size = "md",
  onClick,
  className,
  disabled,
  children,
}: Props) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`
      ${className}
      inline-block
      rounded
      bg-slate-600
      text-sm
      px-4
      pb-1.5
      pt-1.5
      text-md
      font-medium
      shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)]
      transition
      duration-150
      ease-in-out
      hover:bg-slate-700
      focus:bg-slate-700
      focus:ring-slate-700
      active:bg-slate-700
      ${size === "sm" && "text-xs px-4 pb-1.5 pt-1.5"}
      ${size === "lg" && "text-md px-8 pt-3 pb-3"}
      ${
        disabled &&
        "opacity-50 hover:bg-slate-600 active:bg-slate-600 cursor-normal"
      }
    `}
  >
    {children}
  </button>
)

export default Button
