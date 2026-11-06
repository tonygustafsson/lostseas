import "server-only"

export const SCHEMER: DialogueEntry[] = [
  {
    id: "schemer-1",
    text: "Ah, {title} {name}. Do sit. Not that chair, the other one. That one belongs to a man who asked too many questions.",
  },
  {
    id: "schemer-2",
    text: "Tell me, {title}, whose ships did you pass on your way to {town}?",
    answers: [
      {
        text: "A few traders flying {enemyAdjective} colours.",
        replies: [
          "How interesting. And how many guns, would you say? Roughly. I adore rough numbers.",
          "Traders, you say. I have known a great many traders who carried more powder than cargo.",
          "Ah. Then my little friends in {enemyTown} have been busy. Good to know.",
          "You have a sharp eye. I collect sharp eyes. Figuratively, of course.",
          "Write down their names for me before you leave. I keep a book. Everyone ends up in it eventually.",
        ],
      },
      {
        text: "I never look at other ships. I find it rude.",
        replies: [
          "Manners at sea. How refreshing, and how utterly useless to me.",
          "A captain who sees nothing. Either a fool or a very good liar. I wonder which.",
          "Then you and my harbour master have a great deal in common. He also sees nothing, for a modest fee.",
          "Rude, he says. Spying is only rude when you are caught, {title}.",
          "Charming. I shall note you down as discreet. It may yet be a compliment.",
        ],
      },
      {
        text: "Only a seagull. It looked suspicious.",
        replies: [
          "They all do. I have suspected that bird for years. It roosts directly above the treasury.",
          "Did it fly towards {enemyTown}? Do not laugh. I have paid informants who were less reliable.",
          "A seagull. Very well. I shall add it to my list. The list is long and the gulls are on page three.",
          "You jest, but the last spy we hanged also had feathers in his hat. Coincidence is a luxury.",
          "Wit. I like wit. It tells me you have something to hide, but I like it nonetheless.",
        ],
      },
    ],
  },
  {
    id: "schemer-3",
    text: "The war with {enemy} is fought with cannon at sea, {title}, but it is won with letters in drawing rooms.",
  },
  {
    id: "schemer-4",
    text: "A small test, {title}. A smuggler offers you cheap {merchandise} and a cut of his profits. What do you do?",
    answers: [
      {
        text: "Report him to you, naturally.",
        replies: [
          "Naturally. Everyone says that in this room. Very few mean it.",
          "Good answer. Too good, perhaps. You rehearsed it on the way up the stairs.",
          "And if I told you the smuggler was my cousin? No, do not answer. Watching you think is answer enough.",
          "Loyal to the crown. How tidy. I shall remember you said so, word for word.",
          "Splendid. Though I confess I would have respected a little hesitation.",
        ],
      },
      {
        text: "Ask for a bigger cut.",
        replies: [
          "Honesty. How alarming. Do keep going, I am taking notes.",
          "A businessman. Good. Businessmen can be reasoned with. Saints cannot.",
          "You would make a fine tax collector. That is not entirely a compliment.",
          "Bold. If he ever offers, do let me know the figure. Purely for the ledgers.",
          "Ha! At least you are honest about your dishonesty. That is rarer than silver in this town.",
        ],
      },
      {
        text: "Buy it all and sell it to his rival.",
        replies: [
          "Oh, now that is elegant. Play one against the other and stand in the middle with the purse.",
          "You have been to court in Europe, I think. Or you were simply born devious. Either suits me.",
          "I could have used you during the last dispute over the customs house. The men involved are still not speaking.",
          "Delicious. Cruel, but delicious.",
          "Careful, {title}. Men who think like that end up governing places like {town}. Look how that turned out for me.",
        ],
      },
    ],
  },
  {
    id: "schemer-5",
    text: "The crown wants more taxes, the merchants want fewer, and I want everyone to believe I am on their side. It is exhausting, but someone must do it.",
  },
  {
    id: "schemer-6",
    text: "Do you know what they say about you in {otherTown}, {title}?",
    answers: [
      {
        text: "No. What do they say?",
        replies: [
          "Oh, nothing worth repeating. Yet. Keep at it.",
          "That you pay your debts. Mostly. The word mostly is doing a great deal of work there.",
          "If I told you, you would know my sources. And then I would have to find new ones. Tiresome.",
          "They say you are dangerous. I said you seemed perfectly pleasant. One of us is wrong.",
          "Curious, are you? Good. Curiosity is a debt, {title}. I will collect it one day.",
        ],
      },
      {
        text: "I do not care what they say.",
        replies: [
          "Everyone cares. The ones who claim otherwise care the most.",
          "Admirable. Foolish, but admirable.",
          "That is precisely what the last man said. He now sells fish in {otherTown}. Badly.",
          "Then you will not mind if I write some of it down. For my own amusement.",
          "Not caring is a luxury for men with very large ships. How large is yours?",
        ],
      },
      {
        text: "Probably that I am handsome and modest.",
        replies: [
          "Modest is not the word they used. Handsome was not mentioned at all.",
          "Ah, a sense of humour. They did not mention that either. My informant must be slipping.",
          "I shall pass that along. I am sure it will be met with gales of laughter.",
          "Handsome. Well, the light in {otherTown} is very poor, so perhaps.",
          "Splendid. I have never had a vain spy before. It might work. Vanity is excellent cover.",
        ],
      },
    ],
  },
  {
    id: "schemer-7",
    text: "Cardinal Richelieu writes letters the way other men breathe. I admire him. I would never say so in a crowded room, but I admire him.",
  },
  {
    id: "schemer-8",
    text: "If {enemy} offered you a fat purse to sail under their flag, {title}, how long would you think about it?",
    answers: [
      {
        text: "Not a moment. I would refuse.",
        replies: [
          "Not even a moment? You must be very rich, very loyal or very bad at sums.",
          "Good. I would hate to have to mention you in a letter to {nationTown}. My letters are so long already.",
          "Refuse, yes. But would you tell me who asked? That is the part I care about.",
          "Loyalty without a pause. I find that either touching or suspicious. I have not decided.",
          "Excellent answer. Now say it again, slower, while I watch your hands.",
        ],
      },
      {
        text: "Depends on how fat the purse is.",
        replies: [
          "A practical soul. At least I know your price exists. Everyone has one, most simply hide it better.",
          "Hmm. Then I suppose I must make sure our purses stay fatter. The crown will be delighted.",
          "Honest and alarming. Like a doctor who tells you the truth.",
          "Should anyone ever name a figure, do tell me. I collect figures as other men collect snuff boxes.",
          "Careful, {title}. In some rooms that answer gets a man hanged. Luckily this is my room.",
        ],
      },
      {
        text: "I would take their money and keep my flag.",
        replies: [
          "Ha! Now you are speaking my language. Fluently, even.",
          "Cheat the enemy and stay loyal. A diplomat in the making.",
          "I have done something very similar myself. I shall not say when. The man is still alive.",
          "Clever. Dangerous for you if they find out, but clever.",
          "That, {title}, is what we in government call patriotism with benefits.",
        ],
      },
    ],
  },
  {
    id: "schemer-9",
    text: "The Spanish flota sails home every year groaning with silver, and every year a hundred men like you dream of Piet Heyn. Dream quietly near me, there are ears everywhere.",
  },
  {
    id: "schemer-10",
    text: "Between us, {title}, do you trust the harbour master of {town}?",
    answers: [
      {
        text: "Yes, he seems honest.",
        replies: [
          "Seems. Such a lovely word. Everyone seems something.",
          "He does, does he not? That is what worries me.",
          "Honest men do not own three houses on a harbour master's wage. Still, he does seem it.",
          "I appointed him precisely because he seems honest. Seeming is half of governing.",
          "How sweet. Keep that innocence, {title}. It will make you very easy to read.",
        ],
      },
      {
        text: "No. I trust nobody.",
        replies: [
          "Ah, a kindred spirit. We should have supper. Separately.",
          "Wise. Though you came into my office without a second thought. Interesting.",
          "Nobody? Not even me? I am wounded. Accurately, but wounded.",
          "That is the first true thing anyone has said to me today.",
          "Good. Trust is a currency, and I prefer people who spend it carefully.",
        ],
      },
      {
        text: "I trust his dog. The dog has kind eyes.",
        replies: [
          "The dog reports to me as well. Not in words, naturally, but he goes where the money goes.",
          "Kind eyes. That dog once stole an entire ham from the customs house. Do not be deceived.",
          "Ha! I shall consider making the dog harbour master. It could hardly be worse.",
          "Animals are the best spies. Nobody lowers their voice for a dog.",
          "You trust a dog over a man. That is the most sensible thing you have said.",
        ],
      },
    ],
  },
  {
    id: "schemer-11",
    text: "I sent a letter to Europe in {month}. I expect a reply by next year, by which time everything in it will be wrong. That is how the crown governs the Caribbean.",
  },
  {
    id: "schemer-12",
    text: "Suppose I told you a captain in this very harbour was selling our patrol routes to {enemy}. What would you do?",
    answers: [
      {
        text: "Find out who it is and tell you.",
        replies: [
          "Diligent. Though I already know who it is. I wanted to see how quickly you would volunteer.",
          "Excellent. Bring me proof, not gossip. I have enough gossip to wallpaper this office.",
          "Very good. And if it turned out to be a friend of yours?",
          "You would make an adequate spy. Too eager, but adequate.",
          "How noble. Do not do anything about it yet, though. A known traitor is a useful traitor.",
        ],
      },
      {
        text: "Sell him false routes to sell on.",
        replies: [
          "Oh, I do like you. Feed the traitor poisoned bread. Wonderful.",
          "That is precisely what I have been doing for three months. Great minds, {title}.",
          "Delightful. Let {enemy} chase our imaginary patrols round {enemyTown} for a season.",
          "You have a gift for mischief. Use it carefully. Gifts like that tend to explode.",
          "If I ever need a man to lie convincingly, I shall know where to look.",
        ],
      },
      {
        text: "Ask if he pays better than you do.",
        replies: [
          "Cheeky. He does, as it happens. Treason pays very well until the very last day.",
          "I shall pretend I did not hear that. I shall also write it down.",
          "A fair question, and one I refuse to answer in case you take notes.",
          "Better pay and a shorter life, {title}. I offer the reverse.",
          "Ha! You are either joking or negotiating. I genuinely cannot tell, which is rather thrilling.",
        ],
      },
    ],
  },
  {
    id: "schemer-13",
    text: "Spies are like rats, {title}. For every one you see, there are ten in the walls. I keep cats. Lots of cats.",
  },
  {
    id: "schemer-14",
    text: "What do you make of the trouble between King Charles and his Parliament, {title}?",
    answers: [
      {
        text: "The king should stand firm.",
        replies: [
          "Spoken like a loyal subject. Or a man who knows I might be one. Clever either way.",
          "Firm. Yes. Kings who stand firm are admired. Then sometimes they are not.",
          "His Majesty would be pleased to hear it. I would be pleased if you said it louder near the Parliament men.",
          "Firm against a Parliament that holds the purse? Bold. The purse usually wins.",
          "A fine sentiment. I have heard bishops say the same, shortly before asking for money.",
        ],
      },
      {
        text: "Parliament has a point about taxes.",
        replies: [
          "Careful. Say that in London and you would lose an ear. Here you merely lose my good opinion. Temporarily.",
          "Interesting. Very interesting. Do you have friends who feel the same? Names would be lovely.",
          "Taxes. Everyone has a point about taxes until they need a navy.",
          "Ship money, poll money, tonnage. The English invent new taxes faster than they invent new ships.",
          "I shall pretend I did not hear that, and remember it forever. A habit of mine.",
        ],
      },
      {
        text: "I try not to think about kings before supper.",
        replies: [
          "Wise. Kings are terrible for the digestion.",
          "And after supper? No, on reflection, do not answer that either.",
          "A diplomat's answer. Say nothing, offend nobody, eat well. I approve.",
          "You would make a fine courtier. They also avoid thinking, mostly about everything.",
          "Ha! I envy you. I think about kings all day and dream about them at night. They are never grateful.",
        ],
      },
    ],
  },
  {
    id: "schemer-15",
    text: "The Dutch West India Company has more ships than some kingdoms and fewer scruples than most pirates. I respect that in an enemy. Or a friend. It changes weekly.",
  },
  {
    id: "schemer-16",
    text: "I have a riddle for you, {title}. What weighs nothing but can sink a fleet?",
    answers: [
      {
        text: "A secret.",
        replies: [
          "Correct. You are cleverer than you look. That is a compliment, mostly.",
          "Precisely. And I have a cellar full of them.",
          "Ah, you have played this game before. Who taught you? Never mind, I shall find out.",
          "Very good. Most captains guess a hurricane. Hurricanes are honest by comparison.",
          "Exactly. Which is why I never write mine down. Except in code. In three codes.",
        ],
      },
      {
        text: "A hurricane.",
        replies: [
          "A hurricane weighs a great deal, {title}. Ask anyone who lost a roof last season.",
          "Close, and very nautical of you. But no. The answer was a secret.",
          "You think like a sailor. I think like a governor. One of us sleeps better.",
          "Wrong, but I will accept it. Hurricanes are the only things here I cannot bribe.",
          "No. Though I did once lose a fleet of letters to a hurricane. Very inconvenient. Very wet.",
        ],
      },
      {
        text: "My cook's ship's biscuit.",
        replies: [
          "Ha! Now that is a weapon of war. Have you considered selling it to {enemy}?",
          "Ship's biscuit sinks nothing. It merely makes men wish they had sunk.",
          "Wrong answer, right spirit. Send me a sample, I have enemies to feed.",
          "I once broke a tooth on a biscuit from {otherTown}. I never forgave the town.",
          "The answer was a secret, but your cook sounds like one worth keeping.",
        ],
      },
    ],
  },
  {
    id: "schemer-17",
    text: "Smugglers are terrible for the treasury and wonderful for my wine cellar. Governing is full of these little contradictions.",
  },
  {
    id: "schemer-18",
    text: "If you had to choose, {title}, would you rather be feared or loved?",
    answers: [
      {
        text: "Loved.",
        replies: [
          "How touching. Love fades, {title}. Fear compounds, like interest.",
          "Loved. Yes. I tried that once. They loved me right up until the taxes went up.",
          "A romantic. I keep one or two around. They are useful for weddings and alliances.",
          "Sweet. And when your crew loves someone else more, what then?",
          "Very well. I shall make sure only to frighten you a little.",
        ],
      },
      {
        text: "Feared.",
        replies: [
          "Ah. Then you have read the right books. Or lived the wrong life.",
          "Feared men sleep badly. I should know. I have not slept well since {year} began.",
          "Fear works, but it is expensive. You must keep topping it up.",
          "A practical answer. Though people fear you most when they never quite know what you will do.",
          "Good. Then we understand each other. Do not try it on me, though.",
        ],
      },
      {
        text: "Underestimated.",
        replies: [
          "Oh, now that is the right answer. I underestimated you already. Clever.",
          "The best of all. Nobody guards the door against a fool.",
          "Ha! I have spent twenty years being underestimated. It has made me very rich and quite unpopular.",
          "You are more dangerous than you look. Which is exactly what you wanted me to think. Well played.",
          "I shall pretend I did not hear that, so that I may go on underestimating you as you wish.",
        ],
      },
    ],
  },
  {
    id: "schemer-19",
    text: "There are rumours of plague in {otherTown}. There are always rumours of plague in {otherTown}. I started half of them myself, to keep their merchants out of our market.",
  },
  {
    id: "schemer-20",
    text: "A merchant came to me this morning swearing his rival in {nationTown} is a spy for {enemy}. Do you think I should believe him?",
    answers: [
      {
        text: "Investigate before you believe anything.",
        replies: [
          "Sensible. Dull, but sensible. Most good advice is.",
          "Of course. I have already sent someone. I always send someone.",
          "Yes, though I suspect the merchant mostly wants his rival's warehouse.",
          "Good. Remember that advice yourself when people whisper about you.",
          "Wise. Accusations are the cheapest thing in the Caribbean, cheaper even than rum.",
        ],
      },
      {
        text: "Believe whichever one pays more taxes.",
        replies: [
          "Ha! Cynical, practical and very nearly how the crown actually works.",
          "A treasurer's logic. I shall have you sent to Europe to advise the court.",
          "That would be the rival, as it happens. How awkward for my morning visitor.",
          "Wicked of you. I will think about it for at least an hour.",
          "Justice by ledger. It has a certain tidiness I find appealing.",
        ],
      },
      {
        text: "Arrest them both and let God sort it out.",
        replies: [
          "God is busy with the war in Germany, {title}. He has not answered my letters in years.",
          "Tempting. But then who would I tax?",
          "The Inquisition would approve. That alone makes me hesitate.",
          "I like the efficiency. I dislike the paperwork.",
          "Ha! A man after the Cardinal's own heart. Do not tell anyone I said that.",
        ],
      },
    ],
  },
  {
    id: "schemer-21",
    text: "In Europe, the Thirty Years' War has eaten armies whole. Out here, we play the same game with fewer soldiers and more mosquitoes.",
  },
  {
    id: "schemer-22",
    text: "You have been to {otherTown} lately, have you not, {title}? Who did you dine with?",
    answers: [
      {
        text: "Only my crew.",
        replies: [
          "Only your crew. And not one of them slipped away to speak with anyone? Remarkable crew.",
          "Of course. Though my man saw you speaking to a gentleman in a green coat. Never mind. Probably nothing.",
          "How loyal of you. Your crew must adore you, or fear you, or have nowhere else to go.",
          "Very well. I shall believe you until I learn otherwise. I always learn otherwise.",
          "Pity. I was hoping for gossip. Captains are terrible at gossip.",
        ],
      },
      {
        text: "The governor himself. He sends regards.",
        replies: [
          "Does he. Then I shall burn his regards with the rest of his letters.",
          "Ah. And did he ask about me? He always asks about me. It is very flattering and slightly alarming.",
          "Regards from that man are like a smile from a shark. Polite and full of teeth.",
          "I hope you counted the silverware when you left. He counts it after his guests leave.",
          "How interesting. You must tell me everything he said. Slowly. I shall be writing.",
        ],
      },
      {
        text: "A goat. Charming fellow. Terrible table manners.",
        replies: [
          "The goat probably worked for {enemy}. They have been recruiting livestock. I am only half joking.",
          "Better company than most governors. Fewer opinions about taxes.",
          "Ha! You avoid my question with a goat. That is new. I shall add it to my collection of evasions.",
          "Terrible table manners and charming. That describes half of my court.",
          "If the goat said anything of interest, do let me know. I am not proud about my sources.",
        ],
      },
    ],
  },
  {
    id: "schemer-23",
    text: "Philip IV has Catalonia rising and Portugal sulking. A distracted king is a gift, {title}, and I never return gifts.",
  },
  {
    id: "schemer-24",
    text: "Which do you think more dangerous to {town}, {title}, the enemy fleet or the rumours that arrive before it?",
    answers: [
      {
        text: "The fleet. Rumours do not have cannon.",
        replies: [
          "Rumours do not need cannon. They empty a town quite well enough without them.",
          "Spoken like a captain. A governor would tell you otherwise.",
          "I once lost half a market to a rumour about a fleet that never existed. Cannon would have been cheaper.",
          "Fair. But who do you think spreads the rumours to soften us up?",
          "Fleets come and go. Rumours stay in the walls for years. Like damp.",
        ],
      },
      {
        text: "The rumours.",
        replies: [
          "Exactly. You see, you have a governor's mind hidden behind that weathered face.",
          "Yes. A frightened town opens its gates, sells its stores and hides its daughters. All before a single shot.",
          "Good. Then you will understand why I spend more on whisperers than on gunpowder.",
          "Correct. I have stopped two sieges simply by being better at gossip.",
          "Precisely. Which is why the rumours in this town are mine.",
        ],
      },
      {
        text: "The tavern's fish stew.",
        replies: [
          "Ha! That stew has killed more men than {enemy}. I have tried to make it a weapon.",
          "Do not insult the stew, {title}. The cook is my best informant.",
          "True. I will have it served to the next envoy from {enemyTown}.",
          "Cheeky. And unfortunately accurate.",
          "I once used that stew to end a negotiation early. Everyone agreed rather quickly.",
        ],
      },
    ],
  },
  {
    id: "schemer-25",
    text: "Letters of marque are wonderful things, {title}. A piece of paper that turns a thief into a patriot. If only I could write them for my creditors.",
  },
  {
    id: "schemer-26",
    text: "I have heard you were born in {playerNation}, {title}. Where does your loyalty truly lie?",
    answers: [
      {
        text: "With my homeland, always.",
        replies: [
          "Always is a long time in the Caribbean. Ask anyone who has switched flags. Most of them have.",
          "Admirable. I hope your homeland knows. Homelands rarely notice.",
          "Good. A man who knows his flag is a man I can predict. I like predictable men.",
          "Always. I said the same at your age. Then I discovered paperwork.",
          "Splendid. Do not let anyone in this town tempt you otherwise. Except me, perhaps.",
        ],
      },
      {
        text: "With whoever is paying.",
        replies: [
          "A mercenary. At least you are honest about it. Most of my officers lie.",
          "Then I must remember to pay well. Or to pay last.",
          "That is the most truthful answer I have heard in this office. I find it oddly refreshing.",
          "Coins have no flag, I suppose. Although pieces of eight do have a Spanish king on them. Irony.",
          "Careful. Men who sell loyalty find it very hard to buy back.",
        ],
      },
      {
        text: "With my ship. She has never lied to me.",
        replies: [
          "A ship cannot lie. That is what makes them such dreadful diplomats.",
          "Touching. I hope she never learns what you say about her in harbour.",
          "A captain married to his ship. I have seen worse matches at court.",
          "Ha! Then I shall negotiate directly with your ship. I expect she drives a hard bargain.",
          "Loyal to timber and tar. Well, at least timber cannot be bribed.",
        ],
      },
    ],
  },
  {
    id: "schemer-27",
    text: "The {enemyAdjective} take forts at home and islands out here. They are a very tidy people. Even their conquests are well organised.",
  },
  {
    id: "schemer-28",
    text: "If you found a sealed letter on a dead courier, {title}, would you open it?",
    answers: [
      {
        text: "No. It would go straight to you.",
        replies: [
          "Sealed and unread. You are either a saint or you have learned to reseal wax. Both are useful.",
          "Excellent. And when it arrives, I shall check the seal very carefully. Nothing personal.",
          "How proper. My last courier read everything. He read his way right into the harbour.",
          "Good. Letters are like oysters. Open one carelessly and you may cut yourself.",
          "Correct answer. Whether it is the true answer, we shall see.",
        ],
      },
      {
        text: "Of course. And then reseal it.",
        replies: [
          "A craftsman. Steam the wax, slip the blade, warm it back. I could teach a course.",
          "Honest. I do the same. We should compare techniques.",
          "Good. Never deliver a letter you have not read. That is my first rule of government.",
          "And if it mentioned you? What then?",
          "Wicked and practical. You would do well at court in Paris.",
        ],
      },
      {
        text: "I cannot read. I would use it to start a fire.",
        replies: [
          "Then you are the safest courier in the Caribbean. I may hire you.",
          "A fire. You would warm your hands with state secrets. That is almost poetic.",
          "Ha! I have known several governors who also could not read. They signed everything.",
          "Do not burn it. Bring it to me. I shall read it to you, selectively.",
          "Illiteracy as a security measure. I hadn't considered that. How very efficient.",
        ],
      },
    ],
  },
  {
    id: "schemer-29",
    text: "I keep a list of everyone who has ever crossed me. Do not look so worried, {title}. You are not on it. Yet. The page is blank and waiting.",
  },
  {
    id: "schemer-30",
    text: "The crown tells me to collect more customs duty on {merchandise}. How do you think the merchants of {town} will take it?",
    answers: [
      {
        text: "Badly. They will smuggle it instead.",
        replies: [
          "Of course they will. Then I tax the smugglers through quieter means.",
          "Yes, and then I will be blamed. That is what governors are for.",
          "Correct. The crown has never met a merchant. I meet them every Tuesday.",
          "And I shall know exactly which beaches they use. My nephew fishes there.",
          "True. Taxes go up, honesty goes down. A law older than the crown itself.",
        ],
      },
      {
        text: "They will blame you, and you will blame the crown.",
        replies: [
          "Exactly. And the crown will blame the war, and the war blames nobody. A perfect circle.",
          "You understand politics better than you pretend. I find that suspicious and charming.",
          "Of course. The crown is very far away and very hard to throw rotten fruit at.",
          "Ha! You have watched me work. How long have you been in {town}?",
          "Precisely. I shall wring my hands in public and count coins in private.",
        ],
      },
      {
        text: "Tell them it is a gift to the king's birthday.",
        replies: [
          "Ha! Every year? The king would be very old by now.",
          "A gift. Yes. Generosity is easier to collect than duty.",
          "I tried something similar for a saint's day once. The saint did very well out of it.",
          "Devilish. I may borrow that, and I will deny you suggested it.",
          "If they believe that, I have a few more birthdays I could invent.",
        ],
      },
    ],
  },
  {
    id: "schemer-31",
    text: "The buccaneers on Hispaniola and Tortuga are a nuisance to some, a weapon to others. I prefer weapons. They are easier to aim.",
  },
  {
    id: "schemer-32",
    text: "Tell me, {title}, which governor in the Caribbean do you think is the most cunning?",
    answers: [
      {
        text: "You, obviously.",
        replies: [
          "Flattery. How lovely. I shall enjoy it and trust it not at all.",
          "Obviously. Although the truly cunning one would make sure nobody suspected them.",
          "You say that in every City hall, I expect. Still, it sounds best in mine.",
          "Thank you. I would return the compliment, but I never give anything for free.",
          "Correct, though I wonder what you want from me now.",
        ],
      },
      {
        text: "The governor of {enemyTown}.",
        replies: [
          "Him? He is about as cunning as a wet sack of salt pork.",
          "How dare you. Although, he did fool me once, in {year}. Never again.",
          "Interesting. Has he been buying you drinks? He does that when he wants something.",
          "Hmm. You may be right. That is what irritates me most.",
          "Cunning, perhaps. But I have his secretary on my payroll. So who is the clever one?",
        ],
      },
      {
        text: "My parrot. She has outwitted three governors so far.",
        replies: [
          "Then I shall be careful what I say in front of her. Parrots repeat things.",
          "Three governors. Do give me their names. Purely academic interest.",
          "Ha! A parrot spy. Now that would be useful. Does she speak the enemy's tongue?",
          "I would sooner face your parrot than half the men at court. She probably has fewer debts.",
          "Your parrot and I should meet. Privately. We may have much to discuss.",
        ],
      },
    ],
  },
  {
    id: "schemer-33",
    text: "I have three secretaries, {title}. One copies my letters, one reads them to my enemies and one tells me what the second one said. It is a very efficient system.",
  },
  {
    id: "schemer-34",
    text: "A hurricane is coming this season, the old fishermen say. What would you do first if it hit {town}?",
    answers: [
      {
        text: "Secure my ship and help the town.",
        replies: [
          "Admirable. And entirely sincere, I think. How rare.",
          "Good. The town will remember. Towns remember kindness for almost a whole week.",
          "Practical and kind. I shall keep you away from court, it would ruin you.",
          "I hope you mean it. I have seen captains vanish before the first gust.",
          "A sound answer. I will be in the cellar with the treasury, praying with great sincerity.",
        ],
      },
      {
        text: "Find out which warehouses will be damaged and buy cheap.",
        replies: [
          "Oh dear. You think like me. That is a terrible thing to say about anyone.",
          "Ruthless. And unfortunately sensible.",
          "Do not tell the bishop you said that. Tell me instead, in more detail.",
          "Ha! A merchant's prayer: Lord, send storms to my rivals.",
          "I shall pretend I did not hear it. I shall also arrive at those warehouses first.",
        ],
      },
      {
        text: "Tie myself to a palm tree and sing.",
        replies: [
          "Charming. Please do not sing near my residence. The roof is weak enough.",
          "That is more or less the plan of my own garrison, minus the singing.",
          "Ha! What would you sing? No, wait, let me guess. Something about rum.",
          "Strange, but I have heard worse hurricane plans from naval officers.",
          "If you survive, come and tell me the tune. I may need it for the next one.",
        ],
      },
    ],
  },
  {
    id: "schemer-35",
    text: "When the treasure fleet is late, the whole Caribbean holds its breath. When it is early, I start asking who knew and when.",
  },
  {
    id: "schemer-36",
    text: "Have you heard the latest from Europe, {title}?",
    answers: [
      {
        text: "No. Tell me.",
        replies: [
          "Hm. I would, but news is a currency and you have not paid.",
          "Louis XIII is ill again, or well again, depending on which courier you believe.",
          "The war in Germany drags on. Everyone is winning and nobody has any money left.",
          "Rumour says Portugal may slip from Spain's fingers. Remember I told you first.",
          "Something about a marriage, a treaty and a missing duke. I am still working out which is the cause.",
        ],
      },
      {
        text: "Yes. Old news, mostly.",
        replies: [
          "All news from Europe is old by the time it arrives. That is what makes it so safe to repeat.",
          "Old to you, perhaps. I prefer to hear it twice and compare the lies.",
          "Then you know more than my courier, who has apparently been drunk in {otherTown} for a month.",
          "Old news is the best. Everyone has stopped watching it.",
          "Good. Then tell me your version. I collect versions.",
        ],
      },
      {
        text: "I heard the moon is made of cheese. A Frenchman told me.",
        replies: [
          "A Frenchman. That explains a great deal. They claim credit for all cheese.",
          "Do not repeat that at court. They will tax it.",
          "If the moon is cheese, I am sure Richelieu has already claimed it.",
          "Ha! Better news than mine. Mine is all war and debt.",
          "I shall add the moon to my list of possible spies. It watches us every night, after all.",
        ],
      },
    ],
  },
  {
    id: "schemer-37",
    text: "The garrison in {town} is paid in promises, salt pork and occasional pieces of eight. Mostly promises. They are surprisingly cheap to print.",
  },
  {
    id: "schemer-38",
    text: "Answer quickly, {title}, without thinking. Who would you betray first: a friend, a rival or a governor?",
    answers: [
      {
        text: "A rival.",
        replies: [
          "Naturally. Rivals expect it. It is almost a courtesy.",
          "The safe answer. You did think, despite my request.",
          "Good. Remember which rival. I like to keep track.",
          "Sensible. Betraying friends is expensive and betraying governors is fatal.",
          "Ah, but in my world, rivals and friends are often the same person on different days.",
        ],
      },
      {
        text: "A governor.",
        replies: [
          "You said that to a governor. In his office. With the door closed. Fascinating.",
          "I shall assume you mean another governor. For your sake.",
          "Bold. Most men at least wait until I have left the room.",
          "Ha! Honest to the point of madness. I am almost touched.",
          "Noted. Underlined, actually.",
        ],
      },
      {
        text: "None of them. I betray only myself, usually at cards.",
        replies: [
          "Ha! A gambler. Your debts must be very well known in {otherTown}.",
          "At cards. Then you must never play with me. I never lose. I simply ensure the other man cannot win.",
          "Poetic. Not useful, but poetic.",
          "Self-betrayal is the cheapest kind. Ask any drunkard.",
          "A clever dodge. I shall let it pass, this once.",
        ],
      },
    ],
  },
  {
    id: "schemer-39",
    text: "I once ended a quarrel between two merchants simply by telling each that the other had already apologised. They still send me wine every Christmas.",
  },
  {
    id: "schemer-40",
    text: "Do you think the {enemyAdjective} have spies in {town}, {title}?",
    answers: [
      {
        text: "Probably. They have spies everywhere.",
        replies: [
          "Correct. One of them drinks with me every Sunday. We have an arrangement.",
          "Everywhere, yes. Some of them even wear wigs.",
          "Of course. I find it best to be very loyal, very loudly, very often.",
          "True. I keep a portrait of the governor on my desk. Not for admiration. For appearances.",
          "Yes, and they report to {enemyTown}. {enemyTown} reports to nobody. It is a dreadful system.",
        ],
      },
      {
        text: "No. Nobody would bother with {town}.",
        replies: [
          "Ha! Everybody bothers with {town}. That is why I never get any sleep.",
          "If you believe that, you are exactly the sort of man they hope to meet.",
          "Charming. And very insulting to my town.",
          "Even the {enemyAdjective} like the rum here. They come for the spying, they stay for the rum.",
          "Spoken like a man who has never been questioned. Lucky you.",
        ],
      },
      {
        text: "I am one. Surprise.",
        replies: [
          "Ha! Then you are the worst one I have met. They usually have better boots.",
          "Splendid. Then you can tell me what the others are saying.",
          "If you were, you would not tell me. Unless that is the cleverest bluff in the Caribbean.",
          "Do not joke about that, {title}. Some jokes end in very warm rooms.",
          "I knew it. Well, I did not, but I shall say I did.",
        ],
      },
    ],
  },
  {
    id: "schemer-41",
    text: "Barbados is turning from tobacco to sugar, they tell me. Mark my words, {title}, sugar will make some men very rich and many men very sorry.",
  },
  {
    id: "schemer-42",
    text: "Between ourselves, {title}, what do the sailors in the tavern say about me?",
    answers: [
      {
        text: "That you are wise and generous.",
        replies: [
          "Liar. A charming liar, but a liar. I know exactly what they say.",
          "Generous? They must be drunker than usual.",
          "How kind of you to lie. I appreciate the effort.",
          "If they said that, I would have them all arrested for suspicious behaviour.",
          "Wise and generous. I must stop paying my informants. They have clearly been replaced by poets.",
        ],
      },
      {
        text: "That you are a snake in a velvet coat.",
        replies: [
          "Velvet? How flattering. I thought it was brocade.",
          "Ah, the old line. It was better when I started it myself.",
          "Snake is unkind. I prefer to think of myself as a very patient eel.",
          "Excellent. A feared governor is a governor who is listened to.",
          "Ha! And yet they still come to me when their warehouses burn. Funny, that.",
        ],
      },
      {
        text: "Mostly that the rum is watered down.",
        replies: [
          "Well, that is not my doing. Entirely.",
          "The rum? That is the tavern's fault. My rum is never watered. My promises sometimes are.",
          "Interesting. So they do not talk about me at all? I am both relieved and offended.",
          "I shall look into it. Rum is a matter of state in a town like {town}.",
          "If they are complaining about rum and not about me, I am doing my job very well.",
        ],
      },
    ],
  },
  {
    id: "schemer-43",
    text: "Doubloons, guilders, livres, pieces of eight. Every coin in this office has a different king on it, and every king believes he owns me.",
  },
  {
    id: "schemer-44",
    text: "If {enemy} sent an envoy to {town} to talk peace, {title}, should I listen?",
    answers: [
      {
        text: "Yes. Peace would be good for trade.",
        replies: [
          "Trade, yes. Peace is very good for trade and very bad for the men who profit from war.",
          "Listen, yes. Believe, no. That is the art.",
          "I always listen. Listening costs nothing. Agreeing is where it gets expensive.",
          "Good. And while he talks, my men will search his luggage.",
          "A merchant's answer. You may be right. Do not tell the admirals I said so.",
        ],
      },
      {
        text: "No. Never trust {enemy}.",
        replies: [
          "Never? Sometimes they are telling the truth just to confuse us.",
          "A patriot. Good. Patriotism is very useful, especially in other people.",
          "I trust nobody, so {enemy} is in excellent company.",
          "Spoken like a soldier. A governor listens to everyone, then does what he wished anyway.",
          "True. Though I would still offer him wine. The good wine. Loosens the tongue.",
        ],
      },
      {
        text: "Listen, nod, then steal his hat.",
        replies: [
          "His hat? What would you do with an envoy's hat?",
          "Ha! There might be letters sewn into the lining. You are wiser than you look.",
          "I once stole an envoy's gloves. It ended a treaty. I shall not explain how.",
          "Petty, absurd and oddly appealing. Like most of diplomacy.",
          "Very well. You may steal the hat. I shall steal the envoy.",
        ],
      },
    ],
  },
  {
    id: "schemer-45",
    text: "Careening a ship is a little like governing, {title}. You turn everything on its side, scrape off the parasites and pray nobody attacks while you are helpless.",
  },
  {
    id: "schemer-46",
    text: "I have a favour to ask, {title}. Purely hypothetical. If I needed a letter delivered without anyone knowing, could I trust you?",
    answers: [
      {
        text: "Absolutely.",
        replies: [
          "Absolutely is a dangerous word. I hear it before most betrayals.",
          "Good. Hypothetically, of course. I would never ask such a thing. Out loud.",
          "I shall remember that. I remember everything, which is less charming than it sounds.",
          "Lovely. But tell me, can you also forget things on command?",
          "Splendid. I may never need you. Or I may need you tomorrow. That is the fun of it.",
        ],
      },
      {
        text: "Only if I can read it first.",
        replies: [
          "Ha! Honest at last. Very well, I would write it in a code you cannot read.",
          "Then I would give you a different letter. A decoy. With a decoy inside the decoy.",
          "I appreciate the candour. Most couriers read my letters without asking.",
          "Fair. Nothing travels unread in this world. Especially secrets.",
          "You are worse than my secretary. Which is to say, you would be very good at this.",
        ],
      },
      {
        text: "Is it a love letter? Tell me it is a love letter.",
        replies: [
          "A love letter. From me. How little you know me, {title}.",
          "Something like that. It is love for the crown, written in invisible ink.",
          "Ha! If I wrote love letters, I would have to hire spies to read them first.",
          "No. Though I have used love letters as cover before. Nobody searches them properly. They blush.",
          "Perhaps. Love and politics look very similar on paper. Both are full of lies.",
        ],
      },
    ],
  },
  {
    id: "schemer-47",
    text: "Scurvy on board, debts on shore and spies in every inn. Welcome to {town}, {title}. The view is lovely, at least.",
  },
  {
    id: "schemer-48",
    text: "If you were governor of {town} for a single day, {title}, what would you change?",
    answers: [
      {
        text: "Lower the taxes.",
        replies: [
          "Every man says that until he sees the bill for the garrison.",
          "Popular. Brief. You would be loved until the soldiers stopped being paid.",
          "Lower taxes, you say. And who would pay for the cats?",
          "Ha! The crown would replace you before sunset.",
          "A noble dream. I dreamt it myself once. Then I woke up and opened my ledgers.",
        ],
      },
      {
        text: "Hang every spy in town.",
        replies: [
          "Every one? Then who would I have supper with?",
          "Then the town would be very quiet and very empty.",
          "Ruthless. But you would hang half my staff, and then who would make the tea?",
          "And how would you know who they are? That is the real trick.",
          "Ha! You would have to start with me, probably.",
        ],
      },
      {
        text: "Replace your chair with a hammock.",
        replies: [
          "A hammock. In City hall. You might be onto something.",
          "Ha! I would never get up again. Which might improve government, frankly.",
          "Envoys would never take me seriously swaying gently in a hammock.",
          "Charming. Dangerous, though. A man in a hammock cannot run.",
          "The chair stays. It is the only thing in this room I trust.",
        ],
      },
    ],
  },
  {
    id: "schemer-49",
    text: "A word of advice, {title}. Never ask a governor what he really thinks. He will tell you, and it will be a lie, beautifully dressed.",
  },
  {
    id: "schemer-50",
    text: "Someone has been stealing tallow candles from City hall. A small matter, but small matters are where conspiracies begin. Who do you suspect?",
    answers: [
      {
        text: "One of your clerks.",
        replies: [
          "Probably. They do write their reports by candlelight, and I do not pay them for candles.",
          "That is what I thought. Then I realised all three clerks suspect each other. Lovely.",
          "Clerks. Of course. The quietest people steal the most.",
          "I shall have them watched. By the other clerks.",
          "Good guess. Though it might be the clerk who reports on the other clerks. Tricky.",
        ],
      },
      {
        text: "Spies of {enemy}, working in the dark.",
        replies: [
          "Ha! Working in the dark, and stealing candles to do it. Clever beggars.",
          "Possibly. Though spies normally steal more interesting things.",
          "I like it. A plot against the light itself. Very dramatic.",
          "{enemy} has done stranger things. They once stole our harbour bell.",
          "Hmm. I shall have to consider that. Seriously, which is the worrying part.",
        ],
      },
      {
        text: "The rats. They have formed a guild.",
        replies: [
          "A guild of rats? I always knew there was a guild somewhere in this building.",
          "Ha! If the rats have organised, they have done better than the merchants.",
          "Do not joke. I once caught a rat carrying a quill. Or I dreamt it. The fever was bad that week.",
          "I shall send the cats to negotiate.",
          "Rats with candles. That might explain the noises in the walls.",
        ],
      },
    ],
  },
  {
    id: "schemer-51",
    text: "The Eighty Years' War has taught the Spanish and the Dutch to hate each other with great patience. Patience is the only virtue I truly admire.",
  },
  {
    id: "schemer-52",
    text: "Honest question, {title}. Did anyone pay you to come and see me today?",
    answers: [
      {
        text: "No one. I came on my own.",
        replies: [
          "On your own. How unusual. Most visitors arrive with a purse and leave with less.",
          "Good. Then I shall be the first to make you an offer, one day.",
          "Interesting. Then you are either honest or poorly connected.",
          "Very well. I believe you, which is a rare gift. Do not waste it.",
          "Splendid. Then whatever you say next is your own fault entirely.",
        ],
      },
      {
        text: "Yes, but they paid very little.",
        replies: [
          "Then they undervalue you. I would never do that. I would merely underpay you quietly.",
          "Ha! Do give me their name. I want to know who is that cheap.",
          "A cheap spy is a careless spy. Thank you for warning me.",
          "Honest and underpaid. You are practically a member of my staff already.",
          "Fascinating. I shall make a note to outbid them, in a manner of speaking.",
        ],
      },
      {
        text: "My mother. She said I should make friends.",
        replies: [
          "Ha! Your mother is a wise woman. She should come to court.",
          "Friends? With a governor? Your mother has a sense of humour.",
          "Tell her you have made one. It will be a lie, but a kind one.",
          "I suspect your mother has her own spy network. All mothers do.",
          "Very well. I shall be your friend. Cautiously, at arm's length, and with a ledger.",
        ],
      },
    ],
  },
  {
    id: "schemer-53",
    text: "There are three ways to win a war, {title}. Ships, silver and secrets. {nation} has a few ships, very little silver, and me.",
  },
  {
    id: "schemer-54",
    text: "On saints' days the whole town goes to church, and I go to the empty warehouses to see who is not at church. You would be surprised what one learns.",
  },
  {
    id: "schemer-55",
    text: "The news from {enemyTown} reached me before your ship did, {title}. It always does. Do not ask how. Ask instead what else I know.",
  },
  {
    id: "schemer-56",
    text: "A pleasure, {title} {name}. Do come again. And when you leave, take the long way past the market. I would like to see who follows you.",
  },
]
