"use client"

import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import RadialProgressBar from "@/components/RadialProgressBar"
import ShipActions from "@/components/ships/ShipActions"
import { Badge } from "@/components/ui/badge"
import { SHIP_TYPES } from "@/constants/ship"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { cn } from "@/lib/utils"
import { getCurrentDate } from "@/utils/date"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card"

export default function ShipList() {
  const { data: player } = useGetPlayer()

  if (!player) {
    return null
  }

  if (!Object.values(player.ships || []).length) {
    return <p>You do not have any ships currently.</p>
  }

  return (
    <>
      {!!Object.values(player.ships || []).length && (
        <div
          className={cn("grid w-full grid-cols-1 gap-2 sm:grid-cols-2", {
            "sm:grid-cols-1": Object.values(player.ships || []).length === 1,
          })}
        >
          {Object.values(player.ships || []).map((ship, idx) => {
            const shipInfo = SHIP_TYPES[ship.type]
            const createdDate = getCurrentDate(ship.createdDay)

            if (!shipInfo) {
              return null
            }

            return (
              <Card
                key={`ships-${ship.id}-${idx}`}
                size="sm"
                className="bg-gray-900"
              >
                <CardHeader>
                  <CardTitle>{ship.name}</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col justify-between gap-4">
                  <p className="text-xs">{shipInfo.description}</p>

                  <div className="flex gap-4">
                    <div className="flex w-fit flex-col items-center gap-1">
                      <p className="text-xs">{ship.type}</p>
                      <MerchandiseIcon size="lg" item={ship.type} />
                    </div>

                    <div className="flex w-fit flex-col items-center gap-1">
                      <p className="text-xs">Health</p>

                      <RadialProgressBar
                        percentage={ship.health}
                        className="h-14 w-14"
                      />
                    </div>
                  </div>
                </CardContent>

                <CardAction className="w-full px-4">
                  <ShipActions
                    shipId={ship.id}
                    shipName={ship.name}
                    shipType={ship.type}
                  />
                </CardAction>
              </Card>
            )

            return (
              <MerchandiseCard
                key={`ships-${ship.id}-${idx}`}
                title={`${ship.name} (${ship.type})`}
                icon={<MerchandiseIcon item={ship.type} />}
                body={
                  <>
                    <p>{shipInfo.description}</p>

                    <div className="mt-2 flex flex-col gap-4">
                      <div className="flex w-fit flex-col items-center gap-1">
                        <p className="text-xs font-bold">Health</p>

                        <RadialProgressBar
                          percentage={ship.health}
                          className="h-14 w-14"
                        />
                      </div>

                      <Badge variant="secondary">Created: {createdDate}</Badge>
                    </div>
                  </>
                }
                actions={
                  <ShipActions
                    shipId={ship.id}
                    shipName={ship.name}
                    shipType={ship.type}
                  />
                }
              />
            )
          })}
        </div>
      )}
    </>
  )
}
