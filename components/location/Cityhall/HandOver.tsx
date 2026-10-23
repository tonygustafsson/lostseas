import TreasureIcon from "@/components/TreasureIcon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TREASURES } from "@/constants/treasures"
import { useCityhall } from "@/hooks/queries/useCityhall"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { formatGold } from "@/utils/number"

const HandOver = () => {
  const { data: player } = useGetPlayer()
  const { handOver } = useCityhall()

  const treasursOfInterest = Object.values(player?.treasures || [])?.filter(
    (treasure) => treasure.rewarder === player?.character.town
  )

  const handleHandover = (id: Treasure["id"]) => {
    handOver(id)
  }

  if (!treasursOfInterest?.length) {
    return null
  }

  return (
    <div>
      <h2 className="mb-4 font-serif text-3xl">Hand over</h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {treasursOfInterest.map((treasure, idx) => {
          const treasureInfo = TREASURES.find(
            (treasureItem) => treasureItem.name === treasure.name
          )

          return (
            <Card key={`${treasure.name}-${idx}`} className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -bottom-2 -rotate-12 opacity-25 [&_svg]:size-32"
              >
                <TreasureIcon item={treasure.name} />
              </span>

              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2 font-serif text-2xl font-semibold">
                  <TreasureIcon size="lg" item={treasure.name} />

                  {treasure.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative">
                <p>{treasureInfo?.description}</p>

                <Badge className="bg-success/10 text-success mt-4">
                  Value: {formatGold(treasureInfo?.value)}
                </Badge>
              </CardContent>

              <CardAction className="relative px-6">
                <Button size="sm" onClick={() => handleHandover(treasure.id)}>
                  Hand over
                </Button>
              </CardAction>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default HandOver
