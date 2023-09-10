const MESSAGES = [
  "Amidst billowing sails and roaring cannons, our majestic vessel outmaneuvered and outgunned the enemy fleet, securing a triumphant victory on the high seas.",
  "Beneath the unforgiving sun, our mighty ship prevailed against the adversary's fleet, claiming victory amidst cannon fire and billowing sails.",
  "With the wind in our favor and cannons ablaze, our gallant vessel triumphed over the opposing armada, asserting our dominance at sea.",
  "Amidst the relentless waves, our formidable ship emerged victorious, its cannons roaring in triumph as the enemy fleet surrendered.",
  "Through cunning tactics and fierce determination, our majestic vessel overcame the foe's armada, sealing our glorious conquest on the open waters.",
  "As the battle raged under the vast expanse of the sky, our noble ship outmaneuvered and outgunned the enemy, securing a resounding triumph at sea.",
  "In a symphony of chaos and valor, our grand vessel emerged victorious, its cannons thundering in triumph over the defeated enemy fleet.",
  "Through skillful navigation and unwavering resolve, our illustrious ship vanquished the foe's armada, solidifying our supremacy on the high seas.",
  "Amidst the tumultuous waves and cannon fire, our gallant vessel prevailed, its crew's unwavering courage leading us to a triumphant victory.",
  "With the salt spray in our faces and the enemy in our sights, our majestic ship emerged victorious, its cannons roaring in defiance of the foe.",
  "In a dramatic clash of sails and steel, our formidable vessel bested the adversary's fleet, securing a memorable triumph on the open waters.",
  "In a dramatic maritime showdown, our illustrious ship outwitted and outgunned the enemy flotilla, emerging victorious amidst the thunderous roar of cannons and snapping sails.",
  "Through a relentless barrage of cannon fire and the sheer might of our majestic vessel, we overcame the enemy fleet, securing an emphatic triumph on the open seas.",
  "As the sea raged around us, our gallant ship's crew fought with unmatched valor, leading us to a glorious victory against the adversary's armada.",
  "Amidst the rolling waves and plumes of smoke, our formidable vessel bested the opposing fleet, leaving no doubt as to our dominance on the high seas.",
  "With unwavering resolve and a thunderous volley of cannon fire, our noble ship prevailed against the enemy, marking our triumph on the open waters.",
  "In a heart-pounding clash of maritime might, our grand vessel emerged victorious, its cannons resounding in triumph over the defeated enemy flotilla.",
  "Through a symphony of chaos and courage, our majestic ship overcame the foe's armada, securing our triumphant conquest on the open seas.",
  "Amidst the salty spray and the enemy's desperate resistance, our valiant vessel prevailed, its cannons thundering in victory as the foe's colors struck.",
  "With the wind in our favor and the enemy fleet in disarray, our illustrious ship sailed to triumph, its resounding victory echoing across the open waters.",
]

const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]

const AttackSuccessContent = () => (
  <>
    <h1 className="font-serif mb-4 text-3xl lg:text-5xl">Battle won!</h1>

    <div className="lg:mb-5 text-sm">
      <p className="mb-4">{randomMessage} </p>
    </div>
  </>
)

export default AttackSuccessContent
