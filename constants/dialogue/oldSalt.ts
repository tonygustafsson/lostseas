import "server-only"

export const OLD_SALT: DialogueEntry[] = [
  {
    id: "oldSalt-1",
    text: "Forty years at sea, {title}, and I've learned one thing. The sea don't care who you are. Neither do I, but I'm cheaper company.",
  },
  {
    id: "oldSalt-2",
    text: "You've the look of a landsman about you, {name}. Ever been seasick?",
    answers: [
      {
        text: "Never once.",
        replies: [
          "Liar. Every man's been sick. Even me, once, and I still blame the cook.",
          "Never? Then you've not sailed far enough. Wait for a proper blow off {otherTown}.",
          "Hah. Say that after three days hove to in a hurricane. I'll wait.",
          "Good. Keep it that way. Biscuit in the belly, eyes on the horizon.",
          "Then you're either a born sailor or a born liar. Both do well out here.",
        ],
      },
      {
        text: "Only when I hear your stories.",
        replies: [
          "Sharp tongue. The sea blunts those quick enough.",
          "Hah! Then you'll be retching till Michaelmas, because I've got hundreds.",
          "Cheeky pup. I've had better insults from a gull, and the gull meant it.",
          "That's the drink, not the story. Mine are all true. Mostly. Some of them.",
          "My late wife said the same. She married me anyway, so there's hope for you.",
        ],
      },
      {
        text: "Yes, constantly. Even on land.",
        replies: [
          "Honest, at least. That's rare in {town}.",
          "On land? That's the ground still rolling from your last voyage. Takes a week to settle.",
          "Chew ginger and stare at something that don't move. Not me. I sway.",
          "Then you're halfway to a sailor already. The other half is complaining.",
          "Land sickness. Worse than the sea kind. Only cure is going back out.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-3",
    text: "Tar, rum and salt pork. That's what holds a sailor together. Which of the three could you give up, {name}?",
    answers: [
      {
        text: "The salt pork.",
        replies: [
          "Then you'll starve, but you'll starve happy and well caulked.",
          "Fair. Salt pork after a year in the cask could sole a boot. I've seen it done.",
          "Aye, it's the easiest to lose. The cook does it for you most voyages.",
          "Brave. What'll you eat instead? Biscuit? You'll be begging for pork by week two.",
          "Sensible. Mind, the pork's what keeps the tar company in your belly.",
        ],
      },
      {
        text: "The rum.",
        replies: [
          "Out. Get out of my sight. No, sit down, I'm too old to chase you.",
          "Give up rum? Then what holds the tar and the pork together? Think, {title}.",
          "I tried that once. The ship sank. I'm not saying it was connected, but I'm not saying it wasn't.",
          "Hah! You'll be back. They all come back to it.",
          "A sober sailor. I've heard of them. Never met one that lived long.",
        ],
      },
      {
        text: "The tar. I'll caulk the hull with rum.",
        replies: [
          "Hah! The ship'd be drunk before the crew. Might sail better, mind.",
          "Waste of good rum and bad caulking both. I like the thinking, though.",
          "Tried it on a rowing boat once. Sank, but she sank smiling.",
          "That's the most dangerous idea I've heard since the Dutch tried to drain the sea.",
          "Clever. Then when you spring a leak, you just drink the hull. Saves bailing.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-4",
    text: "I sailed with a man once who swore he was at Matanzas with Piet Heyn. Do you believe every old sailor's tale?",
    answers: [
      {
        text: "Only the ones about sea monsters.",
        replies: [
          "Wise. The monster ones are the only honest ones. I've seen three.",
          "Then you'll like this. A squid off Bonaire took my hat. Just the hat. Very particular squid.",
          "Hah. The monsters are real enough. It's the treasure stories you want to doubt.",
          "Good choice. Monsters don't need to lie. Men do it for them.",
          "Sea monsters, aye. I'll tell you one later. You'll need a drink first.",
        ],
      },
      {
        text: "Not a word.",
        replies: [
          "Smart. Half the men in {town} claim they were at Matanzas. The fleet would've sunk under the weight.",
          "Good. Trust the tide tables and your own eyes. Nothing else.",
          "Then you'll not believe me either, and that's fair. But I was there. Near enough.",
          "A doubter. You'll live longer than most, if not happier.",
          "Hard heart. Leave an old man his stories, {title}. They're all he's got left.",
        ],
      },
      {
        text: "I was at Matanzas myself, actually.",
        replies: [
          "Were you now? And I'm Philip of Spain, come for my silver back.",
          "You'd have been in swaddling clothes, {name}. Unless you sailed in your cradle.",
          "Hah! That's the spirit. Lie big, lie proud, and never take it back.",
          "Then you owe me a share. I've been owed a share since '28 and nobody's paid.",
          "Mind who you say that to. There's still plenty sore about it, and they've long memories.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-5",
    text: "Never trust a man who's never had scurvy. Means he's either rich or he's never been anywhere worth going.",
  },
  {
    id: "oldSalt-6",
    text: "Weather's turning, {title}. My knee says so, and my knee's never been wrong. My head, often. My knee, never.",
  },
  {
    id: "oldSalt-7",
    text: "What brings one {playerNationAdjective} sailor sniffing round {town}, then?",
    answers: [
      {
        text: "Trade. I deal in {merchandise}.",
        replies: [
          "{merchandise}, is it? Sell it before the next ship comes in and the price drops like an anchor.",
          "Honest work. Dull, but honest. I did a run of it once and nearly died of boredom.",
          "Watch the scales in the market. Some traders here weigh with their thumbs.",
          "A merchant. Well, someone's got to pay the harbour fees so the rest of us don't.",
          "Good. Gold in the hold beats lead in the belly. I learned that the painful way.",
        ],
      },
      {
        text: "I heard the rum here is legendary.",
        replies: [
          "Legendary for what it does to your liver, maybe.",
          "Whoever told you that was paid to say it. Or drunk. Probably both.",
          "Hah. It'll strip the tar off a hull. That's a kind of legend.",
          "It's honest rum. Burns going down and burns coming back up. Can't ask fairer.",
          "Legendary? I've had better from a Barbados still made out of an old boot.",
        ],
      },
      {
        text: "I'm hunting {enemyAdjective} ships.",
        replies: [
          "Keep your voice down. Walls in {town} have ears, and half the ears drink for both sides.",
          "Brave or foolish. Usually the same thing until the first broadside.",
          "The {enemyAdjective} run their ships heavy and slow near {enemyTown}. Not that I said so.",
          "Good hunting. Bring back a story worth telling and I'll drink to it.",
          "Hunting, is it? Just make sure they don't hunt you first. They've cannon too, I hear.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-8",
    text: "The secret to careening, {name}, is to pick a beach with no patrols, no mosquitoes and no crew who can count your rum. You'll never find all three.",
  },
  {
    id: "oldSalt-9",
    text: "I've been shipwrecked four times. Five if you count the time I fell asleep in a rowing boat. I count it. Ever lost a ship, {title}?",
    answers: [
      {
        text: "Never. Not one.",
        replies: [
          "Give it time. The sea's patient. Far more patient than me.",
          "Touch wood when you say that. Not my leg. Real wood.",
          "Then you're either young, lucky or you've never left the harbour.",
          "Good. Keep it so. Losing a ship's like losing a wife, only louder.",
          "Not one? Hah. I lost my first a week out of {nationTown}. Ran her onto a reef that wasn't on any chart. Is now.",
        ],
      },
      {
        text: "Once. I still dream about it.",
        replies: [
          "Aye. So do I. Every one of them. The sea leaves its mark on a man.",
          "That's the sea's way of reminding you who's in charge.",
          "Sorry to hear it. Drink to her name. Ships like to be remembered.",
          "You survived. That's what counts. Ships can be bought. You can't.",
          "Dreams fade. Mostly. Except the one where I'm drowning in salt pork. That one stays.",
        ],
      },
      {
        text: "Yes, but I found it again later.",
        replies: [
          "Found it? Where, in your pocket?",
          "Hah! Left it at the wrong dock, did you? Happens to the best of us after a long night.",
          "That's not losing, that's misplacing. Different thing entirely.",
          "Lucky. I lost one off {otherTown} and found it ten years later. Someone else was sailing her.",
          "Next time tie a string to it. That's what I do with my teeth.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-10",
    text: "Ship's biscuit. Ever had one with weevils in it?",
    answers: [
      {
        text: "The weevils are the best part.",
        replies: [
          "Hah! A true sailor. They're the only fresh meat you'll see for a month.",
          "Spoken like a man who's been at sea too long. I like you already.",
          "Aye, a bit of crunch. Adds character. And legs.",
          "You and me both. My old bosun used to race them across the table. Ate the losers.",
          "Careful. Say that in a tavern and the cook'll start charging you extra for them.",
        ],
      },
      {
        text: "I knock them out first.",
        replies: [
          "Rap it on the table, aye. The smart ones leave. The dumb ones are dinner.",
          "Very refined. You'll make a fine captain's wife one day.",
          "Waste of time. They come back. They always come back.",
          "Proper habit. A sailor that can't keep his biscuit clean can't keep his ship clean.",
          "Sensible. Though a weevil never hurt nobody. Rotten salt pork, now, that's a killer.",
        ],
      },
      {
        text: "I only eat fresh bread.",
        replies: [
          "Then stay ashore, your lordship. Fresh bread lasts two days at sea, then it's green.",
          "Fresh bread! Hear that? The sailor wants fresh bread. Next you'll want a feather bed.",
          "You'll learn. Week three out of {town}, you'd fight a gull for a mouldy crust.",
          "Ah, a landsman. Thought so. You've the soft hands for it.",
          "Fresh bread's for governors and the dead. Neither of them sail much.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-11",
    text: "Back when I was young, the {enemyAdjective} and us would trade insults across the water before trading shot. More civilised. More fun, too.",
  },
  {
    id: "oldSalt-12",
    text: "Mark me, {title}. A ship is a woman, the sea is her mother, and the captain is the poor fool who married into the family.",
  },
  {
    id: "oldSalt-13",
    text: "Word is the flota's gathering at Havana for the run home. Ever thought of chasing Spanish silver?",
    answers: [
      {
        text: "I dream of it every night.",
        replies: [
          "So did a hundred men now feeding fish. Dream smaller and live longer.",
          "Piet Heyn dreamt it too. Difference is he had the whole Dutch company behind him.",
          "Aye, so do I. In my dream the galleons surrender and the Spanish cook me supper.",
          "Dreams are free. Galleons carry forty guns. Weigh that before you weigh anchor.",
          "Keep dreaming, {name}. One day you might wake up rich. Or wake up in a Havana gaol.",
        ],
      },
      {
        text: "I'd rather chase a good night's sleep.",
        replies: [
          "Hah! The wisest thing said in this town all week.",
          "Now there's a treasure worth having. I've not slept a full night since '19.",
          "Sensible. Silver don't keep you warm. A hammock does.",
          "A man after my own heart. Let the young fools get shot at.",
          "Sleep's easy to catch. It's waking up alive that takes skill.",
        ],
      },
      {
        text: "I've already got a map to the silver.",
        replies: [
          "Everyone's got a map. I've got nine. Sold six of them.",
          "Show me. No, don't. I'll only feel sorry for you.",
          "A map, is it? Did a one-eyed man in a tavern sell it to you? Thought so.",
          "Maps lie, {title}. The sea moves. The silver moves. Only the sharks stay put.",
          "Keep it close to your chest. Then burn it. That's my advice for every map.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-14",
    text: "A hurricane took my first ship off {otherTown}. Took my second one too. I don't sail in autumn now. I drink in autumn.",
  },
  {
    id: "oldSalt-15",
    text: "There's a cure for everything at sea, {name}. Lemons for scurvy, tar for leaks, rum for everything else.",
  },
  {
    id: "oldSalt-16",
    text: "Tell me true, {title}. Which is worse at sea, the storms or the crew?",
    answers: [
      {
        text: "The storms.",
        replies: [
          "Spoken like a man who's never had a mutinous cook.",
          "Storms pass. I'll grant you they try very hard to take you with them.",
          "Aye, a proper blow will humble any man. Even me. Briefly.",
          "Fair. A storm don't argue, it just drowns you. Almost restful.",
          "A storm took my eyebrows once. Lightning. Never grew back right.",
        ],
      },
      {
        text: "The crew.",
        replies: [
          "Right answer. A storm never stole my boots.",
          "Hah! A captain's answer. Keep them fed, keep them paid, keep your back to the wall.",
          "Aye. You can reef against a storm. You can't reef against forty thirsty men.",
          "I've seen more ships lost to grumbling than to gales.",
          "Truth there. Mind, a crew is just a storm with legs and opinions.",
        ],
      },
      {
        text: "The old men in taverns.",
        replies: [
          "Watch it. I've thrown younger men than you into the harbour.",
          "Hah! Cheek. I'll forgive it, but only because I'm too stiff to stand up.",
          "We're the worst of all, aye. We've survived both and we won't shut up about it.",
          "Careful. Every old man in a tavern was once a young fool like you.",
          "Insult me all you like. I've had worse from a parrot. It was a very rude parrot.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-17",
    text: "Barbados used to be all tobacco. Now it's sugar, sugar, sugar. Which would you rather carry in your hold, {name}?",
    answers: [
      {
        text: "Sugar. That's where the money's going.",
        replies: [
          "Aye, the planters are tearing up tobacco faster than a gale tears sails.",
          "Smart. Sugar sells in every port from here to Amsterdam.",
          "Mind the damp. Wet sugar's just sticky ballast.",
          "Sugar today, rum tomorrow. Next they'll be planting rum straight in the ground.",
          "Good choice. Sweet cargo, sour planters. They'll still try to cheat you on the weight.",
        ],
      },
      {
        text: "Tobacco. I like my cargo smokeable.",
        replies: [
          "Hah! A man after my own heart. But watch the crew. Half the cargo goes up in their pipes.",
          "Tobacco's old news, they say. Then again, so am I.",
          "Good leaf, Barbados tobacco. Used to be, anyway. Now it tastes of disappointment.",
          "Smoking your profits, are you? I did that once. Profitable smoke, poor captain.",
          "Aye. Sugar doesn't help you think. A good pipe does.",
        ],
      },
      {
        text: "Neither. I'm carrying parrots.",
        replies: [
          "Parrots? You'll go mad before you reach port. They never stop talking.",
          "Hah! A hold full of parrots. You'll arrive knowing every swear word in four languages.",
          "Parrots! Well, they're lighter than sugar. Noisier, mind.",
          "Sell them to governors. Governors love anything that repeats what they say.",
          "Teach them to sing shanties and you'll be the richest fool in {town}.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-18",
    text: "I knew a man in {nationTown} who could smell land from forty leagues. Turned out he was smelling the cook. We were three weeks off course.",
  },
  {
    id: "oldSalt-19",
    text: "They say Charles and his Parliament are at each other's throats back in England. Do you care about kings and their quarrels?",
    answers: [
      {
        text: "Not one bit.",
        replies: [
          "Good. Kings don't care about you either. Fair trade.",
          "Aye. Out here the only crown that matters is the one on a doubloon.",
          "Sensible. Kings change. The sea stays the same.",
          "That's the proper spirit. Let them squabble. We'll sell them both powder.",
          "Wise. Pick a side in a quarrel like that and you'll end up shot by both.",
        ],
      },
      {
        text: "I'd make a better king than any of them.",
        replies: [
          "You? You can't even hold your rum straight.",
          "King {name}. Has a ring to it. A small brass ring, but a ring.",
          "Hah! Every sailor thinks that. Then they try running a ship with six men and give up.",
          "Then start small. Be king of this table. Buy the next round.",
          "Mind you don't say that too loud. Treason's a long drop on a short rope.",
        ],
      },
      {
        text: "Only if they pay their sailors.",
        replies: [
          "Then you'll care about none of them, because none of them do.",
          "Aye, that's the only royal question worth asking.",
          "Ha. I'm owed back pay from a king who's been dead fifteen years.",
          "Right. A king's promise is worth less than wet biscuit.",
          "Pay? Kings pay in medals and fine words. Can't eat neither.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-20",
    text: "Never whistle on deck, {title}. You'll whistle up a wind. Are you the superstitious sort?",
    answers: [
      {
        text: "I follow every sailor's custom.",
        replies: [
          "Good. Customs keep you alive. Or at least they keep the crew from throwing you over.",
          "Wise. I once saw a man whistle in a calm. We had a hurricane by supper.",
          "Aye. No whistling, no women aboard and never board with your left foot first. That last one's mine, mind.",
          "Smart. Superstition's just experience nobody wrote down.",
          "Proper. And never sail on the feast of a saint you've offended. Ask me how I know.",
        ],
      },
      {
        text: "No. I make my own luck.",
        replies: [
          "Everyone says that. Till the sea gets angry. Then they pray like monks.",
          "Brave. Foolish, but brave.",
          "Make your own luck? Then make me some while you're at it.",
          "Hah! Whistle away, then. I'll sit on the other side of the room.",
          "Spoken like a man who's never seen a shark circle a ship three times.",
        ],
      },
      {
        text: "I whistle constantly. It annoys the bosun.",
        replies: [
          "Then the bosun will whistle you over the side. And I'd help him.",
          "Ha! Good. Bosuns need annoying. Keeps them humble.",
          "You'll whistle up a storm one day, and I hope I'm ashore for it.",
          "Annoying a bosun? Brave. They've got rope and long memories.",
          "That explains the weather we've been having in {town}.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-21",
    text: "Lost a toe to frostbite in the north seas. Lost another to a falling cask in {otherTown}. The other eight are holding a meeting about it.",
  },
  {
    id: "oldSalt-22",
    text: "You've a ship of your own then, {name}? How do you keep her hull clean?",
    answers: [
      {
        text: "I careen her every few months.",
        replies: [
          "Good sailor. Barnacles slow a ship worse than a drunk helmsman.",
          "Proper seamanship. Most young captains wait till she sails like a log.",
          "Every few months? Show-off. But right.",
          "Mind the beach you pick. Lie her on her side near a garrison and you'll lose more than barnacles.",
          "Scrape, burn, tar, repeat. Dull work. Saves lives.",
        ],
      },
      {
        text: "I tell the barnacles to leave politely.",
        replies: [
          "Hah! And do they listen? Mine never did. Rude creatures, barnacles.",
          "Polite, is it? Barnacles only understand fire and a scraper.",
          "You'll be sailing at a snail's pace by {month}, mark me.",
          "Try shouting. Doesn't work either, but you'll feel better.",
          "A diplomat. Should've been a governor. You'd fit right in at City hall.",
        ],
      },
      {
        text: "What's a hull?",
        replies: [
          "Stars help us. Go back to farming, {title}.",
          "It's the bit that keeps the sea out. Mostly.",
          "Hah! You're having me on. Aren't you? Please say you are.",
          "That settles it. You're buying, and I'm explaining.",
          "I've met admirals who asked the same, so you're in fine company. Doomed, but fine company.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-23",
    text: "The Dutch West India Company built half the forts in these waters. Ever done business with them?",
    answers: [
      {
        text: "Yes. They drive a hard bargain.",
        replies: [
          "Hard? They'd sell you your own boots and charge you for the laces.",
          "Aye. But they pay on time, which is more than any king does.",
          "A Dutchman's bargain is like a Dutchman's dyke. Nothing gets through it.",
          "You got out with your shirt? Then you did well.",
          "Fair dealers, mind. Hard, but fair. Like a good bosun.",
        ],
      },
      {
        text: "No. I don't trust them.",
        replies: [
          "Wise. They count coins in their sleep. Both eyes open.",
          "Fair. They built half the forts and overcharge for the other half.",
          "Trust's not needed. Just bring a good set of scales and a sharper set of eyes.",
          "Can't blame you. A Dutch contract has more pages than a bible and less mercy.",
          "Smart. They're the only men who can sell a fort back to the man they took it from.",
        ],
      },
      {
        text: "I tried. They charged me for asking.",
        replies: [
          "Hah! That's the Company all over. They'd charge the wind for blowing.",
          "Did they give you a receipt? They always give receipts.",
          "Sounds about right. I once asked a Dutch clerk the time. Cost me a stiver.",
          "Next time ask a cheaper question.",
          "Aye, and they'll charge you again for leaving. Mark me.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-24",
    text: "My grandfather told me the trick to a long life at sea. Then he fell overboard before he could finish the sentence.",
  },
  {
    id: "oldSalt-25",
    text: "A word of advice, {title}. When you come to port, what's the first thing you do?",
    answers: [
      {
        text: "Find the market.",
        replies: [
          "A merchant's answer. Fair enough. Prices change by the hour in {town}.",
          "Good. Sell before the gossip spreads about your cargo.",
          "Aye, but check your hold first. Rats like {merchandise} more than you do.",
          "Practical. Dull, but practical. You'll die rich and bored.",
          "Smart. Gold first, rum second. I did it the other way round for thirty years.",
        ],
      },
      {
        text: "Find the tavern.",
        replies: [
          "That's my sort of sailor. And here you are, sitting with the finest company in it.",
          "Right answer. Tavern's where you hear what the harbour master won't tell you.",
          "Aye, a man needs his priorities straight.",
          "Good. But keep one hand on your purse. {town} has quick fingers.",
          "The tavern, and then the tavern again. That's how I've spent most of my life.",
        ],
      },
      {
        text: "Kiss the ground and swear never to sail again.",
        replies: [
          "Hah! Every sailor swears that. Every sailor's back aboard in a week.",
          "I've sworn it twelve times. The sea always calls me back. Or my debts do.",
          "Rough crossing, was it? It gets easier. Well, no. It doesn't. You just get used to it.",
          "Mind where you kiss. The docks at {town} are no place for lips.",
          "That's how I felt after my first voyage. I've been at sea forty years since.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-26",
    text: "The Inquisition burned a sailor's almanac once because it predicted the weather right. Too accurate to be holy, they said.",
  },
  {
    id: "oldSalt-27",
    text: "The {enemyAdjective} cook their salt pork different. Worse, naturally. Everything they do is worse. Except their brandy. I'll grant them their brandy.",
  },
  {
    id: "oldSalt-28",
    text: "Have you met the buccaneers on Hispaniola yet, {name}? Wild hunters, the lot of them. Smoke their meat on wooden frames.",
    answers: [
      {
        text: "I've shared a fire with them.",
        replies: [
          "Then you've got a stronger stomach than me. They eat things I'd not feed a dog.",
          "And you're still here with all your fingers? Lucky or charming.",
          "Good folk, mostly. Don't argue with them over cards, though.",
          "Aye, they're honest in their way. They'll rob you to your face, not behind your back.",
          "Did they offer you the boar's head? That's a mark of respect. Or a joke. Hard to tell.",
        ],
      },
      {
        text: "I prefer my meat uncooked and my company civilised.",
        replies: [
          "Uncooked? You're wilder than they are.",
          "Civilised company? Then why are you talking to me?",
          "Hah! You'd last a day with them before they turned you into supper.",
          "Raw meat at sea means the cook's dead. Generally a bad sign.",
          "Civilised, he says. In the Caribbean. I've heard it all now.",
        ],
      },
      {
        text: "Are they hiring?",
        replies: [
          "Always. The pay's in hides and the pension's an early grave.",
          "If you can shoot a wild cow at a hundred paces, aye. Can you?",
          "Go to Tortuga and ask. They'll hire you or shoot you. Either way, it's quick.",
          "Hah! Bring your own musket and leave your manners behind.",
          "They don't hire. They adopt. Like stray cats, but with knives.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-29",
    text: "I prefer my rum like my ships. Old, dark and full of holes that nobody's admitted to yet.",
  },
  {
    id: "oldSalt-30",
    text: "There's a reason sailors pray to St. Nicholas, {title}. Nobody else up there will listen to us.",
  },
  {
    id: "oldSalt-31",
    text: "So, {title}, what would you do if your crew ran short of fresh water halfway across?",
    answers: [
      {
        text: "Ration it strictly.",
        replies: [
          "Right. Half a cup per man, and the captain gets the same. Crews remember that.",
          "Good. Fairness keeps a crew loyal longer than gold does.",
          "Aye. And watch the water butts at night. Thirsty men turn thieves.",
          "That's how my old captain did it. We made port with one cup left. Never been so happy to see {nationTown}.",
          "Sensible. Then pray for rain. Spread a sail to catch it.",
        ],
      },
      {
        text: "Make them drink rum instead.",
        replies: [
          "Hah! That works for about a day. Then they start seeing mermaids.",
          "A popular captain, briefly. Then a very confused one.",
          "I sailed with a man who tried that. We ended up in {otherTown} instead of where we were going.",
          "Rum's no substitute. Trust me. I've done the research. Years of it.",
          "The crew'll love you. Until the hangover. Then they'll hate you, very quietly.",
        ],
      },
      {
        text: "Drink seawater. How bad can it be?",
        replies: [
          "Bad. Madness, then death. In that order, if you're lucky.",
          "Don't. I watched a man try it. He started arguing with the mast. Lost.",
          "Hah! You'll be the first to go, {name}. I'll write it on your marker.",
          "Very bad. Worse than the rum here, and that's saying something.",
          "Saltwater's for floating on, not drinking. Even the fish know that.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-32",
    text: "Twenty years before {year}, I'd have climbed that rigging in a minute flat. Now it takes me a minute to climb out of my chair.",
  },
  {
    id: "oldSalt-33",
    text: "They say the plague's come to some port in the Old World again. What do you do when a ship comes in with sickness aboard?",
    answers: [
      {
        text: "Keep well clear of it.",
        replies: [
          "Right. Plague rides on rats and rats ride on ships. Simple as that.",
          "Wise. I watched a whole town empty in a month, once. Never forgot the smell.",
          "Good. Keep your rats on a short lead, and don't kiss foreigners.",
          "Aye. Send them to anchor off the point and row the other way.",
          "Sensible. Better a cold welcome than a warm grave.",
        ],
      },
      {
        text: "Buy their cargo cheap.",
        replies: [
          "Cheap now, dear later. Plague don't haggle.",
          "Hah! A merchant to the bone. I hope you like dying rich.",
          "Bold. Stupid, but bold. Burn the sacks first, at least.",
          "I knew a man who did that in {otherTown}. Very cheap funeral, too.",
          "That's how fortunes are made. Also how cemeteries are filled.",
        ],
      },
      {
        text: "Prescribe rum and a good shanty.",
        replies: [
          "Not the worst cure I've heard. Better than the barber surgeon's leeches.",
          "Hah! If rum cured plague, I'd be immortal.",
          "Can't hurt. Well, the shanty might, depending who sings it.",
          "Aye, that's my remedy for everything. Hasn't killed me yet.",
          "You should be a physician, {title}. You'd be as useless as the rest, but more cheerful.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-34",
    text: "What do you think of the {nationAdjective} soldiers garrisoned here in {town}?",
    answers: [
      {
        text: "They seem disciplined.",
        replies: [
          "Disciplined at drinking, maybe. I've watched them march. They walk like they're on a rolling deck.",
          "Aye, they polish their buckles well enough. Can't tell you if they can fight.",
          "They'll hold the fort, I suppose. Long as nobody attacks.",
          "Discipline's what they call it when they're too scared of the sergeant to desert.",
          "Well, they've not set fire to the town this year. That's progress.",
        ],
      },
      {
        text: "I could take them all with a wooden spoon.",
        replies: [
          "Hah! You might at that. Half of them are asleep by noon.",
          "Say it louder and see how far the spoon gets you.",
          "Brave words. I'll come watch. From a safe distance. With rum.",
          "A wooden spoon? Bring a ladle. Soldiers here have thick skulls.",
          "I once saw a sailor knock out a sentry with a herring. So don't let me stop you.",
        ],
      },
      {
        text: "I try not to think about soldiers.",
        replies: [
          "Wise. Soldiers are like gulls. Noisy, hungry and always on the shore.",
          "Fair enough. They don't think much either.",
          "Good. Thinking about soldiers is how you end up being one.",
          "Keep it that way. Soldiers and sailors don't mix, except in brawls.",
          "Nor do I. Except when they owe me money. Which is always.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-35",
    text: "If you ever sail near {enemyTown}, {title}, keep your guns run out and your mouth shut. They've long memories and short tempers.",
  },
  {
    id: "oldSalt-36",
    text: "Lost my hearing in one ear to a twelve-pounder. Now I always sit with my good ear to the wall. Hear all the gossip that way.",
  },
  {
    id: "oldSalt-37",
    text: "What's the most important thing aboard a ship, would you say?",
    answers: [
      {
        text: "A good navigator.",
        replies: [
          "Aye. Without one you're just a floating tavern waiting to sink.",
          "Smart. A navigator who knows his stars is worth his weight in doubloons.",
          "True. I knew one who could find {otherTown} blindfolded. Drunk too.",
          "Good answer. Gold won't buy you the way home if nobody knows where it is.",
          "Right enough. Mind, keep him sober. A drunk navigator will find you every reef in the Caribbean.",
        ],
      },
      {
        text: "Plenty of rum.",
        replies: [
          "Hah! That's what I'd have said at your age. And I'd have been right.",
          "Rum keeps the crew happy. Happy crews don't mutiny. Simple sailor logic.",
          "Aye, but stow it under lock. I've seen whole barrels evaporate overnight. Strange weather.",
          "Plenty of rum, plenty of trouble. Can't have one without the other.",
          "A man of taste. Make it Barbados rum and I'll sail with you myself.",
        ],
      },
      {
        text: "The ship's cat.",
        replies: [
          "Now there's a sensible answer. A good cat saves more biscuit than a good cook.",
          "Aye! Ours was called Admiral. Better at the job than the real one.",
          "Ha. Laugh all you like, a ship without a cat is a ship full of rats.",
          "True. Mind, a cat outranks the captain on most ships I've sailed.",
          "Treat the cat right, or the crew'll treat you wrong. Sailors love their cats more than their wives.",
        ],
      },
      {
        text: "The hole in the bottom. Very important to avoid.",
        replies: [
          "Hah! True enough. Most important thing is the one you don't have.",
          "Clever, aren't you. Clever and dry. Stay that way.",
          "You'd be surprised how many captains forget that one.",
          "Aye. Everything above that is optional, really.",
          "Spoken like someone who's had one. I've had three. Not all at once, thank the saints.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-38",
    text: "Some captain told me the Spanish salt their cannonballs for luck. I salted mine. Didn't help. Did make the fish sneeze.",
  },
  {
    id: "oldSalt-39",
    text: "It's {month} again, is it? Every month at sea feels like the same one. Wet, hungry and smelling of tar.",
  },
  {
    id: "oldSalt-40",
    text: "Tell me, {name}. Do you believe in mermaids?",
    answers: [
      {
        text: "Of course. I've seen them.",
        replies: [
          "You've seen manatees and too much rum. I know, because so have I.",
          "Aye, me too. Off {otherTown}, singing. Turned out to be the bosun in the bilge.",
          "Hah! Well, keep it to yourself. The cook will want to put one in the pot.",
          "So did Columbus, and he said they were ugly. Hard to argue with the man.",
          "Then you've been at sea long enough. Welcome to the brotherhood.",
        ],
      },
      {
        text: "No. They're just tavern tales.",
        replies: [
          "And what do you think this is? A cathedral? Tavern tales are the only tales.",
          "Fair. But you'll believe in one after a month without land. Everyone does.",
          "Spoilsport. A man needs something to hope for in the middle of the ocean.",
          "Most are. But I've heard singing out there nobody could explain. Sober, too. Well, mostly.",
          "Spoken like someone who's never sailed past midnight with no moon.",
        ],
      },
      {
        text: "I'm engaged to one.",
        replies: [
          "Congratulations. Where are you holding the wedding? A cove?",
          "Hah! Do you bring her flowers or herring?",
          "Bold. Mind she doesn't drag you down to meet her family.",
          "I was engaged to a mermaid once. She ran off with a Portuguese fisherman.",
          "Get her to sing for the crew. Might keep them from mutinying.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-41",
    text: "In my day we navigated by the stars, the wind and the smell of the cook's pot. Now young captains want charts. Soft, the lot of them.",
  },
  {
    id: "oldSalt-42",
    text: "Louis of France, Philip of Spain, Charles of England. Three kings, and not one of them could tie a bowline.",
  },
  {
    id: "oldSalt-43",
    text: "The Thirty Years' War is still dragging on in the German lands, they say. Would you ever fight for a foreign king?",
    answers: [
      {
        text: "For the right price.",
        replies: [
          "Spoken like a true sailor. Loyalty's just a wage that hasn't been paid yet.",
          "Plenty did. Plenty didn't come back to spend it.",
          "Right price? There's no right price for losing a leg in a mud field.",
          "Aye, gold talks. But it can't stitch you back together.",
          "Mercenary, eh? Fair. Better paid than me, which isn't hard.",
        ],
      },
      {
        text: "Only if it's on water.",
        replies: [
          "Now you're talking. Land wars are for men who like mud and marching.",
          "Good. At least on a ship you can run away quickly.",
          "Aye. The sea's the only battlefield worth dying on.",
          "Sailor's answer. Never trust a fight where you can't swim away.",
          "I said the same. Then they marched me forty miles inland. Never again.",
        ],
      },
      {
        text: "I only fight seagulls.",
        replies: [
          "Brave. Gulls fight dirty. I've lost more biscuits to them than to pirates.",
          "Hah! You'll need more than a cutlass. Gulls come in flocks.",
          "A noble war. Endless, too. Gulls never surrender.",
          "Wise choice. Gulls don't have cannon. Yet.",
          "My old crewmate fought a gull for a fish. The gull won. He never recovered his dignity.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-44",
    text: "Buy your rope in {nationTown}, {title}. The rope they sell in {town} would snap if you looked at it sideways.",
  },
  {
    id: "oldSalt-45",
    text: "I've seen a waterspout pick up a whole longboat and set it down a mile off. Crew still in it. Still rowing. Didn't notice a thing.",
  },
  {
    id: "oldSalt-46",
    text: "Pieces of eight, doubloons, guilders, livres. Which do you trust most, {name}?",
    answers: [
      {
        text: "Pieces of eight. Spanish silver is good everywhere.",
        replies: [
          "Aye, cut them into bits and they still spend. Can't say that for a Dutch promise.",
          "Smart choice. Even the {enemyAdjective} take Spanish silver, though they spit after.",
          "Good silver, aye. Mind you bite it. Some smiths in {otherTown} mix in lead.",
          "That's what I keep in my boot. Only safe bank in the Caribbean.",
          "Right enough. Spanish silver built half these ports and paid for the other half.",
        ],
      },
      {
        text: "Guilders. The Dutch know money.",
        replies: [
          "They do. They know yours too, and how to get it off you.",
          "Aye. A Dutchman counts his guilders twice and yours three times.",
          "Fair. The West India Company's richer than most kings. Not that they share it.",
          "Hah! Never haggle with a Dutchman. You'll walk away owing him your shirt.",
          "Good money, guilders. Shame it smells of herring.",
        ],
      },
      {
        text: "Whatever's in your purse.",
        replies: [
          "Ha! Cheeky. There's nothing in my purse but lint and regrets.",
          "Touch it and you'll lose a finger. I've still got all my teeth for biting.",
          "My purse is empty. Has been since '32. That's why I'm so trustworthy.",
          "Bold. You'll make a fine pirate or a dead thief.",
          "Take it, then. You'll find two buttons and a tooth. Not mine.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-47",
    text: "Three rules, {title}. Don't sail on a Friday, don't rename a ship and don't lend money to a stranger. Which have you broken?",
    answers: [
      {
        text: "None of them.",
        replies: [
          "Then you're either a saint or you've not lived long enough.",
          "Good. I've broken all three. Look at me now.",
          "Hah! Liar. Every captain renames his ship the moment he buys her.",
          "Keep it that way, and you might live as long as me. Not sure that's a blessing.",
          "None? Then you're the first sensible sailor I've met in {town}.",
        ],
      },
      {
        text: "All of them. Same day.",
        replies: [
          "Hah! A true sailor. I salute you. Slowly, my arm's stiff.",
          "Same day? That's ambition. Did you sink?",
          "You're living on borrowed luck, {name}. And the lender wants it back.",
          "I did that once. Spent the next year on a beach eating crabs.",
          "Bold. Mad, but bold. Drink up before the sea collects.",
        ],
      },
      {
        text: "I lent money to you once, didn't I?",
        replies: [
          "Never seen you before in my life. Good evening.",
          "Did you? Must've been my twin. He's dreadful with money.",
          "Ah. Well. It's at sea. It'll come back with the tide.",
          "Hah! If you did, you broke the third rule, and that's your own fault.",
          "My memory's not what it was. Very convenient sometimes.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-48",
    text: "There was a time I could drink a whole barrel and still steer. Now a thimble and I'm steering the furniture.",
  },
  {
    id: "oldSalt-49",
    text: "You look tired, {title}. Long voyage to {town}?",
    answers: [
      {
        text: "Weeks of calm. Not a breath of wind.",
        replies: [
          "The doldrums. Worse than any storm. Men go mad staring at flat water.",
          "Aye, a calm's a curse. I've seen crews whistle and pray at the same time.",
          "Did you try throwing a coin to the wind? Old trick. Never works, but feels good.",
          "Becalmed is the worst. At least in a storm you've got something to do.",
          "Did nobody eat the cabin boy? Then it wasn't a proper calm.",
        ],
      },
      {
        text: "Fought off three {enemyAdjective} warships.",
        replies: [
          "Three, was it? It's always three. Never two, never four.",
          "And not a scratch on you? You must've been steering from behind a barrel.",
          "Brave soul, if true. Even braver if you're lying to my face.",
          "Good. Every {enemyAdjective} ship sunk is one less to spoil my harbour view.",
          "Then drink up. A man who survives three warships deserves a free one. Not from me, though.",
        ],
      },
      {
        text: "I was rowing. Personally. The whole way.",
        replies: [
          "Hah! From where? {otherTown}? I'd believe it, looking at your arms. I wouldn't, looking at your face.",
          "That explains the smell. And the look of you.",
          "A one-man galley. The Spanish would pay good money for that.",
          "You should have tried the sails. They're the big cloth bits on the stick.",
          "I rowed across a bay once. Took me a week. Never forgave the man who sold me the boat.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-50",
    text: "There's trouble in Portugal and Catalonia, they say. Philip's got rebels at home and Dutchmen on the water. Wouldn't want his crown. Too heavy for swimming.",
  },
  {
    id: "oldSalt-51",
    text: "Tallow on the gun ports, tar on the seams, rum in the captain. That's how a ship stays watertight.",
  },
  {
    id: "oldSalt-52",
    text: "What's your feeling on Cardinal Richelieu, {name}?",
    answers: [
      {
        text: "A clever man.",
        replies: [
          "Too clever. Clever men start wars and let the rest of us finish them.",
          "Aye, clever as a Barbados rat. And twice as hungry.",
          "Clever, sure. Can he reef a topsail in a gale? Didn't think so.",
          "Clever enough to run France while Louis hunts deer. Can't fault that.",
          "Clever men get statues. Sailors get a sack and two cannonballs.",
        ],
      },
      {
        text: "Never heard of him.",
        replies: [
          "Lucky you. Most men who hear of him regret it.",
          "Good. Keep it that way. Politics are like rocks. Best seen from far off.",
          "He's the French king's right hand. And left. And probably his feet too.",
          "Never heard of him? Where've you been, under a hull?",
          "Fair. He's never heard of you either. Even match.",
        ],
      },
      {
        text: "I hear he's terrified of parrots.",
        replies: [
          "Is he? Well, that'd explain why there's no parrots in the French navy.",
          "Hah! Where'd you hear that? Never mind. I'll be telling it as gospel by tonight.",
          "Can't blame him. Parrots know too much and say it at the worst moments.",
          "Now there's a weapon. Send a ship of parrots to Paris. War over by Christmas.",
          "I'll believe it. Mine nearly took my ear off. Nothing frightens a man like a parrot.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-53",
    text: "The best sailors I ever knew couldn't read a word. The worst ones could quote you scripture while they ran you aground.",
  },
  {
    id: "oldSalt-54",
    text: "Mark my words, {title}. One day {town} will be famous. Or underwater. One of the two.",
  },
  {
    id: "oldSalt-55",
    text: "If you could have one thing on your next voyage, {name}, what would it be?",
    answers: [
      {
        text: "A fair wind.",
        replies: [
          "Simple and true. A fair wind is worth more than a hold full of gold.",
          "Aye. Pray to the saints, then. They're the only ones who sell those.",
          "Good. Fair winds don't argue, don't steal and don't need feeding.",
          "May you have it. I've not had a fair wind since I was twenty.",
          "A sailor's wish. Can't fault it. Mind it doesn't turn foul halfway.",
        ],
      },
      {
        text: "Fresh limes for the crew.",
        replies: [
          "Smart. Scurvy takes more men than any {enemyAdjective} broadside.",
          "Aye, limes and lemons. Keep your teeth in your head.",
          "Most captains don't think of it till half the crew's lost their teeth.",
          "Good thinking. A crew with teeth is a crew that can eat. And bite.",
          "Proper captain's answer. You'll keep your men longer than most.",
        ],
      },
      {
        text: "You, as my lucky charm.",
        replies: [
          "Me? Lucky? I've sunk four ships. Well, been on four that sank.",
          "Hah! Flattery. Buy me a drink and I might consider it.",
          "I'm no charm. I'm a curse with a beard. Ask anyone in {nationTown}.",
          "Tempting. But my knees haven't been to sea since '35, and they like it that way.",
          "Bring rum and I'll think about it. Bring two barrels and I'll start packing.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-56",
    text: "Never call me old, {title}. I'm seasoned. Like salt pork. Tough, salty and best kept away from children.",
  },
  {
    id: "oldSalt-57",
    text: "Fancy a game of dice, {name}? I'll warn you, I've been playing longer than you've been alive.",
    answers: [
      {
        text: "Deal me in.",
        replies: [
          "That's the spirit. I'll go easy on you. That's a lie, mind.",
          "Good. Loser buys the rum. Which will be you.",
          "Brave. Last young buck who played me walked home in his stockings.",
          "Roll, then. And don't breathe on the dice. I'll know.",
          "Excellent. My boots need new soles, and you look generous.",
        ],
      },
      {
        text: "No. Your dice look weighted.",
        replies: [
          "Weighted? These? They're perfectly honest. Mostly.",
          "Hah! Sharp eyes. You'll do well in these waters.",
          "They're not weighted, they're experienced. There's a difference.",
          "Fine. I'll keep them for the next fool. There's always another.",
          "Weighted? I'm offended. Deeply. Now buy me a drink to make up for it.",
        ],
      },
      {
        text: "I only gamble with ships.",
        replies: [
          "Ships? Then you're richer than I thought, or madder.",
          "I gambled a ship once. Lost her to a priest. Never trust a man with no vices.",
          "Big stakes. I'll put up my rowing boat. It only leaks a little.",
          "Ha! And I only gamble with my own teeth. Got six left.",
          "Careful. Sailors who gamble ships end up swimming home.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-58",
    text: "If the harbour master asks, I was never here, {title}. Mind, he says the same to me about himself.",
  },
  {
    id: "oldSalt-59",
    text: "Have you heard the one about the sailor who swore off rum?",
    answers: [
      {
        text: "No. Tell me.",
        replies: [
          "Neither have I. Never met one.",
          "He swore off it on a Sunday. Back on it by Monday. That's the whole story. True one, too.",
          "Nobody has. He died of thirst. Very sad. We toasted him with rum.",
          "Ask me again when I've had another. Rum makes the ending better.",
          "Me, in '25. Lasted two hours. Longest two hours of my life.",
        ],
      },
      {
        text: "Is it you, every Sunday?",
        replies: [
          "Hah! Every Sunday, aye. And every Monday I forgive myself.",
          "Cheek. But fair. I swear off it in church, and the church swears at me.",
          "You've been talking to the priest, haven't you. Can't trust a priest with gossip.",
          "Sunday's for swearing off. The rest of the week is for swearing.",
          "Watch your tongue, pup. Even if you're right.",
        ],
      },
    ],
  },
  {
    id: "oldSalt-60",
    text: "Sail careful, {name}. The sea takes the bold and the foolish both. Try to be neither, and if you can't, be lucky.",
  },
]
