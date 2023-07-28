import { GetServerSideProps } from "next"
import Head from "next/head"
import { AiOutlineCalendar } from "react-icons/ai"
import { BiFemaleSign, BiMaleSign, BiTime } from "react-icons/bi"
import { FaCoins } from "react-icons/fa"
import { GiPirateCoat, GiProgression } from "react-icons/gi"

import ChangeCharacterForm from "@/components/ChangeCharacterForm"
import Flag from "@/components/icons/Flag"
import DefaultLayout from "@/components/layouts/default"
import { useModal } from "@/components/ui/Modal/context"
import { NATIONS } from "@/constants/locations"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { convertDaysToTimeSpan, getCurrentDate } from "@/utils/date"
import { getLoggedInServerSideProps } from "@/utils/next/getLoggedInServerSideProps"
import { getScore } from "@/utils/score"

const Status = () => {
  const { data: player } = useGetPlayer()
  const { setModal } = useModal()

  const currentDate = getCurrentDate(player?.character.day || 0)

  const openCharacterEditModal = () => {
    setModal({
      id: "editCharacter",
      title: "Change your character",
      content: <ChangeCharacterForm />,
    })
  }

  if (!player) {
    return <p>Access denied</p>
  }

  return (
    <>
      <Head>
        <title>Status - Lost Seas</title>
      </Head>

      <DefaultLayout>
        <h1 className="text-3xl font-serif text mb-6">Status</h1>

        <div className="card w-full bg-gray-800 shadow-lg mt-8 rounded-md">
          <div className="card-body p-6">
            <h2 className="card-title text-3xl font-normal font-serif">
              {player?.character.name}
            </h2>

            <div className="stats py-3 gap-2 mt-4">
              <div className="stat bg-gray-700">
                <div className="stat-figure text-secondary">
                  <GiPirateCoat className="h-8 w-8" />
                </div>
                <div className="stat-title">Title</div>
                <div className="stat-value">{player?.character.title}</div>
              </div>

              <div className="stat bg-gray-700">
                <div className="stat-figure text-secondary">
                  <GiProgression className="h-8 w-8" />
                </div>
                <div className="stat-title">Score</div>
                <div className="stat-value">{getScore(player)}</div>
              </div>

              <div className="stat bg-gray-700">
                <div className="stat-figure text-secondary">
                  <BiTime className="h-8 w-8" />
                </div>
                <div className="stat-title">Age</div>
                <div className="stat-value">{player?.character.age}</div>
              </div>

              <div className="stat bg-gray-700">
                <div className="stat-figure text-secondary">
                  {player.character.gender === "Male" ? (
                    <BiMaleSign className="h-8 w-8" />
                  ) : (
                    <BiFemaleSign className="h-8 w-8" />
                  )}
                </div>
                <div className="stat-title">Gender</div>
                <div className="stat-value">{player?.character.gender}</div>
              </div>
            </div>

            <div className="card-actions justify-end mt-4">
              <button
                onClick={openCharacterEditModal}
                className="btn btn-primary btn-sm"
              >
                Change
              </button>
            </div>

            <div className="stats py-3 gap-2 mt-4">
              <div className="stat bg-gray-700">
                <div className="stat-figure text-secondary">
                  <Flag
                    nation={player?.character.nationality}
                    size={32}
                    className="opacity-[0.8]"
                  />
                </div>
                <div className="stat-title">Nationality</div>
                <div className="stat-value">
                  {player?.character.nationality}
                </div>
              </div>

              <div className="stat bg-gray-700">
                <div className="stat-figure text-secondary">
                  <Flag
                    nation={NATIONS[player?.character.nationality].warWith}
                    size={32}
                    className="opacity-[0.8]"
                  />
                </div>
                <div className="stat-title">War with</div>
                <div className="stat-value">
                  {NATIONS[player?.character.nationality].warWith}
                </div>
              </div>
            </div>

            <div className="stats py-3 gap-2 mt-4">
              <div className="stat bg-gray-700">
                <div className="stat-figure text-secondary">
                  <FaCoins className="h-8 w-8" />
                </div>
                <div className="stat-title">Gold</div>
                <div className="stat-value">{player?.character.gold}</div>
              </div>

              {player?.character.account && (
                <div className="stat bg-gray-700">
                  <div className="stat-figure text-secondary">
                    <FaCoins className="h-8 w-8" />
                  </div>
                  <div className="stat-title">Bank account</div>
                  <div className="stat-value">{player?.character.account}</div>
                </div>
              )}

              {player?.character.loan && (
                <div className="stat bg-gray-700">
                  <div className="stat-figure text-secondary">
                    <FaCoins className="h-8 w-8" />
                  </div>
                  <div className="stat-title">Bank loan</div>
                  <div className="stat-value">{player?.character.loan}</div>
                </div>
              )}
            </div>

            <div className="stats py-3 gap-2 mt-4">
              <div className="stat bg-gray-700">
                <div className="stat-figure text-secondary">
                  <AiOutlineCalendar className="h-8 w-8" />
                </div>
                <div className="stat-title">Has been playing for</div>
                <div className="stat-value">
                  {convertDaysToTimeSpan(player?.character.day)}
                </div>
              </div>

              <div className="stat bg-gray-700">
                <div className="stat-figure text-secondary">
                  <AiOutlineCalendar className="h-8 w-8" />
                </div>
                <div className="stat-title">Current date</div>
                <div className="stat-value">{currentDate}</div>
              </div>
            </div>

            {player.character.battles && (
              <>
                <h3 className="font-serif text-2xl mt-4">Battles</h3>

                <div className="stats py-3 gap-2 mt-2">
                  {Object.entries(player.character.battles).map(
                    ([nation, { won, lost }]) => (
                      <div
                        key={`battles-${nation}`}
                        className="stat bg-gray-700"
                      >
                        <div className="stat-figure text-secondary">
                          <Flag nation={nation as Nation} />
                        </div>
                        <div className="stat-title">
                          {nation === "Pirate" ? "Pirates" : nation}
                        </div>
                        <div className="stat-value">
                          {won || 0} won, {lost || 0} lost
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  getLoggedInServerSideProps(context)

export default Status
