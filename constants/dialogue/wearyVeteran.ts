import "server-only"

export const WEARY_VETERAN: DialogueEntry[] = [
  {
    id: "wearyVeteran-1",
    text: "Sit down, {title}. Mind the chair, the left leg is held on with tallow and prayer. Same as the garrison.",
  },
  {
    id: "wearyVeteran-2",
    text: "Twenty years I carried a pike for my country. Now I carry ink. The pike was lighter, {title}. Do you know what they want from me this month?",
    answers: [
      {
        text: "More taxes?",
        replies: [
          "More taxes, fewer soldiers and a full report on why the taxes are late. The report is late too, naturally.",
          "Always more taxes. They seem to think pieces of eight grow on the palms here like coconuts.",
          "Taxes, yes. On {merchandise}, on anchorage, on breathing if a clerk at home thinks of it first.",
          "You have been a governor before, haven't you? No? You have the face of a man who understands misery.",
          "Taxes and a census of the goats. I am not joking. Someone at court is very interested in goats.",
        ],
      },
      {
        text: "A pike back, by the sound of it.",
        replies: [
          "Ha. If they sent me a pike I would know what to do with it. They send me forms.",
          "Do not tempt me. I keep my old one behind the door for visits from the tax assessor.",
          "I would take it gladly. A pike never asked me to sign anything in triplicate.",
          "You jest, but there are mornings I would trade this whole office for a muddy trench and a cold supper.",
          "The pike went the way of my knees, {title}. Retired and complaining.",
        ],
      },
      {
        text: "Love letters from the queen, surely.",
        replies: [
          "If the court wrote me love letters, they would still arrive six months late and demand a reply by return post.",
          "The only love in my letters is between the clerks and their seals. Seven seals on a letter about rope.",
          "Very good. I will have that read into the minutes, under 'insolence, mild'.",
          "Hm. The last letter from home I did kiss, as it happens. It said they were sending money. It lied.",
          "You have a mouth on you. I had sergeants like you. Most of them died laughing, one way or another.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-3",
    text: "The orders I received this morning were written in {month} of last year. They tell me to prepare for a war that has already happened.",
  },
  {
    id: "wearyVeteran-4",
    text: "Half my garrison has the fever and the other half is pretending to have it. I cannot blame them. I would pretend too, if anyone would let me.",
  },
  {
    id: "wearyVeteran-5",
    text: "Tell me honestly, {title}. Have you seen {enemyAdjective} sails on your way to {town}?",
    answers: [
      {
        text: "Yes, a few, off the coast.",
        replies: [
          "Of course you did. I will write it down and send it home, and they will read it next spring.",
          "How many guns? Never mind. More than we have, whatever the answer.",
          "Thank you. That is more intelligence than I have had from my own scouts in a month.",
          "Then I will double the watch. Which means waking the one sober man and asking him to look twice.",
          "Hm. They are probing. They did the same before the last raid on {nationTown}. I remember the smoke.",
        ],
      },
      {
        text: "Not a single one.",
        replies: [
          "Good. Or bad. They are either gone or hiding, and in my experience they are never gone.",
          "Quiet seas worry me more than busy ones. Busy means trade. Quiet means someone is planning something.",
          "I will take it. Let me have one calm week to drown in paperwork in peace.",
          "Then you were lucky, or blind. I will assume lucky. It is less work.",
          "Splendid. I shall report that the enemy has fled in terror of my correspondence.",
        ],
      },
      {
        text: "I sank them all. Single-handed. Before breakfast.",
        replies: [
          "Before breakfast. Then you have had a better morning than I have. I spilt ink on a treaty.",
          "Marvellous. Put it in writing and I will send it home. They believe anything with a seal on it.",
          "I once met a man who claimed he took a galleon with a rowing boat and a stern look. He is buried by the chapel.",
          "Did you, now. And I am the Pope's favourite nephew. Sit down, {title}.",
          "If that were true I would kiss you on both cheeks and resign on the spot. Sadly, I can see your ship.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-6",
    text: "My predecessor left me three things. A leaking roof, a gambling debt and a parrot that only swears in {enemyAdjective}. Guess which one I kept?",
    answers: [
      {
        text: "The parrot.",
        replies: [
          "Correct. The roof leaked on me, the debt chased me and the parrot at least insults the right people.",
          "The parrot. It is the only member of my staff who speaks its mind.",
          "Naturally. Every morning it greets me with something unrepeatable about the enemy's mothers. Lifts the spirits.",
          "Yes. I am teaching it our own curses now, so it can be bilingual and twice as rude.",
          "Clever of you. The chaplain wanted it drowned for blasphemy. I told him it was only quoting the enemy.",
        ],
      },
      {
        text: "The gambling debt.",
        replies: [
          "Ha. In a way, yes. The man he owed came to collect, and I am still paying him in cheese.",
          "Not by choice. Debts here are like fevers. They pass to whoever sleeps in the bed next.",
          "Close. I kept it, the debt kept me, and we are both miserable together.",
          "Hm. You have a cruel mind, {title}. You would do well at court.",
          "Debts are the one thing in this colony that arrive on time.",
        ],
      },
      {
        text: "The roof. You look like a man who enjoys being rained on.",
        replies: [
          "Cheek. But fair. I have slept under worse, in Flanders, with less roof and more cannon.",
          "I do not enjoy it. I simply no longer notice. That is the difference between a young man and an old governor.",
          "The roof kept itself. I have written home for tiles four times. They sent a sermon on patience.",
          "Ha. Do I look that damp? It is the climate. Everyone here looks like a drowned sergeant.",
          "Careful. I still have the authority to make you fix it.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-7",
    text: "Do you know what keeps a colony alive, {title}?",
    answers: [
      {
        text: "Trade.",
        replies: [
          "Trade, yes. Every ship that drops anchor here is worth more to me than a letter from court.",
          "Right answer. Soldiers hold the walls, but merchants pay the soldiers. When they remember to.",
          "Trade, and the willingness of honest captains to ignore my customs officers' manners.",
          "Exactly. Bring me {merchandise} and I will forgive you most things. Not everything. Most.",
          "Trade. And luck with the hurricanes. Mostly luck, if I am honest.",
        ],
      },
      {
        text: "Soldiers.",
        replies: [
          "Spoken like someone who has never paid one. Soldiers keep a colony alive until payday.",
          "Soldiers, aye. Fed ones. Unfed soldiers keep nothing alive, least of all themselves.",
          "I was a soldier. I know exactly how much a colony relies on us, and exactly how little it thanks us.",
          "Soldiers help. Walls help more. Walls do not desert to go buccaneering on Hispaniola.",
          "True enough. Though mine spend more time fighting mosquitoes than {enemy}.",
        ],
      },
      {
        text: "Rum. Lots of rum.",
        replies: [
          "Ha. You are not wrong. The garrison would have mutinied years ago without it.",
          "Rum keeps the colony cheerful. It does not keep it alive. Ask the gravedigger. He drinks the most.",
          "I am inclined to agree, which tells you how long I have been here.",
          "If rum could hold a wall, {town} would be the strongest fortress in the world.",
          "Do not say that so loud. The chaplain is next door and he already thinks I am a bad influence.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-8",
    text: "They say Cardinal Richelieu reads every letter in France before the king does. I wish someone would read mine at all.",
  },
  {
    id: "wearyVeteran-9",
    text: "The surgeon tells me to rest. The council tells me to work. The fever tells me to lie down. I listen to the fever. It has the best arguments.",
  },
  {
    id: "wearyVeteran-10",
    text: "What brings you to City hall, {title}? Most people only come here to complain.",
    answers: [
      {
        text: "I came to complain.",
        replies: [
          "Of course you did. Take a number. The number is forty one and I am serving number three.",
          "Good, at least you are honest about it. Go on. I will nod in the right places.",
          "Complaints go in that basket. The basket goes in the fire every Sunday. It warms the room.",
          "Join the queue. The baker, the priest and the harbour master are ahead of you, and they are all complaining about each other.",
          "Wonderful. I collect complaints like other men collect butterflies. Mine just bite harder.",
        ],
      },
      {
        text: "Just paying my respects, governor.",
        replies: [
          "Respects. I have not had any of those since {month}. Thank you, I will put them somewhere safe.",
          "That is kind of you. It is also suspicious. Nobody pays respects without wanting something after.",
          "Respect is cheaper than gold, so it is the only tribute I ever receive. Still, I will take it.",
          "Hm. Sit for a moment, then. It is good to talk to someone who is not asking me for money.",
          "Kindly meant. I am too tired to be gracious about it, but kindly meant.",
        ],
      },
      {
        text: "I heard the wine here is free.",
        replies: [
          "Whoever told you that owes me a bottle. And probably an apology.",
          "The wine here is not free. It is merely unpaid for, which is a different thing entirely.",
          "Free? It came from {otherTown} at a price that made my treasurer weep. You may smell it.",
          "Ha. Nothing in this building is free except advice, and mine is worth about what you pay for it.",
          "Sit down and I will pour you a cup. It is vinegar now. That is the colonies for you.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-11",
    text: "I asked home for two hundred soldiers. They sent forty, a bishop's nephew and a crate of wigs. What would you have done with the wigs?",
    answers: [
      {
        text: "Sold them.",
        replies: [
          "I tried. Nobody here wants a wig in this heat. Except the goats. They ate two.",
          "A merchant's answer. Sadly the only buyer offered me salt pork, and it was older than the wigs.",
          "Hm. I sold one to a planter. He wears it to church and sweats like a boiled pudding.",
          "To whom? The buccaneers? They would wear them in battle and terrify everyone.",
          "Good thinking. I used the money to buy powder. The wigs have done more for defence than the nephew.",
        ],
      },
      {
        text: "Sent the nephew back with them.",
        replies: [
          "I wish I could. He is the bishop's nephew. Sending him back would cost me more than a war.",
          "Ha. If only. He has grown fond of the place. He says the fever builds character.",
          "Then the bishop would send two more nephews. They breed in the cathedral, I swear it.",
          "I suggested it. He cried. He is twenty eight.",
          "Tempting. He is useless with a musket, but he does write a beautiful letter of complaint.",
        ],
      },
      {
        text: "Put them on the cannon to scare {enemy}.",
        replies: [
          "You laugh, but from a distance a bewigged cannon looks very aristocratic. Very threatening.",
          "I have done stranger things. I once dressed a scarecrow as a sergeant and the men saluted it for a week.",
          "Ha. They would think the court had sent its finest gunners. That might frighten them, or make them laugh to death.",
          "Do not give me ideas. I am tired enough to try them.",
          "Not a bad plan. Better than anything the council has offered.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-12",
    text: "Piet Heyn took the whole Spanish silver fleet in 1628 and became a legend. I lost a mule in a card game in {year} and became a joke.",
  },
  {
    id: "wearyVeteran-13",
    text: "The rains are coming, {title}. Have you ever weathered a hurricane at sea?",
    answers: [
      {
        text: "More than one.",
        replies: [
          "Then you know more about God's temper than any priest in {town}.",
          "So have I. On land. It is not better. The roof just leaves you instead of the deck.",
          "Then you have my respect. I spent one tied to a mast as a young fool. I have been afraid of wind ever since.",
          "Good. Keep your anchor deep and your crew sober. Sober is harder.",
          "Hm. You have that look about the eyes. Those who survive one never quite stop listening for the next.",
        ],
      },
      {
        text: "No, and I would prefer to keep it that way.",
        replies: [
          "Wise. Stay in port from August to October and say your prayers to whichever saint answers fastest.",
          "Then keep it that way. Brave men die in hurricanes too, they just look surprised about it.",
          "Sensible. The sea will test you when it likes. No need to send it an invitation.",
          "I had a captain like you once. He prayed so loudly the storm went round him. True story. Mostly.",
          "Very good. The colony cannot afford to lose another honest captain. We are short as it is.",
        ],
      },
      {
        text: "I punched one once. It backed off.",
        replies: [
          "Did it. Then you can have the next one on our coast. I will sign the commission myself.",
          "I believe it. You have the knuckles of a man who loses arguments with walls.",
          "Ha. Last year's took my chapel bell and dropped it in the governor's garden. My garden. I took it personally too.",
          "If only the garrison had your spirit. They hide under the tables when it thunders.",
          "That is the second best lie I have heard today. The best was my treasurer saying the books balance.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-14",
    text: "The garrison eats ship's biscuit so hard it counts as artillery. We could load it in the cannon if we ran short of shot. We have.",
  },
  {
    id: "wearyVeteran-15",
    text: "I hear things are going badly for King Charles with his Parliament. Kings and councils, always quarrelling. Glad I only have one council. It is bad enough.",
  },
  {
    id: "wearyVeteran-16",
    text: "What do they say about {enemy} in the taverns, {title}?",
    answers: [
      {
        text: "That they are coming soon.",
        replies: [
          "They have been coming soon since I arrived. If they ever do, I hope they bring medicine.",
          "The taverns say that every week. The taverns also said the moon was made of cheese last Lent.",
          "Hm. Rumours have a way of being right about one time in ten. I will count it.",
          "Then let them come. My cannon are rusted, but my temper is in excellent working order.",
          "Coming soon. Like my wages. Like the reinforcements. Like rain in a dry season.",
        ],
      },
      {
        text: "That they are cowards.",
        replies: [
          "Do not believe it. I have fought them. They are men like ours, only better fed.",
          "Cowards do not cross an ocean in leaking barrels. They are many things, but not cowards.",
          "The taverns say our side are cowards too, in the taverns at {enemyTown}. It is a sort of trade.",
          "Hm. Underestimate the enemy and you get to meet him much sooner than you planned.",
          "I lost good friends to those cowards. Mind your tongue in my office, {title}.",
        ],
      },
      {
        text: "That their parrots are better looking than ours.",
        replies: [
          "That is a slander and I will not have it. My parrot is magnificent. Moulting, but magnificent.",
          "Ha. Well, their governor's wig certainly is. I have seen it. It has its own servant.",
          "If that becomes official policy I will declare war myself. Again.",
          "Strange, I heard the same about their cannon. The parrots are probably better armed too.",
          "You spend too much time in the taverns, {title}. Though I can hardly blame you.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-17",
    text: "Every new governor arrives with a plan. Then the fever comes, the money does not, and the plan becomes a nice thing to remember in the evenings.",
  },
  {
    id: "wearyVeteran-18",
    text: "My clerk wrote 'the colony is in excellent health' in last year's report. Then he died of dysentery. I have not found a more honest replacement.",
  },
  {
    id: "wearyVeteran-19",
    text: "Have you heard the news from Europe, {title}? I have not, and I am the governor.",
    answers: [
      {
        text: "The war in Germany goes on.",
        replies: [
          "Twenty two years of it now. They will run out of Germans before they run out of reasons.",
          "Of course it does. That war has outlived three of my old officers and both my good boots.",
          "The Thirty Years' War, they will call it, if it ever stops long enough to be counted.",
          "Hm. And every army there needs money. Which means they take it from us. Which means more letters.",
          "I served in it for a time. Mud, plague and generals. In that order of usefulness.",
        ],
      },
      {
        text: "They say Portugal and Catalonia are restless.",
        replies: [
          "Are they? Philip IV must be pulling his hair out. If he has any left, after paying for everything else.",
          "Restless. That is a polite word for 'about to set fire to something'. I know the feeling.",
          "Interesting. If Spain is busy at home, the Caribbean may get a little quieter. Or louder.",
          "Hm. I will write that down. Not that anyone will read it, but it makes me feel informed.",
          "Everyone is restless. Europe is one large tavern brawl that pretends to be politics.",
        ],
      },
      {
        text: "Apparently you have been promoted to admiral.",
        replies: [
          "Have I? Then someone forgot to send me the ship. And the hat. Especially the hat.",
          "Admiral of what, the duck pond behind the fort? It does have a very aggressive goose.",
          "Ha. If they promoted me, it was only to move me somewhere with worse fevers.",
          "I will believe that when the letter arrives, which by my reckoning will be after my funeral.",
          "Do not joke about that. Men have died of hope in this office.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-20",
    text: "The tax collector, the Company, the crown and the church all want a share of every ship in port. By the time they are done, the captain owns the rigging and the rats.",
  },
  {
    id: "wearyVeteran-21",
    text: "I keep a map of the colony on that wall. Every pin is a problem. You cannot see the map any more, {title}. Only pins.",
  },
  {
    id: "wearyVeteran-22",
    text: "Do you sail under a letter of marque, {title}?",
    answers: [
      {
        text: "I do.",
        replies: [
          "Good. Then you are a patriot when you rob {enemy}, and a pirate only if they catch you.",
          "Keep it dry and keep it close. That paper is the only thing between you and a rope.",
          "Then remember whose name is on it. The crown is very generous with paper and very stingy with forgiveness.",
          "Hm. Make sure the ships you take are the right flag. I have hanged men for honest mistakes.",
          "I signed a few in my time. Half of the men who carried them are rich and the other half are skeletons.",
        ],
      },
      {
        text: "No. I am an honest trader.",
        replies: [
          "An honest trader. I have heard of them. Like unicorns and punctual mail ships.",
          "Good. Honest traders pay their duties, which makes them my favourite kind of captain.",
          "Then you are rarer than a sober gunner. Welcome to {town}.",
          "Hm. Honest until the first fat merchantman drifts past. I know the type. I was the type.",
          "Keep it that way. Fewer hangings means less paperwork, and I am drowning in paperwork.",
        ],
      },
      {
        text: "I have a letter from my mother. Does that count?",
        replies: [
          "Depends what she says. If she gives you leave to rob {enemy}, it is more than I have from my masters.",
          "It counts for more than you think. Mothers are crueller to enemies than any admiral.",
          "Ha. Show it to the next {enemyAdjective} frigate and see if they let you go out of embarrassment.",
          "My mother wrote to me once. She asked when I was coming home to marry. I was fifty two.",
          "Keep it. A letter from someone who cares is worth more out here than any commission.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-23",
    text: "The church wants a new bell. The garrison wants new boots. The treasury has enough for a bell or a boot. Singular. What would you buy?",
    answers: [
      {
        text: "The bell.",
        replies: [
          "The priest will love you. The soldiers will march barefoot to church to hear it.",
          "Hm. A bell does warn of fires and raids. Boots only warn of a sergeant coming.",
          "God first, feet second. You would do well with the bishop.",
          "Then I will tell the garrison it was your idea. You will want to leave port quickly.",
          "A sound choice. Ha. Sound. I am too tired for better jokes.",
        ],
      },
      {
        text: "The boot.",
        replies: [
          "One boot. For which soldier? I will have a riot over who gets it.",
          "A soldier's choice. The priest will preach against you on Sunday, mind.",
          "Hm. I could hang the boot in the tower and ring it. It would save money.",
          "Good. Men with sore feet lose battles. Bells with no rope lose nothing.",
          "Practical. I like practical. I rarely see it.",
        ],
      },
      {
        text: "A very large boot, and ring it like a bell.",
        replies: [
          "That is exactly my plan. I am glad someone else is mad enough to see it.",
          "Ha. The bishop would have a stroke. Which would solve another problem, God forgive me.",
          "I have drawn it up already. The engineer quit. Cowards, all of them.",
          "A boot that calls the faithful to prayer. The clergy would want a word.",
          "You would make a fine governor. Terrible, but fine.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-24",
    text: "There is a reason the governor's portrait in the hall looks so grim. It is not the painter. It is the job.",
  },
  {
    id: "wearyVeteran-25",
    text: "Tell me, {title}, what would you do if you had my chair for a day?",
    answers: [
      {
        text: "Lower the taxes.",
        replies: [
          "And by evening the court would have recalled you and sent a nastier man in your place.",
          "A noble idea. I tried it once. They raised them again from home and cut my salary to make up the gap.",
          "The merchants would love you for a week. Then the soldiers would stop being paid and love you rather less.",
          "Hm. I would like to see your face when the treasurer brings you the accounts.",
          "Lower them on {merchandise}, perhaps. That might even bring trade back. Do not tell anyone I said so.",
        ],
      },
      {
        text: "Strengthen the fort.",
        replies: [
          "With what? Ten men and a wheelbarrow? I have asked for stone masons for three years.",
          "A soldier's answer. You would last longer than most in this office.",
          "The fort needs it. The walls on the sea side are more hope than mortar.",
          "Good choice. But first you would have to persuade the council it is cheaper than being sacked by {enemy}.",
          "I have strengthened it twice. Both times a hurricane disagreed with my engineering.",
        ],
      },
      {
        text: "Sleep. All of it. The whole day.",
        replies: [
          "That is the best plan anyone has offered me in years. Can I sign it into law?",
          "You would wake up to a pile of letters taller than your bed. But it would be a nice nap.",
          "Ha. I have not slept a full night since {nationTown} burned. You would be a better governor than me already.",
          "A man after my own heart. The colony would run just as well. Possibly better.",
          "Do it, and if anyone asks, tell them you are reviewing the colonial accounts with your eyes closed.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-26",
    text: "I have buried more soldiers to fever than to {enemyAdjective} bullets. Have you lost men to it, {title}?",
    answers: [
      {
        text: "Yes. Too many.",
        replies: [
          "I am sorry. Fever takes the young ones first. Never the officers. Never the tax men.",
          "Then you know. No glory in it. Just sweat, shaking and a hole in the ground.",
          "Hm. Drink clean water, eat fresh fruit when you can and keep away from the swamps. That is all I know.",
          "I keep a list of mine in that drawer. I read it on bad nights. It is getting long.",
          "We share a grief, then. Sit a moment, {title}.",
        ],
      },
      {
        text: "Not yet.",
        replies: [
          "Then you have been lucky. Or you sail away from the swamps fast. Keep doing that.",
          "Good. Pray it stays that way, and stay out of the marshes at dusk.",
          "Hm. Not yet is the right way to say it. Fever is patient.",
          "Keep fresh fruit on board. A ship's surgeon swore it helps against scurvy. Perhaps fevers too. Perhaps not.",
          "Lucky. I would knock on wood for you, but the termites ate my desk.",
        ],
      },
      {
        text: "My men are too ugly to catch anything.",
        replies: [
          "Ha. Then send some here. My soldiers are pretty, and dropping like flies.",
          "Fever is not choosy, {title}. It took a man here with a face like a burnt boot.",
          "If ugliness kept fever away, my sergeant would live for ever. Come to think of it, he has.",
          "I will note that in my report. 'Recommend uglier soldiers.' They will send me the bishop's nephew again.",
          "Hm. I laugh, but I hope you are right. Truly.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-27",
    text: "There was a time I would have thrown you out for not taking your hat off. Now I am just glad you are not another tax collector.",
  },
  {
    id: "wearyVeteran-28",
    text: "How is trade treating you, {title}?",
    answers: [
      {
        text: "Very well, thank you.",
        replies: [
          "Good. Somebody in this colony ought to be making money. It is certainly not the treasury.",
          "Then you will not mind the customs officer smiling at you a little more than usual.",
          "Glad to hear it. Prosperous captains make for quiet harbours and fewer petitions on my desk.",
          "Hm. Spend some of it here. The taverns need it and so does my mood.",
          "Splendid. Do not mention that too loudly in {town}, the tax men have very good ears.",
        ],
      },
      {
        text: "Badly. Prices are terrible.",
        replies: [
          "Of course they are. Everything comes from Europe, and Europe is busy killing itself.",
          "You and every merchant in the Caribbean. If it is any comfort, I am paid in promises.",
          "Try {merchandise}. Or try praying. They have similar odds in my experience.",
          "The Company sets one price, the smugglers set another, and the honest man gets the middle of nothing.",
          "Hm. Sorry to hear it. The sea gives and the sea takes, and the crown takes the rest.",
        ],
      },
      {
        text: "I traded my cabin boy for a goat. Bad deal.",
        replies: [
          "For the goat or the boy? Never mind, I suspect both feel cheated.",
          "Ha. Well, the goat will complain less and work harder. My garrison could learn from it.",
          "Do not let the court hear of it. They will want a census of the goat.",
          "I once traded my second best horse for a promise of reinforcements. You did better.",
          "Keep the goat. Goats are cheaper to feed than cabin boys and have better judgement.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-29",
    text: "News reached me that Cardinal Richelieu has a new plan for the colonies. By the time it gets here, he will have had six more.",
  },
  {
    id: "wearyVeteran-30",
    text: "Salt pork and stubbornness, {title}. That is what this colony is built on. And not enough of either.",
  },
  {
    id: "wearyVeteran-31",
    text: "Do you ever think of going home, {title}?",
    answers: [
      {
        text: "Every night.",
        replies: [
          "So do I. Then I remember the weather at home and the relatives, and I go back to my sweating.",
          "Every night, and every morning I wake up still here. That is the Caribbean for you.",
          "Hm. Write to someone, then. A letter takes half a year, but it is better than nothing.",
          "Me too. Then I remember I have been gone so long nobody at home would know my face.",
          "Then make your fortune quickly and go. Do not end up an old fool behind a desk like me.",
        ],
      },
      {
        text: "This is home now.",
        replies: [
          "That is how it starts. Then one day you are governor and you cannot remember what snow looks like.",
          "Good for you. The islands do get under the skin. Mostly as mosquitoes, but still.",
          "Hm. I said that once. It was the rum talking. Then it was the fever. Now it is just true.",
          "Then look after it. It needs people who mean to stay.",
          "Wise. There is nothing at home but war, plague and cousins asking for money.",
        ],
      },
      {
        text: "Home? I was born on a ship. Raised by a barrel.",
        replies: [
          "That explains your manners. And your shape.",
          "Ha. A barrel would have done a better job raising some of my officers.",
          "Then you are luckier than most. Nobody expects you to write home.",
          "I believe it. You have the posture of a man who spent his childhood rolling.",
          "Well, you turned out better than my nephew, and he had two parents and a tutor.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-32",
    text: "The Dutch West India Company has more ships than some kingdoms. And better accountants than all of them. That is the truly frightening part.",
  },
  {
    id: "wearyVeteran-33",
    text: "{town} is not a rich posting, {title}. It is the kind of place they send you when you have won too many battles and offended too many generals.",
  },
  {
    id: "wearyVeteran-34",
    text: "What do you think of the garrison, {title}?",
    answers: [
      {
        text: "They look tough.",
        replies: [
          "They look tough because they are too tired to smile. It works on the enemy, at least.",
          "Kind of you. Half of them could not hit a cathedral at fifty paces, but they look the part.",
          "Hm. Tough, yes. Also hungry, unpaid and full of fever. But tough.",
          "That is the best compliment they have had since {month}. I will pass it on.",
          "They are. They have survived my cooking and the quartermaster's arithmetic.",
        ],
      },
      {
        text: "They look asleep.",
        replies: [
          "They are. They do their best work asleep. Nobody deserts in their sleep.",
          "Fair. The night watch was asleep, the day watch is asleep and I am barely awake myself.",
          "Hm. I will have the sergeant shout at them. He enjoys it, and it gives him exercise.",
          "Honest. Please do not tell {enemy}.",
          "They were up all night. Burying a friend. Be gentle, {title}.",
        ],
      },
      {
        text: "I saw one arm-wrestling a monkey. The monkey won.",
        replies: [
          "That will be Corporal Biscuit's monkey. It is better paid than he is. In bananas.",
          "Ha. The monkey has been with us longer than most of the officers. It has seniority.",
          "I know. I have put the monkey on the payroll. It is cheaper than the men and more reliable.",
          "Do not spread that around. The enemy would invade out of pity.",
          "The monkey also cheats at cards. We still have not worked out how.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-35",
    text: "The last ship from home brought me forty barrels of flour, thirty of which were weevils. What do you do with thirty barrels of weevils?",
    answers: [
      {
        text: "Bake them anyway.",
        replies: [
          "We did. The garrison calls it meat bread. They are not entirely wrong.",
          "Of course. A weevil is just flour that has started moving. Nobody complains when they are hungry enough.",
          "Hm. The cook sifts them out on the first day and gives up by the third. The bread is crunchy now.",
          "Exactly what the quartermaster said. He has not eaten it himself, I notice.",
          "We bake it, bless it and eat it in the dark. Best way.",
        ],
      },
      {
        text: "Send them back with a complaint.",
        replies: [
          "I did. The reply will arrive next year, asking me to pay for the barrels.",
          "The ship has gone. The weevils stayed. Like everything else here, they have settled in.",
          "Hm. I wrote a strongly worded letter. I suspect they will use it to wrap the next lot of weevils.",
          "Back to Europe? They would only be sent to the army in Germany. Poor beasts.",
          "I complained in triplicate. Three copies of nothing happening.",
        ],
      },
      {
        text: "Train them as soldiers. They outnumber your garrison.",
        replies: [
          "Ha. They are better fed and more disciplined. I will draw up the commission.",
          "They march in straight lines already. Better than my recruits.",
          "Do not laugh. They have taken more of the fort's supplies than {enemy} ever have.",
          "I would, but they keep deserting into the bread.",
          "If they could hold a musket I would make one a captain. He would not be the smallest captain I have known.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-36",
    text: "When I was young I thought governors were wise men. Now I know they are just soldiers who could not run fast enough when the appointment came.",
  },
  {
    id: "wearyVeteran-37",
    text: "Have you been to {enemyTown}, {title}?",
    answers: [
      {
        text: "Yes, not long ago.",
        replies: [
          "And? Are their walls as thick as they boast? Do not answer, I will only lose sleep.",
          "Hm. Was their governor as tired as me? I like to imagine we suffer equally.",
          "Then keep it to yourself in the taverns here. People are touchy about such visits.",
          "I fought outside that town once. Lovely harbour. Terrible people. Excellent fish.",
          "Did they have food? Real food? Tell me about the food. Spare me nothing.",
        ],
      },
      {
        text: "Never, and I would not.",
        replies: [
          "Good. Loyal, or sensible, I do not mind which.",
          "Wise. They have a nasty habit of hanging visitors and calling it hospitality.",
          "Hm. One day it may be ours, and then you can visit on a Sunday.",
          "Fair enough. Though they say their wine is good. I would visit for the wine. Quietly.",
          "Then you are luckier than me. I have seen it through a spyglass, a gun port and a hospital window.",
        ],
      },
      {
        text: "Only to steal their governor's spoons.",
        replies: [
          "Silver ones? Then bring me one. I want to see if he eats better than me.",
          "Ha. If you go back, steal his chair as well. Mine creaks.",
          "That is the most useful act of war anyone has done this year.",
          "Petty, small and spiteful. I approve completely.",
          "Hm. If he asks, I knew nothing. I still want a spoon.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-38",
    text: "There are buccaneers on Hispaniola who eat wild cattle and fear nothing. Would you trust them with a colony's defence?",
    answers: [
      {
        text: "Yes, they are fierce fighters.",
        replies: [
          "Fierce, yes. Loyal, no. They fight for whoever has the most meat and the least rules.",
          "Hm. I have thought about it. I would need a lot of beef and a very short contract.",
          "They are. I watched a dozen of them take a ship with knives. Then they tried to take my boots.",
          "Fierce until they get bored. Then they go hunting and leave you to the enemy.",
          "Perhaps. But I would sleep with my pistol under the pillow every night they stayed.",
        ],
      },
      {
        text: "Not for a moment.",
        replies: [
          "Wise. They would defend {town} beautifully, then sell it to the highest bidder.",
          "Nor would I. Though I would trust them more than some of my council.",
          "Hm. Good instinct. They are allies in the morning and robbers by supper.",
          "Quite. They smell of smoke and hide and bad decisions.",
          "Agreed. I want soldiers who march, not hunters who wander off after a pig.",
        ],
      },
      {
        text: "I would trust their cattle more.",
        replies: [
          "Ha. The cattle are calmer and better behaved, I give you that.",
          "A good point. A cow never mutinied over pay.",
          "Then we will hire the cattle. They eat grass, which is cheaper than rum.",
          "The cattle do not fear anything either. They are just more polite about it.",
          "You know, the bull on the hill outside {town} has frightened off more raiders than my cannon.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-39",
    text: "The council here meets every Thursday to argue about the price of {merchandise}. They have been arguing since before I arrived. They will be arguing when they bury me.",
  },
  {
    id: "wearyVeteran-40",
    text: "What do you make of {nation}'s chances in this war, {title}?",
    answers: [
      {
        text: "Good. We will win.",
        replies: [
          "Spoken with confidence. I had that once. A cannonball took it, along with my favourite hat.",
          "Perhaps. But wars are not won by the bravest, they are won by whoever pays their soldiers last.",
          "I hope you are right. I am too old to learn the enemy's language.",
          "Hm. We will win if the ships come, and the money comes, and the fever goes. So, no promises.",
          "That is the spirit. Keep it. You will need it on the bad days.",
        ],
      },
      {
        text: "Hard to say.",
        replies: [
          "An honest answer. You should be on the council. You would be the only one.",
          "Hard to say indeed. The war in Europe will decide it, and Europe does not ask our opinion.",
          "Hm. I have been saying 'hard to say' to the court for three years. They do not like it either.",
          "That is the wisest thing anyone has said in this room today. Including me.",
          "Too right. I have seen battles turn on rain, rumours and a horse with a cough.",
        ],
      },
      {
        text: "Depends. Which side are we on again?",
        replies: [
          "Some days I am not sure myself. Check the flag on the fort. If it has fallen off, check the treaty.",
          "Ha. Ours. The one that pays you. Usually.",
          "That is a dangerous joke to make in City hall. Make it again and I will laugh again.",
          "We are on the side of whoever is not shooting at {town}. Today that is us.",
          "Hm. If you work it out, tell me. The orders from home have been unclear lately.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-41",
    text: "I have a sword on the wall from my first battle. I have a quill on the desk from my last. The quill has done more damage.",
  },
  {
    id: "wearyVeteran-42",
    text: "They tell me Barbados is giving up tobacco for sugar. Smart people. Tobacco has ruined more planters than {enemy} ever has.",
  },
  {
    id: "wearyVeteran-43",
    text: "Do you know what a governor does all day, {title}?",
    answers: [
      {
        text: "Rules the colony?",
        replies: [
          "Rules it? I barely govern my own stomach. The colony mostly rules itself and sends me the bill.",
          "On paper, yes. In practice I rule the ink pot and the patience of my clerk.",
          "Hm. I sign things. People are unhappy about what I sign. Then I sign apologies.",
          "Ruling is a big word for listening to merchants and burying soldiers.",
          "I rule as far as the harbour wall. Beyond it, the sea rules, and the sea is in a mood.",
        ],
      },
      {
        text: "Sits on a cushion and eats grapes.",
        replies: [
          "I have never had a grape in this colony. I had a raisin once. It was a fly.",
          "A cushion! Imagine. Mine was eaten by rats in {month}. I sit on a folded map of {otherTown}.",
          "Ha. If I had grapes I would make wine and drink until the next ship from home.",
          "Is that what they say in the taverns? Bless them. I will let them keep the dream.",
          "I eat ship's biscuit at this desk. It is the only thing hard enough to survive the fever.",
        ],
      },
      {
        text: "Counts the days until retirement.",
        replies: [
          "Now you have been reading my diary. Three hundred and ten, if you are curious.",
          "Exactly. And every time I get close, someone dies and I get their duties as well.",
          "Ha. Governors do not retire, {title}. They either die or get recalled in disgrace. I am hoping for disgrace.",
          "Right in one. You are wasted at sea.",
          "I stopped counting. The number kept going up. I think the clerks are adding days.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-44",
    text: "I tried to grow a garden here. The ants took the beans, the goats took the cabbages and the soldiers took the turnips. Do you have any advice?",
    answers: [
      {
        text: "Build a fence.",
        replies: [
          "I did. The goats ate it. Then the soldiers burned what was left for firewood.",
          "Hm. A fence keeps out goats. Nothing keeps out hungry soldiers.",
          "Fences need nails and nails come from home. I have three. I am saving them.",
          "I built a wall once, in Flanders. It did not keep out anybody either.",
          "A good idea. I will add it to the list behind the cannon, the roof and the boots.",
        ],
      },
      {
        text: "Grow something the soldiers will not eat.",
        replies: [
          "I tried peppers. They ate those too, and then complained all night.",
          "There is no such plant. They ate my flowers. Said they were medicinal.",
          "Hm. Tobacco. They smoke it instead of eating it. Same result, different end.",
          "I am considering thistles. Even the goats have standards.",
          "Weeds. Which I already grow. Splendidly.",
        ],
      },
      {
        text: "Put the goats in charge of the soldiers.",
        replies: [
          "That would be an improvement in discipline, I admit.",
          "Ha. The goats already think they are in charge. They walk into this office without knocking.",
          "Do not tempt me. The billy goat has more sense than my lieutenant.",
          "Goats are excellent sentries. Nothing gets past a goat without it trying to eat it.",
          "Hm. I would give one a sergeant's sash now, but the court would want a full report on its family.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-45",
    text: "In {year} they promised me a new fort. I have the plans. Beautiful plans. I keep them framed beside the rubble.",
  },
  {
    id: "wearyVeteran-46",
    text: "Have you ever been in a real battle, {title}? On land, I mean.",
    answers: [
      {
        text: "No, only at sea.",
        replies: [
          "Sea battles at least wash the blood away. On land it just sits there with you.",
          "Lucky. On land you cannot sail away when things go badly. You have to run, and I have bad knees.",
          "Hm. Sea fights are faster. Land fights are long, wet and full of shouting sergeants.",
          "Keep it that way. Ships sink. Infantry rots.",
          "Then you have never had to dig a trench in the rain while being shot at by the enemy. Count your blessings.",
        ],
      },
      {
        text: "Yes. More than I care to remember.",
        replies: [
          "Then we are two of a kind. Sit down. We do not need to talk about it.",
          "Hm. I can see it in how you stand. Back to the wall. Old habit.",
          "Same here. I still dream of the smoke some nights. Then I wake up and it is just the kitchen.",
          "Then you know why I would rather sign forms. Forms do not scream.",
          "I am sorry, {title}. Nobody should remember that much.",
        ],
      },
      {
        text: "I once fought off a whole regiment with a ladle.",
        replies: [
          "A ladle. I knew a cook in Flanders who did the same. They gave him a medal and then sacked him for the soup.",
          "Then you are hired. My garrison cook has a ladle and no regiment to use it on.",
          "Ha. Was it a big ladle? Size matters in these things.",
          "If only war were so simple. I would arm the garrison with kitchenware and save a fortune.",
          "I fought one off with a broken pike and a lot of swearing. The swearing did more.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-47",
    text: "My doctor says I have the heart of a young man. I told him to give it back, I was using mine.",
  },
  {
    id: "wearyVeteran-48",
    text: "The treasure fleet sails with more guns than this whole coast. Have you ever seen it pass, {title}?",
    answers: [
      {
        text: "Yes. An unforgettable sight.",
        replies: [
          "It is. Every sail is a fortune and every fortune is guarded by a hundred guns.",
          "Hm. And did you count the escorts? I lose sleep just thinking of the number.",
          "Piet Heyn saw it too, in 1628. Then he took it. You were not thinking of that, were you?",
          "Unforgettable, yes. Like a hurricane. You admire it from very far away.",
          "Lucky you. I have only seen its sails on the horizon. That was enough.",
        ],
      },
      {
        text: "No, but I would like to.",
        replies: [
          "From a distance, I hope. Come too close and they will sink you out of habit.",
          "Hm. Be careful what you wish for. That fleet does not like admirers.",
          "Wait at the right point in the right month and you will. Bring a good spyglass and a fast ship.",
          "Everyone wants to see it. Very few want to see it twice.",
          "It is worth seeing once. Like a coronation, or an execution.",
        ],
      },
      {
        text: "I tried to join it. They said my ship was too ugly.",
        replies: [
          "Ha. They are very proud. They turned down a Genoese merchantman for having a squeaky rudder.",
          "Then take it as a compliment. Ugly ships live longer. Nobody bothers to rob them.",
          "I would have said the same, from what I saw in the harbour this morning.",
          "Hm. Their loss. Well, not really. But we can pretend.",
          "At least they told you. Normally they fire a broadside as a polite refusal.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-49",
    text: "Would you do the colony a favour, {title}, and not start any fights in the harbour this week?",
    answers: [
      {
        text: "I will try my best.",
        replies: [
          "Thank you. That is more than I get from most captains, or my own officers.",
          "Your best will do. Last week's best was a burnt pier and three broken noses.",
          "Good. If you must fight, fight {enemy}. They are further away and less trouble for me.",
          "I will hold you to it. Not that I have the men to hold anybody to anything.",
          "Kind of you. My nerves thank you. What is left of them.",
        ],
      },
      {
        text: "No promises.",
        replies: [
          "At least you are honest. I will warn the surgeon.",
          "Hm. Then I will have the guards look the other way. They are good at that. Best in the Caribbean.",
          "Then fight quietly, and preferably far from my windows.",
          "Very well. Just do not set fire to anything. The last fire took my good chair.",
          "Spoken like a sailor. Do try not to sink anything in the harbour mouth, the pilots complain.",
        ],
      },
      {
        text: "Only if the seagulls start it.",
        replies: [
          "Then you will be fighting all week. The gulls here are vicious. One stole my lunch from my hand.",
          "Ha. Fair terms. I will put them in writing and nail them to the dock.",
          "If you defeat the seagulls, the colony will build you a statue. Out of fish.",
          "The gulls are on the council, you know. In spirit. They are just as greedy.",
          "I lost a battle to a seagull once. It took my wig. I have not been the same.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-50",
    text: "Stadtholder Frederick Henry has besieged more towns than I have had hot dinners. I would happily trade places, if he would take the paperwork.",
  },
  {
    id: "wearyVeteran-51",
    text: "Someone painted 'the governor is a goat' on the church wall. I had it washed off. Then I had the painter flogged, then pardoned, then hired. His letters are better than my clerk's.",
  },
  {
    id: "wearyVeteran-52",
    text: "What do you think of {town}, {title}? Be honest. Nobody else is.",
    answers: [
      {
        text: "It is a fine town.",
        replies: [
          "It is a fine town with a sick garrison, a leaky fort and a governor who talks too much. But fine.",
          "Thank you. I will tell the mayor. He will take the credit, as is his custom.",
          "Hm. Fine is a strong word. Tolerable is what I put in my reports.",
          "It has its charms. The sunsets. The people. Not the mosquitoes.",
          "You are kind. Or you have not seen the sewers yet.",
        ],
      },
      {
        text: "It could be better.",
        replies: [
          "Everything could be better. I have a list. It is nailed to the wall and goes down to the floor.",
          "Honest. Write it in a letter to home. They might listen to you. They do not listen to me.",
          "Hm. Better with money, better with soldiers, better with less fever. I agree on all counts.",
          "So could I, and so could you. But here we all are.",
          "Better is coming, {title}. In six months. In a letter. With conditions.",
        ],
      },
      {
        text: "It smells like a wet dog wrapped in fish.",
        replies: [
          "That is the harbour at low tide. I have been asking the tide to stop for two years.",
          "You are not the first to say so. The bishop said much the same and then fainted.",
          "Ha. You should smell {otherTown}. That is a wet dog wrapped in fish that died of fever.",
          "It is the tanneries. And the fish market. And the governor's dinner, if I am honest.",
          "Well, I have been here so long I no longer smell it. That is how you know you are a lost cause.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-53",
    text: "Plague rumours again from {otherTown}. Every ship that arrives makes the town hold its breath. Have you heard anything, {title}?",
    answers: [
      {
        text: "Only rumours.",
        replies: [
          "Rumours are how plague travels first. The disease follows later, by ship.",
          "Hm. Then I will treat them like any rumour. With suspicion and a quarantine flag.",
          "Good. Rumours I can handle. It is the coffins that trouble me.",
          "There are always rumours. Most are nonsense. One in a hundred is a graveyard.",
          "Keep your ear open. If you hear more, tell me before you tell the taverns.",
        ],
      },
      {
        text: "Yes. It is bad.",
        replies: [
          "God help them. I will hold every ship from there at anchor for forty days.",
          "Hm. Then you will forgive me if you stand a little further from my desk.",
          "Bad. I feared as much. I will tell the priest to prepare, and the gravedigger to dig.",
          "Thank you for the truth. Most captains would hide it to sell their cargo.",
          "Then {town} closes its harbour to them. I hate doing it. I will do it anyway.",
        ],
      },
      {
        text: "I heard it is just a bad smell. From the governor.",
        replies: [
          "Ha. My breath has killed fewer men than my cooking, I assure you.",
          "Insolent. Accurate, possibly. But insolent.",
          "If my smell could start a plague, I would aim it at {enemyTown}.",
          "Hm. I have not bathed since {month}. I take your point.",
          "I will forgive that, because you made me laugh, and I have not laughed since the last hurricane.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-54",
    text: "If you see any {playerNationAdjective} captain with medicine in his hold, {title}, send him to me. I will pay in gratitude. Mostly gratitude.",
  },
  {
    id: "wearyVeteran-55",
    text: "Is there anything I can help you with, {title}? Bear in mind I can barely help myself.",
    answers: [
      {
        text: "I need nothing, thank you.",
        replies: [
          "Then you are the first person through that door this year who did not need anything. Stay a while.",
          "Excellent. Everyone else wants gold, guns or a pardon. You are a pleasant change.",
          "Hm. Suspicious, but welcome. Come back when you do, I will probably still be here.",
          "Good. I had nothing to give anyway.",
          "Then go with God, {title}, and fair winds. That is free.",
        ],
      },
      {
        text: "Tell me about the war with {enemy}.",
        replies: [
          "They raid us, we raid them, the fever kills both sides and the kings sign treaties about it later.",
          "It started long before I came and it will go on long after. Like the rain, and the bills.",
          "Hm. The war is three things here. Shortages, fear and boredom. Mostly boredom, until it is fear.",
          "Ask at {enemyTown}. They will tell you the same story with the names swapped.",
          "It is a war of small ships and big rumours. Keep your guns loaded and your ears shut.",
        ],
      },
      {
        text: "Can I borrow your wig for a wedding?",
        replies: [
          "No. It is the only thing that makes me look like a governor. Without it I look like a tired turnip.",
          "Whose wedding? If it is mine, nobody told me. Which is about normal for news in this colony.",
          "Ha. Borrow it if you like, but it has lice older than you and they are loyal to me.",
          "Ask the bishop's nephew. He came with a crate of them and no idea what to do with any.",
          "The last man I lent it to came back bald and weeping. Draw your own conclusions.",
        ],
      },
      {
        text: "Lend me a cannon. A small one. I will bring it back.",
        replies: [
          "I have eleven cannon and six work. The other five are planters' pots now. Pick a pot.",
          "Bring it back. That is what the last captain said. The cannon is now in {enemyTown}, firing at us.",
          "Ha. If I had a spare cannon I would sleep with it under my pillow.",
          "Not a chance. But I admire the cheek. You would have done well in my old regiment.",
          "Bring your own cannon. I am still waiting for mine from home. The letter said 'shortly'. In {year}.",
        ],
      },
    ],
  },
  {
    id: "wearyVeteran-56",
    text: "Go on, then, {title}. The sea is calling and my clerk is coming with another pile of letters. One of us should escape.",
  },
]
