import MerchandiseIcon from "@/components/MerchandiseIcon"
import { MERCHANDISE } from "@/constants/merchandise"

type Props = {
  player: Player
}

export default async function FittingsList({ player }: Props) {
  if (!player) {
    return null
  }

  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-800 p-4 shadow-md hover:shadow-lg lg:w-52">
      <div>
        <div className="text-muted-foreground text-sm">Cannons</div>
        <div className="mt-1 text-2xl font-semibold">
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
