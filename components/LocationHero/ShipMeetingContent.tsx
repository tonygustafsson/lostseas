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
      <h1 className="mb-4 font-serif text-3xl lg:text-5xl">Sail ho!</h1>

      <div className="text-sm lg:mb-5">
        <p className="mb-4 font-serif text-2xl">
          {shipMeeting.nation === "Pirate" && (
            <>
              You meet a{" "}
              <Flag nation={shipMeeting.nation} className="mx-1 inline-block" />{" "}
              {shipMeeting.nation} {shipMeeting.shipType}.
            </>
          )}
          {shipMeeting.nation !== "Pirate" && (
            <>
              You meet a {shipMeeting.shipType} from{" "}
              <Flag nation={shipMeeting.nation} className="mx-1 inline-block" />{" "}
              {shipMeeting?.nation}.
            </>
          )}{" "}
          It has {shipMeeting?.cannons} cannons and {shipMeeting?.crewMembers}{" "}
          crew members.
        </p>

        <p className="font-serif text-lg">
          You have {mannedCannons} manned cannons and {crewMembers} crew
          members.
        </p>
      </div>
    </>
  )
}

export default ShipMeetingContent
