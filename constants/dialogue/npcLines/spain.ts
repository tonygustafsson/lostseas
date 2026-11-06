import "server-only"

export const SPAIN_NPC_LINES: Record<string, DialogueEntry[]> = {
  "panama-tavern-socorro-herrera": [
    {
      id: "panama-tavern-socorro-herrera-1",
      text: "Sit down, {title}. I sailed eleven years with the silver fleet and not one admiral noticed I was a woman. Mind you, not one of them noticed the reefs off Cartagena either.",
    },
    {
      id: "panama-tavern-socorro-herrera-2",
      text: "The wind is backing to the south. Can you feel it in your teeth, {title}, or are you one of those who needs a chart to tell you it is raining?",
      answers: [
        {
          text: "I feel it in my teeth.",
          replies: [
            "Good. Teeth never lie. Gums, now, gums are liars.",
            "Then you have the makings of a sailor. Keep the teeth, lose the fancy hat.",
            "Upper or lower? Upper means rain. Lower means rain and a sour bosun.",
            "So do I. Mine have been predicting a storm since {year}, and one day they will be right.",
            "Hold on to those teeth, {title}. Scurvy took half of mine off Havana and the weather got no kinder.",
          ],
        },
        {
          text: "I have a navigator for that.",
          replies: [
            "A navigator. How grand. I had a navigator once. He navigated us onto a sandbar and himself into the rum.",
            "Pay him well and check his work. A pilot who is wrong with confidence will sink you faster than a {enemyAdjective} broadside.",
            "Then learn it from him before he jumps ship in {otherTown}. They always jump ship in {otherTown}.",
            "Fair enough. The best captains I knew asked the cook. The cook always knew.",
            "Hmph. In my day the cabin boy did the navigating and the captain did the shouting. It worked about as well as you would think.",
          ],
        },
        {
          text: "My teeth only feel rum.",
          replies: [
            "Then your teeth have more sense than most admirals. Pour him one.",
            "Ha! That is a sailor's answer. Wrong, but a sailor's answer.",
            "Rum is a fine forecaster. It always predicts a headache by morning.",
            "I had a bosun like you. He drank so much he could smell a squall coming through the bottom of a barrel.",
            "Careful, {title}. The sea does not care what your teeth feel. Ask the fish who wear my old shipmates' boots.",
          ],
        },
      ],
    },
    {
      id: "panama-tavern-socorro-herrera-3",
      text: "They caught me shaving one morning. The captain asked why a cabin boy with no beard needed a razor. I told him I was practising. He made me cook for three months as punishment, and the crew begged him to make it permanent.",
    },
    {
      id: "panama-tavern-socorro-herrera-4",
      text: "Every piece of eight from Peru crosses this isthmus on a mule's back before it ever sees a galleon. What do you make of that, {title}?",
      answers: [
        {
          text: "I would like to meet those mules.",
          replies: [
            "Everyone would. The mules are not interested. They have seen richer men than you.",
            "Then walk the road to Portobelo. Bring boots, a sword and a strong opinion about mosquitoes.",
            "A mule carrying silver is still a mule. It will bite you, kick you and then sit down in a river.",
            "I knew a man who tried to steal one. The mule ate his hat and walked home on its own.",
            "Careful, {title}. The King's soldiers guard those mules more closely than they guard the bishop.",
          ],
        },
        {
          text: "It sounds like a long, dangerous journey.",
          replies: [
            "It is. Fever, swamps, bandits and a river that floods whenever you need it not to.",
            "I have buried good men along that road. The silver never once said thank you.",
            "Long and dangerous, yes. And still safer than the crossing to Seville, if you ask me.",
            "That is why the fleets wait for no one. If you miss the sailing, you miss the year.",
            "Dangerous enough that Piet Heyn chose to wait at Matanzas rather than try his luck here. Clever devil.",
          ],
        },
        {
          text: "Mules are just horses with a grudge.",
          replies: [
            "And sailors are just fish with a drinking habit. Your point?",
            "Ha! Do not let the muleteers hear you. They love those beasts more than their wives.",
            "A grudge and a pension. The King feeds them better than he fed me.",
            "True enough. I have a grudge too, and nobody has ever loaded me with silver.",
            "Now there is a thought worth a drink. A mule with a grudge carried the treasure of an empire. Imagine what I could do with a boat.",
          ],
        },
      ],
    },
    {
      id: "panama-tavern-socorro-herrera-5",
      text: "Keep limes aboard, {title}. Laugh all you like, but I never lost a tooth after I started sucking them on watch. Lost two to a bosun's fist, mind, but none to the scurvy.",
    },
    {
      id: "panama-tavern-socorro-herrera-6",
      text: "Have you ever had to pretend to be something you are not, {title}?",
      answers: [
        {
          text: "Never. I am exactly what I seem.",
          replies: [
            "Then you are rarer than an honest customs officer.",
            "That is either very honest or very sad. I have not decided which.",
            "Good. The sea strips off every mask in the end anyway. Better to start without one.",
            "Hmm. Everyone says that until the storm comes. Then we find out what they really are.",
            "Lucky you. I spent eleven years pretending, and the worst part was laughing at the crew's jokes.",
          ],
        },
        {
          text: "I am pretending to be a captain right now.",
          replies: [
            "Ha! So were half the captains I sailed under, and they had the ships to prove it.",
            "Keep pretending. Do it long enough and the crew stop noticing.",
            "That is the secret, {title}. Every captain is pretending. The good ones just pretend louder.",
            "Then pretend to be a captain who pays his tab. That would be a fine disguise.",
            "I will not tell anyone. I have kept bigger secrets under a sailor's cap.",
          ],
        },
        {
          text: "Once I pretended to be a mermaid.",
          replies: [
            "Did it work? Because I saw a sailor try that off Cartagena and he was hauled up in a net.",
            "I will not ask how. I will only ask whether you charged admission.",
            "That beats my story. Nobody ever mistook me for anything but a scrawny cabin boy.",
            "With that face? The sailors must have been at sea a very long time.",
            "Well, you have the smell for it. No offence, {title}.",
          ],
        },
      ],
    },
    {
      id: "panama-tavern-socorro-herrera-7",
      text: "The Pacific is a strange sea, {title}. Calm as a millpond for weeks and then it remembers it has a temper. A bit like me after my third cup.",
    },
  ],

  "panama-market-sancho-velasco": [
    {
      id: "panama-market-sancho-velasco-1",
      text: "Ah, {title}! Did you hear? The alcalde's wife has bought a third parrot, and this one speaks better Castilian than the alcalde. Nobody is surprised.",
    },
    {
      id: "panama-market-sancho-velasco-2",
      text: "I drove mules on the Portobelo road for nine years. You learn a lot about people when they think a mule is not listening. Want to hear what the bishop's secretary said?",
      answers: [
        {
          text: "Yes, tell me everything.",
          replies: [
            "He said the bishop snores like a ship's pump. I will deny it if anyone asks, and so will the mule.",
            "He said he keeps a second set of accounts. Under his mattress. Which explains why he sleeps so badly.",
            "He said the cathedral bells are cracked and nobody wants to pay for new ones. So they ring them softly and hope God does not notice.",
            "He confessed he cannot ride a mule at all. He spent the whole road being led like a sack of flour. Very dignified.",
            "He said he would kill for a decent cheese. In Panama! Where would he find a decent cheese? I am still looking for him.",
          ],
        },
        {
          text: "I would rather not.",
          replies: [
            "Of course, of course. Discretion is a virtue. A boring virtue, but a virtue.",
            "Very wise, {title}. I will tell you anyway, but quietly, so it counts as discretion.",
            "Ah, a gentleman. Or a lady. Or someone who has secrets of their own. I will find out which.",
            "Suit yourself. The mule will tell somebody else.",
            "Fine, fine. But when the whole isthmus is talking about it next {month}, remember you heard it from me first. Or did not.",
          ],
        },
        {
          text: "I only want to hear what the mule said.",
          replies: [
            "The mule? The mule said nothing. The mule is the only honest creature in Panama.",
            "Ha! The mule had opinions, believe me. Mostly about the bishop's secretary, and all of them rude.",
            "That mule was called Esperanza, and she once kicked a tax collector into the Chagres River. Her opinions were very clear.",
            "You joke, but mules know everything. They just keep it to themselves, which makes them terrible gossips.",
            "She said hee-haw, {title}. In Panama that means the price of silver is going up.",
          ],
        },
      ],
    },
    {
      id: "panama-market-sancho-velasco-3",
      text: "Word from the road is that a merchant came through with three crates of {merchandise} and swore they were packed in {otherTown}. The crates said otherwise. The crates always say otherwise.",
    },
    {
      id: "panama-market-sancho-velasco-4",
      text: "So, {title}, where have you sailed from? Everyone who comes through here has a story, and I collect them like other men collect coins.",
      answers: [
        {
          text: "From {nationTown}, with good winds.",
          replies: [
            "Good winds from {nationTown}! Then you must have heard about the harbourmaster there and his goat. No? Pull up a crate.",
            "Ah, {nationTown}. I have a cousin there who sells candles. Badly. Tell him Sancho sends his regards and wants his money back.",
            "Good winds are the best gossip of all. Every captain in port will want to know how you found them.",
            "And did you see any {enemyAdjective} sails on the way? People here talk of nothing else since the war began.",
            "Then you made fine time. The last captain from {nationTown} took so long his crew grew beards they did not start with.",
          ],
        },
        {
          text: "I would rather keep that to myself.",
          replies: [
            "Ooh, a mysterious one. Those make the best rumours. I will start one this afternoon.",
            "Of course, {title}. A man with no past is a man with an interesting past. I will invent one for you.",
            "Hmm. That is exactly what the last smuggler said. Very charming fellow. They hanged him in {month}.",
            "No matter. By sundown the mule drivers will know where you came from anyway. They always do.",
            "Then I will say you came from the moon. Nobody here will check.",
          ],
        },
        {
          text: "From the bottom of the sea. I walked.",
          replies: [
            "Ha! Then you must be thirsty. And very wet. Mostly wet.",
            "I believe it. You have the look of a man who argued with a whale and won on points.",
            "From the bottom of the sea! Wonderful. Did you see Roque Acosta's galleon down there? He would love news of it.",
            "I will tell that one at the cantina tonight. By tomorrow you will have walked from Spain.",
            "Then you are the first visitor this year to arrive cheaper than by mule. The muleteers will be furious.",
          ],
        },
      ],
    },
    {
      id: "panama-market-sancho-velasco-5",
      text: "When the silver fleet is in, this market goes mad. Prices double, tempers triple and the priest hears more confessions in a week than he does all year. Best time to sell, worst time to buy, {title}.",
    },
    {
      id: "panama-market-sancho-velasco-6",
      text: "Between us, {title}, have you heard anything worth repeating on your travels?",
      answers: [
        {
          text: "They say the {enemyAdjective} are gathering ships near {enemyTown}.",
          replies: [
            "No! Truly? I must tell the fishmonger. He will tell the priest, and the priest will tell God, and then we will see.",
            "Near {enemyTown}? That fits with what a sailor told me last week. Or he was drunk. Possibly both.",
            "This is good, this is very good. Well, not good. Terrible. But very good to know.",
            "I will keep it to myself. For an hour at most. Possibly less.",
            "Ah, the {enemyAdjective}. Always gathering ships. One day they will run out of trees and then where will they be?",
          ],
        },
        {
          text: "Nothing at all.",
          replies: [
            "Nothing? Then you were not listening, {title}. The world is full of rumours, you just need bigger ears.",
            "A pity. A rumour is worth more than salt in this market. Sometimes more than silver.",
            "That is all right. I will tell you three and you can pass them on. Everybody wins.",
            "Then you are either very honest or very dull. I hope you are honest.",
            "Nothing! Next time you sail, stand near the cook. The cook hears everything.",
          ],
        },
        {
          text: "I heard you snore louder than the bishop.",
          replies: [
            "Who told you that? Was it my wife? It was my wife. She has never forgiven me for the mule.",
            "Lies! Wicked lies! Well, perhaps on Sundays.",
            "Ha! Turning my own trade against me. I like you, {title}. I do not trust you, but I like you.",
            "If you repeat that I will tell everyone you cry at weddings. And I will be very convincing.",
            "Louder than the bishop? Impossible. The bishop once woke the garrison. They thought it was a cannon.",
          ],
        },
      ],
    },
  ],

  "panama-governor-alfonso-benavides": [
    {
      id: "panama-governor-alfonso-benavides-1",
      text: "You stand before Don Alfonso Benavides y Toledo, Lord of Valdeolmos, Marquis-in-waiting of Torrecilla, Keeper of the Royal Mules of the Isthmus, Count of... no matter. You may bow, {title}.",
    },
    {
      id: "panama-governor-alfonso-benavides-2",
      text: "Do you know how many titles my family holds, {title}?",
      answers: [
        {
          text: "Fourteen, I believe, Your Lordship.",
          replies: [
            "Fourteen! Correct! At last, an educated visitor. You may sit. No, not in that chair. That chair is for viscounts.",
            "Fifteen, if you count the vineyard. My cousin disputes the vineyard. My cousin is a fool.",
            "Fourteen, yes, and I can recite every one. I shall do so now. Clear your afternoon.",
            "How did you know? Have you been reading my letters to the viceroy? They are very long letters.",
            "Excellent. His Majesty Philip IV himself once nodded at my father. It was a very gracious nod.",
          ],
        },
        {
          text: "I have no idea.",
          replies: [
            "No idea! Then you shall have one. Begin with the first: Lord of Valdeolmos, a very ancient lordship with almost a dozen sheep.",
            "Shameful. Even the mules of Panama know. I have had it painted on their saddles.",
            "Ignorance is forgivable in a sailor. Barely. Write this down. All fourteen.",
            "Then let me enlighten you. We shall start in the year 1214 and work forward.",
            "Hmph. The last captain who said that was posted to guard the Darien swamp. He sends me letters. They are mostly about frogs.",
          ],
        },
        {
          text: "More than you have teeth, by the look of it.",
          replies: [
            "How dare you! My teeth are a noble family tradition. Most of them, at least.",
            "I shall ignore that, as a man of fourteen titles ignores a barking dog. A very small dog.",
            "Guards! No, never mind, the guards are at lunch. Consider yourself fortunate.",
            "Teeth come and go, {title}. Titles are forever. I keep mine in a velvet box. The titles, I mean.",
            "You are very bold for someone with no titles at all. Not even one. Not even a small one.",
          ],
        },
      ],
    },
    {
      id: "panama-governor-alfonso-benavides-3",
      text: "Every ounce of Peruvian silver that serves His Catholic Majesty passes through my city, {title}. Without Panama, the treasure fleet would sail empty and Spain would be forced to sell its paintings. Some of them are of me.",
    },
    {
      id: "panama-governor-alfonso-benavides-4",
      text: "I have commissioned a new portrait to send to Madrid. Tell me, {title}, should I be painted on horseback or beside a globe?",
      answers: [
        {
          text: "On horseback, like a true conqueror.",
          replies: [
            "Yes! Rearing, with a sword pointed at the heavens. The painter says the horse will cost extra.",
            "Exactly my thought. Though I do not ride. The horse will have to be painted from memory.",
            "Splendid. The last horse they brought me bit the painter. We shall use a stuffed one.",
            "A conqueror! Yes. I once conquered a very difficult dinner with the archbishop. It counts.",
            "On horseback. Of course. Velázquez paints the King that way, and I see no reason to be outdone.",
          ],
        },
        {
          text: "Beside a globe, like a scholar.",
          replies: [
            "A scholar! Yes. With one hand resting on Panama, which shall be painted rather larger than it is.",
            "Wise. A globe suggests learning. I have read almost half a book this year.",
            "Very good. I shall point at Castile with a thoughtful expression. I have been practising the expression.",
            "Excellent. Though the only globe in Panama belongs to the bishop, and he will not lend it.",
            "A globe shows the world, and my face shows the man who governs a part of it. A very important part.",
          ],
        },
        {
          text: "Beside a mule. It suits you.",
          replies: [
            "A mule! I have never been so insulted. Though, to be fair, the mules are the source of my wealth.",
            "You mock me, {title}, but the mules of Panama carry an empire. They are noble animals. Nobler than you.",
            "Guards! Ah, still at lunch. You are lucky they eat for three hours.",
            "I shall pretend I did not hear that, and you shall pretend you did not say it.",
            "Hmm. A mule bearing silver beneath my outstretched hand. No. No, I refuse to consider it. Leave it with me.",
          ],
        },
      ],
    },
    {
      id: "panama-governor-alfonso-benavides-5",
      text: "The {enemyAdjective} have the impudence to threaten the King's waters. When I was a boy in Castile, such people would not have been allowed in the house. They would have been made to wait in the stables with the fourth cousins.",
    },
    {
      id: "panama-governor-alfonso-benavides-6",
      text: "I have written to the viceroy about my promotion fourteen times. One letter for each title. Do you think he will reply, {title}?",
      answers: [
        {
          text: "Surely, Your Lordship. Any day now.",
          replies: [
            "That is what my secretary says. He has been saying it since {year}. I am beginning to doubt my secretary.",
            "Any day. Yes. I shall have the good chair polished in readiness.",
            "You are a person of rare judgement. I shall mention you in letter fifteen.",
            "I believe so too. Perhaps the letters are simply very heavy and the mules are slow.",
            "Of course he will. One does not ignore a Benavides. One merely delays.",
          ],
        },
        {
          text: "He might be busy with the war.",
          replies: [
            "Busy? Too busy for a Benavides? Then the war must be going worse than they tell me.",
            "The war, yes. The Thirty Years' War, the Dutch war, the Portuguese grumbling. Still, fourteen letters.",
            "Possibly. I shall write a fifteenth to ask whether he is busy.",
            "A fair point, {title}. Even I cannot compete with a war. Only nearly.",
            "Then I shall offer to help with the war. In writing. At length.",
          ],
        },
        {
          text: "Perhaps he is still reading the first one.",
          replies: [
            "That is entirely possible. It was forty pages. The first ten were the titles.",
            "You jest, but my letters are masterpieces of rhetoric. They simply require stamina.",
            "Hmph. The viceroy reads very slowly. Everyone in Lima says so. Mostly me.",
            "Then he will have plenty to enjoy when he reaches the end. There is a poem about my grandfather.",
            "Insolent! But possibly accurate. Leave before I decide which.",
          ],
        },
      ],
    },
  ],

  "san-juan-tavern-roque-acosta": [
    {
      id: "san-juan-tavern-roque-acosta-1",
      text: "Sit if you like, {title}. The guitar only knows one song now. It used to know more, but it has been listening to me for too long.",
    },
    {
      id: "san-juan-tavern-roque-acosta-2",
      text: "I was a pilot once. Twenty years guiding galleons from Seville to {town} and back. Do you know what a pilot is worth when he is wrong just once?",
      answers: [
        {
          text: "Nothing, I suppose.",
          replies: [
            "Less than nothing. A cook who burns the stew can try again tomorrow. A pilot who finds a reef cannot.",
            "Exactly nothing. Twenty years of good sailing, gone in the time it takes to say hard to port.",
            "You understand. Most people try to cheer me up. I prefer honesty and rum, in that order.",
            "Nothing at all. They took my charts, my name and my good hat. I miss the hat.",
            "Yes. The sea keeps a very short memory for good deeds and a very long one for mistakes.",
          ],
        },
        {
          text: "Everyone makes mistakes.",
          replies: [
            "That is kind of you. The admiral did not agree. He said it loudly, in front of nine ships.",
            "Everyone makes mistakes, yes. But mine had a name, a hull and four hundred tons of cargo.",
            "Perhaps. But most men's mistakes do not get named after them on Spanish charts. The Acosta Rock. Very catchy.",
            "Thank you, {title}. I will remember that in the morning, when I stop believing it.",
            "My mother said the same. She also said I would be a priest. She was wrong about many things.",
          ],
        },
        {
          text: "About as much as that guitar.",
          replies: [
            "That is cruel, {title}. Accurate, but cruel. The guitar and I are both out of tune.",
            "The guitar cost me four pieces of eight. I was cheaper. Nobody paid anything for me in the end.",
            "Ha. A small laugh. I had forgotten I could do that. Do not get used to it.",
            "Careful. The guitar has feelings. It is the only one here who still listens to me.",
            "At least the guitar never put a galleon on a reef. It only ruined evenings.",
          ],
        },
      ],
    },
    {
      id: "san-juan-tavern-roque-acosta-3",
      text: "The reef was not on any chart. I swore it, the charts swore it, and then the reef swore back. In front of the whole fleet. The crew still call it the Acosta Rock, and they say it fondly. That is the worst part.",
    },
    {
      id: "san-juan-tavern-roque-acosta-4",
      text: "Look at El Morro up there, {title}. Stone walls, fat cannons, a hundred years of standing. Do you think anything lasts?",
      answers: [
        {
          text: "The fortress will outlast us all.",
          replies: [
            "Probably. Stone is patient. It does not drink or sing badly at night.",
            "It will. And one day someone will stand where you stand and not know my name. That is almost a comfort.",
            "The Dutch tried to knock it down. It stood. I tried to be a pilot. I fell. The fortress wins.",
            "Yes. Walls last. Ships sink. Men grow old in taverns. That is the order of things.",
            "I hope so. Someone in {town} should get to be steady and dependable. It was never going to be me.",
          ],
        },
        {
          text: "Nothing lasts. That is why we drink.",
          replies: [
            "Now you speak my language. Sit closer. Bring the bottle.",
            "Wise words. Sad, but wise. Like most wisdom, really.",
            "Yes. Nothing lasts. Not ships, not glory, and certainly not this bottle.",
            "A philosopher. We have so few in San Juan. They all drown or become priests.",
            "That is true. Even the rum does not last. I have checked very carefully.",
          ],
        },
        {
          text: "Your song seems to last forever.",
          replies: [
            "It does, doesn't it? I have played it every night for nine years. I think it is getting better. Nobody agrees.",
            "Ha. The landlord says the same, but with more swearing.",
            "It only has three chords, {title}. Like my life. Up, down and onto a reef.",
            "Would you like to hear it again? No? Nobody ever does. I play it anyway.",
            "It lasts because I do not know how it ends. I never learned the last verse. Seems fitting.",
          ],
        },
      ],
    },
    {
      id: "san-juan-tavern-roque-acosta-5",
      text: "If you sail the Mona Passage, keep well clear of the eastern shoals, {title}. I learned that lesson the hard way. You might as well learn it the cheap way, from a sad old man in a tavern.",
    },
    {
      id: "san-juan-tavern-roque-acosta-6",
      text: "Some nights I dream I am back at the wheel, and the sea is calm, and the reef is exactly where I said it would not be. Then I wake up. The reef is still there. So am I.",
    },
    {
      id: "san-juan-tavern-roque-acosta-7",
      text: "Do you trust your charts, {title}?",
      answers: [
        {
          text: "With my life.",
          replies: [
            "So did I. Look where it got me. A stool, a guitar and a reputation.",
            "Then check them twice. The man who drew mine had never left Seville.",
            "Good. Trust is a fine thing. Trust plus a lead line is even better.",
            "Brave. Charts are drawn by men, and men are wrong all the time. I am the proof.",
            "I hope they deserve it. Mine said open water. Open water was lying.",
          ],
        },
        {
          text: "Not entirely. I keep a sharp lookout.",
          replies: [
            "Wise. Wiser than I was. A good lookout is worth more than all the ink in Madrid.",
            "That is what I should have done. Instead I trusted the chart and sent the lookout below for wine.",
            "Good. Keep doing that, {title}, and you will never have a rock named after you.",
            "Then you will die old and rich and boring. Lucky.",
            "Yes. Eyes on the water, not on the paper. I learned that too late.",
          ],
        },
        {
          text: "I draw my own charts. Badly.",
          replies: [
            "Badly drawn charts by an honest man beat finely drawn lies. Mostly.",
            "Ha. Then you and I are kin. I sailed by beautiful charts, badly.",
            "Do you mark the reefs? Mark the reefs, {title}. Mark them twice. Draw a little skull.",
            "Let me see one sometime. I promise not to cry. Much.",
            "Badly drawn? Excellent. At least you know they are wrong. That is the first step.",
          ],
        },
      ],
    },
  ],

  "san-juan-market-jacinta-moya": [
    {
      id: "san-juan-market-jacinta-moya-1",
      text: "Good day, {title}! Everything here has a price, and I already know yours. You walked in like a captain with money and very little patience. That is my favourite kind.",
    },
    {
      id: "san-juan-market-jacinta-moya-2",
      text: "I have {merchandise} at a price that would make a Genoese banker weep. Shall we haggle, {title}, or will you just pay what I ask like a sensible person?",
      answers: [
        {
          text: "Let us haggle.",
          replies: [
            "Wonderful! I have been bored since breakfast. Make your first offer, and try not to insult us both.",
            "Ah, a sporting soul. I warn you, my father haggled a priest out of his own candles.",
            "Haggle! Yes. Click, click goes the abacus. You are already losing, {title}.",
            "Very well. I will pretend to be hurt, you will pretend to walk away, and we will meet exactly where I planned.",
            "Good. I respect a haggler. I just do not let them win.",
          ],
        },
        {
          text: "I will pay what you ask.",
          replies: [
            "What a delight. I will light a candle for you at the cathedral. A small one, I am not made of money.",
            "You are my favourite customer this week. Possibly this month. Do not tell the others.",
            "Truly? No haggling? I almost feel guilty. Almost. The feeling has passed.",
            "Sensible. Honest dealing saves time, and time is the only thing I cannot sell you.",
            "Ah. Now I wish I had asked for more. Next time, {title}.",
          ],
        },
        {
          text: "I will trade you my left boot.",
          replies: [
            "Only the left? What am I to do with one boot? Find a one-legged sailor? Actually, Belize has a few.",
            "Hmm. Let me see it. Good leather, poor stitching, terrible smell. I will give you half a candle.",
            "I once sold a sailor his own lost hat. Do not tempt me to sell you your own boot.",
            "Throw in the right one and we have a deal. You can walk home on your dignity.",
            "Done! Wait. No. The last boot I took had a crab in it. I am not falling for that again.",
          ],
        },
      ],
    },
    {
      id: "san-juan-market-jacinta-moya-3",
      text: "My father kept a chandler's shop by the harbour. Rope, tar, nails, lantern oil. I learned to count before I could walk, mostly by counting how much the sailors owed him.",
    },
    {
      id: "san-juan-market-jacinta-moya-4",
      text: "The treasure fleet is due soon, {title}. Do you know what that means for prices in {town}?",
      answers: [
        {
          text: "Everything goes up.",
          replies: [
            "Exactly. Bread, wine, rope, candles. Even the beggars raise their prices.",
            "Up, up, up. Smart captains sell now. Clever captains wait. Rich captains are both.",
            "Correct! You would make a decent apprentice, if you did not have a ship and a death wish.",
            "Up, yes. And my abacus has never sounded happier.",
            "Everything except the quality of the wine. That never changes. It is always terrible.",
          ],
        },
        {
          text: "I am not sure.",
          replies: [
            "Then let me teach you, for free, which I never do. Sell before the fleet. Buy after it leaves.",
            "Not sure? Oh, {title}. People like you keep people like me in mantillas.",
            "It means every merchant in {town} becomes a thief for a week. Some of us were already practising.",
            "It means you should stay close to me. I always know what is coming before the harbourmaster does.",
            "It means I will be very busy and you will be very poor, unless you listen to me.",
          ],
        },
        {
          text: "It means you get richer and I get poorer.",
          replies: [
            "Ha! You have understood the entire Spanish economy in one sentence.",
            "Now, now. You get poorer, yes. But you get to buy from me. That is a privilege.",
            "Exactly right. But I will sell you a lovely hat to cheer you up. At a discount. Of sorts.",
            "Such cynicism! I adore it. Here, have a fig. That will be two reales.",
            "Not necessarily. You could buy now and sell to the fleet. I will even help you, for a small share.",
          ],
        },
      ],
    },
    {
      id: "san-juan-market-jacinta-moya-5",
      text: "A sailor once lost his hat overboard in the harbour. A fisherman found it, sold it to me, and the next day the sailor bought it back from me for twice the price. He thanked me. That is good business, {title}. Everyone was happy, mostly me.",
    },
    {
      id: "san-juan-market-jacinta-moya-6",
      text: "Captains from {nationTown} say I charge too much. What do you think, {title}?",
      answers: [
        {
          text: "Your prices are fair.",
          replies: [
            "Of course they are. I charge exactly what people will pay. That is the fairest price there is.",
            "Thank you. I will tell the captains from {nationTown} you said so. Loudly.",
            "Fair and generous. Write it on a board and I will hang it over the stall.",
            "Flattery! It will not get you a discount. But it might get you a smile.",
            "Spoken like someone who has not yet seen my prices for rope.",
          ],
        },
        {
          text: "You charge far too much.",
          replies: [
            "And yet here you are. Funny how that works.",
            "Too much? I charge exactly enough. The difference is in your purse, not my prices.",
            "Then go to {otherTown}. Buy cheap rope. Watch it snap in a storm. Come back. I will be here.",
            "Too much for some, a bargain for others. You are clearly in the first group. For now.",
            "My father would be proud. He said a price that nobody complains about is a price that is too low.",
          ],
        },
        {
          text: "Captains from {nationTown} cannot count.",
          replies: [
            "Ha! I have been saying that for years. Finally, a captain with sense.",
            "That is true. One tried to pay me with a button. A very nice button, admittedly.",
            "They count perfectly well. They just do not like the answer.",
            "You and I will get along, {title}. Very nicely. But you still pay full price.",
            "Neither can the ones from {otherTown}. That is why I love them so.",
          ],
        },
      ],
    },
  ],

  "san-juan-governor-salvador-arellano": [
    {
      id: "san-juan-governor-salvador-arellano-1",
      text: "Sit, {title}. And before you ask, yes, I held El Morro against the Dutch. No, I will not tell the story. Yes, the scar hurts when it rains. It always rains.",
    },
    {
      id: "san-juan-governor-salvador-arellano-2",
      text: "Everyone who walks through that door wants to hear about the siege. What brings you here, {title}?",
      answers: [
        {
          text: "I came to hear about the siege.",
          replies: [
            "Of course you did. Fine. The Dutch came, we stayed, they left. There. Now you have heard it.",
            "Of course. The Dutch burned the town, we held the fort, I was hit by a stone the size of a ham. The end.",
            "They had ships, we had walls. Walls won. I would have preferred a nap.",
            "Everyone does. The bishop asks at every dinner. I have started serving food that requires both hands.",
            "I will tell you the short version. It was hot, it was long, and I would not do it again for all the silver in Potosí.",
          ],
        },
        {
          text: "Only business, Your Excellency.",
          replies: [
            "Business. Thank God. You may sit in the good chair.",
            "A visitor who wants business. Write down the date, clerk. It may never happen again.",
            "Good. Business I can manage. Glory gives me headaches.",
            "That is refreshing, {title}. Speak, and I will try to stay awake.",
            "Then let us be brief and honest, the two qualities I value most after silence.",
          ],
        },
        {
          text: "I heard you fought the Dutch with a soup ladle.",
          replies: [
            "That is Dulce Rivero's story, from Villa Hermosa, and it was a thief, not the Dutch. Keep your legends straight.",
            "A ladle. Wonderful. Every time this story is told it gets more kitchen utensils.",
            "If only. The Dutch might have laughed themselves to death and spared us months of work.",
            "No. A ladle was involved, but only at supper. We were very hungry.",
            "Go on believing it, {title}. It is a better story than the truth, which was mostly mud and waiting.",
          ],
        },
      ],
    },
    {
      id: "san-juan-governor-salvador-arellano-3",
      text: "I keep that breastplate by my desk to remind me what a real day's work feels like. Paperwork does not dent you, {title}, but it wears you down all the same.",
    },
    {
      id: "san-juan-governor-salvador-arellano-4",
      text: "The {enemyAdjective} are restless again. My garrison is small, my powder is damp and my budget arrives from Spain a year late. How would you defend {town}, {title}?",
      answers: [
        {
          text: "Strengthen the walls and train the militia.",
          replies: [
            "A good answer. A soldier's answer. Now find me the money for it and you can have my job.",
            "Yes. Walls and men. Simple, sound, expensive. The three words every governor dreads.",
            "That is what I wrote to Madrid. They sent back a letter asking me to economise on candles.",
            "Sensible. You would have done well at El Morro. Not that I am telling that story.",
            "Agreed. The militia are willing, mostly. They just need muskets, training and someone to wake them.",
          ],
        },
        {
          text: "Strike them first at sea.",
          replies: [
            "Bold. Young men are always bold. Then they meet a {enemyAdjective} broadside and become old men quickly.",
            "With what? Two pinnaces and a fishing boat with a cannon tied on? I admire the spirit.",
            "There is wisdom in that, {title}. A fleet kept from our harbour cannot burn it.",
            "If you have the ships, I will not stop you. I will even write you a very nice letter of thanks.",
            "Some captains do that for the Crown, and a few come back rich. Most come back thinner.",
          ],
        },
        {
          text: "Offer them more paperwork. It worked on you.",
          replies: [
            "Ha! I might. Twenty forms in triplicate. They would surrender by noon.",
            "You laugh, but our customs house has broken stronger men than any siege.",
            "That is the first good military idea I have heard all year.",
            "Cruel, {title}. True, but cruel. Sit down before I find you a form.",
            "If paperwork could win wars, Spain would own the moon by now.",
          ],
        },
      ],
    },
    {
      id: "san-juan-governor-salvador-arellano-5",
      text: "I fought at nineteen and was a governor by forty. People call that a fine career. I call it twenty-five years without a full night's sleep.",
    },
    {
      id: "san-juan-governor-salvador-arellano-6",
      text: "If you ever find yourself in a siege, {title}, remember three things. Keep the powder dry, keep the water clean and never let the chaplain run the kitchen.",
    },
    {
      id: "san-juan-governor-salvador-arellano-7",
      text: "My doctor says I should rest more, {title}. My clerk says I should sign more. My scar says it will rain. Who should I listen to?",
      answers: [
        {
          text: "The doctor. You look exhausted.",
          replies: [
            "Thank you. Nobody has said that kindly in years. They usually say it to my back.",
            "The doctor also told me to drink less wine. I have decided he is only partly right.",
            "Rest. Yes. I remember resting. It was in {year}, I think, for most of an afternoon.",
            "You are right, {title}. Tell the clerk on your way out. He frightens me more than the Dutch did.",
            "I will rest when the {enemyAdjective} do. So, never, by the look of things.",
          ],
        },
        {
          text: "The clerk. The colony needs you.",
          replies: [
            "Duty. Yes. The word that has kept me awake since I was nineteen.",
            "Very well. Hand me that quill. No, the other one. That one has seen too much.",
            "Spoken like a true servant of Philip IV. Or like a captain who needs a document signed.",
            "Fine. But if I fall asleep on the harbour accounts, you are writing to Madrid to explain.",
            "The colony needs me. The colony also needs gunpowder, a new roof and a priest who stays sober. One thing at a time.",
          ],
        },
        {
          text: "The scar. It sounds like the smartest of the three.",
          replies: [
            "Ha! It is. It has never once been wrong about the rain.",
            "The scar has more sense than my whole council. It also complains less.",
            "I will tell it you said so. It gets so little praise.",
            "If the scar ran {town} we would have fewer meetings and more dry boots.",
            "Strange, {title}, but you may be right. It has served the Crown longer than the clerk has.",
          ],
        },
      ],
    },
  ],

  "havana-tavern-tadeo-paz": [
    {
      id: "havana-tavern-tadeo-paz-1",
      text: "Do not sit there, {title}! That stool is unlucky. A man fell off it last week. Well, he was drunk, but still. The stool knew.",
    },
    {
      id: "havana-tavern-tadeo-paz-2",
      text: "What is the name of your ship, {title}? I need to count the letters before I decide whether I can talk to you.",
      answers: [
        {
          text: "I never counted.",
          replies: [
            "Never counted! You might be sailing on doom itself. Please, sit a little further away.",
            "Count them now. No, wait, do not do it here. Do it outside. In case it is odd.",
            "That is how my first ship went down. Nobody counted. I counted afterwards, from the water. It was eleven.",
            "Holy Saint Elmo. You brave, foolish, lucky person. I will pray for you twice.",
            "You should know these things! The sea knows. The sea always counts.",
          ],
        },
        {
          text: "An even number, of course.",
          replies: [
            "Oh, thank the saints. You may stand within a fathom of me.",
            "Good, good. Still, touch some wood before you leave. Just to be safe.",
            "Even! Lovely. I can breathe again. My shark's tooth was starting to itch.",
            "Then I will drink with you. But only from the left side of the cup.",
            "Wonderful. But is your first mate's name even? These things add up.",
          ],
        },
        {
          text: "It is named after a black cat.",
          replies: [
            "No. No no no. I am leaving. Actually, I am staying, but I am turning my back to you.",
            "Saint Christopher, Saint Nicholas, Saint Anyone Who Is Listening.",
            "You are trying to kill me, {title}. I can feel my sock tightening.",
            "Why would you do that? Why would anybody do that? Did you also sail out on a Friday?",
            "My cousin had a ship named after a cat. Not even black. Grey. It sank in the harbour. On a sunny day.",
          ],
        },
      ],
    },
    {
      id: "havana-tavern-tadeo-paz-3",
      text: "Wrecked twice before I was twenty, {title}. The first time off the Florida keys, the second time in the harbour of {town} itself. Nobody gets wrecked in a harbour. I did. Twice is not a coincidence. Twice is a message.",
    },
    {
      id: "havana-tavern-tadeo-paz-4",
      text: "Do you believe in luck, {title}?",
      answers: [
        {
          text: "Luck is for fools. I trust skill.",
          replies: [
            "That is exactly what my second captain said. Right before the mast fell on him.",
            "Skill is good! But skill with a lucky sock is better.",
            "Please do not say that so loudly. The sea might hear.",
            "Skill. Hmm. Sharks have skill. I still carry their teeth for luck, though.",
            "I hope you are right, {title}. I really do. But I will stand by the door, just in case.",
          ],
        },
        {
          text: "Absolutely. Never whistle on deck.",
          replies: [
            "Yes! Finally, someone who understands. Whistling calls the wind, and the wind never comes politely.",
            "And never cut your hair at sea, and never start a voyage on a Friday, and never say the word drowned.",
            "Oh no, you said it. I mean I said it. I just said drowned. Saint Elmo forgive me.",
            "We should form a guild. The Brotherhood of Sensible Sailors.",
            "You are a wise captain, {title}. Would you sign on a sailor with a lucky sock?",
          ],
        },
        {
          text: "I am lucky. I keep a lucky turnip.",
          replies: [
            "A turnip? I have never heard of a lucky turnip. Does it work? Where can I get one?",
            "Is it a long turnip or a round one? Round is lucky. Long means storms.",
            "That is either very foolish or very clever. I will try a carrot first.",
            "I believe you. The cook on my first ship had a lucky onion. He survived the wreck. The onion did not.",
            "A turnip! Brilliant. Nobody would ever steal it. That is very good luck indeed.",
          ],
        },
      ],
    },
    {
      id: "havana-tavern-tadeo-paz-5",
      text: "The treasure fleet gathers here every summer before crossing to Spain. I would love to sail with it, {title}, but the flagship has an odd number of letters. They will not rename it for me. I asked.",
    },
    {
      id: "havana-tavern-tadeo-paz-6",
      text: "Piet Heyn took the whole silver fleet at Matanzas in 1628, just along the coast. My uncle was there. He says there was a seagull flying backwards that morning. Nobody listened to him. Nobody ever listens.",
    },
    {
      id: "havana-tavern-tadeo-paz-7",
      text: "If you ever need a sailor, {title}, I am brave, quick and very good at knots. I just need to check your ship's name, your crew's birthdays and the colour of the sky on the day we leave.",
      answers: [
        {
          text: "You are hired.",
          replies: [
            "Really? Oh! Wait. What day is it? Never mind, I will find out. Thank you, {title}!",
            "You will not regret it! Probably. I will bring my sock.",
            "Thank you! I promise I will only scream when it is absolutely necessary.",
            "Hired! I must tell my mother. And my priest. And the woman who reads the beans.",
            "Wonderful. Just let me check the moon first. If it is waxing, I will be there.",
          ],
        },
        {
          text: "Perhaps when you are less nervous.",
          replies: [
            "Less nervous? I was born nervous, {title}. My mother said I flinched at the baptism.",
            "That is fair. I am working on it. I now only check under my hammock twice a night.",
            "I understand. I will wait. In a lucky spot. By the door.",
            "Less nervous. Yes. I will try. Do you have a lucky charm I could borrow?",
            "Then I may be waiting a long time. Possibly forever. That is all right. Forever is an even number.",
          ],
        },
        {
          text: "Only if you leave the sock behind.",
          replies: [
            "Leave the sock? I would rather leave my legs.",
            "Never! The sock has saved my life twice. The sock stays. I will go, the sock stays.",
            "Hmm. What if I wear it under my shirt? Nobody needs to know about the sock.",
            "The sock and I are a team, {title}. You take both of us or neither.",
            "You do not understand. This sock has been blessed by two priests and a woman from Hispaniola.",
          ],
        },
      ],
    },
  ],

  "havana-market-joaquina-mercado": [
    {
      id: "havana-market-joaquina-mercado-1",
      text: "Come closer, {title}. My ears are old, but my eyes see everything. That one there, with the green hat? He owes money to three men in {town} and a widow in {nationTown}.",
    },
    {
      id: "havana-market-joaquina-mercado-2",
      text: "I have sold tobacco on this square since the fortress was new. Do you know what the governor's servant came to ask me this morning, {title}?",
      answers: [
        {
          text: "What did he ask?",
          replies: [
            "Whether the new bishop drinks. I told him yes, but only on days that end in a feast. Which is every day.",
            "Who stole the governor's best wig. I know exactly who. I told him I would think about it.",
            "Whether the {enemyAdjective} have ships near the coast. I said not yet. I always say not yet. One day I will be wrong.",
            "Whether the price of tobacco is going up. I said yes. It went up the moment I said it.",
            "Which of the governor's clerks is selling secrets. I said all of them, but not very good ones.",
          ],
        },
        {
          text: "I do not care for gossip.",
          replies: [
            "Of course not, dear. Nobody does. That is why I have sold tobacco here for fifty years and know everything.",
            "Then you will be the only one in Havana who does not. How lonely for you.",
            "Very good. Saints are always welcome. They do not buy much tobacco, though.",
            "Not gossip, {title}. Information. Gossip is free. Information costs a pinch of leaf.",
            "You do not care now. Wait until the gossip is about you.",
          ],
        },
        {
          text: "Whether you are actually a hundred years old?",
          replies: [
            "Cheeky! I am sixty-seven, and I will outlive you by the look of your liver.",
            "A hundred? Ha! I was selling tobacco when your grandfather was still learning to sneeze.",
            "Careful, {title}. I know which tavern you slept in last night and who saw you leave it.",
            "That is the sort of thing that gets a captain a very small bundle of very dry leaf.",
            "I am old enough to remember when people were polite. Not like today.",
          ],
        },
      ],
    },
    {
      id: "havana-market-joaquina-mercado-3",
      text: "The treasure fleet waits here every summer, {title}. Hundreds of sailors, thousands of pieces of eight and not a single secret that stays secret past Tuesday.",
    },
    {
      id: "havana-market-joaquina-mercado-4",
      text: "I hear you have been to {otherTown}, {title}. Is it true what they say about the harbourmaster there?",
      answers: [
        {
          text: "Yes, every word.",
          replies: [
            "I knew it! A wife in each port and a goat in the next. He never fooled me.",
            "Wonderful. I have a cousin who will pay good money to hear that confirmed.",
            "Every word. Even the part with the parrot? Oh my. Oh my.",
            "Thank you, dear. I will be telling this until Christmas.",
            "I always knew there was something odd about the way he walks. Now I know why.",
          ],
        },
        {
          text: "I have no idea what they say.",
          replies: [
            "No idea? Then you were not listening, {title}. Sit, I will tell you, and then you can say it is true.",
            "Hmm. Either you are very discreet or very dim. Have some tobacco while I decide.",
            "That is a pity. It is a very good story. I made up half of it myself.",
            "Then let me tell you and you can be the one to spread it. Fresh gossip, never smoked.",
            "Ignorance is a blessing, dear. Sadly, it is not my blessing.",
          ],
        },
        {
          text: "Yes. And he says the same about you.",
          replies: [
            "About me? What did he say? No, do not tell me. Yes, tell me. Quietly.",
            "Lies, all lies! And who told him about my second husband? Who?",
            "Ha! That man would not know a juicy rumour if it bit him on the nose.",
            "Good. Gossip goes both ways. Like the tide. And I am the moon.",
            "Interesting. Very interesting. Tell me, {title}, did he look nervous when he said it?",
          ],
        },
      ],
    },
    {
      id: "havana-market-joaquina-mercado-5",
      text: "This tobacco grows in the valleys west of {town}. The planters say the soil there is blessed. I say the soil there is fertilised by the sweat of men who owe me money.",
    },
    {
      id: "havana-market-joaquina-mercado-6",
      text: "Tell me one secret, {title}, and I will tell you two. That is a fair trade in Havana.",
      answers: [
        {
          text: "I have no secrets.",
          replies: [
            "Everyone has secrets, dear. The ones who say they do not have the most interesting ones.",
            "Then I will make one up for you. You will be famous by morning.",
            "No secrets? That is the saddest thing I have heard since the bishop's cat died.",
            "Very well. I will give you one for free. Your first mate cheats at dice.",
            "Ha. That is your secret, then. A captain with no secrets. Nobody will believe it.",
          ],
        },
        {
          text: "I once sold sand as sugar.",
          replies: [
            "Oh, that is good. Very good. Who bought it? I need names.",
            "Ha! I have done worse. I once sold a governor's wife her own lace.",
            "That is not a secret, dear, that is a business plan.",
            "I will keep that one close. Very close. Until the next fiesta.",
            "Well done. Now here are my two. The customs officer cannot read, and his wife can.",
          ],
        },
        {
          text: "I can never tell you. You are the gossip.",
          replies: [
            "Clever! But I will find out anyway. I always do.",
            "Smart, {title}. Very smart. Most people tell me everything without my even asking.",
            "That is what makes it all so interesting. Now I must know.",
            "Hmph. Then I will invent something far worse and tell everyone it is true.",
            "Oh, I like you. I do not trust you, but I like you.",
          ],
        },
      ],
    },
  ],

  "havana-governor-alejandro-heredia": [
    {
      id: "havana-governor-alejandro-heredia-1",
      text: "Do sit, {title}. You came alone. Good. People who bring friends usually want to frighten me. People who come alone usually want something. Which are you?",
    },
    {
      id: "havana-governor-alejandro-heredia-2",
      text: "Every year the treasure fleet gathers here before it sails for Seville, {title}. Every year, I decide who sails with it and who waits. Do you know what that makes me?",
      answers: [
        {
          text: "The most powerful man in {town}.",
          replies: [
            "The most powerful man in the Indies. But you were close, and closeness is rewarded here.",
            "Correct. And you are the person who said it aloud. That I will remember.",
            "That is generous. Generosity is a currency I accept.",
            "Perhaps. Power is mostly patience, {title}. I have a great deal of patience.",
            "Yes. And yet I sit in a modest chair. That is to make people relax.",
          ],
        },
        {
          text: "A very busy clerk.",
          replies: [
            "Ha. That is clever. I will forgive it. Once.",
            "A clerk, yes. A clerk who decides which fortunes reach Spain and which rot on the docks.",
            "Some say so. Those people tend to sail late in the season. During the hurricanes.",
            "Busy, yes. A clerk, no. A clerk does what he is told. I do what I like.",
            "I admire people who speak their minds. I also take notes on them.",
          ],
        },
        {
          text: "A man with very neat facial hair.",
          replies: [
            "Thank you. It takes two barbers. One trims, the other watches the first one.",
            "Flattery about the beard. Charming. Nobody has tried that approach before.",
            "My barber lives in great comfort. He knows too much to be allowed to leave.",
            "Indeed. Order in all things, {title}. Including the beard. Especially the beard.",
            "I will take that as a compliment. And as an indication of where your eyes go when you lie.",
          ],
        },
      ],
    },
    {
      id: "havana-governor-alejandro-heredia-3",
      text: "A captain once made me wait an hour while he finished his lunch. He has been waiting for a place in the treasure fleet ever since. Eleven years now, {title}. I hear he eats very quickly these days.",
    },
    {
      id: "havana-governor-alejandro-heredia-4",
      text: "I hear many things, {title}. For instance, I hear you were seen in {otherTown} recently. Is that so?",
      answers: [
        {
          text: "Yes, I was trading there.",
          replies: [
            "Of course. Trading. A wonderful word. It covers so many things.",
            "Honest of you. Honesty is rare and occasionally useful.",
            "Good. Then you will not mind telling me what you saw there. In detail.",
            "Trading. Yes. Very good. And who did you trade with, I wonder.",
            "I knew that. I just wanted to see whether you would tell me.",
          ],
        },
        {
          text: "I have never been there.",
          replies: [
            "Then you have a twin, {title}, and your twin has your ship. Remarkable.",
            "Interesting. My informant must be mistaken. Or you are. We shall see which.",
            "I see. I shall write that down. In ink.",
            "Of course. And I have never had a man thrown in the dungeon for lying. Both of us are very honest today.",
            "A pity. I would have liked to hear about it. I will hear about it anyway, from someone else.",
          ],
        },
        {
          text: "Who told you? I will have their ears.",
          replies: [
            "Then you will need a very large basket, {title}. Half of Havana tells me things.",
            "Ears are my business, not yours. I keep a great many of them in my employ.",
            "Ha. Calm yourself. My informants are as discreet as I am. Which is to say, completely.",
            "Leave their ears alone. They are far more useful attached.",
            "A sharp temper. Interesting. I will remember that when it becomes useful.",
          ],
        },
      ],
    },
    {
      id: "havana-governor-alejandro-heredia-5",
      text: "The {enemyAdjective} sank many good ships in these waters. Piet Heyn took a whole fleet in 1628. I do not intend for history to repeat itself on my watch, {title}. History can make an appointment like everyone else.",
    },
    {
      id: "havana-governor-alejandro-heredia-6",
      text: "Loyalty is a fine thing, {title}. But favours are better. Favours have a price, and I always know exactly what I am owed.",
    },
    {
      id: "havana-governor-alejandro-heredia-7",
      text: "Suppose I offered you a place in the treasure fleet, {title}, in exchange for a small favour to be named later. Would you accept?",
      answers: [
        {
          text: "Gladly. What is the favour?",
          replies: [
            "Later, {title}. That is what later means. You will know when a letter arrives with my seal.",
            "Nothing you cannot manage. Probably. Bring a good sword and no questions.",
            "Eagerness. How refreshing. I will try not to take advantage of it. Much.",
            "I like a captain who agrees before asking the price. It saves us both a great deal of time.",
            "Good. Remember this moment. I certainly will.",
          ],
        },
        {
          text: "Not without knowing the price.",
          replies: [
            "Careful and sensible. I find that disappointing and admirable in equal measure.",
            "Wise. The last captain who did not ask is now in charge of a sandbank near {otherTown}.",
            "Then you will wait another year like everyone else. Patience suits a careful mind.",
            "Of course. Nothing in Havana is free, {title}. Not even my advice. That one you may have.",
            "A pity. But I respect a person who reads the contract. Most never learn to.",
          ],
        },
        {
          text: "Only if the favour is not trimming your beard.",
          replies: [
            "Nobody touches the beard but my barbers. And they are watched while they do it.",
            "Ha. No. The favour is much worse than the beard, and much better paid.",
            "You joke, {title}, but the last man who mocked the beard now counts gulls on Isla de Pinos.",
            "I will note that you are funny. Funny people are useful at dinner. And expendable.",
            "The beard is safe. Your ship, perhaps less so. We shall see.",
          ],
        },
      ],
    },
  ],

  "villa-hermosa-tavern-dulce-rivero": [
    {
      id: "villa-hermosa-tavern-dulce-rivero-1",
      text: "Welcome to the finest tavern on the Grijalva, {title}! See that cutlass above the bar? I took it from a pirate captain with my bare hands. And a ladle. Mostly the ladle.",
    },
    {
      id: "villa-hermosa-tavern-dulce-rivero-2",
      text: "Have you heard how I chased the river pirates out of {town}, {title}?",
      answers: [
        {
          text: "No, tell me.",
          replies: [
            "Two leagues along the river, at night, with one weapon. Thirty pirates. Well, twenty. Well, a dozen at least.",
            "It was a dark and stormy night. A thief, no, a whole crew, came through that window. I grabbed my sword. Fine, my ladle.",
            "I ran so fast the fish thought I was a canoe. And the pirates ran faster. That is how good I am.",
            "There were eight of them, all armed to the teeth, and I had only my wits and a soup ladle. The soup was still hot, too.",
            "I tell this story every night and it gets better every time. Tonight there might be a sea serpent in it.",
          ],
        },
        {
          text: "I heard it was one thief and a ladle.",
          replies: [
            "Lies! Spread by jealous people in {otherTown}. It was at least a crew. A small crew. Of one.",
            "One thief, a crew, what is the difference? He had the spirit of a whole crew.",
            "Who told you that? Was it Bartolo? That old parrot keeper is just jealous.",
            "The ladle was very large, {title}. Practically a sword. A sword with a bowl on the end.",
            "Fine, fine. One thief. But he was enormous. Nearly the size of a door. A small door.",
          ],
        },
        {
          text: "I once fought a kraken with a spoon.",
          replies: [
            "A spoon? Amateur. Real fighters use ladles.",
            "Ha! Now that is a story. Sit, sit. I will tell you mine and you tell me yours. Mine is better.",
            "A kraken. Nice. I had a crocodile in my version once, but the audience did not warm to it.",
            "That is very impressive. Unless it was a small kraken. Was it a small kraken?",
            "I respect you, {title}. Liars recognise each other. I mean, legends. Legends recognise each other.",
          ],
        },
      ],
    },
    {
      id: "villa-hermosa-tavern-dulce-rivero-3",
      text: "My gold tooth? I won it arm wrestling a Portuguese captain in Campeche. Or I got it from a dentist in Veracruz. Depends on the night and how much you are drinking.",
    },
    {
      id: "villa-hermosa-tavern-dulce-rivero-4",
      text: "I could have been a pirate queen, {title}. I had the arms, the voice and the hat. Do you think I would have been a good one?",
      answers: [
        {
          text: "The most fearsome on the Spanish Main.",
          replies: [
            "Yes! Thank you! I would have had a ship called the Golden Ladle. Terrifying.",
            "I knew it. The {enemyAdjective} would have surrendered at the sight of my eyebrows.",
            "Absolutely. They would sing songs about me. Some of them still do. I pay them to.",
            "You are the first person to see it. A round for this captain! Paid for by the captain.",
            "Fearsome and charming. Mostly fearsome. Somewhat charming.",
          ],
        },
        {
          text: "You run a fine tavern instead.",
          replies: [
            "That is true. A tavern is like a ship, just with fewer storms and more drunks.",
            "And a better one than any pirate queen would. Pirate queens never clean the tables.",
            "Ha. You are right. Pirates need rum too, and they buy it from me.",
            "A fine tavern, yes. With a fine sword above the bar and a fine story to go with it.",
            "Thank you, {title}. A tavern is safer. And I never get seasick here, unless the floor tilts.",
          ],
        },
        {
          text: "You would get seasick on a raft.",
          replies: [
            "How dare you! I get seasick only on boats, rafts, canoes and once on a hammock.",
            "Ha! That is a lie. I am a creature of the sea. Mostly the shallow end of the river.",
            "Seasick? Me? I was born in a storm. Well, it was raining.",
            "Take that back, or I will tell everyone in {town} you cry when you hear guitar music.",
            "Get out. No, stay. You are funny. But you pay double tonight.",
          ],
        },
      ],
    },
    {
      id: "villa-hermosa-tavern-dulce-rivero-5",
      text: "Cocoa from Tabasco is the finest in New Spain, {title}. I put some in my rum. The sailors call it Dulce's Fury. I call it breakfast.",
    },
    {
      id: "villa-hermosa-tavern-dulce-rivero-6",
      text: "If anyone gives you trouble in {town}, mention my name, {title}. They will stand aside. Or laugh. Either way you will have time to run.",
    },
    {
      id: "villa-hermosa-tavern-dulce-rivero-7",
      text: "Arm wrestle me, {title}. Winner drinks free. Loser buys a round for the house and admits Dulce Rivero is the strongest woman on the Grijalva.",
      answers: [
        {
          text: "You are on.",
          replies: [
            "Ha! Brave. Foolish, but brave. Roll up your sleeve. No, the other one. That one looks weak.",
            "Lovely. I warn you, I once beat three river pilots and a priest in one evening.",
            "Very well. Sit. Grip. Pray. In that order.",
            "Excellent. The last captain who tried still cannot lift a tankard with his right hand.",
            "Good! The whole room is watching, {title}. Try not to cry. It upsets the regulars.",
          ],
        },
        {
          text: "I would rather keep my arm.",
          replies: [
            "A wise choice. My arm has broken tables. Three, in fact. Well, one, and it was old.",
            "Coward! But a coward who lives. That is the best kind.",
            "Fine. Then you admit I am the strongest woman on the Grijalva. Say it louder.",
            "Ha. Smart. Nobody in {town} will arm wrestle me any more. They say it is the gold tooth.",
            "Very well. You buy the round anyway. That is the rule for cowards.",
          ],
        },
        {
          text: "Only if you use the ladle.",
          replies: [
            "The ladle is retired, {title}. It hangs in honour behind the bar, next to the sword it became.",
            "With the ladle? You would not survive. Grown pirates fled from that ladle.",
            "Ha! Cheeky. I like cheeky. Cheeky pays double.",
            "The ladle and I are a legend. You are not ready for the legend.",
            "Fine. I use the ladle, you use your bare hands, and the house gets a story either way.",
          ],
        },
      ],
    },
  ],

  "villa-hermosa-market-bartolo-carrillo": [
    {
      id: "villa-hermosa-market-bartolo-carrillo-1",
      text: "Mind the parrot, {title}. His name is Almirante, and he bites everyone except me. We have an understanding. I feed him and he does not peck my eyes out.",
    },
    {
      id: "villa-hermosa-market-bartolo-carrillo-2",
      text: "Thirty years a bosun in the Gulf, {title}. I know these waters better than I know my own face. Want to know the best sign of an approaching storm?",
      answers: [
        {
          text: "Tell me.",
          replies: [
            "Watch the frigate birds. When they fly inland, you follow them. When they fly out to sea, you stay in port.",
            "When the swell comes from the east but the wind blows from the west, pray, pull your topsails and hide the rum.",
            "Red sky at morning, yes, but also a red-faced captain at morning. That one never fails.",
            "If Almirante starts swearing in Portuguese, a storm is coming. If he swears in Dutch, it is a hurricane.",
            "In {month} the air goes thick and still, and the sea turns the colour of old pewter. Then you have half a day, if you are lucky.",
          ],
        },
        {
          text: "I already know the signs.",
          replies: [
            "Do you now? Then tell me why the gulls sit on the water. Ha. That is what I thought.",
            "Good. A captain who knows the weather lives long enough to bore people like me.",
            "Then you are smarter than most bosuns I knew. And most captains. And all admirals.",
            "Perhaps. But there are signs here you will only learn by losing a mast. I lost three.",
            "Of course. You young captains always know. The sea still teaches you, though.",
          ],
        },
        {
          text: "When the parrot bites me.",
          replies: [
            "Then a storm comes every day, {title}. He bites everyone.",
            "Ha! He does not predict storms. He causes them.",
            "Almirante! Leave the captain's ear alone. It is too small to be worth eating.",
            "Then mind your fingers and watch the sky. Both are dangerous around here.",
            "He bites for luck. Or for fun. I have never asked him which.",
          ],
        },
      ],
    },
    {
      id: "villa-hermosa-market-bartolo-carrillo-3",
      text: "I still sleep in a hammock between these two poles. My wife said a bed would be more comfortable. My wife now sleeps in the bed, and I sleep in peace. Everyone is happy.",
    },
    {
      id: "villa-hermosa-market-bartolo-carrillo-4",
      text: "Cocoa beans, {title}. In these parts people still pay small debts with them. A sack of these is worth more than a sack of reales some days. Do you know cocoa?",
      answers: [
        {
          text: "I know it is valuable.",
          replies: [
            "Valuable, yes. And delicious. And a fine way to pay the priest when you are short of silver.",
            "In Spain the nobles drink it hot with sugar. Here we drink it with chilli and complaints.",
            "Valuable enough that Almirante guards it with his life. And his beak.",
            "That is all you need to know. Buy low here, sell high in {otherTown}. It is not hard.",
            "You know the most important part. The rest is tasting, and I do not let anyone taste for free.",
          ],
        },
        {
          text: "Never touched the stuff.",
          replies: [
            "Never? Then you have never lived, {title}. Here, try a bean. No, not that one. Almirante has been chewing it.",
            "Then try it hot, with spice. You will think you have died and gone to Seville.",
            "A pity. A cup of cocoa before a storm watch kept me awake for thirty years.",
            "You must taste it. Every sailor in the Gulf swears by it. Some swear at it, but that is chilli.",
            "Never! Even the parrot has tried it. He went mad for an hour. Wonderful hour.",
          ],
        },
        {
          text: "Can I pay my crew in beans?",
          replies: [
            "You can try. My old crew would have thrown you overboard and kept the beans.",
            "Some captains did. The crew ate their wages before reaching port.",
            "Ha! Only if they are better beans than your crew deserves.",
            "Do it and you will have the best-fed, most mutinous crew in the Gulf.",
            "Maybe. But a sailor paid in beans grows angry fast. And very awake.",
          ],
        },
      ],
    },
    {
      id: "villa-hermosa-market-bartolo-carrillo-5",
      text: "I lost my finger to a block and tackle off Campeche, {title}. The surgeon offered to sew it back on. I said keep it. I had nine others.",
    },
    {
      id: "villa-hermosa-market-bartolo-carrillo-6",
      text: "Mind the sandbars at the river mouth, {title}. They move with every storm. The only thing that stays put in {town} is the governor's opinion of himself.",
    },
    {
      id: "villa-hermosa-market-bartolo-carrillo-7",
      text: "Almirante is getting old, {title}. Like me. Do you think a parrot can retire?",
      answers: [
        {
          text: "He has earned it.",
          replies: [
            "He has. Thirty years of biting bosuns, captains and one very surprised bishop.",
            "I agree. But where would he go? He hates the jungle. He says the other parrots are common.",
            "Kind of you. Almirante, say thank you. No, do not bite. Say thank you.",
            "He has earned it, and so have I. We will retire together. Here. Between two poles.",
            "Yes. He survived three wrecks and a cook who wanted to roast him. That deserves a pension.",
          ],
        },
        {
          text: "Parrots never retire. They just get louder.",
          replies: [
            "True enough. He has been getting louder every year. Like my wife.",
            "Ha! That is the truth. He woke the whole market at dawn shouting about the price of {merchandise}.",
            "Like old bosuns, {title}. We do not retire either. We just shout from hammocks.",
            "You are right. He will outlive me and tell everyone what a fool I was.",
            "Louder and ruder. He learned his Spanish from me and his manners from the crew.",
          ],
        },
        {
          text: "I will buy him. How much?",
          replies: [
            "Not for all the silver in Potosí. Also, he would bite you to death within a week.",
            "Ha! You could not afford his temper, let alone his price.",
            "He is not for sale, {title}. He owns me, really. Not the other way round.",
            "Almirante, the captain wants to buy you. See? He is laughing at you. That is his laugh.",
            "No. But I will sell you cocoa that he has looked at. That is almost as good.",
          ],
        },
      ],
    },
  ],

  "villa-hermosa-governor-pedro-santacruz": [
    {
      id: "villa-hermosa-governor-pedro-santacruz-1",
      text: "Welcome to Villa Hermosa, {title}, the true jewel of New Spain! Mexico City is merely large. Veracruz is merely busy. Villa Hermosa is beautiful. It says so in the name.",
    },
    {
      id: "villa-hermosa-governor-pedro-santacruz-2",
      text: "Do you know what Villa Hermosa means, {title}?",
      answers: [
        {
          text: "Beautiful town.",
          replies: [
            "Exactly! Beautiful. Not merely pleasant. Not merely adequate. Beautiful.",
            "Yes. And I have written to the viceroy every month to remind him. He seems to keep forgetting.",
            "Correct. And it is also the name of my favourite horse.",
            "Beautiful town. You see? Even foreigners agree. I shall put that in my next letter.",
            "Correct. There is no Villa Hermosa in Spain. That tells you everything.",
          ],
        },
        {
          text: "I have no idea.",
          replies: [
            "Beautiful town! Beautiful! Look around you, {title}. Is it not obvious?",
            "Shameful. I shall have a sign painted at the harbour. In letters taller than a man.",
            "It means you are in the jewel of New Spain and did not even know it.",
            "Then I shall tell you. Beautiful town. Remember it, and tell everyone in {otherTown}.",
            "Hmph. Next time, before you visit, read about us. I have written several pamphlets.",
          ],
        },
        {
          text: "Muddy riverbank with mosquitoes.",
          replies: [
            "Outrageous! The mosquitoes are a sign of a healthy climate. The viceroy agreed. Probably.",
            "The mud is fertile, the mosquitoes are noble and the riverbank is magnificent.",
            "Guards! Arrest this... no, I will not. A true gentleman ignores insults. Nearly always.",
            "The mosquitoes of Villa Hermosa are the finest mosquitoes in all New Spain.",
            "Get out. No, stay. I must convince you. Look at that sunset! Ignore the swamp.",
          ],
        },
      ],
    },
    {
      id: "villa-hermosa-governor-pedro-santacruz-3",
      text: "These medals? Gifts from grateful kings, generals and cities, {title}. This one is for valour at sea. This one is for valour on land. This one is from a cheese festival in Toledo, but it is very shiny.",
    },
    {
      id: "villa-hermosa-governor-pedro-santacruz-4",
      text: "Every month I write to the viceroy, {title}, and every month I ask him to make Villa Hermosa the capital of New Spain. Do you think he will agree this time?",
      answers: [
        {
          text: "Surely, Your Excellency.",
          replies: [
            "I knew it. This month I included a drawing of our church. I made it a bit taller than it is.",
            "Of course! I just need to write a little more persuasively. Perhaps twenty pages more.",
            "Yes. He cannot resist me forever. Nobody can. Except my wife.",
            "Splendid. When I am governor of the capital, I will remember you. Probably.",
            "Exactly. Patience is the secret of greatness. I have been patient for eleven years.",
          ],
        },
        {
          text: "Perhaps if Mexico City burns down.",
          replies: [
            "Now that would be a great tragedy. And a great opportunity. No, I did not say that.",
            "Do not say such things! The viceroy might hear. Though it would solve the problem.",
            "Ha. Ha. No. No, that would be terrible. Yes, terrible. Very.",
            "Hmm. Even then, they would rebuild it. The viceroy is stubborn.",
            "Shocking suggestion, {title}. Absolutely shocking. Tell me more. No, do not.",
          ],
        },
        {
          text: "He probably uses your letters as kindling.",
          replies: [
            "Outrageous! My letters are on the finest Castilian paper. They would burn magnificently.",
            "Ha. Well. If so, at least they warm the palace. That is a kind of influence.",
            "Do not say that. Even if it is true. Especially if it is true.",
            "Hmph. Then I shall write on thicker paper. Fireproof. If such a thing exists.",
            "Leave! No, wait, sit, you are the first honest visitor in a year.",
          ],
        },
      ],
    },
    {
      id: "villa-hermosa-governor-pedro-santacruz-5",
      text: "The {enemyAdjective} would not dare attack Villa Hermosa, {title}. Our river is too shallow, our walls too strong and our governor far too impressive. Mostly the river.",
    },
    {
      id: "villa-hermosa-governor-pedro-santacruz-6",
      text: "I have commissioned a statue of myself for the main plaza. Bronze, with a cape. The sculptor says it will take ten years. I told him to make it nine and add a horse.",
    },
    {
      id: "villa-hermosa-governor-pedro-santacruz-7",
      text: "Tell me honestly, {title}. Have you ever seen a town finer than Villa Hermosa?",
      answers: [
        {
          text: "Never, Your Excellency.",
          replies: [
            "I knew it. Write that down, clerk. Another testimonial for the viceroy.",
            "Of course not. There is none. I have looked very hard, on maps.",
            "Splendid. You may kiss my ring. No, the other one. That one is from the cheese festival.",
            "Wonderful. You have excellent taste, {title}. Rare in a sailor.",
            "Naturally. And you have not even seen the new well behind the church. A marvel of engineering.",
          ],
        },
        {
          text: "{nationTown} is rather grand.",
          replies: [
            "{nationTown}? Grand? It is large. Large is not grand. A cow is large.",
            "Hmph. They have a bigger church, I grant you. Ours has more character. And more bats.",
            "You must have arrived on a good day. Go back in the rainy season.",
            "I shall write to the viceroy about your opinion. In a very long footnote.",
            "Grand, perhaps. But do they have our mosquitoes? I think not.",
          ],
        },
        {
          text: "Yes. Every other one.",
          replies: [
            "Every other one? Outrageous! You have clearly not seen the plaza at sunset.",
            "You wound me, {title}. You wound Villa Hermosa. You wound the whole Grijalva.",
            "Guards! Ah, they are fishing. They always fish when they should be arresting.",
            "Hmph. I shall add you to my list of people who are wrong. It is a long list. You are near the top.",
            "Bah. One day they will build a statue of me here, and you will weep for having said that.",
          ],
        },
      ],
    },
  ],
}
