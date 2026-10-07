import Flag from "@/components/icons/Flag"
import { NATIONS } from "@/constants/locations"
import { getMannedCannons } from "@/utils/crew"

type Props = {
  shipMeeting: ShipMeetingState
  crewMembers: CrewMembers["count"]
  cannons: Inventory["cannons"]
  nationality: Character["nationality"]
}

const ShipMeetingContent = ({
  shipMeeting,
  crewMembers,
  cannons,
  nationality,
}: Props) => {
  const mannedCannons = getMannedCannons(crewMembers, cannons)
  const isEnemy = NATIONS[nationality]?.warWith === shipMeeting.nation
  const isAllied = nationality === shipMeeting.nation

  return (
    <>
      <h1 className="mb-3 font-serif text-2xl">Sail ho!</h1>

      <p className="mb-3 text-base">
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

      <p className="text-base">
        You have {mannedCannons} manned cannons and {crewMembers} crew members.
      </p>
    </>
  )
}

export default ShipMeetingContent
