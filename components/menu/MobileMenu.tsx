"use client"

import MobileBottomNav from "./MobileBottomNav"

type Props = {
  className?: string
}

const MobileMenu = ({ className }: Props) => (
  <div className={className}>
    <MobileBottomNav />
  </div>
)

export default MobileMenu
