type Props = {
  nation: Nation | undefined
  size?: number
  className?: string
}

const Flag = ({ nation, size = 32, className }: Props) => {
  if (!nation) {
    return null
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      width={size}
      height={size}
      aria-label={nation}
      className={className}
    >
      {nation === "England" && (
        <>
          <path fill="#fff" d="M0 0h640v480H0z" />
          <path fill="#ce1124" d="M281.6 0h76.8v480h-76.8z" />
          <path fill="#ce1124" d="M0 201.6h640v76.8H0z" />
        </>
      )}

      {nation === "France" && (
        <>
          <path fill="#fff" d="M0 0h640v480H0z" />
          <path fill="#002654" d="M0 0h213.3v480H0z" />
          <path fill="#ce1126" d="M426.7 0H640v480H426.7z" />
        </>
      )}

      {nation === "Spain" && (
        <>
          <path fill="#aa151b" d="M0 0h640v480H0Z" />
          <path fill="#f1bf00" d="M0 120h640v240H0Z" />
        </>
      )}

      {nation === "Holland" && (
        <>
          <path fill="#21468b" d="M0 0h640v480H0z" />
          <path fill="#fff" d="M0 0h640v320H0z" />
          <path fill="#ae1c28" d="M0 0h640v160H0z" />
        </>
      )}
    </svg>
  )
}

export default Flag
