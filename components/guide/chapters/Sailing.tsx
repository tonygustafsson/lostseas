import GuideChapter from "../GuideChapter"
import GuideTip from "../GuideTip"

const Sailing = () => (
  <GuideChapter
    id="sailing"
    lead="Point at a town, let the wind do the rest, and deal with whoever turns up on the horizon."
    image={{
      src: "/img/location/havana/city-hall.png",
      alt: "The city hall in Havana",
    }}
  >
    <p>
      Press Set sail at the harbour, or Travel in the bottom menu on a phone, to
      open the map. Pick a town and you see how far it is, in days and
      kilometres, and what the trip needs. A voyage takes as long in either
      direction. Towns your supplies won&apos;t reach are greyed out. If
      something else is stopping you, the advisor pops up to explain.
    </p>

    <h3>Time</h3>

    <p>
      Time passes in days. Each day of sailing moves the calendar on by one, and
      so does arriving. Setting off and wandering around town are free, so shop
      as long as you like.
    </p>

    <p>
      Your ship sails on by itself, one day at a time, until another ship comes
      into view. Deal with it, press Continue journey, and off you go. Sailing
      on after a meeting costs no extra day or supplies. If it happened on the
      last day, you sail straight into port.
    </p>

    <h3>Weather</h3>

    <p>
      The weather can turn from one day at sea to the next, from sunshine to
      rain and the odd morning of thick fog. Whatever sky you sail in under is
      the one you find in port, and it stays until you set sail again. You can
      see it over the harbour and on the sea map. It&apos;s purely for show.
      Storms don&apos;t slow you down, and sunshine doesn&apos;t make the crew
      any less grumpy.
    </p>

    <h3>Who you&apos;ll meet</h3>

    <p>
      Out on the open sea any flag is as likely as the next, pirates included.
      On the last day of a voyage, most ships belong to your destination&apos;s
      nation.
    </p>

    <GuideTip>
      Hunting a particular nation&apos;s ships? Sail towards one of its towns.
    </GuideTip>

    <p>
      Most ships let you choose to attack or sail on by. Some come at you
      instead. Your own nation never attacks you, but enemies and pirates often
      will, and the others now and then. You can&apos;t ignore an attacker.
      Fight back or try to flee. Fleeing usually works, and when it
      doesn&apos;t, the battle starts anyway.
    </p>
  </GuideChapter>
)

export default Sailing
