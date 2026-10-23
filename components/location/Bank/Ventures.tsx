"use client"

import { VENTURE_IDS } from "@/constants/ventures"
import { useBank } from "@/hooks/queries/useBank"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import BankArea from "./BankArea"
import VentureCard from "./VentureCard"

const BankVentures = () => {
  const { data: player } = useGetPlayer()
  const { investInVenture, isInvesting, collectVenture, isCollecting } =
    useBank()

  const character = player?.character

  return (
    <BankArea
      title="Ventures"
      description={
        <>
          Buy a share in a trading voyage. The stake is paid from your purse,
          and when the party returns you can collect your share at any bank. The
          greater the stake, the greater the reward, and the risk.
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {VENTURE_IDS.map((ventureId) => (
          <VentureCard
            key={ventureId}
            ventureId={ventureId}
            share={character?.ventures?.[ventureId]}
            day={character?.day ?? 0}
            gold={character?.gold ?? 0}
            disabled={isInvesting || isCollecting}
            onInvest={() => investInVenture({ ventureId })}
            onCollect={() => collectVenture({ ventureId })}
          />
        ))}
      </div>
    </BankArea>
  )
}

export default BankVentures
