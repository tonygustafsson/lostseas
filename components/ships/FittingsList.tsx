"use client"

import MerchandiseIcon from "@/components/MerchandiseIcon"
import { MERCHANDISE } from "@/constants/merchandise"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

export default function FittingsList() {
  const { data: player } = useGetPlayer()

  if (!player) {
    return null
  }

  return (
    <div className="flex items-center justify-between rounded-lg bg-neutral-900 p-4 shadow-md hover:shadow-lg lg:w-52">
      <div>
        <div className="text-muted-foreground text-sm">Cannons</div>
        <div>
          {player.inventory?.cannons}{" "}
          <span className="ml-1 text-sm font-normal">
            {player.inventory?.cannons === 1
              ? MERCHANDISE.cannons.singleUnit
              : MERCHANDISE.cannons.unit}
          </span>
        </div>
      </div>

      <MerchandiseIcon size="lg" item="cannons" className="text-yellow-400" />
    </div>
  )
}
