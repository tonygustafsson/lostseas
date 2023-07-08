import Flag from "../icons/Flag"

type Props = {
  shipMeeting: ShipMeetingState
}

const ShipMeetingContent = ({ shipMeeting }: Props) => (
  <>
    <h1 className="font-serif mb-4 text-3xl lg:text-5xl">Sail ho!</h1>

    <div className="lg:mb-5 text-sm">
      <p className="text-2xl mb-4 font-serif">
        You meet a {shipMeeting.shipType} from{" "}
        <Flag nation={shipMeeting.nation} className="inline-block mx-1" />{" "}
        {shipMeeting?.nation}. It has {shipMeeting?.cannons} cannons and{" "}
        {shipMeeting?.crewMembers} crew members.
      </p>
    </div>
  </>
)

export default ShipMeetingContent
