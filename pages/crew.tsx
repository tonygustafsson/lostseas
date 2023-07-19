import { GetServerSideProps } from "next"
import Head from "next/head"
import { FaUsers } from "react-icons/fa"

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
          <h1 className="text-3xl font-serif text mb-8">Crew members</h1>

          <div className="stats bg-transparent gap-2 mt-4">
            <div className="stat bg-gray-700">
              <div className="stat-figure text-secondary">
                <FaUsers className="h-10 w-10" />
              </div>
              <div className="stat-title">Count</div>
              <div className="stat-value text-2xl">
                {player?.crewMembers.count}
              </div>
            </div>

            <div className="stat bg-gray-700">
              <div className="stat-figure text-secondary">
                <RadialProgressBar
                  percentage={player?.crewMembers.health}
                  className="w-12 h-12"
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
                  className="w-12 h-12"
                />
              </div>
              <div className="stat-title">Mood</div>
              <div className="stat-value text-2xl">
                {player?.crewMembers.mood}%
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 pt-8">
            <GiveMedicine />
            <GiveGold />
          </div>
        </>
      </DefaultLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Crew
