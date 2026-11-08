# NPC voice generator prompts

Prompts for the gibberish voices the townsfolk make when they talk. A voice is picked by voice type, gender and nationality, so every NPC with the same three shares a voice.

- 4 voice types × 2 genders × 4 nationalities makes 32 possible voices.
- The 48 NPCs only use 25 of them, so only those are listed here. The other 7 are only needed if new NPCs are added.
- Each voice has 4 clips of 10 seconds, which makes 100 clips in total.

## How the game plays them

- When an NPC starts talking, the game plays a random clip from their voice.
- When the typewriter text has finished, the sound stops, even in the middle of a clip.
- If the text takes longer than 10 seconds, the game plays another random clip from the same voice.

So every clip has to be chatter from start to end, without a beginning, an ending or long pauses, because it can be cut off anywhere.

## How to use them

- The prompts are written for a text to sound effect tool, like ElevenLabs Sound Effects. Generate each clip from the voice's prompt, and generate the prompt again for each of the 4 clips so they differ.
- Keep only takes without real words. If a take sounds like real English, French, Spanish or Dutch, generate it again.
- Trim silence at the start and end, then export as `.opus` like the other sound effects.
- Save each clip to the path given. All NPC voices share the `public/soundfx/npc/` folder.

## Shared style

Gibberish speech, nonsense syllables with no real words, a single adult speaker in the 17th century Caribbean, about 10 seconds of continuous chatter with natural phrasing and only short breaths between phrases, no clear start or end, dry close recording, mono, no music, no background noise, no echo.

## Building blocks

The prompts below combine these. Use them to write prompts for the unused combinations.

### Voice types

- Gruff (old salt, weary veteran): low, gravelly and unhurried, with the odd grunt or tired sigh
- Lively (gossip, braggart): fast, loud and excited, with bursts of laughter
- Smooth (shrewd trader, schemer, pompous): measured, polished and a little haughty, with crisp emphasis
- Hushed (melancholic, superstitious): quiet and wavering, close to a whisper, with soft sighs

### Gender

- Male: a man's voice
- Female: a woman's voice

### Nationality

- English: it should sound English but be gibberish
- French: it should sound French but be gibberish
- Spanish: it should sound Spanish but be gibberish
- Dutch: it should sound Dutch but be gibberish

## Gruff

### Female, Dutch

- Used by: Griet Vogel
- Files: `public/soundfx/npc/gruff-female-holland1.opus` to `gruff-female-holland4.opus`

> A woman talking gibberish. It should sound Dutch but have no real words. The delivery is low, gravelly and unhurried, with the odd grunt or tired sigh. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Female, Spanish

- Used by: Socorro Herrera
- Files: `public/soundfx/npc/gruff-female-spain1.opus` to `gruff-female-spain4.opus`

> A woman talking gibberish. It should sound Spanish but have no real words. The delivery is low, gravelly and unhurried, with the odd grunt or tired sigh. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Male, English

- Used by: Hugh Palmer, Frederick Howard
- Files: `public/soundfx/npc/gruff-male-england1.opus` to `gruff-male-england4.opus`

> A man talking gibberish. It should sound English but have no real words. The delivery is low, gravelly and unhurried, with the odd grunt or tired sigh. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Male, French

- Used by: Yves Bouvier, Alain Turgot
- Files: `public/soundfx/npc/gruff-male-france1.opus` to `gruff-male-france4.opus`

> A man talking gibberish. It should sound French but have no real words. The delivery is low, gravelly and unhurried, with the odd grunt or tired sigh. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Male, Dutch

- Used by: Hubrecht Engel, Diederik Lang, Joost Becker
- Files: `public/soundfx/npc/gruff-male-holland1.opus` to `gruff-male-holland4.opus`

> A man talking gibberish. It should sound Dutch but have no real words. The delivery is low, gravelly and unhurried, with the odd grunt or tired sigh. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Male, Spanish

- Used by: Salvador Arellano, Bartolo Carrillo
- Files: `public/soundfx/npc/gruff-male-spain1.opus` to `gruff-male-spain4.opus`

> A man talking gibberish. It should sound Spanish but have no real words. The delivery is low, gravelly and unhurried, with the odd grunt or tired sigh. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

## Lively

### Female, English

- Used by: Mavis Cartwright, Ursula Cole
- Files: `public/soundfx/npc/lively-female-england1.opus` to `lively-female-england4.opus`

> A woman talking gibberish. It should sound English but have no real words. The delivery is fast, loud and excited, with bursts of laughter. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Female, French

- Used by: Babette Garnier, Margot Besson
- Files: `public/soundfx/npc/lively-female-france1.opus` to `lively-female-france4.opus`

> A woman talking gibberish. It should sound French but have no real words. The delivery is fast, loud and excited, with bursts of laughter. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Female, Spanish

- Used by: Joaquina Mercado, Dulce Rivero
- Files: `public/soundfx/npc/lively-female-spain1.opus` to `lively-female-spain4.opus`

> A woman talking gibberish. It should sound Spanish but have no real words. The delivery is fast, loud and excited, with bursts of laughter. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Male, French

- Used by: Aubin Laclos
- Files: `public/soundfx/npc/lively-male-france1.opus` to `lively-male-france4.opus`

> A man talking gibberish. It should sound French but have no real words. The delivery is fast, loud and excited, with bursts of laughter. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Male, Dutch

- Used by: Klaas Bier, Maarten Koch
- Files: `public/soundfx/npc/lively-male-holland1.opus` to `lively-male-holland4.opus`

> A man talking gibberish. It should sound Dutch but have no real words. The delivery is fast, loud and excited, with bursts of laughter. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Male, Spanish

- Used by: Sancho Velasco
- Files: `public/soundfx/npc/lively-male-spain1.opus` to `lively-male-spain4.opus`

> A man talking gibberish. It should sound Spanish but have no real words. The delivery is fast, loud and excited, with bursts of laughter. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

## Smooth

### Female, English

- Used by: Beatrix Lamb, Eleanor Richardson
- Files: `public/soundfx/npc/smooth-female-england1.opus` to `smooth-female-england4.opus`

> A woman talking gibberish. It should sound English but have no real words. The delivery is measured, polished and a little haughty, with crisp emphasis. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Female, Dutch

- Used by: Femke Apel, Machteld Glauber
- Files: `public/soundfx/npc/smooth-female-holland1.opus` to `smooth-female-holland4.opus`

> A woman talking gibberish. It should sound Dutch but have no real words. The delivery is measured, polished and a little haughty, with crisp emphasis. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Female, Spanish

- Used by: Jacinta Moya
- Files: `public/soundfx/npc/smooth-female-spain1.opus` to `smooth-female-spain4.opus`

> A woman talking gibberish. It should sound Spanish but have no real words. The delivery is measured, polished and a little haughty, with crisp emphasis. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Male, English

- Used by: Thomas Jarvis, Randolph Ellis, Archibald Stokes
- Files: `public/soundfx/npc/smooth-male-england1.opus` to `smooth-male-england4.opus`

> A man talking gibberish. It should sound English but have no real words. The delivery is measured, polished and a little haughty, with crisp emphasis. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Male, French

- Used by: Bertrand Aubert, Blaise Chamfort, Ignace Jobert, Yvon Boitel
- Files: `public/soundfx/npc/smooth-male-france1.opus` to `smooth-male-france4.opus`

> A man talking gibberish. It should sound French but have no real words. The delivery is measured, polished and a little haughty, with crisp emphasis. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Male, Dutch

- Used by: Pieter Haas, Constantijn Reich
- Files: `public/soundfx/npc/smooth-male-holland1.opus` to `smooth-male-holland4.opus`

> A man talking gibberish. It should sound Dutch but have no real words. The delivery is measured, polished and a little haughty, with crisp emphasis. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Male, Spanish

- Used by: Alfonso Benavides, Alejandro Heredia, Pedro Santacruz
- Files: `public/soundfx/npc/smooth-male-spain1.opus` to `smooth-male-spain4.opus`

> A man talking gibberish. It should sound Spanish but have no real words. The delivery is measured, polished and a little haughty, with crisp emphasis. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

## Hushed

### Female, English

- Used by: Eliza Knowles
- Files: `public/soundfx/npc/hushed-female-england1.opus` to `hushed-female-england4.opus`

> A woman talking gibberish. It should sound English but have no real words. The delivery is quiet and wavering, close to a whisper, with soft sighs. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Female, French

- Used by: Manon Artaud, Adele Bonnaire
- Files: `public/soundfx/npc/hushed-female-france1.opus` to `hushed-female-france4.opus`

> A woman talking gibberish. It should sound French but have no real words. The delivery is quiet and wavering, close to a whisper, with soft sighs. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Female, Dutch

- Used by: Saskia Berg, Hadewych Zorn
- Files: `public/soundfx/npc/hushed-female-holland1.opus` to `hushed-female-holland4.opus`

> A woman talking gibberish. It should sound Dutch but have no real words. The delivery is quiet and wavering, close to a whisper, with soft sighs. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Male, English

- Used by: Abraham Parry, Miles Barnes
- Files: `public/soundfx/npc/hushed-male-england1.opus` to `hushed-male-england4.opus`

> A man talking gibberish. It should sound English but have no real words. The delivery is quiet and wavering, close to a whisper, with soft sighs. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Male, French

- Used by: Etienne Boulanger
- Files: `public/soundfx/npc/hushed-male-france1.opus` to `hushed-male-france4.opus`

> A man talking gibberish. It should sound French but have no real words. The delivery is quiet and wavering, close to a whisper, with soft sighs. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.

### Male, Spanish

- Used by: Roque Acosta, Tadeo Paz
- Files: `public/soundfx/npc/hushed-male-spain1.opus` to `hushed-male-spain4.opus`

> A man talking gibberish. It should sound Spanish but have no real words. The delivery is quiet and wavering, close to a whisper, with soft sighs. About 10 seconds of continuous talking with only short breaths, no clear start or end. Single speaker, dry close recording, no music, no background noise.
