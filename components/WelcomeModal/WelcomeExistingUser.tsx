type Props = {
  player: Player
  onClose: () => void
}

const WelcomeExistingUser = ({ player, onClose }: Props) => (
  <>
    <p>
      Nice to see you again. You are located at {player.character.town}s{" "}
      {player.character.location}.
    </p>

    <button className="btn btn-primary w-full mt-4" onClick={onClose}>
      Start exploring
    </button>
  </>
)

export default WelcomeExistingUser
