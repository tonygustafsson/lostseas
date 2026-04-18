import Flag from "@/components/icons/Flag"
import { Separator } from "@/components/ui/separator"
import { NATIONS } from "@/constants/locations"
import { getMannedCannons } from "@/utils/crew"

import JourneyProgress from "./JourneyProgress"

type Props = {
  shipMeeting: ShipMeetingState
  crewMembers: CrewMembers["count"]
  cannons: Inventory["cannons"]
  journey: Character["journey"]
  day: Character["day"]
  nationality: Character["nationality"]
}

const ShipMeetingContent = ({
  shipMeeting,
  crewMembers,
  cannons,
  journey,
  day,
  nationality,
}: Props) => {
  const mannedCannons = getMannedCannons(crewMembers, cannons)
  const isEnemy = NATIONS[nationality]?.warWith === shipMeeting.nation
  const isAllied = nationality === shipMeeting.nation

  return (
    <>
      <h1 className="mb-4 font-serif text-3xl lg:text-5xl">Sail ho!</h1>

      <p className="mb-4 text-2xl">
        {shipMeeting.nation === "Pirate" && (
          <>
            You meet a{" "}
            <Flag nation={shipMeeting.nation} className="mx-1 inline-block" />{" "}
            {shipMeeting.nation} {shipMeeting.shipType}.
          </>
        )}
        {shipMeeting.nation !== "Pirate" && (
          <>
            You meet {isEnemy && <span className="text-red-400">an enemy</span>}
            {isAllied && <span className="text-green-400">an allied</span>}{" "}
            {shipMeeting.shipType} from{" "}
            <Flag nation={shipMeeting.nation} className="mx-1 inline-block" />{" "}
            {shipMeeting?.nation}.
          </>
        )}
        <br />
        It has {shipMeeting?.cannons} cannons and {shipMeeting?.crewMembers}{" "}
        crew members.
      </p>

      <p>
        You have {mannedCannons} manned cannons and {crewMembers} crew members.
      </p>

      <Separator className="my-4 lg:my-6" />

      <JourneyProgress
        journey={journey}
        day={day}
        titleClass="text-xl! font-sans! lg:text-2xl!"
      />
    </>
  )
}

export default ShipMeetingContent
