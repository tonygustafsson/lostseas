import { GetServerSideProps } from "next"
import { BsHeartPulseFill } from "react-icons/bs"
import { FaUsers } from "react-icons/fa"
import { TbMoodSmileBeam } from "react-icons/tb"

import GiveDoubloons from "@/components/crew/GiveDoubloons"
import GiveMedicine from "@/components/crew/GiveMedicine"
import DefaultLayout from "@/components/layouts/default"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getLoggedInServerSideProps } from "@/utils/next/getLoggedInServerSideProps"

const Crew = () => {
  const { data: player } = useGetPlayer()

  return (
    <DefaultLayout>
      <>
        <h1 className="text-3xl font-serif text mb-8">Crew members</h1>
        <div className="stats bg-transparent gap-2 mt-4">
          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <FaUsers className="h-8 w-8" />
            </div>
            <div className="stat-title">Count</div>
            <div className="stat-value text-2xl">
              {player?.crewMembers.count}
            </div>
          </div>

          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <BsHeartPulseFill className="h-8 w-8" />
            </div>
            <div className="stat-title">Health</div>
            <div className="stat-value text-2xl">
              {player?.crewMembers.health}
            </div>
          </div>

          <div className="stat bg-gray-700">
            <div className="stat-figure text-secondary">
              <TbMoodSmileBeam className="h-8 w-8" />
            </div>
            <div className="stat-title">Mood</div>
            <div className="stat-value text-2xl">
              {player?.crewMembers.mood}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-8 justify-center">
          <GiveMedicine />
          <GiveDoubloons />
        </div>
      </>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Crew
