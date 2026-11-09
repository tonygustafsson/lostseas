import GuideChapter from "../GuideChapter"
import GuideTip from "../GuideTip"

const Account = () => (
  <GuideChapter
    id="account"
    lead="No email, no password. Just a few ways to prove you're the captain you say you are."
  >
    <p>
      When you create a captain, your browser remembers you. That&apos;s handy
      until you clear your browser data or pick up a different device. To sign
      in again, you need one of these. Find them all in Settings.
    </p>

    <ul>
      <li>
        <strong>Passkey.</strong> The easiest option. Your phone or computer
        unlocks your captain with a fingerprint, face or PIN. No password to
        remember, none to lose.
      </li>
      <li>
        <strong>User ID.</strong> The key to your captain. Copy it somewhere
        safe and paste it in on the start page.
      </li>
      <li>
        <strong>QR code.</strong> Settings shows your ID as a QR code. Save or
        photograph it, then scan it with your camera on the start page to sign
        in on another device.
      </li>
    </ul>

    <GuideTip variant="warning">
      Your user ID is the whole key. Anyone with it can sail your ships, so
      don&apos;t post it in the tavern.
    </GuideTip>

    <h3>Several captains on one device</h3>

    <p>
      Every captain you play is remembered on this device. When you sign out
      they stay on the start page with their portrait and name, so switching
      takes one tap. Captains with a passkey ask for it first. Forgetting a
      captain only removes them from this device, it doesn&apos;t delete them.
    </p>

    <h3>Starting over</h3>

    <p>
      Settings also lets you reset your game and begin again as a fresh Pirate.
      That one can&apos;t be undone, so be sure.
    </p>
  </GuideChapter>
)

export default Account
