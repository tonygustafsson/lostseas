import { AiOutlineCalendar } from "react-icons/ai"
import { BiFemaleSign, BiMaleSign, BiTime } from "react-icons/bi"
import { FaCoins } from "react-icons/fa"
import { GiPirateCoat, GiProgression } from "react-icons/gi"

import Flag from "@/components/icons/Flag"
import DefaultLayout from "@/components/layouts/default"
import ChangeCharacterButton from "@/components/status/ChangeCharacterButton"
import { NATIONS } from "@/constants/locations"
import { convertDaysToTimeSpan, getCurrentDate } from "@/utils/date"
import { getLoggedInPlayer } from "@/utils/next/getLoggedInServerSidePropsApp"
import { getScore } from "@/utils/score"

export const metadata = {
  title: "Status",
}

export default async function Page() {
  const player = await getLoggedInPlayer()

  if (!player) {
    return <p>Access denied</p>
  }

  const currentDate = getCurrentDate(player.character.day || 0)

  return (
    <DefaultLayout>
      <h1 className="text mb-6 font-serif text-3xl">Status</h1>

      <div className="card mt-8 w-full rounded-md bg-gray-800 shadow-lg">
        <div className="card-body p-6">
          <h2 className="card-title font-serif text-3xl font-normal">
            {player.character.name}
          </h2>

          <div className="stats mt-4 gap-2 py-3">
            <div className="stat bg-gray-700">
              <div className="stat-figure text-secondary">
                <GiPirateCoat className="h-8 w-8" />
              </div>
              <div className="stat-title">Title</div>
              <div className="stat-value">{player.character.title}</div>
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
              <div className="stat-value">{player.character.age}</div>
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
              <div className="stat-value">{player.character.gender}</div>
            </div>
          </div>

          <div className="card-actions mb-4 justify-end">
            <ChangeCharacterButton />
          </div>

          <div className="stats mt-4 gap-2 py-3">
            <div className="stat bg-gray-700">
              <div className="stat-figure text-secondary">
                <Flag
                  nation={player.character.nationality}
                  size={32}
                  className="opacity-[0.8]"
                />
              </div>
              <div className="stat-title">Nationality</div>
              <div className="stat-value">{player.character.nationality}</div>
            </div>

            <div className="stat bg-gray-700">
              <div className="stat-figure text-secondary">
                <Flag
                  nation={NATIONS[player.character.nationality].warWith}
                  size={32}
                  className="opacity-[0.8]"
                />
              </div>
              <div className="stat-title">War with</div>
              <div className="stat-value">
                {NATIONS[player.character.nationality].warWith}
              </div>
            </div>
          </div>

          <div className="stats mt-4 gap-2 py-3">
            <div className="stat bg-gray-700">
              <div className="stat-figure text-secondary">
                <FaCoins className="h-8 w-8" />
              </div>
              <div className="stat-title">Gold</div>
              <div className="stat-value">{player.character.gold}</div>
            </div>

            {player.character.account && (
              <div className="stat bg-gray-700">
                <div className="stat-figure text-secondary">
                  <FaCoins className="h-8 w-8" />
                </div>
                <div className="stat-title">Bank account</div>
                <div className="stat-value">{player.character.account}</div>
              </div>
            )}

            {player.character.loan && (
              <div className="stat bg-gray-700">
                <div className="stat-figure text-secondary">
                  <FaCoins className="h-8 w-8" />
                </div>
                <div className="stat-title">Bank loan</div>
                <div className="stat-value">{player.character.loan}</div>
              </div>
            )}
          </div>

          <div className="stats mt-4 gap-2 py-3">
            <div className="stat bg-gray-700">
              <div className="stat-figure text-secondary">
                <AiOutlineCalendar className="h-8 w-8" />
              </div>
              <div className="stat-title">Has been playing for</div>
              <div className="stat-value">
                {convertDaysToTimeSpan(player.character.day)}
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
              <h3 className="mt-4 font-serif text-2xl">Battles</h3>

              <div className="stats mt-2 gap-2 py-3">
                {Object.entries(player.character.battles).map(
                  ([nation, { won, lost }]) => (
                    <div key={`battles-${nation}`} className="stat bg-gray-700">
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
  )
}
