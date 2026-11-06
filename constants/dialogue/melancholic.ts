import "server-only"

export const MELANCHOLIC: DialogueEntry[] = [
  {
    id: "melancholic-1",
    text: "Do you ever think of home, {name}? I do. Every morning. Then I eat a ship's biscuit and think of it harder.",
    answers: [
      {
        text: "Every single day.",
        replies: [
          "Then we are two lost souls on the same quay. Shall we stand here and sigh together? It passes the afternoon.",
          "It never gets easier. It only gets quieter, like a bell ringing in the next valley.",
          "Good. Forgetting is worse. I tried it once and remembered everything at three in the morning.",
          "I knew it. You have the look. Sort of damp around the soul.",
          "Keep a little of it with you. A song, a smell, a debt you never paid. It all counts.",
        ],
      },
      {
        text: "I'm home wherever my ship is.",
        replies: [
          "How lucky. My home is a room above a chandler's that smells of tallow and regret.",
          "Then I pray your ship never sinks, or you will be homeless and wet at the same time.",
          "That's a fine sentiment. I said the same once. Then my ship went down and took my home with it.",
          "A home that floats. Very sensible. At least when it leaks you can blame the sea and not the landlord.",
          "I envy you. My home is three thousand miles away and probably sold.",
        ],
      },
      {
        text: "Home was dreadful. That's why I left.",
        replies: [
          "Ah, but it was our dreadful. Here even the misery is foreign.",
          "Yes, mine too. Grey, cold, full of tax collectors. I would give my left hand to see it again.",
          "Dreadful places are the ones you miss most. Nobody gets homesick for a pleasant afternoon.",
          "Spoken like someone who has not yet been away long enough. Give it ten years and a fever.",
          "I left for the same reason. Now I cry over it into my rum. Life is a joke told very slowly.",
        ],
      },
    ],
  },
  {
    id: "melancholic-2",
    text: "A letter came from my sister. Plague in the parish again. She says the bells ring so often now that nobody bothers to ask who for.",
  },
  {
    id: "melancholic-3",
    text: "They say Barbados is all sugar now. Tobacco used to be the thing. Everything I ever loved used to be the thing.",
  },
  {
    id: "melancholic-4",
    text: "Have you lost a ship, {title}? You have the look of someone who has. Or someone who soon will.",
    answers: [
      {
        text: "Never. Not a single one.",
        replies: [
          "Not yet. The sea is patient. It keeps a ledger, and it always collects.",
          "Then I will say a prayer for your first. It is coming. They always come.",
          "Remarkable. Mind you, I said that too, a week before I learned how to swim.",
          "Lucky you. I have lost four. The fourth one I was rather fond of.",
          "Hold on to that feeling. Frame it, if you can. It does not survive the first storm.",
        ],
      },
      {
        text: "I lost one once. Found it again. Wrong way up.",
        replies: [
          "Ha. Wrong way up. That's how I found my brother's, and he never laughed about it either.",
          "At least you found it. Mine are all at the bottom, keeping the fish company.",
          "A ship upside down is just a very expensive roof for crabs.",
          "I would laugh, but I have seen that sight myself, and the gulls sitting on the keel like mourners.",
          "That is the most honest thing anyone has said to me all week. Thank you, I think.",
        ],
      },
      {
        text: "Yes. I still think about the crew.",
        replies: [
          "So do I, about mine. I say their names on Sundays. The list gets longer and my voice gets shorter.",
          "That's the weight we carry. Nobody tells you a ship is mostly people.",
          "Good. Somebody ought to. The sea certainly doesn't.",
          "I am sorry. Truly. Shall we drink to them? Slowly. They would want it slowly.",
          "Light a candle for them on a saint's day. It does nothing, but it does something to you.",
        ],
      },
    ],
  },
  {
    id: "melancholic-5",
    text: "I had a sweetheart back in the old country. She promised she would wait for me. Her last letter was very kind. It was posted from her wedding.",
  },
  {
    id: "melancholic-6",
    text: "Lovely weather in {town} today, isn't it? I give it until Tuesday before a hurricane flattens the lot of us.",
    answers: [
      {
        text: "It's lovely. Stop worrying.",
        replies: [
          "That is exactly what the last people said. I have their roof tiles in my garden.",
          "I don't worry. Worrying implies hope. I just wait.",
          "Lovely weather is how the sky softens you up. Then it comes back with friends.",
          "You enjoy it. I will stand here and keep an eye on the horizon for both of us.",
          "Fine, fine. I'll stop worrying. I'll start dreading instead. It's more restful.",
        ],
      },
      {
        text: "I'll be long gone by Tuesday.",
        replies: [
          "Wise. Take me with you. I can carry a bucket and complain at the same time.",
          "The hurricanes know that trick. They follow ships out to sea like stray dogs.",
          "Lucky you. I have been leaving by Tuesday for six years.",
          "Leave a forwarding address so I know where to send the news of our deaths.",
          "Off you go, then. Somebody has to survive to tell the story, and it won't be me.",
        ],
      },
      {
        text: "Can I place a wager on Wednesday instead?",
        replies: [
          "Ha. A wager. I'll take it, but I want paying in advance, for obvious reasons.",
          "You may. The odds are poor and the payout is drowning.",
          "Wednesday is the feast of a saint who died in a flood. I think that counts against you.",
          "I like you. You have the right attitude. Doomed, but with a sense of timing.",
          "Put me down for Tuesday at noon. I want to win something before I die.",
        ],
      },
    ],
  },
  {
    id: "melancholic-7",
    text: "The governor of {nationTown} sent us a gift of {merchandise}. Half of it spoiled on the way. I am sure that means something, but I am too tired to work out what.",
  },
  {
    id: "melancholic-8",
    text: "Do you know what I miss most about Europe, {name}?",
    answers: [
      {
        text: "Your family?",
        replies: [
          "Yes. My mother, my sister, my old dog Bartholomew. One of them still writes. Not the dog.",
          "My family, yes. Though by now they will have given my bed to a cousin.",
          "Them most of all. I keep their letters in a tin box. The tin box has rusted. So have I.",
          "My family, and the way the kitchen smelled on a winter evening. Here even the bread sweats.",
          "Yes. I count the years since I saw them. I have run out of fingers twice.",
        ],
      },
      {
        text: "The plague?",
        replies: [
          "Ha. No. Though I admit there was a kind of order to it. Everyone knew where they stood. Mostly lying down.",
          "You joke, but my aunt wrote that she misses it too. It was the only time the neighbours called.",
          "The plague misses me, I think. It keeps writing. Through my sister.",
          "That's very dark. I like you more already.",
          "No, here we have fevers. Much more varied. You never get bored, just dead.",
        ],
      },
      {
        text: "The cold?",
        replies: [
          "Yes. The cold. You don't know how much you love frost until you've spent a summer sweating through a doublet.",
          "Proper cold, with ice on the water barrel. Here the water barrel grows things.",
          "A grey sky, a cold wind and a fire to sit by. That's paradise. This is just weather.",
          "Exactly. In the cold you could shiver and call it the weather. Here I just shiver from sorrow.",
          "The cold. And the honesty of it. Here the sun smiles at you while it cooks you.",
        ],
      },
      {
        text: "No, and I suspect you'll tell me.",
        replies: [
          "I will. It's everything. Thank you for asking.",
          "Rain. Real rain, cold and sideways. You have to have known it to miss it.",
          "Church bells on a Sunday. Here the only bells are ships' bells, and they're always ringing for a burial.",
          "Apples. Proper sour apples. I would trade a doubloon for a single wormy apple.",
          "You see? You already understand me. Most people walk away at this point.",
        ],
      },
    ],
  },
  {
    id: "melancholic-9",
    text: "Every time a ship comes in, I go down to the quay to see if anyone I know is aboard. Nobody ever is. It gives the week a shape.",
  },
  {
    id: "melancholic-10",
    text: "I promised myself I would be back in Europe by Christmas. I didn't say which Christmas. That was the only clever thing I've done in {year}.",
  },
  {
    id: "melancholic-11",
    text: "They're fighting {enemy} again. Do you think it will ever end?",
    answers: [
      {
        text: "Peace is coming. I can feel it.",
        replies: [
          "My grandfather felt it too. He was buried during the third truce.",
          "Peace comes, sits down, has a drink and leaves without paying. Then the war comes back.",
          "I hope you're right. I hoped once before. It cost me a brother.",
          "In Germany they have been fighting for twenty years. Children there think peace is a fairy tale.",
          "What you feel is the rum. I feel it too. It wears off.",
        ],
      },
      {
        text: "It will end when we win.",
        replies: [
          "That's what they said in my father's day. He is still waiting, in a churchyard.",
          "Somebody always wins. Then somebody else starts again. The sea doesn't care whose flag it sinks.",
          "Maybe. But winning looks a great deal like losing from the bottom of the sea.",
          "Brave words. I had brave words once. I traded them for a wooden spoon and a cough.",
          "Then I'll wait. I'm good at waiting. It's my only real talent.",
        ],
      },
      {
        text: "Everything ends. Usually badly.",
        replies: [
          "At last, someone who talks sense. Sit down. I'll pour.",
          "Usually badly. Yes. That should be carved over every harbour in the Caribbean.",
          "You've been reading my letters home, haven't you?",
          "Well put. Badly, and on a Tuesday, when the rain starts.",
          "That's either very wise or very drunk. Either way, I agree.",
        ],
      },
    ],
  },
  {
    id: "melancholic-12",
    text: "My father went down off Ushant with a hold full of salt. My mother always said at least the fish had something to season him with.",
  },
  {
    id: "melancholic-13",
    text: "Would you like to hear a song from home? It's about a girl, a ship and a funeral. Nobody survives, including the tune.",
    answers: [
      {
        text: "Sing away.",
        replies: [
          "Oh, thank you. Nobody ever says that. Right. First verse. She waited on the cliff for seven years...",
          "Lovely. It's only twelve verses. The girl dies in the fourth. Then it gets sad.",
          "Very well. Hum along if you know it. Weep along if you don't.",
          "Ahem. 'The grey sea took my darling.' That's the cheerful bit. It goes downhill from there.",
          "I'll sing it softly. The last time I sang it loudly the barmaid gave notice.",
        ],
      },
      {
        text: "Is there a version where the girl lives?",
        replies: [
          "There was. Nobody sang it. Happy songs don't keep, like milk.",
          "No. In one version the ship lives, but it's very lonely afterwards.",
          "She lives in the first verse. Enjoy her while you can.",
          "You're asking a lot of a folk song. They're not built for that sort of thing.",
          "I could make one up. But you'd know, and so would I, and we'd both feel worse.",
        ],
      },
      {
        text: "I'd rather be keelhauled.",
        replies: [
          "That's in the sixth verse, actually. You'd like it.",
          "Fair enough. My singing has emptied better rooms than this.",
          "Ah. Well. I'll sing it to the gulls. They never complain. They just steal my bread.",
          "Everyone says that until the chorus. Then they say it louder.",
          "Hm. You're not the first. My own mother asked to be buried before the last verse.",
        ],
      },
    ],
  },
  {
    id: "melancholic-14",
    text: "Even the rain in {town} is warm. At home the rain was cold and grey and honest. I never thought I'd be homesick for a different way of being miserable.",
  },
  {
    id: "melancholic-15",
    text: "A ship from {otherTown} came in last week with half the crew down with scurvy. Gums like wet bread. I gave one of them my last lemon. Now I have no lemon. That's charity for you.",
  },
  {
    id: "melancholic-16",
    text: "What brings you to {town}, {title}? Nobody comes here on purpose.",
    answers: [
      {
        text: "Trade, mostly.",
        replies: [
          "Trade. Yes. That's what brought me here too. Twelve years ago. I'm still waiting for the profit.",
          "Buy low, sell high, die somewhere warm. The merchant's prayer.",
          "Mind the prices. They go up the moment a stranger walks in. Like my temper, briefly, before it gives up.",
          "Trade is good. Ships come, ships go. Some of them even come back.",
          "Well, I hope it goes better for you than for the last fellow. He's buried behind the chapel.",
        ],
      },
      {
        text: "I'm looking for treasure.",
        replies: [
          "Aren't we all. I found mine once. It was a woman. She took the rest of my treasure with her.",
          "There's treasure everywhere in the Indies. Mostly at the bottom of the sea, with the people who found it.",
          "Look in the churchyard. Every grave holds someone's fortune, all spent on hope.",
          "I knew a man who found a chest of doubloons. He was so happy he had a seizure. Lovely funeral, though.",
          "If you find any, don't tell me. I'll only worry you'll lose it.",
        ],
      },
      {
        text: "I followed a seagull. It seemed confident.",
        replies: [
          "Ha. Well, that's more planning than most people put into it.",
          "The gulls always look confident. That's how they get you. Then they steal your supper.",
          "And where is the gull now? Gone, I expect. That's gulls for you. And love.",
          "That's the most sensible reason I've heard in a month. I came here following a man with a map. The gull would have done better.",
          "You should have followed it further. Everything is better further away from here.",
        ],
      },
    ],
  },
  {
    id: "melancholic-17",
    text: "They say Cardinal Richelieu never sleeps. Neither do I. But nobody prints pamphlets about me.",
  },
  {
    id: "melancholic-18",
    text: "The letters say King Charles has fallen out with his Parliament, Catalonia is in uproar against King Philip, and Richelieu is squeezing France dry. It's comforting, in a way. All of Europe is as miserable as I am.",
  },
  {
    id: "melancholic-19",
    text: "Do you believe in luck, {name}?",
    answers: [
      {
        text: "You make your own luck.",
        replies: [
          "I tried making my own. It came out lumpy, like my mother's pudding.",
          "Do you? Then make me some. Bad luck is the only kind I can manage on my own.",
          "That's what my cousin said. He made his own luck, then a shark made a meal of him.",
          "A hopeful idea. I'll think about it when I'm feeling stronger. Next year, perhaps.",
          "Perhaps. But the sea makes its own too, and it has more practice.",
        ],
      },
      {
        text: "I'm the luckiest person alive.",
        replies: [
          "Don't say that out loud. The sea listens. So do the tax collectors.",
          "Then please stand a little further from me. I don't want to be nearby when it runs out.",
          "Oh dear. That's what the last luckiest person alive said. We buried him on a Thursday.",
          "Wonderful. Could you spare a little? I'll pay you back in sighs.",
          "Touch wood when you say that. Here, touch my leg. It's mostly wood since the battle.",
        ],
      },
      {
        text: "Only in bad luck.",
        replies: [
          "Ah, a fellow scholar. Bad luck is the only kind that turns up on time.",
          "Yes. Good luck is a rumour. Bad luck has a room upstairs and pays rent.",
          "Now that's faith I can share. Shall we drink to it? Expect the cup to crack.",
          "Wise. Expect nothing and you're only disappointed most of the time.",
          "I've been saying that for years. Nobody listens. Which proves my point.",
        ],
      },
    ],
  },
  {
    id: "melancholic-20",
    text: "I keep a little box of soil from my mother's garden. When I die I want it sprinkled on my grave. Mind you, the box leaks, so by then it will only cover my left foot.",
  },
  {
    id: "melancholic-21",
    text: "Have you ever been in love, {title}?",
    answers: [
      {
        text: "Yes, many times.",
        replies: [
          "Many times. Then you've had your heart broken many times. I only managed it once, but very thoroughly.",
          "How exhausting. I fell in love once and I'm still lying down.",
          "Each one leaves a mark, doesn't it? I'm mostly marks now.",
          "Lucky. Or unlucky. With love I can never tell which until the letter arrives.",
          "Then you know. The Caribbean is full of people running from somebody they love.",
        ],
      },
      {
        text: "Only with the sea.",
        replies: [
          "The sea. Ah. She's cruel. She takes everything and never writes.",
          "A dangerous mistress. Mine took my father, two brothers and a very good hat.",
          "At least the sea is honest. She tells you she'll drown you, and then she does.",
          "I understand. The sea doesn't leave you for a wine merchant from Cadiz.",
          "That's a love that ends one way only. Still, it's more faithful than most.",
        ],
      },
      {
        text: "Yes. With a cannon called Margaret.",
        replies: [
          "Margaret. A good name. I hope she's kinder to you than my Margaret was to me.",
          "Ha. Well, at least she makes a noise when she's happy.",
          "Cannons are loyal. They only turn on you if you mistreat them. Unlike people.",
          "That's the most sensible love I've heard of. She can't run off, she weighs two tons.",
          "Treat her well. When she goes off, she goes off for good. Like my wife.",
        ],
      },
    ],
  },
  {
    id: "melancholic-22",
    text: "Piet Heyn took the whole Spanish silver fleet in 1628 and went home a hero. The next year a cannonball found him. That's the Indies for you. You win everything, then the bill arrives.",
  },
  {
    id: "melancholic-23",
    text: "Every saint's day I light a candle for the ships that never came back. The priest has started offering me candles in bulk.",
  },
  {
    id: "melancholic-24",
    text: "They say the {merchandise} in {enemyTown} is better than ours. Do you think that's true?",
    answers: [
      {
        text: "Yes, much better.",
        replies: [
          "Of course it is. Everything is better somewhere else. That's the rule of the world.",
          "I knew it. Even the enemy has better luck than us.",
          "Well, there's nothing left to do but sit here and feel inferior. I'm good at that.",
          "Thank you for your honesty. It's like a cold knife, but at least it's clean.",
          "Then I'll add it to the list of things I'll never have. The list is getting heavy.",
        ],
      },
      {
        text: "No, theirs is rubbish.",
        replies: [
          "Really? That cheers me up a little. Very little. Don't tell anyone.",
          "Good. Let them suffer. I'm tired of suffering alone.",
          "I don't believe you, but thank you for lying. It's the kindest thing all week.",
          "Rubbish. Hm. Then we're even. Everyone's goods are rubbish. Peace at last.",
          "I'll sleep a little better tonight. Only a little. Something else will keep me up.",
        ],
      },
      {
        text: "I only trade in sorrow, so I couldn't say.",
        replies: [
          "Then we're in the same business. What's your price per sigh? Mine have gone up.",
          "Sorrow. The one cargo that never spoils. I have a warehouse full.",
          "Ha. Careful. The market's flooded. Everybody here is selling.",
          "I'll buy a crate. No, wait, I have plenty. I'll sell you some instead.",
          "You're a strange one. I like that. Sit down, I'll sorrow you a drink.",
        ],
      },
    ],
  },
  {
    id: "melancholic-25",
    text: "I once knew a sailor who swore he would never die at sea. He died in a tavern, choking on salt pork. The sea had arranged it, I'm sure of it.",
  },
  {
    id: "melancholic-26",
    text: "Does anything ever cheer you up, {name}? I'm asking for research. Nothing has worked on me since {year} began.",
    answers: [
      {
        text: "A good cargo and a fair wind.",
        replies: [
          "A fair wind. Yes. I remember those. They blew me here and then stopped.",
          "That sounds lovely. Then the wind changes and the cargo rots. But lovely while it lasts.",
          "I'll try it. Although I have no cargo, no ship and wind only after beans.",
          "Simple joys. That's wise. I make mine more complicated so they can fail in more interesting ways.",
          "Good for you. I'll write it down. Then I'll lose the paper.",
        ],
      },
      {
        text: "Other people's misery.",
        replies: [
          "Then you've come to the right place. Pull up a chair. I'll talk for an hour.",
          "That's cruel. And useful. Here, have some of mine. I've plenty.",
          "Ha. Then I'm the best friend you've ever had.",
          "Is that so? Well, I lost a ship, a wife and a tooth all in one month. Feeling better?",
          "You could make a fortune in this town. Misery is the only crop that never fails here.",
        ],
      },
      {
        text: "Nothing. Never.",
        replies: [
          "Oh, at last. A kindred spirit. Let's sit in silence together. It's what I'm best at.",
          "Never. Good. Hope is just disappointment that hasn't arrived yet.",
          "I'd shake your hand, but I'm too sad to lift my arm.",
          "Well, at least we can be miserable in company. Company is the one comfort left.",
          "You poor soul. Here, take my handkerchief. It's damp already, it saves time.",
        ],
      },
    ],
  },
  {
    id: "melancholic-27",
    text: "The flota sails past {town} loaded with silver, and every coin of it will be spent on some war in Flanders. All that shine, and it ends up as mud and widows.",
  },
  {
    id: "melancholic-28",
    text: "My neighbour married a widow in {month}. In {month}, I tell you. Nobody marries in {month} unless they've given up. I sent a lovely gift. A shroud. It's practical.",
  },
  {
    id: "melancholic-29",
    text: "Did you hear the bells this morning?",
    answers: [
      {
        text: "Yes. What were they for?",
        replies: [
          "A funeral. There's always a funeral. The bell ringer has the strongest arms in town.",
          "Old Tomas, the ropemaker. Fever. He made the rope they lowered him down with. That's craftsmanship.",
          "A wedding, actually. Which is a sort of funeral, if you look at it properly.",
          "A ship lost off the point. Twenty men. The bell rang twenty times. I counted every one.",
          "Nobody knows. They ring them so often now, I think the bells are just lonely.",
        ],
      },
      {
        text: "No. I slept like a stone.",
        replies: [
          "Lucky you. I haven't slept like a stone since I was a child. Now I sleep like a creaking floorboard.",
          "Like a stone. Well, that's how you'll sleep eventually, so you may as well practise.",
          "How peaceful. I lay awake counting the dead. I lost count at fourteen and started again.",
          "Good. Someone should rest. The rest of us are keeping watch over the misery.",
          "Stones don't dream. That's their great advantage.",
        ],
      },
      {
        text: "I thought that was my stomach.",
        replies: [
          "Ha. Then your stomach is in mourning too. Feed it something sad. A turnip.",
          "Your stomach rings like a church? You should see a surgeon. Or a priest.",
          "Ship's biscuit does that. It gets inside you and starts tolling.",
          "Well, it's ringing for your breakfast. Some funerals are smaller than others.",
          "That made me laugh. I'll regret it later, but it made me laugh.",
        ],
      },
    ],
  },
  {
    id: "melancholic-30",
    text: "Somewhere in {nationTown} there's a woman who owes me a kiss and nine pieces of eight. I don't expect either of them back. Mostly the pieces of eight.",
  },
  {
    id: "melancholic-31",
    text: "Do you think anyone back home remembers you, {title}?",
    answers: [
      {
        text: "Of course they do.",
        replies: [
          "How lovely. My family remembers me too. Every time the rent is due.",
          "I'm glad. Write to them. Soon. Before the plague does it for you.",
          "That's comforting. I hope they light a candle. Even a small one. Even a cheap one.",
          "I hope it's true. In my experience, the memory goes first, then the inheritance.",
          "Keep believing it. Belief is cheaper than passage home.",
        ],
      },
      {
        text: "I hope not. I owe them money.",
        replies: [
          "Ha. Then they'll remember you forever. Debt is the only true immortality.",
          "A creditor's memory is longer than a priest's. You'll be in their prayers, I promise.",
          "That's one way to stay in someone's heart. Though it's more their purse.",
          "I owe my landlord in Antwerp three months. He's probably named a dog after me.",
          "Well, at least you'll be talked about. That's more than most of us get.",
        ],
      },
      {
        text: "No. And that's fine.",
        replies: [
          "Is it? I'd cry, but I've run out of tears this week. Next week, perhaps.",
          "Brave. Or numb. In my experience it's hard to tell from the outside.",
          "Then you're freer than I am. I carry them all, like stones in my pockets.",
          "Fine. Yes. That's what I say too. Then I say it again in the dark.",
          "To be forgotten is a sort of peace. Like being buried, but you still get supper.",
        ],
      },
    ],
  },
  {
    id: "melancholic-32",
    text: "An inquisitor once asked me, in my youth, if I'd ever been happy. I said no. He left satisfied. It's the only test I've ever passed.",
  },
  {
    id: "melancholic-33",
    text: "In Flanders they've been at war for longer than I've been alive. My uncle went to fight and came home without his legs. He still says it was the best years of his life. That's how bad the other years were.",
  },
  {
    id: "melancholic-34",
    text: "Would you like a piece of advice, {name}? It's the only thing I have left to give.",
    answers: [
      {
        text: "Go on, then.",
        replies: [
          "Never fall in love with a ship. She'll sink, or she'll be sold, and you'll stand on the dock like a widow.",
          "Write letters home. Every month. One day there will be nobody to read them, and you'll be glad you sent them.",
          "Keep your powder dry and your heart drier.",
          "Don't eat the salt pork after it turns green. Even if it smiles at you.",
          "Careen your ship before the worm gets her. And your soul before the worm gets you.",
        ],
      },
      {
        text: "I don't take advice.",
        replies: [
          "Neither did I. Look at me now. Go on, look. I'll wait.",
          "Good. It never did me any good either. I just thought I'd offer it, like a funeral biscuit.",
          "That's a fine policy. I wish I'd adopted it before I took my father's advice to come here.",
          "Then I'll keep it for myself. I'm running out of things to keep.",
          "Fair. Advice is just regret that wants company.",
        ],
      },
      {
        text: "Only if it's cheerful.",
        replies: [
          "Cheerful? Hm. Let me think. No. No, I've nothing in that line.",
          "Cheerful advice is just a lie with ribbons on it.",
          "Here's the most cheerful thing I know. Everybody dies. So at least you won't be alone.",
          "Well. The sun will rise tomorrow. Probably. Unless there's a hurricane. There's usually a hurricane.",
          "I had some cheerful advice once. It went off in the heat, like the milk.",
        ],
      },
    ],
  },
  {
    id: "melancholic-35",
    text: "The Dutch West India Company sends ships out by the dozen. Half come back with fortunes and half don't come back at all. They call that good odds. I call it a coin toss with widows.",
  },
  {
    id: "melancholic-36",
    text: "I used to have a parrot. It learned only one word, and the word was 'goodbye'. Then it flew off. The parrot had a better sense of drama than I do.",
  },
  {
    id: "melancholic-37",
    text: "Are you staying in {town} long, {title}?",
    answers: [
      {
        text: "Just a few days.",
        replies: [
          "A few days. That's how it starts. I came for a few days. That was nine years ago.",
          "Enjoy them. Days here pass quickly. Years even more so.",
          "Good. Don't let the town get its hooks in you. It's like a widow with a spare room.",
          "Then I'll try to be cheerful for a few days. No promises. I'm out of practice.",
          "Everyone leaves. That's the one thing I can count on.",
        ],
      },
      {
        text: "As long as the rum lasts.",
        replies: [
          "Then you'll be here forever. The rum never runs out. Only the money and the liver.",
          "Ha. That's how I measure time too. In barrels.",
          "Sensible. Rum's the only thing in this town that's improved with age. Not me, certainly.",
          "A man with a plan. Mine is the same, but I've been executing it for years.",
          "Then I'll see you every night. Same table. Same sigh.",
        ],
      },
      {
        text: "I'm leaving right now, actually.",
        replies: [
          "Already? Well. They always go. I'm used to it. Mostly.",
          "Goodbye, then. I'll stand on the quay and wave until you're a dot. Then I'll keep waving.",
          "Right. Of course. Leave me with the gulls. They understand me.",
          "Fair winds. Or not. Whatever the sea decides. She usually decides wrong.",
          "Off you go. I'll count it as another loss. I keep a very detailed list.",
        ],
      },
    ],
  },
  {
    id: "melancholic-38",
    text: "The price of {merchandise} went up again. Everything goes up here except the dead and my spirits.",
  },
  {
    id: "melancholic-39",
    text: "My brother wrote from home. He's had another child. Named him after me. I think it was a warning to the boy.",
  },
  {
    id: "melancholic-40",
    text: "What do you think lies beyond death, {name}?",
    answers: [
      {
        text: "Heaven, I hope.",
        replies: [
          "I hope so too. Though with my luck I'll arrive on a feast day and they'll be full.",
          "Heaven. Yes. I picture it cold and grey with proper rain. Paradise.",
          "Heaven, and everyone I've lost waiting on the quay. That's the only voyage I look forward to.",
          "I hope they let sailors in. We have a reputation.",
          "Amen. I'll save you a seat. Not a good one. The good ones go first.",
        ],
      },
      {
        text: "Nothing. Just darkness.",
        replies: [
          "Darkness. Hm. Restful, at least. No hurricanes. No creditors.",
          "That sounds like the hold of my last ship. Only drier.",
          "Don't say that near a priest. They'll want to save you, and it takes hours.",
          "Darkness. At least nobody can see me crying in it.",
          "I hope not. I've planned so many sad speeches for the afterlife. It would be a waste.",
        ],
      },
      {
        text: "Probably more paperwork.",
        replies: [
          "Ha. Yes. A clerk at the pearly gates asking for my letter of marque.",
          "You've met the harbourmaster, then. He'll be there too. Waiting.",
          "Paperwork. Of course. Even death has customs officers.",
          "That's the most frightening thing anyone has ever said to me. And I've read the plague letters.",
          "I'd laugh, but I suspect you're right. Heaven will want it in triplicate.",
        ],
      },
    ],
  },
  {
    id: "melancholic-41",
    text: "We were careening the ship once and found a barnacle the size of my fist. The captain named it after his wife. She was the only one aboard who clung on that long.",
  },
  {
    id: "melancholic-42",
    text: "They say {nation} rules this town. But the hurricanes rule it, and the fever, and the price of rum. The flag is only there for decoration.",
  },
  {
    id: "melancholic-43",
    text: "Do you know any good jokes? I could use a laugh. Or a reason.",
    answers: [
      {
        text: "Why did the sailor cross the sea? He was lost.",
        replies: [
          "Ha. That's not a joke. That's my life story with a punchline.",
          "Lost. Yes. We're all lost. Very good. I'll tell it at my funeral.",
          "I laughed. Inside. It doesn't show on my face anymore.",
          "That's funny because it's true. Most things that are true are not funny. So well done.",
          "My uncle crossed the sea for that reason. He's still lost. We send letters to the wind.",
        ],
      },
      {
        text: "Your face.",
        replies: [
          "Ha. My mother said the same. On my birthday. Every year.",
          "Fair. It's been through a lot. Mostly sorrow and a little rum.",
          "A good joke. Cruel, but good. Like the sea.",
          "I've seen it in a puddle. It's not funny. It's a tragedy in three acts.",
          "Well, it's made someone laugh at last. It's done its job.",
        ],
      },
      {
        text: "I don't know any jokes.",
        replies: [
          "Neither do I. Only sad stories. Want one? It's about a man who loved a mermaid. It ends badly.",
          "Ah. Then we're both in the wrong trade. Let's be miserable together.",
          "That's all right. The world is joke enough. A very long, unfunny one.",
          "Me neither. My last joke drowned off Hispaniola. Good joke, too.",
          "Then I'll tell you mine. Life. That's it. That's the whole joke.",
        ],
      },
    ],
  },
  {
    id: "melancholic-44",
    text: "I keep a list of everyone I've buried. I've had to start a second book. The first one wasn't sad enough, it had a blue cover.",
  },
  {
    id: "melancholic-45",
    text: "The buccaneers on Hispaniola eat wild cattle smoked over a fire. They seem happy. I'd try it, but happiness gives me indigestion.",
  },
  {
    id: "melancholic-46",
    text: "Do you think you'll ever go back to {playerNation}, {title}?",
    answers: [
      {
        text: "One day, with a fortune.",
        replies: [
          "One day. Yes. That's what we all say. I've been saying it for eleven years. I'm still saving the first coin.",
          "A fortune. Good. Then you can buy a house and be cold and grey in comfort.",
          "I hope you do. And I hope they recognise you. Mine wouldn't. I've gone brown and gloomy.",
          "Go back rich, and they'll call you a pirate. Go back poor, and they'll call you a fool. Choose your insult.",
          "Do it. Then write and tell me what it smells like now. I've started to forget.",
        ],
      },
      {
        text: "Never. I belong out here.",
        replies: [
          "Out here. Yes. Where the sea can find you more easily.",
          "That's brave. Or sad. I've given up telling the difference.",
          "I said the same once. Then I heard a fiddle playing a tune from my village and wept into my soup.",
          "You'll change your mind on your deathbed. Everyone does. Then it's a very long trip.",
          "Belong. Hm. I don't belong anywhere. I'm just between places.",
        ],
      },
      {
        text: "Only if they ask nicely.",
        replies: [
          "Ha. They won't. They never do. My mother's letters start with 'Your cousin is doing very well'.",
          "Asking nicely isn't a thing they do at home. They ask with taxes.",
          "Then you'll be out here forever. Make yourself comfortable. I'll lend you a chair.",
          "That's a good line. I'll use it. Nobody will ask me, but I'll be ready.",
          "Nicely. Ha. The last nice letter I got was to tell me my house had burned down.",
        ],
      },
    ],
  },
  {
    id: "melancholic-47",
    text: "In {month} the hurricanes come. In the other months, I wait for {month}.",
  },
  {
    id: "melancholic-48",
    text: "A sailor from {enemyTown} drank at my table last night. We're supposed to be enemies. We spent the evening agreeing that everything is terrible. It was the best night I've had in years.",
  },
  {
    id: "melancholic-49",
    text: "How was your voyage here?",
    answers: [
      {
        text: "Smooth and pleasant.",
        replies: [
          "Smooth. Hm. That's suspicious. The sea is saving it up for your return.",
          "Pleasant. I'm glad. I've never had a pleasant voyage. I spent my last one being sick into my hat.",
          "Enjoy it. Write it down. When the bad voyages come, you can read about the good one.",
          "Lucky. My voyage here took four months. We ate the cat in the third.",
          "That's lovely to hear. Nobody ever has a smooth voyage. You're either blessed or you're lying.",
        ],
      },
      {
        text: "Storms the whole way.",
        replies: [
          "Ah. Now that's a voyage. Sit down. Tell me everything. Slowly.",
          "Storms. Yes. The sea doesn't like company. Did you lose anyone?",
          "That's the Caribbean. It hugs you like an old friend, then tries to drown you.",
          "You survived. That's something. Not much, but something.",
          "Storms all the way. That's how I came here too. I've been storm-tossed in my heart ever since.",
        ],
      },
      {
        text: "The cook died. We ate better after.",
        replies: [
          "Ha. That's terrible. And very funny. I'll be ashamed of laughing tomorrow.",
          "Sad. And delicious, apparently. Life is full of those.",
          "Our cook died too. We didn't eat better. We ate him. No, I'm joking. Mostly.",
          "That's how it goes. The worst things make room for the slightly less worse things.",
          "Say a prayer for him. Not too long. Your soup's getting cold.",
        ],
      },
    ],
  },
  {
    id: "melancholic-50",
    text: "There's a rumour of plague in {otherTown}. There's always a rumour of plague somewhere. It's the only news that never takes a day off.",
  },
  {
    id: "melancholic-51",
    text: "I heard Portugal is restless under King Philip, and Catalonia has risen against him. Everyone is trying to leave somebody. I understand completely.",
  },
  {
    id: "melancholic-52",
    text: "What's the best thing about life at sea, {name}?",
    answers: [
      {
        text: "The freedom.",
        replies: [
          "Freedom. Yes. Freedom to drown wherever you please.",
          "That's lovely. I felt free once. Then my ship sank and I felt very free indeed, in the water.",
          "Free from everything except the sea. And the scurvy. And the captain.",
          "Freedom. I remember it. It was blue and it tasted of salt and it lied to me.",
          "Hold on to that. It goes, like everything else.",
        ],
      },
      {
        text: "The money.",
        replies: [
          "The money. Of course. Pieces of eight, doubloons, guilders. All of it slips through your fingers like sand.",
          "Money's nice. But you can't take it with you. Unless you're buried with it. Some try.",
          "I had money once. I spent it on a ship. The ship spent itself on a reef.",
          "Honest answer. I respect that. Money is the only lover that never pretends.",
          "Make lots. Then send some home. That's what I meant to do.",
        ],
      },
      {
        text: "Being far away from you.",
        replies: [
          "Ha. Fair. I'm far away from me too. It's the only way I can bear myself.",
          "Well. I've been insulted by better. My wife, mostly.",
          "That's cruel. And funny. I'll weep about it later, in private.",
          "Can I come? I'd like to be far away from me as well.",
          "I knew it. Everybody says it eventually. You just said it sooner.",
        ],
      },
    ],
  },
  {
    id: "melancholic-53",
    text: "I saw a rainbow this morning. Beautiful. Then I remembered it means it's been raining, and something somewhere has drowned.",
  },
  {
    id: "melancholic-54",
    text: "If I die before you leave {town}, would you see to my funeral?",
    answers: [
      {
        text: "Of course I will.",
        replies: [
          "Thank you. I'd like it small. Rain, if possible. And at least one person crying, even if they're paid.",
          "You're kind. I'll leave you my box of soil. And a list of songs. All twelve verses.",
          "That means a great deal. Mind you, I've asked four other people. I'm thorough.",
          "Bless you. Bury me facing home. Whichever way that is. I've lost track.",
          "Good. I'll try to die on a weekday. I wouldn't want to ruin your Sunday.",
        ],
      },
      {
        text: "You're not going to die.",
        replies: [
          "Everyone dies. Some of us just plan ahead.",
          "That's sweet. But I've been coughing since Michaelmas. I've chosen the hymns.",
          "Not today, perhaps. But I like to be ready. I've been ready for years.",
          "You don't know me well. I've nearly died nine times. I'm practically a professional.",
          "Ha. You sound like my mother. She said that, then died first. Rude of her.",
        ],
      },
      {
        text: "Only if there's free food.",
        replies: [
          "There will be. Salt pork and biscuit. The traditional funeral fare. Grim, like me.",
          "Ha. Fair enough. I'll put it in the will. Free food and a sad song.",
          "That's the spirit. Grief goes down easier with a good pie.",
          "Of course. Nobody comes to funerals for the corpse.",
          "I'll leave a barrel of rum. That way at least someone will be happy.",
        ],
      },
    ],
  },
  {
    id: "melancholic-55",
    text: "The Stadtholder in Holland, the King in Spain, the Cardinal in France, the King in England. All of them so busy. None of them have ever once asked how I'm feeling.",
  },
  {
    id: "melancholic-56",
    text: "Will you write to me, {name}, when you've gone?",
    answers: [
      {
        text: "Every month.",
        replies: [
          "Every month. You won't. But it was nice to hear. I'll treasure the lie.",
          "Then I'll wait at the quay every month. It's what I do anyway.",
          "Thank you. Write something sad. Happy letters only make me worry.",
          "I'll keep them in my tin box. Next to the others that never came.",
          "That's kind. I'll write back. In tears, but I'll write back.",
        ],
      },
      {
        text: "I can't write.",
        replies: [
          "That's all right. Neither can half the people who don't write to me.",
          "Then send a drawing. A ship. Sinking. I'll know it's from you.",
          "Oh. Well. Think of me, then. That travels for free.",
          "I'll pretend you write. I do that with my family already.",
          "Fair. Letters only bring bad news anyway. You're sparing me.",
        ],
      },
      {
        text: "I'll write. Will you cheer up?",
        replies: [
          "Cheer up? Hm. You're asking a lot for the price of one letter.",
          "Perhaps. A little. Around Christmas. No promises.",
          "I'll try. I did it once in the summer of thirty-six. It didn't take.",
          "If your letter is long enough, I might manage a smile. A small, sad one.",
          "Ha. You've already cheered me up a little. Now look what you've done. I'll be miserable about it.",
        ],
      },
    ],
  },
  {
    id: "melancholic-57",
    text: "Can I tell you about my wife, {title}? She ran off with a tallow merchant from {otherTown}. I can't light a candle now without thinking of her.",
    answers: [
      {
        text: "I'm so sorry.",
        replies: [
          "Thank you. Most people laugh. Then I light a candle and they stop.",
          "Don't be. She was unhappy with me. To be fair, so was I.",
          "Kind of you. I've forgiven her. Not him. He overcharges for tallow.",
          "It was years ago. The wound has healed into a sort of permanent ache. Like a knee.",
          "Sorrow is all I have left of her. And a single stocking. I don't know whose it is.",
        ],
      },
      {
        text: "So you sit in the dark now?",
        replies: [
          "Mostly. It suits me. Nobody can see my face in the dark, which is a mercy for all of us.",
          "Ha. Yes. I eat my supper by moonlight and feel very sorry for myself.",
          "I tried rushlights. Too cheerful. They flicker like they're laughing.",
          "In the dark I can pretend she's in the next room. Snoring. I miss the snoring.",
          "I've walked into the same table every night for four years. The table is winning.",
        ],
      },
      {
        text: "Lucky man. The tallow merchant, I mean.",
        replies: [
          "Ha. Cruel. Accurate, but cruel.",
          "Lucky? He's married to her now. Give it a year. He'll be the one sitting in the dark.",
          "I'll drink to that. To the tallow merchant. May his wicks always smoke.",
          "That hurt. Good. It's nice to feel something new.",
          "You sound like my mother-in-law. She sent him a wedding gift. She sent me a bill.",
        ],
      },
    ],
  },
  {
    id: "melancholic-58",
    text: "What do you think of {town}, {name}? Be honest. I've given up on being flattered.",
    answers: [
      {
        text: "It's charming.",
        replies: [
          "Charming. Yes. So is a fever, at first. Then it gets warm and confusing.",
          "You haven't been here in the rainy season. It's charming then too, if you like mould.",
          "That's kind. I used to think so. Then I stayed.",
          "It's charming the way an old graveyard is charming. Quiet, pretty and full of people I knew.",
          "Don't tell the governor. He'll be so pleased he'll raise the harbour fees.",
        ],
      },
      {
        text: "It smells of fish and despair.",
        replies: [
          "Yes. The fish is from the market. The despair is mostly me.",
          "Finally, an honest visitor. I could kiss you. I won't. My breath is part of the problem.",
          "That's unfair to the fish. They didn't choose to be here.",
          "You get used to it. Then you go somewhere else and miss it. That's the cruelty of it.",
          "Ha. Put that on the town gate. It would save people the trouble of finding out.",
        ],
      },
      {
        text: "Better than where I've just been.",
        replies: [
          "Everything is better than somewhere. That's the only comfort the world offers.",
          "Then I'm sorry for where you've been. Truly. And a little relieved for me.",
          "Better. Hm. That's the nicest thing anyone's said about this town in years.",
          "Don't tell me where. I'll only start missing it.",
          "Good. Stay a while. Let us disappoint you slowly.",
        ],
      },
    ],
  },
  {
    id: "melancholic-59",
    text: "Have you ever seen a hurricane up close?",
    answers: [
      {
        text: "Yes. I hope I never do again.",
        replies: [
          "You will. They come back, like debts and relatives.",
          "Then you understand. The sky turns green and God looks the other way.",
          "I've seen three. After the third, I stopped repairing my roof. It's just a hat for the wind.",
          "We should form a society. The Brotherhood of the Nearly Blown Away. Meetings in the cellar.",
          "I'm glad you lived. A great many didn't. I knew most of them.",
        ],
      },
      {
        text: "No. Are they bad?",
        replies: [
          "Bad. Ha. Imagine the sea losing its temper and the sky joining in out of loyalty.",
          "One took my house, my boat and my neighbour's goat. The goat came back. Nothing else did.",
          "They're the only thing in the Indies that keeps its promises.",
          "Oh, you sweet thing. Stay near a church when the clouds go strange. It won't help, but it's dry for a bit.",
          "Bad enough that we name our children after the survivors.",
        ],
      },
      {
        text: "I once sailed straight through one, laughing.",
        replies: [
          "Laughing. Of course you were. The madmen always live. It's the worriers that drown.",
          "I don't believe you, but I'd like to. It's a lovely picture.",
          "Was the hurricane laughing too? They have a terrible sense of humour.",
          "That's either the bravest or the stupidest thing I've ever heard. They're usually the same.",
          "Then you're either blessed or already dead. Forgive me for checking your shadow.",
        ],
      },
    ],
  },
  {
    id: "melancholic-60",
    text: "I've been reading the plague letters from home again. Do you want to hear one?",
    answers: [
      {
        text: "If it helps you.",
        replies: [
          "It doesn't. But thank you. 'Dear brother, the baker is dead, the bread is worse.' That's the short one.",
          "You're kind. This one is from my aunt. Mostly a list of names. And a recipe for onion soup.",
          "It helps a little to be heard. It's like opening a window in a sickroom.",
          "Thank you. I'll read the one where nobody dies. It's very short. It's just the date.",
          "Kind of you. Most people cross the street when they see my letters.",
        ],
      },
      {
        text: "Only if nobody dies.",
        replies: [
          "Then I have nothing for you. Even the cheerful ones end with a funeral.",
          "There's one where the dog lives. I'll read you that bit and stop there.",
          "Nobody dies? That's not a letter. That's a miracle.",
          "Ha. You don't know my family. They die for attention.",
          "I'll skip to the weather. It rained. That's the happy part.",
        ],
      },
      {
        text: "Do they have pictures?",
        replies: [
          "One has a drawing of a skull. My nephew did it. He's six. It's very good.",
          "Pictures. Ha. My sister draws a little cross by each name. It's very tidy.",
          "No. But the paper is stained. I like to think it was tears. It was probably soup.",
          "Pictures are for children. These are for grown-ups who've given up.",
          "Just a smudge where she pressed too hard writing 'buried'. That's art, in its way.",
        ],
      },
    ],
  },
  {
    id: "melancholic-61",
    text: "Have you heard the news from {enemyTown}?",
    answers: [
      {
        text: "No, what happened?",
        replies: [
          "Fever. Of course. It's always fever. Or fire. Or a governor. Usually all three.",
          "A ship went down in the harbour. In the harbour. You can't even trust shallow water now.",
          "Nothing. Absolutely nothing. That's the most frightening news of all. Something's coming.",
          "Their church roof fell in during a sermon on humility. God has a cruel sense of humour.",
          "I don't know. I just assume it's bad. It saves time.",
        ],
      },
      {
        text: "I don't care about the enemy.",
        replies: [
          "No? I do. Their misery is the only kind I can enjoy without guilt.",
          "Fair. But they bleed and bury the same as us. I've seen it.",
          "That's a hard heart. Useful out here. Mine went soft years ago, like a bad apple.",
          "Neither did I, once. Then I married one. Briefly.",
          "Fine. I'll keep it to myself. It was very sad. You'd have liked it.",
        ],
      },
    ],
  },
  {
    id: "melancholic-62",
    text: "Do you have any family, {title}?",
    answers: [
      {
        text: "A big one, back home.",
        replies: [
          "How lovely. Write to all of them. One of them is sick right now, I promise you.",
          "Big families are wonderful. More people to miss. More people to miss you.",
          "Then you're rich in a way I'm not. My family fits on the back of a playing card.",
          "Hold them close, even from here. Especially from here.",
          "A big family. That means a big funeral one day. Plenty of mourners. That's a comfort.",
        ],
      },
      {
        text: "My crew is my family.",
        replies: [
          "Then I hope they're kinder than mine. Mine sold my bed.",
          "A good crew is worth more than blood. Though they bleed just as easily.",
          "That's lovely. And dangerous. You'll grieve every man you lose like a brother.",
          "Then you have a family who eats salt pork and swears in their sleep. Very much like mine, actually.",
          "Look after them. I had a crew once. Now I have a list of names.",
        ],
      },
      {
        text: "Only a goat. She's very understanding.",
        replies: [
          "A goat. Ha. That's more family than most people out here have.",
          "Goats are loyal. Mine stayed with me through two hurricanes and a broken engagement.",
          "Understanding. Yes. They listen, they don't judge, and they eat the letters before you read them.",
          "I'd swap my relatives for a goat. Fewer letters about money.",
          "Give her my regards. Tell her I'm sad. She'll understand.",
        ],
      },
    ],
  },
  {
    id: "melancholic-63",
    text: "Would you share a drink with me, {name}? I hate drinking alone. It makes the sorrow feel underappreciated.",
    answers: [
      {
        text: "Of course. To absent friends.",
        replies: [
          "To absent friends. All of them. That's going to take a while. Pace yourself.",
          "Thank you. I'll drink to mine, you drink to yours. We'll be here till dawn.",
          "To absent friends. And absent ships. And my absent front tooth.",
          "Ah. You know the right words. I may cry. Ignore it, it's the rum.",
          "Absent friends. They're the only kind I have left. Bless you for remembering them.",
        ],
      },
      {
        text: "Only if you're paying.",
        replies: [
          "Paying. Yes. Of course. I always pay. In coin and in sorrow.",
          "Ha. Fair. The rum costs less than the company, they tell me.",
          "I'll pay. Then I'll lie awake counting what I spent. It's my only hobby.",
          "Done. Though my purse is so thin it's practically a ghost.",
          "Very well. But you have to listen to one story. It's about my brother. He drowned. It's a short one.",
        ],
      },
      {
        text: "No. Your sorrow might be catching.",
        replies: [
          "It is. Half the town has it now. The other half has fever.",
          "Ha. Sensible. I'll sit at the other end of the table and sigh in your direction.",
          "Too late. You've been talking to me for a while. You're doomed.",
          "Fair. I'll drink alone, then. Alone and slowly, like a proper tragedy.",
          "It's not catching. It's inherited. My mother had it, and her mother. We're a very old family of sighs.",
        ],
      },
    ],
  },
]
