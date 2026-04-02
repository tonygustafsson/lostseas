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
    return <p>You have nothing to hand over.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {treasursOfInterest.map((treasure, idx) => {
        const treasureInfo = TREASURES.find(
          (treasureItem) => treasureItem.name === treasure.name
        )

        return (
          <Card key={`${treasure.name}-${idx}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif text-2xl font-semibold">
                <TreasureIcon size="lg" item={treasure.name} />

                {treasure.name}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p>{treasureInfo?.description}</p>

              <Badge variant="secondary" className="mt-4">
                Value: {treasureInfo?.value} gold
              </Badge>
            </CardContent>

            <CardAction className="px-6">
              <Button size="sm" onClick={() => handleHandover(treasure.id)}>
                Hand over
              </Button>
            </CardAction>
          </Card>
        )
      })}
    </div>
  )
}

export default HandOver
