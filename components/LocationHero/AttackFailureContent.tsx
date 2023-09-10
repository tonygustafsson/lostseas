const MESSAGES = [
  "Amidst the deafening roar of enemy cannons and the ominous splintering of our once-proud mast, our valiant vessel succumbed to the relentless onslaught, its fate sealed on the unforgiving waters.",
  "As our sails sagged and the relentless enemy onslaught continued, our gallant ship found itself overwhelmed, defeated by a foe whose determination proved insurmountable.",
  "In the midst of chaos and despair, our majestic vessel succumbed to the merciless enemy's firepower, its once-mighty form now a battered and broken testament to our defeat on the open seas.",
  "Despite our crew's unwavering resolve, our formidable ship faltered and fell before the relentless assault of the enemy, its tattered flag a symbol of our painful defeat at sea.",
  "With our cannons silenced and our hull breached, our noble ship was vanquished by a foe whose cunning strategy left us no choice but to surrender on the unforgiving waters. ",
  "Amidst the smoke and chaos, our grand vessel's defiance dwindled, ultimately yielding to the relentless adversary, our once-proud banner lowered in defeat.",
  "Despite our valiant efforts, our illustrious ship was outmaneuvered and outgunned, forced to admit defeat as the enemy's triumphant cheers echoed across the open seas.",
  "In the face of overwhelming odds, our gallant ship met its tragic end, the victorious enemy leaving no doubt as they claimed their supremacy on the high seas.",
  "With our once-proud masts shattered and our crew in disarray, our formidable vessel was defeated by a relentless enemy, our colors struck in surrender on the open waters.",
  "As the relentless enemy onslaught continued, our noble ship's fate was sealed, its once-undefeated crew humbled by the bitter taste of defeat on the unforgiving seas.",
  "Despite our unwavering courage, our majestic ship could not withstand the unyielding assault of the enemy, its final moments marked by a resounding defeat at sea.",
  "Amidst the chaos and devastation, our valiant vessel fell prey to the relentless enemy's superior strategy, its proud flag lowered in a heartbreaking defeat on the open waters.",
  "With our cannons silenced and our sails in tatters, our gallant ship was overcome by the unyielding adversary, its once-proud crew forced to concede defeat on the unforgiving seas.",
  "Despite our crew's fierce determination, our formidable vessel succumbed to the unrelenting enemy assault, our defeat at sea echoing across the waves.",
  "In the face of overwhelming odds, our noble ship met its tragic end, the victorious enemy laying claim to their supremacy on the high seas.",
  "With our once-proud mast shattered and our crew in disarray, our illustrious ship was defeated by the relentless enemy, our colors struck in surrender on the open waters.",
  "Despite our valiant efforts, our majestic ship was outmaneuvered and outgunned, forced to admit defeat as the enemy's triumphant cheers echoed across the open seas.",
  "As the relentless enemy onslaught continued, our grand vessel's defiance dwindled, ultimately yielding to the relentless adversary, our once-proud banner lowered in defeat.",
  "Amidst the smoke and chaos, our formidable ship faltered and fell before the relentless assault of the enemy, its tattered flag a symbol of our painful defeat at sea.",
  "Despite our crew's unwavering resolve, our gallant ship found itself overwhelmed, defeated by a foe whose determination proved insurmountable on the unforgiving waters.",
]

const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]

const AttackFailureContent = () => (
  <>
    <h1 className="font-serif mb-4 text-3xl lg:text-5xl">Battle lost!</h1>

    <div className="lg:mb-5 text-sm">
      <p className="mb-4">{randomMessage} </p>
    </div>
  </>
)

export default AttackFailureContent
