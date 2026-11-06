import "server-only"

export const HOLLAND_NPC_LINES: Record<string, DialogueEntry[]> = {
  "curacao-tavern-griet-vogel": [
    {
      id: "curacao-tavern-griet-vogel-1",
      text: "Sit, {title}. I cooked for two hundred men on the road to Batavia, so one more mouth at my bar is nothing. Beer's salted. Don't ask, I can't stop.",
    },
    {
      id: "curacao-tavern-griet-vogel-2",
      text: "Tell me true, {name}. Have you ever rounded the Cape of Good Hope?",
      answers: [
        {
          text: "Twice. Once in each direction.",
          replies: [
            "Then you know why I laugh when men here call a Caribbean squall a storm.",
            "Good. Then you've eaten weevils for breakfast and thanked God for the protein.",
            "Twice, is it? You'll have a beer on the house, and a second one on the Company.",
            "Then we're kin, {title}. The Cape makes sisters and brothers of anyone it doesn't drown.",
            "Each direction. Ha. Most only manage one, the other way they go by the bottom of the sea.",
          ],
        },
        {
          text: "No, but I once rounded a very large table.",
          replies: [
            "And I once rounded a very large cook. He went overboard. Drink your beer.",
            "A table. Well, mind the corners, they've a nasty swell off the cheese end.",
            "Ha! The Company would make you a navigator for that. They've hired worse.",
            "Did you lose any men? Tables are treacherous. The salt cellar alone has sunk fleets.",
            "Then you've seen the Cape of Good Supper, which is the only one I miss.",
          ],
        },
        {
          text: "Never. I keep to the Caribbean.",
          replies: [
            "Wise. Out east the sea is so wide that you forget what land smells like.",
            "Keep it that way. I saw men chew their own boots off Madagascar.",
            "The Caribbean's a puddle by comparison, but at least the puddle has rum.",
            "No shame in it. The Cape is where good ships go to become firewood.",
            "Then you'll never know the joy of fresh water after five months. Lucky you, honestly.",
          ],
        },
      ],
    },
    {
      id: "curacao-tavern-griet-vogel-3",
      text: "Captain on my last voyage swore lemons were a papist superstition. Lost forty men to scurvy before Mauritius. I've kept a lemon in my apron ever since, out of spite.",
    },
    {
      id: "curacao-tavern-griet-vogel-4",
      text: "What do you feed your crew, {title}? Be honest, I'll know if you're lying.",
      answers: [
        {
          text: "Salt pork, hard tack and beer.",
          replies: [
            "Honest fare. Add an onion now and then or their teeth will walk off on their own.",
            "The holy trinity of the sea. Bless you, they'll grumble, but they'll live.",
            "Good. Just knock the hard tack on the table first so the tenants move out.",
            "That's what I served for eleven years. Nobody died of it, much.",
            "Fine, but buy limes in {town}. Cheap, and you'll keep your crew's gums attached.",
          ],
        },
        {
          text: "Fine cuisine. My cook trained in Paris.",
          replies: [
            "Paris? Then your men are eating snails and calling it supper. Poor souls.",
            "A Paris cook at sea lasts two weeks before he's boiling his own wig for stock.",
            "Hm. Send him here. I'll teach him to make pea soup a spoon can stand up in.",
            "French cooking on a ship. Next you'll tell me your powder monkey plays the lute.",
            "Fine cuisine, says the captain who smells of fish heads. I believe you.",
          ],
        },
        {
          text: "Whatever falls into the pot.",
          replies: [
            "That's how I lost a good ladle and very nearly the purser.",
            "Ha! Honest at least. My old galley worked the same way, rats included.",
            "Then mind the cat stays out of the galley. I'm not saying anything more.",
            "That's not cooking, {title}, that's gambling with a spoon.",
            "Keep a lid on the pot, then. Things fall in a lot more often in a swell.",
          ],
        },
      ],
    },
    {
      id: "curacao-tavern-griet-vogel-5",
      text: "This harbour takes ships of every flag, so long as the Company gets its share. I've poured beer for English, French and once a Spaniard who cried into it. Tipped well, mind.",
    },
    {
      id: "curacao-tavern-griet-vogel-6",
      text: "Do you know why I smoke this pipe all day, {title}?",
      answers: [
        {
          text: "To keep the mosquitoes off?",
          replies: [
            "That's half of it. The other half is it keeps the clerks off, they hate the smell.",
            "Right first time. The island's mosquitoes are the only thing the Company can't tax.",
            "They avoid me like a debt collector. Worth every leaf of tobacco.",
            "Clever {title}. You'll live longer here than most.",
            "Yes, and to hide the smell of whatever my cook's boiling in the back.",
          ],
        },
        {
          text: "Because it suits you.",
          replies: [
            "Flatterer. It does, though. I'd look naked without it.",
            "Ha! Careful, I'm a widow of the sea and I've no time for sweet talk.",
            "It suits me better than a husband did. Lasts longer too.",
            "That's the first nice thing anyone's said to me since Batavia.",
            "Keep talking like that and I'll stop salting your beer. Probably.",
          ],
        },
        {
          text: "I assumed it was holding your face together.",
          replies: [
            "Cheek! Though you're not wrong. Take it out and my jaw falls off like a loose block.",
            "It's the face holding the pipe together, if you must know.",
            "Ha! You've a sharp tongue. I'll salt your beer double for that.",
            "Twenty years of sea wind, {title}. Something has to hold it in place.",
            "Rude, but I laughed. Sit down before I change my mind.",
          ],
        },
      ],
    },
    {
      id: "curacao-tavern-griet-vogel-7",
      text: "If you're bound for {otherTown}, take a barrel of water more than you think you need. The sea always lasts longer than the plan.",
    },
  ],

  "curacao-market-pieter-haas": [
    {
      id: "curacao-market-pieter-haas-1",
      text: "Good day, {title}. Salt, cloth, copper. I know what every crate on this island is worth, and I know what it's worth to you, which is usually more.",
    },
    {
      id: "curacao-market-pieter-haas-2",
      text: "Before we talk business, {title}, how do you keep your accounts?",
      answers: [
        {
          text: "In a proper ledger, double entry.",
          replies: [
            "Double entry! You've just become my favourite customer, and I don't say that lightly.",
            "Excellent. Then you'll understand why my prices are exactly what they are.",
            "A civilised captain. I may have to give you a discount, a small one.",
            "Amsterdam would be proud of you. I very nearly am.",
            "Good. Then neither of us can cheat the other, which saves a great deal of time.",
          ],
        },
        {
          text: "In my head. Mostly.",
          replies: [
            "Mostly. That word has ruined more merchants than the Spanish ever did.",
            "Your head, {title}, is where my profit lives. Please keep it that way.",
            "Then let me do the sums for you. Free of charge. Mostly.",
            "I also keep accounts in my head, but mine are correct.",
            "Fine. Just know that rum and arithmetic don't share a skull peacefully.",
          ],
        },
        {
          text: "I carve notches in the mast.",
          replies: [
            "The mast. And when you lose it in a storm, your debts vanish too? Clever, actually.",
            "I'd like to audit that mast. Purely out of professional horror.",
            "If the Company tried that, the whole fleet would be toothpicks by now.",
            "Notches. My old master in Amsterdam would have fainted onto his abacus.",
            "That explains why sailors always swear the ship owes them money.",
          ],
        },
      ],
    },
    {
      id: "curacao-market-pieter-haas-3",
      text: "I came out as a junior clerk of the West India Company. Six years later I still have the same desk, but now I own the chair.",
    },
    {
      id: "curacao-market-pieter-haas-4",
      text: "What do you make of the Company, {title}? Speak freely. I'll only write some of it down.",
      answers: [
        {
          text: "It made Holland rich. Credit where due.",
          replies: [
            "Exactly. Piet Heyn took the silver fleet in '28 and every shareholder bought a new hat.",
            "Credit, yes. And debit, and interest. That's the beauty of it.",
            "A sensible view. You'll go far, or at least to {otherTown} and back.",
            "Rich, and pious with it. We pray on Sunday and count on Monday.",
            "I'll note that you're a friend of trade. It never hurts to be on that list.",
          ],
        },
        {
          text: "It's a band of pirates with a seal and a wig.",
          replies: [
            "Pirates pay no dividends, {title}. That's the whole difference.",
            "We don't wear wigs. Wigs are a French vanity. We wear debt.",
            "Careful. The Company has a long memory and an even longer ledger.",
            "Pirates with paperwork. Do you know how much harder paperwork is than piracy?",
            "I'll write that down as a complaint. They're filed under fire starters.",
          ],
        },
        {
          text: "I've no opinion. I just sell {merchandise}.",
          replies: [
            "The wisest answer I've heard all week. Opinions don't fetch a price.",
            "Then you and I are going to get along famously. Silence is cheap and useful.",
            "{merchandise}, eh? Bring it here. The Company has opinions on that, mostly about tax.",
            "A merchant without opinions is a merchant without enemies. Rare and valuable.",
            "Good. Keep selling and stay boring. Boring captains die rich.",
          ],
        },
      ],
    },
    {
      id: "curacao-market-pieter-haas-5",
      text: "The Spanish ran this island for a hundred years and never found anything worth selling. We've been here six and found salt, horses and a fine natural harbour. Some people just don't look.",
    },
    {
      id: "curacao-market-pieter-haas-6",
      text: "Tell me, {title}, what's the secret of a good bargain?",
      answers: [
        {
          text: "Know when to walk away.",
          replies: [
            "Correct, and I know when you'll come back, which is why I let you walk.",
            "Good. And walk slowly, so the other fellow has time to call you back.",
            "A true trader's answer. You should have been born in Amsterdam.",
            "Yes. I walk away from my own mother at least twice a year.",
            "Exactly right. Also know where the door is, some markets are confusing.",
          ],
        },
        {
          text: "Smile a lot and carry a pistol.",
          replies: [
            "That works in {enemyTown}. Here we prefer a smile and a contract.",
            "The pistol is a poor negotiator. It only ever has one argument.",
            "I smile a lot as well. You'll notice I don't need the pistol.",
            "Ha. And if that fails, smile more and carry two pistols?",
            "I'll note that you are a customer who pays in full and promptly.",
          ],
        },
        {
          text: "Buy low, sell high, nap in between.",
          replies: [
            "Two parts of that are sound. The nap is where your rivals rob you.",
            "I haven't napped since 1634. The Company frowns on unconscious clerks.",
            "That's not a secret, {title}. That's a confession.",
            "Buy low, sell high, and while you nap, I'll buy your cargo low.",
            "Lovely philosophy. Shall I write it on your tombstone or your bankruptcy notice?",
          ],
        },
      ],
    },
    {
      id: "curacao-market-pieter-haas-7",
      text: "My father wanted me to be a preacher. I told him a ledger is just a Bible where the sinners pay interest.",
    },
  ],

  "curacao-governor-hubrecht-engel": [
    {
      id: "curacao-governor-hubrecht-engel-1",
      text: "Sit if you like, {title}. I've been standing since 1634 and my leg has opinions about it.",
    },
    {
      id: "curacao-governor-hubrecht-engel-2",
      text: "I took this island from the Spanish with four hundred men and a lot of shouting. Then they gave me a desk and told me to write reports. I'd rather storm the fort again.",
    },
    {
      id: "curacao-governor-hubrecht-engel-3",
      text: "Have you ever had to write a report, {title}?",
      answers: [
        {
          text: "Only my ship's log.",
          replies: [
            "Then you're lucky. A log is read by someone. My reports go to Amsterdam and die there.",
            "Good. Keep it short. Wind, weather, nobody dead. That's poetry, that is.",
            "A log is honest work. Mine are forty pages explaining why the goats ate the fence.",
            "Write clearly, at least. I once spent a week decoding a lieutenant's handwriting.",
            "Envy you, {title}. Your log never asks you for a revised estimate.",
          ],
        },
        {
          text: "Yes, but nobody read it either.",
          replies: [
            "Then you understand my life. Pour yourself something.",
            "Ha. Shall we start a club? We'll write minutes nobody reads.",
            "At least you can stop. I've written one a month for six years.",
            "I suspect there's a warehouse in Amsterdam full of our reports, feeding the mice.",
            "We are brothers in ink, {title}. Grim, unread brothers.",
          ],
        },
        {
          text: "I dictate them to my parrot.",
          replies: [
            "Does it file them as well? I'd hire it in a heartbeat.",
            "Better than my clerk. At least the parrot repeats what you said.",
            "Hm. Amsterdam might actually read one written by a parrot. Novelty sells.",
            "My last report was half about parrots stealing the governor's figs. Feels fitting.",
            "If the bird can spell 'provisions' it's better educated than half my garrison.",
          ],
        },
      ],
    },
    {
      id: "curacao-governor-hubrecht-engel-4",
      text: "The {enemyAdjective} would love this harbour back. I keep a cannon pointed at the entrance and a quill pointed at my own heart.",
    },
    {
      id: "curacao-governor-hubrecht-engel-5",
      text: "What brings you to my office, {title}? Business, or are you lost?",
      answers: [
        {
          text: "Business for {playerNation}.",
          replies: [
            "Then state it plainly. I'm too old for flourishes and too tired for lies.",
            "Fine. Leave the papers there. I'll read them after the other forty.",
            "Business. Of course. Nobody visits a governor for the conversation.",
            "{playerNation} is welcome here, so long as the Company takes its share.",
            "Good. Keep it short and I'll keep the stamp ready.",
          ],
        },
        {
          text: "I followed a goat in here.",
          replies: [
            "That goat has been in here four times this week. Did it leave anything?",
            "Ah. Hendrik. He's the only one who visits without wanting money.",
            "Then you're the most honest visitor I've had all month.",
            "The goats run this island, {title}. I merely sign the papers.",
            "If the goat asks for a pass to {otherTown}, the answer is still no.",
          ],
        },
        {
          text: "Just paying respects to a veteran.",
          replies: [
            "Respects. Hm. That's rare enough I'll pretend to believe it.",
            "Kind of you. Most people pay me complaints instead.",
            "Thank you, {title}. The old wound thanks you as well. It aches less when someone notices.",
            "A veteran. Yes. Though most days I'm a veteran of paperwork.",
            "Then sit a moment. It's not often anyone remembers we were soldiers first.",
          ],
        },
      ],
    },
    {
      id: "curacao-governor-hubrecht-engel-6",
      text: "Every morning I look at the harbour, every afternoon I look at my reports, and every evening I look at my leg and remember the Spanish pikeman who gave it to me. Busy days.",
    },
    {
      id: "curacao-governor-hubrecht-engel-7",
      text: "Do you think the war will ever end, {title}? Eighty years, they'll call it, if it keeps on.",
      answers: [
        {
          text: "It must end sometime.",
          replies: [
            "Sometime. That's what they told my father, and he died waiting.",
            "I hope so. I'd like to retire to a farm where nobody owns a pike.",
            "Perhaps, when Philip IV runs out of money. Which could take a while.",
            "Maybe. The silver keeps flowing to Madrid and the war keeps flowing back.",
            "You're kinder than the war is, {title}. I'll take the hope.",
          ],
        },
        {
          text: "Only when the paperwork runs out.",
          replies: [
            "Then it will outlive us all. And our grandchildren. And the paper mills.",
            "Ha! You've understood government better than most governors.",
            "Don't. That's too true to be funny, and I laughed anyway.",
            "I'll put that in my next report. Nobody will read it, so it's safe.",
            "The war's been running on ink since Breda, {title}. You may be right.",
          ],
        },
      ],
    },
  ],

  "st-eustatius-tavern-klaas-bier": [
    {
      id: "st-eustatius-tavern-klaas-bier-1",
      text: "Klaas Bier, beer by name and beer by nature. With a name like mine, what else was I going to be, a dancing master?",
    },
    {
      id: "st-eustatius-tavern-klaas-bier-2",
      text: "Psst, {title}. Want to hear what came in on the last ship from {nationTown}?",
      answers: [
        {
          text: "Go on, tell me everything.",
          replies: [
            "The harbourmaster's wife is buying French lace again. On his salary? Hm.",
            "There's talk of a {enemyAdjective} ship sniffing about. Could be nothing. Could be gold.",
            "Saskia at the market won't sell today. The cloud's on the mountain. Again.",
            "A sailor swore he saw a sea serpent off {otherTown}. Turned out to be his own rope. Still.",
            "The governor bought a new ledger. Nobody knows what for. That's the scandal.",
          ],
        },
        {
          text: "Only if it's true.",
          replies: [
            "True? Friend, I sell beer and stories. Neither one's improved by being plain.",
            "Mostly true. True enough to tell, false enough to be fun.",
            "If I only told true things I'd have been silent since 1620.",
            "Truth is for courts and churches. This is a tavern.",
            "Fine, here's a true one. My beer is the best on the island. And the only.",
          ],
        },
        {
          text: "No. I've come to spread my own rumours.",
          replies: [
            "A competitor! Go on then, what have you got? I'll pay in beer.",
            "Ha! Tell me yours and I'll tell it back to you better by Thursday.",
            "Careful, {title}. This is my patch. I've seen gossips thrown out for less.",
            "Splendid. Shall we say the governor is secretly French? That'll run for weeks.",
            "Make them good. My customers have high standards and short memories.",
          ],
        },
      ],
    },
    {
      id: "st-eustatius-tavern-klaas-bier-3",
      text: "Twenty years I've brewed on this rock. Every ship that drops anchor brings thirst and news, and I take payment for both.",
    },
    {
      id: "st-eustatius-tavern-klaas-bier-4",
      text: "Between us, {title}, the governor keeps a little book of who carries what. Not that I'd know. I only refill his cup while he writes in it.",
    },
    {
      id: "st-eustatius-tavern-klaas-bier-5",
      text: "What do you think of my ale, {title}? Honestly now.",
      answers: [
        {
          text: "Best I've had in the Caribbean.",
          replies: [
            "I knew it! Tell everyone. Tell them twice. Tell the English, they need it.",
            "Of course it is. It's the only ale in the Caribbean that's never seen a cask of rum.",
            "You've good taste, {title}. Have another, and tell me where you're sailing next.",
            "Bless you. My late father would weep, and he was a hard man to make weep.",
            "Then I'll name a barrel after you. You'll be very popular by Saturday.",
          ],
        },
        {
          text: "It tastes a bit like the harbour.",
          replies: [
            "That's character, that is. Brewed with local spirit.",
            "Rubbish. The harbour tastes like my ale. It was here second.",
            "Ha! The rats seem to like it, and they're fussy about water.",
            "Well, the harbour's cleaner than the water at {otherTown}, so it's a compliment really.",
            "Keep your voice down, {title}. Half my regulars think that's the secret recipe.",
          ],
        },
        {
          text: "I prefer rum.",
          replies: [
            "Rum. Sailors' poison. Ale is a food, my friend. It's practically bread.",
            "I'll pretend I didn't hear that, for your sake and my nerves.",
            "Rum! Next you'll tell me you prefer the English to the Dutch.",
            "Fine, fine, I keep a bottle back there for heathens. Price is double.",
            "Everyone prefers rum until they wake up. Then they come to me for ale.",
          ],
        },
      ],
    },
    {
      id: "st-eustatius-tavern-klaas-bier-6",
      text: "Heard a merchant from {enemyTown} say the {enemyAdjective} treasure fleet sails late this year. Heard another say it sails early. I'm telling everyone both. Covers me either way.",
    },
    {
      id: "st-eustatius-tavern-klaas-bier-7",
      text: "Give me a bit of news, {title}, and your next drink is free. Fair trade?",
      answers: [
        {
          text: "The price of {merchandise} is rising.",
          replies: [
            "Is it now? I'll have that round the harbour before you've finished your cup.",
            "That's worth a drink and a half. Here, I'll even wipe the cup first.",
            "Ooh. I know three merchants who'll pay me to hear that. Cheers, {title}.",
            "Rising. Lovely. Rising news is always good news for somebody.",
            "Fine information. I'll attribute it to a mysterious captain. Makes it sound better.",
          ],
        },
        {
          text: "I heard you water your beer.",
          replies: [
            "Lies! I water it lovingly. There's a difference.",
            "Who told you that? Give me a name. I've a little list of my own.",
            "Ha! The free drink is cancelled and the next one costs extra.",
            "Watered? It's the salt air. Makes everything taste thinner.",
            "That rumour's been going since 1625 and I started it myself, to see who'd repeat it.",
          ],
        },
        {
          text: "No. I'll pay for my drink like an honest sailor.",
          replies: [
            "An honest sailor. Now that's the best rumour I've heard all day.",
            "Suit yourself. But your silence makes me curious, and curious makes me talk.",
            "Fine. I'll make something up about you instead, it's cheaper for both of us.",
            "Honest. I'll tell everyone. They won't believe me, but I'll tell them.",
            "Very well, {title}. Coin is good news too, in its way.",
          ],
        },
      ],
    },
  ],

  "st-eustatius-market-saskia-berg": [
    {
      id: "st-eustatius-market-saskia-berg-1",
      text: "Look at the mountain first, {title}. If the cloud's on the peak, I don't sell. If it's clear, I sell, but quickly.",
    },
    {
      id: "st-eustatius-market-saskia-berg-2",
      text: "Do you believe the volcano is only sleeping, {title}?",
      answers: [
        {
          text: "Of course. Mountains don't just die.",
          replies: [
            "Thank you! Finally, someone with sense. Everyone in {town} laughs at me.",
            "Exactly. And sleeping things wake up, usually in a bad mood and in the morning.",
            "You see it too. I knew it when I first stepped off the boat from Zeeland.",
            "Then you'll understand why I keep my good stock in a cart with the wheels oiled.",
            "Bless you, {title}. Take a lucky stone. No, two. You'll need them.",
          ],
        },
        {
          text: "It's just a hill with ambitions.",
          replies: [
            "Shh! Don't say that out loud. It can hear you.",
            "Ambitions! That's exactly how my grandmother described her third husband, and look how that ended.",
            "Laugh now, {title}. You'll laugh less when the sky turns orange.",
            "A hill with ambitions is the most dangerous kind. Ask anyone in Naples.",
            "Fine. Then stand at the top and tell it so. I'll wait down here.",
          ],
        },
        {
          text: "I sometimes hear it snoring at night.",
          replies: [
            "You do? I knew it! The governor said it was the sea. The sea doesn't rumble like that.",
            "Oh, don't. Now I won't sleep a wink tonight.",
            "That's a terrible omen. Or a good one. I'll have to check my stones.",
            "Is it a deep snore or a light one? It matters. Deep is worse.",
            "Then we must both pray it doesn't roll over in bed, {title}.",
          ],
        },
      ],
    },
    {
      id: "st-eustatius-market-saskia-berg-3",
      text: "Back in Zeeland my grandmother read the weather from cows. Lying down meant rain. Here there are no cows, so I watch goats. So far the goats have been wrong eleven times.",
    },
    {
      id: "st-eustatius-market-saskia-berg-4",
      text: "What month is it, {title}? {month}? Oh no. No, that's a dreadful month for selling iron. Come back next week and buy it then.",
    },
    {
      id: "st-eustatius-market-saskia-berg-5",
      text: "Would you like a lucky stone, {title}? Only a few coins.",
      answers: [
        {
          text: "Yes please. I'll take any luck I can get.",
          replies: [
            "Wise choice. This one's red, for safe harbours. Don't lose it.",
            "Here. Keep it in your left pocket. The right pocket is for bad news.",
            "This one came from the beach on a full moon. Very lucky. Very damp, too.",
            "Rub it before every storm. And during. And after, to say thank you.",
            "Take two. One for the ship and one for you. Ships need luck more than captains.",
          ],
        },
        {
          text: "I'll pass. I make my own luck.",
          replies: [
            "That's what my uncle said. He made his own luck right onto a reef.",
            "Brave words. The sea doesn't care what you make, {title}.",
            "Then you make your luck and I'll make the sign of the cross for you.",
            "Suit yourself. But if a black cat walks across your deck, come straight back.",
            "Making luck is like making cheese. Most people get it wrong and it smells.",
          ],
        },
        {
          text: "Do you have one that wards off tax collectors?",
          replies: [
            "If I had one of those I'd be the richest woman in the Caribbean and you'd never find me.",
            "Ha! The Company would have it confiscated before it worked.",
            "There's no stone strong enough for that, {title}. Only distance helps.",
            "I tried a grey one. The collector came twice that month. Never again.",
            "Not a stone. A fast ship and a dark night. That's the only charm I know.",
          ],
        },
      ],
    },
    {
      id: "st-eustatius-market-saskia-berg-6",
      text: "This island takes ships of every flag. That means bad luck of every flag comes in too. The English bring it in their sails, the French bring it in their wine.",
    },
    {
      id: "st-eustatius-market-saskia-berg-7",
      text: "Before you sail for {otherTown}, {title}, which foot do you step aboard with?",
      answers: [
        {
          text: "My right foot, always.",
          replies: [
            "Good, good. You'll have fair winds then. Probably.",
            "Right foot. Very proper. My father did the same and lived to seventy.",
            "Thank heaven. I was ready to lend you a fresh pair of shoes.",
            "Always. That's the secret, {title}. Always is luckier than sometimes.",
            "Right foot. Then I'll stop worrying about you. For a day.",
          ],
        },
        {
          text: "Whichever one isn't wooden.",
          replies: [
            "Oh! Then you've already had your bad luck. That means you're safe now, surely.",
            "Ha. That's a fair rule. Wooden feet don't count, everyone knows that.",
            "Please tell me you're joking. I can't tell with sailors.",
            "Then step with the wooden one first. The sea likes a little sacrifice.",
            "That's the most practical thing anyone's ever said to me about luck.",
          ],
        },
        {
          text: "I usually get thrown aboard.",
          replies: [
            "Thrown! Then you land on whatever foot fortune chooses. That's dreadfully risky.",
            "By whom? No, don't tell me. I'll worry.",
            "Then ask them to throw you right foot first next time. It's only polite.",
            "Ha! That explains a great deal about captains, actually.",
            "Well, that's unlucky for whoever has to catch you, {title}.",
          ],
        },
      ],
    },
  ],

  "st-eustatius-governor-constantijn-reich": [
    {
      id: "st-eustatius-governor-constantijn-reich-1",
      text: "Welcome to {town}, {title}. A free port. Free to come, free to trade, free to tell me what you carry. Purely for the records.",
    },
    {
      id: "st-eustatius-governor-constantijn-reich-2",
      text: "Where have you sailed from, {title}? Just so I can welcome you properly.",
      answers: [
        {
          text: "From {nationTown}, by the straight route.",
          replies: [
            "The straight route. How refreshing. Most visitors take a winding one.",
            "Good. I'll note that. A captain with a straight course is a captain I can plan around.",
            "{nationTown}. Charming. Their harbourmaster owes me a small favour, by the way.",
            "Splendid. Then you'll have news from there, and I do love news.",
            "Straight, you say. I'll believe it, for now.",
          ],
        },
        {
          text: "That's my business, governor.",
          replies: [
            "Of course. And it shall remain your business. And mine, in my little book.",
            "Quite right. A captain should keep secrets. I collect them, so we're a perfect match.",
            "Discretion. I admire it. I also tend to find out anyway.",
            "Naturally. I'll simply write 'unknown' and underline it twice.",
            "Your business is safe with me, {title}. Mostly with me.",
          ],
        },
        {
          text: "From the moon. Lovely place, no taxes.",
          replies: [
            "No taxes? I'll have to send a clerk. We can't have that.",
            "The moon. I'll put it down. It's no stranger than what the French captains say.",
            "Ha. And what do they trade on the moon? Cheese, I suppose.",
            "A free port on the moon. Competition. I must think about that.",
            "Charming. I'll write 'lunar' in the book and see who asks.",
          ],
        },
      ],
    },
    {
      id: "st-eustatius-governor-constantijn-reich-3",
      text: "Ships of every flag come to my harbour, even the {enemyAdjective}. Wars are terribly bad for business, and business is terribly good for knowing who is at war.",
    },
    {
      id: "st-eustatius-governor-constantijn-reich-4",
      text: "Do you know what the most valuable cargo in the Caribbean is, {title}?",
      answers: [
        {
          text: "Silver. Ask Piet Heyn.",
          replies: [
            "Silver is heavy, {title}. It sinks. Ask the Spanish how many galleons they've lost.",
            "Piet Heyn was clever, but he only got rich once. I'd rather get rich every week.",
            "A good guess. The wrong one, but good.",
            "Silver is what people fight over. I prefer what tells me who's fighting.",
            "Close. Silver buys the cargo I mean.",
          ],
        },
        {
          text: "Information.",
          replies: [
            "Oh, you're a dangerous one. I like you already. That's dangerous too.",
            "Exactly. And it weighs nothing and never rots.",
            "Correct. Which makes you the second most informed person in this room.",
            "Ah. You've been talking to Klaas at the tavern. Clever man. Talks too much.",
            "Yes. And I'd very much like to know who taught you that.",
          ],
        },
        {
          text: "Cheese. Nobody ever suspects the cheese.",
          replies: [
            "You'd be surprised. I suspect the cheese constantly.",
            "Hm. A wheel of Gouda can hide a great many letters. I'll make a note.",
            "Ha. You jest, but I once found a Spanish code book in a cheese from Edam.",
            "Nobody suspects it, which is exactly why I do.",
            "Then I'll have my clerks weigh every cheese twice. Thank you, {title}.",
          ],
        },
      ],
    },
    {
      id: "st-eustatius-governor-constantijn-reich-5",
      text: "My private ledger? Oh, just recipes and birthdays. And tonnage. And destinations. And the names of a few harbourmasters who like French brandy.",
    },
    {
      id: "st-eustatius-governor-constantijn-reich-6",
      text: "If I asked you a favour one day, {title}, a small one, would you do it?",
      answers: [
        {
          text: "Depends on the favour and the pay.",
          replies: [
            "Spoken like a true Dutchman. We'll get along very well.",
            "Naturally. I never ask a favour I can't afford.",
            "Sensible. I'll keep you in mind. I keep many people in mind.",
            "Then we'll speak again, {title}. When the time is right.",
            "Good. A captain who names a price can be trusted. A free one cannot.",
          ],
        },
        {
          text: "Only if I get to write in your little book.",
          replies: [
            "Ha. Nobody writes in my book. But you may be written about in it. Kindly.",
            "Bold. I'll write that you were bold. In ink, not pencil.",
            "My book? I've no idea what you mean. What book?",
            "Charming. That will cost you a great many favours, {title}.",
            "Perhaps one page. A small one. Near the back.",
          ],
        },
        {
          text: "No. I don't trust smiling governors.",
          replies: [
            "Wise. I wouldn't trust me either. Yet here we both are.",
            "Then I'll stop smiling. There. Do you trust me now? No? Pity.",
            "A healthy instinct. Keep it. It will serve you better than most of my advice.",
            "I'll note that you're not easily charmed. It's a rare entry.",
            "Fine. But you'll find that frowning governors are worse, {title}.",
          ],
        },
      ],
    },
    {
      id: "st-eustatius-governor-constantijn-reich-7",
      text: "People think a modest coat means a modest man. I wear black, {title}, because it doesn't show ink.",
    },
  ],

  "bonaire-tavern-hadewych-zorn": [
    {
      id: "bonaire-tavern-hadewych-zorn-1",
      text: "Good evening, {title}. Mind the cup at the end of the bar. It's for someone. He's only a little late.",
    },
    {
      id: "bonaire-tavern-hadewych-zorn-2",
      text: "Forty years ago my Willem sailed out for the salt pans. He said he'd be back before supper. I've kept supper warm ever since, more or less.",
    },
    {
      id: "bonaire-tavern-hadewych-zorn-3",
      text: "Have you ever loved someone who went to sea, {title}?",
      answers: [
        {
          text: "Yes. I still think of them.",
          replies: [
            "Then you know. The sea takes them and gives back nothing but weather.",
            "Hold on to that, {title}. Thinking of them is how they stay alive.",
            "I'm sorry. Sit. The extra cup can be shared tonight. Willem won't mind.",
            "We're the same then, you and I. Waiting is a kind of sailing too.",
            "Some nights I swear I hear his whistle down by the pans. You'll hear yours, one day.",
          ],
        },
        {
          text: "No. I am the one who went to sea.",
          replies: [
            "Then somewhere someone is setting out a cup for you. Write to them.",
            "Do you think of the ones you left? Willem must have. I hope he did.",
            "Then come home sometime, {title}. Before they've grown old at a window.",
            "Ah. The ones who go never know how long an evening can be.",
            "Then be kind to whoever waits. That's all I ask.",
          ],
        },
        {
          text: "I loved a ship once. She sank.",
          replies: [
            "A ship. Well, at least she couldn't promise to come back for supper.",
            "Oh, {title}. I'm sorry. Ships break hearts as well as people do.",
            "What was her name? Say it out loud. The sea likes to hear names.",
            "Ha. You make an old woman smile. Willem used to talk to his boat, too.",
            "At least you know where she lies. That's more than I know of mine.",
          ],
        },
      ],
    },
    {
      id: "bonaire-tavern-hadewych-zorn-4",
      text: "The flamingos come back to the pans every year. Pink as a sunset and twice as silly. I tell myself if they can find their way back, so can he.",
    },
    {
      id: "bonaire-tavern-hadewych-zorn-5",
      text: "Will you take a drink with me, {title}? The evenings are long here.",
      answers: [
        {
          text: "Gladly. To Willem.",
          replies: [
            "To Willem. Wherever he's got to, the dear fool.",
            "Thank you. Nobody's said his name to me in years. It sounds lovely in your voice.",
            "To Willem. And to whoever waits for you, {title}.",
            "That's kind. You can have his cup. Just for tonight.",
            "To Willem. He'd have liked you. He liked anyone who stayed for a second drink.",
          ],
        },
        {
          text: "Only if it's not the extra cup.",
          replies: [
            "Oh no, that's his. You'll have a fresh one. I'm not mad, just patient.",
            "Ha. You're sharp. No, the extra cup stays where it is.",
            "Sensible. It's been sitting there since Tuesday. Or 1600. Hard to say.",
            "That cup's seen forty years of dust. You deserve better.",
            "A cautious captain. Willem was the opposite, and look where it got him.",
          ],
        },
        {
          text: "Sorry, I've ships to see to.",
          replies: [
            "Of course. Ships always come first. Willem said that too.",
            "Go on, then. But come back if the evening gets long out there.",
            "Mind the tide. It turns faster than you think on this island.",
            "That's alright. I'm used to watching people walk out the door.",
            "Off you go, {title}. I'll set a cup for you, too. Just in case.",
          ],
        },
      ],
    },
    {
      id: "bonaire-tavern-hadewych-zorn-6",
      text: "I keep his cameo here at my collar. He was handsome. Terrible singer. Spent all his wages on a fiddle he couldn't play. I'd give anything to hear him murder a song again.",
    },
    {
      id: "bonaire-tavern-hadewych-zorn-7",
      text: "If you ever meet a grey old sailor named Willem out there, {title}, would you tell him I'm still waiting?",
      answers: [
        {
          text: "I promise. I'll ask in every port.",
          replies: [
            "Thank you. Ask in {otherTown} first. He always talked about going there.",
            "Every port. Oh, that's a lot of ports. That's a lot of hope, too.",
            "Bless you, {title}. Tell him the cup is still warm. Well, warm-ish.",
            "He'll have a fiddle under his arm and no idea how to play it. You'll know him.",
            "I'll sleep better tonight. I don't sleep much, but better.",
          ],
        },
        {
          text: "Forty years is a long time to wait.",
          replies: [
            "It is. But leaving would mean deciding he isn't coming. I'm not ready to decide.",
            "Long, yes. But the flamingos wait a whole year and they've smaller brains than me.",
            "I know, {title}. I've counted every one of them.",
            "Long for you. For me it's one very long evening.",
            "Perhaps. But what else would I do? Knit? I tried. The knitting was worse than the waiting.",
          ],
        },
        {
          text: "Only if he owes me money.",
          replies: [
            "Ha! He probably does. He owed everyone money. Bring him back and I'll pay it.",
            "Oh, he owes the whole island. Join the queue behind the fiddle maker.",
            "Then you'll search harder. Good. Greed finds people faster than love.",
            "You're wicked, {title}. Willem would have bought you a drink for that.",
            "If he owes you, he'll avoid you. He was very good at that.",
          ],
        },
      ],
    },
  ],

  "bonaire-market-maarten-koch": [
    {
      id: "bonaire-market-maarten-koch-1",
      text: "Maarten Koch, at your service! Finest salt on Bonaire, sold by the bravest man on Bonaire. I'll let you guess which one is me.",
    },
    {
      id: "bonaire-market-maarten-koch-2",
      text: "Did you hear about the shark, {title}? Ten feet long. I wrestled it in the shallows with my bare hands.",
      answers: [
        {
          text: "Incredible! Tell me everything.",
          replies: [
            "Well, it was twelve feet. Possibly thirteen. It's hard to measure while wrestling.",
            "It came at me out of the pans, jaws wide, and I said 'Not today, fish.'",
            "I'd show you the scar, but it healed suspiciously fast. Heroic blood, I think.",
            "We fought for an hour. Maybe ten minutes. It felt like an hour.",
            "Finally, someone who appreciates a good story! A true story, I mean. Obviously.",
          ],
        },
        {
          text: "I heard it was a small fish. And it won.",
          replies: [
            "That's a lie spread by jealous fishermen! It was a medium fish at least.",
            "Won is a strong word. It left first. That's a draw, technically.",
            "Who told you that? Was it Old Gerrit? He needs spectacles.",
            "It was small because I'd already beaten it down to that size!",
            "Fine. It won. But it was a very aggressive small fish, {title}.",
          ],
        },
        {
          text: "I once wrestled a whale. It apologised.",
          replies: [
            "A whale! Well, I... the shark also apologised. In shark.",
            "Hm. That's a fine story. Not as fine as mine, but fine.",
            "Did you really? Teach me. No, wait, I already know. I'm a natural.",
            "Ha! You're having me on. Aren't you? You are. Probably.",
            "An apologising whale. I'll have to wrestle something bigger now. A kraken, maybe.",
          ],
        },
      ],
    },
    {
      id: "bonaire-market-maarten-koch-3",
      text: "This sword? Borrowed. Well, inherited from a man who doesn't know he's left it to me yet. Why do people keep saying it's on the wrong hip?",
    },
    {
      id: "bonaire-market-maarten-koch-4",
      text: "One day I'll captain my own ship, like you, {title}. What's the hardest part of the job?",
      answers: [
        {
          text: "Keeping the crew alive.",
          replies: [
            "Oh. I hadn't thought of that. I'd mostly thought about the hat.",
            "Easy. I'd just be so brave they'd be too inspired to die.",
            "Alive. Right. I'll write that down. Hold on, I can't write. I'll remember it.",
            "I'm good at that. I've kept three goats alive for a whole year.",
            "Noted, {title}. Rule one: no dead crew. Rule two: very large hat.",
          ],
        },
        {
          text: "Wearing the sword on the correct hip.",
          replies: [
            "Everyone says that! Which hip is correct? Nobody ever tells me!",
            "Ha. Ha. Very funny. It's the left. No, the right. Wait.",
            "I switch it every day so I'm right half the time. That's good odds.",
            "Real captains don't care where their sword sits. Do they? They do, don't they.",
            "I'll ask the governor. He's got a helmet. He'll know about hips.",
          ],
        },
        {
          text: "The paperwork.",
          replies: [
            "Paperwork? Pirates don't do paperwork. Do they? Do you?",
            "That sounds awful. I'll hire a clerk. A brave one.",
            "Well, I'll have a parrot do it. They're clever, I've heard.",
            "I thought it would be sea monsters. Paperwork is much less exciting to wrestle.",
            "Ah. That explains why captains look so tired.",
          ],
        },
      ],
    },
    {
      id: "bonaire-market-maarten-koch-5",
      text: "The salt here is the best in the whole world. I know because I licked a lot of it. That's market research, that is.",
    },
    {
      id: "bonaire-market-maarten-koch-6",
      text: "If pirates ever attack {town}, they'll have to get past me first. Then the governor. Then the flamingos, who are vicious, frankly.",
    },
    {
      id: "bonaire-market-maarten-koch-7",
      text: "Would you take me on as crew, {title}? I'm very brave. Ask anyone. Except the fishermen.",
      answers: [
        {
          text: "Maybe when you're older.",
          replies: [
            "I'm twenty! That's practically ancient. My grandfather was a captain at twenty. Probably.",
            "Older. Fine. I'll be older tomorrow. I'll come and find you.",
            "That's what everyone says. Even the goats look at me like that.",
            "I'll grow a beard first. That'll show them. Give it a few years.",
            "Then I'll keep practising. On small fish. Smaller ones than last time.",
          ],
        },
        {
          text: "Can you climb rigging?",
          replies: [
            "Climb? Of course. I climbed the governor's orange tree. Most of it.",
            "I'm tall. Surely being tall counts as half the climbing already.",
            "I can climb anything. Getting down is a separate skill I'm working on.",
            "Yes! Well, ladders. Rigging's just a wobbly ladder, isn't it?",
            "I once climbed a salt pile in under a minute. Barefoot. It stung.",
          ],
        },
        {
          text: "Only as ship's shark bait.",
          replies: [
            "Ha! The sharks fear me, {title}. You'd catch nothing.",
            "That's a very important job. Someone has to be brave enough.",
            "I accept! Wait. Is that a real position? Does it pay?",
            "The last shark that met me is still telling its friends. Badly, probably.",
            "Fine, but I want a title. Master of Bait. With a hat.",
          ],
        },
      ],
    },
  ],

  "bonaire-governor-diederik-lang": [
    {
      id: "bonaire-governor-diederik-lang-1",
      text: "Ah. A visitor. Come in, {title}, but please don't bring any excitement. I've had enough excitement for three lifetimes.",
    },
    {
      id: "bonaire-governor-diederik-lang-2",
      text: "Twenty years in Flanders fighting the Spanish. Sieges, mud, more sieges, more mud. I took {town} because the most dangerous thing here is a flamingo with a grudge.",
    },
    {
      id: "bonaire-governor-diederik-lang-3",
      text: "Do you bring news, {title}? Please say no.",
      answers: [
        {
          text: "No news at all, governor.",
          replies: [
            "Wonderful. The best news is none. Sit, have an orange.",
            "Oh, thank God. You've no idea how lovely those words are.",
            "Splendid. Then let's sit quietly and watch the salt dry.",
            "Excellent. I'll write in my report: nothing happened. My favourite report.",
            "Bless you, {title}. You may visit any time you bring nothing.",
          ],
        },
        {
          text: "The {enemyAdjective} are planning an attack.",
          replies: [
            "On Bonaire? They'd need to want salt very badly. Wake me if they arrive.",
            "Hm. They said that in Flanders too. Then they took three years to arrive.",
            "Fine. I'll move the fruit out of my helmet. Just in case.",
            "Let them come. They'll find salt, goats and one very tired old man.",
            "Sigh. Is it a real attack or one of Maarten's stories? With him it's always a shark.",
          ],
        },
        {
          text: "Frederick Henry sends his regards and a trumpet.",
          replies: [
            "A trumpet? Please take it away. I spent twenty years being woken by trumpets.",
            "The Stadtholder remembers me? How alarming. That usually means he wants something.",
            "Tell His Highness I'm very honoured and very busy doing nothing.",
            "Ha. If that's true I'll use the trumpet as a vase. Next to the helmet.",
            "Regards I'll take. The trumpet goes to the bottom of the harbour.",
          ],
        },
      ],
    },
    {
      id: "bonaire-governor-diederik-lang-4",
      text: "My helmet? Yes, there's a dent. Spanish musket ball at Breda. These days it holds oranges. Much more peaceful work for us both.",
    },
    {
      id: "bonaire-governor-diederik-lang-5",
      text: "What do you think of the quiet here, {title}?",
      answers: [
        {
          text: "It's peaceful. You've earned it.",
          replies: [
            "I have. Every grey hair was paid for in mud and powder smoke.",
            "Thank you. People think I'm lazy. I'm not lazy. I'm retired early, in office.",
            "Earned and kept. That's my whole plan for the rest of my life.",
            "Yes. The only battle here is me against my afternoon nap, and the nap wins.",
            "Thank you, {title}. Most visitors want me to do something. You understand.",
          ],
        },
        {
          text: "It's boring. Nothing ever happens.",
          replies: [
            "Exactly. Isn't it marvellous?",
            "Boring is what old soldiers dream of. You'll understand in thirty years.",
            "Boring keeps men alive, {title}. Excitement fills cemeteries.",
            "Go to {enemyTown} if you want excitement. Leave me my boredom.",
            "Nothing ever happens. I wrote that on a plaque. It's over the door.",
          ],
        },
        {
          text: "It's suspicious. Something's coming.",
          replies: [
            "Don't. Don't say that. You'll wake the island.",
            "Something's always coming. Usually it's the supply ship, three weeks late.",
            "If something's coming, it can make an appointment like everyone else.",
            "That's what my sergeant said at Maastricht. He was right. I've never forgiven him.",
            "Then I'll have the lookout look out a bit harder. After his nap.",
          ],
        },
      ],
    },
    {
      id: "bonaire-governor-diederik-lang-6",
      text: "A young man once asked me how to win a war. I told him: arrive late, leave early and let the other side run out of money. He's a general now. Of course he is.",
    },
    {
      id: "bonaire-governor-diederik-lang-7",
      text: "If you're sailing on to {otherTown}, {title}, go carefully. And if you find any trouble out there, please keep it far away from here.",
    },
    {
      id: "bonaire-governor-diederik-lang-8",
      text: "Tell me, {title}, how do you sleep at sea? I haven't slept a full night since the siege of Breda.",
      answers: [
        {
          text: "Like a baby. I wake up screaming every two hours.",
          replies: [
            "Ha. That's how I slept in Flanders. Mud to the knees and a cannon for a lullaby.",
            "Then you're a soldier at heart, {title}. My condolences.",
            "Every two hours. That's a good night. I'd take that.",
            "Babies and old soldiers. We both cry, we both want soup.",
            "Sad and true. Have an orange. They help. They don't, but have one.",
          ],
        },
        {
          text: "In a hammock, swinging with the waves.",
          replies: [
            "A hammock. I tried one here. The goats used it as a swing.",
            "Rocked to sleep. That sounds lovely. Unless there's a storm.",
            "Wise. The sea rocks you and doesn't ask for reports in the morning.",
            "I might get one. Hang it between the fort and the flagpole.",
            "Swinging with the waves. I'd be sick by the second swing, {title}.",
          ],
        },
        {
          text: "With one eye open and a pistol under the pillow.",
          replies: [
            "That's how I slept for twenty years. I don't recommend it. My neck still clicks.",
            "Careful with the pistol. My lieutenant shot his own pillow. Feathers everywhere.",
            "A careful captain. Good. Careful captains get old. Look at me.",
            "Out there, perhaps. Here you can close both eyes. Nothing ever happens.",
            "One eye open. I know. The other eye never forgives you.",
          ],
        },
      ],
    },
  ],

  "st-martin-tavern-joost-becker": [
    {
      id: "st-martin-tavern-joost-becker-1",
      text: "Evening, {title}. Pull up a stool. Ten years I spent in the rigging of the salt ships. Now I keep my feet on the floor, and I've grown to like the floor.",
    },
    {
      id: "st-martin-tavern-joost-becker-2",
      text: "That arm? A yard came down in a squall off the Great Pond. Snapped it like a pipe stem. The sail got mended before I did.",
    },
    {
      id: "st-martin-tavern-joost-becker-3",
      text: "Can you tie a bowline one handed, {title}?",
      answers: [
        {
          text: "Yes, in the dark too.",
          replies: [
            "Ha! Then you're a sailor, not a passenger. First drink's on me.",
            "In the dark. That's how it should be learned. The sea doesn't light a lamp for you.",
            "Good. Show me later. My bad arm misses the knots.",
            "Then you'll never drown for want of a rope. That's half of seamanship.",
            "Proper sailor. Most captains these days couldn't tie their own shoes.",
          ],
        },
        {
          text: "I can tie it with no hands. Watch.",
          replies: [
            "With your teeth? I've seen it done, by a man with very few teeth after.",
            "Go on then. I'll get the bucket for when you fall off the stool.",
            "No hands. And next you'll reef a topsail with your eyebrows.",
            "Ha! I'll believe it when the rope does it by itself.",
            "If you manage it, I'll name a knot after you. The Liar's Hitch.",
          ],
        },
        {
          text: "I mostly use a granny knot and prayer.",
          replies: [
            "A granny knot! That's not a knot, that's a suggestion.",
            "Prayer helps. The granny knot doesn't. Let me show you before you lose a boat.",
            "You'd have been flogged on my old ship. Then taught properly.",
            "That's how my cousin moored his sloop. It's in {otherTown} now. Without him.",
            "Honest, at least. Come, I'll teach you. One arm is plenty for a bowline.",
          ],
        },
      ],
    },
    {
      id: "st-martin-tavern-joost-becker-4",
      text: "The salt pond here feeds half the herring barrels of Holland. Every pickled fish in Amsterdam owes a small thank you to {town}. They never send one.",
    },
    {
      id: "st-martin-tavern-joost-becker-5",
      text: "Do you miss the rigging, {title}? Or are you a quarterdeck sort?",
      answers: [
        {
          text: "I started as a deckhand myself.",
          replies: [
            "I could tell from your hands. Rope leaves a mark nothing washes off.",
            "Then we're the same stock. Sit. I'll pour you the good bottle.",
            "Good. Captains who've been aloft give better orders. They know what it costs.",
            "Ah. Then you remember the view from the topmast. Best seat in the world.",
            "A deckhand made good. That's a story worth a drink.",
          ],
        },
        {
          text: "Quarterdeck. I shout, others climb.",
          replies: [
            "Ha. Honest. Somebody's got to shout, and somebody's got to fall.",
            "Then shout kindly, {title}. The man aloft hears every word.",
            "I worked under captains like you. Most were fine. One shouted me off a yard.",
            "That's the natural order. Just don't shout the wrong rope.",
            "Fair enough. But once a month, climb. Reminds you what you're asking.",
          ],
        },
        {
          text: "I'm afraid of heights. And water. And boats.",
          replies: [
            "Then you've chosen a remarkable trade, {title}.",
            "Ha! And yet here you are. That's either courage or madness.",
            "A captain afraid of boats. You'll be the safest sailor in the Caribbean.",
            "Afraid of water? Then you'll love my beer. Not a drop in it.",
            "That's the funniest thing I've heard since the governor ordered her fifth portrait.",
          ],
        },
      ],
    },
    {
      id: "st-martin-tavern-joost-becker-6",
      text: "Sailor's rule: never trust a calm sea in hurricane season. Second rule: never trust a cook who's thin. I've broken both and lived, but only just.",
    },
    {
      id: "st-martin-tavern-joost-becker-7",
      text: "Heading out soon, {title}? Which way's the wind blowing tonight?",
      answers: [
        {
          text: "Easterly, steady.",
          replies: [
            "Good trade wind. You'll make {otherTown} in fine time.",
            "Steady easterly. That's a sailor's wind. Lucky you.",
            "Then reef nothing and let her run. I envy you.",
            "Easterly. The salt ships love that. So did I, once.",
            "Mind the reefs on your lee side, {title}. Easterlies lull you, then bite.",
          ],
        },
        {
          text: "Whichever way I spit.",
          replies: [
            "Ha! A natural navigator. The Company would hire you on the spot.",
            "Then spit carefully. Into the wind is a lesson you only learn once.",
            "That's not a wind, {title}, that's an accident.",
            "My old bosun steered by spit as well. He's in {enemyTown} now. By mistake.",
            "Good technique. Just stand on the right side of the ship when you test it.",
          ],
        },
      ],
    },
  ],

  "st-martin-market-femke-apel": [
    {
      id: "st-martin-market-femke-apel-1",
      text: "Welcome, {title}! Salt, cheese, a little cloth. Everything weighed honestly on my scale. Honestly in my favour, mind, but honestly.",
    },
    {
      id: "st-martin-market-femke-apel-2",
      text: "I came here to sell cheese. Then I noticed nobody in the tropics wants cheese, but everybody wants salt. Now the cheese is for me and the salt is for profit.",
    },
    {
      id: "st-martin-market-femke-apel-3",
      text: "How would you like to pay, {title}?",
      answers: [
        {
          text: "Pieces of eight.",
          replies: [
            "Spanish silver. Lovely. I'll weigh each one, of course. Nothing personal.",
            "Pieces of eight! Bless the King of Spain for minting my profit.",
            "Very good. And if any are clipped, I'll know. My scale tells me everything.",
            "Silver's always welcome. The Spaniards dig it, and somehow it ends up with me.",
            "Fine. Count them out slowly, {title}. I like to hear them.",
          ],
        },
        {
          text: "Guilders, like a good Dutch customer.",
          replies: [
            "Oh, a patriot. Guilders it is, and I'll still charge you the same.",
            "Very proper. My mother in Gouda would approve. She also haggled.",
            "Guilders. Solid as a dyke. Hand them over.",
            "Lovely. Though I'd take livres too, if you had any. Sentiment doesn't feed me.",
            "Good Dutch money for good Dutch salt. That's a sermon I can preach.",
          ],
        },
        {
          text: "With a smile and a promise.",
          replies: [
            "Smiles weigh nothing on my scale, {title}. I've checked.",
            "Promises I sell, I don't buy. Try again.",
            "Ha! My late husband paid with those. That's why he's late.",
            "A smile and a promise. Lovely. Now the coin, please.",
            "I'll take the smile as a tip. The bill stays as it is.",
          ],
        },
      ],
    },
    {
      id: "st-martin-market-femke-apel-4",
      text: "My brass scale? I polish it every hour. Customers trust a shiny scale. They shouldn't, but they do.",
    },
    {
      id: "st-martin-market-femke-apel-5",
      text: "Have you any {merchandise} to sell, {title}? I'll make you an offer you'll find very reasonable for exactly ten minutes.",
      answers: [
        {
          text: "Yes. What's your price?",
          replies: [
            "Lower than you hoped and higher than I'd like. That's a fair market.",
            "Show me first. I never name a price for a sack I can't smell.",
            "That depends how long you've been at sea. Longer means cheaper.",
            "My price? A little less than what you'll get in {otherTown}, minus the voyage.",
            "Ah, good. Bring it round and we'll argue like civilised people.",
          ],
        },
        {
          text: "Not to you. You'd cheat me.",
          replies: [
            "Cheat? Never. I'd simply be better at sums than you.",
            "Well, I respect a suspicious captain. They're always the ones who come back.",
            "Suit yourself. Nobody on {town} will pay more, and they'll pay slower.",
            "Ha. Clever. You've met my brother, haven't you?",
            "Fine. Go elsewhere. I'll be here when you discover I was right.",
          ],
        },
        {
          text: "Would you take a slightly used goat?",
          replies: [
            "Used for what? No, don't answer. The goat's eyes tell me enough.",
            "I've three goats already and they've eaten two awnings. No.",
            "Slightly used. Hm. I'd give you a pinch of salt for it, and that's charity.",
            "If it gives milk, we'll talk. If it gives opinions, take it away.",
            "A goat is not merchandise, {title}. It's a problem with legs.",
          ],
        },
      ],
    },
    {
      id: "st-martin-market-femke-apel-6",
      text: "People say the {enemyAdjective} pay well for salt. They do. They also pay with cannon fire when they change their minds. I only sell to customers who stay polite.",
    },
    {
      id: "st-martin-market-femke-apel-7",
      text: "Sentiment is a fine thing, {title}, for poets. I've never seen a poet buy salt.",
    },
    {
      id: "st-martin-market-femke-apel-8",
      text: "Do you know what salt is worth in Amsterdam, {title}? Every herring in Holland needs it, and every herring is hungry.",
      answers: [
        {
          text: "More than here, I'd wager.",
          replies: [
            "Much more. Which is why I buy here and smile at the difference.",
            "Clever. You could be a trader if you stopped being a sailor.",
            "Three times as much, before the voyage eats its share. Don't tell anyone.",
            "Correct. And the difference pays for my cheese habit.",
            "Wager all you like, {title}. I don't gamble, I calculate.",
          ],
        },
        {
          text: "Herrings don't eat, they're already pickled.",
          replies: [
            "Ha! Pedant. You'll make a terrible customer and a very good accountant.",
            "That's what the salt is for, clever captain. The pickling.",
            "A dead herring is the best customer there is. It never haggles.",
            "Fine. Every barrel is hungry, then. My point stands, and so does my price.",
            "My grandmother would have hit you with a ladle for that. Then laughed.",
          ],
        },
        {
          text: "I don't care. I want to sell you {merchandise}.",
          replies: [
            "Straight to business. I like that. I still won't pay what you're hoping.",
            "Good. A captain who doesn't care is a captain I can bargain with.",
            "{merchandise}. Hm. Bring it round, but I'm warning you, my scale is honest.",
            "I respect focus, {title}. Let's see what your focus is worth.",
            "Then let's skip the herrings and talk numbers. I prefer numbers anyway.",
          ],
        },
      ],
    },
  ],

  "st-martin-governor-machteld-glauber": [
    {
      id: "st-martin-governor-machteld-glauber-1",
      text: "You stand before Machteld Glauber, governing {town} in the name of my brother, who is away. Very far away. Indefinitely, if I have my way.",
    },
    {
      id: "st-martin-governor-machteld-glauber-2",
      text: "Have you noticed the portraits, {title}?",
      answers: [
        {
          text: "They're magnificent, your excellency.",
          replies: [
            "Of course they are. The painter nearly wept. Partly from the size of the collar.",
            "Thank you. There are eleven. There will soon be twelve.",
            "Magnificent is the word I chose for the plaque as well. Great minds.",
            "You have taste, {title}. Rare in a sea captain.",
            "The one in the dining hall is my favourite. It watches people eat.",
          ],
        },
        {
          text: "How many of you are there?",
          replies: [
            "Only one. But one of me deserves to be seen from every room.",
            "Eleven portraits, one Machteld. The arithmetic is perfectly sensible.",
            "Impertinent. And yet a fair question. The answer is: not enough.",
            "Do not be clever with me, {title}. I have a portrait for that, too.",
            "My brother asked the same. That's partly why he's away.",
          ],
        },
        {
          text: "The one in the privy seemed a bit much.",
          replies: [
            "That one is there to remind visitors who governs, even in private.",
            "A bit much? It is precisely enough. I measured.",
            "How dare you. That is the finest of the lot. The painter called it intimate.",
            "Hm. Perhaps a smaller one there. I'll consider it. I won't.",
            "Every room, {title}. Every room. I was very specific.",
          ],
        },
      ],
    },
    {
      id: "st-martin-governor-machteld-glauber-3",
      text: "This collar was made in Haarlem and took six lacemakers three months. I wear it on Tuesdays. Today is not Tuesday, but you are a guest, so I made an exception.",
    },
    {
      id: "st-martin-governor-machteld-glauber-4",
      text: "My brother writes that I should be more modest. I've had his letter framed. Next to a portrait of me reading it.",
    },
    {
      id: "st-martin-governor-machteld-glauber-5",
      text: "How do you address a governor where you come from, {title}?",
      answers: [
        {
          text: "Your excellency, with a deep bow.",
          replies: [
            "Correct. Deeper, next time. I'll have someone measure.",
            "Lovely. The salt traders could learn from you.",
            "Good. You may rise. Slowly. I like to savour it.",
            "Finally, a captain who knows manners. Write to my brother and tell him.",
            "Excellent. You may come again, {title}. On a Tuesday, for the collar.",
          ],
        },
        {
          text: "Usually with 'Oi, you'.",
          replies: [
            "Oi? Guards! No, wait. I want to see if you can do better.",
            "In {playerNation} perhaps. Here we have standards and a jail.",
            "That word has never been spoken in this residence, and never will be again.",
            "Ha. Ha. I'm told that was a jest. I'll laugh when I've decided it was.",
            "Try that again and you'll address my portrait instead. For a week.",
          ],
        },
        {
          text: "By whatever name gets the paperwork signed fastest.",
          replies: [
            "Practical. Then the name is 'your most gracious excellency' and the wait is long.",
            "Paperwork is signed when I am satisfied. You may begin satisfying me now.",
            "A merchant's answer. My brother would like you. That is not a compliment.",
            "Flattery speeds the quill, {title}. Remember that.",
            "Ha. Honest. I'll sign it today. Tomorrow if you'd said 'Oi'.",
          ],
        },
      ],
    },
    {
      id: "st-martin-governor-machteld-glauber-6",
      text: "The salt of the Great Pond makes {town} the envy of the Caribbean. I take personal credit. The salt doesn't object, and the salt workers wouldn't dare.",
    },
    {
      id: "st-martin-governor-machteld-glauber-7",
      text: "Do you think a woman can govern as well as a man, {title}?",
      answers: [
        {
          text: "Better, judging by you.",
          replies: [
            "Correct. Have that written down and sent to my brother.",
            "Clever and true. You may sit. The chair under the third portrait.",
            "I'll be commissioning a portrait of this moment. You'll be in the background.",
            "Precisely. Since I took over, the harbour's tidier and the ledgers balance.",
            "You flatter me, {title}. Continue.",
          ],
        },
        {
          text: "As well as anyone with eleven portraits of themselves.",
          replies: [
            "Twelve, as of Friday. And yes, rather well, thank you.",
            "Cheek. But I'll take it. Ambition is a governor's best friend.",
            "The portraits keep the staff honest. Every room has a witness.",
            "Ha. You're bold. Bold people end up either knighted or in the stocks.",
            "Mind your tongue, {title}, or you'll end up in a portrait. As a cautionary figure.",
          ],
        },
        {
          text: "Queen Elizabeth seemed to manage.",
          replies: [
            "She did. Though I'm told her collars were smaller. Amateur.",
            "Exactly! A Protestant woman with a firm hand. I admire her greatly.",
            "She beat the Spanish Armada. I beat my brother. Smaller scale, same spirit.",
            "Quite so. I have a copy of her portrait. Next to a larger one of me.",
            "An English example, but I'll allow it. Good taste crosses borders.",
          ],
        },
      ],
    },
  ],
}
