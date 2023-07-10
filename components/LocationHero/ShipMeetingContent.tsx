import { getMannedCannons } from "@/utils/crew"

import Flag from "../icons/Flag"

type Props = {
  shipMeeting: ShipMeetingState
  crewMembers: CrewMembers["count"]
  cannons: Inventory["cannons"]
}

const ShipMeetingContent = ({ shipMeeting, crewMembers, cannons }: Props) => {
  const mannedCannons = getMannedCannons(crewMembers, cannons)

  return (
    <>
      <h1 className="font-serif mb-4 text-3xl lg:text-5xl">Sail ho!</h1>

      <div className="lg:mb-5 text-sm">
        <p className="text-2xl mb-4 font-serif">
          {shipMeeting.nation === "Pirate" && (
            <>
              You meet a{" "}
              <Flag nation={shipMeeting.nation} className="inline-block mx-1" />{" "}
              {shipMeeting.nation} {shipMeeting.shipType}.
            </>
          )}
          {shipMeeting.nation !== "Pirate" && (
            <>
              You meet a {shipMeeting.shipType} from{" "}
              <Flag nation={shipMeeting.nation} className="inline-block mx-1" />{" "}
              {shipMeeting?.nation}.
            </>
          )}{" "}
          It has {shipMeeting?.cannons} cannons and {shipMeeting?.crewMembers}{" "}
          crew members.
        </p>

        <p className="text-lg font-serif">
          You have {mannedCannons} manned cannons and {crewMembers} crew
          members.
        </p>
      </div>
    </>
  )
}

export default ShipMeetingContent
