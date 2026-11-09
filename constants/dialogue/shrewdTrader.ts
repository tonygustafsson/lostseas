import "server-only"

export const SHREWD_TRADER: DialogueEntry[] = [
  {
    id: "shrewdTrader-1",
    text: "Sugar is up, tobacco is down and my patience is somewhere in between. Good day, {title}.",
  },
  {
    id: "shrewdTrader-2",
    text: "What brings you to {town}, {title}? And more to the point, what are you carrying?",
    answers: [
      {
        text: "A hold full of {merchandise}.",
        replies: [
          "Ah, {merchandise}. Everyone in {town} has a hold full of it this month. I could take it off your hands as a favour.",
          "Then you have my full attention, and my worst prices. We can discuss the difference.",
          "Is it dry? Last fellow swore his was dry. It sprouted in my warehouse.",
          "Good. Do not tell anyone else on the quay. Prices go down the moment a second captain mentions it.",
          "Splendid. I will pretend I do not want it, you pretend you are in no hurry, and we will both enjoy the afternoon.",
        ],
      },
      {
        text: "Nothing. I am just here for the view.",
        replies: [
          "The view is free. I find that suspicious, but it is free.",
          "An empty hold is a tragedy, {title}. I nearly wept just hearing it.",
          "Then you are the only person in {town} not trying to sell me something. Stay a while, it is restful.",
          "Pity. I had a price ready for you and everything.",
          "A captain with an empty ship and nothing to sell. Either you are very poor or very clever, and I cannot afford to guess which.",
        ],
      },
      {
        text: "Three crates of grudges and a parrot that owes me money.",
        replies: [
          "Grudges I can sell. The governor buys them by the barrel. The parrot I will need to see first.",
          "A parrot in debt? Charge him interest. Feathers, if he has no coin.",
          "I knew a parrot once who kept better books than the West India Company. Talked less, too.",
          "Grudges keep well in this climate. Better than salt pork, certainly.",
          "Bring me the parrot. If he speaks Spanish I can put him to work haggling in {enemyTown}.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-3",
    text: "A fair price is just a price where both men think they cheated the other. I sleep very well.",
  },
  {
    id: "shrewdTrader-4",
    text: "Barbados used to be all tobacco. Now they plant sugar from shore to shore. Do you know what that means for trade?",
    answers: [
      {
        text: "That sugar is the future?",
        replies: [
          "Sugar is the present, {title}. The future is whoever owns the mills and the ships to carry it.",
          "Correct, and by the time everyone knows it, the price will already have moved. That is the whole trick of trade.",
          "Spoken like a man who has never had his money in tobacco. Lucky you.",
          "Yes. And the future is very expensive to buy into. I should know, I have tried twice.",
          "Sugar is the future until the hurricane comes. Then nothing is the future for a while.",
        ],
      },
      {
        text: "No idea. Tell me.",
        replies: [
          "It means somebody gets rich and it is never the man who asked. But I like your honesty.",
          "It means Virginia leaf floods the market and Barbados leaf rots on the quay. Buy cheap, wait, pray.",
          "Advice costs money, {title}. That much I will give you free, as an advertisement.",
          "It means the Dutch will carry it, the English will tax it, and I will complain about both.",
          "It means you should stop asking questions in public. Prices move when people overhear.",
        ],
      },
      {
        text: "That I should take up farming and retire.",
        replies: [
          "Farming. Hah. You would last one season of flies and fevers before you came crawling back to sea.",
          "Retire? With what? Nobody in the Caribbean retires. They just stop being seen.",
          "Plant a field and you will find out what a real gamble looks like. The sea is honest by comparison.",
          "If you farm, sell to me first. I will give you a neighbourly price, which is lower than the usual one.",
          "Every sailor says that. I have never once bought sugar from a retired sailor.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-5",
    text: "Would you trust a man who quotes you a round number, {title}?",
    answers: [
      {
        text: "No. Round numbers hide something.",
        replies: [
          "Exactly. Round numbers are for priests and liars, and I am only half of one of those.",
          "Good. You have the instincts of a moneylender. Do not let it go to your head.",
          "Quite right. A real price has a few stivers dangling off the end, like barnacles.",
          "Nothing honest is ever exactly a hundred. Not even a hundred.",
          "You have been cheated before. It shows, and it suits you.",
        ],
      },
      {
        text: "Why not? Round numbers are easy to count.",
        replies: [
          "Easy to count, easy to cheat. That is why I love selling to people like you.",
          "Then you will enjoy my prices. They are all very round today.",
          "Counting is not the hard part, {title}. Knowing what to count is.",
          "Easy for you. Even easier for the man rounding them up.",
          "Spoken like a man who has never seen my ledger. Not one round number in it, and not one honest one either.",
        ],
      },
      {
        text: "I only trust triangular numbers.",
        replies: [
          "Triangular. Hah. I will have my clerk draw you one. It will cost a triangular sum.",
          "Is that a Dutch thing? It sounds like a Dutch thing.",
          "I once had a customer who only paid in odd numbers. He was odd too.",
          "Very well. Your price is six, ten or fifteen guilders. Pick a corner.",
          "That is the strangest thing anyone has said in {town} this week, and I sell to buccaneers.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-6",
    text: "Do you know who really runs this sea, {title}? Not kings. Not admirals. The West India Company and its ledger.",
  },
  {
    id: "shrewdTrader-7",
    text: "If I give you a good price, will you promise not to tell anyone?",
    answers: [
      {
        text: "On my honour.",
        replies: [
          "Your honour. Splendid. What is the exchange rate on that against the guilder?",
          "Honour is lovely, {title}. I would prefer a signature and a witness, but lovely.",
          "Good. Then I shall give you a price that is merely quite good, to be safe.",
          "Every captain says that, then tells the whole tavern by sundown. I have built it into the price.",
          "I believe you. That is my first mistake of the day and it is barely noon.",
        ],
      },
      {
        text: "I will tell everyone. Loudly.",
        replies: [
          "Then the price just got worse. Honesty has its costs.",
          "At least you are open about it. I respect that more than I would like to.",
          "Go ahead. Nobody in {town} will believe I gave a good price anyway. My reputation protects me.",
          "Shout all you like. By the time they arrive I will have changed my mind.",
          "Then I will tell everyone you paid double. We shall see whose story sells.",
        ],
      },
      {
        text: "What good price? I have yet to see one.",
        replies: [
          "A sharp tongue. Sharp tongues pay full price. Blunt ones pay double.",
          "You wound me. I am a fair man, according to my mother, who also bought from me at a markup.",
          "You have not seen one because you have not asked properly. Ask again, slower.",
          "The good prices are in the back. Behind the very good prices. Which do not exist.",
          "Fair. I have been hiding them. Old habits.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-8",
    text: "Piet Heyn took the whole silver fleet in '28 and the Company paid a dividend of fifty in the hundred. I still dream about that dividend.",
  },
  {
    id: "shrewdTrader-9",
    text: "Pieces of eight, doubloons, guilders, livres. Which do you carry, {title}?",
    answers: [
      {
        text: "Pieces of eight, mostly.",
        replies: [
          "Spanish silver. Everyone curses Spain and everyone wants her coins. Funny old world.",
          "Good. Silver speaks every language, even Dutch.",
          "Let me bite one. Not that I doubt you. I just enjoy it.",
          "Pieces of eight are honest coins, which is more than I can say for the men carrying them.",
          "Excellent. I will take them at a rate that favours me. That is the only honest thing I will tell you today.",
        ],
      },
      {
        text: "Whatever I took off the last ship.",
        replies: [
          "A mixed purse. Then you need a man who knows every rate. Lucky for you, I know them all, and they all favour me.",
          "Ah, a collector. I will sort them for you. A small fee per coin.",
          "Do not tell me where the last ship came from. It changes the rate.",
          "Mixed coin means mixed trouble. Pay me in the good ones first.",
          "That is the most common currency in the Caribbean, {title}. Somebody else's.",
        ],
      },
      {
        text: "Buttons. They look like coins in bad light.",
        replies: [
          "My shop has very good light. I paid extra for it, for exactly this reason.",
          "Buttons. I have had worse. A man once paid me in painted shells.",
          "I will take them, at one button to a thousandth of a guilder.",
          "Sew them back on, {title}. Your coat needs them more than I do.",
          "The sad thing is, I would still check every one of them.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-10",
    text: "Have you been to {otherTown} lately? What are they paying for {merchandise}?",
    answers: [
      {
        text: "Twice what you pay here.",
        replies: [
          "Twice? Then sail there, sell there, and pay their harbour dues, their bribes and their pirates. I will wait.",
          "Twice what I pay. Of course. Everything is twice as good somewhere else. Wives, weather, prices.",
          "If that were true, I would be in {otherTown} myself. I am not. Draw your own conclusions.",
          "You are lying, {title}, but you are lying well. I like that in a trading partner.",
          "Then their merchant is a fool or a thief. Possibly both. We should be careful of him.",
        ],
      },
      {
        text: "Half what you pay here.",
        replies: [
          "Half? Then why are you telling me? Never tell a merchant his price is good. It only makes him greedy.",
          "Then I am overpaying. Thank you for the information. My prices are now lower.",
          "Half. Hah. You are either very honest or very bad at this.",
          "Good to know. I shall send my cousin to buy there and sell here. You may have a small share. Very small.",
          "Half? The traders in {otherTown} must have had a bad month. I hope it lasts.",
        ],
      },
      {
        text: "They pay in compliments. I left with a hat full of them.",
        replies: [
          "Compliments do not keep in the heat. I have tried.",
          "Ah, the old compliment economy. Very popular, terrible exchange rate.",
          "I will give you three compliments for that hat, and that is my final offer.",
          "So that is why the merchants of {otherTown} never have any money. They give it all away in flattery.",
          "Compliments. Wonderful. Can I pay my harbour dues with them? No? Then they are worthless.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-11",
    text: "War between {nation} and {enemy} is wonderful for business. Not that I would ever say so out loud. Forget I spoke.",
  },
  {
    id: "shrewdTrader-12",
    text: "My father told me: buy when there is blood in the harbour, sell when there are bells in the church. He died rich and nobody went to his funeral.",
  },
  {
    id: "shrewdTrader-13",
    text: "Do you know why every deal you have ever made was a bad one, {title}?",
    answers: [
      {
        text: "Because I did not make it with you?",
        replies: [
          "Exactly. You are learning. Now we can begin.",
          "Flattery. Good. Flattery is how a deal starts. You are a natural.",
          "That is one theory. The other is that you are terrible at arithmetic.",
          "Correct, but do not think it earns you a discount.",
          "I like you, {title}. You understand the order of things. Me first, then you.",
        ],
      },
      {
        text: "My deals are excellent, thank you.",
        replies: [
          "Every man who says that has a cellar full of unsellable tallow.",
          "Excellent for whom? That is always the question.",
          "Then why are you talking to me? Men with excellent deals do not stand about on the quay.",
          "Good. Then you will not mind if I check your figures. No? Thought not.",
          "If your deals were excellent, you would own a ship that did not leak. I can hear it from here.",
        ],
      },
      {
        text: "Because I spend all my profit on fancy hats.",
        replies: [
          "Hats are an investment. People trust a man in a good hat. They are wrong to, but they do.",
          "There it is. I knew it was something. Hats, wine or women, it is always one of the three.",
          "Sell me the hat. I will rent it back to you on Sundays.",
          "A sensible vice. Hats do not get drunk or run off with the bosun.",
          "I spend all mine on locks. Everyone has their weakness.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-14",
    text: "Have you bought your provisions, {name}? Salt pork, ship's biscuit, lime juice?",
    answers: [
      {
        text: "Not yet.",
        replies: [
          "Then do it before you sail. The sea does not sell provisions and scurvy does not take credit.",
          "Not yet. Every captain who says that ends up eating his boots off {otherTown}.",
          "Do it here. My biscuit only has a few weevils, and they are very friendly.",
          "Hurry. The price goes up when a sail appears on the horizon. I am not saying why.",
          "Good. Then I can still sell them to you. Never buy provisions from the last port, {title}. Buy them from me.",
        ],
      },
      {
        text: "All loaded and paid for.",
        replies: [
          "Paid for? Where? Tell me it was not from my cousin. He waters the lime juice.",
          "A prepared captain. How rare. How very bad for business.",
          "Then you will live to trade another day. I approve, in a commercial sense.",
          "Good. Dead captains are terrible customers.",
          "Let me see the biscuit. If it bends, you were robbed.",
        ],
      },
      {
        text: "My crew lives on sea air and optimism.",
        replies: [
          "Optimism lasts about three weeks. Then they start eyeing the cook.",
          "Sea air is free, and I hate free things. Buy some pork.",
          "I knew a crew like that. Their ship is a reef now.",
          "Optimism does not stop teeth falling out, {title}. Limes do.",
          "Then I will sell you some optimism in barrels. It is called rum.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-15",
    text: "The Spanish flota sails with the whole wealth of Peru and Mexico, and Philip IV still borrows from the Genoese. Imagine owning a mountain of silver and dying in debt. I lie awake over it.",
  },
  {
    id: "shrewdTrader-16",
    text: "A captain came in last week offering me a fair deal. Fair, {title}. Can you imagine?",
    answers: [
      {
        text: "Did you take it?",
        replies: [
          "Of course not. A fair deal means one of us has not understood it, and I refuse to find out which.",
          "I took a week to think about it. By then the price had moved and it was no longer fair. Much better.",
          "No. I had the fellow followed instead. Nobody is fair without a reason.",
          "I countered with an unfair one. He accepted. Now I wonder what he knew.",
          "I took half of it. You never take all of a fair deal. That is how they get you.",
        ],
      },
      {
        text: "Maybe he was just an honest man.",
        replies: [
          "An honest man in the Caribbean. And I am the King of Spain.",
          "Honest men do not come to {town}. They stay home and get poor.",
          "Perhaps. I have heard of them. Like unicorns, or dry gunpowder.",
          "If he was honest, he will not last. I give him a season, two if the weather is kind.",
          "Then he is in more danger than I am. I almost feel sorry for him.",
        ],
      },
      {
        text: "That was me, in a false beard.",
        replies: [
          "I knew that beard was false. It was far too well kept for a sailor.",
          "Then I have been suspicious of you for a week without knowing it. Efficient.",
          "Hah. Then you owe me for the time I spent worrying.",
          "You made me a fair offer? You fool. You could have had me for less.",
          "Prove it. Put the beard back on and offer it again. I may have been hasty.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-17",
    text: "Tortuga is crawling with buccaneers who smoke beef and sell hides for nothing. Somebody ought to organise them. Somebody with a ledger.",
  },
  {
    id: "shrewdTrader-18",
    text: "Do you gamble, {title}?",
    answers: [
      {
        text: "Now and then. Dice, cards.",
        replies: [
          "I never gamble. I trade. The difference is that when I lose, I blame the weather.",
          "Dice. All that risk and not a single receipt. I could never.",
          "Gambling is trade without the ledger. Disgusting.",
          "Then you understand the market better than you think. It also cheats.",
          "Next time, bet on the price of {merchandise}. The odds are worse, but the company is better.",
        ],
      },
      {
        text: "Never. Too risky.",
        replies: [
          "Says a man who sails through hurricane season for a living.",
          "Too risky? You sail where the {enemyAdjective} hang men like washing. Brave choice of worry.",
          "Sensible. Leave the risk to me. I charge a fee for it.",
          "Good. Every coin not lost at dice is a coin that might find its way into my shop.",
          "I like you. You are dull, and dull men pay their debts.",
        ],
      },
      {
        text: "I once bet my ship on a crab race. And won.",
        replies: [
          "A crab race? Which crab? I may want to invest.",
          "You won a ship on a crab? Then the crab is the better captain.",
          "I have heard of stranger fortunes, but not many, and never with crabs.",
          "That is not gambling, that is shellfish speculation. Very modern.",
          "Did the loser pay? In {town} they would still be arguing about it.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-19",
    text: "Tell me honestly, {name}. Are you here to buy or to waste my afternoon?",
    answers: [
      {
        text: "To buy, of course.",
        replies: [
          "Music to my ears. Sour, cheap music, but music.",
          "Good. Then let me find the prices I keep for buyers. They are on the high shelf.",
          "Of course. Everyone is here to buy until they see the price.",
          "Wonderful. I will dust off my smile. It does not get much use.",
          "Then you are the best thing to happen to {town} since the last ship from {nationTown}.",
        ],
      },
      {
        text: "To sell, actually.",
        replies: [
          "Ah. Then you are wasting my afternoon, but in a way I can profit from.",
          "Sell? To me? Brave. Let us see what you have and how little I can offer.",
          "Everybody is selling and nobody is buying. That is why my prices are so low today.",
          "Then you will need patience. I take a long time to agree to anything that costs me money.",
          "Sell. Very well. Show me, and try not to look so hopeful. It hurts your price.",
        ],
      },
      {
        text: "To waste your afternoon. I am very good at it.",
        replies: [
          "Then I shall bill you for it. Half a guilder an hour, rounded up.",
          "At least you are honest. You may stay, but stand away from the goods.",
          "My afternoons are worth more than your ship, {title}. Waste it wisely.",
          "A man who admits to wasting time is a man with money to burn. Sit down. Let us talk.",
          "I wasted an afternoon once in '32. I still regret it. Go on, then, let us see if you can top that one.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-20",
    text: "Cardinal Richelieu runs France the way I run my shop. Everyone hates him and the accounts are in excellent order.",
  },
  {
    id: "shrewdTrader-21",
    text: "Last hurricane took my roof, my stock and my brother-in-law. I only miss the stock.",
  },
  {
    id: "shrewdTrader-22",
    text: "What do you think of the Dutch, {title}?",
    answers: [
      {
        text: "Fine sailors and finer traders.",
        replies: [
          "Exactly why I lock my doors when a Dutch ship comes in. Professional respect.",
          "Finer traders, yes. They would sell you the rope and charge you for the hanging.",
          "Agreed. I learned half of what I know from a Zeelander. The other half from being cheated by him.",
          "They carry everyone's goods for everyone's money. It is either genius or treason, depending on who you ask.",
          "Fine sailors. Finer bookkeepers. If I had a daughter I would marry her to a Dutch clerk.",
        ],
      },
      {
        text: "Cheese-mongers and penny-pinchers.",
        replies: [
          "Penny-pinchers? That is a compliment where I come from.",
          "Cheese built an empire, {title}. Show me what your hat ever built.",
          "Careful. They hold half the debts in the Caribbean, possibly yours.",
          "Penny-pinching is how they paid for a war against Spain that has lasted seventy years. Not bad for cheese.",
          "I would pinch pennies too if I had as many as they do.",
        ],
      },
      {
        text: "I only trust a nation that sells in round numbers.",
        replies: [
          "Then you trust nobody, and you are wiser than you look.",
          "Round numbers. Ha. The Dutch quote to the quarter stiver. I find it beautiful.",
          "There is no such nation. There is only my shop, on a good day, and today is not one.",
          "Round numbers are for priests and liars. I have said so before. I will charge you to hear it again.",
          "Then I hope you enjoy sailing alone. Every port in this sea counts in fractions.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-23",
    text: "The Company men in {nationTown} think they know the price of {merchandise}. They know the price they were told. That is not the same thing.",
  },
  {
    id: "shrewdTrader-24",
    text: "Portugal is restless under Spain, Catalonia is in open revolt, and Philip IV keeps asking for more silver. Bad times for kings, good times for anyone holding coin.",
  },
  {
    id: "shrewdTrader-25",
    text: "How much would you sell your ship for, {title}? Just curious.",
    answers: [
      {
        text: "She is not for sale.",
        replies: [
          "Everything is for sale. You simply have not heard the right number yet.",
          "Not for sale. Of course. Neither was my first warehouse, until it was.",
          "A romantic. Romantics always sell eventually, and always cheap.",
          "Good answer. Never sell the thing that carries your money. Unless the offer is very good.",
          "Not for sale today. I will ask again after the next storm.",
        ],
      },
      {
        text: "Make me an offer.",
        replies: [
          "Three barrels of tallow and a sincere handshake.",
          "I would never make the first offer. That is how amateurs lose their shirts.",
          "Ah, a negotiator. You first, I insist.",
          "My offer is that I do not mention the rot I can see from here. That is worth something.",
          "An offer? For a ship that size? I would need a week and a priest.",
        ],
      },
      {
        text: "One doubloon and your mother's recipe for fish stew.",
        replies: [
          "My mother never parted with that recipe. She took it to the grave and charged the gravedigger for the secret.",
          "The doubloon I can manage. The recipe is worth more than your ship.",
          "Done, except for the recipe, the doubloon and the ship. Shake on it?",
          "A man who knows the value of fish stew. Finally, someone with priorities.",
          "Ha. You are cheaper than I feared. I almost respect it.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-26",
    text: "What do you make of letters of marque, {title}?",
    answers: [
      {
        text: "Legal piracy.",
        replies: [
          "Just so. A contract to steal, with paperwork. I admire the paperwork.",
          "Legal piracy is the best kind. The pay is the same and the hanging is optional.",
          "Every king in Europe hands them out like sweets. Why should pirates have all the fun?",
          "Legal today, piracy tomorrow. It depends who wins the war.",
          "I would buy one if I could. Purely to frame.",
        ],
      },
      {
        text: "A fine way to serve the crown.",
        replies: [
          "Indeed. And the crown takes its share, so the crown is very grateful.",
          "Serving the crown and serving yourself at the same time. A rare bargain.",
          "Spoken like a man with a letter in his pocket. Does it say anything about {enemyAdjective} cargo?",
          "The crown is lucky to have you, and luckier to take a fifth.",
          "Of course. And what a coincidence that the crown's service pays so well.",
        ],
      },
      {
        text: "I wrote my own. It is very convincing.",
        replies: [
          "Let me see the seal. Hmm. Is that a potato?",
          "Forged papers. I know a man in {otherTown} who does better ones. Small fee.",
          "Convincing to whom? The {enemyAdjective} navy reads very carefully.",
          "I did not hear that. I hear very little when it is not profitable.",
          "Excellent. Then you can write me a receipt for the last three years.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-27",
    text: "Every time a ship comes from {enemyTown}, prices jump. Nothing scares a market quite like the enemy's goods arriving cheaper than ours.",
  },
  {
    id: "shrewdTrader-28",
    text: "Have you heard the rumour about plague in {otherTown}?",
    answers: [
      {
        text: "Is it true?",
        replies: [
          "True or not does not matter. It moves the price of vinegar either way.",
          "I have no idea. I started it to clear the market there. Do not repeat that.",
          "Possibly. I am buying their goods at half price until we know for certain.",
          "It is true enough that I have doubled the price of lime and garlic. Coincidence.",
          "Who can say. The sick do not write to the merchants who would profit from them.",
        ],
      },
      {
        text: "That is terrible news.",
        replies: [
          "Terrible, yes. Also terribly profitable for anyone selling candles to the churches.",
          "It is. Pray for them. Then buy vinegar before everyone else does.",
          "Terrible for them, and for their creditors. I am one of their creditors.",
          "Indeed. Have a moment of silence. A short one, the market is open.",
          "Very sad. I shall be selling mourning cloth at a respectful markup.",
        ],
      },
      {
        text: "I heard it was just a bad batch of fish stew.",
        replies: [
          "A bad batch of fish stew has toppled more towns than the Spanish army.",
          "Then whoever made it should be hanged and his recipe sold at auction.",
          "Ah. Well, that is worse for the price of fish and better for the price of everything else.",
          "Do not tell anyone. I have already bought all their vinegar.",
          "Fish stew. That explains why their cook came to me asking for lemons in bulk.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-29",
    text: "The Inquisition burns books, {title}. I would never burn a book. I would sell it back to the author.",
  },
  {
    id: "shrewdTrader-30",
    text: "Charles I and his Parliament are quarrelling over taxes again. Kings and merchants are alike in one way. Neither of us likes to be asked where the money went.",
  },
  {
    id: "shrewdTrader-31",
    text: "What do you do with your money, {title}?",
    answers: [
      {
        text: "I put it in the bank.",
        replies: [
          "Sensible, if dull. The bank pays you little and lends it out at a lot. I should have been a banker.",
          "The bank. Very wise. And who do you think the bank lends it to? Merchants like me.",
          "Then I hope you counted it twice before and twice after.",
          "Good. Money in a bank is money not being spent in my shop, which I resent, but I understand.",
          "Banks. Fine buildings, thick walls and thin interest.",
        ],
      },
      {
        text: "I spend it all on rum and regret.",
        replies: [
          "Rum I can sell you. Regret you will have to make yourself.",
          "A fine plan. Rum keeps sailors happy and merchants rich. Everyone wins except your liver.",
          "Then you are my favourite sort of customer, {title}. Welcome.",
          "Regret is cheaper wholesale. Buy it by the barrel next time.",
          "Hah. Just like my brother-in-law. Before the hurricane.",
        ],
      },
      {
        text: "I bury it on a beach and draw a map.",
        replies: [
          "Then I will pay good money for that map. Purely as a collector, of course.",
          "Sand does not pay interest, {title}. Neither does a crab sitting on your chest.",
          "The best place to hide money is in a merchant's ledger. Nobody ever finds it there, not even the merchant.",
          "Burying money. Very romantic. Very foolish. Which beach?",
          "I knew a man who did that. He forgot which island. Now he sells me coconuts.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-32",
    text: "How many sets of books do you think a merchant keeps, {title}?",
    answers: [
      {
        text: "One. Honest merchants need only one.",
        replies: [
          "How charming. I keep three. One for the governor, one for the priest, and one in my head.",
          "One. Ha. I have not laughed like that since the price of tallow doubled.",
          "Honest merchants need one set of books and a second trade to feed their family.",
          "If you ever meet an honest merchant, send him to me. I want to see one before I die.",
          "One set of books is very efficient. It also gets you hanged.",
        ],
      },
      {
        text: "Two. One for the taxman.",
        replies: [
          "Close. Two is for beginners.",
          "You are thinking like Cardinal Richelieu. He would want to see both.",
          "Two. One for him and one for you? And who keeps the one for your wife?",
          "That is the right idea, {title}. Your numbers are just too small.",
          "Two books, two prices, two faces. You will go far.",
        ],
      },
      {
        text: "None. I keep everything in a sock.",
        replies: [
          "A sock. The first bank in the Caribbean. And the smelliest.",
          "Never let a merchant see the sock. We can smell coin through wool.",
          "Better than the West India Company. At least your sock pays no dividends to Amsterdam.",
          "A sock is fine until laundry day. Then you are bankrupt.",
          "I respect the sock. It has never once asked for a loan.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-33",
    text: "The price of {merchandise} in {town} this {month} would make a bishop swear. Good for me, terrible for you.",
  },
  {
    id: "shrewdTrader-34",
    text: "If you were a merchant, {title}, what would you trade in?",
    answers: [
      {
        text: "Sugar. It is where the money is.",
        replies: [
          "Where the money is, yes. Also where every other fool is. Ask yourself why that worries me.",
          "Sugar needs mills, land, labour and ships. What you need is a fortune before you start.",
          "Good choice. Ten years ago you would have said tobacco and been ruined.",
          "Sugar is fine, if you enjoy hurricanes, fevers and Dutch middlemen.",
          "Then you will be my competitor. I will have to dislike you now.",
        ],
      },
      {
        text: "Information. Who sails where, with what.",
        replies: [
          "Now you are speaking my language. Information is the only cargo that does not rot.",
          "Careful. Men who trade in information tend to end up in it.",
          "Smart. I pay well for good information and badly for bad. You can guess which I usually get.",
          "That is the Dutch way, and look how rich they are.",
          "Information about the flota? Bring it to me and I will see you are well rewarded. In compliments.",
        ],
      },
      {
        text: "Sand. To the desert people.",
        replies: [
          "Hah. You would need very foolish desert people. I have met a few.",
          "Sand. It is free to dig and nobody buys it. A perfect market, except for the buying part.",
          "That is not stupid. That is just ahead of its time by about a thousand years.",
          "I once sold sand to a man who swore it was gold dust. He came back for more.",
          "If you can sell sand, {title}, you can sell anything. Come and work for me.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-35",
    text: "Louis XIII sends governors, Richelieu sends taxes and nobody sends money. That is the French colonial system in one sentence.",
  },
  {
    id: "shrewdTrader-36",
    text: "When do you think is the best time to buy a ship, {title}?",
    answers: [
      {
        text: "When she is careened.",
        replies: [
          "Exactly. Everyone can see her bottom and nobody can see her worth.",
          "You know your trade. A ship on her side cannot lie to you, though her owner can.",
          "Clever. Worms do not hide well in daylight.",
          "Spoken like a man who has been sold a leaky hull before.",
          "Careened is good. Careened and the owner in debt is better.",
        ],
      },
      {
        text: "When she is brand new.",
        replies: [
          "New ships cost new money. I only spend old money.",
          "Brand new is just old with a coat of paint and a higher price.",
          "A new ship has no history. That frightens me more than worms.",
          "Brand new? Then you pay for every plank, nail and shipwright's lunch.",
          "Of course. And while you are at it, buy her a new crew. They come with all their teeth.",
        ],
      },
      {
        text: "When the previous owner is still on it, screaming.",
        replies: [
          "That is not buying, {title}. That is a different trade, with different paperwork.",
          "Hah. Then the price is very low but the haggling is very loud.",
          "I prefer my sellers calm. Screaming drives the price up somehow.",
          "Did he at least leave the receipt?",
          "Keep that to yourself near the harbour master. He is very literal.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-37",
    text: "Do you trust me, {name}?",
    answers: [
      {
        text: "Yes, completely.",
        replies: [
          "Then you are a fool, and I will try not to take advantage. Too much.",
          "Completely? Nobody trusts me completely. Not even me.",
          "That is touching. It will also cost you.",
          "Good. Then you will not mind paying in advance.",
          "I will try to be worthy of that. I will fail, but I will try.",
        ],
      },
      {
        text: "Not as far as I can throw you.",
        replies: [
          "Good. A healthy mistrust is the basis of every lasting partnership.",
          "Very wise. I do not trust you either. Now we can do business.",
          "That is further than most people trust me. I am flattered.",
          "Excellent. Mistrust keeps both of us honest, or at least careful.",
          "I am heavier than I look, so that is not very far at all.",
        ],
      },
      {
        text: "I trust you more than I trust my first mate.",
        replies: [
          "That says more about your first mate than about me.",
          "Your first mate is a dangerous man then. Send him to me, I could use him.",
          "Well, at least I am not after your ship. Not today.",
          "Then pay your first mate less and buy more from me.",
          "Is your first mate for hire? I have uses for a man like that.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-38",
    text: "Scurvy costs a captain more than pirates. Pirates at least leave you the ship.",
  },
  {
    id: "shrewdTrader-39",
    text: "The best time to buy {merchandise} is when everyone in {nationTown} swears they will never touch it again.",
  },
  {
    id: "shrewdTrader-40",
    text: "Would you lend me a hundred pieces of eight, {title}? For a sure thing.",
    answers: [
      {
        text: "What is the sure thing?",
        replies: [
          "A shipment of {merchandise} that cannot possibly fail, unless it does.",
          "If I told you, you would invest yourself. That is why it is sure.",
          "A man in {otherTown} owes me. He has owed me for six years. This is the year.",
          "Tobacco. Do not laugh. Someone has to be the last man in tobacco, and he will be rich.",
          "That is the clever part. Nobody knows. Not even me.",
        ],
      },
      {
        text: "Absolutely not.",
        replies: [
          "Good. I was testing you. You passed. Also, I am short of money.",
          "Splendid. I would never lend to a man who lends to men like me.",
          "Wise. You would never have seen it again. I am glad we understand each other.",
          "Not even for a sure thing? You are harder than you look.",
          "I respect that. I would have said no too.",
        ],
      },
      {
        text: "Only if you pay me back in pickled herring.",
        replies: [
          "Done. At the herring rate of 1638, which was very favourable to me.",
          "Pickled herring. The Dutch would accept that as currency and they would be right.",
          "I can offer you smoked herring. Pickled is beyond my means this month.",
          "A man who wants herring is a man who has been at sea too long. Very well.",
          "Herring. Fine. But only the small ones. The big ones are worth more.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-41",
    text: "Tallow, {title}. Nobody gets rich on tallow, but nobody goes broke either. It is the dullest money in the world and I love it.",
  },
  {
    id: "shrewdTrader-42",
    text: "The Thirty Years' War has gone on so long that half of Europe has forgotten what started it. The other half is still selling gunpowder to both sides.",
  },
  {
    id: "shrewdTrader-43",
    text: "Have you ever been cheated, {title}?",
    answers: [
      {
        text: "Never.",
        replies: [
          "Then you have not noticed. That is the best kind of cheating.",
          "Never? Then you have never traded. Or you have never checked.",
          "That is what they all say until the scales are weighed again.",
          "Then I will try to be the first. As a gift.",
          "Never is a very large word for a man in this trade.",
        ],
      },
      {
        text: "Yes. By you, I suspect.",
        replies: [
          "Me? I am wounded. Show me the receipt.",
          "Possibly. I cheat so many people, I lose track. That is not a confession.",
          "If I cheated you, it was done with care and respect. You should be honoured.",
          "Then you have learned something valuable. Lessons cost money.",
          "Suspect all you like. Suspicion does not count as evidence in {town}.",
        ],
      },
      {
        text: "Once, by a goat. Long story.",
        replies: [
          "A goat? Was it a Dutch goat? They are very sharp.",
          "I have been cheated by goats. And by men who smelled like goats.",
          "Tell me the story. I will charge you for listening, but I will listen.",
          "The goat probably had better accounts than you.",
          "A goat cheated you? Then there is hope for any merchant in {town}.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-44",
    text: "So far in {year} I have bought low and sold high exactly once. Every other time I have bought high and sold low. My average is excellent.",
  },
  {
    id: "shrewdTrader-45",
    text: "A good merchant can tell a fake doubloon by the sound. A great merchant can tell a fake smile by the same method.",
  },
  {
    id: "shrewdTrader-46",
    text: "What do you think of {enemy}, {title}?",
    answers: [
      {
        text: "Enemies. Simple as that.",
        replies: [
          "Simple for you. For me they are also customers, through a third party, of course.",
          "Enemies in war, partners in trade. That is how the world turns.",
          "Simple. I wish my accounts were.",
          "Enemies. Yes. Also wealthy. It is complicated.",
          "Very patriotic. Patriotism is good for business, as long as the borders stay open.",
        ],
      },
      {
        text: "Good customers, if you hide the flag.",
        replies: [
          "Shh. Not so loud. The governor has ears in every barrel.",
          "Exactly. A flag is just a piece of cloth. Gold is gold.",
          "You understand trade, {title}. That makes you dangerous.",
          "I know nothing of such things. Nothing at all. What price?",
          "Hiding flags. I have a cupboard full of them. For decoration.",
        ],
      },
      {
        text: "Their bread is better than ours.",
        replies: [
          "Treason. Also true. Do not tell anyone.",
          "That is the most dangerous thing anyone has said in {town} today.",
          "Then smuggle me a loaf. Purely for research.",
          "Bread wins more hearts than cannon. They know it, we do not.",
          "Their bread, yes. Their prices, no. I would know.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-47",
    text: "Stadtholder Frederick Henry takes towns from the Spanish one siege at a time. I take customers from my rivals the same way. Slowly, with digging.",
  },
  {
    id: "shrewdTrader-48",
    text: "Every saint's day the church bells ring and the prices go up. I am not saying the saints are in on it. I am merely noticing.",
  },
  {
    id: "shrewdTrader-49",
    text: "If you could buy anything in the world, {title}, what would it be?",
    answers: [
      {
        text: "A faster ship.",
        replies: [
          "A faster ship gets you to the bad prices sooner. But I take your point.",
          "Speed is money. Ask any man who arrived second with a hold of rotting fruit.",
          "I know a shipwright in {nationTown}. He cheats less than most.",
          "Faster than what? Faster than the tax collector? There is no such ship.",
          "Good choice. The sea rewards the quick and drowns the slow.",
        ],
      },
      {
        text: "A share in the West India Company.",
        replies: [
          "Now you are thinking like a merchant. Expensive thinking, but merchant thinking.",
          "Shares go up and down. Mostly down since Piet Heyn died.",
          "I already own one. Very small. I polish it on Sundays.",
          "Good luck. The directors guard those like dragons guard eggs.",
          "A share? Buy two. Then you have someone to talk to at the meetings.",
        ],
      },
      {
        text: "Your whole shop, then sell it back to you.",
        replies: [
          "Ah, you have studied my methods. I am both proud and worried.",
          "My shop is not for sale. Except at a price. Which you cannot afford.",
          "You would lose money on the deal. I always do on purpose.",
          "Then I would buy it back at half and sell it to you again. We could do this all year.",
          "Clever. Very clever. I will be watching you, {title}.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-50",
    text: "A captain from {otherTown} tried to pay me in livres. I said I would accept them at the rate of one livre for one compliment. He left with neither.",
  },
  {
    id: "shrewdTrader-51",
    text: "Do you know what lasts longest at sea, {title}?",
    answers: [
      {
        text: "Ship's biscuit.",
        replies: [
          "Biscuit lasts a year, salt pork six months and a fair price about a minute and a half.",
          "Biscuit. Yes. Some of mine has outlasted two captains.",
          "Correct. It lasts so long because nobody can bite it.",
          "Biscuit, and the weevils inside. They are the true owners.",
          "Right. I once used one to patch a hull. Held for a week.",
        ],
      },
      {
        text: "A sailor's grudge.",
        replies: [
          "True. I knew a bosun who hated his captain for twenty years. They are business partners now.",
          "Grudges, yes. They do not rot, need no barrels and grow with every voyage.",
          "Very good. I have been holding one against the West India Company since '31.",
          "Grudges keep better than salt pork. Lighter too.",
          "Ha. If I could sell grudges by weight, I would be the richest man in {town}.",
        ],
      },
      {
        text: "My first mate's stories.",
        replies: [
          "Then cut him off at the third tale. I do the same with my wife's relatives.",
          "Long stories mean a long voyage. Charge him for the rations.",
          "Does he tell the one about the mermaid? They all have that one.",
          "At least stories are free. The only free thing at sea, besides drowning.",
          "I will buy those stories if they are about sunken treasure.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-52",
    text: "What brings you to my shop on such a fine {month} day, {title}?",
    answers: [
      {
        text: "I need supplies.",
        replies: [
          "Supplies. Of course. Prices are a little higher today. They always are when someone needs something.",
          "Then you have come to the right place, and the right man, at the wrong price.",
          "Let me guess. Biscuit, pork and enough rum to forget what you paid for them.",
          "Supplies keep a crew alive. Worth every coin, especially to me.",
          "Ah, a need. Needs are worth much more than wants.",
        ],
      },
      {
        text: "I wanted to see if you had any good deals.",
        replies: [
          "Good deals? In {town}? You are new here.",
          "I have good deals and great deals. The great ones are mine.",
          "The best deal I can offer is the one you walk away from.",
          "Today's good deal is that I am in a good mood. It will not last.",
          "Good deals are like mermaids. Sailors swear they have seen one.",
        ],
      },
      {
        text: "I was lost. Is this the church?",
        replies: [
          "No, but people pray here too. Mostly over their bills.",
          "The church is next door. They also take money, but they promise more in return.",
          "Close. I also hear confessions. Mostly about debts.",
          "Lost? Then you are the perfect customer. Stay, browse, panic.",
          "This is the church of commerce. Donations accepted.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-53",
    text: "I heard the {enemyAdjective} fleet lost two ships near {enemyTown}. Terrible news. I have already raised the price of timber.",
  },
  {
    id: "shrewdTrader-54",
    text: "If the West India Company ever makes an honest profit, I will close my shop and become a monk.",
  },
  {
    id: "shrewdTrader-55",
    text: "Did you hear what happened to the last captain who haggled with me?",
    answers: [
      {
        text: "No. What happened?",
        replies: [
          "He got a fair price. He has never forgiven himself.",
          "He won. I let him. He has been coming back ever since, paying full price out of loyalty.",
          "He went to {otherTown} and found it was worse there. Now he is my best customer.",
          "He took so long that the price changed twice. He paid more in the end.",
          "He married my niece. Now he haggles with her. Poor man.",
        ],
      },
      {
        text: "I do not want to know.",
        replies: [
          "Wise. Ignorance is cheaper than knowledge in this town.",
          "Nobody ever does. That is why they keep haggling.",
          "Very well, but your price just went up by the cost of the story.",
          "Then I will tell you anyway, but slowly, and charge you by the word.",
          "A man who avoids bad news avoids bad prices. Sometimes.",
        ],
      },
      {
        text: "He became a seagull. I have seen him.",
        replies: [
          "A seagull? That explains why something stole my fish yesterday.",
          "Hah. Then he still owes me. Seagulls are notorious debtors.",
          "If you see him, tell him the price of bread has gone up.",
          "A seagull. Finally a creature that haggles worse than you.",
          "Does he pay in feathers now? I could use some for my hat.",
        ],
      },
    ],
  },
  {
    id: "shrewdTrader-56",
    text: "Pleasure doing business, {title}. Or it will be, the moment you pay.",
  },
]
