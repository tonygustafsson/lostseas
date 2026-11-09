import "server-only"

export const BRAGGART: DialogueEntry[] = [
  {
    id: "braggart-1",
    text: "Did I ever tell you how I fought an entire war fleet out of {enemy}? Alone. In a rowing boat. With a spoon, {title}, because my cutlass was at the smith's.",
  },
  {
    id: "braggart-2",
    text: "You have the look of someone who has heard of me. Have you heard of me, {title}?",
    answers: [
      {
        text: "Of course. Everyone in {otherTown} speaks of you.",
        replies: [
          "I knew it! Was it the shark story or the one with the three frigates from {enemy}? Never mind, both are true.",
          "Naturally. I left quite an impression there. Also a small debt, but mostly an impression.",
          "They speak of me in {otherTown}? Good. I was worried they had moved on to the man with the dancing goat.",
          "Ha! And do they say I am taller in person? Because I am. Usually. On a good day, with my boots on.",
          "Splendid. I shall double my prices there. Fame is a cargo like any other.",
        ],
      },
      {
        text: "No. Who are you again?",
        replies: [
          "Who am I? Who am I? I am the man who... well, it was very dark that night, but trust me, it was heroic.",
          "You wound me, {title}. Deeper than the pike from {enemy} that bounced off my ribs in '32.",
          "A newcomer, then. Sit down. This will take about three hours and two jugs of rum.",
          "Odd. My name is carved on a tree in Hispaniola. Admittedly I carved it, but still.",
          "No matter. By tomorrow you will have heard of me, because I intend to tell you everything.",
        ],
      },
      {
        text: "Yes. You are the man who fell off the jetty last week.",
        replies: [
          "Fell? I dived. To rescue a drowning... hat. It was a very important hat.",
          "That was a tactical descent, {title}. I was inspecting the pilings for saboteurs from {enemy}.",
          "Lies spread by jealous men. Also by the harbour master, the fishwife and both of her sons.",
          "One small slip and suddenly that is all anyone remembers. Not the shark, not the treasure fleet. The jetty.",
          "I was testing the water temperature. Somebody has to, and nobody else has the courage.",
        ],
      },
    ],
  },
  {
    id: "braggart-3",
    text: "I once wrestled a shark off {otherTown}. It was this big. No, bigger. Let me stand on the table.",
  },
  {
    id: "braggart-4",
    text: "Between you and me, Piet Heyn only took the silver fleet in '28 because I had already softened them up. Do you believe me?",
    answers: [
      {
        text: "Every word.",
        replies: [
          "A person of rare judgement! I like you. You may buy me a drink.",
          "Good. The Dutch West India Company refuses to pay me my share. Bureaucrats, the lot of them.",
          "Piet was a fine fellow. A bit slow. I had to point out which ships were full of silver.",
          "He sent me a letter of thanks once. I used it to light my pipe, which I now regret.",
          "Ah, a true believer. There are so few of you left. Mostly just you, in fact.",
        ],
      },
      {
        text: "Where were you on the day, exactly?",
        replies: [
          "Exactly? Well. Near. In the general region of Cuba. Within a fortnight's sail.",
          "On a ship. A different ship. Behind a cloud. Look, it was a busy day for everyone.",
          "That is a very specific question and I resent it, {title}.",
          "Matanzas Bay, obviously. Or was it... no, it was definitely somewhere with water.",
          "I was in the hold, softening up the silver. It is very technical, you would not understand.",
        ],
      },
      {
        text: "You would have been about nine years old.",
        replies: [
          "I was a very tall nine. And a very angry one.",
          "Age is no barrier to heroism! I could tie a bowline before I could walk.",
          "Ah. Hm. I may be thinking of a different silver fleet. There are so many.",
          "Mathematics was never my weapon, {title}. The cutlass was. And the spoon.",
          "I was cabin boy. A legendary cabin boy. The biscuits I served that day were magnificent.",
        ],
      },
    ],
  },
  {
    id: "braggart-5",
    text: "Cardinal Richelieu wrote to me personally, you know. He asked me to stop writing to him. A man does not ask that of a nobody.",
  },
  {
    id: "braggart-6",
    text: "They nearly knighted me in {year}, {title}. Would you like to know why it did not happen?",
    answers: [
      {
        text: "Please, tell me.",
        replies: [
          "The king was kneeling to tie his shoe, I thought it was my turn, and there was a misunderstanding with the sword.",
          "A rival spread a rumour that I had never been to London. Which is true, but it was still rude.",
          "The ceremony was set for a saint's day and I was busy rescuing a nun from pirates. Or the nun rescued me. Details.",
          "Parliament got involved. Everything gets complicated once Parliament gets involved.",
          "I turned it down. Too modest. You can see how modest I am.",
        ],
      },
      {
        text: "Let me guess. You were never anywhere near a king.",
        replies: [
          "I was near a picture of one. On a coin. I held it for nearly an hour.",
          "How dare you! I have stood within a mile of a governor. Twice.",
          "The king was near me. There is a difference, and the difference is that I was there first.",
          "That is the sort of thing a jealous man says. Are you jealous, {title}? You may be jealous.",
          "Kings, governors, a man with a very big hat. They all look alike from the back of a crowd.",
        ],
      },
      {
        text: "I was knighted twice before breakfast this morning.",
        replies: [
          "Twice? Ha! I was knighted three times before breakfast, and the breakfast was knighted as well.",
          "Then you will know how tiresome it gets. All that kneeling. My poor knees.",
          "I do not believe you, and as a man of perfect honesty, I would know.",
          "Before breakfast is nothing. I was knighted in my sleep. By accident, but it counts.",
          "Hmph. Well, nobody likes a show off, {title}.",
        ],
      },
    ],
  },
  {
    id: "braggart-7",
    text: "Hurricanes do not frighten me. The last one took one look at my ship and turned back towards {otherTown}.",
  },
  {
    id: "braggart-8",
    text: "I hear you deal in {merchandise}. I once carried so much {merchandise} that my ship sank, and I carried it to shore on my back. Does that impress you?",
    answers: [
      {
        text: "Enormously. How many barrels?",
        replies: [
          "Four hundred. Maybe four thousand. I lost count somewhere around the third mile of swimming.",
          "Enough to make the governor weep with gratitude. He wept a great deal. I assumed it was gratitude.",
          "All of them. I left nothing behind except my boots, my dignity and the ship.",
          "Two barrels and a sack. But they were very heavy barrels, and it was very deep water.",
          "Counting is for clerks, {title}. Heroes simply carry.",
        ],
      },
      {
        text: "Why did the ship sink?",
        replies: [
          "Too much {merchandise}, as I said. Were you not listening? I said it very heroically.",
          "A treacherous reef, placed there by {enemy}. Well, nature put it there, but {enemy} did nothing to stop it.",
          "I may have overestimated her. And underestimated the {merchandise}. And forgotten to careen her for six years.",
          "Shipworm. Tiny little beasts, and the only enemy I have never defeated. I tried biting them back.",
          "Nobody knows. The sea has its secrets. Also my navigator was drunk.",
        ],
      },
      {
        text: "I once carried a whole ship on my back. With you on it.",
        replies: [
          "Ha! Then you must be the fellow I kept telling to hold still.",
          "Impossible. I would remember being carried. I would also remember complaining about it.",
          "A good story, {title}. Not as good as mine, but a good effort. Keep practising.",
          "With me on it? Then you carried the finest cargo ever to cross the Caribbean.",
          "You are mocking me. I know mocking. I have been mocked by the very best, in four languages.",
        ],
      },
    ],
  },
  {
    id: "braggart-9",
    text: "Scurvy came for me once. I stared at it until it went away. Also a sailor gave me a lime, but mostly the staring.",
  },
  {
    id: "braggart-10",
    text: "Every captain in {enemy} fears me more than the plague. Have you fought against {enemy}, {title}?",
    answers: [
      {
        text: "Many times. I have sunk dozens of their ships.",
        replies: [
          "Dozens? A fine start. When you reach a few hundred, come and find me and we will compare notes.",
          "Good. Every ship you sink is one fewer I have to sink. I am getting old, you know. Twenty-one, nearly.",
          "Dozens! Then we are practically brothers in arms. Though I am the more famous brother.",
          "I believe you. Mostly because I want to tell you about the time I sank fifty with one cannon.",
          "Well done. Truly. Though it is a pity nobody will write songs about you like they do about me.",
        ],
      },
      {
        text: "Not yet. I prefer trading.",
        replies: [
          "A wise choice. Leave the fighting to men like me, who are clearly made for it.",
          "Trade is honest work. Dull, but honest. I tried it once and accidentally started a war.",
          "There is no shame in it. I traded {merchandise} myself, between heroic deeds, to pay for the heroic deeds.",
          "Then you will live longer than me. That is not hard, I nearly die every Tuesday.",
          "Fair enough. Someone has to keep the taverns stocked for when I return victorious.",
        ],
      },
      {
        text: "I have, and I do not remember seeing you there.",
        replies: [
          "Of course not. I was disguised. As a cloud of smoke. A very fierce cloud of smoke.",
          "I fight from the back. Leading from the front is for amateurs who want to be shot.",
          "You were probably looking the wrong way. I am very quick. Some say too quick to see.",
          "I was there in spirit. And also in a tavern in {nationTown}, but mostly in spirit.",
          "Which battle? Name the battle. No, never mind, I was busy at all of them.",
        ],
      },
    ],
  },
  {
    id: "braggart-11",
    text: "Some men are born great. I was born great, then I went and got greater. My mother still cannot believe it.",
  },
  {
    id: "braggart-12",
    text: "I could take {enemyTown} by myself, {title}. One night, no cannon, just charm and a good pair of boots. Should I do it?",
    answers: [
      {
        text: "Yes. Go tonight.",
        replies: [
          "Tonight? Ah. Tonight I have a prior engagement. With a pie.",
          "I would, but the tide is wrong. And the moon. And my back is playing up.",
          "Splendid. I shall leave right after one more drink. Or six. We shall see.",
          "Tonight is the feast of a very important saint. It would be ungodly. Tomorrow, perhaps.",
          "Your enthusiasm moves me, {title}. Not quite enough to move my legs, but it moves me.",
        ],
      },
      {
        text: "With what army?",
        replies: [
          "Army? I am the army. Also the navy. And the cook, on weekends.",
          "Armies are for men without a reputation. I simply knock on the gate and they surrender.",
          "I have a cousin. Two cousins. One has a dog.",
          "A man who needs an army has already lost, {title}. I read that somewhere. I think I wrote it.",
          "You ask a lot of questions for someone who has never taken a town alone.",
        ],
      },
      {
        text: "Better take {nationTown} first. For practice.",
        replies: [
          "Take our own town? I am a hero, not a lunatic. There is a difference. A small one.",
          "Ha! The governor of {nationTown} would have me hanged. Then he would beg my forgiveness, but still.",
          "Practice is for those who make mistakes. I last made one in '31 and it was not my fault.",
          "Now that is treason, {title}. Funny treason, but treason. I shall pretend I did not hear it.",
          "I took {nationTown} once already. They just did not notice. That is how good I am.",
        ],
      },
    ],
  },
  {
    id: "braggart-13",
    text: "I knew the buccaneers on Hispaniola before they were famous. Taught them how to smoke meat. Before me, they just looked at it.",
  },
  {
    id: "braggart-14",
    text: "Would you believe I once outran a hurricane, {name}?",
    answers: [
      {
        text: "I would, if you tell me how.",
        replies: [
          "I sailed faster. The hurricane sailed fast too. I sailed faster still. That is the whole secret.",
          "I threw all the salt pork overboard to lighten the ship. The hurricane stopped to eat it.",
          "Simple. I pointed the bow away from the wind and shouted. The wind respects a loud man.",
          "I tied my shirt to the mast as an extra sail. Very fine linen. It never recovered.",
          "Prayer, skill and a great deal of luck. And a little bit of crying, which I will deny.",
        ],
      },
      {
        text: "No.",
        replies: [
          "No? Just no? Not even a little bit? I outran a large gust, at least.",
          "Fine. I outran a strong breeze. Which is still a breeze, and I still outran it.",
          "You are a hard audience, {title}. Harder than the reef off {otherTown}, and I have hit that.",
          "Your loss. It was a very good story. It had a parrot in it.",
          "Hmph. Then you will not want to hear about the waterspout either.",
        ],
      },
      {
        text: "I believe it. I have seen you outrun a bar tab.",
        replies: [
          "That was an honest misunderstanding about the date. I was coming back. Eventually.",
          "The tab was the more dangerous of the two, I will admit.",
          "Speed is speed, {title}. A skill is a skill.",
          "I paid that tab! In stories. Very valuable stories. The keeper just did not appreciate them.",
          "Keep your voice down. The landlord has ears like a customs officer.",
        ],
      },
    ],
  },
  {
    id: "braggart-15",
    text: "The Inquisition questioned me once. After three hours they let me go, mostly so I would stop talking.",
  },
  {
    id: "braggart-16",
    text: "I have sailed every sea there is, {title}. Every single one. Ask me about any of them.",
    answers: [
      {
        text: "What is the Pacific like?",
        replies: [
          "Big. Wet. Mostly blue. You would hate it, it has no taverns.",
          "Peaceful, as the name says. Until I arrived. Then less so.",
          "I sailed it to Panama and back in a week. The mules nearly died of exhaustion.",
          "Very much like the Caribbean, but further away and with more of it.",
          "The Pacific? Ah. Yes. That one I may have only seen on a map. A very detailed map.",
        ],
      },
      {
        text: "How about the North Sea?",
        replies: [
          "Cold, grey and full of Dutchmen arguing about herring. I loved every minute.",
          "I sailed there with a Dutch admiral once. He took my advice on everything, then wisely ignored it.",
          "The North Sea is where I learned to drink. The cold makes it necessary.",
          "Terrible place. My beard froze solid and a gull nested in it. Raised two chicks, lovely birds.",
          "Very rough. Not as rough as me, but rough.",
        ],
      },
      {
        text: "Tell me about the Sea of Cheese.",
        replies: [
          "Ah, the Sea of Cheese. Dangerous. Very crumbly near the coast.",
          "I sailed it in my youth. We ate our way home. Lovely trip, terrible for the teeth.",
          "There is no such sea! Is there? I have been to most of them. You are sure? Hm.",
          "Mock if you like, {title}, but I have seen stranger things than cheese at sea. A sober bosun, for one.",
          "That is in Holland, I believe. Everything in Holland is cheese, or a canal, or both.",
        ],
      },
    ],
  },
  {
    id: "braggart-17",
    text: "My grandfather sailed with Drake. Or near Drake. He once saw Drake's ship from a hill, and the family has never stopped talking about it.",
  },
  {
    id: "braggart-18",
    text: "I hear things are tense in {nation} these days. If they had listened to me years ago, none of this would have happened. Do you want to hear my plan?",
    answers: [
      {
        text: "Go on, then.",
        replies: [
          "Step one: put me in charge. Step two: there is no step two, everything is fixed.",
          "I would have every man in {town} learn to fence by Michaelmas. And me as fencing master, naturally.",
          "More ships, more cannon, more rum for the crews. And more statues of me. For morale.",
          "It involves a large cannon and a very long fuse. I have not worked out the rest.",
          "I wrote it all down once and sent it to the court. They never replied. Probably too ashamed.",
        ],
      },
      {
        text: "Does it involve you being in charge?",
        replies: [
          "It does, and I am glad you see the genius of it.",
          "Only of everything. A small, sensible amount of charge.",
          "Somebody has to do it. I have been volunteering for twenty years.",
          "You say that as if it is a bad thing, {title}.",
          "Only at first. After a few years I would step down. Into a bigger chair.",
        ],
      },
      {
        text: "No. Please, no.",
        replies: [
          "Your loss. History will remember that you said no.",
          "Fine, fine. I will tell the parrot. He appreciates me.",
          "Very well. But when it all goes wrong, remember I offered.",
          "Not even the short version? It only takes an hour.",
          "Hmph. The governor said the same, and look at him now. Still governor, but look at him.",
        ],
      },
    ],
  },
  {
    id: "braggart-19",
    text: "I lost this tooth fighting three marines from {enemy} at once. The other tooth I lost to a ship's biscuit, which put up a far better fight.",
  },
  {
    id: "braggart-20",
    text: "What do you think is my greatest deed, {title}? Go on, guess.",
    answers: [
      {
        text: "The shark?",
        replies: [
          "The shark! Yes! Everyone loves the shark. The shark itself loved it least.",
          "Close, but no. The shark was a Tuesday. My greatest deed was a whole week.",
          "The shark was merely a warm-up. Though he did bite off my favourite buckle.",
          "Ha, the shark. He still writes, you know. Well, he swims past now and then.",
          "Many say the shark. The shark says otherwise, but who listens to a shark?",
        ],
      },
      {
        text: "Surviving this long without being thrown in the sea?",
        replies: [
          "I have been thrown in the sea seven times. I came back every time. That is my greatest deed.",
          "Cruel, {title}. Accurate, but cruel.",
          "They tried in {otherTown}. I swam back before they finished cheering.",
          "Ha! A wit. I will steal that and say it about someone else.",
          "The sea will not have me. It knows it could never hold all of my greatness.",
        ],
      },
      {
        text: "Talking for an hour without breathing?",
        replies: [
          "Two hours. And I did breathe. Through my ears, a trick I learned from a Dutch pearl diver.",
          "That is a skill, not a deed. But thank you for noticing.",
          "You exaggerate. I breathe at least twice an hour. Usually during the applause.",
          "I could do it now if you like. Time me. Right. So, in '29, I was...",
          "Better than breathing for an hour without talking. That is called being a clerk.",
        ],
      },
    ],
  },
  {
    id: "braggart-21",
    text: "A governor once begged me to marry his daughter. Well, his daughter's maid. Well, she said hello. In a very meaningful way.",
  },
  {
    id: "braggart-22",
    text: "Give me a letter of marque and a sloop, and I will bring back half the navy of {enemy} before {month} is out. Do you doubt it?",
    answers: [
      {
        text: "Not for a moment.",
        replies: [
          "Then write to your governor. Tell him the greatest captain in {town} is waiting. And thirsty.",
          "Splendid! Lend me a sloop, then. Any sloop. Even a small one. Even a raft.",
          "Ha! You see it too. The fire in my eyes. Some call it rum, but it is fire.",
          "All of {enemy} will weep. They will weep so hard their ships will float higher.",
          "I knew you were clever. Clever people always agree with me.",
        ],
      },
      {
        text: "Which half?",
        replies: [
          "The half with the treasure, obviously. The other half can stay where it is.",
          "The front half. Of each ship. Saves time.",
          "Whichever half is nearest the tavern when I set out.",
          "That is a detail for the admirals, {title}. I am a big picture man.",
          "All of the important half. I will leave them the cooks.",
        ],
      },
      {
        text: "Why not just bring back a sloop first?",
        replies: [
          "A sloop! I do not do small things. I tried a small thing once and it went very badly.",
          "Sloops are for beginners. I began years ago. I am practically finished.",
          "Because then they would expect me to do it again, and then where would we be?",
          "Hm. That is... a reasonable plan. I hate it.",
          "Fine. One sloop. But a famous sloop. With my name painted on it twice.",
        ],
      },
    ],
  },
  {
    id: "braggart-23",
    text: "Pieces of eight? I have so many I use them as ballast. Do not ask to see them. They are at the bottom of the harbour. Holding the ship down.",
  },
  {
    id: "braggart-24",
    text: "You look a little pale, {title}. Seasick? I have never been seasick in my life. Have you?",
    answers: [
      {
        text: "Never. I have a stomach of iron.",
        replies: [
          "Iron? Mine is bronze. Bronze outlasts iron, everybody knows that.",
          "Good, good. Though I suspect you are being modest about the times you were.",
          "We are a rare breed, you and I. The rest of the world spends its life leaning over the rail.",
          "I once ate a whole barrel of salt pork during a storm and asked for seconds.",
          "Iron rusts at sea, {title}. Just a word of warning from a friend.",
        ],
      },
      {
        text: "Only when I listen to your stories.",
        replies: [
          "Ha! That is the motion of excitement, {title}. Very common among my listeners.",
          "My stories have that effect on lesser sailors. You will get your sea legs.",
          "I shall tell them more slowly, then. Like a gentle swell.",
          "Rude. Funny, but rude. I shall laugh about it later, when you are gone.",
          "Then you will be glad I am about to start a very long one.",
        ],
      },
      {
        text: "I saw you being sick over the side yesterday.",
        replies: [
          "I was feeding the fish. It is an old sailor's courtesy.",
          "That was a man who looked like me. I have a lot of admirers who copy my style.",
          "I was checking the depth with my face. Old navigator's trick.",
          "A bad oyster. Not the sea. Never the sea. The sea and I are old friends.",
          "Yesterday is ancient history, {title}. Today I am fine. Mostly.",
        ],
      },
    ],
  },
  {
    id: "braggart-25",
    text: "The sea took my first ship, my second ship and my best hat. I still miss the hat. Ships come and go, but a good hat is forever.",
  },
  {
    id: "braggart-26",
    text: "I hear Portugal is restless under Philip IV. I predicted it years ago, to anyone who would listen. Do you think they will rise?",
    answers: [
      {
        text: "It seems likely.",
        replies: [
          "Then remember who said it first. Me. In a tavern. Loudly.",
          "When they do, I expect a letter from Lisbon admitting I was right. And maybe a small castle.",
          "Philip IV has enough on his plate with Catalonia. I would not want to be in his boots, and they are very fine boots.",
          "History is about to listen to me, {title}. It is a very proud day.",
          "Mark my words. And mark my name next to them, in big letters.",
        ],
      },
      {
        text: "Did you really predict it?",
        replies: [
          "I told a Portuguese sailor. He told his mother. She told me to stop shouting.",
          "I predicted it, and also rain, and also that the cook would burn the pork. Two out of three so far.",
          "In a manner of speaking. I wrote it on a tavern wall in {otherTown}. Somebody painted over it.",
          "I predict everything, {title}. Some of it is bound to come true.",
          "Not in words. But I gave a very knowing nod in the direction of Lisbon.",
        ],
      },
      {
        text: "Only if you promise to stay out of it.",
        replies: [
          "Unkind. My presence has decided many battles. Not always in the right direction, but decided.",
          "Ha! Very well, I shall stay here and let them take all the glory.",
          "My help is in high demand, {title}. They would be lucky to get it.",
          "I wrote to the Catalans once and they stopped answering letters altogether. I am starting to see a pattern.",
          "Fine. But when they win, I will still say it was me.",
        ],
      },
    ],
  },
  {
    id: "braggart-27",
    text: "In {otherTown} they call me the Lion of the Caribbean. Well, one man did. He was very drunk. But he meant it.",
  },
  {
    id: "braggart-28",
    text: "I will wager you a doubloon I can tell a bigger tale than you, {title}. Do you accept?",
    answers: [
      {
        text: "Accepted. I once ate a whale.",
        replies: [
          "A whale? I ate a whale that had eaten a whale. Pay up.",
          "Raw or cooked? Because I ate one raw. While it was still swimming. In the rain.",
          "A respectable effort. But I am the whale's cousin's best friend, and he told me you are lying.",
          "Ha! Good, good. You have talent. Lose the doubloon gracefully and I will teach you.",
          "I once ate a whole fleet's worth of ship's biscuit. That is harder than a whale, believe me.",
        ],
      },
      {
        text: "No. Your tales are already the biggest in the Caribbean.",
        replies: [
          "True! And you are wise not to wager against a master.",
          "That is the nicest thing anyone has said to me since my mother. And she was being sarcastic.",
          "Biggest and truest, {title}. Do not forget truest.",
          "Then I win by default. I shall take that doubloon all the same.",
          "Flattery! I accept it in place of the doubloon.",
        ],
      },
      {
        text: "Accepted. My tale is that you have paid a debt.",
        replies: [
          "Ha! Absurd. Nobody would believe that. You win. Wait. No. I object.",
          "That is not a tall tale, that is pure fantasy, and fantasy does not count.",
          "I pay my debts! With interest! In stories!",
          "Cruel, {title}. The whole tavern is laughing. I am laughing too, but on the inside I am weeping.",
          "Very well, a doubloon to you. I shall owe it to you. Like the others.",
        ],
      },
    ],
  },
  {
    id: "braggart-29",
    text: "Louis XIII sends me cheese every Christmas. At least, someone sends me cheese. I like to think it is him.",
  },
  {
    id: "braggart-30",
    text: "The Thirty Years' War would have been the Three Weeks' War if they had sent for me. Do you know why they did not?",
    answers: [
      {
        text: "Because you would have won it too quickly?",
        replies: [
          "Exactly! And then what would all those generals do with themselves?",
          "You understand politics, {title}. Peace is bad for business. I am too good at peace.",
          "Yes! Finally, someone sees it. The parrot has been saying it for years.",
          "They feared me. All of them. Even the ones on my side.",
          "Precisely. And there are only so many medals in Europe.",
        ],
      },
      {
        text: "Because nobody knew where you were.",
        replies: [
          "I was hiding. From fame. It follows me everywhere.",
          "I was in {otherTown}. Everyone knows I am in {otherTown} in summer.",
          "The letters went to the wrong tavern. It happens more often than you would think.",
          "Hm. Possibly. I move around a lot. Creditors, you see. Admirers, I mean.",
          "That is the price of a legend. Nobody can find you, but everybody talks about you.",
        ],
      },
      {
        text: "Because they had heard of you.",
        replies: [
          "Exactly! Wait. What do you mean by that?",
          "Yes, they had heard of me, and they were afraid. Afraid! That is a compliment.",
          "I choose to take that in the kindest way possible, {title}.",
          "My reputation precedes me. Sometimes it arrives a year early and spoils everything.",
          "Ha! Very good. I will forgive you. Once.",
        ],
      },
    ],
  },
  {
    id: "braggart-31",
    text: "Tallow candles? I read by the light of my own glory, {title}. Saves a fortune.",
  },
  {
    id: "braggart-32",
    text: "Do you know what the secret to careening a ship is, {title}?",
    answers: [
      {
        text: "Scrape the hull and burn off the weed.",
        replies: [
          "Yes, yes, the boring way. The proper way is to stare at the barnacles until they leave.",
          "Correct, but you forgot the most important part: complaining loudly the whole time.",
          "That is what they teach in books. I learned it from a mermaid. Same answer, prettier teacher.",
          "Spoken like a sailor. Good. You might live long enough to hear all my stories.",
          "Right. And never careen on a beach full of crabs. I learned that the hard way. In the trousers.",
        ],
      },
      {
        text: "Get someone else to do it.",
        replies: [
          "Ha! The true secret of captaincy. I see you have studied with the masters.",
          "Exactly my method. I supervise. Loudly. From the shade.",
          "Clever. I tried it once, but the crew had the same idea and the ship rotted.",
          "You are wiser than you look, {title}. And you look fairly wise.",
          "That is how I careened eight ships in a week. Well, how the crew did.",
        ],
      },
      {
        text: "No idea. What is it?",
        replies: [
          "Patience. And a big knife. And not doing it in a hurricane, which I once did. Very exciting.",
          "Tip her over, clean her bottom, tip her back. Like changing a baby, but with more tar.",
          "I would tell you, but then every captain in {town} would be as good as me.",
          "The secret is a good beach, a calm day and a crew too tired to mutiny.",
          "Keep the powder dry and the rum drier. That is also the secret to most things.",
        ],
      },
    ],
  },
  {
    id: "braggart-33",
    text: "I am not saying I invented the cutlass. I am only saying that before me, nobody used it properly.",
  },
  {
    id: "braggart-34",
    text: "They say there is plague in {otherTown}. Pah. I had the plague twice and won both times. Are you worried about it, {title}?",
    answers: [
      {
        text: "A little, yes.",
        replies: [
          "Sensible. Not everyone has my constitution. I was raised on salt pork and gunpowder.",
          "Keep clear of crowded ships and rats. And of men who cough on you. And of me, I am very loud.",
          "There is no shame in fear. I was frightened once. It was a Thursday. It passed.",
          "Rumours mostly. Every season someone shouts plague and the price of vinegar triples.",
          "Stay out of {otherTown} for a month. Even I stay out, and I fear nothing. Mostly.",
        ],
      },
      {
        text: "No. I eat the plague for breakfast.",
        replies: [
          "Ha! Now that is the spirit. I eat it for supper too, with a little mustard.",
          "Bold. Foolish, but bold. You remind me of me, before I became even bolder.",
          "Careful. I said that once and was in bed for a fortnight. Coincidence, I am sure.",
          "Breakfast? I eat it before breakfast, while I am still asleep.",
          "Do not let the surgeon hear you. He will charge you for it.",
        ],
      },
      {
        text: "You had the plague twice?",
        replies: [
          "Twice. Possibly three times. The third one may have been a cold, but I fought it like a plague.",
          "Yes. The doctors were astonished. Or they were drunk. They looked astonished.",
          "The first time it was very serious. I lost a whole afternoon.",
          "Twice, and I have the scars to prove it. Well, I have scars. Who is to say from what?",
          "That is what I said, {title}. Why does everyone repeat my stories back to me as questions?",
        ],
      },
    ],
  },
  {
    id: "braggart-35",
    text: "The merchant fleet of {enemy} sails past {town} every year and I let it, {title}. Out of pity. Somebody has to keep them in business.",
  },
  {
    id: "braggart-36",
    text: "I hear the Dutch West India Company is hiring brave men. They did not hire me. Can you think why?",
    answers: [
      {
        text: "They could not afford you.",
        replies: [
          "Exactly what I told them! In guilders, my courage is very expensive.",
          "Yes! All the guilders in Amsterdam would not cover my fee. Or my bar tab.",
          "You have a merchant's eye, {title}. You know the value of a legend.",
          "That, and they were frightened I would take over the Company. Which I would have.",
          "They offered me a clerk's job. A clerk! I laughed for a week.",
        ],
      },
      {
        text: "They checked your references?",
        replies: [
          "My references are excellent! The shark would vouch for me if he could talk.",
          "I gave them twelve names. Admittedly most of them were me in different hats.",
          "References are for ordinary men. I am a reference for other people.",
          "One letter from a governor was a little smudged. And by smudged I mean I wrote it.",
          "Unkind and possibly accurate. I will drink to that.",
        ],
      },
      {
        text: "Because you are not Dutch?",
        replies: [
          "I could be Dutch. I have eaten herring. I know at least four words.",
          "Nonsense. They hire everyone. Englishmen, Frenchmen, a Portuguese with one leg. Just not me.",
          "Ha! Simple and probably true, {title}. I prefer my theory, though.",
          "I am a little bit Dutch on my grandmother's side. She once visited a windmill.",
          "Ja. Hello. Cheese. You see? Practically a native.",
        ],
      },
    ],
  },
  {
    id: "braggart-37",
    text: "When I was young I was considered the handsomest man in {nation}. I have only grown more handsome. You can see the problem.",
  },
  {
    id: "braggart-38",
    text: "Shall I tell you about the time I captured a galleon from {enemy} single-handed, {name}?",
    answers: [
      {
        text: "Yes, please.",
        replies: [
          "I swam out at night with a knife between my teeth. That is how I lost the other tooth, actually.",
          "I climbed the anchor chain, knocked out the watch and locked the captain in his cabin with his own cheese.",
          "It was off {enemyTown}. I shouted 'surrender' so loudly that the whole crew jumped overboard.",
          "She was full of silver and the captain cried when I took his sword. I gave it back, I am not a monster.",
          "Well, I say galleon. It was a fishing boat. But it flew the colours of {enemy}, and the fish fought hard.",
        ],
      },
      {
        text: "Single-handed? Where were your hands?",
        replies: [
          "One was holding my cutlass. The other was holding my hat. A gentleman must look his best.",
          "It is an expression, {title}. I used both hands. And my teeth. And a little bit of my knee.",
          "One hand was tied behind my back. By me. To make it fair.",
          "One was waving to the ladies on shore. That left only one for the fighting.",
          "Ha! A clever one. I like that. I will tell that joke later and pretend it is mine.",
        ],
      },
      {
        text: "No, I have heard it four times already.",
        replies: [
          "And it gets better every time! This one has a bigger galleon.",
          "Only four? I must be getting lazy. Usually it is six by Wednesday.",
          "Then you can help me tell it. You do the cannon noises.",
          "Fine. I will tell you about the second galleon instead. It is the same, but on a Thursday.",
          "Four times and still you doubt me. Five will do it, I am sure.",
        ],
      },
    ],
  },
  {
    id: "braggart-39",
    text: "Laugh if you like, {title}, but I did once save a whole crew from drowning. I was the only one who could swim. It is not as glamorous as the shark, but it is true.",
  },
  {
    id: "braggart-40",
    text: "I hear you call yourself {name}. A fine name. Not as fine as mine, but fine. Do you know what my name means?",
    answers: [
      {
        text: "No. What does it mean?",
        replies: [
          "It means 'he who is very brave'. In an old language. Which I invented.",
          "Lion-hearted sea-wolf of the western isles. Roughly. It loses something in translation.",
          "It means 'son of a cooper'. But a heroic cooper. The best barrels in the parish.",
          "In Spanish it means 'terror'. In Dutch it means 'a type of sausage'. I prefer the Spanish.",
          "It means 'legend', {title}. Or 'loud'. Scholars disagree.",
        ],
      },
      {
        text: "Trouble?",
        replies: [
          "Ha! Trouble for my enemies! You are clever, {title}.",
          "That is what my mother called me. Every day. With great feeling.",
          "Trouble, glory, same thing really. Both follow me around.",
          "Hm. The harbour master calls me that too. You have not been talking to him, have you?",
          "Only on Saturdays. The rest of the week it means 'hero'.",
        ],
      },
      {
        text: "I do not care, to be honest.",
        replies: [
          "You will care when they put it on a statue in {town}.",
          "Honest! I respect that. I do not like it, but I respect it.",
          "Very well. But it means 'hero' and now you know, and you cannot unknow it.",
          "One day you will tell your grandchildren that you did not care. And they will be ashamed.",
          "A hard heart, {title}. Harder than a ship's biscuit. And I have broken teeth on those.",
        ],
      },
    ],
  },
  {
    id: "braggart-41",
    text: "Some say I exaggerate. Those people are wrong by at least a thousand miles. Maybe ten thousand.",
  },
  {
    id: "braggart-42",
    text: "Barbados is all sugar now, they say. I told them to stop growing tobacco years ago. Do you think anyone thanked me?",
    answers: [
      {
        text: "I am sure someone did.",
        replies: [
          "A planter bought me a drink once. I think it was gratitude. He may also have mistaken me for someone.",
          "Nobody thanked me. But history will. History always comes round eventually.",
          "One small boy did. Then he asked for a penny. Gratitude is rarely free.",
          "Kind of you, {title}. You can thank me now, if you like. I will wait.",
          "I accept their silent thanks. It is the loudest kind.",
        ],
      },
      {
        text: "Did you actually tell them?",
        replies: [
          "I said tobacco smelled awful. That is practically agricultural advice.",
          "I told a planter's cousin's horse. Horses talk. Everybody knows that.",
          "In my heart I did. And in a tavern, quite loudly, after the fourth rum.",
          "You question everything, {title}. It is very tiring for a man of my genius.",
          "Not in words. In a look. A very knowing look.",
        ],
      },
      {
        text: "Who would thank a man for sugar? It rots your teeth.",
        replies: [
          "Says the person with all their teeth! Envy is an ugly thing.",
          "Ha! I lost mine to biscuit, not sugar. Sugar never hurt anyone. Except my uncle.",
          "Sugar makes rum, {title}. Show some respect for the mother of rum.",
          "Rotting teeth is good for the barber surgeons. I am a friend to every trade.",
          "Then I shall take the blame instead of the thanks. Either way, it was me.",
        ],
      },
    ],
  },
  {
    id: "braggart-43",
    text: "I have been to {otherTown}, {nationTown} and {enemyTown}, all in the same week. Of course, one of them I mostly saw from a prison window.",
  },
  {
    id: "braggart-44",
    text: "Look at these arms, {title}. Do you know how many cannon I can lift?",
    answers: [
      {
        text: "Two?",
        replies: [
          "Two! Ha! Two in each hand. And one on my head, for balance.",
          "Two at once, yes. And then I lift another two, to show off.",
          "Two is what an ordinary man guesses. I am no ordinary man. Three. Nearly.",
          "Two big ones, or eight of the small ones. The small ones are harder, they wriggle.",
          "In my youth, two. Now I lift the gunner instead. He weighs more.",
        ],
      },
      {
        text: "None. I have seen you struggle with a tankard.",
        replies: [
          "That tankard was nailed to the table. A cruel trick.",
          "I was lifting it slowly, for drama. You know nothing of theatre, {title}.",
          "That was a very full tankard. Full of very heavy rum.",
          "My arms were resting. Even a hero's arms must rest.",
          "Lies! Well, half lies. The tankard was difficult, but the cannon is easy.",
        ],
      },
      {
        text: "Enough to sink a ship just by standing on it.",
        replies: [
          "Exactly! That is why I am not allowed on the small ones anymore.",
          "Ha! Careful, {title}. I sank a jetty that way once. They still blame me.",
          "You jest, but my last ship did list a little to my side.",
          "Muscle is heavy. Heavier than fat. Much heavier than modesty.",
          "Is that a jab at my waist? It is all muscle. Very fine, soft-looking muscle.",
        ],
      },
    ],
  },
  {
    id: "braggart-45",
    text: "Every time I tell the shark story, the shark grows a foot. By this time next year he will be longer than my ship.",
  },
  {
    id: "braggart-46",
    text: "Back in {month} I saw a sea serpent just off {town}. You believe me, don't you, {title}?",
    answers: [
      {
        text: "I believe you saw something.",
        replies: [
          "I saw a serpent! Long, green, angry. It looked a lot like a floating rope. But angrier.",
          "A diplomatic answer. You should be a governor. Or a priest.",
          "Something! Exactly. A very large something with teeth.",
          "It was dark, I was tired, and I had had a little rum. But I know a serpent when I see one.",
          "That is more than the harbour master said. He said I saw a log.",
        ],
      },
      {
        text: "No. It was a log.",
        replies: [
          "A log with eyes! And a tail! That moved! In the wind. Hm.",
          "You sound exactly like the harbour master. Have you been talking to him?",
          "It was a very dangerous log, then. It nearly sank a rowing boat.",
          "Fine. A log. But I fought the log, and I won.",
          "Logs do not hiss, {title}. Well. That one might have been me hissing.",
        ],
      },
      {
        text: "I know. I was the serpent.",
        replies: [
          "Ha! Then you owe me a new oar. You bit the old one in half.",
          "I knew it! I knew that serpent had a suspicious face.",
          "Then you swim very badly, {title}. You looked like a drowning eel.",
          "Well, it explains why it asked me for directions to the tavern.",
          "I shall tell the story with you in it now. You will be famous. Mostly as the loser.",
        ],
      },
    ],
  },
  {
    id: "braggart-47",
    text: "Charles I has his troubles with Parliament. If he had a man like me at his side, Parliament would be too busy listening to my stories to cause any trouble.",
  },
  {
    id: "braggart-48",
    text: "I am thinking of writing my memoirs. Seven volumes. Would you read them?",
    answers: [
      {
        text: "Every page.",
        replies: [
          "Splendid! You will be my first reader. And probably my last, but the first is what counts.",
          "Volume one is just my birth. It was a very heroic birth. Took three days.",
          "Good. I will put you in volume four, as the young sailor who admired me. You will like that.",
          "I knew it. A person of taste. We shall get along very well.",
          "You will need a strong table. Each volume weighs as much as a cannon ball.",
        ],
      },
      {
        text: "Can you write?",
        replies: [
          "Write? I can sign my name in three colours of ink! Well, two. The third was gravy.",
          "I can write quite well. Reading is the part I struggle with.",
          "I shall dictate them. To a priest. A patient priest. A very patient priest.",
          "That is not the point, {title}. The point is the story. Somebody else can do the letters.",
          "Better than I can spell. Which is not saying much, I admit.",
        ],
      },
      {
        text: "Only if they are seven very short volumes.",
        replies: [
          "Short? My life does not fit in short volumes. My breakfasts alone take a chapter.",
          "Very well. Seven volumes, one page each. The shark can have the whole of volume three.",
          "Ha! You are the sort who skips to the end. Well, the end is: I win.",
          "Short is for small lives, {title}. I am not a small life.",
          "I shall write a short version just for you. Only four hundred pages.",
        ],
      },
    ],
  },
  {
    id: "braggart-49",
    text: "Fine, {title}, I admit it. I have never actually been knighted. But I was once very nearly asked whether I would like to be. By a man who looked important.",
  },
  {
    id: "braggart-50",
    text: "If ships from {enemy} sail into {town} tomorrow, do you know who will stand on the quay to meet them?",
    answers: [
      {
        text: "You, of course.",
        replies: [
          "Me! With my sword in one hand and my hat in the other. They will turn around at once.",
          "Correct. Right after I make sure the tavern is safe. The tavern comes first.",
          "Exactly. And you will be standing behind me, cheering. From a safe distance.",
          "Me, and only me. Though I may ask the garrison to stand quite close.",
          "Of course. I will be the one shouting the loudest. Shouting wins half of all battles.",
        ],
      },
      {
        text: "The garrison. You will be under a table.",
        replies: [
          "Under a table is a fine defensive position, {title}. Ask any general.",
          "I shall be under the table looking for my sword. Which I drop on purpose. To lure them in.",
          "Rude. Probably true, but rude.",
          "Tables are strong. Oak. Better than most forts. You laugh, but I will live.",
          "The garrison will need someone to tell the story afterwards. That is my job.",
        ],
      },
      {
        text: "{enemy} would never dare. They fear you too much.",
        replies: [
          "Ha! Exactly. That is why {town} is so peaceful. You are welcome, everyone.",
          "Finally, someone who understands why nothing ever happens here.",
          "I have kept {town} safe for years by simply existing. It is very tiring.",
          "They fear my name. And my voice. Mostly my voice. It carries over water.",
          "Do not say it too loudly. If they hear me being praised, they might come just to see.",
        ],
      },
    ],
  },
  {
    id: "braggart-51",
    text: "I once sailed from {otherTown} to {town} in a single night. Well, a single night and three weeks. But I slept at night, so it felt like one.",
  },
  {
    id: "braggart-52",
    text: "Catalonia is in revolt, Portugal is grumbling, and here I am in {town}, wasting my talents. What should I do with myself, {title}?",
    answers: [
      {
        text: "Go to Europe and sort it all out.",
        replies: [
          "I would, but the crossing is long and I get bored without an audience.",
          "Excellent idea. Lend me the fare and I will leave in the morning. Or the morning after.",
          "Europe is not ready for me. It has enough wars already.",
          "I tried that in '35. They sent me back. Said I was too heroic for the paperwork.",
          "Ha! And leave {town} defenceless? Never. I am too noble.",
        ],
      },
      {
        text: "Stay here and tell your stories.",
        replies: [
          "You are right. The people of {town} would weep if I left. Some of them weep already.",
          "Yes. Somebody must keep the old tales alive. Even the new ones I made up this morning.",
          "Wise. My stories are worth more than any war. And cost less, unless you count the rum.",
          "Then pull up a chair. I have a new one about a giant crab.",
          "Very well. But you are buying the next jug.",
        ],
      },
      {
        text: "Learn to knit.",
        replies: [
          "Knit? I could knit. I could knit a sail in an afternoon. A small sail. For a toy boat.",
          "Ha! I once mended a net with my teeth. Is that knitting? I think it is close.",
          "Heroes do not knit, {title}. Heroes have their socks knitted for them by admirers.",
          "You are mocking me. But a warm scarf in a North Sea gale is no joke.",
          "I shall knit a banner with my name on it. Then you will be sorry.",
        ],
      },
    ],
  },
  {
    id: "braggart-53",
    text: "You know, {title}, I have seen good men lost to fever and storm. When I tell my stories, I tell them for the ones who never got to tell theirs. Then I make mine a bit bigger.",
  },
  {
    id: "braggart-54",
    text: "Be honest with me, {name}. Do you think my stories are true?",
    answers: [
      {
        text: "Every single one.",
        replies: [
          "Then you are the best friend I have in {town}. Possibly the only one. Drink?",
          "Ha! I knew it. The shark, the galleon, the knighthood, all true. Mostly.",
          "You are kind, {title}. Kinder than the truth, I suspect.",
          "Good. Because if you did not, I would have to tell them again, louder.",
          "Wonderful. Then I can tell you the one about the dragon.",
        ],
      },
      {
        text: "Some of them. Maybe a little.",
        replies: [
          "A little is enough. A little true story can feed a man for a lifetime.",
          "That is fair. I believe about half of them myself, on a good day.",
          "Maybe a little is the most anyone has ever said. I will take it.",
          "Honesty! Painful, but refreshing. Like a cold sea after too much rum.",
          "The shark one is true. That is all that matters. The shark one is true.",
        ],
      },
      {
        text: "Not one word.",
        replies: [
          "Not one? Not even the bit about me being handsome? That one is obvious.",
          "Fine. But they are good words, {title}. Admit they are good words.",
          "Ah. Well. The jetty one is true, sadly.",
          "You wound me. Then you heal me with honesty. Then you wound me again. Cruel.",
          "Not one word true, but every word worth hearing. That is what a story is.",
        ],
      },
    ],
  },
  {
    id: "braggart-55",
    text: "Mark my words, {title}, one day they will sing songs about me in every tavern from {town} to {enemyTown}. Mostly because I will be the one singing them.",
  },
  {
    id: "braggart-56",
    text: "Fair winds, {name}. If you meet any sharks out there, tell them I said hello. They will know who I am.",
  },
]
