import { GetServerSideProps } from "next"
import Head from "next/head"
import { MdGroups } from "react-icons/md"

import DismissCrewMembers from "@/components/crew/DismissCrewMembers"
import GiveGold from "@/components/crew/GiveGold"
import GiveMedicine from "@/components/crew/GiveMedicine"
import DefaultLayout from "@/components/layouts/default"
import RadialProgressBar from "@/components/RadialProgressBar"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getLoggedInServerSideProps } from "@/utils/next/getLoggedInServerSideProps"

const Crew = () => {
  const { data: player } = useGetPlayer()

  if (!player) {
    return <p>Access denied</p>
  }

  return (
    <>
      <Head>
        <title>Crew - Lost Seas</title>
      </Head>

      <DefaultLayout>
        <>
          <h1 className="text mb-8 font-serif text-3xl">Crew members</h1>

          <div className="py-3bg-transparent stats mt-4 gap-2">
            <div className="stat bg-gray-700">
              <div className="stat-figure text-secondary">
                <MdGroups className="h-11 w-11" />
              </div>
              <div className="stat-title">Crew members</div>
              <div className="stat-value text-2xl">
                {player?.crewMembers.count}
              </div>
            </div>

            <div className="stat bg-gray-700">
              <div className="stat-figure text-secondary">
                <RadialProgressBar
                  percentage={player?.crewMembers.health}
                  className="h-12 w-12"
                />
              </div>
              <div className="stat-title">Health</div>
              <div className="stat-value text-2xl">
                {player?.crewMembers.health}%
              </div>
            </div>

            <div className="stat bg-gray-700">
              <div className="stat-figure text-secondary">
                <RadialProgressBar
                  percentage={player?.crewMembers.mood}
                  className="h-12 w-12"
                />
              </div>
              <div className="stat-title">Mood</div>
              <div className="stat-value text-2xl">
                {player?.crewMembers.mood}%
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-8 lg:flex-row">
            <GiveMedicine />
            <GiveGold />
            <DismissCrewMembers />
          </div>
        </>
      </DefaultLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Crew
