type Props = {
  player: Player
  onClose: () => void
}

const WelcomeNewUser = ({ player, onClose }: Props) => (
  <>
    <p>
      Nice to see you again. You are located at {player.character.town}s{" "}
      {player.character.location}. You can either check out the town, or head
      out to the open seas.
    </p>

    <button className="btn btn-primary w-full mt-4" onClick={onClose}>
      Start exploring
    </button>
  </>
)

export default WelcomeNewUser
