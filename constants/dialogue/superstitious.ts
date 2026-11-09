import "server-only"

export const SUPERSTITIOUS: DialogueEntry[] = [
  {
    id: "superstitious-1",
    text: "Don't whistle in here, {title}. Whistling calls up the wind, and the last fellow who whistled at this table blew his own hat into the harbour.",
  },
  {
    id: "superstitious-2",
    text: "You came in left foot first, {title}. Did you mean to, or shall we both pretend it didn't happen?",
    answers: [
      {
        text: "I'll go out and come in again.",
        replies: [
          "Bless you. Three times round the post as well, if you don't mind. Clockwise.",
          "A sensible soul at last. Most just laugh and then their mainmast falls on them.",
          "Right foot this time. And don't look at the cat on your way back in.",
          "Good. I'll keep my lucky charm in my pocket, then, instead of in my fist.",
          "That's the spirit. Saint Elmo sees these things, you know. He keeps a little book.",
        ],
      },
      {
        text: "I have two left feet. It's a family matter.",
        replies: [
          "Then you're doubly cursed and I'll be standing over here, thank you.",
          "Saints preserve us. Does your mother know? Of course she does. Poor woman.",
          "Two left feet. That explains your dancing and your luck both.",
          "I knew a man with two left feet. He drowned in a bucket. Twice.",
          "Don't joke about feet, {title}. Feet are how the sea finds you.",
        ],
      },
      {
        text: "I came in on my hands, actually.",
        replies: [
          "Hands first? I've no saint for that. I shall have to write to Rome.",
          "That's either very lucky or very wicked, and I'm not stopping to find out.",
          "Well, I didn't see it, so I'm choosing to believe it was the right hand.",
          "A tumbler, are you? Tumblers bring rain. I'll fetch a bucket.",
          "Don't. Don't make me consult the fish. I've only got the one left.",
        ],
      },
    ],
  },
  {
    id: "superstitious-3",
    text: "A red-haired woman walked down the quay at dawn and three ships in {town} delayed sailing. I was the one who told them to. Did I do right, {title}?",
    answers: [
      {
        text: "You probably saved their lives.",
        replies: [
          "I know! And not one of them has thanked me. They just called me names and paid for an extra day's mooring.",
          "Bless you for saying it. I'll tell my wife. She thinks I should mind my own business.",
          "Probably? Certainly. One of those ships had a cat with a limp. It would have been carnage.",
          "That's what I told the harbourmaster. He didn't agree, but he's got ginger whiskers himself, so he would say that.",
          "Thank you. I'll light a candle for the ships and a smaller one for the redhead. She can't help it.",
        ],
      },
      {
        text: "You cost them a day of trade.",
        replies: [
          "A day of trade is cheaper than a hull on the reef, {title}. Ask any widow.",
          "Trade comes back. Drowned sailors don't. Well, the drowned sailor on the beach does, but he's an exception.",
          "You sound like the merchants. They shouted at me in three languages. I only understood the rude bits.",
          "A day lost on land, a lifetime saved at sea. I should have that embroidered.",
          "Their {merchandise} will keep. Their luck wouldn't have.",
        ],
      },
      {
        text: "I have red hair under this hat.",
        replies: [
          "Keep it under there! For pity's sake, keep the hat on until you're well out of the harbour.",
          "Under your hat? Oh, saints. I've been standing next to you for ten minutes.",
          "Then you're more dangerous than you look, and you look fairly dangerous already.",
          "I don't believe you. Show me. No! Don't show me. I don't want to know.",
          "That explains the weather we've been having. I'll fetch a sprig of rosemary.",
        ],
      },
    ],
  },
  {
    id: "superstitious-4",
    text: "I cut open a snapper this morning, {title}, and the guts curled into the shape of a crown. Something is coming for {nation}. Or the snapper was ill. One of the two.",
    answers: [
      {
        text: "What else did the guts say?",
        replies: [
          "They said war, and they said wet weather, and they said not to eat that snapper. I listened to all three.",
          "A crown and a broken anchor. I've slept with my boots on since.",
          "That {enemy} will come in the autumn. Or that I need a sharper knife. Guts are not always clear.",
          "They spelled out a word, I swear it. I can't read, so I'm none the wiser, but it looked important.",
          "Nothing more. The cat ate the rest of the prophecy before I could finish.",
        ],
      },
      {
        text: "Perhaps it was just a fish.",
        replies: [
          "Just a fish. That's what the Spanish said about the whale before Piet Heyn took their silver.",
          "Nothing is just a fish, {title}. Fish have seen the bottom of the sea. They know things.",
          "You'll say that until a fish tells you something you didn't want to hear.",
          "Hush. They can hear you in the barrel.",
          "And you're just a captain, I suppose? We're all more than we look.",
        ],
      },
      {
        text: "I read the future in biscuit weevils myself.",
        replies: [
          "Weevils? Weevils only ever predict more weevils. Everyone knows that.",
          "Oh, a weevil man. I've heard of your sort. Very accurate on Tuesdays.",
          "And what do they tell you? Don't say scurvy. Please don't say scurvy.",
          "That's a coarse art, {title}, but I respect a man who looks at his biscuit before he eats it.",
          "My uncle tried weevils. They told him to marry a widow in {otherTown}. It went badly for everyone, mostly the weevils.",
        ],
      },
    ],
  },
  {
    id: "superstitious-5",
    text: "Never sail on a Friday, {title}. Our Lord died on a Friday and he wasn't even at sea.",
  },
  {
    id: "superstitious-6",
    text: "I carry a caul in a little pouch round my neck. Born with it, I was. No man born with a caul has ever drowned. Were you born with one, {title}?",
    answers: [
      {
        text: "I don't know. I never asked.",
        replies: [
          "Never asked? Write to your mother at once. It's the most important thing she knows about you.",
          "Then assume you weren't, and stay away from deep water. And shallow water. And puddles, to be safe.",
          "You can tell by the ears. Let me look. Hm. No caul. Sorry.",
          "A man should know his own luck. It's like knowing your own name, but wetter.",
          "I'll sell you a piece of mine. Only a little piece. It still works if you share it, I think.",
        ],
      },
      {
        text: "Yes, and I sold it for a pistol.",
        replies: [
          "You sold your caul? Holy Mother. You sold your drowning insurance for a thing that goes bang.",
          "I hope it's a very good pistol, because it's all that stands between you and the bottom now.",
          "Who bought it? Tell me who bought it. I'd like to stand next to him in a storm.",
          "That's the worst trade I've ever heard of, and I once watched a man swap his wife for a goat.",
          "Well, at least you can shoot the sea when it comes for you. Won't help, but it'll feel good.",
        ],
      },
      {
        text: "No, but I was born during a thunderstorm.",
        replies: [
          "Thunder at a birth! That's either a great captain or a great nuisance. Possibly both.",
          "Then the sky has an interest in you. Keep your head down when it rains.",
          "Same as my brother. He's been struck by lightning twice. He says it tickles now.",
          "Good. Storm children don't drown, they just get very damp and complain about it.",
          "Well, that explains the temper, {title}. I mean that respectfully.",
        ],
      },
    ],
  },
  {
    id: "superstitious-7",
    text: "Which saint do you pray to before a voyage, {title}?",
    answers: [
      {
        text: "Saint Nicholas, patron of sailors.",
        replies: [
          "A good choice and a busy man. Light two candles, he has a lot of letters to get through.",
          "Saint Nicholas, yes. He calmed a storm once just by frowning at it. I try that at home with my wife.",
          "Proper of you. I'll add you to my own prayers, just in case he loses your name.",
          "He's kept me dry for thirty years, apart from that one time, and I'm sure that was my fault.",
          "Nicholas and Elmo together, that's the trick. Never put all your saints in one barrel.",
        ],
      },
      {
        text: "I pray to my purse. It answers more often.",
        replies: [
          "Hush! The saints are listening and they're terribly touchy about money.",
          "Then I hope your purse can swim, {title}, because it'll be the only one praying for you in a squall.",
          "That's how the Dutch do it, and look at them. Rich and damp.",
          "Your purse won't light a candle for you when you're gone. I might, for a small fee.",
          "Blasphemy and bad business both. I'll say one for you anyway. I can't help myself.",
        ],
      },
      {
        text: "None. I trust in a good hull and a better pilot.",
        replies: [
          "A hull is only wood, and wood remembers being a tree. Trees don't like the sea.",
          "Brave words. The bravest men I knew said the same, and I visit them every All Souls' Day.",
          "A good pilot prays too. You just don't see it because he does it with his eyebrows.",
          "Well, I'll pray for your hull, then. Somebody has to.",
          "I'll stitch a saint into your collar when you're not looking. You'll thank me in a hurricane.",
        ],
      },
    ],
  },
  {
    id: "superstitious-8",
    text: "Plague in {otherTown}, they say. Or a rumour of plague, which is worse, because you can't burn a rumour. I've hung garlic over every door I own, and a few I don't. Have you come from there, {title}?",
    answers: [
      {
        text: "No, I've not been near it.",
        replies: [
          "Thank the saints. Swear it on something. Your hat will do.",
          "Good. Then you may come a step closer. One step. That's plenty.",
          "I believe you. Mostly. Here, chew this clove of garlic anyway.",
          "Keep it that way. Plague rides in on sailors and rats, and you're at least one of those.",
          "Then I'll stop holding my breath. I've been holding it since you walked in.",
        ],
      },
      {
        text: "Yes. I feel fine, though.",
        replies: [
          "That's what they all say! Then they feel less fine, and then they feel nothing at all.",
          "Stand over there, by the window. The breeze will carry the bad airs away from me.",
          "Fine for now. Smell this vinegar rag. Deeply. Deeper. Good.",
          "Saint Roch preserve us. I'll be burning juniper for a week after you leave.",
          "Did you touch anything? Don't touch anything. Especially not me.",
        ],
      },
      {
        text: "I am the plague. I've come for your garlic.",
        replies: [
          "Then the garlic's working, because you haven't come any closer!",
          "Ha! The plague doesn't make jokes, {title}. The plague has no sense of humour at all.",
          "You can't have it. I'll fight you for it. I'll fight you with it.",
          "Saints, don't say that out loud. Words like that wander off and find people.",
          "If you were the plague, you'd be better dressed. The plague does very well for itself.",
        ],
      },
    ],
  },
  {
    id: "superstitious-9",
    text: "The moon had a ring round it last night. Ring round the moon, rain by noon. Or hurricane by Thursday. Or my eyes are going. I've been wrong about two of those.",
  },
  {
    id: "superstitious-10",
    text: "Have you ever seen a sea serpent, {title}?",
    answers: [
      {
        text: "Never. They're sailors' stories.",
        replies: [
          "That's what they want you to think. Serpents are very good at public opinion.",
          "My cousin saw one off {otherTown}. Forty fathoms long, eyes like lanterns, and it took his good boot.",
          "Stories have to come from somewhere, {title}. Usually from someone who got eaten afterwards.",
          "You've just been lucky. Or the serpent's been busy. Either way, don't say that out loud at sea.",
          "A sceptic. They're the serpent's favourite meal. All that dry wit makes for crunchy bones.",
        ],
      },
      {
        text: "Yes. It owed me money.",
        replies: [
          "Did it pay? They never pay. They just coil round the debt and sink.",
          "Don't make light. A serpent with a grudge follows a ship for seven years.",
          "That's worse than a man owing you money. You can't take a serpent to the magistrate.",
          "Ha! Well, if you see it again, tell it the tavern in {town} still wants its tab settled.",
          "I'll believe it. They borrow, you know. Rings, anchors, sometimes whole sloops.",
        ],
      },
      {
        text: "I saw something big off the coast once.",
        replies: [
          "I knew it. I knew it! What colour was it? Green means war. Grey means weather.",
          "Did you throw it a coin? You always throw it a coin. Silver if you have it.",
          "Then you're marked, {title}. Not badly. Just a little. Keep a horseshoe on the bowsprit.",
          "Probably a whale. Probably. But I'd not sail that way on a Friday, all the same.",
          "Big? How big? Bigger than the governor's opinion of himself? Then it was a serpent.",
          "Speak no more of it. They hear their names in tavern talk.",
        ],
      },
    ],
  },
  {
    id: "superstitious-11",
    text: "A gull landed on the church roof in {town} and stared at me for an hour. I've not been to church since. I feel it already knows.",
  },
  {
    id: "superstitious-12",
    text: "Would you like to buy a charm, {name}? Shark's tooth, blessed by a priest in {nationTown}. Keeps off drowning, fever and in-laws.",
    answers: [
      {
        text: "How much?",
        replies: [
          "Two pieces of eight. One for the tooth, one for the blessing. The shark gave his for free.",
          "For you, a fair price. For the shark, a terrible one. He's still upset.",
          "Three reales and a promise not to whistle aboard. The promise is the expensive part.",
          "Whatever you think your life is worth, {title}. Most people say a doubloon. Some haggle, and then I worry.",
          "Less than a funeral. I always put it that way. People respond to it.",
        ],
      },
      {
        text: "Does it work?",
        replies: [
          "The last man who wore it never drowned. He was hanged in {enemyTown}, but he never drowned.",
          "Of course it works. You've never seen me drown, have you? There you are.",
          "It works if you believe in it, and it works a little bit even if you don't. Like rum.",
          "The shark it came from would say no, but he's not in a position to complain.",
          "I've worn its brother for twenty years. Not a drop of sea in my lungs. Plenty of rum, mind.",
        ],
      },
      {
        text: "I'd rather buy the shark.",
        replies: [
          "The rest of the shark is in three stomachs and a stew. You're a little late.",
          "And what would you do with a whole shark? Name it? You'd name it, wouldn't you.",
          "Ha! The shark's not for sale. It's retired. It's earned its rest, poor thing.",
          "Careful. Sharks hear when you talk about owning them. They take it personally.",
          "I can sell you his jaw. The rest of him is in the soup. Very lucky soup, though.",
        ],
      },
    ],
  },
  {
    id: "superstitious-13",
    text: "Cardinal Richelieu has a cat for every day of the week, I hear. No man needs seven cats unless he's warding something off. What do you think he fears, {title}?",
    answers: [
      {
        text: "Assassins, most likely.",
        replies: [
          "Cats see assassins coming. They hiss at them. Very useful, cats, if you can stop them sleeping.",
          "That's what a sensible man would say. I think it's ghosts. Ghosts of everyone he's annoyed, which is all of Europe.",
          "Then he's right to keep the cats. And I'd add a horseshoe over the door.",
          "Seven cats, seven assassins foiled. That's how I read it.",
          "Assassins and tax collectors, which in his mind are the same thing.",
        ],
      },
      {
        text: "Mice. He's a very nervous man.",
        replies: [
          "Ha! The most powerful man in France, terrified of a mouse. I'd believe it.",
          "Mice carry the plague, so he's not wrong. Just very thorough.",
          "Seven cats for mice. Well, that's a great many mice, or a very great fear.",
          "Even cardinals have their weaknesses, {title}. Mine is fish guts. His is mice.",
          "Now there's a man I understand. I've got four cats myself, and I'm still not sure I'm safe.",
        ],
      },
      {
        text: "Louis XIII.",
        replies: [
          "Hush! Don't say that. Cardinals have ears in every tavern, even this one.",
          "A king and his cardinal, each afraid of the other. It's like a marriage, only with more poisoners.",
          "Then he'll need more than seven cats. He'll need a lion.",
          "Smart man, {title}. Kings change their minds. Cats never do.",
          "I'll not say yes and I'll not say no. I'll just cross myself and order another drink.",
        ],
      },
    ],
  },
  {
    id: "superstitious-14",
    text: "I knew a ship that renamed herself halfway through a voyage. She sank, of course. The new name was very pretty, though. They put it on the gravestone.",
  },
  {
    id: "superstitious-15",
    text: "What brought you to {town}, {title}? Was it a sign?",
    answers: [
      {
        text: "The winds brought me.",
        replies: [
          "The winds don't bring, they're sent. Someone up there wanted you here. Possibly to buy a charm.",
          "Then mind which way they blow when you leave. A wind that brings can also take.",
          "Good winds or ill? Don't tell me. I'll know by what the fish say tomorrow.",
          "The same winds blew my father here. He never left. Well, he left the once, feet first.",
          "Mark the day, then. A wind that finds {town} on purpose is a wind with plans.",
        ],
      },
      {
        text: "Trade. I want to sell {merchandise}.",
        replies: [
          "{merchandise}? Hmm. Last time a cargo of that came in, the church bell cracked. Coincidence, I'm sure.",
          "Sell it quickly, before the moon turns. Goods go sour under a waning moon.",
          "Honest trade, that's good. Saint Homobonus watches over merchants. Little man, very strict.",
          "Have you blessed the cargo? You should bless a cargo. I'll do it for a small cut.",
          "Trade's a gamble like everything else. Throw a pinch of salt over your left shoulder before you haggle.",
        ],
      },
      {
        text: "A one-eyed parrot told me to come.",
        replies: [
          "A one-eyed parrot is an omen of the highest order! What else did it say? Did it mention me?",
          "The left eye or the right? It matters. Left is fortune. Right is a debt collector.",
          "Then you're on a holy errand and I shan't stand in your way. I'll stand slightly behind it.",
          "I've been waiting years for a bird to talk to me. They only ever look disappointed.",
          "Parrots lie, {title}. But they lie in a very specific direction, and that direction is usually treasure.",
        ],
      },
    ],
  },
  {
    id: "superstitious-16",
    text: "Bananas aboard bring bad luck. I don't know why. Nobody knows why. That's what makes it so certain.",
  },
  {
    id: "superstitious-17",
    text: "My grandmother in the old country could smell a storm three days off. She smelled one every day of her life, so she was right quite often.",
  },
  {
    id: "superstitious-18",
    text: "Do you believe in curses, {title}?",
    answers: [
      {
        text: "Only the ones my crew shout at me.",
        replies: [
          "Those count, you know. Every curse a sailor shouts goes somewhere. Usually into the rigging.",
          "Then you're more cursed than you think. Sailors have very creative mouths.",
          "Ha! Keep a sprig of rosemary in your hat. It soaks up crew curses like a sponge.",
          "I'd have them say a prayer after each one. Balances the books.",
          "My crew cursed me once in Portuguese. I've had a limp ever since. Coincidence? Ask my knee.",
        ],
      },
      {
        text: "Yes. I think I'm under one.",
        replies: [
          "I could tell from the door. You've got a grey look about the ears.",
          "Say no more. Turn your coat inside out tonight and sleep with a nail under your pillow.",
          "Who cursed you? Was it a widow? It's always a widow. Or a sailor who lost at dice.",
          "Don't worry. I've been cursed four times and I'm still here. Mostly.",
          "Bury a coin at a crossroads at midnight. Then don't tell anyone where. Then forget where. That's the hard part.",
        ],
      },
      {
        text: "No. I make my own luck.",
        replies: [
          "And who do you think made the luck before you got there? You're borrowing, {title}. Pay it back.",
          "Make your own luck. The Spanish said that before 1628. Ask them how their silver fleet is.",
          "Brave. I'll light a candle for you anyway. It costs me nothing but wax.",
          "That's what the cursed always say. Right up to the end.",
          "Making luck is fine. Just don't make it on a Friday, and don't whistle while you do it.",
        ],
      },
    ],
  },
  {
    id: "superstitious-19",
    text: "A black cat crossed my path in {town} this morning, so I went home, waited an hour and set out again. Then it crossed back. I think it was doing it on purpose. What should I do, {title}?",
    answers: [
      {
        text: "Feed it. Make friends.",
        replies: [
          "Befriend the omen? That's either genius or madness. I'll try it with a bit of salt pork.",
          "If I feed it, it'll follow me home. Then I'll have a curse living in my kitchen.",
          "Hm. My grandmother befriended a raven once. It brought her shiny buttons and a rash.",
          "A fed cat is a calm cat, and a calm cat might cross in the right direction. Very well.",
          "You're cleverer than you look, {title}. Not by much, but by a bit.",
        ],
      },
      {
        text: "Walk backwards everywhere.",
        replies: [
          "I tried that. I walked backwards into the harbour. The cat watched the whole thing.",
          "Backwards? That reverses the curse, yes, but it also reverses the dignity.",
          "That's old wisdom. You're right. I'll start tomorrow. Today I'm too frightened to move.",
          "Then the cat crosses behind me, which is worse. Much worse. Everybody knows that.",
          "I'd walk backwards straight into the governor. He'd have me flogged and the cat would laugh.",
        ],
      },
      {
        text: "Hire the cat as your bodyguard.",
        replies: [
          "A cat that curses everything near it? That's not a bodyguard, that's a weapon.",
          "Ha! What would I pay it in? Fish? It would bankrupt me by Sunday.",
          "Actually, if it's on my side, then the bad luck goes to everyone else. Oh, that's good. That's very good.",
          "I'll put it to the cat. It won't answer. Cats are terrible negotiators.",
          "You're mocking me, {title}, but I'll be the one laughing when it scratches your eyes out.",
        ],
      },
    ],
  },
  {
    id: "superstitious-20",
    text: "The flota is due through soon. Every year I pray for the silver to get safely to Seville, and every year I pray just as hard that somebody else's luck runs out. I'm not proud of it.",
  },
  {
    id: "superstitious-21",
    text: "They say a hurricane is coming this {month}. Do you feel it in your bones, {title}?",
    answers: [
      {
        text: "I feel something.",
        replies: [
          "That'll be the weather, or the pork. Both are warnings, in their way.",
          "Then we're both in for it. Tie everything down, including your hat, including your temper.",
          "Good. A captain who feels nothing is a captain on the bottom.",
          "I knew you had the gift. I could tell by the way you didn't step on the crack in the floor.",
          "My left knee has been singing since Sunday. Your bones and my knee should get together and compare.",
        ],
      },
      {
        text: "I only feel hungry.",
        replies: [
          "Hunger before a storm is a bad sign. The body wants to fill up before it goes down.",
          "Eat, then. But not fish. Fish know when a storm's coming and they taste of nerves.",
          "Same thing, really. The belly's just the bones' messenger.",
          "Ha! Well, if you're going to be blown to {otherTown}, best go on a full stomach.",
          "Have some biscuit. Knock it twice on the table first, so the weevils know you're coming.",
        ],
      },
      {
        text: "My bones are busy. Ask my elbows.",
        replies: [
          "Elbows are very unreliable prophets. They mostly forecast doors.",
          "Your elbows? Hm. Left or right? No, I don't want to know. Don't tell me.",
          "I once knew a man whose elbow predicted the magistrate. They took him in the end. Took the elbow too.",
          "I'll ask my own elbows, then. They say you're a smart mouth and should keep your shutters closed.",
          "Mock if you like, {title}. When the hurricane comes, I'll be the one with dry socks and a smug face.",
        ],
      },
    ],
  },
  {
    id: "superstitious-22",
    text: "Never say the word 'drown' aboard ship. Say 'go swimming without coming back'. The sea is listening, and the sea is a terrible literalist. Do you keep the forbidden words off your deck, {title}?",
    answers: [
      {
        text: "Always. We say 'take a long bath'.",
        replies: [
          "Oh, that's a good one. I'll steal it, if you don't mind.",
          "Very careful. The sea won't know what you mean, and that's how you want her.",
          "And pig? Do you say pig aboard? You mustn't. Say 'curly-tail'. Rabbits are worse.",
          "A long bath. Ha. I'll use it on my brother-in-law. He takes the short kind.",
          "A captain after my own heart. May your baths always be short, {title}.",
        ],
      },
      {
        text: "My crew swears so much the sea can't hear anything else.",
        replies: [
          "That's a kind of protection, I suppose. A wall of cursing round the ship.",
          "Then she'll be offended, and an offended sea is worse than a listening one.",
          "Ha! My last crew was the same. The parrot learnt the lot and then refused to speak to anyone decent.",
          "You'll want to have the ship blessed twice, then. Once for the ship and once for the crew's mouths.",
          "I'd stuff their mouths with salt pork, if I were you. Keeps the luck in and the language down.",
        ],
      },
      {
        text: "Drown. Drown, drown, drown.",
        replies: [
          "Stop! Stop that at once! There are ships in harbour!",
          "Oh, saints. You've done it now. Somebody in {town} just lost a bucket overboard, I guarantee it.",
          "I'm not listening. I've got my fingers in my ears. I can't hear a word.",
          "When you go down, {title}, don't come haunting me. I warned you.",
          "That's four times. Four! That's a full crew's worth. I'll need a priest.",
        ],
      },
    ],
  },
  {
    id: "superstitious-23",
    text: "I've heard the buccaneers on Hispaniola smoke their meat over green wood to keep the spirits of the dead away. I don't know if it works, but I've started doing it too, just in case.",
  },
  {
    id: "superstitious-24",
    text: "Would you whistle on deck, {title}, if your crew dared you?",
    answers: [
      {
        text: "Never. I'm not a fool.",
        replies: [
          "Bless you. A captain with sense. They should carve your name over the church door.",
          "Good. Whistling calls the devil's wind. Humming is allowed, but only hymns.",
          "And if they keep daring you? Throw the darer in the hold. That's what my old captain did.",
          "Sensible. I had a mate who whistled once off {enemyTown}. They found his hat. Only his hat.",
          "That's the right answer, and you said it quickly, which is the right speed.",
        ],
      },
      {
        text: "I'd whistle a jig and dance to it.",
        replies: [
          "Then I'll be standing on the shore watching your topsails blow away, crossing myself.",
          "A jig! Saints alive. You'd bring every wind in the Caribbean down on your head.",
          "Don't. Don't even say it here. There's a draught already. Feel that? That's on you.",
          "I'll pray you don't. And if you do, I'll pray it's out of tune. Bad whistling only calls a bad breeze.",
          "You'd dance, would you? Well, I hope the sea likes your feet better than I do.",
        ],
      },
      {
        text: "I can't whistle. I've tried for years.",
        replies: [
          "Then the saints have blessed you with a mercy. Don't keep trying. Give thanks.",
          "Oh, that's a fine omen. The best captains can't whistle. Or swim. Or sing.",
          "Excellent. Stay that way. Never let a sailor teach you.",
          "My brother can't whistle either. He's never seen a storm in his life. He's a baker in {nationTown}, mind.",
          "Some men are born without the knack, and the sea loves them for it.",
        ],
      },
    ],
  },
  {
    id: "superstitious-25",
    text: "King Philip lost his silver to Piet Heyn because somebody let a priest aboard on a Friday. That's my theory. The Dutch have never forgiven me for it. Well, they've never heard of me, but still.",
  },
  {
    id: "superstitious-26",
    text: "When you careen your ship, {title}, always lay her on her left side first. The left side of a ship is where the luck pools. Everybody knows that. Well, I know that.",
  },
  {
    id: "superstitious-27",
    text: "Do you know what day it is, {title}? It might be a saint's day. I can't keep track, there are so many.",
    answers: [
      {
        text: "It's an ordinary day.",
        replies: [
          "There's no such thing. Every day belongs to some saint or other. Some days to three.",
          "That's what they said on the day the hurricane took the old church. Ordinary day, my foot.",
          "Ordinary for you. For me, it's the feast of something. I'll find out by lunch.",
          "Then I'll treat it carefully. Ordinary days are when the extraordinary sneaks up.",
          "I'll light a candle anyway. Better a wasted candle than an offended saint.",
        ],
      },
      {
        text: "Saint Barnabas, I think.",
        replies: [
          "Barnabas! Oh dear. I've eaten meat. I've whistled. I've done everything wrong.",
          "Thank you, {title}. I'll pray to him at once. He's patron of peacemakers and hailstorms, I believe.",
          "Then nobody should sail. Saint Barnabas likes the harbour quiet.",
          "Barnabas, Barnabas... I did think the bread tasted holy this morning.",
          "Are you sure? You don't look like a man who knows his saints. But I'll take it.",
        ],
      },
      {
        text: "It's the feast of Saint Biscuit.",
        replies: [
          "There's no Saint Biscuit! Is there? There might be. There are so many.",
          "Don't invent saints, {title}. They might turn up, and then where would we be?",
          "Hmm. Patron of weevils, I suppose. I'll say a little one, just to be safe.",
          "Mock if you like. But if a biscuit ever saves your life, you'll be on your knees.",
          "I'll ask the priest. If he laughs, I'll know you're a liar. If he doesn't, I'll be terrified.",
        ],
      },
    ],
  },
  {
    id: "superstitious-28",
    text: "There's a woman in {otherTown} who reads tea leaves. I went once, and she read 'travel and riches'. I've been sitting in this same chair for eleven years, so I'm waiting with great interest. Do you think she lied?",
    answers: [
      {
        text: "Maybe the riches are coming to you.",
        replies: [
          "That's what I keep telling myself. I've left the door open in case they get lost.",
          "Then they're taking their time. Eleven years! The flota is faster than that.",
          "Bless you, {title}. I'll keep sitting, then. Wouldn't want them to miss me.",
          "If they do come, I'll buy a better chair. Then I'll sit in that one.",
          "You're a kind soul. Kind and probably wrong, but kind.",
        ],
      },
      {
        text: "Maybe the chair is going to travel.",
        replies: [
          "Ha! With me in it? Well, that would save me getting up.",
          "Don't say that. If this chair grows legs I'll never sleep again.",
          "Now there's a thought. I'll tell her. She'll charge me for a second reading.",
          "It's a sturdy chair. It's been to {otherTown} before, before I bought it. Perhaps it misses the place.",
          "If it travels, it's going alone. I'm not getting on a boat that's a chair.",
        ],
      },
      {
        text: "She definitely lied. Tea leaves can't read.",
        replies: [
          "Of course they can't read! She reads them. That's the whole art.",
          "You're a hard man, {title}. Hard and dry, like ship's biscuit.",
          "She was very convincing. She had a scarf and everything.",
          "Then I want my coin back. Though she did say I'd say that, so perhaps she's right after all.",
          "I'll not hear a word against her. She cured my cousin's warts by staring at them.",
        ],
      },
    ],
  },
  {
    id: "superstitious-29",
    text: "A horseshoe nailed to the mast, points up, keeps the luck in. Points down, it pours out on the deck. My last captain had his upside down. We were very lucky on deck and terrible everywhere else.",
  },
  {
    id: "superstitious-30",
    text: "Have you heard the tale of the drowned sailor who walks the beach at {town} on moonless nights, {title}?",
    answers: [
      {
        text: "Tell me.",
        replies: [
          "He was a sailor from a treasure ship, wrecked in a storm. Now he walks the sand looking for his other boot.",
          "He's harmless if you leave him a cup of wine. Good red wine, mind. He's very particular.",
          "He knocks on doors and asks the way to {otherTown}. If you tell him, you'll never see {otherTown} yourself.",
          "They say he still carries a doubloon in his teeth. Nobody's been brave enough to ask for it.",
          "He drowned because he whistled. That's the whole moral. That's every moral.",
        ],
      },
      {
        text: "I've met him. He's terrible at cards.",
        replies: [
          "You played cards with a ghost? And you won? Oh, he'll be wanting a rematch for eternity.",
          "That's where my missing knife went, then. I'd wondered.",
          "Don't joke. If he hears you, he'll follow you home and rearrange your boots.",
          "Terrible at cards and a terrible loser. That's how he drowned. Long story, involves a sore temper.",
          "I'd go to church on Sunday if I were you. Twice. Ghosts don't like losing money.",
        ],
      },
      {
        text: "I don't believe in ghosts.",
        replies: [
          "He doesn't believe in you either, so you're even. Just don't walk on the beach at night.",
          "Well, I've seen him, and he's very real. Damp, but real.",
          "Believe what you like. I put out a cup of wine for him every night and every morning it's empty.",
          "That's very modern of you. Very {playerNationAdjective} of you, I suppose. We're more careful here.",
          "Nor did the last fellow who said that. Now he walks the beach too. They share a bottle.",
        ],
      },
    ],
  },
  {
    id: "superstitious-31",
    text: "I always pour a drop of rum over the side for the sea before I drink. It's only polite. Some days I'm very polite and the sea gets most of it.",
  },
  {
    id: "superstitious-32",
    text: "The church says my charms are superstition. I say my charms keep the church out of my business. So far, we're both right.",
  },
  {
    id: "superstitious-33",
    text: "What's that on your coat, {title}? Is that a feather? Where did you get that feather?",
    answers: [
      {
        text: "A gull dropped it on me.",
        replies: [
          "A gull feather on the shoulder! That's a great luck, or a great warning. I've never been sure which.",
          "Keep it. Pin it on the inside. Gulls are the souls of drowned sailors, and that one likes you.",
          "That's better than what gulls usually drop on people. Count your blessings.",
          "Which shoulder? Left? Don't sail till Monday. Right? Sail at once.",
          "A gull marked you as one of its own. Expect to grow fond of fish.",
        ],
      },
      {
        text: "From my lucky hat.",
        replies: [
          "Then put it back! A feather out of a lucky hat is luck escaping!",
          "You let your luck moult? Oh, {title}. That's how it starts.",
          "Never mind the feather. Where's the hat? You didn't leave it on a table, did you? Never leave a hat on a table.",
          "Here, let me tuck it back in. Gently. Luck bruises easily.",
          "A lucky hat that sheds feathers is a hat trying to tell you something. Listen to the hat.",
        ],
      },
      {
        text: "I'm growing them. Slowly turning into a pelican.",
        replies: [
          "Don't jest about that. I knew a fisherman in {otherTown} who said the same. Now he lives on a post.",
          "If you do turn into a pelican, come back and visit. I'll keep fish for you.",
          "Saints. Well, there are worse fates. Pelicans never drown and never pay taxes.",
          "I'll pray you stop at the elbows. Half a pelican can still hold a tankard.",
          "Ha! Well, you've got the beak for it. I mean that kindly.",
        ],
      },
    ],
  },
  {
    id: "superstitious-34",
    text: "The war with {enemy} drags on, and I blame the comet everyone saw a few years back. A comet means war, plague and expensive bread. We've had all three, so it was clearly a very thorough comet. Did you see it, {title}?",
    answers: [
      {
        text: "I did. It was a fearsome sight.",
        replies: [
          "Fearsome, yes. I hid under the table for two nights. My wife brought me soup.",
          "Then you know. You know what it brought. I can see it in your eyes.",
          "A long white tail across the whole sky. I've never prayed so hard or so loudly.",
          "We should never have looked at it. Looking is what lets them in.",
          "And the bread went up a penny the next week. Coincidence? Ha.",
        ],
      },
      {
        text: "No, I was below deck, counting rum.",
        replies: [
          "Wise. Counting rum is a holy act in its own way. The sea respects it.",
          "Then the comet didn't see you either. That's lucky. Comets remember faces.",
          "Lucky soul. You missed the omen and got the rum. That's the best of both.",
          "I'd have joined you. Better a barrel than a comet, any day.",
          "Did the rum come out right, at least? If not, the comet got you anyway.",
        ],
      },
      {
        text: "I think the comet was the {enemyAdjective} king's pipe.",
        replies: [
          "Ha! Wouldn't surprise me. They smoke enough to light the heavens.",
          "Don't. If that's true, he'll light another one, and then where will we be?",
          "It's not his pipe, {title}. It's his temper. Same colour, mind.",
          "If it was his pipe, I'd like a word with his tobacconist. That's strong leaf.",
          "Hush. Comets carry gossip back to the stars, and the stars talk to kings.",
        ],
      },
    ],
  },
  {
    id: "superstitious-35",
    text: "Don't let a priest aboard, don't let a woman aboard, don't let a cat off the boat. Those are the three rules. The priest and the woman can argue about it between themselves.",
  },
  {
    id: "superstitious-36",
    text: "Have you ever seen Saint Elmo's fire on your masts, {title}?",
    answers: [
      {
        text: "Yes, during a storm. It was beautiful.",
        replies: [
          "Then the saint was watching over you. Did you thank him? You must always thank him.",
          "Beautiful and holy. Blue on the mast means the worst is over. Blue on a man means run.",
          "You're blessed, {title}. Some men sail forty years and never see it.",
          "Ah. I saw it once, off {nationTown}. I wept like a child and then I was sick. Both were sincere.",
          "Beautiful, yes, but don't stare too long. The saint is shy.",
        ],
      },
      {
        text: "Yes. I lit my pipe off it.",
        replies: [
          "You lit your pipe off a saint? Holy Mother, I've heard everything now.",
          "That's either the bravest or the stupidest thing I've ever heard. I can't decide.",
          "Did the pipe taste holy? I bet the pipe tasted holy.",
          "Oh, he'll remember that. He'll be waiting at the gate with his arms folded.",
          "I'll say three prayers for your pipe and one for you. The pipe needs it more.",
        ],
      },
      {
        text: "No, never.",
        replies: [
          "Pray you only see it when you need it. It comes in the worst weather, like a friend with bad timing.",
          "You will. Every captain does, sooner or later. Have a candle ready to light in thanks.",
          "Then you've been sailing in good weather, and that's a blessing too.",
          "Keep your eyes on the mast during your next storm. It's worth the soaking.",
          "Never? Hm. Perhaps he hasn't noticed you yet. That's either good or bad.",
        ],
      },
    ],
  },
  {
    id: "superstitious-37",
    text: "I heard a cock crow at midnight in {town} last week. Somebody's going to die, or somebody's cockerel can't count. I've told the priest and the poulterer both.",
  },
  {
    id: "superstitious-38",
    text: "Never count the waves. You'll get to seven, then you'll want to know what the eighth one does, and that's the one that has you.",
  },
  {
    id: "superstitious-39",
    text: "Will you let me read your palm, {name}? For a single coin. I see far, I do.",
    answers: [
      {
        text: "Go on, then.",
        replies: [
          "Ah. A long life line. Then a little gap. Then it carries on. I wouldn't worry about the gap.",
          "I see water. A lot of water. Possibly the sea. Possibly a bath. Hard to tell.",
          "Here's a fork. You'll come to a choice in {otherTown}. Choose the one without the redhead.",
          "Riches. Riches and a terrible cough. I'd invest in a scarf.",
          "I see a woman. No, that's a smudge. Have you been handling tallow?",
        ],
      },
      {
        text: "No. My palms are private.",
        replies: [
          "Fair enough. A man's hand is his own business. Mostly his own. The saints peek.",
          "Wise. A hand read badly is worse than a hand unread.",
          "Keep your fists closed, then. I'll guess from your knuckles.",
          "As you like. But I've already seen your left one, and I'd avoid the colour green.",
          "That's fine. I'll read your boots. Boots tell more than hands anyway.",
        ],
      },
      {
        text: "Read my foot instead.",
        replies: [
          "Your foot? Oh, no. Feet have no future, only a past, and it smells.",
          "I'll read anything once. Off with the boot. No, keep it on. I've changed my mind.",
          "Feet tell where you've been. Yours have been somewhere damp and unfortunate.",
          "My grandmother read feet. She had to give it up. Not for spiritual reasons. Just the smell.",
          "Ha! Very well. Your foot says you'll walk somewhere soon. That'll be a single coin, please.",
        ],
      },
    ],
  },
  {
    id: "superstitious-40",
    text: "Sailors say if you see a shark following the ship, someone aboard is going to die. I say if you see a shark following the ship, stop throwing it the cook's leftovers.",
  },
  {
    id: "superstitious-41",
    text: "I won't eat salt pork unless it's been blessed. That's why I'm so thin. The priest is a very busy man.",
  },
  {
    id: "superstitious-42",
    text: "Where are you sailing next, {title}?",
    answers: [
      {
        text: "To {otherTown}.",
        replies: [
          "{otherTown}! Leave on a Monday or a Thursday. Never on a Friday.",
          "Take an onion with you. Onions ward off the fever there. Also friendship, but you can't have everything.",
          "I've a bad feeling about {otherTown}. I have a bad feeling about most places, so don't take it personally.",
          "Throw a coin to the sea as you leave, and another as you arrive. The sea is very fond of tolls.",
          "My cousin went there once. Came back with a parrot and a rash. He's very fond of the parrot.",
        ],
      },
      {
        text: "Wherever the fish guts tell me.",
        replies: [
          "Now you're talking sense! Bring me the guts and I'll interpret them. Half price for a believer.",
          "You're a man after my own heart, {title}. Or my own fish.",
          "Mock if you like, but I steered a ship clear of a reef using nothing but a mackerel.",
          "Ah, but whose fish? It matters. Shop fish lie. You must catch your own.",
          "That's how my uncle found {enemyTown}. Accidentally, mind. He was looking for his wife.",
        ],
      },
      {
        text: "Nowhere until the redheads leave the quay.",
        replies: [
          "Oh, bless you. Finally somebody who understands. Shall I keep watch for you?",
          "There's one there now. Look. No, don't look! Looking makes it worse.",
          "You'll be here a while, then. {town} breeds them like rabbits.",
          "Wise man. I once waited eight days for a red-haired fishwife to go home. Best eight days of my life.",
          "Ha! You're teasing me. But you're also right, and that's what makes it hard to be cross.",
        ],
      },
    ],
  },
  {
    id: "superstitious-43",
    text: "In {year} there have already been three ill omens in {town}: a two-headed calf, a bell that rang itself, and a tax increase. The last one frightened people most.",
  },
  {
    id: "superstitious-44",
    text: "They say King Charles is having trouble with Parliament back in England. I could have told him. I'm told he was crowned on a day with a rainbow. A rainbow at a crowning means the arguments will last. How do you think it will end, {title}?",
    answers: [
      {
        text: "Badly, for someone.",
        replies: [
          "Badly for everyone. That's how these things always end. Ask the Germans.",
          "Yes. I've thrown the bones on it three times and every time they landed in the fire.",
          "Then I'll pray for the king, and for Parliament, and for whoever has to clean up after.",
          "Badly, and with a lot of shouting first. Like my last wedding.",
          "Someone will lose their head over it. I mean that as a feeling, not a prophecy. Mostly.",
        ],
      },
      {
        text: "With a handshake and a pint.",
        replies: [
          "Ha! Only if they shake on a Wednesday and the pint is blessed.",
          "If that happens, I'll eat my hat. I'll eat yours too.",
          "From your lips to God's ears, {title}. But I've seen the omens, and they're not thirsty.",
          "A handshake! Kings don't shake hands. They hold them out to be kissed.",
          "That's very hopeful of you. Hope is lucky, they say, in small doses.",
        ],
      },
      {
        text: "Why do you care? We're an ocean away.",
        replies: [
          "Bad luck travels faster than ships, {title}. It doesn't need wind.",
          "The ocean doesn't stop omens. It just makes them saltier.",
          "Because when the big men quarrel, the little men pay. And I'm a very little man.",
          "Fair point. I'll worry about it next year. This year I've got the fish to worry about.",
          "You'd be surprised what floats across an ocean. Driftwood, bottles, rumours, curses.",
        ],
      },
    ],
  },
  {
    id: "superstitious-45",
    text: "What do you keep for luck, {title}?",
    answers: [
      {
        text: "A silver coin in my boot.",
        replies: [
          "Silver in the boot. Good. It keeps the devil from walking in your footsteps.",
          "Which boot? Left? Excellent. The right boot is for gold, and that's for the rich.",
          "Don't spend it, ever, no matter how thirsty you get. A lucky coin spent is a sad coin.",
          "My father had the same. He was very lucky, apart from the limp it gave him.",
          "A piece of eight? Or a guilder? A guilder only brings Dutch luck. That's mostly about cheese.",
        ],
      },
      {
        text: "My cutlass.",
        replies: [
          "A blade is good luck until it isn't. Then it's the opposite of luck, and quite sharp.",
          "Steel scares off spirits. Spirits and debt collectors, in my experience.",
          "Has it been blessed? No? I'll do it. Hold still. No, the other end. Thank you.",
          "A practical answer. I respect it. I'll still give you a charm for your other hand.",
          "Iron keeps the fairies back. Not that we have fairies in the Caribbean. Not that we know of.",
        ],
      },
      {
        text: "My boundless charisma.",
        replies: [
          "Charisma never stopped a cannonball, {title}. I asked one once and it didn't listen.",
          "Hm. I can't see it. Perhaps it's hiding behind the smell.",
          "Very well, but keep an onion handy as well. Charisma wears off. Onions don't.",
          "That's what the last governor said, and he was eaten by a turtle. Not quickly, either.",
          "Boundless charisma is a curse, you know. Everybody wants a piece of it. Mostly the sea.",
        ],
      },
    ],
  },
  {
    id: "superstitious-46",
    text: "When the West India Company opened its warehouse here, a crow flew in and died on the scales. The Dutch said it was the heat. I said it was a crow with an opinion about guilders.",
  },
  {
    id: "superstitious-47",
    text: "I touched the iron of every cannon in the fort for luck. The garrison captain was not pleased. He said no man had ever touched his cannons without paying. I told him luck is free.",
  },
  {
    id: "superstitious-48",
    text: "Did you see the sky this morning, {title}? Red as wine.",
    answers: [
      {
        text: "Red sky at morning, sailors take warning.",
        replies: [
          "Exactly so! Thank the saints someone has been listening.",
          "And red sky at night, the sailor's delight. Unless it's a fire. Then it's no delight at all.",
          "Stay ashore today, {title}. The sky has spoken. The sky rarely shouts.",
          "My grandmother taught me that. Then she taught me forty more, and I've forgotten half of them.",
          "And yet half the harbour put to sea anyway. I'll say a prayer for every one of the fools.",
        ],
      },
      {
        text: "I was asleep.",
        replies: [
          "Asleep through an omen! You'll have to ask a fish what you missed.",
          "Asleep is the safest place to be during an omen. You've done better than most.",
          "Then the omen doesn't count for you. Lucky. I was awake and now I'm worried for us both.",
          "Sleep is when the saints talk to you. Did any of them mention the sky? No? Rude of them.",
          "That's the trick, I've always said. Can't be cursed if you don't look up.",
        ],
      },
      {
        text: "It was the governor blushing.",
        replies: [
          "Ha! Over what? He's no shame left. It must have been the sky after all.",
          "Don't. If he hears you, he'll hang you for it. He's very touchy about his complexion.",
          "Well, if the governor's face has started predicting the weather, I'll stop gutting fish.",
          "I'd not mock him, {title}. He was born under a waning moon. They hold grudges.",
          "Now there's an omen I'd pay to see. Twice in one year would mean the end of days.",
        ],
      },
    ],
  },
  {
    id: "superstitious-49",
    text: "I've heard that the Portuguese are restless under Spanish rule and Catalonia too. You want to know why? An eclipse. Every revolt starts with an eclipse, or with taxes. Usually both, which is why I always look up when I pay.",
  },
  {
    id: "superstitious-50",
    text: "Some old sailor told me never to cut your nails at sea, or the winds will drop. So I don't. My hands are like a parrot's feet now, but we've never been becalmed.",
  },
  {
    id: "superstitious-51",
    text: "If you ever die at sea, {title}, would you want to be buried in your hammock or thrown overboard in your best clothes?",
    answers: [
      {
        text: "Sewn in my hammock, like a proper sailor.",
        replies: [
          "Good. And make sure they put the last stitch through your nose. Then you know you're really gone.",
          "Proper, decent and dry. As dry as anyone can be at the bottom.",
          "Ask for a cannonball at your feet. Keeps you from bobbing back up to haunt the cook.",
          "A wise choice. I've already chosen my own hammock. I sleep in it to break it in.",
          "My father went that way. They say his hammock still holds the best spot on the seabed.",
        ],
      },
      {
        text: "In my best clothes, to impress the fish.",
        replies: [
          "The fish won't care about your clothes, {title}. Fish care about seasoning.",
          "And what if the fish wear better? Then you'll be embarrassed for all eternity.",
          "That's the spirit. Look your best down there. You never know who you'll meet.",
          "Hm. A velvet coat at the bottom of the sea. The crabs will be fighting over it for centuries.",
          "The sea is an elegant lady. She'll appreciate the effort.",
        ],
      },
      {
        text: "I don't plan to die. Ever.",
        replies: [
          "Oh, don't say that. The sea hears it as a dare, and she loves a dare.",
          "That's the bravest thing anyone's said in here today. Also the stupidest. I'll drink to both.",
          "Ha! Then you'll need a lot more charms than you have. I'll give you a discount on a dozen.",
          "Never die? I'll bless you for that, and pray you don't change your mind on a Friday.",
          "My grandmother had that plan too. She's in the churchyard in {nationTown} now, still arguing about it.",
        ],
      },
    ],
  },
  {
    id: "superstitious-52",
    text: "Barbados has gone from tobacco to sugar, they say. I could have told them. Tobacco smoke keeps the spirits away. Sugar invites them in. I've seen how ants behave around sugar, and I don't trust it.",
  },
  {
    id: "superstitious-53",
    text: "The Stadtholder sent a ship out with an orange tied to its bowsprit for luck, so I heard. Orange is Frederick Henry's colour. Personally I'd have tied on a garlic, but nobody asked me.",
  },
  {
    id: "superstitious-54",
    text: "Should I trust a man with a letter of marque from {nation}, {title}?",
    answers: [
      {
        text: "No more than any other pirate.",
        replies: [
          "Ah. So a pirate with paperwork. Paper burns, but so does a ship.",
          "Fair. They say a letter of marque turns a thief into a gentleman. It doesn't, but it gives him nicer boots.",
          "I'll keep a horseshoe in my coat, then, and keep my coat on.",
          "Most privateers are good men until the fourth week. Then the biscuit turns and so do they.",
          "Good advice. I'll keep my charm and my purse close, in that order.",
        ],
      },
      {
        text: "Only if he's got a sprig of rosemary in his hat.",
        replies: [
          "That's what I've always said! At last, someone who knows the rules.",
          "Rosemary for remembrance and honesty. If he's carrying basil instead, run.",
          "You've the wisdom of my grandmother. And her beard, a little. No offence.",
          "Ha! I'll start checking hats at once. The tavern keeper will love it.",
          "That's the only kind of paperwork that matters, {title}. Herbs never forge a signature.",
        ],
      },
      {
        text: "Trust me. I'm one of them.",
        replies: [
          "Are you, now? Then show me your charm. A privateer without a charm is a dead man with a letter.",
          "Oh, saints. I've been talking to a privateer all this time and I haven't blessed my drink.",
          "Then you'll understand if I count my fingers after shaking your hand.",
          "You look more like a man who's lost his letter than one who's got it.",
          "Well, I trust you. You've got an honest face. Honest-ish. I'll pray on the rest.",
        ],
      },
    ],
  },
  {
    id: "superstitious-55",
    text: "Safe winds, {name}. Keep your hat on, your feet dry and your mouth shut when you pass a churchyard.",
  },
  {
    id: "superstitious-56",
    text: "May Saint Nicholas fill your sails and Saint Elmo light your masts, {title}. And may you never meet a red-haired, whistling priest on a Friday. That's the triple curse, and nobody survives it.",
  },
]
