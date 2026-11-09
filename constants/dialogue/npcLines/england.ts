import "server-only"

export const ENGLAND_NPC_LINES: Record<string, DialogueEntry[]> = {
  "charles-towne-tavern-mavis-cartwright": [
    {
      id: "charles-towne-tavern-mavis-cartwright-1",
      text: "Come closer, {title}, I don't shout secrets. Do you want to know who the parson's wife was seen walking with down by the waterfront?",
      answers: [
        {
          text: "Tell me everything.",
          replies: [
            "The cooper. Twice. And the second time she was carrying his hoops for him, which in Charles Towne is practically a betrothal.",
            "The new harbour clerk, and he walked her home the long way round. There is no long way round in Charles Towne, {title}. He made one.",
            "A planter's son from up the river. She says they were discussing scripture. Nobody discusses scripture that slowly.",
            "Her own husband, if you can believe it. The whole town was so shocked we talked of nothing else for a week.",
            "The surgeon. She claimed a splinter. I've seen the splinter, {title}. It would not trouble a mouse.",
          ],
        },
        {
          text: "I don't trade in gossip.",
          replies: [
            "Nobody trades in it, {title}. It's given away free, which is why there's so much of it.",
            "Suit yourself. You'll hear it from the fishwife tomorrow, and she gets the names wrong.",
            "A gentleman, then. How dull. The last gentleman who came in here owed money to three people at this very table.",
            "Very proper. I'll make a note that you're proper. People will want to know.",
            "That's what the parson said, right before he asked me who it was.",
          ],
        },
        {
          text: "It was me. I'm the scandal.",
          replies: [
            "You? You've been ashore an hour. Even the parson's wife isn't that quick.",
            "Ha! Then you'd best leave town before her husband finishes his sermon. It's a short one today.",
            "I'll put it about. By supper you'll have fought a duel over her, and by Sunday you'll have lost.",
            "Lord, the cheek of you. I like you already, and that's dangerous, because I tell everyone what I like.",
            "Then you've shocked a woman who has heard everything twice. Sit down, I'm buying.",
          ],
        },
      ],
    },
    {
      id: "charles-towne-tavern-mavis-cartwright-2",
      text: "I came over as a cook for a planter who couldn't tell salt from gravel. He's in the churchyard now, and I'm still here, polishing this same tankard. There's a lesson in that, though I've never worked out what it is.",
    },
    {
      id: "charles-towne-tavern-mavis-cartwright-3",
      text: "You've the look of someone who's been to {otherTown}. Is it true their governor wears a wig made from his own late horse?",
      answers: [
        {
          text: "Yes, and it neighs when it rains.",
          replies: [
            "I knew it! I knew it and nobody believed me. Mrs Ashby owes me a shilling.",
            "Neighs, you say? Oh, that's going straight round the market. You'll be famous by nightfall.",
            "I'll add the neighing. Every good story needs a sound in it.",
            "You're having me on. But it's too good not to repeat, so I'll repeat it carefully.",
            "Don't laugh, {title}. A man in Barbados swore his wig was cursed, and it is now governor there.",
          ],
        },
        {
          text: "I've no idea what he wears.",
          replies: [
            "No idea? You go all the way to {otherTown} and don't even look at the governor's head? What do you look at?",
            "Then I shall have to ask a sailor who drinks more and remembers less. They're far better sources.",
            "Useless. I'll tell people you said yes anyway. It's kinder to the story.",
            "Well, keep your eyes open next time. A good captain notices wind, rocks and wigs.",
            "Hm. You'd make a terrible gossip, {title}. Honest folk always do.",
          ],
        },
        {
          text: "Who told you that?",
          replies: [
            "I never give up my sources, {title}. Mostly because I can't remember which of them I made up.",
            "A fisherman, who heard it from a sailor, who heard it from the horse, I expect.",
            "Never you mind. Everything reaches this tavern sooner or later, like river mud.",
            "Someone very reliable, who had been drinking very reliably.",
            "The same person who told me about you, and you turned out to be true, didn't you?",
          ],
        },
      ],
    },
    {
      id: "charles-towne-tavern-mavis-cartwright-4",
      text: "Half the debts on this waterfront are owed to the other half, and I know the sums to the penny. If ever the whole town settled up at once, {title}, there'd be nothing left but me and the tankards.",
    },
    {
      id: "charles-towne-tavern-mavis-cartwright-5",
      text: "Our governor has written forty-one letters to London asking for a larger desk. Forty-one! Have you ever been that desperate for furniture?",
      answers: [
        {
          text: "Only for a bigger hammock.",
          replies: [
            "Ha! At least a hammock you can sleep in. He just sits behind his desk and sulks.",
            "Write to London, then. They'll answer you about as fast as they answer him.",
            "A sailor's wish. Sensible. You can't fall out of a desk in a storm, I suppose.",
            "I'll tell him that. He'll write a forty-second letter asking for a hammock.",
            "You'd get one sooner than he gets his desk. The King has bigger troubles with Parliament.",
          ],
        },
        {
          text: "Maybe his desk really is too small.",
          replies: [
            "It's six feet wide, {title}. I've cleaned it. You could hold a christening on it.",
            "Too small for his opinion of himself, perhaps. Nothing in the colony is big enough for that.",
            "Oh, don't you start defending him, or I'll have to tell people you're on his side.",
            "The desk is fine. It's his hat that needs a bigger room.",
            "Maybe. But forty-one letters, {title}. That's not a man who needs a desk, that's a man who needs a hobby.",
          ],
        },
        {
          text: "I'll build him one from driftwood.",
          replies: [
            "Do it! Leave it outside the hall in the night with a ribbon on. I'll be watching from the window.",
            "He'd only complain that it smells of fish. Then again, so does he after Fridays.",
            "Now that's a kindness the whole town would pay to see.",
            "Mind you take the barnacles off first. He's particular about barnacles.",
            "Then you'll be the first person in Charles Towne he's ever thanked. I'd want witnesses.",
          ],
        },
      ],
    },
    {
      id: "charles-towne-tavern-mavis-cartwright-6",
      text: "A word to the wise, {title}. If anyone at that corner table offers to sell you a map of Spanish gold, it's the same map. He's sold it nine times. The gold has moved every time.",
    },
  ],

  "charles-towne-market-thomas-jarvis": [
    {
      id: "charles-towne-market-thomas-jarvis-1",
      text: "Good day, {title}. I deal in salt pork, hides and honest weights. Mostly honest weights. Shall we talk prices, or did you only come to admire my scales?",
      answers: [
        {
          text: "Let's talk prices.",
          replies: [
            "Splendid. My prices are fair, and I say that as the person who sets them.",
            "Then let me warn you, I learned my trade from a London draper who once charged a duke for the air in a bolt of cloth.",
            "Good. Everything here is weighed twice, once for you and once for me. Somehow my weighing is always right.",
            "Excellent. Prices in Charles Towne move with the river, {title}. Today the river is in my favour.",
            "A sensible captain. Most come in, look at the salt pork and ask if it's edible. It is. Mostly.",
          ],
        },
        {
          text: "Those scales look crooked.",
          replies: [
            "Crooked? They are the straightest scales in the colony. It's the floor that slopes.",
            "I'll have you know these scales crossed the Atlantic with me. They're simply tired.",
            "If they were crooked, {title}, I would be rich. Look at me. Do I look rich? Don't answer that.",
            "Every merchant on this wharf says that about every other merchant's scales. It's practically a greeting.",
            "That's a heavy accusation. I'd weigh it for you, but you'd only say the scales were crooked.",
          ],
        },
        {
          text: "I only came to admire the scales.",
          replies: [
            "Then you have taste. Brass from Birmingham, beam from a ship's oar. Admiring them is free. Touching them is a penny.",
            "At last, a person of culture. You may look at them for as long as you like, provided you buy something after.",
            "Most people don't notice them. I polish them each morning in case someone like you comes along.",
            "I'm touched, {title}. Truly. I'll still charge you full price, but I'm touched.",
            "Ha! Admire away. They've seen more honest bargains than the parson, and fewer than they'd like.",
          ],
        },
      ],
    },
    {
      id: "charles-towne-market-thomas-jarvis-2",
      text: "I crossed the ocean with nothing but these scales and a letter of recommendation. The letter got wet off the Azores. The scales have done rather better, so I trust them more than people.",
    },
    {
      id: "charles-towne-market-thomas-jarvis-3",
      text: "Here's a riddle for a captain. If I buy {merchandise} cheap in {nationTown} and sell it dear here, who loses?",
      answers: [
        {
          text: "Nobody. Everyone's happy.",
          replies: [
            "Spoken like a buyer. Somebody always loses, {title}. The trick is never to be in the room when they notice.",
            "Delightful answer. Wrong, but delightful. I'll sell you something on the strength of it.",
            "Nobody, until the next ship arrives with twice as much. Then it's me.",
            "In a perfect world, yes. Charles Towne is not a perfect world. It is barely a dry one.",
            "That's the answer I give the customs men. Very good, {title}.",
          ],
        },
        {
          text: "The fool who buys from you.",
          replies: [
            "Careful, {title}. You're standing very close to my stall for someone saying that.",
            "There are no fools at my stall, only people who discover their bargains slowly.",
            "Ha! Sharp. You'd have done well with my old master in London. He'd have hated you.",
            "Possibly. But that fool goes home with good cloth, and I go home with his silver, so we both have something to hold.",
            "If you're implying I cheat, I'd remind you I've never once been caught. That counts for something.",
          ],
        },
        {
          text: "The fish. Always the fish.",
          replies: [
            "The fish? I don't sell fish. Though if I did, I'd charge them for the privilege.",
            "I don't follow, {title}, but I'll write it in my ledger in case it makes sense later.",
            "Strange answer. Do you know something about the fish market I don't? Because I would pay for that.",
            "Sailors. Every question ends in fish, rum or a woman in some port. You chose fish. Respectable.",
            "Well, the fish do lose, in the end. Everyone eats them and nobody pays them. Deep, that.",
          ],
        },
      ],
    },
    {
      id: "charles-towne-market-thomas-jarvis-4",
      text: "Rice is the coming thing here, mark me. The planters laugh, but they laughed at tobacco too, and look how many of them smoke it now.",
    },
    {
      id: "charles-towne-market-thomas-jarvis-5",
      text: "One {playerNationAdjective} captain once tried to pay me in buttons. Said they were the coin of a faraway kingdom. What would you have done?",
      answers: [
        {
          text: "Taken the buttons.",
          replies: [
            "I did, as it happens. Then I sold them back to him as change. He seemed pleased.",
            "Of course you would. Buttons are small, they don't rot and you can always find a coat.",
            "A practical answer. I have a jar of them under the stall to this day.",
            "Then we think alike. He also gave me a lecture about the kingdom. I charged him for listening.",
            "You'd have been in good company. Half my customers pay in something odd. Last week it was a goat.",
          ],
        },
        {
          text: "Run him through.",
          replies: [
            "Over buttons? You'd have had to explain that to the governor, and he's slow with explanations.",
            "Steady, {title}. Dead customers come back for nothing, and I can't sell them a thing.",
            "I prefer to bleed people with prices. It's less messy and you can do it twice.",
            "Remind me never to give you short weight.",
            "Hm. Effective, but a terrible way to build a customer base.",
          ],
        },
        {
          text: "Asked how big the kingdom was.",
          replies: [
            "Ha! Exactly what I asked. He said it was very large but entirely made of buttons.",
            "Good question. If they've got buttons, they need coats. If they need coats, they need cloth. That's my sort of kingdom.",
            "You've a trader's mind. Never argue with a man's story when you can sell into it.",
            "He said about the size of Bristol, which makes the buttons worth exactly nothing.",
            "I like you, {title}. You ask the question behind the question. That's where the money sleeps.",
          ],
        },
      ],
    },
    {
      id: "charles-towne-market-thomas-jarvis-6",
      text: "Never buy hides in the rainy season, {title}. They come with half the river still in them, and you pay for every drop.",
    },
  ],

  "charles-towne-governor-randolph-ellis": [
    {
      id: "charles-towne-governor-randolph-ellis-1",
      text: "You stand before Randolph Ellis, appointed by His Majesty King Charles to govern Charles Towne. Do you know how fortunate you are to be received?",
      answers: [
        {
          text: "I'm honoured, Your Excellency.",
          replies: [
            "As you should be. I shall make a note that you were honoured. My clerk keeps a book for it.",
            "Good. Very good. The last captain merely nodded. He is now banned from the harbour.",
            "Correct. Most visitors are struck silent by the hat. You managed words. Impressive.",
            "You may bow again on the way out. I find it rounds off an audience nicely.",
            "Excellent manners. You'd go far in London, provided you never spoke to anyone important.",
          ],
        },
        {
          text: "Fortunate isn't the word I'd use.",
          replies: [
            "Then you lack the proper vocabulary. I shall lend you a dictionary. You will return it.",
            "Impertinence! I have had men flogged for less. Well, I have written letters asking for permission to flog them.",
            "What word would you use? Blessed? Dazzled? I shall accept either.",
            "Hmph. Your lack of awe is noted. In ink.",
            "Careful, {title}. I have the ear of the King. Admittedly he never answers, but I have it.",
          ],
        },
        {
          text: "Is that hat load-bearing?",
          replies: [
            "This hat was made by a royal hatter in Westminster. It bears nothing but dignity, which is heavy enough.",
            "How dare you. Three ostriches gave their lives for this hat. Well, their tails.",
            "It is a symbol of the Crown's authority in the colonies. It also keeps off the rain, but that is secondary.",
            "I shall pretend I did not hear that, because the hat has excellent hearing and it is easily offended.",
            "My clerk asked the same thing. He now works in the stables.",
          ],
        },
      ],
    },
    {
      id: "charles-towne-governor-randolph-ellis-2",
      text: "I have written forty-one letters to London requesting a larger desk befitting my office. They have not replied. I can only assume the desk is being built and is very large indeed.",
    },
    {
      id: "charles-towne-governor-randolph-ellis-3",
      text: "The {enemyAdjective} ships grow bold along our coast. What does a captain of your standing advise His Majesty's governor to do?",
      answers: [
        {
          text: "Build more forts.",
          replies: [
            "Forts! Yes. Large ones. With my name carved over the gate in letters a foot high.",
            "An excellent idea. I shall write to London for the funds. Expect them in nine or ten years.",
            "We have one fort, {title}. It is mostly a wall and a goat. The goat is very vigilant.",
            "I proposed exactly that in my twenty-third letter. And my twenty-fourth. And the desk letters, in a postscript.",
            "Forts cost money, and money must come from somewhere, ideally not from me.",
          ],
        },
        {
          text: "Send me. I'll handle it.",
          replies: [
            "Bold. I admire boldness in others, it saves me from having to show it myself.",
            "Very well. Should you succeed, I shall take the credit. Should you fail, I never met you.",
            "Go, then, and fly the King's colours proudly. Try not to get them holed.",
            "I shall mention you in a letter to London. It will not be read, but it will be beautifully written.",
            "Splendid. Bring back a captured flag. I have a wall that looks terribly bare.",
          ],
        },
        {
          text: "Wave the hat at them.",
          replies: [
            "Do not mock the hat. The hat has been to court.",
            "I will have you know that this hat has frightened grown merchants into paying their taxes.",
            "Hmph. If they saw it, {title}, they might well turn back. It is a very persuasive hat.",
            "A ridiculous suggestion. Though I do stand on the battlements in it when ships pass. For morale.",
            "My wife suggested the same thing. She meant it unkindly too.",
          ],
        },
      ],
    },
    {
      id: "charles-towne-governor-randolph-ellis-4",
      text: "When I arrived, Charles Towne was a mud bank with ambitions. Now it is a mud bank with a governor. One must recognise progress where one finds it.",
    },
    {
      id: "charles-towne-governor-randolph-ellis-5",
      text: "I am considering a portrait of myself for the hall. Full length, naturally. Should I be painted on horseback or at my desk?",
      answers: [
        {
          text: "On horseback, sword drawn.",
          replies: [
            "Yes! Heroic. Though I shall need to borrow a horse, and possibly learn which end to face.",
            "Exactly my thought. The painter will have to make the horse larger. And me slightly less round.",
            "Sword drawn, in the face of danger. I have never faced danger, but the painter needn't know.",
            "Splendid. I shall send for a horse from {nationTown}. Ours are all rather sensible.",
            "Bold, {title}. I'll have the sword painted gold. The real one is a little rusty.",
          ],
        },
        {
          text: "At the desk, writing letters.",
          replies: [
            "At this desk? It is far too small to be immortalised. That is precisely my complaint.",
            "Writing a letter, yes. Perhaps the forty-second. The King might see the portrait and finally reply.",
            "Hmm. Dignified, but it does show the desk. I'd want the painter to add a foot either side.",
            "That is very me. Quill aloft, brow noble, everyone ignoring me. Yes.",
            "Thoughtful. I could have the painting sent to London. At least they'd have to look at it.",
          ],
        },
        {
          text: "Paint just the hat.",
          replies: [
            "Just the hat? Without me? You would separate a man from his hat?",
            "Preposterous. Although it is the best part. No. No, I shall not admit that.",
            "The hat would need its own frame, {title}. It would not fit in a normal one.",
            "Out. No, wait, come back. Tell me which angle you'd paint it from.",
            "I shall consider a smaller second portrait of the hat. For the stairs.",
          ],
        },
      ],
    },
    {
      id: "charles-towne-governor-randolph-ellis-6",
      text: "Do keep the peace in my harbour, {title}. Any trouble and I shall have to write to London, and they will not reply, and that will make me very cross indeed.",
    },
  ],

  "belize-tavern-hugh-palmer": [
    {
      id: "belize-tavern-hugh-palmer-1",
      text: "Sit, sit. My leg tells me the wind's turning. Do you know what that means, young {title}?",
      answers: [
        {
          text: "A storm is coming.",
          replies: [
            "Aye, by tomorrow night. Double your lines and don't trust anything that floats on its own.",
            "Good sailor. A storm, or the leg wants another drink. Either way, take precautions.",
            "Right in one. Last time it tapped like this, the whole logwood camp ended up three miles inland.",
            "That it is. In hurricane months, {title}, a wooden leg is worth more than a weather glass.",
            "Smart. Most young captains say it means my leg's wooden. Which it is, but that isn't the point.",
          ],
        },
        {
          text: "Your leg needs oiling.",
          replies: [
            "Oiling! It's teak from a Spanish wreck, it's never been oiled and never will be.",
            "Cheeky pup. I'll oil it when you've sailed through a norther with nothing but a rudder and a prayer.",
            "Ha! You sound like my late wife. She oiled it once. It squeaked for a year out of spite.",
            "The leg's fine. It's the rest of me that needs oiling.",
            "Laugh away, {title}. This leg has predicted every blow on this coast for thirty years.",
          ],
        },
        {
          text: "It means you want me to buy you a drink.",
          replies: [
            "Well, the leg and I usually agree on such matters.",
            "You catch on quick. Rum for me, and something for the leg. It likes ale.",
            "That too. The wind always turns at about the time my cup runs dry. Funny, that.",
            "Ah, a captain who reads the signs. You'll go far. Mind the storm, though, that's real too.",
            "I'll take it, {title}. And I'll tell you how I lost this leg. The true version, which is worse.",
          ],
        },
      ],
    },
    {
      id: "belize-tavern-hugh-palmer-2",
      text: "I cut logwood on this shore before there was a Belize to cut it in. Just us, the mosquitoes and the Mayans watching from the trees, wondering why we were so keen on chopping down the red ones.",
    },
    {
      id: "belize-tavern-hugh-palmer-3",
      text: "That river mouth owes me a boat and two good friends. Want to know how it took them?",
      answers: [
        {
          text: "Please, tell me.",
          replies: [
            "Sandbar, after dark. Shifted in one night like a sleeping dog rolling over. We hit it, the boat broke, and the river took Ned and Jack before I could reach them.",
            "Hurricane of '24. We tied the boat fast. The boat stayed. The trees we tied it to left.",
            "A crocodile the length of a pinnace. The boat, I could forgive. The boys, never.",
            "Spaniards. Came up the river at dawn and fired on anything that moved. We moved a lot, and not fast enough.",
            "It doesn't matter how, {title}. Only that it can. Watch the bar at the mouth every time you come in.",
          ],
        },
        {
          text: "I'll get them back for you.",
          replies: [
            "The friends are gone, {title}. The boat you're welcome to. It's under twelve feet of silt.",
            "Kind of you. But the river keeps what it takes. Bring back a good tale instead.",
            "Ha. You and whose army? The river's had better men than us. Me included.",
            "Get me a rum and we'll call it settled. The river can owe someone else.",
            "That's a fine heart you've got. Keep it, {title}. This coast will try to take it.",
          ],
        },
        {
          text: "Did the river at least say sorry?",
          replies: [
            "Ha! Not once. Every spring it floods my hut, which I take as a sort of apology.",
            "Rivers never apologise, {title}. Neither do governors. They're cut from the same mud.",
            "It sent me a crocodile once, on the anniversary. I took it as rudeness.",
            "No. But I've cursed it every morning for fifteen years, so I'd say we're about even.",
            "You've a mouth on you. Good. You'll need it with the Spanish.",
          ],
        },
      ],
    },
    {
      id: "belize-tavern-hugh-palmer-4",
      text: "Scurvy took more of my mates than any Spaniard. Eat your limes, {title}. A sour face is better than no teeth.",
    },
    {
      id: "belize-tavern-hugh-palmer-5",
      text: "In my day we sailed with nothing but a compass, a lead line and a bad attitude. What do you young captains sail with now?",
      answers: [
        {
          text: "Charts and a good crew.",
          replies: [
            "Charts. Pah. Half of them were drawn by men who never left Seville. Trust your lead line.",
            "A good crew's worth more than the ship. Look after them and they'll keep you breathing.",
            "Fair. We had a crew too. They were mostly good at singing and bad at bailing.",
            "Sensible answer. You'll live longer than I expected.",
            "Charts are fine till they're wrong. Then you need the bad attitude.",
          ],
        },
        {
          text: "Superior intellect.",
          replies: [
            "Ha! Intellect. Show me intellect that can bail water and I'll buy it a drink.",
            "Superior to what, the parrot? Don't answer, the parrot's sharp.",
            "Clever captains drown just as well as stupid ones. They just make better speeches on the way down.",
            "I had a mate with intellect once. Read books. Sank in a puddle off Cozumel.",
            "Keep your intellect, {title}. I'll keep my leg, it's smarter.",
          ],
        },
        {
          text: "The same bad attitude.",
          replies: [
            "Now you're talking. The sea respects a man who scowls back at it.",
            "Good. Hold onto that. It's kept me afloat for fifty years.",
            "Ha! That's the spirit. We'll get along famously, as long as neither of us apologises.",
            "Then the sea's got two of us to deal with. I pity it.",
            "Best tool on any ship. Doesn't rust, doesn't break and doesn't need feeding.",
          ],
        },
      ],
    },
    {
      id: "belize-tavern-hugh-palmer-6",
      text: "The Spanish in Villa Hermosa call this coast a nest of thieves. Fair enough. But we're thieves who show up on time, and that's more than you can say for their treasure fleet.",
    },
    {
      id: "belize-tavern-hugh-palmer-7",
      text: "I once saw a waterspout pick up a turtle and drop it on a ship's deck. The cook took it as a sign from heaven. So did the turtle, briefly.",
    },
  ],

  "belize-market-eliza-knowles": [
    {
      id: "belize-market-eliza-knowles-1",
      text: "Stop right there, {title}. Before you step up to my stall, have you got a black cat aboard your ship?",
      answers: [
        {
          text: "No, no cats at all.",
          replies: [
            "Good. Step closer. Mind the horseshoe, it's rusty but it's working.",
            "Thank heavens. You may approach. Left foot first, please.",
            "No cats? Then what keeps the rats down? Never mind, don't tell me, I don't want to know.",
            "Right then, come over. But touch the ribbon on the post as you pass. For both our sakes.",
            "That's a relief. The last one who had a cat aboard sank before he reached the cays.",
          ],
        },
        {
          text: "Just a small one.",
          replies: [
            "A small one is still a whole one! Go away, go away, and walk backwards three steps.",
            "Black cats aren't measured by size, {title}, they're measured by bad luck, and that's always enormous.",
            "Oh no. Oh no, no. Throw salt over your shoulder, quickly. Not that one, the other one.",
            "My father said a small one once. He said it was a kitten. Then he said nothing ever again.",
            "Then we'll trade at arm's length, and I'll wash the coins after.",
          ],
        },
        {
          text: "The cat is the captain. I'm just the first mate.",
          replies: [
            "Don't jest about such things! Though if it's true, your cat has very good taste in hats.",
            "Then you're in more danger than I thought. Cats steer straight for rocks, everyone knows that.",
            "I can't tell if you're mocking me or confessing. I'll assume both and put a shell on the counter.",
            "Ha! Oh, that's wicked. Still, stand back a bit. Just in case it's listening.",
            "If a cat's your captain, you'd best be very good at bowing.",
          ],
        },
      ],
    },
    {
      id: "belize-market-eliza-knowles-2",
      text: "My father's ship went down the day a black cat crossed his gangplank. Everyone said it was the hurricane. A hurricane doesn't stop to look at you first, {title}. That cat did.",
    },
    {
      id: "belize-market-eliza-knowles-3",
      text: "These shells came from a beach where no ship has ever wrecked. Would you like one for luck?",
      answers: [
        {
          text: "Yes, I'll take one.",
          replies: [
            "Wise choice. Keep it in your left pocket. The right pocket is for coins and misfortune.",
            "Here, the pink one. Pink is for calm seas. The grey ones are for avoiding tax men.",
            "One shilling. Luck isn't free, {title}, otherwise everyone would have it.",
            "Hold it to your ear before a voyage. If you hear the sea, all's well. If you hear whistling, turn back.",
            "Good. Now don't lose it, or you'll lose twice as much luck as it gave you. That's how they work.",
          ],
        },
        {
          text: "I make my own luck.",
          replies: [
            "That's what my uncle said. Then he made his own funeral.",
            "Do you, now? Then you'll not mind if I stand a little further away from you.",
            "Luck isn't made, it's kept, like a fire. And yours looks like it needs a bit of kindling.",
            "Brave words. Say them again during a hurricane and see if they hold.",
            "Well, if you change your mind, the shells will still be here. Probably. Unless something bad happens.",
          ],
        },
        {
          text: "How do I know no ship ever wrecked there?",
          replies: [
            "Because there's no water near it. It's a very lucky beach.",
            "I asked the beach, {title}. It was very definite.",
            "Because I sat there for a whole week and nothing wrecked. That's proof enough for me.",
            "A good question, and a dangerous one. Doubt is how the bad luck gets in.",
            "Because my mother said so, and her mother before her. Three generations of not wrecking.",
          ],
        },
      ],
    },
    {
      id: "belize-market-eliza-knowles-4",
      text: "Never whistle on deck, never rename a ship and never let a parson aboard on a Friday. I've sold to captains who broke all three. I don't sell to them anymore. I can't. They're at the bottom.",
    },
    {
      id: "belize-market-eliza-knowles-5",
      text: "The logwood men say they've seen lights in the mangroves at night. Do you believe in ghosts, {title}?",
      answers: [
        {
          text: "Yes. I've seen one.",
          replies: [
            "I knew it! Was it pale? Was it sad? Did it want something? They always want something.",
            "Then you've been marked. Wear blue for a month and don't answer if anyone calls your name at night.",
            "Sit down and tell me everything. I'll give you a discount on the dried herbs.",
            "Was it on your ship? Then you need to make it an offering. Rum, usually. Ghosts like rum.",
            "You poor soul. I've a ribbon for that. Two shillings.",
          ],
        },
        {
          text: "No. They're just fireflies.",
          replies: [
            "Fireflies don't hum hymns, {title}. These do.",
            "That's what they want you to think. The clever ghosts dress as insects.",
            "Fireflies. Hmph. Then why do they float over the grave of old Dick Stoner every Friday?",
            "Go out there at midnight and tell them that, then.",
            "You're too sensible by half. It'll get you into trouble one day.",
          ],
        },
        {
          text: "Only the ghost of my last good bargain.",
          replies: [
            "Ha! That's the saddest ghost of all. It haunts every market in the Caribbean.",
            "You'll not find that ghost here. My bargains are alive and well, and slightly more expensive.",
            "Cheeky. But I'll take that as a charm against bad trade. I'll write it on a shell.",
            "I see it sometimes too. It wears a merchant's hat and it never comes back.",
            "Careful, {title}. Joke about ghosts and they take an interest in you.",
          ],
        },
      ],
    },
    {
      id: "belize-market-eliza-knowles-6",
      text: "I sell dried herbs for fever, garlic for bad spirits and nutmeg for luck. The garlic does wonders for the spirits. It does even more for keeping away customers I don't like.",
    },
  ],

  "belize-governor-frederick-howard": [
    {
      id: "belize-governor-frederick-howard-1",
      text: "Sit down, {title}. You'll forgive me if I don't stand. I've been standing since 1621. What brings you to my swamp?",
      answers: [
        {
          text: "Trade, Governor.",
          replies: [
            "Logwood, then. That's all there is here. Logwood, mosquitoes and men who should know better.",
            "Good. Trade is the only thing that keeps this place alive. That and a great deal of rum.",
            "Then take your cargo and sail safely. I'm too tired to rescue anyone this month.",
            "Trade's honest work. Mostly. Just don't trade with the Spanish where I can see it.",
            "Fair enough. Pay your duties at the harbour and don't start fights. That's the whole of Belize law.",
          ],
        },
        {
          text: "Glory and adventure.",
          replies: [
            "I said that once, in 1618. Look at me now. Look at this desk. Look at that damp patch.",
            "Glory. Hmph. It's very loud and then it's very quiet, and then you've got a bad knee.",
            "There's plenty of adventure here. Last week a crocodile came into the fort and we couldn't get it out for two days.",
            "Go on, then. Glory's out there somewhere. I left mine in Flanders, if you happen to pass by.",
            "Young people. I admire your energy. I'd like some of it back, actually.",
          ],
        },
        {
          text: "I heard the swamp was hiring.",
          replies: [
            "The swamp is always hiring. It takes everyone eventually.",
            "Ha. You've the right temper for Belize. The swamp likes people who can laugh at it.",
            "Well, there's an opening for a man to count mosquitoes. You'd never finish.",
            "It pays in fever and damp boots, {title}. Very generous terms.",
            "Wonderful. You can have my job. I'll be on the next ship to anywhere dry.",
          ],
        },
      ],
    },
    {
      id: "belize-governor-frederick-howard-2",
      text: "I fought under Frederick Henry in the Low Countries. Sieges in the rain, marches in the mud. They sent me here as a reward. I have since concluded that someone in London dislikes me.",
    },
    {
      id: "belize-governor-frederick-howard-3",
      text: "The Spanish in Villa Hermosa keep sending letters saying this coast belongs to King Philip. What would you reply, if you were me?",
      answers: [
        {
          text: "Ignore them.",
          replies: [
            "That's my usual policy. It's served me well with the Spanish, London and my own doctor.",
            "Aye. I've a drawer full of their letters. I use them to level the table.",
            "The trouble is they keep sending more. Eventually one of them will be carried by a warship.",
            "Sound advice. I'd only answer once they bring cannons, and then not with a letter.",
            "Very well. Another one goes in the drawer. It's nearly full, I'll need another drawer.",
          ],
        },
        {
          text: "Tell them to come and take it.",
          replies: [
            "Brave words from someone who won't be here when they arrive.",
            "I said that in Flanders once. They came and took it. Then we took it back. Then it rained.",
            "Hmm. Tempting. But I've forty men and eleven muskets, and three of those are decorative.",
            "If they want this swamp so badly, they can have the mosquitoes too. Let's see how long they last.",
            "I admire your spirit, {title}. My spirit retired years ago.",
          ],
        },
        {
          text: "Send them a crocodile.",
          replies: [
            "Ha! Now that's diplomacy I can get behind. Would you deliver it?",
            "We have plenty spare. They keep coming into the fort uninvited, much like the Spanish.",
            "A crocodile with a polite note round its neck. 'Regards from Belize.' Yes. Very tempting.",
            "That's the first sensible suggestion I've heard since I arrived.",
            "Don't encourage me. I've been here long enough to actually do it.",
          ],
        },
      ],
    },
    {
      id: "belize-governor-frederick-howard-4",
      text: "My orders from London are three years old. They tell me to watch for a Spanish fleet that has since been sunk, captured and sunk again. I watch anyway. It's something to do.",
    },
    {
      id: "belize-governor-frederick-howard-5",
      text: "I haven't slept a full night in twenty years, {title}. Do you sleep well at sea?",
      answers: [
        {
          text: "Like a baby.",
          replies: [
            "You mean you wake up screaming every two hours? Then we have something in common.",
            "Lucky you. I used to, before the wars. Now the slightest creak and I'm reaching for my sword.",
            "Treasure that. The day will come when you lie awake counting the ships you've lost.",
            "Good. A rested captain makes fewer mistakes. A tired one makes governors.",
            "I envy you more than I can say. Enjoy it while it lasts.",
          ],
        },
        {
          text: "Never. Too busy watching for trouble.",
          replies: [
            "Ah. A fellow sufferer. Have a seat, there's room in the long nights for two.",
            "Then you're halfway to my job already. I'm sorry for you.",
            "Trouble doesn't come any faster for being watched for. I learned that the long way.",
            "Smart and sad. The two usually go together on this coast.",
            "Sleep when you can, {title}. Trouble will keep. It always does.",
          ],
        },
        {
          text: "I sleep in the crow's nest. Fewer people bother me.",
          replies: [
            "Ha! Not a bad idea. I've considered sleeping in the fort's flagpole. Nobody visits me there either.",
            "Until a gull lands on your face. Don't ask me how I know.",
            "You must be very light, or your mast very strong.",
            "Clever. I may have one built here. A governor's nest. Above all the paperwork.",
            "Fewer people, yes. More lightning, though. Mind that.",
          ],
        },
      ],
    },
    {
      id: "belize-governor-frederick-howard-6",
      text: "If you're heading out, {title}, keep away from the reef north of the cays. I've lost two boats there and a perfectly good lieutenant. He's fine. He just won't come back to Belize.",
    },
  ],

  "port-royale-tavern-ursula-cole": [
    {
      id: "port-royale-tavern-ursula-cole-1",
      text: "Have you heard of the night I arm wrestled four privateer captains and a Spanish admiral? Four! Back to back! Want to know how it ended?",
      answers: [
        {
          text: "I'd love to hear.",
          replies: [
            "I won, obviously. The admiral cried. Then he offered me a command. I turned him down, I don't like Spanish wine.",
            "Every one of them on the floor by midnight. And I still had time to serve the next round.",
            "The admiral tried to use his left arm. I used my left arm too, and my right was holding a rum. Still won.",
            "They're all buried in the Port Royale churchyard now. Not from the wrestling, mind. Mostly scurvy.",
            "I broke the table. The landlord made me pay for it. Worth every shilling.",
          ],
        },
        {
          text: "Last year it was three captains.",
          replies: [
            "And last year I was a year younger and less impressive. Stories grow, {title}, like arms.",
            "Was it? Then you misheard. Or I was being modest. I do that sometimes, it doesn't last.",
            "A fourth one came in late. Always forget him. Poor man, he forgets me too, he's got a terrible headache ever since.",
            "Who's been telling you my stories? I'll arm wrestle them as well.",
            "Hush. One more year and there'll be a bishop in it.",
          ],
        },
        {
          text: "I once arm wrestled a hurricane.",
          replies: [
            "Ha! And who won? Don't answer, I can see from your face it was close.",
            "A hurricane! Well, I've wrestled one too. It was called Big Martha and she ran the fish stall.",
            "You'll fit right in here. Lies are half price before sundown.",
            "I like you. Come on, sit down, we'll see if you're better than a hurricane or worse than me.",
            "That's the first story I've ever envied. I'll be stealing it.",
          ],
        },
      ],
    },
    {
      id: "port-royale-tavern-ursula-cole-2",
      text: "This cutlass? Took it off a pirate who tried to steal my rum. Now I use it to slice limes. It's never been so happy, {title}.",
    },
    {
      id: "port-royale-tavern-ursula-cole-3",
      text: "Fancy a contest? Arm wrestling, drinking or lying. Choose your poison.",
      answers: [
        {
          text: "Arm wrestling.",
          replies: [
            "Brave. Roll up your sleeve. No, the other sleeve. Fine, both. You'll need them.",
            "Mind your wrist. Last fellow had to steer with his elbow for a week.",
            "Lovely. I'll go gentle on you. That's a lie, I don't know how.",
            "Right then. If you win, drinks are free. If I win, drinks are double, and you buy them.",
            "Ha! I like this one. The others always pick lying, thinking they'll win it. They never do.",
          ],
        },
        {
          text: "Drinking.",
          replies: [
            "Oh, sweetheart. I was raised on rum and gunpowder. I'll still be standing when you're under the bar.",
            "Pour two. No, four. We'll save time.",
            "Excellent. I'll put your name on the board with the others. The board says 'Lost'.",
            "I drink for a living and you drink for fun. That's a professional against an amateur.",
            "Last captain who tried woke up in {otherTown}. He'd sailed there in his sleep.",
          ],
        },
        {
          text: "Lying. I'm the King of Spain.",
          replies: [
            "Your Majesty! Then you owe me for the twelve galleons I sank last spring. Cash only.",
            "Good one. Mine's better. I'm the Queen of Spain, and I want a divorce.",
            "Ha! Philip, is it? You've lost weight. And your Spanish.",
            "Fine. I'll drink to Your Majesty's health. You'll be paying, being so rich.",
            "That's not a lie, that's an insult. To the King of Spain. I like it.",
          ],
        },
      ],
    },
    {
      id: "port-royale-tavern-ursula-cole-4",
      text: "I've been to every port from {nationTown} to {enemyTown}, and no tavern pours like mine. Mainly because I pour mine with a bucket.",
    },
    {
      id: "port-royale-tavern-ursula-cole-5",
      text: "A fellow from {otherTown} said he could lift me. Me! What do you reckon happened?",
      answers: [
        {
          text: "He lifted you.",
          replies: [
            "He lifted my boot. Then he put it down very carefully and left town.",
            "He got me two inches off the floor. Then I sat on him for a bit, out of fairness.",
            "Ha! For a moment, yes. Then the floor came up to meet us both. Broke three boards.",
            "Only because I let him. You have to be nice to the guests, or they don't come back.",
            "He did. He's still walking with a bit of a lean.",
          ],
        },
        {
          text: "He couldn't do it.",
          replies: [
            "Couldn't even find where to start. He's still looking.",
            "He tried for an hour. Then he bought everyone a drink, which was the only lifting he did that night.",
            "Of course he couldn't. Nobody's lifted me since my mother, and she needed help.",
            "Not a chance. He went back to {otherTown} with a sore back and a sorer pride.",
            "Correct. You know your sailors, {title}.",
          ],
        },
        {
          text: "You lifted him and threw him in the harbour.",
          replies: [
            "That's exactly what happened! Have you been talking to the fishwife?",
            "Into the harbour, onto a passing boat, and halfway to Barbados. He wrote me a letter about it.",
            "I'd never be so rude. I put him in very gently. Splash and all.",
            "Ha! I like the way you think. Next one, you can help.",
            "Not the harbour. The water trough. I'm a lady, after all.",
          ],
        },
      ],
    },
    {
      id: "port-royale-tavern-ursula-cole-6",
      text: "Here's a true one, {title}, and I don't tell many. When the hurricane flattened half the town, I kept the doors open and served everyone for free. The other half still owes me.",
    },
  ],

  "port-royale-market-abraham-parry": [
    {
      id: "port-royale-market-abraham-parry-1",
      text: "Oh. A customer. I'd almost given up hoping. Would you like to look at some cloth, {title}?",
      answers: [
        {
          text: "Yes, show me your finest.",
          replies: [
            "The finest... yes. This blue serge came from Bristol. Like me. And like me, it's faded a little in the sun.",
            "Here. Feel it. Soft, isn't it? Softer than life has been to me, anyway.",
            "The finest is this linen. I was saving it for my wife's birthday, but she's in England and seems happier without it.",
            "Oh, you've made my day. My week, possibly. Please don't change your mind.",
            "It's all fine, really. People just don't notice. That's the story of my life.",
          ],
        },
        {
          text: "Just looking.",
          replies: [
            "Of course. Everyone's just looking. Nobody ever buys.",
            "That's all right. I'm used to it. Look all you like. I'll just stand here quietly.",
            "Please look carefully. The bolts are very lonely.",
            "I understand. If you change your mind, I'll still be here. I'm always here.",
            "Ah. Well. At least someone's looking.",
          ],
        },
        {
          text: "Do you have anything in a cheerful colour?",
          replies: [
            "Cheerful? I had a yellow once. It sold. It was the happiest day I've had in this colony.",
            "I'm afraid I don't really do cheerful. It doesn't come naturally to me, or to my stock.",
            "There's a red. It's meant to be cheerful, but somehow, in my stall, it looks a bit worried.",
            "Cheerful colours fade fastest in the sun, {title}. I've found that to be true of everything.",
            "I'll order some from {nationTown}. It'll arrive in six months, by which time you'll probably be sad too.",
          ],
        },
      ],
    },
    {
      id: "port-royale-market-abraham-parry-2",
      text: "I left a wife and a small shop in Bristol to make my fortune out here. Her last letter said the shop has never done better. She sounded pleased about it. Very pleased. Suspiciously pleased.",
    },
    {
      id: "port-royale-market-abraham-parry-3",
      text: "Do you have family waiting for you somewhere, {title}?",
      answers: [
        {
          text: "Yes, they miss me terribly.",
          replies: [
            "How wonderful. Mine miss me too, I think. It's hard to tell from the letters. They mostly talk about the weather.",
            "Then go home to them sometimes. Before they learn to manage without you. They do learn.",
            "That's a precious thing. Hold onto it. Write often, and send money. Mostly send money.",
            "Lucky soul. My son wrote last month. He said hello and asked for a new pair of boots.",
            "Envy is a sin, but I'm committing it anyway.",
          ],
        },
        {
          text: "No, it's just me and the sea.",
          replies: [
            "The sea is a cold sort of family. But it doesn't write letters telling you how well it's doing without you.",
            "Then we're two of a kind. Alone, adrift and charging a fair price.",
            "Perhaps that's better. Nobody to disappoint.",
            "I'm sorry. Here, take a handkerchief. No charge. I've plenty, I use them often.",
            "Well, you're always welcome at my stall. I'm always here. Which is rather the problem.",
          ],
        },
        {
          text: "My family is a parrot named Admiral.",
          replies: [
            "A parrot. At least a parrot talks back. My wife has stopped bothering.",
            "Does the Admiral need any cloth? A small cape, perhaps? I've offcuts.",
            "That's rather lovely, actually. Does he miss you when you go ashore?",
            "A parrot lives for decades, you know. He'll outlast my marriage.",
            "Give the Admiral my regards. He's probably more cheerful company than I am.",
          ],
        },
      ],
    },
    {
      id: "port-royale-market-abraham-parry-4",
      text: "Port Royale is very lively, they tell me. I wouldn't know. I'm usually here, folding cloth while everyone else has a good time.",
    },
    {
      id: "port-royale-market-abraham-parry-5",
      text: "Do you think a man can still make his fortune at fifty-two, {title}? Be honest. No, don't be honest. Be kind.",
      answers: [
        {
          text: "Of course you can.",
          replies: [
            "You're very kind. I don't believe a word, but you're very kind.",
            "Thank you. I'll hold onto that. It's the nicest thing anyone's said to me since 1637.",
            "Do you mean it? No, don't answer. Let me keep it as it is.",
            "Perhaps. Perhaps the Spanish treasure fleet will wash up on my doorstep. Stranger things have happened. Not to me, though.",
            "Then I'll give it one more year. I said that last year. And the one before.",
          ],
        },
        {
          text: "Honestly? Probably not.",
          replies: [
            "I asked you not to be honest. But I respect it. Ouch, though.",
            "Yes. That's what I thought. It's comforting, in a way, to have it confirmed.",
            "You and my wife would get on well.",
            "Ah. Well. I'll fold this bolt again, then. It calms me.",
            "Thank you for your honesty. Please buy something to make up for it.",
          ],
        },
        {
          text: "Rob a galleon. Works for everyone else.",
          replies: [
            "Me? I faint at the sight of ink on my fingers. A cutlass would be the end of me.",
            "I could ask the galleon nicely. That's about the limit of my piracy.",
            "Ha. Piet Heyn did it. I'm no Piet Heyn. I'm barely an Abraham Parry.",
            "You make it sound so easy. I can't even get people to buy linen.",
            "If I robbed a galleon, I'd only give it back and apologise.",
          ],
        },
      ],
    },
    {
      id: "port-royale-market-abraham-parry-6",
      text: "If you're sailing to Bristol, {title}, would you look in on a small shop on Broad Street? Don't say I sent you. Just see if they look happy. Then don't tell me.",
    },
  ],

  "port-royale-governor-archibald-stokes": [
    {
      id: "port-royale-governor-archibald-stokes-1",
      text: "Ah, {title} {name}. I've been expecting you. I always expect everyone, eventually. Shall we discuss what you might do for Port Royale, and what Port Royale might do for you?",
      answers: [
        {
          text: "What did you have in mind?",
          replies: [
            "Nothing yet. I like to know a captain's price before I know what I need. It saves time.",
            "A little of this, a little of that. Mostly that. The details will be in a sealed letter.",
            "Patience. Ideas are like wine, they're best when someone else has paid for them.",
            "Oh, small things. Delivering a letter, forgetting a face. You'd be surprised how valuable forgetting is.",
            "I'll let you know. In the meantime, consider yourself a friend of the governor. That sort of thing costs.",
          ],
        },
        {
          text: "I don't do favours.",
          replies: [
            "Everyone does favours, {title}. The only question is whether they know it at the time.",
            "Of course you don't. And I don't keep a list of people who owe me. Let's both enjoy our little fictions.",
            "Admirable. I'll write that down beside your name. In pencil, in case you change your mind.",
            "That's what the last governor said. Charming man. I wonder where he is now.",
            "No favours. Very well. Then let's call it business, and I'll still remember it as a favour.",
          ],
        },
        {
          text: "Is your list alphabetical?",
          replies: [
            "By how useful they are. You're near the middle. For now.",
            "Alphabetical, by debt, then by how much they'd hate it known. A beautiful system.",
            "I can't possibly tell you. But you are on it, in very neat handwriting.",
            "Ha. Most captains ask if they're on it. You asked how it's organised. Interesting.",
            "It's in a cipher. Even I need a moment with it, and I wrote the cipher.",
          ],
        },
      ],
    },
    {
      id: "port-royale-governor-archibald-stokes-2",
      text: "I began as a clerk. Copying letters for men who could barely read them. You learn a great deal about people from what they ask you to copy. And even more from what they ask you to burn.",
    },
    {
      id: "port-royale-governor-archibald-stokes-3",
      text: "A ship from {enemyTown} lies in our harbour, flying a neutral flag. Its captain is very generous at dinner. Should I trust him?",
      answers: [
        {
          text: "Never trust a generous man.",
          replies: [
            "Precisely. I'm generous at dinner too, and look at me.",
            "A wise answer. He's been generous to the harbour master as well. I'm wondering why.",
            "Quite right. I'll have someone count his cannons while he counts his compliments.",
            "Good. You and I would get on, as long as neither of us trusted the other.",
            "Generous men are usually buying something. I'd like to know what, and how much it's worth to me.",
          ],
        },
        {
          text: "He seems harmless.",
          replies: [
            "Everyone seems harmless at dinner. That's what dinner is for.",
            "Harmless. Hmm. Then I'll have him watched twice as closely. Harmless people worry me.",
            "Do you know him? Interesting. I'll make a note.",
            "So did I, once. I was very young then. About a week ago.",
            "Harmless is a strategy, {title}, not a character.",
          ],
        },
        {
          text: "Poison his soup. Classic.",
          replies: [
            "Goodness, {title}. I would never. Not the soup, at least. Too obvious.",
            "I'll pretend you didn't say that, and remember that you did.",
            "Crude. Effective, but crude. We prefer subtler things in Port Royale, like paperwork.",
            "Ha! You've been reading Italian plays. Real life is much more about ledgers.",
            "Soup is a terrible place to hide anything. It's always being stirred.",
          ],
        },
      ],
    },
    {
      id: "port-royale-governor-archibald-stokes-4",
      text: "Every sealed letter on this desk is a promise someone wishes they hadn't made. I never open them unless I need to. Knowing that I could is usually enough.",
    },
    {
      id: "port-royale-governor-archibald-stokes-5",
      text: "Suppose a captain heard that the governor of {otherTown} has been trading with the {enemyAdjective}. Would that captain tell me, or keep it to himself?",
      answers: [
        {
          text: "Tell you, of course.",
          replies: [
            "How loyal. I like loyalty. It's so easy to predict.",
            "Good. Information is a currency, {title}, and I always pay my debts. Eventually.",
            "Splendid. And would that captain have proof? Letters, perhaps? I do love letters.",
            "Then you'd be in my good graces. They're small, but they're very comfortable.",
            "Wonderful. I'll remember that. I remember everything.",
          ],
        },
        {
          text: "Keep it, for the right price.",
          replies: [
            "Now you're thinking like a governor. That's either a compliment or a warning.",
            "Ah, a negotiator. What price would you name? Speak softly, the walls belong to me.",
            "Clever. But remember, a secret sold twice is worth nothing. Sell it to me once.",
            "I can pay. I can also make things difficult. Which would you prefer?",
            "I'll double whatever he offers you. And then I'll quietly halve it later.",
          ],
        },
        {
          text: "That captain would be you, wouldn't it?",
          replies: [
            "What a wicked imagination. I like it. Never say it outside this room.",
            "Me? I'm merely a governor with a great many friends in a great many towns.",
            "Hmm. You're sharper than you look, {title}. I'll move you up the list.",
            "Let's not speak of hypothetical captains. They never pay their debts.",
            "If it were, I'd hardly be asking you. Would I? Would I?",
          ],
        },
      ],
    },
    {
      id: "port-royale-governor-archibald-stokes-6",
      text: "Do enjoy Port Royale, {title}. Drink, trade, make friends. Everyone you meet here will tell me about it, of course, but don't let that spoil your fun.",
    },
  ],

  "barbados-tavern-miles-barnes": [
    {
      id: "barbados-tavern-miles-barnes-1",
      text: "Oh, sorry. I was writing. Do you want to hear a poem, {title}? It's about a girl in Plymouth. They're all about her.",
      answers: [
        {
          text: "Go on, then.",
          replies: [
            "Her eyes were blue as the Plymouth Sound, her hair was gold as wheat. I sailed to the end of the world, and still she's in every street. It's not finished.",
            "My heart is like a sugar mill, it grinds and grinds all day. That's all of it. I couldn't find a rhyme for mill that wasn't 'ill'.",
            "Oh Mary, oh Mary, the sea is so wide. Oh Mary, oh Mary. That's as far as I got before I cried.",
            "The waves are long, the nights are cold, the rum is weak and dear. I left my heart in Plymouth, Mary, so it isn't really here.",
            "It goes: Mary, Mary, Mary. Then a long pause. Then Mary again. The pause is the best part.",
          ],
        },
        {
          text: "Is she worth two hundred poems?",
          replies: [
            "She's worth two thousand. I've only had the time for two hundred.",
            "You've never met her. She once smiled at me over a bread stall. I've lived on that for three years.",
            "Maybe not. But the poems are worth something. Possibly. One day. To someone.",
            "I don't know anymore. But I can't stop now, I'm nearly at a round number.",
            "That's the question, {title}. The answer is in poem two hundred and one. I haven't written it.",
          ],
        },
        {
          text: "I prefer limericks about scurvy.",
          replies: [
            "Scurvy? That's... actually not a bad subject. Lots of rhymes for gums.",
            "There once was a sailor named Sam... no. No, I can't. My heart isn't in it.",
            "Limericks are for people who are happy. I don't have the build for happy.",
            "I'll try one. There was a young man from Barbados. Whose love had gone... I'll finish it later.",
            "That's cruel, {title}. Funny. But cruel.",
          ],
        },
      ],
    },
    {
      id: "barbados-tavern-miles-barnes-2",
      text: "I signed on as a cabin boy to forget her. I've forgotten Plymouth, my mother's face and how to tie a bowline. Mary, I remember perfectly.",
    },
    {
      id: "barbados-tavern-miles-barnes-3",
      text: "Should I send the poems, {title}? All two hundred of them? In one envelope?",
      answers: [
        {
          text: "Yes. Send them all.",
          replies: [
            "All of them? The envelope would be the size of a cargo crate. But it would show I meant it.",
            "You think so? Really? Oh, my hands are shaking. Not today, though. Tomorrow. Probably.",
            "I'll do it! Next ship. Or the one after. When the weather's better. It's never better.",
            "Then she'll know. She'll read every word. Oh no. She'll read every word.",
            "I'd need to pay postage on two hundred poems. That's a whole season's wages. Love is expensive.",
          ],
        },
        {
          text: "Just send the best one.",
          replies: [
            "The best one? They're all the best one. That's the problem.",
            "Maybe number forty-seven. Or ninety-two. Or the one about the seagull. I'll need a week to decide.",
            "That's sensible. But how do you choose your favourite heartbreak?",
            "Good advice. I'll copy out the best one and then send none of them, as usual.",
            "One poem. Yes. If she likes it, I'll send the next one. In a year or two.",
          ],
        },
        {
          text: "Burn them and write about sugar instead.",
          replies: [
            "Burn them? You monster. I'll write a poem about you. A sad one.",
            "Sugar. Hm. 'Sweet as the cane on Barbados' fields.' Wait. That's still about her.",
            "Everyone here writes about sugar. The planters talk of nothing else since they gave up tobacco.",
            "I tried writing about sugar once. It turned into a poem about Mary's teeth. They're lovely teeth.",
            "I couldn't. They're all I have. Well, them and this quill. And a debt to the landlord.",
          ],
        },
      ],
    },
    {
      id: "barbados-tavern-miles-barnes-4",
      text: "The planters here pulled up the tobacco for sugar cane. They say tobacco was ruining them. I know the feeling. Some things you have to uproot entirely.",
    },
    {
      id: "barbados-tavern-miles-barnes-5",
      text: "Have you ever been in love, {title}?",
      answers: [
        {
          text: "Yes, more than once.",
          replies: [
            "More than once? How do you recover? Is there a remedy? Is it rum? It isn't rum, I've tried.",
            "Then you understand. Or you don't, because you moved on. I don't know how people do that.",
            "Tell me about them. No, don't. I'll only write poems about your heartbreak too.",
            "More than once. That sounds tiring. Once has nearly finished me.",
            "Then you're braver than me. I've only managed once and I'm still recovering.",
          ],
        },
        {
          text: "Only with my ship.",
          replies: [
            "That's beautiful, actually. A ship can't break your heart. Well, it can break everything else.",
            "Does she love you back? She must. She keeps you afloat.",
            "I might write a poem about that. About you and your ship. A happy one, for a change.",
            "A ship doesn't stay in Plymouth while you sail away. That's very sensible of you.",
            "Ah. At least you can go wherever she goes.",
          ],
        },
        {
          text: "No. Love is for poets and fools.",
          replies: [
            "I'm both, so that's fair.",
            "Then I'm doing very well at being both.",
            "Poets and fools have more fun than you'd think. Mostly the fools.",
            "You sound like my uncle. He's lonely. Very rich, but lonely.",
            "Maybe. But fools write better poems.",
          ],
        },
      ],
    },
    {
      id: "barbados-tavern-miles-barnes-6",
      text: "Someone told me she married a cooper. I don't believe it. Coopers can't rhyme. What would they even talk about? Barrels?",
    },
  ],

  "barbados-market-beatrix-lamb": [
    {
      id: "barbados-market-beatrix-lamb-1",
      text: "Let's not waste each other's time, {title}. Are you here to buy sugar, sell me something or ask me for directions?",
      answers: [
        {
          text: "To buy sugar.",
          replies: [
            "Good. Here's my price. It isn't going down, and if you wait, it'll go up.",
            "Excellent. Test any loaf you like with the knife. If you find rot, it's free. You won't.",
            "Then you're in the right place. Everyone else on this market copies my prices, but not my sugar.",
            "Sugar's the gold of Barbados now, {title}. Priced accordingly.",
            "Splendid. How much? Don't say 'some'. 'Some' isn't a number.",
          ],
        },
        {
          text: "To sell you something.",
          replies: [
            "Then let me tell you what I'll pay, and you can save your breath on the speech.",
            "Show me. If it's good, I'll buy it. If it's not, I'll tell you. Loudly.",
            "I buy cheap and sell dear. You'll not get rich from me, but you'll get paid.",
            "Everyone wants to sell. Nobody wants to haggle with me. Funny, that.",
            "Out with it. And don't tell me it's rare. Everything's rare until three ships bring it.",
          ],
        },
        {
          text: "Directions to your heart.",
          replies: [
            "It's behind the ledger, past the knife, and you can't afford the toll.",
            "Ha! That's a new one. My husband tried that. Took him three years and a cartload of tobacco.",
            "Sorry, {title}, closed for business. Try the parson's niece, she's easily impressed.",
            "Cheeky. I'll add a shilling to whatever you buy for wasting my time so charmingly.",
            "Left at the sugar loaves, then straight into the harbour. Swim fast.",
          ],
        },
      ],
    },
    {
      id: "barbados-market-beatrix-lamb-2",
      text: "My husband left me this stall and a pile of debts. I paid the debts in six months and doubled the trade in a year. He'd be proud. Or annoyed. With him it was hard to tell.",
    },
    {
      id: "barbados-market-beatrix-lamb-3",
      text: "The planters here switched from tobacco to sugar, and now every fool on the island wants to grow cane. What's the smart move, {title}?",
      answers: [
        {
          text: "Grow sugar like everyone else.",
          replies: [
            "And sell it at the same price as everyone else? That's not smart, that's crowded.",
            "Easy for you to say. You don't have to stand in a field in this heat.",
            "Fine for the planters. For a merchant, the money is in buying from them while they panic.",
            "Following the herd is safe until the herd walks off a cliff.",
            "Hmph. That's the answer of a man who's never seen a sugar price fall.",
          ],
        },
        {
          text: "Sell them what they need.",
          replies: [
            "Exactly. Copper pots, tools, barrels, food for the workers. Everyone wants sugar, nobody wants to farm it hungry.",
            "Ha! You think like me. Dangerous. I may have to watch you.",
            "Right. When the whole island digs for gold, sell shovels. Or in this case, kettles.",
            "That's why my stall's doing well. That and I'm better at this than anyone else.",
            "Good answer. You'd make a decent merchant. Not as decent as me, mind.",
          ],
        },
        {
          text: "Grow tobacco. Be a rebel.",
          replies: [
            "And starve in style? I don't think so.",
            "Ha! There's always one. The last rebel's farm is now a goat pasture.",
            "Tobacco prices went down because Virginia grows it better. You'd be rebelling into poverty.",
            "Rebels don't pay their bills, {title}. I know, I've chased several.",
            "Cheeky. I'll sell you seeds if you're serious. At a rebellious price.",
          ],
        },
      ],
    },
    {
      id: "barbados-market-beatrix-lamb-4",
      text: "This knife tests every sugar loaf before I buy. A good loaf cuts clean. A bad one crumbles. Men are much the same, {title}, in my experience.",
    },
    {
      id: "barbados-market-beatrix-lamb-5",
      text: "I hear {merchandise} is cheap in {otherTown} this {month}. Do you know, or are you only guessing like the rest?",
      answers: [
        {
          text: "I know. I've just come from there.",
          replies: [
            "Then tell me the price, and I'll tell you if you were robbed.",
            "Good. Information is worth more than cargo some days. What will you take for it?",
            "Fresh news! Sit down. Tell me every price you saw. I'll give you a discount on the sugar.",
            "Then I'll buy from you, if you're quick. Prices on these islands don't wait.",
            "Excellent. Be specific. 'Cheap' isn't a number either.",
          ],
        },
        {
          text: "Guessing, honestly.",
          replies: [
            "At least you're honest. That's rarer than cheap goods.",
            "Then guess somewhere else. I deal in facts.",
            "Hmph. If guessing paid, the whole harbour would be rich.",
            "Fine. Go and check, and come back with numbers. I'll make it worth your time.",
            "Honesty's nice. Profitable rarely. But nice.",
          ],
        },
        {
          text: "Everything's cheap if you don't pay.",
          replies: [
            "That's called piracy, {title}, and you'd need a much bigger ship.",
            "Ha! True. But I'd find you. I always find the ones who don't pay.",
            "Cheeky. You'd fit in with half the captains here. The other half are worse.",
            "Then you'd better not try it at my stall. This knife has tested more than sugar.",
            "Not paying is very cheap, right up until the hanging.",
          ],
        },
      ],
    },
    {
      id: "barbados-market-beatrix-lamb-6",
      text: "The other merchants copy my prices and think I don't notice. I notice. Sometimes I put a price up for a day just to watch them all follow me off a cliff.",
    },
  ],

  "barbados-governor-eleanor-richardson": [
    {
      id: "barbados-governor-eleanor-richardson-1",
      text: "You are addressing Her Excellency, the acting governor of Barbados. Do remember the 'Excellency' part. My husband forgets it, and he's been sleeping in the stables.",
      answers: [
        {
          text: "Of course, Your Excellency.",
          replies: [
            "Very good. You may stay. You may even sit, if the chair is low enough.",
            "Lovely. That's precisely the tone. Short, respectful and slightly frightened.",
            "Correct. I'll tell my secretary to put you on the list of people who know how to behave. It's short.",
            "Splendid. I'll allow you to compliment my pearls before we continue.",
            "Ah, a captain with manners. You must not be from around here.",
          ],
        },
        {
          text: "Is your husband all right?",
          replies: [
            "He's ill, which is an excuse, and lazy, which is not. He's quite comfortable in the stables.",
            "He's recovering. Slowly. I've told him to hurry, but he doesn't listen. He never did.",
            "The doctor says he'll be fine if he rests. I say he'll be fine if he calls me Your Excellency.",
            "He's well enough to complain, which means he's well enough to stay where he is.",
            "How kind. He's improving, thank you. I'll pass on your regards. Formally, in writing.",
          ],
        },
        {
          text: "I'll call you Ellie.",
          replies: [
            "You will do no such thing. The last man who said that is now growing sugar in a very hot field.",
            "Ellie? Ellie! I haven't been Ellie since I was six, and even then I didn't like it.",
            "Guards! No, wait, I don't have guards. I have a secretary. He's very glaring.",
            "That's... the boldest thing anyone's said to me in this room. Don't do it again.",
            "Hmph. I'll forget I heard that. My fan won't. It snaps very hard.",
          ],
        },
      ],
    },
    {
      id: "barbados-governor-eleanor-richardson-2",
      text: "I took over the island when my husband fell ill. Since then, taxes are collected, roads are repaired and the sugar ships sail on time. I'm not saying he was the problem. I'm just saying.",
    },
    {
      id: "barbados-governor-eleanor-richardson-3",
      text: "I'm planning a grand ball to celebrate the King's birthday. Who on this island deserves an invitation, {title}?",
      answers: [
        {
          text: "Only the finest families.",
          replies: [
            "Exactly. Which means about four families, and two of them owe me money.",
            "Of course. The rest can watch from the street. They'll enjoy that.",
            "Spoken like someone who would never be invited. Don't be sad, it's for the best.",
            "Yes. Excellent. I'll have my secretary make the list. Then I'll cross off half.",
            "Quite right. Fine families, fine silks, fine wine and a fine governor. Me.",
          ],
        },
        {
          text: "Everyone. It's a party.",
          replies: [
            "Everyone? Including the fishmongers? The smell alone would kill the musicians.",
            "Absolutely not. A ball is not a party, it's a battlefield with dancing.",
            "You'd invite the tavern lot? They'd drink the punch and steal the candlesticks.",
            "How very... democratic. No.",
            "Hmph. You'd make a terrible governor. Wonderful guest, terrible governor.",
          ],
        },
        {
          text: "Me, obviously.",
          replies: [
            "You? On what grounds? Do you dance? Do you own silk? Do you know which fork to use?",
            "Hmm. A captain could add a dash of danger to the evening. Bring a sword, but don't use it.",
            "Perhaps. If you wear something that isn't salt-stained. And bow correctly. Practise.",
            "Ha! Bold. I may invite you, just to see the look on the planters' faces.",
            "I'll consider it. Send me your request in writing. On good paper.",
          ],
        },
      ],
    },
    {
      id: "barbados-governor-eleanor-richardson-4",
      text: "When this island grew tobacco, it was poor and muddy. Now it grows sugar, and it is rich and muddy. I have plans for the mud.",
    },
    {
      id: "barbados-governor-eleanor-richardson-5",
      text: "The {enemyAdjective} have been seen near the island. My husband would have panicked. What would you do in my place, {title}?",
      answers: [
        {
          text: "Strengthen the coastal forts.",
          replies: [
            "Already done. I had the forts strengthened last spring. And painted. Defences should look grand.",
            "Exactly what I said. My husband said 'later'. I said 'now'. Now he's in the stables.",
            "Good. Practical. You may stay a little longer.",
            "Yes. I've added cannons at every bay. Some of them even work.",
            "Sensible. I've raised a tax to pay for it. Everyone complains. Everyone also feels safer.",
          ],
        },
        {
          text: "Send for help from England.",
          replies: [
            "England is busy with the King's quarrel with Parliament. By the time help arrives, we'd be speaking another language.",
            "I have sent letters. They answer them with letters. Very slow, very polite letters.",
            "Help from England? That's what my husband would say. That's why he's in the stables.",
            "We help ourselves on this island, {title}. That's how we got rich.",
            "London barely knows where Barbados is. One clerk asked if it was near Scotland.",
          ],
        },
        {
          text: "Point your fan at them.",
          replies: [
            "Do not mock the fan. This fan has silenced bishops.",
            "If they come close enough, I might. It snaps louder than a musket.",
            "Hmph. My husband tried that joke once. Once.",
            "It wouldn't be the first fleet I'd sent packing with a look.",
            "Cheeky. But you're not wrong. The fan is very effective at close range.",
          ],
        },
      ],
    },
    {
      id: "barbados-governor-eleanor-richardson-6",
      text: "You may go, {title}. And when you write home, tell them Barbados is well governed. By me. They do tend to forget.",
    },
  ],
}
