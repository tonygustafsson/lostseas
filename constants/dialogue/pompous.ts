import "server-only"

export const POMPOUS: DialogueEntry[] = [
  {
    id: "pompous-1",
    text: "Ah, {title}. You may approach. Not that close. This lace came from Brussels and it has never once been breathed on by a sailor. What brings you before me?",
    answers: [
      {
        text: "Colony business, Your Excellency.",
        replies: [
          "Colony business. How refreshing. Most visitors only want to complain about the roads, as though I built them personally.",
          "Splendid. Put it in writing, in a fair hand, and my secretary will lose it in the proper order.",
          "Excellent. The colony is my one great passion, after my portrait, my correspondence and lunch.",
          "Very good. I shall give it the attention it deserves once I have finished this letter to the crown. It is on page forty.",
          "Business. Yes. I adore business, provided someone else does it.",
        ],
      },
      {
        text: "I came to admire the lace.",
        replies: [
          "At last, a person of discernment in {town}. Admire away, but do it from there.",
          "Flemish bobbin lace, {title}. Eleven nuns went partially blind making it. Worth every eye.",
          "You flatter me. Continue.",
          "A loyal subject. I shall remember your face, or at least the general shape of it.",
          "Few people notice. The harbourmaster called it 'that frilly bit'. He now manages the latrines.",
        ],
      },
      {
        text: "I'm lost. Is this the tavern?",
        replies: [
          "The tavern? This is the seat of royal authority in {town}! The tavern is the building with the sailor asleep outside.",
          "I shall pretend I did not hear that, for the sake of my digestion.",
          "How dare you. Although, between us, the wine here is worse.",
          "No. Though I understand the confusion, as both places are full of people asking me for money.",
          "Guards, show this person to the tavern. And then show them the inside of the stocks.",
        ],
      },
    ],
  },
  {
    id: "pompous-2",
    text: "I have written to the crown eleven times this year. They have answered once, to ask whether I am still alive. I took that as warm encouragement.",
  },
  {
    id: "pompous-3",
    text: "Tell me, {title}, what do the people of {town} say about their governor?",
    answers: [
      {
        text: "They speak of you constantly.",
        replies: [
          "Of course they do. I am the most interesting thing that has happened here since the hurricane.",
          "Constantly. Yes. Fondly, I presume?",
          "I knew it. I shall commission a second portrait to keep up with demand.",
          "Naturally. I give them so much to talk about. The new tax alone has occupied them for weeks.",
          "Write down the kind things. Leave out the rest. I have a delicate constitution.",
        ],
      },
      {
        text: "They mostly ask who you are.",
        replies: [
          "Who I am? I stand very near the throne! Four thousand miles away, but very near in spirit.",
          "That is ignorance, not insult. I shall have my name read aloud in the square on Sundays.",
          "Impossible. My portrait hangs in this very hall. Admittedly, the painter flattered my chin.",
          "They will learn. I am having a statue made. Small, at first.",
          "Clearly the town crier has been neglecting his duties again. He shall be fined, and then reminded who I am.",
        ],
      },
      {
        text: "They say you have lovely shoes.",
        replies: [
          "They do? Silver buckles, brought in by a smuggler I absolutely do not know.",
          "The people have taste after all. I had begun to despair.",
          "Finally, a political issue I can champion.",
          "The shoes thank them. I shall pass on the message.",
          "One does try to set an example. Somebody in this colony must wear a buckle.",
        ],
      },
    ],
  },
  {
    id: "pompous-4",
    text: "The war with {enemy} goes splendidly. I have it on good authority. My own, chiefly.",
  },
  {
    id: "pompous-5",
    text: "Do you have news from Europe, {title}? My last letters are four months old and smell of bilge.",
    answers: [
      {
        text: "The war in Germany is still going.",
        replies: [
          "Still? It has been more than twenty years. Somebody should tell them it is no longer fashionable.",
          "Dreadful business. Half the princes of Germany cannot remember which side they are on, and the other half have switched twice.",
          "I suspected as much. Wars in Europe are like my dinners, they go on far longer than anyone wanted.",
          "Then the crown will be too busy to read my letters. Again.",
          "Pity. I had placed a small wager on it being over by Michaelmas.",
        ],
      },
      {
        text: "There is trouble in Catalonia and Portugal.",
        replies: [
          "Rebellion in Catalonia? Philip IV must be beside himself. I do so enjoy another man's troubles.",
          "Portugal restless? Unrest in someone else's kingdom always makes my own colony look orderly.",
          "Hm. I shall write a stern letter about it. To whom, I have not decided.",
          "Catalonia. Yes. I have always found it a very argumentative place on maps.",
          "These are dangerous times. I have doubled the guard on my wine cellar.",
        ],
      },
      {
        text: "Your tailor sends his regards and his bill.",
        replies: [
          "My tailor is a liar and a genius, in that order.",
          "The bill can wait. Genius cannot be hurried, and neither can payment.",
          "Tell him the colony will pay. Then tell the colony.",
          "How did he find me? I sailed across an ocean for a reason.",
          "I do not owe that man a single coin. I owe him gratitude, which is free.",
        ],
      },
    ],
  },
  {
    id: "pompous-6",
    text: "{nation} expects every governor to send home a report each quarter. Mine run to ninety pages. The crown has never complained, which proves they read every word.",
  },
  {
    id: "pompous-7",
    text: "My portrait arrived from Europe last {month}. The painter made me look heroic. I have decided to become what the painting says I am.",
  },
  {
    id: "pompous-8",
    text: "{title}, are you loyal to the crown?",
    answers: [
      {
        text: "Utterly.",
        replies: [
          "Good. Loyalty is the second most important quality in a subject. The first is paying taxes.",
          "Wonderful. I shall mention you in my next letter, in a footnote, which is a great honour.",
          "As am I. I toast His Majesty every evening, sometimes several times.",
          "Splendid. Loyalty is cheap, which is why I value it so highly.",
          "Excellent. Say it louder near the window. The colonists need reminding.",
        ],
      },
      {
        text: "To whichever crown pays best.",
        replies: [
          "I shall pretend you said that in jest, as I pretend most things.",
          "Scandalous. And yet, honest. I do not know what to do with honesty, it so rarely visits.",
          "Guard! No, never mind, he has gone to lunch. Consider yourself fortunate.",
          "Do not say that aloud in {town}. The walls have ears, and the ears have cousins in {enemyTown}.",
          "Mercenary talk. I abhor it. What does {enemy} pay, out of curiosity?",
        ],
      },
      {
        text: "I'm loyal to my hat.",
        replies: [
          "A fine hat inspires loyalty. Mine has a feather from a bird nobody can identify.",
          "Then I hope your hat is loyal to {nation}.",
          "Absurd. And yet, I have known men loyal to worse.",
          "Your hat is welcome in City hall. You are tolerated.",
          "Remove it in my presence, and we shall see where your loyalties truly lie.",
        ],
      },
    ],
  },
  {
    id: "pompous-9",
    text: "Taxes are not a burden, they are a privilege. I remind the colonists of this whenever they throw things at my carriage.",
  },
  {
    id: "pompous-10",
    text: "The merchants of {town} complain about the duty on {merchandise}. What would you advise, {title}?",
    answers: [
      {
        text: "Lower it.",
        replies: [
          "Lower it? And fund my correspondence with what, prayers?",
          "Then the crown will ask why my revenues have fallen. I would have to explain trade to them, and I do not understand it either.",
          "Generous of you, with my money.",
          "Possibly. Though if I lower one duty, the others will become jealous.",
          "A thought. I shall consider it carefully, which is to say, never.",
        ],
      },
      {
        text: "Raise it.",
        replies: [
          "Ha! A person after my own heart and my own purse.",
          "Bold. The merchants will riot, but they riot so politely here.",
          "I like your thinking. Ruthless, short-sighted and profitable.",
          "Raise it, yes. And blame the crown. The crown is very far away and does not mind.",
          "They will smuggle more, of course. But the smugglers bribe me, so all is balanced.",
        ],
      },
      {
        text: "Ban it and sell it yourself.",
        replies: [
          "I am shocked. I am appalled. I am writing that down.",
          "That is precisely the sort of idea I would have, had I not been raised so well.",
          "The governor of {otherTown} tried that. He now lives on a very small island with one goat.",
          "Lower your voice. The chaplain is next door and he already suspects me of enjoying myself.",
          "Monstrous. Come back tomorrow, when my secretary is out.",
        ],
      },
    ],
  },
  {
    id: "pompous-11",
    text: "I am told there is fever in the lower town. I have ordered it to stop. We shall see whether it obeys.",
  },
  {
    id: "pompous-12",
    text: "Cardinal Richelieu writes his letters in cipher. I have started doing the same, so that nobody can read mine. Including, unfortunately, me.",
  },
  {
    id: "pompous-13",
    text: "Have you met the governor of {nationTown}, {title}?",
    answers: [
      {
        text: "Yes, a fine man.",
        replies: [
          "Fine? He wears last year's collars and calls it thrift.",
          "He is adequate. His dinners are cold and his conversation is colder.",
          "Fine is a generous word. He once seated me beside the dog.",
          "I suppose. If you admire a man who answers his own letters. Very common.",
          "We are the best of friends, in our letters. In person we prefer not to meet.",
        ],
      },
      {
        text: "No.",
        replies: [
          "You have not missed much. A dull man with a dull wig.",
          "Keep it that way. He talks about his gout as though it were a military campaign.",
          "Good. Should you meet him, tell him my portrait is larger.",
          "Fortunate. He would only try to recruit you to complain about me.",
          "A wise choice, whether you made it or not.",
        ],
      },
      {
        text: "He says your portrait is ugly.",
        replies: [
          "Ugly? The painter wept when he finished it. With joy, I assume.",
          "That man's portrait was painted by a fisherman. With a fish.",
          "I shall respond with a twelve-page letter. In my finest hand. He will be crushed.",
          "Envy. Pure envy. My frame alone cost more than his house.",
          "He said that? To you? The coward. He has only ever said it to my secretary.",
        ],
      },
    ],
  },
  {
    id: "pompous-14",
    text: "In Europe, a gentleman's worth is measured by his estates. Here it is measured by whether his roof survives the hurricane season. I have three roofs. Spares.",
  },
  {
    id: "pompous-15",
    text: "You look as though you have been at sea, {title}. Is it as dreadful as they say?",
    answers: [
      {
        text: "Worse. Scurvy, storms and ship's biscuit.",
        replies: [
          "Ship's biscuit. I tried it once. I wrote to my mother about it.",
          "How brave. I could never. I get seasick in the bath.",
          "Scurvy. Yes. I have heard that limes help. I keep one on my desk as a precaution.",
          "Then you have my sympathy, which is worth a great deal at court.",
          "Dreadful. I suffered similarly on my voyage out. The wine ran short by the third week.",
        ],
      },
      {
        text: "It's lovely. You should come aboard.",
        replies: [
          "Aboard? A ship? With sailors? I would need a great deal of lavender water.",
          "Kind, but my lace does not travel well. Neither do I.",
          "Perhaps one day, if the ship is anchored, and dry, and on land.",
          "My predecessor went aboard a ship once. We named a fort after him. A small one.",
          "I shall send my portrait in my place. It is a better sailor than me.",
        ],
      },
      {
        text: "I steer mostly with my feet.",
        replies: [
          "With your feet? How very rustic.",
          "I do not know what that means, and I insist you do not explain.",
          "That would explain the state of the harbour wall.",
          "Is that the custom in {playerNation}? Remarkable.",
          "Then do keep your boots off my carpet. It is Turkish. Or so I was told.",
        ],
      },
    ],
  },
  {
    id: "pompous-16",
    text: "The Dutch West India Company has more ships than some kingdoms. I have more forks than some kingdoms. We all have our strengths.",
  },
  {
    id: "pompous-17",
    text: "Somebody painted a moustache on my portrait in the night. I have doubled the guard on it. The guards have since grown moustaches. I suspect a conspiracy.",
  },
  {
    id: "pompous-18",
    text: "My secretary says I am out of touch with the colony. Am I, {title}?",
    answers: [
      {
        text: "Not at all, Excellency.",
        replies: [
          "Exactly what I told him. Then I had him copy out my reply eight times.",
          "Of course not. I know everything that happens in {town}. Somebody tells me eventually.",
          "I knew it. He is simply jealous of my view.",
          "Thank you. Your loyalty has been noted, on a small card, which I shall keep.",
          "Precisely. I walked through the market only last year.",
        ],
      },
      {
        text: "A little.",
        replies: [
          "A little? Nonsense. I read the reports, the ones with pictures.",
          "Then you must tell me what they eat down there. Is it still bread?",
          "Hm. Perhaps I could visit the harbour. In a litter. With a scarf over my nose.",
          "You speak frankly. I dislike it intensely, and I shall think about it later.",
          "Then I shall issue a proclamation declaring myself in touch.",
        ],
      },
      {
        text: "What colony?",
        replies: [
          "This one! Outside! The one with the mosquitoes!",
          "Do not be droll. Droll people end up governing very small islands.",
          "Very amusing. Although, from this window, I do sometimes wonder myself.",
          "I govern it, I assure you. I have the paperwork.",
          "Exactly what I feel some mornings. Then the petitions arrive.",
        ],
      },
    ],
  },
  {
    id: "pompous-19",
    text: "A good governor never shows fear. That is why I keep a man to show it for me.",
  },
  {
    id: "pompous-20",
    text: "When Piet Heyn took the Spanish silver fleet, every governor in the Indies doubled his guard. I tripled mine. I am that much more important.",
  },
  {
    id: "pompous-21",
    text: "Do you dance, {title}? I am planning a ball for the saint's day.",
    answers: [
      {
        text: "Beautifully.",
        replies: [
          "Splendid. You may stand at the edge and be admired, but not near me.",
          "Good. Most of the colony dances like a goat on a hot deck.",
          "We shall see. I will be watching from my raised chair.",
          "Then you may lead the second set. The first is reserved for me and my reflection.",
          "I shall need proof. There will be a trial dance on Tuesday.",
        ],
      },
      {
        text: "Only when drunk.",
        replies: [
          "Then you will dance a great deal. My punch is legendary and mostly rum.",
          "Like most of my guests. And all of my officers.",
          "Discretion, please. The chaplain will be present, and he takes notes.",
          "Acceptable. Nobody will be sober by the third toast to the crown.",
          "That is not dancing, {title}, that is falling with rhythm.",
        ],
      },
      {
        text: "I only dance the hornpipe.",
        replies: [
          "The hornpipe? At a governor's ball? Do you want to kill the visiting envoy?",
          "Barbaric. Show me later, in private, so I may disapprove properly.",
          "Absolutely not. The musicians came from the old country and they are very easily offended.",
          "There will be no hornpipes. There will be stately dances, and there will be dignity.",
          "My wife would faint. Then she would want to learn it.",
        ],
      },
    ],
  },
  {
    id: "pompous-22",
    text: "The colonists want a new well. I want a new portrait. We cannot both have what we want, and I have the seal.",
  },
  {
    id: "pompous-23",
    text: "His Majesty's last letter was addressed to my predecessor. I forgave the oversight. My predecessor has been dead three years, so he could hardly reply.",
  },
  {
    id: "pompous-24",
    text: "{enemyAdjective} privateers were seen off {town}. What would you do in my place, {title}?",
    answers: [
      {
        text: "Strengthen the fort.",
        replies: [
          "The fort. Yes. I shall write to the crown for funds. Expect the reply in the year of our Lord eternity.",
          "Practical. Dull, but practical. I shall have a plaque made for whoever does it.",
          "The fort has very good walls. Some of them reach all the way to the top.",
          "I have already ordered more cannon. They are coming with the next fleet. Or the one after.",
          "Sensible. Though the cannon spoil the view from my balcony.",
        ],
      },
      {
        text: "Hide under your desk.",
        replies: [
          "My desk is solid mahogany, I will have you know. Purely for that reason.",
          "I would never. My chair is closer.",
          "How dare you suggest it. That is the secretary's place.",
          "Cowardice is not in my blood. It is merely in my plans.",
          "A governor does not hide. He relocates to a safer room with better wine.",
        ],
      },
      {
        text: "Send them a strongly worded letter.",
        replies: [
          "Finally, a strategy I understand.",
          "I have drafted three already. The third one rhymes.",
          "Brilliant. Words are my cannon and my sentences are very long.",
          "Do you think they read? I had assumed privateers were mostly ears and teeth.",
          "Yes! And seal it with my largest seal. Let them feel the wax.",
        ],
      },
    ],
  },
  {
    id: "pompous-25",
    text: "I sent a gift of pineapples to court. By the time they arrived, they had become a gift of wasps. I am told His Majesty laughed. I am choosing to believe it was with me.",
  },
  {
    id: "pompous-26",
    text: "Order in {town} rests on three pillars: the church, the garrison and my good name. Two of those need repair.",
  },
  {
    id: "pompous-27",
    text: "What is your opinion of {enemyTown}, {title}?",
    answers: [
      {
        text: "A nest of scoundrels.",
        replies: [
          "Precisely. I have never been, but I can smell it from here.",
          "Well said. Write it on a banner and hang it facing the sea.",
          "Scoundrels, yes, and they eat with their hands. I have heard.",
          "My view exactly. Their governor wears his own hair. Unthinkable.",
          "A nest. Yes. And we shall one day kick it, from a very great distance.",
        ],
      },
      {
        text: "Lovely beaches.",
        replies: [
          "Beaches? You go to the enemy and look at the sand?",
          "Traitorous talk. Tell me more about these beaches.",
          "Our beaches are better. They are loyal beaches.",
          "I shall pretend you said fortifications.",
          "The sand there is inferior. Everybody knows that. It is enemy sand.",
        ],
      },
      {
        text: "Their governor sends his love.",
        replies: [
          "His love? He cannot. We are at war. Also he owes me a horse.",
          "Send it back. Unopened.",
          "That man writes to me every Michaelmas. I burn the letters, after reading them twice.",
          "Love! Typical {enemyAdjective} tactics. Soften you up with affection and then the cannon.",
          "Tell him I accept his love and return nothing.",
        ],
      },
    ],
  },
  {
    id: "pompous-28",
    text: "A colony is like a portrait. From a distance it looks magnificent. Up close, it is mostly varnish and flies.",
  },
  {
    id: "pompous-29",
    text: "I am told buccaneers roam the coast of Hispaniola. Have you dealt with such people, {title}?",
    answers: [
      {
        text: "Never.",
        replies: [
          "Good. They roast meat on sticks and ignore protocol. Animals.",
          "Keep it that way. They have no respect for a good wig.",
          "Wise. One cannot trust a man who smells of smoke and freedom.",
          "I am relieved. Do wipe your feet anyway.",
          "I believe you, about as much as I believe my own tax ledgers.",
        ],
      },
      {
        text: "I had lunch with some.",
        replies: [
          "Lunch? With buccaneers? What did they serve?",
          "And you survived? Did they at least use a napkin?",
          "Do not tell my secretary. He faints at the word.",
          "I suppose even savages must eat. Was the wine any good?",
          "I shall note that you have interesting friends, and that I do not wish to meet them.",
        ],
      },
      {
        text: "I am one, technically.",
        replies: [
          "Technically. That is a word lawyers use just before they bill me.",
          "Then stand further from my tapestries.",
          "I did not hear that. My ears are very selective, a gift from my mother.",
          "So long as you pay your harbour dues, you may be technically anything.",
          "Heavens. Would you care for a glass of wine? I find it calms the urge to plunder.",
        ],
      },
    ],
  },
  {
    id: "pompous-30",
    text: "I keep a ledger of every insult the colonists have sent me. It is now longer than the treasury ledger, and in better condition.",
  },
  {
    id: "pompous-31",
    text: "Under my governance, {town} has never been sacked. I have been told this is because nobody wanted it. I prefer my version.",
  },
  {
    id: "pompous-32",
    text: "Should I hang the man who sang a rude song about me in the square, {title}?",
    answers: [
      {
        text: "Yes, make an example of him.",
        replies: [
          "Hanging seems excessive. Perhaps a short spell in the stocks and a long lecture from me.",
          "An example, yes. Although the song was catchy. I hummed it at dinner.",
          "Hm. The chaplain says mercy is godly. The song says I have a face like a boiled turnip.",
          "Very well. But first, let him sing the second verse. I want to know what else they think.",
          "Firmness is wise. I shall fine him. Heavily. In instalments.",
        ],
      },
      {
        text: "Pardon him.",
        replies: [
          "Mercy. Yes. It makes a governor look magnificent, and costs nothing.",
          "Generous. Very well, but he must write a song in my praise. In tune.",
          "A pardon. Then all of {town} will love me. Possibly. Again.",
          "I shall pardon him on the next saint's day, with a speech. Two hours, at least.",
          "Pardon him, yes. And then commission him. The man clearly has talent.",
        ],
      },
      {
        text: "Sing it back at him.",
        replies: [
          "A governor singing in the square? Do you know what that does to authority?",
          "I have a passable tenor, as it happens. Wasted on this colony.",
          "Tempting. My reply would rhyme 'scoundrel' with 'roundel'. Devastating.",
          "Absurd. And I would win.",
          "I could, if my singing master were not in debtors' prison.",
        ],
      },
    ],
  },
  {
    id: "pompous-33",
    text: "Philip IV has a palace full of fine paintings. I have one portrait and a damp patch shaped like Sicily. We make do.",
  },
  {
    id: "pompous-34",
    text: "The colonists call me 'Your Excellency' to my face. Behind my back, they call me other things. I make them repeat both in front of the notary.",
  },
  {
    id: "pompous-35",
    text: "How do you find {town}, {title}?",
    answers: [
      {
        text: "Charming.",
        replies: [
          "Of course you do. I made it charming. I planted a hedge.",
          "Charming, yes, under my guidance. Before me it was merely damp.",
          "Thank you. I shall have that written on a sign at the docks.",
          "It is my masterpiece, after the portrait.",
          "Mention that in a letter to {nation}. They believe nothing that comes from me.",
        ],
      },
      {
        text: "Hot and full of mosquitoes.",
        replies: [
          "The mosquitoes are a gift of nature. And, I believe, a tax opportunity.",
          "Hot? This is a cool day. Last week my wig melted to the chair.",
          "The mosquitoes are worse in {otherTown}. That is my official position.",
          "I have written to the crown about the mosquitoes. No reply. Possibly the letter was eaten.",
          "Then you will appreciate my fan. Ostrich. Purely for governance.",
        ],
      },
      {
        text: "Smaller than I expected.",
        replies: [
          "Smaller? It is the very model of a colony!",
          "It looks larger from my balcony, if you squint and count the sea.",
          "Everything is small next to my ambitions.",
          "Size is not everything. Ask the governor of {otherTown}, he will lie to you.",
          "I shall have the maps redrawn. Generously.",
        ],
      },
    ],
  },
  {
    id: "pompous-36",
    text: "I insist upon protocol. When the hurricane came, I made it wait until I was properly announced.",
  },
  {
    id: "pompous-37",
    text: "The barrels of salt pork from Europe arrive marked 'for the colony'. By the time they reach my table they are marked 'for the governor'. Paperwork is a marvellous thing.",
  },
  {
    id: "pompous-38",
    text: "The chaplain complains I missed church on three saints' days running. Does it matter, {title}?",
    answers: [
      {
        text: "God sees everything.",
        replies: [
          "Everything? Even the second dessert? Oh dear.",
          "Then He will have seen how busy I was with my correspondence.",
          "I sincerely hope He also sees how much I have given to the roof fund.",
          "Then I shall attend on Sunday, in my best lace, so He has something to look at.",
          "That is precisely what the chaplain said, in a much more irritating voice.",
        ],
      },
      {
        text: "Not if you build him a new pulpit.",
        replies: [
          "A pulpit. Yes. Generous, visible and paid for by a tax on rum.",
          "You think like a courtier. I mean that as the highest compliment and the lowest insult.",
          "Brilliant. Holiness by carpentry.",
          "He did mention the old pulpit creaks. Mostly when he talks about me.",
          "Then I shall have my initials carved on it. Small. Tasteful. Gilded.",
        ],
      },
      {
        text: "Say you were praying in private.",
        replies: [
          "I was, in a sense. I prayed the soup would be hot.",
          "Private prayer. Yes. Very devout. Very hard to disprove.",
          "That is a lie of such quality I could almost forgive it in others.",
          "He will ask what I prayed for. I shall say 'patience with chaplains'.",
          "I like it. You have the makings of a diplomat, or a liar, which is the same profession in better clothes.",
        ],
      },
    ],
  },
  {
    id: "pompous-39",
    text: "My great ancestor fought at the side of a king. Admittedly, he was holding the king's horse. But he was beside it.",
  },
  {
    id: "pompous-40",
    text: "I sleep beneath a canopy embroidered with the arms of {nation}. Partly for loyalty, and partly because the roof leaks.",
  },
  {
    id: "pompous-41",
    text: "If you had my position for a day, {title}, what would you do first?",
    answers: [
      {
        text: "Lower taxes.",
        replies: [
          "And be beloved for a day and bankrupt for a year. Charming notion.",
          "Spoken like someone who has never had to buy a wig.",
          "The crown would recall me in a week. In chains, if I were lucky.",
          "A popular idea. That is exactly why governors never have it.",
          "Lower taxes, raise hopes, lose the colony. I have seen it done.",
        ],
      },
      {
        text: "Sell the portrait.",
        replies: [
          "Sell it? You might as well sell my soul. Though the frame is worth more.",
          "Never. That painting has outlived three governors' reputations.",
          "The very thought chills me. Guards, watch the portrait.",
          "Heresy. Of the artistic kind, which is the worst.",
          "You would get a fortune. And then a mob, for parting the colony from its finest sight.",
        ],
      },
      {
        text: "Take a nap.",
        replies: [
          "Exactly what I do after lunch. And before lunch. Governance is exhausting.",
          "Finally, someone who understands the burdens of office.",
          "A nap. Yes. Followed by a short rest and an early night.",
          "You speak as one who has seen my afternoon schedule.",
          "Wise. Most crises solve themselves if you sleep through them. Not the hurricanes.",
        ],
      },
    ],
  },
  {
    id: "pompous-42",
    text: "I am told the colonists are hungry. I have instructed my cook to eat more slowly, out of solidarity.",
  },
  {
    id: "pompous-43",
    text: "Back in Europe, a man in my position would have twenty servants. Here I have four, and one of them is a parrot that announces visitors. Badly.",
  },
  {
    id: "pompous-44",
    text: "Do you read, {title}? I have written a short history of my governorship.",
    answers: [
      {
        text: "Avidly.",
        replies: [
          "Then you are in for a treat. It is in six volumes. The short version.",
          "Splendid. Chapter one covers my arrival. It is two hundred pages.",
          "Excellent. I shall lend you a copy. Return it unwrinkled.",
          "A reader! How rare in {town}. Most people here use books to level tables.",
          "Good. You may begin with the appendix of my virtues.",
        ],
      },
      {
        text: "Only maps.",
        replies: [
          "Then I shall have it bound with a map. Of me.",
          "Maps are fine, but they lack a central heroic figure.",
          "Pity. There is a fold-out drawing of my hat.",
          "Maps lie as much as histories. Mine just lies more beautifully.",
          "Then you know how it feels to see a whole world reduced to one man's opinion. Mine.",
        ],
      },
      {
        text: "I'm waiting for the play.",
        replies: [
          "A play! Yes! With me played by a taller man.",
          "Do you think so? A tragedy, naturally, in five acts.",
          "I have already cast the villain. It is my secretary.",
          "There will be a play, and there will be songs, and the songs will be mandatory.",
          "The play would be banned in {enemyTown}, which would be the best review possible.",
        ],
      },
    ],
  },
  {
    id: "pompous-45",
    text: "The crown has asked me to reduce expenses. I have reduced the garrison's rations. My own I have kept, as a symbol of stability.",
  },
  {
    id: "pompous-46",
    text: "News reached me that King Charles quarrels with his Parliament. Imagine a ruler asking permission. I shudder.",
  },
  {
    id: "pompous-47",
    text: "My barber says the colonists are planning a petition against me. Is that true, {title}?",
    answers: [
      {
        text: "Yes, and it's long.",
        replies: [
          "Long? How long? Longer than my letters to the crown? Impossible.",
          "Then I shall answer it with a longer one. Nobody outwrites me.",
          "Who signed it? No, do not say. I want to guess at dinner.",
          "A petition. How quaint. I shall frame it next to my portrait, for contrast.",
          "Then I shall have to pretend to read it. I am excellent at that.",
        ],
      },
      {
        text: "No, they adore you.",
        replies: [
          "Of course they do. My barber is a gossip and a fool. But a good barber.",
          "I knew it. Adoration is so much easier to govern.",
          "Excellent. I shall put a duty on adoration.",
          "Then why did they burn an effigy of me last {month}? A tribute, I suppose.",
          "Wonderful. I shall have that confirmed in writing, by them, under oath.",
        ],
      },
      {
        text: "It's a petition for a bigger portrait.",
        replies: [
          "Truly? Then I shall grant it at once, at their expense.",
          "A bigger portrait. The people know what they need.",
          "I shall sign it myself. Twice.",
          "That is the first sensible petition this colony has ever sent.",
          "If that is a jest, I am choosing not to notice it.",
        ],
      },
    ],
  },
  {
    id: "pompous-48",
    text: "The treasure fleet sails, the hurricanes come, the colonists grumble and I write my letters. This is the natural order of things, and I am its keeper.",
  },
  {
    id: "pompous-49",
    text: "I received a letter from {nationTown} complaining about my handwriting. I replied in even more elaborate handwriting. They have not written back. Victory.",
  },
  {
    id: "pompous-50",
    text: "What is your opinion on duels, {title}?",
    answers: [
      {
        text: "A gentleman's privilege.",
        replies: [
          "Agreed. Though I always send my cousin. He has a longer arm.",
          "A privilege, yes. But very bad for the furniture.",
          "Only between men of rank. Commoners must settle their quarrels by complaining to me.",
          "I fought one once. My opponent tripped over my sword before I drew it. I count it as a win.",
          "Indeed. And I have the right to watch from a safe balcony.",
        ],
      },
      {
        text: "A waste of good blood.",
        replies: [
          "Sensible. Blood should be spent in service of the crown, and preferably other people's.",
          "I agree. Mine especially.",
          "There speaks a practical soul. Practical souls are rarely invited to court.",
          "Wise. I banned duels last year. Nobody noticed, which is the trouble with laws.",
          "Quite right. Better to settle matters with a lawsuit and ruin a man slowly.",
        ],
      },
      {
        text: "I once duelled a goat.",
        replies: [
          "A goat? Who won?",
          "I shall not ask. I shall merely wonder for the rest of my days.",
          "That explains the limp. And possibly the smell.",
          "Goats are cunning. The governor of {otherTown} once lost an argument to one.",
          "If the goat had a title, it was a matter of honour. Otherwise, it was farming.",
        ],
      },
    ],
  },
  {
    id: "pompous-51",
    text: "Somebody asked me to name the main export of {town}. I said complaints. They laughed. I was not joking.",
  },
  {
    id: "pompous-52",
    text: "When I arrived in {town}, the fort fired a salute in my honour. One of the guns exploded. I chose to take it as enthusiasm.",
  },
  {
    id: "pompous-53",
    text: "Tell me honestly, {title}. Does this wig make me look regal?",
    answers: [
      {
        text: "Like an emperor.",
        replies: [
          "An emperor. Yes. I have always suspected it.",
          "Thank you. Your eyes are as good as your manners, which is to say adequate.",
          "Do not tell the crown. Monarchs dislike competition.",
          "Perfect. I paid a fortune for it. Partly in sugar.",
          "I knew it. The barber said 'like a sheep', but he is a peasant.",
        ],
      },
      {
        text: "It looks a bit tired.",
        replies: [
          "Tired? It has crossed an ocean! It has every right to be tired.",
          "How dare you. And what would you suggest instead? Be specific.",
          "It is the damp. It wilts everything here, including my patience.",
          "Tired, perhaps, but noble. Like its wearer.",
          "Then I shall order another. The colony will pay, as the colony always does.",
        ],
      },
      {
        text: "Is that a wig? I thought it was a cat.",
        replies: [
          "A cat! It is the finest horsehair, powdered daily!",
          "If it were a cat, it would be the most loyal subject in the colony.",
          "Absurd. Though it did purr once. I put that down to the wind.",
          "Get out. No, stay. Then get out.",
          "I shall ignore that, magnificently.",
        ],
      },
    ],
  },
  {
    id: "pompous-54",
    text: "Some say a governor should know the names of his colonists. I disagree. It is far better that they know mine.",
  },
  {
    id: "pompous-55",
    text: "Do you think {nation} will win the war with {enemy}, {title}?",
    answers: [
      {
        text: "Certainly.",
        replies: [
          "Of course. We have the finest officers, the strongest ships and, above all, me.",
          "Correct. I have already written my victory speech. It is twenty pages and mentions me eleven times.",
          "Naturally. I have never doubted it, except at night.",
          "Splendid. Say so in the tavern. Morale is cheaper than cannon.",
          "Of course. And when we do, I shall commission a painting of myself winning it.",
        ],
      },
      {
        text: "Depends on the weather.",
        replies: [
          "The weather? A war is not a picnic, {title}. Well. It sometimes is, for the officers.",
          "Sadly true. Hurricanes do not care for treaties.",
          "Then I shall write to the weather. No, that is absurd. I shall write to the chaplain.",
          "There is wisdom in that. Half the {enemyAdjective} squadron sank in a storm last year. I claim the credit.",
          "True. And on the price of powder, which I have personally tripled.",
        ],
      },
      {
        text: "I wasn't aware there was a war.",
        replies: [
          "Not aware? There are cannon on the walls! Pointing out!",
          "Remarkable. You must be the happiest person in {town}.",
          "Lucky you. I have to write about it every week.",
          "Perhaps the war is not aware of you either. Let us keep it that way.",
          "I shall have a notice nailed to your mast.",
        ],
      },
    ],
  },
  {
    id: "pompous-56",
    text: "Visitors to City hall usually bring a gift, {title}. It is protocol. Have you brought one?",
    answers: [
      {
        text: "My charming company.",
        replies: [
          "Charming. Yes. I shall assess the charm and let you know of any shortfall.",
          "I have a cupboard full of charming company. None of it pays duty.",
          "How economical of you.",
          "Company is the gift of the poor. I accept it graciously, and with visible disappointment.",
          "Very well. Stand in better light so I may enjoy it.",
        ],
      },
      {
        text: "A barrel of rum.",
        replies: [
          "Rum. Strictly for the garrison's morale. And mine.",
          "A thoughtful gift. Is it the good rum, or the rum that makes sailors propose to mermaids?",
          "Leave it by the door. My secretary will count it, and drink the difference.",
          "Protocol is satisfied. My liver less so.",
          "Splendid. You have the instincts of a courtier and the smell of a distillery.",
        ],
      },
      {
        text: "A rock I found. It looks like you.",
        replies: [
          "A rock. That looks like me. Let me see. Hm. It has my nose.",
          "I shall place it beside the portrait. One of them will win.",
          "Is that an insult or a sculpture? I truly cannot tell.",
          "Absurd. Though I admit the jaw is noble.",
          "I accept it on behalf of {nation}. Never bring me another.",
        ],
      },
    ],
  },
  {
    id: "pompous-57",
    text: "Which do you prefer, {title}, pieces of eight or doubloons?",
    answers: [
      {
        text: "Pieces of eight.",
        replies: [
          "Sensible. Easier to cut, easier to spend, easier to tax.",
          "A practical answer. I prefer them too, in large piles.",
          "Silver is honest. Unlike the men who carry it.",
          "Good. The colony runs on pieces of eight and patience. I have only the former.",
          "Every piece of eight bears a little portrait of a king. I find that inspiring.",
        ],
      },
      {
        text: "Doubloons.",
        replies: [
          "Gold. A person of quality.",
          "Doubloons, yes. They clink with authority.",
          "Ambitious. Keep them hidden in {town}, the walls are thin.",
          "My preference also. I keep a few in my shoe for emergencies, which explains my posture.",
          "Gold suits you. It suits everyone. That is the whole point of it.",
        ],
      },
      {
        text: "Whichever you're offering.",
        replies: [
          "I am offering nothing. I am governing.",
          "Ha! Bold. Wrong, but bold.",
          "The treasury is closed. It has been closed since I arrived.",
          "I admire your hope. It is very colonial.",
          "Nobody leaves City hall with more money than they brought. It is tradition.",
        ],
      },
    ],
  },
  {
    id: "pompous-58",
    text: "A ship from {nationTown} brought rumours of plague in Europe. Should I close the harbour, {title}?",
    answers: [
      {
        text: "Yes, at once.",
        replies: [
          "Decisive. I like decisive, as long as somebody else takes the blame.",
          "The merchants will scream. I shall listen from behind a very thick door.",
          "Closing the harbour also stops my wine arriving. This is a true sacrifice.",
          "Prudent. I shall announce it with a trumpet. Two trumpets, it is serious.",
          "Then {town} will be safe, and very bored.",
        ],
      },
      {
        text: "Rumours are just rumours.",
        replies: [
          "True. If I closed the harbour for every rumour, nobody would ever hear how wise I am.",
          "You are probably right. But I shall sleep with a vinegar-soaked cloth anyway.",
          "A calm mind. I envy it. Mine is full of correspondence.",
          "Then we shall carry on, bravely, and with the windows shut.",
          "Quite. Last year a rumour said I had died. I attended the service myself to check.",
        ],
      },
      {
        text: "Close it only to people you dislike.",
        replies: [
          "Selective quarantine. Brilliant. My secretary would be stranded in the bay.",
          "That would leave the harbour almost empty. Very tempting.",
          "I like this idea more than I should.",
          "And my creditors? Could they be quarantined indefinitely?",
          "Wicked, {title}. Practical, but wicked.",
        ],
      },
    ],
  },
  {
    id: "pompous-59",
    text: "Planters everywhere are turning from tobacco to sugar, they say. Should {town} follow, {title}?",
    answers: [
      {
        text: "Sugar is the future.",
        replies: [
          "The future. Yes. I shall be in it, wealthier.",
          "Sugar. Everybody will want it. Even the crown has a sweet tooth.",
          "Then I shall tax it before anybody grows any.",
          "Bold. Sugar needs mills, labour and money, and I have only opinions.",
          "I shall write to Europe about it. In a very sweet tone.",
        ],
      },
      {
        text: "Stick to tobacco.",
        replies: [
          "Cautious. I approve of caution, it has kept me alive and in office.",
          "Tobacco it is. I enjoy a pipe after signing things.",
          "Tobacco has served us well. It also hides the smell of the harbour.",
          "Agreed. Change is for people who are not already in charge.",
          "Very wise. Sugar planters are dreadful bores at dinner.",
        ],
      },
      {
        text: "Grow powdered wigs.",
        replies: [
          "Wigs do not grow, {title}. Do they? I shall ask the apothecary.",
          "If they did, I would be the richest man in the Indies.",
          "Absurd. Though I would plant a field of them at once.",
          "A wig plantation. The crown would never believe it.",
          "I shall consider it a joke, and also write it down, in case.",
        ],
      },
    ],
  },
  {
    id: "pompous-60",
    text: "Are you married, {title}? My wife says I spend too much time with my portrait.",
    answers: [
      {
        text: "Yes.",
        replies: [
          "Then you understand. A spouse is like the crown, distant when you need it and present when you do not.",
          "Condolences. Congratulations. I never know which to say.",
          "Does your spouse also complain about your lace? No? Then you have married well.",
          "Good. Marriage builds character, chiefly patience.",
          "Then tell me, how does one win an argument? I have been trying for twelve years.",
        ],
      },
      {
        text: "No, I'm married to the sea.",
        replies: [
          "The sea? A cold and unfaithful bride. Mine is merely cold.",
          "Romantic. And very convenient at Christmas.",
          "The sea takes sailors and gives nothing back. My wife is similar, but has better jewellery.",
          "Then you will never have to sit through a dinner with her relatives.",
          "Charming. My wife would say I am married to the portrait.",
        ],
      },
      {
        text: "Your portrait is better company.",
        replies: [
          "Never say that where she can hear. Although, between us.",
          "It does not interrupt me, true.",
          "It agrees with everything I say. That is the foundation of any good partnership.",
          "Scandalous. And accurate. I shall never forgive you.",
          "Do not encourage me. I already wish it goodnight.",
        ],
      },
    ],
  },
  {
    id: "pompous-61",
    text: "The garrison asks for more pay. What do soldiers spend their money on, {title}?",
    answers: [
      {
        text: "Rum.",
        replies: [
          "Rum. Yes. So their pay comes back to me as duty. Ingenious.",
          "Then a raise is simply a gift to the tavern keepers.",
          "I suspected it. My cook gave me the same answer.",
          "Rum and dice, I imagine. And more rum to forget the dice.",
          "Then I shall pay them in rum directly and save everyone the trouble.",
        ],
      },
      {
        text: "Food, mostly.",
        replies: [
          "Food? Do they not get salt pork and biscuit? What more could a man desire?",
          "Remarkable. I assumed they ate on the crown's account, like me.",
          "Hm. Perhaps I should visit the barracks. Downwind.",
          "Food. How very practical. I shall consider the matter after supper.",
          "If they are hungry they should eat less. That is what I tell myself on fast days.",
        ],
      },
      {
        text: "Hats nicer than yours.",
        replies: [
          "Impossible. No hat in {town} is nicer than mine.",
          "Then their pay must be cut. At once.",
          "I shall inspect the garrison's hats personally. With a ruler.",
          "Treason, in felt form.",
          "Let them try. My hatter once charged a duke so much the duke challenged him to a duel.",
        ],
      },
    ],
  },
  {
    id: "pompous-62",
    text: "A bird nested in my best wig last night, {title}. Is that a good omen?",
    answers: [
      {
        text: "Very good. It means prosperity.",
        replies: [
          "Prosperity. I knew it. The bird is a loyal subject.",
          "Then I shall wear the wig with the bird in it. For luck.",
          "I shall have the omen recorded and sent to court.",
          "Splendid. Better than the last omen. A goat ate my proclamation.",
          "Prosperity, at last. I shall tax it at once.",
        ],
      },
      {
        text: "It means the wig is a nest.",
        replies: [
          "It is not a nest. It is a wig with ambitions.",
          "How dare you. It is the finest wig west of the Azores.",
          "The bird disagrees with you, and so do I.",
          "Cruel. Correct, perhaps, but cruel.",
          "I prefer to believe the bird simply has good taste.",
        ],
      },
      {
        text: "It means you should wear a hat.",
        replies: [
          "A hat over a wig? Do you take me for a farmer?",
          "That is not an omen, that is advice. I dislike advice.",
          "Perhaps. Over the wig, beneath a canopy, behind a guard.",
          "Hats are for the weather. Wigs are for history.",
          "I shall consult the chaplain. He knows about birds. And hats.",
        ],
      },
    ],
  },
  {
    id: "pompous-63",
    text: "Do you play cards, {title}? The officers here refuse to play with me any more.",
    answers: [
      {
        text: "Why do they refuse?",
        replies: [
          "I have no idea. I win almost every hand. They should be grateful to lose to a governor.",
          "Some nonsense about changing the rules when I lose. I am the governor, I make the rules.",
          "They claim my secretary signals my cards. He is merely waving at flies.",
          "Jealousy, I presume.",
          "Something about debts. As if a governor pays debts at cards.",
        ],
      },
      {
        text: "I play, but I cheat.",
        replies: [
          "Ha! Then you would fit in at court perfectly.",
          "Then we would be evenly matched.",
          "Honesty about dishonesty. It is almost noble.",
          "I shall have you watched. By the officers, they are very motivated.",
          "Then we shall play for the honour of {nation}, and I shall cheat better.",
        ],
      },
      {
        text: "Only with fish.",
        replies: [
          "With fish? Who deals?",
          "I do not understand you, and I find that restful.",
          "Fish are poor players. They cannot hold the cards.",
          "Sailors. Every one of you is quite mad.",
          "Then you should play against my officers. The resemblance is striking.",
        ],
      },
    ],
  },
  {
    id: "pompous-64",
    text: "Did you see the new fountain in the square, {title}? I had it built in my own likeness.",
    answers: [
      {
        text: "It's magnificent.",
        replies: [
          "It is. The water comes from my mouth, as do all good things in {town}.",
          "Thank you. The sculptor wanted it smaller. He now carves gravestones.",
          "Magnificent, yes. Go back and admire it properly. Take your time.",
          "I visit it at dawn. Purely to check the plumbing.",
          "The colonists wash their laundry in it. I take that as worship.",
        ],
      },
      {
        text: "I didn't notice it.",
        replies: [
          "Didn't notice? It is taller than a horse! It spits!",
          "Then you must go back and notice it at once.",
          "This town has eyes for nothing but its own troubles.",
          "I shall have a sign put up. With an arrow. And my name.",
          "Remarkable. I shall add 'unobservant' to my notes on you.",
        ],
      },
      {
        text: "Pigeons seem to love it.",
        replies: [
          "Pigeons. Yes. The pigeons have always been my supporters.",
          "They are not loving it, they are defacing it. There is a difference.",
          "I appointed a boy to chase them off. He has given up.",
          "Even birds recognise authority. They choose to perch on it.",
          "Do not mention pigeons. It is a sore subject and a sore statue.",
        ],
      },
    ],
  },
]
