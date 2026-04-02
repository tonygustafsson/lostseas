"use client"

import { AiOutlineCalendar } from "react-icons/ai"
import { BiFemaleSign, BiMaleSign, BiTime } from "react-icons/bi"
import { FaCoins } from "react-icons/fa"
import { GiPirateCoat, GiProgression } from "react-icons/gi"

import Flag from "@/components/icons/Flag"
import ChangeCharacterButton from "@/components/status/ChangeCharacterButton"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NATIONS } from "@/constants/locations"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { convertDaysToTimeSpan, getCurrentDate } from "@/utils/date"
import { getScore } from "@/utils/score"

export const metadata = {
  title: "Status",
}

export default function CharacterInfo() {
  const { data: player } = useGetPlayer()

  if (!player) {
    return null
  }

  const currentDate = getCurrentDate(player.character.day || 0)

  return (
    <Card className="mt-8 w-full">
      <CardHeader>
        <CardTitle className="font-serif text-3xl font-normal">
          {player.character.name}
        </CardTitle>
        <CardAction>
          <ChangeCharacterButton />
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
            <div>
              <div className="text-muted-foreground text-sm">Title</div>
              <div className="mt-1 text-lg font-semibold">
                {player.character.title}
              </div>
            </div>
            <GiPirateCoat className="h-8 w-8 text-yellow-400" />
          </div>

          <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
            <div>
              <div className="text-muted-foreground text-sm">Score</div>
              <div className="mt-1 text-lg font-semibold">
                {getScore(player)}
              </div>
            </div>
            <GiProgression className="h-8 w-8 text-yellow-400" />
          </div>

          <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
            <div>
              <div className="text-muted-foreground text-sm">Age</div>
              <div className="mt-1 text-lg font-semibold">
                {player.character.age}
              </div>
            </div>
            <BiTime className="h-8 w-8 text-yellow-400" />
          </div>

          <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
            <div>
              <div className="text-muted-foreground text-sm">Gender</div>
              <div className="mt-1 text-lg font-semibold">
                {player.character.gender}
              </div>
            </div>
            {player.character.gender === "Male" ? (
              <BiMaleSign className="h-8 w-8 text-yellow-400" />
            ) : (
              <BiFemaleSign className="h-8 w-8 text-yellow-400" />
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
            <div>
              <div className="text-muted-foreground text-sm">Nationality</div>
              <div className="mt-1 text-lg font-semibold">
                {player.character.nationality}
              </div>
            </div>
            <Flag
              nation={player.character.nationality}
              size={32}
              className="opacity-80"
            />
          </div>

          <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
            <div>
              <div className="text-muted-foreground text-sm">War with</div>
              <div className="mt-1 text-lg font-semibold">
                {NATIONS[player.character.nationality].warWith}
              </div>
            </div>
            <Flag
              nation={NATIONS[player.character.nationality].warWith}
              size={32}
              className="opacity-80"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
            <div>
              <div className="text-muted-foreground text-sm">Gold</div>
              <div className="mt-1 text-lg font-semibold">
                {player.character.gold}
              </div>
            </div>
            <FaCoins className="h-8 w-8 text-yellow-400" />
          </div>

          {player.character.account && (
            <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
              <div>
                <div className="text-muted-foreground text-sm">
                  Bank account
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {player.character.account}
                </div>
              </div>
              <FaCoins className="h-8 w-8 text-yellow-400" />
            </div>
          )}

          {player.character.loan && (
            <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
              <div>
                <div className="text-muted-foreground text-sm">Bank loan</div>
                <div className="mt-1 text-lg font-semibold">
                  {player.character.loan}
                </div>
              </div>
              <FaCoins className="h-8 w-8 text-yellow-400" />
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
            <div>
              <div className="text-muted-foreground text-sm">
                Has been playing for
              </div>
              <div className="mt-1 text-lg font-semibold">
                {convertDaysToTimeSpan(player.character.day)}
              </div>
            </div>
            <AiOutlineCalendar className="h-8 w-8 text-yellow-400" />
          </div>

          <div className="flex items-center justify-between rounded-md bg-gray-800 p-4">
            <div>
              <div className="text-muted-foreground text-sm">Current date</div>
              <div className="mt-1 text-lg font-semibold">{currentDate}</div>
            </div>
            <AiOutlineCalendar className="h-8 w-8 text-yellow-400" />
          </div>
        </div>

        {player.character.battles && (
          <>
            <h3 className="mt-6 font-serif text-2xl">Battles</h3>

            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(player.character.battles).map(
                ([nation, { won, lost }]) => (
                  <div
                    key={`battles-${nation}`}
                    className="flex items-center justify-between rounded-md bg-gray-800 p-4"
                  >
                    <div>
                      <div className="text-muted-foreground text-sm">
                        {nation === "Pirate" ? "Pirates" : nation}
                      </div>
                      <div className="mt-1 text-lg font-semibold">
                        {won || 0} won, {lost || 0} lost
                      </div>
                    </div>
                    <Flag nation={nation as Nation} size={32} />
                  </div>
                )
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
