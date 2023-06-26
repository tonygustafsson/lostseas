import Link from "next/link"
import { useRouter } from "next/router"
import { GiOpenedFoodCan, GiPirateHat } from "react-icons/gi"
import { HiMenu } from "react-icons/hi"

type Props = {
  setMobileMenuOpen: (open: (prev: boolean) => boolean) => void
}

const MobileBottomNav = ({ setMobileMenuOpen }: Props) => {
  const { pathname } = useRouter()

  return (
    <div className="btm-nav lg:hidden z-10">
      <Link href="/" className={`${pathname === "/" ? "active" : ""}`}>
        <GiPirateHat className="h-5 w-5" />
        Play
      </Link>

      <button
        onClick={() => setMobileMenuOpen((mobileMenuOpen) => !mobileMenuOpen)}
      >
        <HiMenu className="h-5 w-5" />
        Menu
      </button>

      <Link
        href="/inventory"
        className={`${pathname === "/inventory" ? "active" : ""}`}
      >
        <GiOpenedFoodCan className="h-5 w-5" />
        Inventory
      </Link>
    </div>
  )
}

export default MobileBottomNav
