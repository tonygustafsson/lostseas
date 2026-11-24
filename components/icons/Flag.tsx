import { getNationName } from "@/utils/location"

type Props = {
  nation: (Nation | "Pirate") | undefined
  size?: number
  className?: string
  /** Hide from assistive tech when the nation is already shown as text */
  decorative?: boolean
}

const Flag = ({ nation, size = 32, className, decorative }: Props) => {
  if (!nation) {
    return null
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      width={size}
      height={size}
      aria-label={decorative ? undefined : getNationName(nation)}
      aria-hidden={decorative}
      className={className}
    >
      <defs>
        <symbol id="flag-fleur" viewBox="0 0 100 100" fill="#d4a017">
          <path d="M50 5c10 15 12 33 0 53C38 38 40 20 50 5z" />
          <path d="M46 55C40 30 15 25 10 45c-3 15 15 23 28 13-8-2-14-8-10-14 6-2 14 8 18 18z" />
          <path d="M54 55c6-25 31-30 36-10 3 15-15 23-28 13 8-2 14-8 10-14-6-2-14 8-18 18z" />
          <path d="M30 62h40v8H30zM42 70h16l4 20-12-8-12 8z" />
        </symbol>
      </defs>

      {nation === "England" && (
        <>
          {/* The Union flag of 1707, before the cross of St Patrick */}
          <path fill="#012169" d="M0 0h640v480H0z" />
          <path stroke="#fff" strokeWidth="96" d="m0 0 640 480M640 0 0 480" />
          <path fill="#fff" d="M240 0h160v480H240zM0 160h640v160H0z" />
          <path fill="#c8102e" d="M272 0h96v480h-96zM0 192h640v96H0z" />
        </>
      )}

      {nation === "France" && (
        <>
          {/* The white Bourbon flag with golden fleurs-de-lis */}
          <path fill="#fff" d="M0 0h640v480H0z" />
          <use href="#flag-fleur" x="70" y="50" width="100" height="100" />
          <use href="#flag-fleur" x="270" y="50" width="100" height="100" />
          <use href="#flag-fleur" x="470" y="50" width="100" height="100" />
          <use href="#flag-fleur" x="170" y="190" width="100" height="100" />
          <use href="#flag-fleur" x="370" y="190" width="100" height="100" />
          <use href="#flag-fleur" x="70" y="330" width="100" height="100" />
          <use href="#flag-fleur" x="270" y="330" width="100" height="100" />
          <use href="#flag-fleur" x="470" y="330" width="100" height="100" />
        </>
      )}

      {nation === "Spain" && (
        <>
          <path fill="#aa151b" d="M0 0h640v480H0Z" />
          <path fill="#f1bf00" d="M0 120h640v240H0Z" />

          {/* Royal arms: a crowned shield bearing a fleur-de-lis */}
          <g transform="translate(210 240) scale(1.4) translate(-180 -230)">
            <path
              fill="#aa151b"
              stroke="#8a6a00"
              strokeWidth="6"
              d="M140 205h80v50c0 30-40 50-40 50s-40-20-40-50z"
            />
            <use href="#flag-fleur" x="160" y="222" width="40" height="40" />
            <path
              fill="#d4a017"
              stroke="#8a6a00"
              strokeWidth="6"
              strokeLinejoin="round"
              d="M148 195l-6-40 22 18 16-28 16 28 22-18-6 40z"
            />
          </g>
        </>
      )}

      {nation === "Holland" && (
        <>
          <path fill="#21468b" d="M0 0h640v480H0z" />
          <path fill="#fff" d="M0 0h640v320H0z" />
          <path fill="#ae1c28" d="M0 0h640v160H0z" />
        </>
      )}

      {nation === "Pirate" && (
        <>
          <path d="M0 0h640v480H0z" />
          <path
            fillRule="evenodd"
            stroke="#000"
            strokeWidth="1.3"
            d="M449 320a57 57 0 0 0-26 49c0 13 5 21 9 21 4-1 9-5 17-14"
          />
          <path
            fillRule="evenodd"
            stroke="#000"
            strokeLinejoin="bevel"
            strokeWidth="1.3"
            d="M191 321a57 57 0 0 1 26 49c0 13-5 21-9 21-4-1-9-5-17-14"
          />
          <path
            fillRule="evenodd"
            stroke="#000"
            strokeWidth="1.3"
            d="M366 264c13-3 26-4 40-6 17-4 26 16 21 31-6 13-14 25-24 37-8 8-17 10-25 7-7-2-14-7-21-17l-9-23c-3-10 1-25 18-29Zm-92 0c-13-3-26-4-40-6-17-4-26 16-21 31 6 13 14 25 24 37 8 8 17 10 25 7 7-2 14-7 21-17l9-23c3-10-1-25-18-29Zm0 0"
          />
          <path
            fill="#fff"
            d="m302 297-6-1-4-1v-4c-2-13-9-21-22-27-11-4-14-7-16-14-3-8-3-15 0-29a130 130 0 0 0-1-46c-3-11-3-23-1-26 1-1 1-2-2-5l-3-3-1 2c-4 6-4 20 0 34l2 13c1 6 0 18-1 17s-6-11-7-17c-6-16-7-36-4-50 5-24 19-41 38-50 18-8 45-12 63-9 17 3 34 10 42 16a84 84 0 0 1 25 82c-1 6-7 20-9 24l-2 3-1-4c0-7 1-17 3-24 2-9 4-21 2-28l-2-7-2-2-3 3c-2 2-2 3-1 5l1 9c0 6-1 9-3 16-2 8-2 10-2 21l2 26c2 13 2 14 1 20-1 8-3 14-5 16l-8 5c-17 8-24 15-26 27l-1 5-4 2c-4 1-38 2-42 1Zm9-18c2 0 3-2 5-4l2-4v-38c-2 0-9 9-11 15s-3 8-3 15c-1 8 0 13 2 16 2 2 3 2 5 0Zm24-1 1-13c0-9 0-10-2-16-3-6-10-16-12-16v38l2 3c2 4 6 7 8 7l3-3Zm-47-36c5-2 15-17 19-27 3-9 0-20-6-23h-11c-14 2-20 4-23 6-6 6-7 13-3 25 3 9 5 13 9 16 5 5 11 6 15 3Zm78-1 5-6c3-3 9-20 9-23 0-6-5-13-10-16l-24-4-6-1-3 4c-4 4-5 9-4 14 1 9 13 30 19 33 3 2 10 1 14-1Zm0 0"
          />
          <path
            fill="#fff"
            d="M305 360c-11-3-16-6-22-15-7-10-9-19-9-35 1-13 0-19-3-29-3-9-1-9 2 0s5 21 6 30l1 8 4 4c9 10 18 13 36 13 14 0 19-1 28-6 7-5 11-10 12-15 2-17 8-40 10-41l-1 7c-3 10-3 16-3 28 1 18-2 28-11 39l-11 9-11 3c-6 2-22 1-28 0Zm-69-75c-33-19-32-18-47-16-6 0-12 0-15-3-2-1 1-6 7-13 7-8 7-8 7-19l2-10c3-6 9-2 14 10l7 12 27 18 25 15 2 8c2 9 3 16 1 16l-30-18Zm186 112c-3-2-5-6-7-10-5-13-8-15-28-28l-20-12 2-8a54 54 0 0 0 2-11l21 11c25 14 26 14 32 13l11-1c6 0 7 1 9 2l2 3-8 10-7 8-1 10c-1 10-2 15-4 16l-4-3Zm-209 0-2-12-1-11-8-9-7-11c1-3 4-4 11-4l13 1c7 0 12-2 35-15l15-9v2l2 9 2 8-20 13-20 13-6 11c-8 15-12 19-14 14Zm160-98 3-13 2-7 25-14c27-17 27-17 33-31 4-9 11-15 13-12l3 19c0 4 1 6 8 14 8 11 8 12 2 14-4 2-8 2-16 0h-10a416 416 0 0 0-58 32l-5 3Zm0 0"
          />
          <path
            fill="#fff"
            d="m285 318-1-6a160 160 0 0 0-8-35l5 4 4 11v3l2 1v12a997 997 0 0 1-2 10Zm9-8-3-1-1-1v-10l3 1h2v6l-1 6v-1Zm-2 15-2-2v-11l2 1 2 1v12l-2-1Zm8 4-2-1h-1v-12l2 1h3l1 1v3l-1 8h-2Zm2-15-3-1-2-1v-6l1-6 2 1h3v7a172 172 0 0 1-1 6Zm6 1h-2v-14h2l2 1v13h-2Zm0 16-2-1v-12l1 1h3v12h-2Zm6 1-1-1v-12h6v13h-5Zm-1-23v-7h6v14h-6Zm9 0v-7h5v13h-1l-3 1h-1Zm0 23v-13h5v13h-5Zm12-5h1v1l-1-1Zm-4-19v-6l2-1h2v14h-4Zm7 5v-12l6-1v12l-2 1-3 1-1-1Zm0 11v-6l3-1 2-1 1 6v6l-3 1h-2l-1-5Zm9 0v-9l2-2 2-1 1 5v6l-1 1-4 2v-2Zm0-19v-6l2-1h2v10h-1l-2 2-1 1Zm7 11v-20l2-1 1-3c0-4 2-8 4-11l4-3-2 7c-3 10-5 19-6 29l-1 4-1 2-1-4Zm-23 9 1-6 2-1h1v12l-1 1h-3Zm0 0"
          />
        </>
      )}
    </svg>
  )
}

export default Flag
