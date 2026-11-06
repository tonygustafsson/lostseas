import "server-only"

export const FRANCE_NPC_LINES: Record<string, DialogueEntry[]> = {
  "martinique-tavern-babette-garnier": [
    {
      id: "martinique-tavern-babette-garnier-1",
      text: "Sit, sit, {title}. Everyone who comes to Saint Pierre ends up at my bar sooner or later, and I hear everything they say on the way in.",
    },
    {
      id: "martinique-tavern-babette-garnier-2",
      text: "Have you heard what the governor's wife said to the priest after Mass last Sunday?",
      answers: [
        {
          text: "No, tell me everything.",
          replies: [
            "She said his sermon was so long her candle died of old age. Father Mathieu has not spoken to her since. Bliss for everyone.",
            "Lean closer. She told him she confesses every week so he never runs out of work. The man turned the colour of claret.",
            "She asked him to bless her new parrot. The parrot then repeated something it learnt from the governor. Half of {town} heard it.",
            "Oh, I knew you had good taste. She told him the Company pays him too much for Latin nobody understands. True, but you do not say it in church.",
            "She asked whether a sin committed in the tropics counts the same as one in France. He is still writing to Rome about it.",
          ],
        },
        {
          text: "I make a point of never listening to gossip.",
          replies: [
            "Then you are sitting in the wrong tavern, {title}. Try the church. No, wait, they gossip there too.",
            "Very noble. You will still be listening when I tell the next table, mark my words.",
            "Nobody ever listens to gossip. They simply happen to be standing nearby with their mouths open.",
            "My Jacques said the same thing, God rest him. He was the last man in Saint Pierre to learn he had been promoted.",
            "Fine, fine. Then you will not want to know what they say about you down at the harbour. Pity. It was flattering.",
          ],
        },
        {
          text: "I already know. I was the priest.",
          replies: [
            "You? With that face? Father Mathieu has fewer teeth and more chins. Nice try, {title}.",
            "Ha! Then you owe me an absolution and a drink. I will take the drink first.",
            "If you were the priest, then who has been drinking my communion wine every Thursday? Do not answer that.",
            "Oh, I am telling everyone that one. By tonight the whole island will think the priest is a sea captain.",
            "Then confess, Father. What did the governor's wife really say? I will keep it secret. For at least an hour.",
          ],
        },
      ],
    },
    {
      id: "martinique-tavern-babette-garnier-3",
      text: "My Jacques marched in the King's army for twelve years and died here of a fever and a bad oyster. I still say the oyster did more damage.",
    },
    {
      id: "martinique-tavern-babette-garnier-4",
      text: "So, {title}, any news from {otherTown}? I pay for good stories in rum.",
      answers: [
        {
          text: "A merchant there married his cousin's widow.",
          replies: [
            "His cousin's widow! Was the cousin dead first, or is that the interesting part? Pour, pour, keep talking.",
            "Oh, that is worth a full cup. I knew a woman in Saint Pierre who married her husband's brother at the funeral. Saved on the flowers.",
            "Scandalous. Delicious. I shall improve it a little before passing it on, of course.",
            "I wonder if she wore black to the wedding. Practical, really. One dress, two ceremonies.",
            "Good. Half the island will have it by supper, and the other half by breakfast.",
          ],
        },
        {
          text: "Nothing at all happens in {otherTown}.",
          replies: [
            "Nothing happens anywhere until someone like me hears about it. You simply do not look hard enough.",
            "Then you were not drinking in the right places, {title}. No rum for you.",
            "Nothing? Not a duel, not an affair, not even a runaway pig? What a sad, sad town.",
            "That is the dullest thing anyone has said to me since my Jacques described his boots.",
            "Next time, bribe a washerwoman. They know more than any governor's clerk.",
          ],
        },
        {
          text: "The whole town has turned into goats.",
          replies: [
            "Goats! Well, it would explain the smell in their harbour. Go on, which goat is the governor?",
            "I have heard sillier things about {otherTown}, but not many. Have a small rum, for effort.",
            "If that is true, their tavern keeper must be furious. Goats are terrible tippers.",
            "Do not laugh, {title}. In my trade, a story like that travels faster than the truth. It will be round the island by Sunday.",
            "I shall tell the Company men. They will send a tax collector to count the goats, and good riddance to him.",
          ],
        },
      ],
    },
    {
      id: "martinique-tavern-babette-garnier-5",
      text: "They say the {enemyAdjective} have spies in every French port. Nonsense. If there were a spy in Saint Pierre, I would know his mother's maiden name by Tuesday.",
    },
    {
      id: "martinique-tavern-babette-garnier-6",
      text: "Tell me honestly, {name}. Married? Courting? Running from someone? I only ask so I know which story to tell about you.",
      answers: [
        {
          text: "Married, and happily.",
          replies: [
            "Happily married and at sea for months. Yes, I suppose that would keep anyone happy.",
            "How sweet. I shall say you are married to a jealous princess. It makes a better story.",
            "Good for you. Mine was happy too, until the oyster. Treasure every day, {title}.",
            "Happily married sailors are the rarest fish in the sea. I may have you stuffed and mounted above the bar.",
            "Then keep your hands off the barmaids and I will keep your name out of my mouth. Mostly.",
          ],
        },
        {
          text: "Running from three creditors and a duchess.",
          replies: [
            "A duchess! Which one? No, do not tell me, I will guess. It is more fun when I am wrong.",
            "Three creditors is nothing. A duchess, now, that is a proper chase. Does she have a navy?",
            "I knew it the moment you walked in. You have the look of someone who owes money to someone with a crest.",
            "Sit in the back corner, then. The duchess's men will not find you, but the creditors drink here on Fridays.",
            "Oh, I am going to dine out on this for a year. Thank you, {title}. Truly.",
          ],
        },
        {
          text: "That is none of your business.",
          replies: [
            "Everything on this island is my business. I simply have not been paid for it yet.",
            "Mysterious. Wonderful. Now I can make up whatever I like, and you only have yourself to blame.",
            "None of my business is the best kind of business. I shall find out anyway, you know.",
            "Fine. I will tell them you are a wanted man from {enemyTown} with a wooden heart. Your choice.",
            "That is what the governor said, and now I know about his gout, his debts and his cook.",
          ],
        },
      ],
    },
    {
      id: "martinique-tavern-babette-garnier-7",
      text: "If you hear anything about the Company of the Islands and our dear Governor Aubert, bring it to me first. Before the planters. Before the priest. Before God, if you can manage it.",
    },
  ],

  "martinique-market-etienne-boulanger": [
    {
      id: "martinique-market-etienne-boulanger-1",
      text: "Do not whistle near my stall, {title}. I mean it. The last man who whistled here bought a barrel of salt fish and drowned in a puddle within the week.",
    },
    {
      id: "martinique-market-etienne-boulanger-2",
      text: "Before we trade, did you step into my stall with your left foot or your right?",
      answers: [
        {
          text: "The right, of course.",
          replies: [
            "Good. Good. The right foot is the honest foot. We may do business.",
            "Praise the saints. A left footed customer once cost me a whole crate of cocoa. Come in, come in.",
            "The right. Excellent. Now touch the post three times and we can talk prices.",
            "I knew it. You have the face of a right footed person. Very rare in {town}.",
            "Then the stars are with us today. Mostly. Let me just check my salt bag.",
          ],
        },
        {
          text: "The left.",
          replies: [
            "The left! Step out, step out, and come in again properly. I cannot sell to a left foot.",
            "Holy Mother. Quick, turn round three times and spit over the rail. No, the other rail.",
            "Ah. Well, prices are now slightly higher. To cover the bad luck, you understand.",
            "My cousin stepped into a church with his left foot. The roof fell in. Not all of it, but enough.",
            "Wait there. I have a pinch of salt for exactly this sort of disaster.",
          ],
        },
        {
          text: "I hopped in on both, to confuse the spirits.",
          replies: [
            "Both? Nobody has ever... that is either very clever or very dangerous. I need to sit down.",
            "Hmm. The spirits hate confusion. Or they love it. My grandmother never settled the matter.",
            "You jest, {title}, but in {otherTown} there is a man who has hopped everywhere for ten years. He has never been robbed.",
            "Clever. Very clever. I may start doing it myself, though my knees would object.",
            "Do not mock the spirits. They have long memories and very little else to do.",
          ],
        },
      ],
    },
    {
      id: "martinique-market-etienne-boulanger-3",
      text: "I lost a whole hold of cocoa off {nationTown} because a cabin boy whistled at a gull. The gull was fine. The cocoa was not. The cabin boy is now a priest, which is probably for the best.",
    },
    {
      id: "martinique-market-etienne-boulanger-4",
      text: "Do you have any black cats on your ship? Ravens? A priest? Priests are the worst luck at sea, God forgive me for saying so.",
      answers: [
        {
          text: "We have a ship's cat, and she is black.",
          replies: [
            "A black cat aboard! Do you want to meet the bottom of the sea in person?",
            "Hmm. Some say a black cat at sea is lucky. Others say the opposite. I say both, to be safe.",
            "Give her a saucer of milk on Fridays and never let her walk anticlockwise round the mast.",
            "My brother had a black cat. The cat outlived him, three ships and a hurricane. Make of that what you will.",
            "Well, at least she will eat the rats. Rats are worse luck than cats, everyone knows that.",
          ],
        },
        {
          text: "No, my crew is clean of every omen.",
          replies: [
            "Nobody is clean of every omen. I would check under their hammocks if I were you.",
            "Good. Keep it that way. No whistling, no red heads at the bow, no bananas.",
            "Clean of omens? Then why is there a gull following you? Look, there.",
            "That is what the captain of the Saint Jean said. They found his hat in {otherTown}. Only the hat.",
            "Very good, {title}. Fortune likes a tidy ship.",
          ],
        },
        {
          text: "My cook is a priest, a raven and a black cat all at once.",
          replies: [
            "That is not a cook, that is a curse in an apron. Throw him overboard. Gently.",
            "All three? Holy saints. And does he whistle as well? Do not answer, I could not bear it.",
            "Now you are mocking me. But I will cross myself anyway. Better twice than never.",
            "A man like that could sink a ship just by stirring the soup clockwise.",
            "Tell me his name, so I never eat anything he has touched.",
          ],
        },
      ],
    },
    {
      id: "martinique-market-etienne-boulanger-5",
      text: "Every coin you hand me, I rub with salt first. Not because I distrust you, {title}. Because I distrust the coin.",
    },
    {
      id: "martinique-market-etienne-boulanger-6",
      text: "Do you carry a charm against storms? Hurricane season is no time to sail without one.",
      answers: [
        {
          text: "I trust in God and a good hull.",
          replies: [
            "God, yes. The hull, less so. Hulls have been known to let a man down.",
            "Very sensible. But God helps those who also carry a rabbit's foot. It is in the Bible, somewhere.",
            "A good hull. Good. Have you knocked on it lately? Three times, with the left hand?",
            "My last captain trusted in God and a good hull. He is with God now. The hull is off {nationTown}.",
            "Then let me sell you a little bag of salt to go with it. Only a small one. God will not mind.",
          ],
        },
        {
          text: "I carry a lucky boot.",
          replies: [
            "A boot? Which foot? It matters enormously, {title}.",
            "I have never heard of a lucky boot. I have heard of an unlucky one, but that is a long and sad story.",
            "Interesting. My uncle carried a lucky spoon. He was eaten by a shark, but the spoon survived.",
            "Does it still have the foot in it? No? Shame. Feet are terribly lucky.",
            "Keep it dry. A wet boot loses its luck. Everybody knows that.",
          ],
        },
        {
          text: "I am the charm. Storms fear me.",
          replies: [
            "Do not say that out loud! Storms have ears. Big, wet, angry ears.",
            "That is exactly what the captain of the Belle Marie said. I sold her figurehead last spring.",
            "Pride, {title}. Pride is the heaviest thing a ship can carry.",
            "Knock on wood, quickly. No, not my head. Wood.",
            "I will light a candle for you. Possibly two. You are going to need them.",
          ],
        },
      ],
    },
    {
      id: "martinique-market-etienne-boulanger-7",
      text: "A woman in {town} told me Friday sailings are cursed. A man in {otherTown} told me Tuesday sailings are cursed. I have not left the island in six years.",
    },
  ],

  "martinique-governor-bertrand-aubert": [
    {
      id: "martinique-governor-bertrand-aubert-1",
      text: "Welcome to {town}, {title}. I serve the Company of the Islands with every breath I take. Most of the breaths, at any rate.",
    },
    {
      id: "martinique-governor-bertrand-aubert-2",
      text: "A captain hears things at sea, {name}. Tell me, what do the planters say about me?",
      answers: [
        {
          text: "That you are a fair and loyal servant of the Company.",
          replies: [
            "How kind of them. And how unlike them. Which planter said it? I should like to reward him. Or watch him.",
            "Loyal. Fair. Yes. You may repeat that wherever you go. Especially in Paris.",
            "Splendid. When people praise you, {title}, it usually means they want something. I shall find out what.",
            "Do they really? I must have been more careful than I thought.",
            "Then my efforts have not been wasted. Some of them have been very expensive.",
          ],
        },
        {
          text: "That you skim the sugar duties.",
          replies: [
            "Skim? Such a vulgar word. I prefer to say I take a gentle interest in the sugar.",
            "And who, exactly, said that? I only ask so I can send him a gift. A large, heavy gift.",
            "Rumours. Every governor in the islands is accused of skimming. The clever ones are never proved to.",
            "The sugar duties are perfectly in order, {title}. Both sets of books agree on that.",
            "Interesting. I had heard they suspected me of the rum duties. I must be slipping.",
          ],
        },
        {
          text: "Mostly they talk about your coat.",
          replies: [
            "As well they should. It is the only thing on this island cut by a proper Paris tailor.",
            "My coat? Good. While they stare at the coat, they do not look at the pockets.",
            "Ha. Planters. They wear the same shirt for a week and call a clean collar a scandal.",
            "Tell them it cost more than their harvest. It is not true, but it will annoy them.",
            "A man should always give people something to talk about, {title}. Preferably something harmless.",
          ],
        },
      ],
    },
    {
      id: "martinique-governor-bertrand-aubert-3",
      text: "The Cardinal's people read every letter that leaves this island. Which is why I write two of each and send only the boring one.",
    },
    {
      id: "martinique-governor-bertrand-aubert-4",
      text: "Would you call yourself a discreet person, {title}?",
      answers: [
        {
          text: "As silent as the grave.",
          replies: [
            "Excellent. I know a few graves on this island that are rather talkative, so I shall hold you to a higher standard.",
            "Good. Graves are reliable. Planters are not. Clerks are worse.",
            "Then one day I may have a small errand for you. Small, quiet and very well paid.",
            "I like that answer. I also like that it costs me nothing yet.",
            "Silence is the finest currency in the islands, {title}. Better than livres, and the Company cannot tax it.",
          ],
        },
        {
          text: "I tell everyone everything.",
          replies: [
            "How refreshing. And how useful. Remind me to tell you a great many false things.",
            "Then we shall be the best of friends, and I shall tell you nothing at all.",
            "Honesty. In {town}. I may have to put you in a glass case.",
            "Hm. Babette at the tavern would like you. She will also like everything you tell her.",
            "Then you are no use to me as a confidant, but priceless as a messenger.",
          ],
        },
        {
          text: "Discreet? Sorry, I was not listening.",
          replies: [
            "Ha. A good answer. Possibly the best answer anyone has ever given me.",
            "Perfect. A man who does not listen can never be made to repeat anything.",
            "You have a gift, {title}. Many courtiers in Paris would kill for a face that empty.",
            "Then I shall say everything important twice. Once for you, and once for whoever is behind the curtain.",
            "Good. Keep not listening. I may need it later.",
          ],
        },
      ],
    },
    {
      id: "martinique-governor-bertrand-aubert-5",
      text: "This coat came out from Paris on a ship that the {enemyAdjective} chased halfway across the ocean. The coat arrived. The ship's captain did not. I find it best not to ask how.",
    },
    {
      id: "martinique-governor-bertrand-aubert-6",
      text: "If the Company asked you whether I keep honest books, {name}, what would you tell them?",
      answers: [
        {
          text: "That you are honesty itself.",
          replies: [
            "Beautifully said. You will go far in {town}. Not too far, though. I like to keep friends close.",
            "Honesty itself. I may have that carved over my door. In small letters.",
            "Good. Practise saying it with a straight face. The Company's inspectors are very good at faces.",
            "Thank you, {title}. You have just made a powerful friend, and a cheaper harbour fee.",
            "Excellent. And if they ask which books, you will look confused. That part comes naturally, I hope.",
          ],
        },
        {
          text: "That I have never seen your books.",
          replies: [
            "Quite right. Nobody has seen my books. That is rather the point of them.",
            "The truth, and entirely useless to them. I could not have put it better myself.",
            "Careful, {title}. Truth is a sharp tool. One usually cuts oneself with it.",
            "Good. Should you ever see them, I would expect you to forget them promptly.",
            "Perfect. A man who knows nothing cannot be made to say anything. Keep it that way.",
          ],
        },
        {
          text: "That they are the finest fiction in the Caribbean.",
          replies: [
            "Ha! I shall take that as praise for my imagination, which is considerable.",
            "Fiction is such an ugly word. I prefer 'creative bookkeeping in the service of France'.",
            "Say that to the Company and you will find your ship's papers have gone mysteriously missing.",
            "Clever tongue. I could use a clever tongue. I could also cut one out, but let us stay friends.",
            "Finest fiction. Yes. Better than anything they print in Paris, and far more profitable.",
          ],
        },
      ],
    },
    {
      id: "martinique-governor-bertrand-aubert-7",
      text: "The {enemyAdjective} are our enemies, naturally. Officially. Unofficially, an enemy who buys sugar at a good price is merely a customer with a poor accent.",
    },
  ],

  "biloxi-tavern-yves-bouvier": [
    {
      id: "biloxi-tavern-yves-bouvier-1",
      text: "Forty years I sailed this Gulf after beaver and deer hides. The sea took two fingers, three ships and all my hair, and I still say it was a fair trade.",
    },
    {
      id: "biloxi-tavern-yves-bouvier-2",
      text: "My knee is aching something cruel today. Did you see the sky to the south on your way into {town}?",
      answers: [
        {
          text: "Clear as glass.",
          replies: [
            "Clear today. My knee says otherwise for tomorrow. Trust the knee, {title}. The sky lies.",
            "Hm. Then it is the rum making the knee ache. That has happened before.",
            "Clear skies on the Gulf are like a smiling customs man. Enjoy it, but count your fingers.",
            "Good. Then sail before dawn and be in harbour by dusk. The knee is rarely wrong by more than a day.",
            "Clear as glass, and glass breaks. Keep your boats lashed down.",
          ],
        },
        {
          text: "Black clouds, low and heavy.",
          replies: [
            "I knew it. This knee has never been wrong. Well, once, but I was drunk and it was the other knee.",
            "Then stay in port and buy an old man a drink. Nobody sane sails into that.",
            "Low and heavy. That is a hurricane clearing its throat. Double your lines tonight.",
            "Forty years and I have seen many clouds like that. Most of the men who sailed into them I have not seen again.",
            "Get your ship into the bayou and pray. The pelican knows to hide, and so should you.",
          ],
        },
        {
          text: "I never look up. It is bad for the neck.",
          replies: [
            "Ha! Then you will never see the storm that kills you. Some might call that a mercy.",
            "Bad for the neck, good for the neck. The neck will not matter much at the bottom of the Gulf.",
            "I sailed with a man like that. He walked into the mast every morning for six years. Lovely fellow.",
            "Young people. In my day we looked up, down and sideways, and still we drowned.",
            "Then let my knee do the looking for you, {title}. It charges less than a pilot.",
          ],
        },
      ],
    },
    {
      id: "biloxi-tavern-yves-bouvier-3",
      text: "Young sailors trust their charts. Old sailors trust their knees. Dead sailors trusted their charts.",
    },
    {
      id: "biloxi-tavern-yves-bouvier-4",
      text: "What do you sail, {title}? Tell me she has a proper keel and is not some bathtub from {otherTown}.",
      answers: [
        {
          text: "A sturdy merchantman.",
          replies: [
            "Sturdy is good. Fast is good. Sturdy and fast is a lie told by shipwrights.",
            "A merchantman. Then keep her low in the water and your eyes on the horizon. Pirates love a fat hull.",
            "Good. My first ship was a sturdy merchantman. She sank anyway, but very sturdily.",
            "Look after her, and she will look after you. Neglect her, and she will tell you about it at night.",
            "A sensible choice. Sensible ships get old. Like sensible sailors. Like me.",
          ],
        },
        {
          text: "A swift little sloop.",
          replies: [
            "A sloop! Lovely in the shallows. On the open Gulf in a blow, she will toss you like a pancake.",
            "Swift is good when you need to run. And on this coast, you always need to run eventually.",
            "I ran pelts in a sloop for twelve years. Slept wet every night of it. Best years of my life.",
            "Keep her close to shore and watch the sandbars. The Gulf has eaten more sloops than sharks.",
            "Little, eh? Then you will learn the sea properly. Big ships make soft sailors.",
          ],
        },
        {
          text: "A bathtub from {otherTown}, as it happens.",
          replies: [
            "Ha! Then you have more courage than sense. That is how all the best sailors start.",
            "A bathtub. Well, at least you will always be clean, right up until you drown.",
            "I once crossed a bay in a barrel. A bathtub would have been luxury.",
            "Does she have a name? Every bathtub deserves a name. Mine would be the Soap Dish.",
            "Keep bailing and keep laughing, {title}. The sea respects a fool who is having fun.",
          ],
        },
      ],
    },
    {
      id: "biloxi-tavern-yves-bouvier-5",
      text: "I got these tattoos in four ports and remember getting two of them. One is an anchor. The other might be a woman, or possibly a turnip.",
    },
    {
      id: "biloxi-tavern-yves-bouvier-6",
      text: "Have you ever been through a real hurricane, {name}?",
      answers: [
        {
          text: "Yes, and I never want to again.",
          replies: [
            "Then you have learnt the only lesson the sea teaches for free. The rest she charges for.",
            "Nobody wants to twice. Some of us were simply too stupid to stay ashore. Me, for instance.",
            "I have seen five. After the third, I stopped being afraid and started being very, very tired.",
            "Good. A sailor who fears the hurricane lives to complain about his knees.",
            "Then let us drink to the ones who did not come through. There are always some.",
          ],
        },
        {
          text: "Not yet.",
          replies: [
            "Not yet. Remember those words. You will think of them the day it happens.",
            "When it comes, get your topmasts down early and lash yourself to something that floats.",
            "Lucky. Pray it stays that way, and listen to old men with sore knees.",
            "You will know it when you see it. The sky goes green, the birds vanish and the sea goes very, very quiet.",
            "Then buy an old man a drink and I will tell you how to survive one. It might be worth it.",
          ],
        },
        {
          text: "Several. I find them refreshing.",
          replies: [
            "Refreshing! Ha! The last man who said that to me is now a coral reef off {nationTown}.",
            "Refreshing, he says. I lost two fingers to refreshing. Here, look.",
            "You are either a liar or a madman, {title}. In either case, I like you.",
            "The sea has heard you, you know. She will want to refresh you properly next time.",
            "Then you will not mind sleeping in the yard tonight. The rain is coming.",
          ],
        },
      ],
    },
    {
      id: "biloxi-tavern-yves-bouvier-7",
      text: "When I first came to this coast there was nothing but marsh, mosquitoes and native traders who drove harder bargains than any Paris merchant. Now there is marsh, mosquitoes and a governor.",
    },
  ],

  "biloxi-market-margot-besson": [
    {
      id: "biloxi-market-margot-besson-1",
      text: "Do admire the hat, {title}. Everyone does. It was a gift from a duke. Or a count. A very tall man with a carriage, at any rate.",
    },
    {
      id: "biloxi-market-margot-besson-2",
      text: "Have you ever been to Paris, {name}? I was practically born at court.",
      answers: [
        {
          text: "Yes, I know Paris well.",
          replies: [
            "Then you will know the palace. The big one. With the windows. I was there constantly.",
            "Wonderful. Which street? No, wait, it does not matter, I lived on all the important ones.",
            "Ah, then you have surely heard of me. No? They must have changed the gossip since I left.",
            "Did you see the Queen? We were very close. Practically sisters. I do not remember her name either.",
            "Then you understand how dreadful it is to sell goods in {town} after all that splendour.",
          ],
        },
        {
          text: "No, never.",
          replies: [
            "Oh, you poor thing. Let me describe it. It is very large, very grand and the bread is better.",
            "Never? Then you would not know if I was lying. Not that I am. I simply mention it.",
            "You must go. Tell them Margot sent you. They will be thrilled. Or confused. Both, probably.",
            "Paris is wasted on most people anyway. It needs someone with a proper hat to appreciate it.",
            "Then I shall be your Paris, {title}. Look at me. That is roughly what it is like.",
          ],
        },
        {
          text: "I was born at court too. In the stables.",
          replies: [
            "The stables! Well, I suppose someone has to be. I was in the main building. Mostly.",
            "Ha. You jest, but I knew a stable boy who became a marquis. Or was he a marquis who became a stable boy?",
            "Then you will have smelled my duke's horses. Lovely animals. Better manners than most courtiers.",
            "How charming. We are practically neighbours. Mine had a ceiling, of course.",
            "I shall pretend I did not hear that. A woman of my standing cannot be seen talking to stable folk.",
          ],
        },
      ],
    },
    {
      id: "biloxi-market-margot-besson-3",
      text: "I sell the finest goods in all of {town}. Admittedly there are only three stalls, and one of them is a man selling a single goat, but still.",
    },
    {
      id: "biloxi-market-margot-besson-4",
      text: "Did I mention my duke? Do you think he will come across the sea for me one day?",
      answers: [
        {
          text: "Surely he will.",
          replies: [
            "I know! Any day now. I keep my best cloak ready. Which is why I wear it every day.",
            "Of course he will. He was utterly devoted. I just cannot remember to which address I gave him.",
            "You have such good taste, {title}. Do come back and buy something when you are rich.",
            "He will arrive in a golden ship with a hundred servants and a band. I shall pretend to be surprised.",
            "Thank you. The goat seller laughed at me when I asked him. I raised my prices by spite.",
          ],
        },
        {
          text: "I suspect he has forgotten you.",
          replies: [
            "Forgotten me? Nobody forgets me. They merely remember me very quietly.",
            "How dare you. Although, to be fair, I have forgotten him a little.",
            "Then it is his loss. There are plenty of dukes. I shall simply find a closer one.",
            "Hmph. You sound exactly like my mother. She also said he was a carter.",
            "Impossible. I have a feather from his hat. Well, from a hat. Possibly his.",
          ],
        },
        {
          text: "He came yesterday. You were out.",
          replies: [
            "What?! Which way did he go? Did he leave a message? Did he ask about the hat?",
            "Yesterday! I was at the well. Why does fate always strike when I am at the well?",
            "You are teasing me. I can tell, because your nose did a little wiggle. But tell me what he looked like anyway.",
            "Oh, I knew it. He was probably tall. Was he tall? Please say he was tall.",
            "Then he will come back. A duke does not cross an ocean to visit a goat seller.",
          ],
        },
      ],
    },
    {
      id: "biloxi-market-margot-besson-5",
      text: "In {nationTown} they told me my velvet cloak was too warm for the climate. I told them elegance does not sweat. Then I fainted twice before noon.",
    },
    {
      id: "biloxi-market-margot-besson-6",
      text: "What is the grandest thing you have ever done, {title}? Go on. Try to outdo me.",
      answers: [
        {
          text: "I sank three {enemyAdjective} warships in one afternoon.",
          replies: [
            "Three? I once made four men faint at a single ball. Simply by entering the room.",
            "Very good. But did you do it wearing a hat like mine? No? Then I win.",
            "Impressive. My duke sank five. Or he talked about it. One of those.",
            "Oh, warships, how ordinary. Everyone in {town} claims to have sunk a few.",
            "Lovely. When I write my memoirs, I shall mention you in a footnote. A small one.",
          ],
        },
        {
          text: "I once traded a barrel of rum for a pearl.",
          replies: [
            "A pearl. Charming. I was once given a whole necklace. I lost it, but I was given it.",
            "Only one pearl? My duke threw pearls at swans for fun. They hated it.",
            "Not bad, {title}. Not bad at all. Was it a large pearl? Larger than my feather?",
            "Good trade. Bring the pearl here and I will give you a ribbon for it. A very fine ribbon.",
            "Ah. Quaint. I traded a smile for a whole carriage ride once.",
          ],
        },
        {
          text: "I once had lunch.",
          replies: [
            "Lunch. Well. That is certainly a thing you did. I had lunch with a duke.",
            "You had lunch? How bold. How daring. I am almost impressed.",
            "Ha! You are mocking me, but at least you are honest. Was it a good lunch?",
            "I suppose for some people, lunch is an achievement. I shall not judge. Openly.",
            "Then we are equal, {title}. I also had lunch. Mine had a silver fork.",
          ],
        },
      ],
    },
    {
      id: "biloxi-market-margot-besson-7",
      text: "Some say I am vain. Untrue. I simply happen to be the most beautiful, clever and well connected woman on the Gulf, and it would be dishonest to pretend otherwise.",
    },
  ],

  "biloxi-governor-alain-turgot": [
    {
      id: "biloxi-governor-alain-turgot-1",
      text: "Welcome to {town}, {title}. Mind the mud, the mosquitoes and the sergeant. In that order of danger.",
    },
    {
      id: "biloxi-governor-alain-turgot-2",
      text: "You have the look of someone who has seen a fight. Were you ever a soldier?",
      answers: [
        {
          text: "Yes, I served.",
          replies: [
            "I thought so. You stand like a man who expects to be shouted at. Sit, then. Nobody shouts here.",
            "Then you know what a long march feels like. Here, every day is a long march through a swamp.",
            "Good. Most of my men think a musket is a walking stick. I could use a few more of you.",
            "Which campaign? No, do not tell me. All wars smell the same after a week.",
            "Then we understand each other. Old soldiers do not need many words.",
          ],
        },
        {
          text: "No, never.",
          replies: [
            "Good. Keep it that way. The sea is cruel, but at least it does not make you dig trenches.",
            "Lucky. I would not wish a siege on anyone, not even the {enemyAdjective}.",
            "Then you still have both ears and all your illusions. Treasure them.",
            "Fair enough. Half my garrison was never a soldier either. You can tell by how they hold a spade.",
            "Soldiering is mostly waiting, marching and burying friends. You have missed very little.",
          ],
        },
        {
          text: "I once fought a goose. It was a draw.",
          replies: [
            "A draw is respectable. Geese are vicious. I have seen grenadiers flee from one.",
            "Ha. You laugh, but my sergeant lost a fight to a heron last month. He still has the scar.",
            "Then you have more combat experience than half my garrison.",
            "Never underestimate the enemy, {title}. That is the first lesson of war, and also of geese.",
            "A draw. Hm. Did the goose hold its ground? Then the goose deserves a medal too.",
          ],
        },
      ],
    },
    {
      id: "biloxi-governor-alain-turgot-3",
      text: "I fought for the Cardinal at La Rochelle. A long siege, hunger, fever. Then they sent me here, where it is much the same, only wetter.",
    },
    {
      id: "biloxi-governor-alain-turgot-4",
      text: "The {enemyAdjective} are restless, they say. Have you seen their sails near our coast?",
      answers: [
        {
          text: "Yes, a frigate off the islands.",
          replies: [
            "A frigate. Then I will double the watch tonight. That means one more man, so the watch will be two.",
            "Thank you, {title}. I will write to Paris. Paris will thank me in about eight months.",
            "Which direction was she heading? No matter. I have four cannons and three of them work.",
            "I have seen too many wars start with one frigate. Watch yourself on the way out.",
            "Good report. You would have made a decent scout. Sit, have some of our terrible wine.",
          ],
        },
        {
          text: "Not a single one.",
          replies: [
            "Good. Though in my experience, the sails you do not see are the ones to worry about.",
            "Thank God. My garrison has fever, and the powder is damp. A quiet coast suits us fine.",
            "Then the {enemyAdjective} have more sense than to come here. Even the enemy has standards.",
            "Quiet is good. Quiet is very good. I have earned some quiet.",
            "Perhaps they have heard about the mosquitoes. The best defence we have.",
          ],
        },
        {
          text: "I saw a mosquito the size of a frigate. Does that count?",
          replies: [
            "It counts. It probably carries more guns than my fort.",
            "Ha. If it flies the {enemyAdjective} flag, sink it. If not, do not bother. It will only come back with its family.",
            "I would not be surprised. I swear one stole my breakfast this morning.",
            "That is the first sensible report I have had in weeks. I shall add it to the log.",
            "The mosquitoes here are the only enemy I have never beaten. Not even close.",
          ],
        },
      ],
    },
    {
      id: "biloxi-governor-alain-turgot-5",
      text: "This musket ball was meant for my heart. It hit my belt buckle instead. I wear it to remind me that luck is a poor substitute for armour.",
    },
    {
      id: "biloxi-governor-alain-turgot-6",
      text: "Tell me plainly, {title}. Is there anywhere in the Caribbean worse than {town} in summer?",
      answers: [
        {
          text: "Nowhere, my lord.",
          replies: [
            "Thank you. Finally, someone honest. Will you write that down for Paris?",
            "I knew it. I asked the priest the same question and he said hell. He is very loyal to hell.",
            "Then I am governor of the worst place in the Caribbean. I should get a medal for that, at least.",
            "Good to hear it said aloud. It makes the itching bearable.",
            "Nowhere. Yes. That is what my wife said, right before she sailed home to France.",
          ],
        },
        {
          text: "{enemyTown} is worse.",
          replies: [
            "Is it? Good. I find it a great comfort that the {enemyAdjective} are also suffering.",
            "Then I shall sleep better tonight. Not well, but better.",
            "Worse? Truly? You have made an old soldier very happy, {title}.",
            "I would like to believe you. But I have seen my sergeant's legs after a night patrol here.",
            "Then let us drink to the suffering of {enemyTown}. Long may it last.",
          ],
        },
        {
          text: "I find it rather charming.",
          replies: [
            "Charming. I have been called many things, but never charming. Neither has this swamp.",
            "You have fever, {title}. Sit down, have some water, and let the surgeon look at you.",
            "Stay a month and then tell me. I will be waiting, scratching.",
            "Charming. Hm. Perhaps you would like to take my post? It comes with a free mosquito net.",
            "That is either the bravest or the stupidest thing anyone has said in this room.",
          ],
        },
      ],
    },
    {
      id: "biloxi-governor-alain-turgot-7",
      text: "Paris writes to ask why the colony does not grow faster. I write back that the swamp eats one settler in three. They write back asking for more taxes.",
    },
  ],

  "tortuga-tavern-manon-artaud": [
    {
      id: "tortuga-tavern-manon-artaud-1",
      text: "Do not touch the fish, {title}. That fish has kept every hurricane off {town} for three seasons. Mostly.",
    },
    {
      id: "tortuga-tavern-manon-artaud-2",
      text: "Hold still while I read your foam. Hmm. Do you want the truth, or the pleasant version?",
      answers: [
        {
          text: "The truth, always.",
          replies: [
            "Brave. The foam says you will face a great danger at sea. It also says you need a bath.",
            "The truth? The bubbles have gathered on the left. That means money, or possibly a broken mast.",
            "It says you will meet a tall stranger. On Tortuga, that is not much of a prophecy.",
            "The foam is murky today. Either fate is uncertain or the barrel needs cleaning.",
            "I see a sail, a storm and a chest. Whether the chest is full of gold or your belongings, I cannot say.",
          ],
        },
        {
          text: "The pleasant version, please.",
          replies: [
            "Wise. The pleasant version says you will grow rich, live long and never meet a kraken.",
            "As you wish. You will find love, fortune and a very good hat. Drink up.",
            "Pleasant it is. The foam is smiling at you. Foam rarely smiles. Treasure it.",
            "You will have fair winds all season. That is what the foam says, and I am not arguing with it.",
            "Good choice. My mother only ever gave buccaneers the pleasant version. Fewer knives drawn.",
          ],
        },
        {
          text: "Just the rum, without the prophecy.",
          replies: [
            "Too late. The prophecy comes free. You cannot have one without the other.",
            "Fine. But do not come crying to me when a seagull steals your hat. The foam warned you.",
            "You sound like a buccaneer. They all say that, until the storm comes.",
            "No prophecy, then. That will be one rum and a very sulky look from the fish.",
            "As you wish. I will keep your fortune in a jar, in case you change your mind.",
          ],
        },
      ],
    },
    {
      id: "tortuga-tavern-manon-artaud-3",
      text: "My mother told the fortune of every buccaneer in the coves. She told one he would die rich. He drowned holding a chest of silver, so technically she was right.",
    },
    {
      id: "tortuga-tavern-manon-artaud-4",
      text: "What season were you born in, {name}? It matters more than you would think.",
      answers: [
        {
          text: "In spring.",
          replies: [
            "Spring! Ah, a child of new winds. You will always find a fresh start, but rarely keep it.",
            "Spring people are lucky with cargo and unlucky with love. Or the other way round. Mother was never clear.",
            "Good. Spring captains never drown in spring. Avoid the autumn, though.",
            "I thought so. You have the look of someone who blooms then wilts. No offence.",
            "Spring. That explains why the fish twitched when you walked in.",
          ],
        },
        {
          text: "In winter.",
          replies: [
            "Winter. A cold birth. You will be steady in a storm, but you will never enjoy a party.",
            "Ah. Winter folk are hard to curse. That is good, on this island.",
            "Then carry a red ribbon. Winter souls need warmth, or the sea notices them.",
            "My mother was born in winter. She outlived three husbands and a hurricane.",
            "Winter. That is why the foam went still when you leant over it.",
          ],
        },
        {
          text: "I was not born. I was found in a barrel.",
          replies: [
            "A barrel! Rum or salt fish? It matters enormously for your fortune.",
            "That explains a great deal. Barrel children are lucky at sea and terrible at cooking.",
            "Do not joke. My mother found two babies in barrels in the coves. Both became quartermasters.",
            "Then you have no stars to read, only staves. I shall have to read your hand instead.",
            "Found in a barrel. Hmm. Did it float? Then the sea already likes you.",
          ],
        },
      ],
    },
    {
      id: "tortuga-tavern-manon-artaud-5",
      text: "Three knocks on the bar before you sail, a coin in the sea when you leave, and never, ever say the word 'drown' aboard a ship. Oh. I just said it. Pardon me while I spit.",
    },
    {
      id: "tortuga-tavern-manon-artaud-6",
      text: "Has anything strange happened on your voyages, {title}? Lights on the water? Voices in the rigging?",
      answers: [
        {
          text: "Yes, green lights one night.",
          replies: [
            "Green lights. Saint Elmo's, or the dead. Was it cold? If it was cold, it was the dead.",
            "That is the lanterns of drowned sailors, looking for their ships. Did you wave? Never wave.",
            "My mother saw green lights off the coves the night before a Spanish raid. Be careful.",
            "Write it in your log and leave a coin for them next time. The dead appreciate manners.",
            "Green is a warning, {title}. Gold would have been a gift. Green means turn back.",
          ],
        },
        {
          text: "Nothing but wind and waves.",
          replies: [
            "Then you are not looking properly. The sea is full of signs, if you know how to read them.",
            "That is what the dead say too. Well. Before they are dead.",
            "Good. Some captains come in here white as sailcloth. I prefer customers who still have colour.",
            "The wind and the waves are signs as well. Did they blow from the left? No? Good.",
            "Lucky you. Keep an eye out on the next new moon. Things wake up then.",
          ],
        },
        {
          text: "The figurehead winked at me.",
          replies: [
            "She winked? Which eye? The left is a warning, the right means she fancies you.",
            "Ah, a living figurehead. Bring her a ribbon and some wine, and she will look after you.",
            "Do not laugh. A buccaneer's figurehead here once cried real tears. It was rain, but still.",
            "Then she likes you. Figureheads choose their captains. Most choose badly.",
            "Hmm. Was it before or after the rum? It matters for the reading.",
          ],
        },
      ],
    },
    {
      id: "tortuga-tavern-manon-artaud-7",
      text: "The buccaneers laugh at my fish. Then a storm comes, they run in here soaking wet, and suddenly every one of them wants to kiss it.",
    },
  ],

  "tortuga-market-blaise-chamfort": [
    {
      id: "tortuga-market-blaise-chamfort-1",
      text: "Welcome, {title}. I buy, I sell, and I do not ask questions. Questions cost money, and I prefer to keep mine.",
    },
    {
      id: "tortuga-market-blaise-chamfort-2",
      text: "Got anything to sell? I pay a fair price. Fair for me, anyway.",
      answers: [
        {
          text: "A hold full of honest cargo.",
          replies: [
            "Honest cargo. On Tortuga. How exotic. I may have to charge you a little extra for the novelty.",
            "Honest is good. Honest has fewer angry owners turning up at my stall.",
            "Then bring it here. I will weigh it, judge it and offer you rather less than you hoped.",
            "Honest cargo sells at honest prices, {title}. Which is to say, low.",
            "Good. My last honest seller was in {nationTown}, about three years ago. I miss him.",
          ],
        },
        {
          text: "Nothing today.",
          replies: [
            "Nothing? Then you are costing me time, and time is the only thing I cannot resell.",
            "Pity. Come back when your hold is full, or when someone else's hold is empty.",
            "Fine. But tell your friends. I pay in silver, I count slowly and I forget quickly.",
            "Then buy something. I have a fine silk neckerchief, barely bloodstained.",
            "Nothing, he says. Everyone has something, {title}. Even if it is only gossip.",
          ],
        },
        {
          text: "A slightly used kraken.",
          replies: [
            "How slightly? If it still has all its arms, I could give you forty pieces of eight.",
            "A kraken. Hmm. Fresh, or salted? Salted travels better.",
            "I bought half a mermaid once. Turned out to be a large fish and a hairy sailor. Still made a profit.",
            "Bring it in and I will not ask where it came from. As usual.",
            "Ha. Funny. But if you ever do find one, come to me first. The buccaneers would pay a fortune for the tale alone.",
          ],
        },
      ],
    },
    {
      id: "tortuga-market-blaise-chamfort-3",
      text: "I got this nose in {otherTown} haggling over a barrel of nails. The other man got a worse nose and a better price, so we call it even.",
    },
    {
      id: "tortuga-market-blaise-chamfort-4",
      text: "Where did your cargo come from, {name}? No, wait. Do not tell me. I sleep better that way.",
      answers: [
        {
          text: "I bought it honestly in {nationTown}.",
          replies: [
            "Of course you did. Everybody does. Remarkable how many ships fall out of {nationTown} with no papers.",
            "I believe you entirely. You can tell because I am not even looking at you.",
            "Wonderful. Honest goods are lovely. They do not come with bullet holes.",
            "Good. Then you will not mind if I pay you an honest price. Which is to say, mine.",
            "Bought honestly. I shall write that in my ledger, in very small letters.",
          ],
        },
        {
          text: "Let us say the {enemyAdjective} will not miss it.",
          replies: [
            "Ah. Then it is patriotic cargo. I always give a little more for patriotic cargo. A very little.",
            "Say no more. I did not hear that. I am also slightly deaf on Tuesdays.",
            "The {enemyAdjective} never miss anything, {title}. They simply complain about it in letters.",
            "Good. If anyone asks, it came from a shipwreck. Shipwrecks are very generous around here.",
            "I sell to the {enemyAdjective} as well, you know. I may sell it back to them next week.",
          ],
        },
        {
          text: "It washed up in a crate labelled 'not stolen'.",
          replies: [
            "Then it is clearly not stolen. The crate says so. I trust crates more than captains.",
            "Ha. I have seen that crate before. It washes up on this island about once a fortnight.",
            "Perfect. I will put it on the shelf next to the barrels labelled 'definitely mine'.",
            "Excellent provenance. Better than half the paperwork I see from the Company.",
            "With a label like that, it is practically legal. I will give you a fair price. For Tortuga.",
          ],
        },
      ],
    },
    {
      id: "tortuga-market-blaise-chamfort-5",
      text: "The buccaneers bring me hides and silver, the merchants bring me livres, and I give them both a smile. The smile is the only thing I give away for free.",
    },
    {
      id: "tortuga-market-blaise-chamfort-6",
      text: "Tell me, what sells best in {otherTown} these days? Information is the only cargo I pay full price for.",
      answers: [
        {
          text: "Sugar, as always.",
          replies: [
            "Sugar. Always sugar. Since Barbados started planting it, half the Caribbean has a sweet tooth and a sour planter.",
            "Hm. Everyone says sugar. Which means soon nobody will be able to sell it. Thank you, {title}.",
            "Useful. Here, one piece of eight. Do not spend it all on rum.",
            "Sugar. I knew that, but it is good to have it confirmed by someone who has smelled the harbour.",
            "Then I shall buy cheap here and sell dear there, like every honest thief in the islands.",
          ],
        },
        {
          text: "I have no idea.",
          replies: [
            "No idea? A captain with no idea is like a merchant with no scales. Dangerous to everyone.",
            "Then you have nothing to sell me, not even gossip. A sad state of affairs.",
            "Keep your ears open next time. Ears are cheaper than cannons and more profitable.",
            "Pity. I would have paid you. Not much, but more than nothing.",
            "Nobody has any idea, {title}. The trick is to pretend you do and charge accordingly.",
          ],
        },
        {
          text: "Hats. Enormous hats.",
          replies: [
            "Enormous hats. The governor here would buy every one. The bigger the better.",
            "Hm. You jest, but I once made a fortune on Dutch wooden shoes. Never underestimate fashion.",
            "Enormous hats. I shall write it down. If you are right, I owe you a drink. If you are wrong, you owe me a hat.",
            "Funny. But not wrong. Have you seen our governor? He wears his wealth on his head.",
            "If they sell, I will sell them. If they do not, I will sell them to someone who thinks they will.",
          ],
        },
      ],
    },
    {
      id: "tortuga-market-blaise-chamfort-7",
      text: "The reading glasses are for contracts. The broken nose is for men who think the reading glasses make me soft.",
    },
  ],

  "tortuga-governor-ignace-jobert": [
    {
      id: "tortuga-governor-ignace-jobert-1",
      text: "You stand before the Governor of {town}, appointed by His Majesty Louis XIII. You may now bow. Lower. Lower still. Adequate.",
    },
    {
      id: "tortuga-governor-ignace-jobert-2",
      text: "Do you know the correct form of address for a royal governor, {title}?",
      answers: [
        {
          text: "Your Excellency.",
          replies: [
            "Correct. How refreshing. Most of my visitors say 'oi' and spit.",
            "Very good. You may approach. Two steps. No, three is too many. Back one.",
            "Excellent. At last, a captain with breeding. Or at least someone who has met one.",
            "Correct, and with an almost tolerable accent. I am impressed, {title}.",
            "Splendid. I may waive this week's bowing fine on the strength of it.",
          ],
        },
        {
          text: "Hey, you.",
          replies: [
            "Hey, you?! Guard! Fine this person five livres for impertinence and two for grammar.",
            "Hey, you. Hey, you. I have not been so insulted since a buccaneer called me 'mate'.",
            "One more like that and you will be bowing to me from inside a cell.",
            "I shall pretend I did not hear that. My hearing is very selective, and so is my mercy.",
            "This is Tortuga, {title}, not a fish market. Well. Not only a fish market.",
          ],
        },
        {
          text: "Your Featheriness.",
          replies: [
            "Your... Featheriness? That is not a title. Although it does have a certain dignity.",
            "How dare you. These are ostrich feathers, imported at enormous cost. They deserve respect.",
            "I should fine you. But it is the first time anyone has noticed the feathers. Ten livres, then.",
            "Your Featheriness. Hm. Write that down, clerk. No, do not. Burn the paper.",
            "Insolent. Quite charming. But insolent. Bow again, and properly this time.",
          ],
        },
      ],
    },
    {
      id: "tortuga-governor-ignace-jobert-3",
      text: "I have fined forty buccaneers this year for slovenly bowing. Three for piracy. One must have priorities.",
    },
    {
      id: "tortuga-governor-ignace-jobert-4",
      text: "What do you think of my hat? Be honest. Within reason.",
      answers: [
        {
          text: "Magnificent, Your Excellency.",
          replies: [
            "Yes. Yes, it is. Few appreciate it. Fewer still can afford one.",
            "Thank you. It took three ostriches and a very brave milliner in Paris.",
            "Correct answer. The last man who called it 'a bit much' now cleans the cannons.",
            "Magnificent. I shall have that inscribed on the hat box.",
            "You have taste, {title}. Unusual on {town}. Most here think a hat is something you wipe your blade on.",
          ],
        },
        {
          text: "It has a lot of feathers.",
          replies: [
            "It has exactly the right number of feathers. Three. A royal number.",
            "A lot? There is no such thing as a lot of feathers. Only too few.",
            "Your observation is accurate but lacks admiration. Try again, with more awe.",
            "That is the sort of remark a buccaneer would make. Are you a buccaneer? Be careful how you answer.",
            "A lot. Yes. Each one costs more than your ship's rum ration for a year.",
          ],
        },
        {
          text: "I think a bird is still living in it.",
          replies: [
            "There is no bird in my hat! There was, once, but it has been evicted.",
            "Outrageous. And also, quiet. If there is a bird, it is a royal bird and has my permission.",
            "Ha. Ha. Very droll. The buccaneers say the same thing. I fine them as well.",
            "That is twelve livres, {title}. Ten for insolence and two for being right.",
            "Hm. That would explain the noises at night. Clerk! Fetch the cat.",
          ],
        },
      ],
    },
    {
      id: "tortuga-governor-ignace-jobert-5",
      text: "In Paris I danced before the Queen. On {town} I dance around puddles of rum and the occasional sleeping buccaneer. Such is the sacrifice of royal service.",
    },
    {
      id: "tortuga-governor-ignace-jobert-6",
      text: "Have you ever been presented at court, {name}?",
      answers: [
        {
          text: "Yes, at the Louvre.",
          replies: [
            "The Louvre! Then you understand. You are the first person on this island who does.",
            "Indeed? Then you know how to stand, how to bow and how to look bored. Splendid.",
            "Ah, then we are practically equals. Practically. Not entirely, of course.",
            "Did you see the Cardinal? Did he notice you? He never noticed me. I was crushed for a week.",
            "Then I may invite you to dinner. Wear a clean collar. Bring no buccaneers.",
          ],
        },
        {
          text: "No, never.",
          replies: [
            "Of course not. Never mind. Not everyone can be born to it. Most cannot even be taught.",
            "A pity. Court is where one learns that a bow is a weapon. Mine has defeated many.",
            "Then watch me closely. This is how a gentleman stands. Notice the knee.",
            "I shall teach you the basics. Five livres a lesson. A bargain, considering.",
            "Never? Then you have my sympathy, {title}, and very little else.",
          ],
        },
        {
          text: "I was presented with a bill once.",
          replies: [
            "A bill. How very common. I am presented with bills daily. I ignore them with great elegance.",
            "Ha. Droll. I shall allow it, because I am in a forgiving mood and the wine is good.",
            "That is not a presentation, that is an ambush. Bills are the buccaneers of Paris.",
            "I hope you bowed to it. One should always bow to a creditor. It confuses them.",
            "Then you have been presented to the most powerful man in France. The tailor.",
          ],
        },
      ],
    },
    {
      id: "tortuga-governor-ignace-jobert-7",
      text: "The buccaneers call this island a pirate den. I call it a fort under royal administration with a regrettable number of earrings.",
    },
  ],

  "leogane-tavern-aubin-laclos": [
    {
      id: "leogane-tavern-aubin-laclos-1",
      text: "Aubin Laclos, at your service. Perhaps you have heard of me? Twice round the world, {title}. Twice! The second time just to check it was still round.",
    },
    {
      id: "leogane-tavern-aubin-laclos-2",
      text: "Have you ever crossed the line, {title}? The equator? I have crossed it so often it waves at me.",
      answers: [
        {
          text: "Yes, many times.",
          replies: [
            "Many times. Well, I have crossed it more. Both ways. Sometimes on the same day.",
            "Then you will know the ceremony. They dunked me twelve times. I asked for more.",
            "Ah, a fellow line crosser. What did you think of the... um... the line? Very linear, I thought.",
            "Many times? Then you must have seen me. I was the one standing heroically at the bow.",
            "Splendid. Then we can swap stories. You go first. Mine are much longer.",
          ],
        },
        {
          text: "No, never.",
          replies: [
            "Never! Oh, you must. It is very wet and very... equatorial. I recommend it highly.",
            "Then I shall describe it. There is a line. You cross it. Everyone cheers. It is splendid.",
            "No matter, {title}. Not everyone can be a legendary navigator. Some must stay home and admire us.",
            "Ah. Then you will not be able to check my stories. Excellent. I mean, what a pity.",
            "You are better off. On my second crossing a mermaid proposed. Very awkward.",
          ],
        },
        {
          text: "I tripped over it once.",
          replies: [
            "Tripped over it? It is not a rope. It is an imaginary... wait, how did you trip over it?",
            "Ha! Yes. Yes, I tripped too. Everyone trips the first time. It is the custom.",
            "That is very funny, {title}, but some of us take navigation seriously. Very, very seriously.",
            "I once stood on it with one foot in each half of the world. Neither half was impressed.",
            "You tripped? Then you have crossed it with more style than most sailors.",
          ],
        },
      ],
    },
    {
      id: "leogane-tavern-aubin-laclos-3",
      text: "This rapier has tasted the blood of a hundred men. It is merely being polite now, which is why it stays in the scabbard.",
    },
    {
      id: "leogane-tavern-aubin-laclos-4",
      text: "What is the most dangerous voyage you have made? Mine was to Tortuga. Er, I mean, round Cape Horn. Twice.",
      answers: [
        {
          text: "Running the {enemyAdjective} blockade.",
          replies: [
            "The {enemyAdjective}! Ha, I have run their blockades blindfolded. Well, with my eyes closed. Out of boredom.",
            "Ah, a brave one. I respect that. I would have done it faster, of course, but I respect it.",
            "Dangerous, yes. Not as dangerous as the Horn, mind. The Horn has waves like cathedrals.",
            "Excellent. We shall sail together one day, {title}. You can carry my bags.",
            "Did you see me there? I was the ship that got away. Very quickly. Heroically quickly.",
          ],
        },
        {
          text: "The trip to Tortuga is hardly dangerous.",
          replies: [
            "Not dangerous! The waves! The wind! The... the... the swell! You were not on my boat.",
            "Easy for you to say. You did not have my stomach. I mean my sense of adventure.",
            "I did not say Tortuga. I said Cape Horn. You must have misheard. It is very loud in here.",
            "Well, it is dangerous if you do it properly. Leaning over the rail. For the view.",
            "Hm. Keep your voice down, {title}. There are ladies present, and they believe in me.",
          ],
        },
        {
          text: "Crossing this tavern after listening to your stories.",
          replies: [
            "Ha! Very good. Very sharp. Not as sharp as my rapier, but sharp.",
            "You mock, but my stories have made grown men weep. Mostly from laughter, but still.",
            "Jealousy, {title}. I see it often. Do not worry, it passes.",
            "The barmaid says the same. She is clearly in love with me.",
            "Then sit and let me tell you another. You will need a second drink to survive it.",
          ],
        },
      ],
    },
    {
      id: "leogane-tavern-aubin-laclos-5",
      text: "The ladies of {town} cannot resist the moustache. I twirl it clockwise for charm and anticlockwise for menace. Nobody has noticed the menace yet.",
    },
    {
      id: "leogane-tavern-aubin-laclos-6",
      text: "Would you like to hear about the time I fought a sea serpent off the coast of {otherTown}?",
      answers: [
        {
          text: "Please do.",
          replies: [
            "It was a dark night. Very dark. The serpent was huge. Very huge. I hit it. It left. The end.",
            "Splendid. It was forty fathoms long, with eyes like lanterns. I disarmed it with a single riposte.",
            "Finally, an audience. Sit. Get comfortable. This takes about three hours if I do the voices.",
            "The serpent rose from the waves. I said, 'Not today, monster.' And it went away, embarrassed.",
            "Of course you want to hear it. Everyone does. The serpent still writes to me.",
          ],
        },
        {
          text: "I would rather not.",
          replies: [
            "Rather not? But it has a serpent! And me! Two of the most dangerous creatures in the sea!",
            "Your loss, {title}. Half the ladies of {town} swooned at that story. The other half left.",
            "Fine. I will tell it to the barmaid again. She pretends very convincingly.",
            "Very well. But you will hear it eventually. Everyone does. It is unavoidable, like weather.",
            "That is what the serpent said, right before I struck.",
          ],
        },
        {
          text: "Was it the same one I fought? It mentioned you.",
          replies: [
            "It mentioned me? Favourably? What did it say about the moustache?",
            "Ah. Ha. Well. The serpent is a known liar. Whatever it said, it was me who won.",
            "You fought it too? Then we are brothers in arms. Or in fins. You know what I mean.",
            "Impossible. I slew it. Unless it had a brother. They do run in families.",
            "Hm. You are teasing me, {title}. I can tell, because I am a master of reading people.",
          ],
        },
      ],
    },
    {
      id: "leogane-tavern-aubin-laclos-7",
      text: "Seasick? Me? Never. That was simply my stomach saluting the ocean. Repeatedly. All the way to Tortuga and back.",
    },
  ],

  "leogane-market-adele-bonnaire": [
    {
      id: "leogane-market-adele-bonnaire-1",
      text: "Indigo, {title}? The finest blue on Hispaniola. My husband used to say it was the colour of the sea at dawn. He said a great many hopeful things.",
    },
    {
      id: "leogane-market-adele-bonnaire-2",
      text: "Are you married, {name}? Or do you keep your heart at sea?",
      answers: [
        {
          text: "I am married.",
          replies: [
            "Then go home to them as often as the wind allows. Time is shorter than it looks from here.",
            "Good. Tell them you love them before every voyage. I always thought there would be another chance.",
            "Married. That is lovely. Take them a piece of indigo cloth. Blue suits nearly everyone.",
            "Henri and I were married eighteen years. I would give the whole stall for one more ordinary morning.",
            "Then you have something worth sailing home for. Not everyone in {town} can say that.",
          ],
        },
        {
          text: "My heart belongs to the sea.",
          replies: [
            "The sea is a jealous partner, {title}. She keeps everything she is given.",
            "So did Henri's, in a way. He loved this island more than was good for him.",
            "Be careful. The sea gives nothing back. I have watched her take ships and never return a single sailor.",
            "Then you will never be lonely, I suppose. Only wet, and often frightened.",
            "I understand. At least the sea does not make promises it cannot keep.",
          ],
        },
        {
          text: "My heart belongs to my ship's cook. He makes excellent soup.",
          replies: [
            "Ha. Well, Henri won my heart with a pear tart, so I cannot judge you.",
            "Soup is a fine reason to love someone. Better than many reasons I have heard.",
            "Oh, that made me smile, {title}. I do not do that as often as I should.",
            "Keep him, then. A good cook is worth more than a good navigator, some days.",
            "Henri could not boil an egg. I loved him anyway. Perhaps your cook will love you back.",
          ],
        },
      ],
    },
    {
      id: "leogane-market-adele-bonnaire-3",
      text: "Henri planned rows of indigo as far as the eye could see. The fever took him in our first summer, and the plants never came up. I sell other people's indigo now.",
    },
    {
      id: "leogane-market-adele-bonnaire-4",
      text: "Do you ever think of going home to France, {title}?",
      answers: [
        {
          text: "Often.",
          replies: [
            "So do I. Then I remember the cold, the rain and that Henri is buried here. And I stay.",
            "There is a little church in Normandy where I was married. I think of it every morning.",
            "France will still be there. That is the comfort of a country. It waits.",
            "Then go, while you still have someone waiting. Do not leave it too long.",
            "I write to my sister every season. Her letters take so long to arrive that the news is always old and sad.",
          ],
        },
        {
          text: "Never. The sea is my home.",
          replies: [
            "Then I hope she is a kinder home to you than this island has been to me.",
            "A home that moves. Perhaps that is wise. Nothing can be lost if nothing stays still.",
            "Henri said that about {town}. He never meant to leave either. He did not.",
            "I envy you a little. To belong nowhere means nowhere can break your heart.",
            "Then may your home always float, {title}.",
          ],
        },
        {
          text: "France? Is that the one with the cheese?",
          replies: [
            "Ha. Yes, the one with the cheese. And the rain, and the taxes, and my mother.",
            "Oh, do not. I have not had a proper cheese in eleven years. You have made me hungry and sad at once.",
            "That is all most sailors remember of home. It is not the worst thing to remember.",
            "Yes. And the bread. Do not get me started on the bread, {title}, I will weep.",
            "You are a silly creature. But thank you. I laughed, and it did not hurt.",
          ],
        },
      ],
    },
    {
      id: "leogane-market-adele-bonnaire-5",
      text: "Everything in {town} ends up stained blue. My hands, my apron, my thoughts.",
    },
    {
      id: "leogane-market-adele-bonnaire-6",
      text: "Is there any news from {otherTown}? Good news, I mean. I have had my fill of the other kind.",
      answers: [
        {
          text: "The harvests are good this year.",
          replies: [
            "Good harvests. That means good prices, and good prices mean full bellies. Thank you, {title}.",
            "Oh, I am glad. It is nice to know some fields are growing as they should.",
            "Henri would have been delighted. He always loved a good harvest, even someone else's.",
            "That is the best news I have heard all season. Here, take a ribbon of indigo. No charge.",
            "Good. Somewhere, someone's plans are coming true. That is a comfort.",
          ],
        },
        {
          text: "Only bad news, I am afraid.",
          replies: [
            "Of course. It always is. Never mind, I am used to it.",
            "Then do not tell me. I would rather fold my cloth in peace.",
            "Ah well. Bad news travels fast. Good news must be taking the long way round.",
            "Thank you for being honest, {title}. Most people lie to widows. It is meant kindly, but it is still lying.",
            "Then let us talk about the weather instead. At least that changes.",
          ],
        },
        {
          text: "A goat was elected to the town council.",
          replies: [
            "A goat! Well, it can hardly do worse than the men. Probably more honest, too.",
            "Ha. That is good news, actually. A goat cannot steal from the treasury. Can it?",
            "Oh, {title}. Thank you. I needed that more than you know.",
            "Henri always said the council was full of goats. It seems they have finally made it official.",
            "I hope it is a kind goat. The island could use one.",
          ],
        },
      ],
    },
    {
      id: "leogane-market-adele-bonnaire-7",
      text: "People say time heals. It has been eleven years, and so far time has only taught me to fold cloth very neatly.",
    },
  ],

  "leogane-governor-yvon-boitel": [
    {
      id: "leogane-governor-yvon-boitel-1",
      text: "Sit, {title}. Mind the chair, it was expensive. Everything here was expensive. Someone has to pay for it, and I would prefer it were not me.",
    },
    {
      id: "leogane-governor-yvon-boitel-2",
      text: "A captain like you must find all sorts of things at sea. Things that do not need to be written down?",
      answers: [
        {
          text: "I declare everything I carry.",
          replies: [
            "Everything? How very... thorough. You must be terribly popular with customs clerks.",
            "Admirable. Truly. I shall make sure your honesty is rewarded. Eventually. In some form.",
            "Then you pay the full duty. Every livre. Remarkable. I did not know people still did that.",
            "Honest captains are rare in {town}. I like to keep a few around, for contrast.",
            "Good, good. Then I shall simply have to find my money somewhere else. Somewhere quieter.",
          ],
        },
        {
          text: "Perhaps. What is in it for me?",
          replies: [
            "Ah, a sensible person. Finally. Let us say a smaller harbour fee and a shorter memory.",
            "Everything is in it for you, {title}, as long as a little is also in it for me.",
            "I like you. You ask the right questions. Most people ask the wrong ones, loudly, in public.",
            "Discretion, friendship and the knowledge that I owe you a favour. That is worth more than gold. Almost.",
            "Let us not use words like 'in it'. Let us say 'mutual appreciation'.",
          ],
        },
        {
          text: "I once found a mermaid. She wanted a receipt.",
          replies: [
            "A mermaid with a head for business. I would make her my treasurer tomorrow.",
            "Did you give her one? Never give receipts. Receipts are how men like me get caught.",
            "Ha. Charming. If she ever comes to {town}, tell her the governor is very understanding.",
            "A receipt. Sensible customer. Unlike my creditors, who keep losing theirs, thank God.",
            "Then she is cleverer than most of the clerks in Paris. Bring her to me.",
          ],
        },
      ],
    },
    {
      id: "leogane-governor-yvon-boitel-3",
      text: "I bought this post fair and square. With other people's money, admittedly, but the purchase itself was entirely honest.",
    },
    {
      id: "leogane-governor-yvon-boitel-4",
      text: "Do you like my rings? Ten fingers, ten rings. Each one paid for by a grateful citizen of {town}.",
      answers: [
        {
          text: "They are very fine.",
          replies: [
            "Thank you. This one is from a sugar planter. This one from a tavern keeper. This one I forget. He forgot too.",
            "They are. Gratitude is a beautiful thing, when properly encouraged.",
            "Fine, yes. But not yet paid for, strictly. Do not tell Paris.",
            "You have good taste, {title}. Perhaps one day you will be grateful too.",
            "Very fine. And very portable, should I ever need to leave quickly.",
          ],
        },
        {
          text: "Grateful, or frightened?",
          replies: [
            "Is there a difference, in a colony? Gratitude is just fear with better manners.",
            "Careful, {title}. Questions like that make a man's harbour fees mysteriously rise.",
            "Grateful. Mostly. A little frightened, perhaps. A healthy mix.",
            "Ha. You are sharp. I like sharp people. They are useful, until they cut you.",
            "Let us call it respectful. Respect is a fine word. It covers so much.",
          ],
        },
        {
          text: "I count eleven.",
          replies: [
            "Eleven? Let me see. Ah. That one belongs to the bishop. He will want it back.",
            "Eleven. Hm. I must have been more popular last week than I realised.",
            "Shh. Nobody needs to know about the eleventh. It is a very private ring.",
            "You have sharp eyes, {title}. Sharp eyes are expensive. Keep them on the sea.",
            "That one is a spare. A governor should always have a spare. Of everything.",
          ],
        },
      ],
    },
    {
      id: "leogane-governor-yvon-boitel-5",
      text: "The buccaneers on this coast are a nuisance, of course. A nuisance who pays a modest fee for anchorage, and whose fees somehow never quite reach Paris.",
    },
    {
      id: "leogane-governor-yvon-boitel-6",
      text: "If someone from Paris came asking about my accounts, you would be helpful, {name}? Helpful to me, I mean.",
      answers: [
        {
          text: "Of course, Your Excellency.",
          replies: [
            "Splendid. I knew we would get along. Friendship is so much cheaper than bribery.",
            "Good. Then you have nothing to fear from me. That is a rare privilege in {town}.",
            "Excellent. And if they ask about the second ledger, you have never heard of it. Nor the third.",
            "Wise. Very wise. I shall remember this when your papers next need a signature.",
            "Thank you, {title}. Loyalty is the only investment I have never regretted.",
          ],
        },
        {
          text: "I would tell the truth.",
          replies: [
            "The truth. How... quaint. Do you know what the truth costs, these days?",
            "Of course. But truth is a matter of perspective, and my perspective is very persuasive.",
            "Then I must make sure there is nothing true for you to tell. A tidy solution.",
            "How noble. I had a clerk like that once. He was reassigned to Biloxi.",
            "Hm. Well, everyone tells the truth until they hear the alternative. Let us talk again.",
          ],
        },
        {
          text: "I would tell them you are a wonderful dancer.",
          replies: [
            "Ha! Perfect. Completely irrelevant and impossible to disprove. I like you.",
            "A wonderful dancer. Yes. I do dance very well around certain questions.",
            "Splendid. And while they are puzzling over that, I shall be busy elsewhere.",
            "Clever, {title}. Confusion is the best friend a man in my position could have.",
            "Do. And add that I sing. Inspectors hate singing. They leave very quickly.",
          ],
        },
      ],
    },
    {
      id: "leogane-governor-yvon-boitel-7",
      text: "My creditors in Paris write every month. I write back every month too, describing the weather in great detail. It buys me another month.",
    },
  ],
}
