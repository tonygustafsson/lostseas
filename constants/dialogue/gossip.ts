import "server-only"

export const GOSSIP: DialogueEntry[] = [
  {
    id: "gossip-1",
    text: "Come closer, {title}. No, closer. I have news, and news goes stale faster than ship's biscuit in the rain.",
  },
  {
    id: "gossip-2",
    text: "Have you heard what the harbourmaster's wife said about the governor of {town}?",
    answers: [
      {
        text: "No, tell me everything.",
        replies: [
          "She said he dyes his beard with boot blacking. And she would know, she sees him at church every Sunday with grey roots.",
          "Only that he snores through the sermon. The priest has started preaching louder out of spite.",
          "That he keeps a portrait of a lady from {nationTown} in his desk drawer. Not his wife. Not even his wife's sister, and that was the first guess.",
          "She said he once fainted at the sight of a crab. A small crab. It was not even angry.",
          "That he owes his tailor forty pieces of eight. The tailor has started sewing his buttons on loosely, as a warning.",
        ],
      },
      {
        text: "I am not interested in gossip.",
        replies: [
          "Nobody is, until it is about them. Then they want every word.",
          "Of course not. I shall tell you anyway, quietly, so it does not count.",
          "A pity. I had a lovely one about you, but it can keep.",
          "Then you are the only soul in {town} who is not. You must be terribly lonely.",
          "Very well. I shall simply stand here and look meaningfully at the governor's house until you ask.",
        ],
      },
      {
        text: "She told me herself. She also said you talk too much.",
        replies: [
          "She said that? The woman who once told the whole parish about the bishop's gout? Well!",
          "Talk too much? I have barely started. I am conserving my strength for the evening.",
          "Did she now. Then you will not want to know what she keeps under her bed. Or perhaps you will.",
          "That is rich. She talks so much the parrots in {town} have started repeating her.",
          "Ha! I shall remember that, {title}. I remember everything. It is rather my trade.",
        ],
      },
    ],
  },
  {
    id: "gossip-3",
    text: "The captain who came in yesterday swore he fought off three Dunkirkers single-handed. His own cook says they were three seagulls, and he lost.",
  },
  {
    id: "gossip-4",
    text: "They say a fleet from {enemy} is gathering off {enemyTown}. Have you seen anything on your travels?",
    answers: [
      {
        text: "I saw a few sails, nothing more.",
        replies: [
          "A few sails! That is how it starts. A few sails, then a few more, then the whole harbour is speaking another tongue.",
          "Nothing more, you say. I shall tell everyone it was a dozen, to be safe.",
          "Hmm. My cousin saw a few sails once. It turned out to be washing on a line, but he still tells it as a battle.",
          "Sensible of you to keep your eyes open. Most captains only notice ships when they bump into them.",
          "I shall pass that on to the right ears. And the wrong ones. All ears, really.",
        ],
      },
      {
        text: "I saw a hundred warships and a sea serpent wearing a hat.",
        replies: [
          "A hat! What kind? No, do not answer, I shall decide myself. A feathered one, I think. Spanish fashion.",
          "That is the best news I have heard all week. The fishwives will be talking about it until Michaelmas.",
          "You jest, but the last captain who said that was telling the truth about the warships. Not about the serpent, mind.",
          "A hundred warships. I shall round it down to fifty so people believe me.",
          "Oh, I like you. You lie with confidence. Half the governors in the Caribbean could take lessons.",
        ],
      },
      {
        text: "I have not been near {enemyTown}.",
        replies: [
          "No? Pity. I had hoped for something fresh. Everything I know about {enemyTown} is at least a fortnight old.",
          "Wise. I hear the wine there is sour and the governor is sourer.",
          "Then I shall have to rely on the purser from the last sloop, and he cannot tell a frigate from a fishing boat.",
          "Keep it that way, {title}. Nobody comes back from {enemyTown} with fewer enemies than they left with.",
          "Ah well. If you do go, remember everything. Especially who is quarrelling with whom.",
        ],
      },
    ],
  },
  {
    id: "gossip-5",
    text: "Between you and me, and possibly the barmaid, the price of {merchandise} is about to rise. I heard it from a clerk who heard it from a man who sleeps under the customs house.",
  },
  {
    id: "gossip-6",
    text: "Do you know why the Dutch West India Company clerk left {town} in such a hurry?",
    answers: [
      {
        text: "Debts, I expect.",
        replies: [
          "Debts, yes, but to whom? That is the delicious part. Three tavern keepers, a priest and a goat seller.",
          "Clever. Debts are behind most hasty departures. The rest are behind husbands.",
          "Close. It was debts and a widow, which is worse than debts alone.",
          "Debts to the Company itself, they say. He was keeping two ledgers, and both were wrong.",
          "You have the instincts of a gossip, {title}. Do not let it go to waste.",
        ],
      },
      {
        text: "He heard you were coming to tell him a story.",
        replies: [
          "Rude. Accurate, but rude. He did once climb out of a window to avoid my account of the bishop's nephew.",
          "Ha! I shall have you know my stories are much in demand. Mostly by people who are not in them.",
          "If my stories drove men out of town, {town} would be empty. Mind you, it is quieter than it was.",
          "Very funny. For that, you shall hear the long version.",
          "He did not run fast enough, as it happens. I caught him at the quay and told him anyway.",
        ],
      },
      {
        text: "I do not know. Why?",
        replies: [
          "Because he sold the same warehouse to two different merchants, and both turned up on the same morning with the deed.",
          "Because a letter arrived from Amsterdam with a seal he did not like the look of. Nor did I. I steamed it open.",
          "He claimed it was a fever. The fever had red hair and a husband in the militia.",
          "Nobody knows for certain. Which means I know for certain, because I made it up first.",
          "He owed the Company more guilders than there are mosquitoes in the swamp. And that is a great many guilders.",
        ],
      },
    ],
  },
  {
    id: "gossip-7",
    text: "The priest who hears confession here keeps a little book. I know, because I keep a little book about his little book.",
  },
  {
    id: "gossip-8",
    text: "Who do you think is the worst liar in {town}?",
    answers: [
      {
        text: "The governor.",
        replies: [
          "Hush! Not so loud. Although yes, absolutely, and you should see him explain the harbour taxes.",
          "Bold, {title}. Correct, but bold. He told the bishop he had never touched a drop and then fell into the fountain.",
          "He is not the worst. He is merely the most practised. There is a difference.",
          "The governor only lies about money and his age. That is barely lying at all, for a governor.",
          "I could not possibly agree out loud. I agree very loudly in my head.",
        ],
      },
      {
        text: "You.",
        replies: [
          "Me? I never lie. I improve. A plain story is like plain salt pork, nobody wants it without a little seasoning.",
          "Charming. I shall only add a small amount of exaggeration to what I tell people about you.",
          "I have never told a lie in my life. That sentence alone proves you wrong and right at once.",
          "Liar is such an ugly word. I prefer storyteller of uncertain accuracy.",
          "If I were a liar, would I be so honest about how much I enjoy it?",
        ],
      },
      {
        text: "The fishmonger. His fish are never fresh.",
        replies: [
          "Oh, you have noticed too! He says they were caught this morning. He does not say which morning.",
          "His fish have seen more saints' days than the friar. Poor creatures.",
          "His wife told me he buys them from a fisherman in {otherTown} and pretends they are local. Do not tell him I said so.",
          "A fair choice. He once swore a salted cod was still swimming. It was not.",
          "He lies about fish, but he is honest about cards. Which is backwards, if you ask me.",
        ],
      },
    ],
  },
  {
    id: "gossip-9",
    text: "Did you know the purser of the last merchantman sold half the salt pork twice? The crew found out somewhere near {otherTown}. They say he is now swimming home.",
  },
  {
    id: "gossip-10",
    text: "I hear you have been to {otherTown}. Is it true the governor there wears a wig to bed?",
    answers: [
      {
        text: "I could not say. I was not invited to his bedchamber.",
        replies: [
          "Not yet, {title}. Not yet. Keep sailing, and who knows what doors open.",
          "Pity. Somebody must find out, and my legs are too old for climbing trellises.",
          "Very discreet. I distrust discretion. It usually means there is something worth knowing.",
          "Then I shall assume yes. It makes for a better story, and nobody will check.",
          "Fair enough. His valet says two wigs, one for sleeping and one for dreaming.",
        ],
      },
      {
        text: "Yes, and it is powdered with {merchandise}.",
        replies: [
          "With {merchandise}! Is that the fashion now? I shall have to tell the milliner.",
          "No! Truly? I believed you for a whole breath, and that is a long time for me.",
          "That explains the smell at his levee. I always wondered.",
          "Wonderful. I shall tell everyone and credit an anonymous captain. You may thank me later.",
          "That is the most ridiculous thing I have heard today, and I spoke to the friar this morning.",
        ],
      },
      {
        text: "No, but his wife does.",
        replies: [
          "His wife! Oh, that is better than I hoped. Who told you? No, let me guess. The cook.",
          "I knew it. Her hair was far too tidy at the Candlemas feast.",
          "You are a treasure, {title}. A gossip in captain's clothing.",
          "That has to be worth at least a free mug of something. Do not tell the landlord.",
          "I shall keep that secret until roughly the end of this sentence.",
        ],
      },
    ],
  },
  {
    id: "gossip-11",
    text: "The quartermaster from the brig in the harbour told me he survived three hurricanes. His sweetheart in {nationTown} says it was one hurricane and two bad oysters.",
  },
  {
    id: "gossip-12",
    text: "Word is that King Philip has not paid his soldiers in two years. What do you make of that?",
    answers: [
      {
        text: "The silver fleet must be running late.",
        replies: [
          "Running late, or running into the Dutch. Ever since Piet Heyn took the flota, the treasury has had hiccups.",
          "Late, light and leaking, my brother-in-law says. He knows a man who caulks the galleons.",
          "If it is late, it will be a hurricane or an admiral, and either way someone will lie about it.",
          "Running late, yes. Like my cousin's dowry. Twelve years and counting.",
          "Very astute. Keep that up and you will be gossiping professionally by Lent.",
        ],
      },
      {
        text: "Perhaps he spent it all on hats.",
        replies: [
          "Hats! Well, you have seen the portraits. A man does not get that magnificent by accident.",
          "Hats and painters, they say. That Velázquez fellow is not cheap.",
          "I shall add that to my collection. Royal hats, ruinous costs. It sounds true, which is all that matters.",
          "Do not say that in Havana. The Inquisition has no sense of humour about hats.",
          "If only. My hat cost me six reales and I have regretted it every day.",
        ],
      },
      {
        text: "Soldiers always complain.",
        replies: [
          "They do. But they complain louder with empty bellies, and Catalonia is very loud just now.",
          "True. Sailors too. I have never met a sailor who was content, except one, and he was asleep.",
          "Complaining is the soldier's second trade. Drinking is the first. Paying for it is a distant third.",
          "You sound like a paymaster. Are you a paymaster? You have the look.",
          "They do, but this time they are complaining with muskets, and that is a different song.",
        ],
      },
    ],
  },
  {
    id: "gossip-13",
    text: "Mind, I never repeat anything. I just say it once, to everyone.",
  },
  {
    id: "gossip-14",
    text: "Shall I tell you who the governor is sweet on?",
    answers: [
      {
        text: "Yes, of course.",
        replies: [
          "The widow who runs the chandlery. He buys tallow candles from her every day. Nobody needs that much light.",
          "A Portuguese lady with a very large fan and a very large husband. It will end badly, and I will be there.",
          "Himself, mostly. But on Thursdays, the organist.",
          "The daughter of the shipwright. He keeps ordering repairs to a boat he does not own.",
          "Everyone thinks it is the merchant's sister. It is the merchant. Do not repeat that. Actually, do.",
        ],
      },
      {
        text: "No. Some things should stay private.",
        replies: [
          "Private? In {town}? Nothing has been private here since the founding.",
          "How old-fashioned. I admire it, in the way one admires a ship that never leaves port.",
          "Very well. I shall tell only the people who ask. Which is everyone.",
          "Your discretion does you credit, {title}. It does me no good at all.",
          "Fine. But when it all comes out at the feast of Saint John, do not say I did not offer.",
        ],
      },
      {
        text: "Is it me?",
        replies: [
          "You! Ha! Well, he did ask your name twice. I assumed it was for a warrant.",
          "Not yet, {title}. But I could start a rumour. It would take me an afternoon.",
          "Oh, that is sweet. No. But now I shall say it was, just to watch his face.",
          "You flatter yourself. Then again, he has strange taste. He married his wife.",
          "Possibly. He did call you an interesting sort. That is either love or suspicion.",
        ],
      },
    ],
  },
  {
    id: "gossip-15",
    text: "There is a rumour of plague in {otherTown}. There is always a rumour of plague somewhere. I start about half of them, to keep the visitors away from my favourite table.",
  },
  {
    id: "gossip-16",
    text: "A sailor told me Cardinal Richelieu has spies in every port. Do you think there is one in {town}?",
    answers: [
      {
        text: "Of course. You are probably it.",
        replies: [
          "Me? A spy? I would never keep a secret long enough to be any use to a cardinal.",
          "If I were a spy, I would have been paid by now. I have not. Draw your own conclusions.",
          "How flattering. The cardinal could do worse. He could hire the fishmonger.",
          "Shh. Now look what you have done. Everyone is staring and I have not even said anything shocking yet.",
          "I tell everyone everything for free. The cardinal would go bankrupt with me. Or rich.",
        ],
      },
      {
        text: "I doubt it. Nothing here would interest him.",
        replies: [
          "Nothing? The governor's debts alone could fill a dispatch. With pictures.",
          "You underestimate {town}. We had a duel last week over a hat. A hat!",
          "Hmph. The cardinal would be fascinated by the chandler's wife, I assure you.",
          "Perhaps not, but he collects everything. Like me, but with more soldiers.",
          "That is exactly what a spy would say, {title}.",
        ],
      },
      {
        text: "There is one in every tavern. Usually the quiet fellow in the corner.",
        replies: [
          "The quiet one! I always said so. He drinks one cup all evening. No honest man drinks that slowly.",
          "Oh, I have been watching him for weeks. He writes letters. In code. Or very bad handwriting.",
          "Too obvious. The real spy is the loud one, because nobody suspects a fool.",
          "There is no quiet fellow here. Only me, and I am never quiet.",
          "You think like a gossip. It is a fine way to think. Exhausting, but fine.",
        ],
      },
    ],
  },
  {
    id: "gossip-17",
    text: "The Stadtholder has been taking towns in Brabant again, they say. The Dutch merchants in port are insufferable about it. One of them bought a round for the whole tavern and then charged us for it.",
  },
  {
    id: "gossip-18",
    text: "Have you heard the news from England? They say King Charles and Parliament are barely speaking.",
    answers: [
      {
        text: "I heard the Scots are angry too.",
        replies: [
          "Angry about a prayer book! Imagine going to war over a book. I would only go to war over a good letter.",
          "The Scots are always angry. It is the weather. Too much rain and not enough rum.",
          "Yes, and the king needs money to fight them, and Parliament holds the purse. It is like a marriage, but with cannon.",
          "A sailor from Bristol says the whole country is quarrelling. I have never been so jealous of a country.",
          "You are well informed, {title}. Who told you? I need to know who to drink with.",
        ],
      },
      {
        text: "Neither are my first mate and I.",
        replies: [
          "Oh? What happened? Was it money or a woman? It is always money or a woman. Occasionally a parrot.",
          "Then you and King Charles have something in common. Perhaps you should write to him for advice.",
          "Tell me everything. I promise to share it only with people who are interested.",
          "A crew divided is a crew that talks. And a crew that talks talks to me.",
          "At least your first mate cannot dissolve you. Can he? Check your articles.",
        ],
      },
      {
        text: "Politics bores me.",
        replies: [
          "Politics is only gossip with a crown on. You would like it if you knew who was sleeping where.",
          "It bores you now. Wait until the king's tax collector arrives and you find it fascinating.",
          "Then we shall talk about the bishop instead. He is politics in a dress.",
          "Fair. Shall I tell you about the chandler's bunions? Truly gripping.",
          "That is because you have been hearing it from the wrong people. I make it entertaining.",
        ],
      },
    ],
  },
  {
    id: "gossip-19",
    text: "The governor of {nationTown} lost a wager on a cockfight and paid it in sugar. The other man still has not finished eating it.",
  },
  {
    id: "gossip-20",
    text: "Can you keep a secret, {name}?",
    answers: [
      {
        text: "Yes, I swear it.",
        replies: [
          "Good, because I cannot. The surgeon has been bleeding the governor with leeches from his own garden.",
          "Then hear this. The church bell was not cracked by lightning. It was cracked by the sexton's head.",
          "Wonderful. The tavern's best wine is from the same barrel as the worst. He just charges more.",
          "The Company agent here is not Dutch at all. He is from Bristol and does the accent very badly.",
          "Splendid. Then you will be the only one in {town} who keeps it. I told everyone else this morning.",
        ],
      },
      {
        text: "Better than you can.",
        replies: [
          "Anyone can keep a secret better than me. The town crier, for one, and he is paid to shout.",
          "Rude, but fair. I once kept a secret for a whole afternoon. I was ill in bed.",
          "Then you shall be my vault. I put things in, you lock them up, I take them out again whenever I like.",
          "I shall test you. The baker puts sawdust in his bread on Fridays. Now let us see how long you last.",
          "Oh, I keep them very well. I just keep them in many places at once.",
        ],
      },
      {
        text: "No. I tell my parrot everything.",
        replies: [
          "Then your parrot and I should have a drink together. I suspect we have much in common.",
          "Excellent. Parrots are very discreet. They only repeat things to everyone who passes.",
          "Is the parrot single? Never mind. Forget I asked.",
          "That is the most honest answer I have had all day. I shall tell you nothing, and the parrot everything.",
          "A parrot told me a secret once. About a bishop. I still cannot look at a bishop without blushing.",
        ],
      },
      {
        text: "Only if it is worth keeping.",
        replies: [
          "Oh, they are all worth keeping. Not one of them is worth keeping quiet, though.",
          "A merchant's answer. Very well. The harbourmaster takes bribes in {merchandise}. That one is worth a great deal.",
          "This one is worth its weight in doubloons. Which is to say, it is very light, but very shiny.",
          "Worth it? It concerns the priest, a goat and the feast of Saint Peter. You decide.",
          "Clever. You want to see the goods before you pay. I respect a trader.",
        ],
      },
    ],
  },
  {
    id: "gossip-21",
    text: "They say the last captain who sailed for {enemyTown} came back without his ship, his crew or his trousers. He says it was a storm. I say it was cards.",
  },
  {
    id: "gossip-22",
    text: "Why do you think the chandler shut his shop for three days?",
    answers: [
      {
        text: "He was ill.",
        replies: [
          "Ill, yes. Lovesick. With the wrong woman. In the wrong house. On the wrong saint's day.",
          "That is what the sign says. Signs lie almost as often as captains.",
          "He was ill on the third day, I grant you. The first two were the cause of it.",
          "Ill with fear. The tax collector came by, and he hid in his own barrel of tallow.",
          "The surgeon says it was a fever. The surgeon also says leeches cure grief, so I discount him.",
        ],
      },
      {
        text: "He was hiding from you.",
        replies: [
          "Everybody says that. It is never true. Well, it was true once, with the notary.",
          "If he was, he chose poorly. I know where his cellar door is.",
          "Ha! Unkind, {title}. But I did spend all three days sitting outside his shop, so perhaps.",
          "Nobody can hide from me in {town}. The town is too small and my ears are too large.",
          "Well, it worked for three days. That is a record. The previous record was an afternoon.",
        ],
      },
      {
        text: "I have no idea. Do tell.",
        replies: [
          "He went to {otherTown} to see a woman who claims he is the father of her son. The boy has his nose.",
          "He was counting his candles. He suspects his apprentice steals them. The apprentice suspects him of the same.",
          "His mother-in-law arrived on the last ship. He nailed the door shut. Who could blame him?",
          "He bought a cargo of {merchandise} he cannot sell and could not bear to face anybody.",
          "Ah, now I must decide which version to give you. The true one is the dullest, so here is the other one.",
        ],
      },
    ],
  },
  {
    id: "gossip-23",
    text: "Did you hear about the buccaneers on Hispaniola? They roast whole oxen and eat them with their hands. My brother-in-law wants to join them, but only for the food.",
  },
  {
    id: "gossip-24",
    text: "Tell me, {title}, what is the most shocking thing you have seen at sea?",
    answers: [
      {
        text: "A crew dying of scurvy. It was terrible.",
        replies: [
          "Oh. Oh, I am sorry. That is not gossip, that is grief. Sit a moment.",
          "Poor souls. They say limes help, but nobody listens to the people who say it.",
          "I lost a brother to the gums and the bleeding. I talk too much so I do not think of it. Forgive me.",
          "That is a sad tale and I shall not repeat it lightly. Only to people who need warning.",
          "God rest them. Eat your fruit, {title}. I mean it. I want to keep hearing your stories.",
        ],
      },
      {
        text: "My cook washing his hands.",
        replies: [
          "No! Truly? That is a miracle. You should report it to the bishop.",
          "Ha! I hope you put him ashore at once. Such a man cannot be trusted.",
          "Once? Or as a habit? Because a habit would be news worth spreading.",
          "My uncle washed his hands at Easter once. The family still talks about it.",
          "I shall tell everyone. Your crew will be the envy of the coast. Or suspicious of it.",
        ],
      },
      {
        text: "A mermaid with a fishing rod.",
        replies: [
          "Fishing for what? Sailors, I suppose. Most mermaids are. Like most barmaids.",
          "A mermaid! What did she look like? Was she pretty? Better than the governor's wife?",
          "Every captain sees a mermaid eventually. Usually around the third bottle.",
          "If she was fishing, who was she fishing for? I need names, {title}, not scenery.",
          "Wonderful. I shall tell it as a mermaid with a fishing rod and a grudge. Grudges sell.",
        ],
      },
    ],
  },
  {
    id: "gossip-25",
    text: "The bosun of the sloop out there owes money in every port from {town} to {otherTown}. He has started sailing at night so his creditors cannot see him.",
  },
  {
    id: "gossip-26",
    text: "There are whispers that Portugal wants to be free of Spain. What do you think will happen?",
    answers: [
      {
        text: "There will be war, mark my words.",
        replies: [
          "I think so too. The Portuguese merchants have that look, like a cat that has seen an open door.",
          "War, and then everyone will need sugar and powder. Somebody will get rich, and it will not be me.",
          "Mark your words? I shall carve them into the table. The landlord will be furious.",
          "My aunt's lodger is Portuguese. He has started humming in a very defiant way.",
          "I fear you are right. Philip has trouble in Catalonia as it is. He cannot hold everything.",
        ],
      },
      {
        text: "Nothing. It is just talk.",
        replies: [
          "Just talk! Talk is how everything starts. Love, war, and my mother-in-law's visits.",
          "That is what they said about the Dutch, and look at them now, seventy years on and still at it.",
          "Talk is never just talk, {title}. Talk is a fire that has not found the hay yet.",
          "You would make a terrible gossip. You have no sense of drama at all.",
          "Perhaps. But I shall keep listening, because talk is my favourite food.",
        ],
      },
      {
        text: "Portugal? Is that near {otherTown}?",
        replies: [
          "Near {otherTown}! Ha! No, it is next to Spain. Underneath it, practically. Being squashed.",
          "You are teasing me. Or you are a very bad navigator. Either way, I am delighted.",
          "Do you sail by map or by smell? Please say smell. It would make such a story.",
          "Not quite. Though if you keep sailing in the wrong direction long enough, I suppose anything is near anything.",
          "Oh dear. I shall not tell anyone you said that. I shall tell absolutely everyone.",
        ],
      },
    ],
  },
  {
    id: "gossip-27",
    text: "The friar says the hurricane last season was punishment for our sins. Funny how it flattened his neighbour's house and missed his own wine cellar.",
  },
  {
    id: "gossip-28",
    text: "Would you like to know what people in {town} say about you, {name}?",
    answers: [
      {
        text: "Yes. What do they say?",
        replies: [
          "That you pay your debts. Which is suspicious, frankly. Nobody pays their debts.",
          "That you have a handsome ship and a doubtful crew. The crew part is from the barmaid, so take it with salt.",
          "That you once tried to buy a cannon with a song. I hope it is true. It would make my week.",
          "Mostly that you are new and nobody knows anything. Which means I shall be filling in the gaps myself.",
          "They say you are honest. I said give it time.",
        ],
      },
      {
        text: "No. I prefer not to know.",
        replies: [
          "Wise. Ignorance is cheaper than rum and lasts longer.",
          "Then I shall tell you something nice instead. Your boots are clean. That is all I have.",
          "Very well. But if anyone mentions a goat, it was not true, and I denied it.",
          "Probably for the best. Some of it was quite creative.",
          "You are braver than most. Most people cannot rest until they know.",
        ],
      },
      {
        text: "I already know. They say I am the best captain in the {playerNationAdjective} fleet.",
        replies: [
          "Ha! Who says that? Your mother? Your purser? Your mirror?",
          "Oh yes, I heard that. From you. Just now.",
          "I shall add it to the list. Just below the rumour that you are afraid of crabs.",
          "Best captain! The last best captain lost his ship to a sandbar in plain daylight.",
          "Modest, too. I shall tell people you are modest. They will not believe me, but I shall tell them.",
        ],
      },
    ],
  },
  {
    id: "gossip-29",
    text: "Barbados is all sugar now, they say. The tobacco planters are furious. One of them burned his own crop in protest, then realised he had no other crop.",
  },
  {
    id: "gossip-30",
    text: "Do you believe the treasure fleet is carrying more silver than usual this year?",
    answers: [
      {
        text: "I believe it, and I would like some of it.",
        replies: [
          "You and every buccaneer from Tortuga to Bonaire. Get in line, {title}. It is a long line.",
          "Ha! Do not say that too loudly near anyone with a cannon. They hang people for wanting things.",
          "Piet Heyn did it, and they still sing songs about him in Amsterdam. Nobody sings about the ones who failed.",
          "Wanting silver is easy. Carrying it home without being shot is the trick.",
          "If you get some, remember who told you about it. I accept doubloons and good stories.",
        ],
      },
      {
        text: "No. Rumours like that are spread to lure fools.",
        replies: [
          "Spread to lure fools! I spread most rumours, and I can assure you, I do it for fun.",
          "Perhaps. But fools have got rich before. My cousin is a fool and he owns a warehouse.",
          "Very cynical. I like cynical. Cynical people tell the best stories about others.",
          "Then the fools of the Caribbean are very busy this season. I have met a dozen today.",
          "Clever. Too clever for a captain. Are you sure you are not a lawyer?",
        ],
      },
      {
        text: "I hear it is mostly carrying cheese.",
        replies: [
          "Cheese! Galleons full of cheese! I love it. I shall start this rumour at once.",
          "Well, that would explain the smell when they dock in Havana.",
          "Imagine fighting your way aboard a galleon and finding nothing but manchego. You would weep.",
          "Someone has been feeding you nonsense, {title}. Or you are feeding it to me. Either way, I am grateful.",
          "Cheese is worth more than silver if you are hungry enough. Ask any sailor after six weeks at sea.",
        ],
      },
    ],
  },
  {
    id: "gossip-31",
    text: "The schoolmaster has been writing poems to the sergeant's daughter. Dreadful poems. He rhymed 'love' with 'love'. Twice.",
  },
  {
    id: "gossip-32",
    text: "Have you heard who is feuding in {town} this {month}?",
    answers: [
      {
        text: "No. Who?",
        replies: [
          "The baker and the brewer. One said the other's bread tastes of beer. The other said that was the best thing about it.",
          "Two widows, one pew, every Sunday. It is better than the sermon.",
          "The harbourmaster and the customs officer. Both claim the same chair. Neither will stand up first.",
          "The priest and the parrot at the tavern. The parrot learned some words. The priest is certain he knows who taught it.",
          "Everyone with everyone, as usual. But the best is the surgeon and the barber, who share a shop and a grudge.",
        ],
      },
      {
        text: "You and your neighbour, I suppose.",
        replies: [
          "How did you know? Has she been talking about me? What did she say? Never mind, I shall find out.",
          "Ha! That is no feud. That is a long and happy war. We both enjoy it far too much.",
          "She started it. In the year of Our Lord sixteen thirty-one. Over a chicken.",
          "Perhaps. But I am winning, and that is what matters.",
          "Feud is such a strong word. I prefer to call it a lifelong exchange of opinions.",
        ],
      },
      {
        text: "I do not care about feuds.",
        replies: [
          "You will when you sit in the wrong pew. Then you will care very much.",
          "Nonsense. Everyone cares about feuds as long as they are not in one.",
          "A captain who does not care about feuds will one day sail into the middle of one.",
          "Then you are in for a dull evening, {title}. Feuds are all the entertainment we have here.",
          "Fine. But do not buy bread here on Saturdays. You will be choosing a side whether you like it or not.",
        ],
      },
    ],
  },
  {
    id: "gossip-33",
    text: "A trader from {otherTown} swore his {merchandise} was the finest in the Indies. It was so fine it walked off his ship by itself. Weevils, you see.",
  },
  {
    id: "gossip-34",
    text: "Did you notice the new man at the harbour? He claims to be a merchant from {nationTown}. What do you think?",
    answers: [
      {
        text: "He looks honest enough.",
        replies: [
          "Honest? With those boots? Nobody honest has boots that shiny.",
          "He looks honest, yes. That is exactly what worries me.",
          "Well, you are a captain, you know faces. I only know rumours. Mine say he is a deserter.",
          "Hmm. He did tip the boy who carried his trunk. Honest men are usually too poor to tip.",
          "If he is honest, he will not last long in {town}. We shall corrupt him by Sunday.",
        ],
      },
      {
        text: "He is a spy for {enemy}.",
        replies: [
          "I knew it! Though, to be fair, I suspect everyone of that at least once a week.",
          "Do you have proof, or is it just his face? His face is very suspicious.",
          "Shh! If you are right, he might hear you. If you are wrong, he will hear me telling people you said so.",
          "A spy for {enemy}? Then I must find out what he eats for breakfast. That always tells you something.",
          "Splendid. That is going straight into my collection. Under the letter S, beside the sexton.",
        ],
      },
      {
        text: "He is my long-lost twin.",
        replies: [
          "Your twin? You look nothing alike. Unless one of you was dropped as a baby.",
          "Ha! Then which of you got the good looks? Do not answer, I have already decided.",
          "Well, that would explain why he asked about you. He did ask about you. Or someone like you.",
          "I shall tell everyone. By tomorrow you will both have been separated at birth in three different ways.",
          "A twin! Oh, how marvellous. Are you the evil one? Say yes.",
        ],
      },
    ],
  },
  {
    id: "gossip-35",
    text: "Louis of France is not well, they say, and the cardinal is worse. Mind, they say that every year and both are still breathing. Rumours of a king's death are like fishermen, they always come back.",
  },
  {
    id: "gossip-36",
    text: "The customs men visited a merchant last week. Do you want to know what they found?",
    answers: [
      {
        text: "Yes, but quietly.",
        replies: [
          "A manifest in the wrong language. And a crate of something illegal. And a great deal of very good wine, which they confiscated for study.",
          "Nothing at all. Which, as you know, is the most suspicious thing of all.",
          "A ledger showing he had been selling to the {enemyAdjective}. That is not treason, but they seemed to think it close enough.",
          "They found his wife's sister hiding in the wardrobe. That was not what they were looking for, but it was the talk of the parish.",
          "Quietly is the only way to talk about the customs men. Even I lower my voice, and I never lower my voice.",
        ],
      },
      {
        text: "No. That is dangerous talk.",
        replies: [
          "It is. You are right to be careful. I shall talk about the weather. Very hot. Very boring.",
          "Sensible, {title}. There are things even I do not gossip about. Two things. This is one.",
          "Very well. But if anyone asks, we discussed the price of {merchandise}.",
          "You have a good head. Keep it on your shoulders, where it is most useful.",
          "Quite right. I never mentioned it. I was talking about my bunions.",
        ],
      },
    ],
  },
  {
    id: "gossip-37",
    text: "The cook from the brigantine out there says the ship's cat is the only one aboard who has not been seasick. And the cat was born ashore.",
  },
  {
    id: "gossip-38",
    text: "A captain told me his ship outran a man-of-war from {enemy}. Do you think that is true?",
    answers: [
      {
        text: "Perhaps. Small ships can be fast.",
        replies: [
          "True. Especially when there is a man-of-war behind them. Nothing makes a ship faster than fear.",
          "Fast, yes. But his ship has a hole you could drive a cart through. I have seen it.",
          "Maybe. He did come in with very fresh paint. A man who repaints his ship is hiding something.",
          "Fair. My cousin's fishing boat once outran a whale. It was a slow whale.",
          "You are kind to him. He would not be so kind to you, if you were the story.",
        ],
      },
      {
        text: "No. He was running from his wife.",
        replies: [
          "Ha! Now that, I would believe. She is fiercer than any man-of-war.",
          "And she nearly caught him too. She has a faster boat.",
          "She came in two days later looking for him. He hid in the church tower. The bells were very muffled that Sunday.",
          "I have met her. Personally I would have surrendered to the man-of-war.",
          "That is the first sensible explanation I have heard all week.",
        ],
      },
      {
        text: "I outran two before breakfast today.",
        replies: [
          "Before breakfast! What did you do after breakfast? Sink the treasure fleet?",
          "Two? Then you are twice the liar he is. I mean that as the highest praise.",
          "Remarkable. Did they get your name? Because I want to tell everyone it was you.",
          "I shall pass that on. By evening it will be five, and they will have been Spanish.",
          "You have the gift, {title}. Never let the truth stand in the way of a good breakfast.",
        ],
      },
    ],
  },
  {
    id: "gossip-39",
    text: "They careened the old galleon on the beach yesterday. They found barnacles, weed, three shoes, a cutlass and a love letter addressed to nobody I know. I am working on it.",
  },
  {
    id: "gossip-40",
    text: "Would you like to hear about the scandal at the governor's ball in {nationTown}?",
    answers: [
      {
        text: "Very much so.",
        replies: [
          "The governor's daughter danced six times with a sea captain. Six! With the same man! Her mother had to be carried out.",
          "Someone poured rum into the punch, which was already rum. The bishop sang. The bishop has never sung.",
          "A lady's wig caught fire on a candle. She did not notice for two whole dances. Everybody else did.",
          "Two officers fought a duel over a lady. She married a third officer the next week. They are still bleeding.",
          "The guest of honour was an envoy from {otherTown}. He fell asleep in the soup. In the soup!",
        ],
      },
      {
        text: "Was I invited?",
        replies: [
          "If you were, the invitation must have got lost. Lost in the governor's fireplace, I expect.",
          "Not that I heard. But nobody worth knowing was invited. That is how you knew it was a good party.",
          "You? No. But your name came up. In a whisper. I could not hear the rest, which is unbearable.",
          "Next time I shall put your name on the list myself. I have done it before. It always causes a fuss.",
          "Invited? {title}, I was not even invited, and I still know who wore what.",
        ],
      },
      {
        text: "I was there. It was dull.",
        replies: [
          "Dull! You must have left early. It became very interesting after midnight.",
          "Then you missed the best part, or you were the best part and do not know it.",
          "You were there? And you come to me with nothing? Shameful, {title}. Shameful.",
          "Dull to you, perhaps. To me, a dull ball is just a scandal that nobody has noticed yet.",
          "Tell me who you danced with. Then I shall tell you why it was not dull at all.",
        ],
      },
    ],
  },
  {
    id: "gossip-41",
    text: "My mother says I should mind my own business. I tell her I have, and it bored me in a week. Everybody else's is far better kept.",
  },
  {
    id: "gossip-42",
    text: "Why do you think the militia captain wears that eye patch?",
    answers: [
      {
        text: "He lost the eye in battle.",
        replies: [
          "That is what he says. His mother says he lost it to a goose when he was nine.",
          "In battle, yes. With a bottle. In a tavern in {otherTown}. The bottle won.",
          "Some battle. He was charging at a cardinal's guard and tripped over a chicken.",
          "Possibly. But he switches it from eye to eye depending on the weather. I have noted it down.",
          "That is the official tale. The unofficial one is much better and involves a jealous fiddler.",
        ],
      },
      {
        text: "It makes him look dashing.",
        replies: [
          "It does, rather. Half the widows in {town} have taken up walking past the barracks.",
          "Dashing? He looks like a pirate who got lost on the way to church.",
          "That is exactly why he wears it. Both his eyes are perfectly fine. I have seen him read the price list.",
          "You think so? I shall tell him you said so. He will be insufferable for a month.",
          "Dashing is generous. He bumps into doorframes about once a day.",
        ],
      },
      {
        text: "So he can only see half the gossip.",
        replies: [
          "Ha! Then he is the luckiest man in {town}. I have to see all of it.",
          "If only. He sees everything and tells his wife, and she tells me. It is very efficient.",
          "Very good, {title}. I shall steal that and tell it as my own.",
          "Half the gossip in this town is still more than most men can carry.",
          "I wish I had thought of that. And I think of everything first.",
        ],
      },
    ],
  },
  {
    id: "gossip-43",
    text: "There is a rumour that a ship sank near {enemyTown} with a hold full of doubloons. There is also a rumour that it was full of turnips. I believe whichever one is being told by the prettier sailor.",
  },
  {
    id: "gossip-44",
    text: "What brings you to {town}, {title}? Business, pleasure or running from something?",
    answers: [
      {
        text: "Business.",
        replies: [
          "Business! How dull. Tell me it is shady business, at least.",
          "Then you will want to know which merchants cheat. All of them, but some less.",
          "Ah, business. That is what every captain says. Then I see him at the window of the widow on the hill.",
          "Good. Business means money, and money means trouble, and trouble means news.",
          "If it is {merchandise}, beware. Everyone in {town} is selling it this week, and none of it is any good.",
        ],
      },
      {
        text: "Running from something.",
        replies: [
          "I knew it! From what? A creditor? A husband? A bishop? Say a bishop.",
          "Oh, splendid. You have come to the right place. Half the town is hiding from the other half.",
          "Tell me nothing. No, tell me everything, slowly, with details.",
          "You can run from many things, {title}, but you cannot run from me. I know where you drink.",
          "Running is a fine tradition. The governor ran here himself, from a marriage back home.",
        ],
      },
      {
        text: "I came to hear your stories.",
        replies: [
          "Flatterer. It is working. Sit down, this will take a while.",
          "Oh, you dear. Nobody has ever come to hear my stories. They usually stay because they cannot escape.",
          "Then you shall have them. The true ones first, then the better ones.",
          "Wonderful. Where shall I start? The bishop, the bosun or the bucket?",
          "That is the nicest thing a captain has said to me since one asked me to stop talking. Very politely.",
        ],
      },
    ],
  },
  {
    id: "gossip-45",
    text: "In my experience, a man who says he has nothing to hide has simply not been asked the right questions. Over the right cup of wine. By me.",
  },
  {
    id: "gossip-46",
    text: "A sailor swears the governor of {otherTown} keeps a monkey that does his accounts. Do you believe it?",
    answers: [
      {
        text: "That would explain the taxes.",
        replies: [
          "Ha! Yes! That is exactly what I said. Nobody laughed. You laughed.",
          "The monkey would at least be honest. It would steal bananas, not guilders.",
          "I shall tell everyone the monkey is to blame for the harbour fees. The monkey cannot defend itself.",
          "That monkey probably earns more than I do. I am not even jealous. I am a little jealous.",
          "Wonderful. Next you will tell me the parrot handles his letters.",
        ],
      },
      {
        text: "No, monkeys cannot count.",
        replies: [
          "Neither can the governor, and nobody stops him.",
          "So you say. The monkey has never been caught making an error. That is more than his clerk.",
          "Then who counts the money? Do not say the governor. Everyone knows he uses his fingers.",
          "A monkey cannot count, but it can sign. A cross is a cross, {title}.",
          "Perhaps not. But it has a very serious little face. That is enough for most offices.",
        ],
      },
      {
        text: "I have met the monkey. Charming fellow.",
        replies: [
          "You have? What was he wearing? Was it lace? I heard it was lace.",
          "Charming! More charming than the governor? Do not answer. I know.",
          "Then you must tell me everything. Does he take bribes? Does he prefer figs?",
          "I knew it was true. I always know. Mostly.",
          "Did he offer you a contract? Do not sign it. He bites.",
        ],
      },
    ],
  },
  {
    id: "gossip-47",
    text: "I once spent three weeks spreading a rumour that the governor was secretly bald. Then he took off his hat at church. I have never been so proud of a hunch.",
  },
  {
    id: "gossip-48",
    text: "There has been trouble between the Company men and the planters near {nationTown}. Shall I tell you why?",
    answers: [
      {
        text: "Go on, then.",
        replies: [
          "The planters say the Company pays too little. The Company says the planters lie about their sacks. Both are right.",
          "It started over a horse. It is now about land, honour, and a woman, in that order.",
          "Someone moved a boundary stone at night. Twice. In opposite directions.",
          "The Company agent called a planter's sugar dirty. The planter called the agent's mother something I shall not repeat until later.",
          "Taxes, rum and somebody's nephew. It is always somebody's nephew.",
        ],
      },
      {
        text: "No. It is none of my concern.",
        replies: [
          "Not yet. Wait until you try to buy sugar there. Then it will be all your concern.",
          "A wise captain keeps out of quarrels. A clever one profits from them. Which are you?",
          "Very well. I shall tell it to the next captain, and he will get rich, and you will hear about it.",
          "That is what the last captain said before he was caught in the middle of it.",
          "You would rather not know? I would rather die. We are very different people.",
        ],
      },
      {
        text: "Because you started a rumour.",
        replies: [
          "Me? I never start anything. I merely help things along.",
          "Well, I may have mentioned something to someone. But only once. To several people.",
          "Unfair. This one started all by itself. I only gave it a push and a name.",
          "If I started every quarrel I am blamed for, I would need three tongues and a horse.",
          "Ha! You think too highly of me. I only started the second half of it.",
        ],
      },
    ],
  },
  {
    id: "gossip-49",
    text: "News travels slower than a Dutch fluyt in a calm, but once it lands in {town}, it travels faster than a man running from his landlady.",
  },
  {
    id: "gossip-50",
    text: "Do you think the war with {enemy} will be over by the end of {year}?",
    answers: [
      {
        text: "I hope so. Too many have died.",
        replies: [
          "Amen to that. My sister's boy went to sea and we have heard nothing since Candlemas.",
          "Too many, yes. And all for kings who will never see this sea. It makes my blood boil.",
          "You are a kind soul, {title}. Not many captains say that out loud.",
          "I hope so too. Peace is bad for gossip, but good for everything else.",
          "So do I. Though I notice the governor's purse grows fatter every month it lasts.",
        ],
      },
      {
        text: "Never. Wars here never end, they just take a nap.",
        replies: [
          "Ha! Like my uncle. He never stops snoring, he just changes rooms.",
          "True. The Spanish and the Dutch have been at it for seventy years. They have forgotten how to stop.",
          "Grim, but probably right. The war is older than half the people fighting it.",
          "A nap! I like that. I shall use it. I shall say I heard it from a very wise captain.",
          "Then we shall all keep talking about it forever. Good. I need the material.",
        ],
      },
      {
        text: "It ends when I say so.",
        replies: [
          "Oh, does it? Then hurry up and say so. My cousin's shipment of {merchandise} is stuck in {nationTown}.",
          "Splendid. I shall tell the governor. He will be so relieved to know who is in charge.",
          "Modest as ever, {title}. Shall I fetch your crown, or have you mislaid it?",
          "Then say it now, so I can tell everyone I was there.",
          "If only kings were as confident as captains. We would have had peace by Lent.",
        ],
      },
    ],
  },
  {
    id: "gossip-51",
    text: "The old priest says idle talk is a sin. I say there is nothing idle about it. I work very hard at mine.",
  },
  {
    id: "gossip-52",
    text: "{name}, do you know what the tavern keeper puts in his famous stew?",
    answers: [
      {
        text: "Salt pork and beans, I assume.",
        replies: [
          "That is what he wants you to think. The beans are real. The pork is a matter of debate.",
          "Pork, yes. From a pig, mostly. Do not ask about the rest.",
          "Beans and pork and something from the harbour that no one has been able to identify. Not even the cat.",
          "Close. But he also adds rum, to make people stop asking.",
          "That is the polite answer. The true answer would put you off your supper for a week.",
        ],
      },
      {
        text: "I do not want to know.",
        replies: [
          "Very wise. Nobody who knows has ever eaten it again.",
          "Good. I took an oath not to tell. I take a great many oaths and keep very few, but this one I keep.",
          "Then eat it quickly and think of {otherTown}.",
          "Some secrets are better left in the pot.",
          "A sensible captain. You will live longer than most.",
        ],
      },
      {
        text: "Your secrets. That is why it is so spicy.",
        replies: [
          "Ha! Then it must be the spiciest stew in the Indies. I have more secrets than he has pots.",
          "If he used my secrets, the whole town would be choking by now.",
          "Clever. Too clever. I shall have to keep an eye on you.",
          "Not mine. His wife's. She has more than I do, and I am jealous.",
          "I shall tell him that. He will put it on the sign.",
        ],
      },
    ],
  },
  {
    id: "gossip-53",
    text: "I knew a captain from {nationTown} who claimed he had sailed round the world. He meant round {nationTown}. In a rowing boat. Twice.",
  },
  {
    id: "gossip-54",
    text: "The priest says I should confess my gossiping. I did, last Sunday. It took two hours and he asked me to stop three times. Then he asked who the widow was.",
  },
  {
    id: "gossip-55",
    text: "Did you know you have a reputation now, {title}?",
    answers: [
      {
        text: "A good one, I hope.",
        replies: [
          "Good enough. You are known as the captain who pays and does not stab. That is rare.",
          "Mixed. The tavern likes you, the priest does not, and the dog is undecided.",
          "Good, for now. A reputation is like a sail, it only takes one storm to tear it.",
          "They say you are fair. I am working on something more exciting.",
          "Good, yes. Do not worry. I can fix that if you ever get boring.",
        ],
      },
      {
        text: "Whatever it is, you started it.",
        replies: [
          "I did not start it. I only described you to a few people. Quite accurately.",
          "Guilty. But it is a very nice reputation. Mostly. Some of it involves an eel.",
          "Of course I started it. Who else in {town} has the imagination?",
          "You should be grateful. Without me, you would just be a man with a boat.",
          "I start everybody's reputation. Some of them even recover.",
        ],
      },
      {
        text: "Is it the one about the cannon and the goat?",
        replies: [
          "Oh, there is one about a cannon and a goat? Tell me at once. I need this.",
          "No, but it is now. Thank you for your contribution.",
          "That one is old news. They are on to the one about the bishop's hat now.",
          "I had heard rumours of a goat. I did not dare hope for a cannon.",
          "You are a gift, {title}. A ridiculous gift, but a gift.",
        ],
      },
    ],
  },
  {
    id: "gossip-56",
    text: "I would tell you to watch yourself, {title}, but I am already doing that for you. Everyone in {town} is, really.",
  },
]
