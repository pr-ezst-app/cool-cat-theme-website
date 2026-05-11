import { useState, useEffect } from "react";
import { useCatTownMusic } from "@/hooks/useCatTownMusic";
import SnakeGame from "@/components/games/SnakeGame";
import PongGame from "@/components/games/PongGame";
import MinesweeperGame from "@/components/games/MinesweeperGame";

const CAT_HERO = "https://cdn.ezst.app/projects/21455392-ec4f-4edb-b1e5-76c9cb10d747/files/bde3de86-1cae-43b4-929e-67c000c066d5.jpg";
const CAT_MEMES = "https://cdn.ezst.app/projects/21455392-ec4f-4edb-b1e5-76c9cb10d747/files/9bd8cf93-8fad-4055-9c27-13d1db0cf614.jpg";
const CAT_TOWN_IMG = "https://cdn.ezst.app/projects/21455392-ec4f-4edb-b1e5-76c9cb10d747/files/8b256d09-de64-4888-abe8-8d468868a098.jpg";

const MEMES = [
  { id: 1, title: "I Can Has Cheezburger?", year: "2007", rating: 5, emoji: "🍔", caption: "THE ORIGINAL. THE LEGEND. DO NOT QUESTION IT.", bg: "#FFE600" },
  { id: 2, title: "Keyboard Cat", year: "2009", rating: 5, emoji: "🎹", caption: "RIP Charlie. You played us all off beautifully.", bg: "#00AAAA" },
  { id: 3, title: "Nyan Cat", year: "2011", rating: 5, emoji: "🌈", caption: "Poptart cat going 100mph through space. Perfect.", bg: "#FF00AA" },
  { id: 4, title: "Longcat", year: "2006", rating: 4, emoji: "📏", caption: "Longcat is looooooooooooooooooooooooooooong.", bg: "#FF6600" },
  { id: 5, title: "Ceiling Cat", year: "2006", rating: 4, emoji: "👁️", caption: "Ceiling Cat is watching you browse the internet.", bg: "#9900CC" },
  { id: 6, title: "Serious Cat", year: "2007", rating: 4, emoji: "😤", caption: "This is a serious cat. Do NOT make it laugh.", bg: "#0000CC" },
];

const COOL_CATS = [
  { name: "Mr. Whiskers", title: "Mayor of Cat Town", emoji: "👑", fact: "Has never once knocked something off a table on accident. It is always on purpose." },
  { name: "Mittens McFloof", title: "Chief Meme Officer", emoji: "💼", fact: "Responsible for 74% of all early 2000s cat content. You're welcome, internet." },
  { name: "Señor Biscuits", title: "Head of Bread Loaf Division", emoji: "🍞", fact: "World record holder for most consecutive hours sitting in a loaf shape: 14 hours, 22 minutes." },
  { name: "Princess Fluffington", title: "Official Spokesperson", emoji: "📢", fact: "Speaks 3 languages: Meow, Hiss, and the look that means 'I'm judging you'." },
];

const CAT_FACTS = [
  "Cats sleep 12–16 hours a day. We call this 'being productive'.",
  "A cat's purr vibrates at 25–150 Hz. This is the exact frequency of maximum coziness.",
  "Cats have 32 muscles in each ear. That's 32 more than they use to listen to you.",
  "The oldest cat ever was Creme Puff who lived to 38 years. ABSOLUTE LEGEND.",
  "Cats can't taste sweetness. They do not need it. They are already sweet enough.",
  "A group of cats is called a clowder. Cat Town has approximately 1 clowder per street.",
];

const SOUNDS_XP = ["✅ Error.wav", "🔔 Notify.wav", "💻 Startup.wav", "❌ Critical.wav"];

const BANNED_WORDS = [
  // Dogs
  "dog", "dogs", "doggo", "doggy", "puppy", "puppies", "pupper", "pup", "pups",
  "canine", "woof", "bark", "labrador", "poodle", "bulldog", "beagle", "dachshund",
  "husky", "corgi", "golden retriever", "german shepherd", "rottweiler", "chihuahua",
  "pitbull", "dalmatian", "greyhound", "spaniel", "terrier", "doberman",
  // AI
  "ai", "artificial intelligence", "chatgpt", "openai", "midjourney", "dall-e",
  "stable diffusion", "machine learning", "neural", "robot", "gpt", "llm",
  "deepmind", "copilot", "gemini", "claude", "bard", "algorithm", "generated",
  // Banned general
  "fish tank", "hamster", "parrot", "bird", "reptile", "snake food", "lizard",
  "monday", "work", "meeting", "excel", "powerpoint", "boss", "deadline",
  "vegetables", "broccoli", "diet", "exercise", "gym",
];



const MEME_PAGES = [
  {
    id: "lolcat",
    title: "LOLcat Encyclopedia",
    emoji: "📚",
    url: "catpedia.cat/lolcat",
    tags: ["meme", "lol", "cheezburger", "lolcat", "funny", "classic"],
    content: [
      { label: "Origin", value: "2006 — Something Awful forums" },
      { label: "Peak popularity", value: "2007–2009" },
      { label: "Signature text", value: '"I CAN HAS CHEEZBURGER?"' },
      { label: "Language", value: "LOLspeak — broken English on purpose" },
      { label: "Legacy", value: "Launched entire internet meme culture" },
    ],
    body: "LOLcats are images of cats with humorous captions written in deliberately broken English known as LOLspeak. The format exploded in 2007 when 'I Can Has Cheezburger?' became the first viral cat meme. Still iconic. Still undefeated.",
  },
  {
    id: "keyboard",
    title: "Keyboard Cat — Full History",
    emoji: "🎹",
    url: "catpedia.cat/keyboard-cat",
    tags: ["keyboard", "charlie", "piano", "music", "meme", "classic"],
    content: [
      { label: "Real name", value: "Charlie (the cat)" },
      { label: "Filmed", value: "1984 by Charlie Schmidt" },
      { label: "Went viral", value: "2009" },
      { label: "Catchphrase", value: '"Play him off, Keyboard Cat"' },
      { label: "Status", value: "Hall of Fame — Eternal Legend" },
    ],
    body: "Charlie was filmed in 1984 wearing a blue shirt and appearing to play a keyboard. The video was uploaded to YouTube in 2007 but exploded in 2009 when it became the ultimate 'fail' outro. RIP Charlie. The music never stops.",
  },
  {
    id: "nyan",
    title: "Nyan Cat — Official Page",
    emoji: "🌈",
    url: "catpedia.cat/nyan-cat",
    tags: ["nyan", "rainbow", "poptart", "space", "meme", "music"],
    content: [
      { label: "Created by", value: "prguitarman (Chris Torres)" },
      { label: "Year", value: "2011" },
      { label: "Speed", value: "Infinite (it never stops)" },
      { label: "Flavor", value: "Pop-Tart (strawberry)" },
      { label: "NFT sale", value: "$590,000 in 2021" },
    ],
    body: "Nyan Cat is a grey cat with a Pop-Tart body flying through space leaving a rainbow trail. The looping 8-bit melody is burned into the brain of an entire generation. It sold as an NFT for $590,000. Correct.",
  },
  {
    id: "grumpy",
    title: "Grumpy Cat — The Legend",
    emoji: "😾",
    url: "catpedia.cat/grumpy-cat",
    tags: ["grumpy", "tardar sauce", "no", "famous", "celebrity", "meme"],
    content: [
      { label: "Real name", value: "Tardar Sauce" },
      { label: "Born", value: "April 4, 2012" },
      { label: "Condition", value: "Feline dwarfism (natural)" },
      { label: "Net worth", value: "~$1 million+" },
      { label: "Catchphrase", value: '"NO."' },
    ],
    body: "Tardar Sauce, known as Grumpy Cat, had a permanently grumpy expression due to an underbite and feline dwarfism. She passed in 2019 but lives forever in meme history. Her answer to everything was NO. We respect this.",
  },
  {
    id: "ceiling",
    title: "Ceiling Cat — Watcher of All",
    emoji: "👁️",
    url: "catpedia.cat/ceiling-cat",
    tags: ["ceiling", "watching", "hole", "meme", "2006", "classic"],
    content: [
      { label: "First appearance", value: "4chan, 2006" },
      { label: "Pose", value: "Peering through ceiling hole" },
      { label: "Role", value: "Omniscient observer of the internet" },
      { label: "Rival", value: "Basement Cat (evil counterpart)" },
      { label: "Legacy", value: "God-tier surrealist meme" },
    ],
    body: "Ceiling Cat is a photo of a cat peering through a hole in a ceiling tile, looking directly at you. It spawned an entire theology of internet cat religion, including Basement Cat as the devil. A true classic of early internet chaos.",
  },
  {
    id: "longcat",
    title: "Longcat — How Long Is Long?",
    emoji: "📏",
    url: "catpedia.cat/longcat",
    tags: ["long", "stretch", "longcat", "meme", "2006", "height"],
    content: [
      { label: "Real name", value: "Nobiko" },
      { label: "Origin", value: "Japan, 2006" },
      { label: "Length", value: "Astronomically long" },
      { label: "Rival", value: "Tacgnol (evil mirror)" },
      { label: "Verdict", value: "Longcat is loooooooong" },
    ],
    body: "Longcat (Nobiko) is a Japanese cat photographed being stretched vertically, creating the illusion of extreme length. The meme spawned epic Photoshop battles, a rival named Tacgnol, and the eternal truth: Longcat IS long.",
  },
];

const BREED_PAGES = [
  {
    id: "maine-coon",
    title: "Maine Coon",
    emoji: "🦁",
    url: "catbreeds.cat/maine-coon",
    tags: ["maine coon", "big", "fluffy", "large", "breed", "gentle giant"],
    content: [
      { label: "Origin", value: "Maine, USA" },
      { label: "Weight", value: "4–8 kg (up to 11 kg)" },
      { label: "Personality", value: "Dog-like loyalty, playful, gentle" },
      { label: "Coat", value: "Long, thick, water-resistant" },
      { label: "Coolness rating", value: "★★★★★" },
    ],
    body: "The Maine Coon is one of the largest domestic cat breeds. They have tufted ears, bushy tails, and are often called 'dogs of the cat world' because they follow their owners around. Absolute units. Maximum chill.",
  },
  {
    id: "persian",
    title: "Persian Cat",
    emoji: "👸",
    url: "catbreeds.cat/persian",
    tags: ["persian", "fluffy", "flat face", "fancy", "breed", "luxury"],
    content: [
      { label: "Origin", value: "Persia (modern Iran)" },
      { label: "Face type", value: "Brachycephalic (very flat)" },
      { label: "Personality", value: "Calm, dignified, lap cat" },
      { label: "Coat", value: "Long, silky, needs daily brushing" },
      { label: "Vibe", value: "Royalty. Pure royalty." },
    ],
    body: "Persian cats are the aristocrats of the cat world. They have luxurious long fur, flat smushed faces, and an air of absolute superiority. They will sit on your lap if they feel like it. You should feel honored.",
  },
  {
    id: "siamese",
    title: "Siamese Cat",
    emoji: "🗣️",
    url: "catbreeds.cat/siamese",
    tags: ["siamese", "vocal", "loud", "talkative", "breed", "sleek"],
    content: [
      { label: "Origin", value: "Thailand (formerly Siam)" },
      { label: "Voice", value: "Extremely loud — they WILL tell you" },
      { label: "Personality", value: "Social, demanding, very opinionated" },
      { label: "Eyes", value: "Piercing blue, always judging" },
      { label: "Known for", value: "Telling you exactly what's wrong" },
    ],
    body: "Siamese cats are the most vocal cats on Earth. They have opinions. They will share them. At 3am if necessary. They are sleek, blue-eyed, and 100% convinced they are in charge. They are correct.",
  },
  {
    id: "scottish-fold",
    title: "Scottish Fold",
    emoji: "🥺",
    url: "catbreeds.cat/scottish-fold",
    tags: ["scottish fold", "folded ears", "round", "cute", "breed", "owl"],
    content: [
      { label: "Origin", value: "Scotland, 1961" },
      { label: "Signature feature", value: "Folded ears (mutation)" },
      { label: "Personality", value: "Calm, adaptable, owl-like" },
      { label: "Pose", value: "Sits like a human constantly" },
      { label: "Internet fame", value: "Taylor Swift's cats are Scottish Folds" },
    ],
    body: "Scottish Folds have a natural mutation causing their ears to fold forward, giving them an owl-like appearance and permanent look of gentle concern. They sit in bizarre human-like positions. Taylor Swift has two. Verdict: extremely cute.",
  },
  {
    id: "sphynx",
    title: "Sphynx Cat",
    emoji: "🛸",
    url: "catbreeds.cat/sphynx",
    tags: ["sphynx", "hairless", "naked", "alien", "breed", "wrinkly"],
    content: [
      { label: "Origin", value: "Toronto, Canada, 1966" },
      { label: "Coat", value: "None. Zero. Hairless." },
      { label: "Skin", value: "Warm, wrinkly, feels like suede" },
      { label: "Personality", value: "Extremely social, loves warmth, extrovert" },
      { label: "Vibe", value: "Ancient Egyptian god or alien, unclear" },
    ],
    body: "The Sphynx is hairless due to a natural mutation. Despite looking like a sci-fi creature, they are incredibly affectionate and love body heat. They will sit on your face if cold. This is non-negotiable.",
  },
  {
    id: "bengal",
    title: "Bengal Cat",
    emoji: "🐆",
    url: "catbreeds.cat/bengal",
    tags: ["bengal", "spotted", "wild", "leopard", "breed", "athletic"],
    content: [
      { label: "Origin", value: "USA — hybrid of Asian leopard cat" },
      { label: "Pattern", value: "Spotted or marbled, like a leopard" },
      { label: "Personality", value: "Athletic, wild energy, very smart" },
      { label: "Coat", value: "Short, glittery sheen in sunlight" },
      { label: "Warning", value: "Will absolutely rob your house" },
    ],
    body: "Bengal cats look like miniature leopards and have the energy to match. They are descended from the Asian leopard cat and have a distinctive glittery spotted coat. They need enrichment or they WILL redecorate your home for you.",
  },
];

const MORE_MEME_PAGES = [
  {
    id: "doge-rival",
    title: "The Doge Situation — Classified",
    emoji: "🤫",
    url: "catpedia.cat/classified/doge",
    tags: ["doge", "shiba", "wow", "such", "rival", "enemy", "history"],
    content: [
      { label: "Status", value: "RIVAL (not a cat)" },
      { label: "Peak year", value: "2013" },
      { label: "Threat level", value: "Medium — mostly harmless" },
      { label: "Cat Town stance", value: "We acknowledge its existence" },
      { label: "Verdict", value: "Not a cat. Still funny. Complicated." },
    ],
    body: "Doge (the Shiba Inu) is one of the most successful non-cat memes in internet history. Cat Town's position: we respect the hustle. We do not endorse the species. The 'wow such meme' format is objectively solid. This page exists only for historical documentation. Do not tell the cats.",
  },
  {
    id: "business-cat",
    title: "Business Cat — Corporate Legend",
    emoji: "👔",
    url: "catpedia.cat/business-cat",
    tags: ["business cat", "office", "corporate", "tie", "meme", "work"],
    content: [
      { label: "Origin", value: "Reddit, 2012" },
      { label: "Format", value: "Cat in tie giving corporate advice" },
      { label: "Signature line", value: '"I need those TPS reports... with a ball of yarn"' },
      { label: "Industry", value: "Finance, HR, General Chaos" },
      { label: "Salary", value: "Paid in Fancy Feast" },
    ],
    body: "Business Cat is a meme of a serious-looking cat in a suit and tie dispensing absurd corporate advice. The format perfectly captures the pointlessness of office life. Business Cat doesn't care about your KPIs. Business Cat has a nap at 2pm.",
  },
  {
    id: "cat-loaf",
    title: "The Cat Loaf — Scientific Analysis",
    emoji: "🍞",
    url: "catpedia.cat/cat-loaf",
    tags: ["loaf", "bread", "sitting", "paws", "tucked", "pose", "classic"],
    content: [
      { label: "Official name", value: "Hovercat / Sphinx position" },
      { label: "Paw status", value: "Fully tucked (maximum loaf)" },
      { label: "Temperature", value: "Cat is warm and content" },
      { label: "Threat level", value: "Zero — this cat is off duty" },
      { label: "Resemblance", value: "Bread loaf: 98.7% match" },
    ],
    body: "When a cat tucks all four paws under its body and sits perfectly still, it achieves the form known as The Loaf. Scientists agree this is the peak of feline relaxation. If disturbed, the loaf will give you a look. You deserve it.",
  },
  {
    id: "surprised-pikachu",
    title: "Surprised Pikachu vs Surprised Cat",
    emoji: "😮",
    url: "catpedia.cat/surprised-faces",
    tags: ["surprised", "shock", "reaction", "face", "meme", "open mouth", "wide eyes"],
    content: [
      { label: "Surprised Cat origin", value: "Video: cat seeing vacuum, 2009" },
      { label: "Surprise level", value: "Maximum (eyes: fully dilated)" },
      { label: "Recovery time", value: "3–5 seconds, then dignity restored" },
      { label: "Cat Town ruling", value: "Surprised Cat wins. Obviously." },
      { label: "Pikachu comment", value: "No comment (it's not a cat)" },
    ],
    body: "The surprised cat face — wide eyes, open mouth, frozen body — is one of nature's most documented expressions. Usually triggered by: cucumber, vacuum cleaner, unexpected loud noise, or seeing another cat in the mirror. Universally relatable.",
  },
  {
    id: "monorail-cat",
    title: "Monorail Cat — Transport Legend",
    emoji: "🚝",
    url: "catpedia.cat/monorail-cat",
    tags: ["monorail", "draping", "hanging", "sleepy", "transportation", "meme"],
    content: [
      { label: "Route", value: "Anywhere there's a narrow surface" },
      { label: "Speed", value: "Extremely slow" },
      { label: "Stops", value: "Wherever it feels like stopping" },
      { label: "Ticket price", value: "One chin scratch" },
      { label: "On-time rating", value: "N/A — cat operates on its own schedule" },
    ],
    body: "Monorail Cat drapes itself over any narrow surface — fence, railing, human arm — and slowly slides forward. The Imgur post with the caption 'Monorail Cat begins its journey' became one of the most-shared cat images of 2010. All aboard.",
  },
];

const MORE_BREED_PAGES = [
  {
    id: "ragdoll",
    title: "Ragdoll Cat",
    emoji: "🪆",
    url: "catbreeds.cat/ragdoll",
    tags: ["ragdoll", "floppy", "gentle", "blue eyes", "large", "calm", "breed"],
    content: [
      { label: "Origin", value: "California, USA, 1960s" },
      { label: "Signature trait", value: "Goes completely limp when held" },
      { label: "Eyes", value: "Always blue, always soulful" },
      { label: "Personality", value: "Dog-like, follows you room to room" },
      { label: "Vibe", value: "The calmest creature on Earth" },
    ],
    body: "Ragdolls go limp like a ragdoll when picked up — this is not a joke, it is a real genetic trait. They have bright blue eyes, silky semi-long coats, and follow their owners everywhere like a very fluffy shadow. Extremely good.",
  },
  {
    id: "norwegian-forest",
    title: "Norwegian Forest Cat",
    emoji: "🌲",
    url: "catbreeds.cat/norwegian-forest",
    tags: ["norwegian", "forest", "viking", "fluffy", "large", "wild", "breed"],
    content: [
      { label: "Origin", value: "Norway (obviously)" },
      { label: "Viking name", value: "Skogkatt (Forest Cat)" },
      { label: "Coat", value: "Double layer, waterproof, massive" },
      { label: "Personality", value: "Independent, adventurous, outdoorsy" },
      { label: "Historical role", value: "Moused on Viking ships" },
    ],
    body: "The Norwegian Forest Cat has a thick double coat that repels water and snow, allowing it to survive Scandinavian winters. They were mousers on Viking longships. They are ancient. They are majestic. They have no time for your nonsense.",
  },
  {
    id: "abyssinian",
    title: "Abyssinian Cat",
    emoji: "⚡",
    url: "catbreeds.cat/abyssinian",
    tags: ["abyssinian", "active", "energetic", "ancient", "egypt", "sleek", "breed"],
    content: [
      { label: "Origin", value: "Ethiopia (ancient Abyssinia)" },
      { label: "Build", value: "Lean, athletic, always in motion" },
      { label: "Personality", value: "Curious, mischievous, never sits still" },
      { label: "Ancient history", value: "May be the cat of the Pharaohs" },
      { label: "Energy level", value: "Maximum at all times" },
    ],
    body: "Abyssinians are one of the oldest known cat breeds — their ancestors may have been worshipped in ancient Egypt. They are incredibly active and will investigate every single thing in your house. Every. Single. Thing. Never boring.",
  },
  {
    id: "russian-blue",
    title: "Russian Blue",
    emoji: "💙",
    url: "catbreeds.cat/russian-blue",
    tags: ["russian blue", "grey", "silver", "green eyes", "quiet", "elegant", "breed"],
    content: [
      { label: "Origin", value: "Archangel, Russia" },
      { label: "Coat", value: "Dense blue-grey double coat, shimmers" },
      { label: "Eyes", value: "Vivid emerald green" },
      { label: "Personality", value: "Reserved, loyal to one person, observant" },
      { label: "Secret skill", value: "Appears to smile (it's the face shape)" },
    ],
    body: "Russian Blues have a distinctive blue-grey coat with a silvery sheen and startling green eyes. They are reserved with strangers but deeply loyal to their chosen human. They also appear to be permanently smiling. This is not manipulative. Probably.",
  },
];

const SITE_PAGES = [
  {
    id: "site-home",
    title: "Cat Town Homepage",
    emoji: "🏠",
    url: "cattown.cat/home",
    tags: ["home", "homepage", "main", "start", "welcome", "cattown", "cat town", "site"],
    content: [
      { label: "Section", value: "Home" },
      { label: "Features", value: "Hero, cat facts, visitor counter, XP sounds, city view" },
      { label: "Cat fact updates", value: "Every 4 seconds" },
      { label: "Visitor counter", value: "Yes (very important)" },
      { label: "Recommended for", value: "Everyone. Always." },
    ],
    body: "The Cat Town homepage is where it all begins. You'll find the official welcome hero with the Computer Cat, a rotating cat facts box, the legendary visitor counter, the Windows XP sound panel, and an aerial view of Cat Town city. Navigate using the top bar.",
  },
  {
    id: "site-memes",
    title: "The Meme Vault",
    emoji: "🏛️",
    url: "cattown.cat/memes",
    tags: ["memes", "vault", "hall of fame", "rated", "meme section", "collection"],
    content: [
      { label: "Section", value: "Memes" },
      { label: "Total memes", value: "6 (Hall of Fame only)" },
      { label: "Rating system", value: "1–5 stars, by the Council of Elders" },
      { label: "Lowest rating", value: "4 stars (still legendary)" },
      { label: "Dogs allowed", value: "NO" },
    ],
    body: "The Meme Vault contains Cat Town's official Hall of Fame — the six most important cat memes in internet history. Each one is rated by the Cat Town Council of Elders. Ratings are final. Click 'MEMES' in the top navigation to visit.",
  },
  {
    id: "site-coolcats",
    title: "The Cool Cats Roster",
    emoji: "😎",
    url: "cattown.cat/cool-cats",
    tags: ["cool cats", "roster", "profiles", "mayor", "apply", "team", "staff"],
    content: [
      { label: "Section", value: "Cool Cats" },
      { label: "Current roster", value: "4 official cats" },
      { label: "Mayor", value: "Mr. Whiskers" },
      { label: "Applications", value: "Open (mostly rejected)" },
      { label: "Requirements", value: "Must be a cat. Must be cool." },
    ],
    body: "The Cool Cats section features the official Cat Town roster — the cats who run this place. You can view each cat's profile and title. You can also submit an application for your cat. We accept applications. We reject most of them. Click 'COOL CATS' in the nav.",
  },
  {
    id: "site-games",
    title: "Cat Town Games Room",
    emoji: "🕹️",
    url: "cattown.cat/games",
    tags: ["games", "play", "snake", "pong", "minesweeper", "arcade", "fun", "game room"],
    content: [
      { label: "Section", value: "Games" },
      { label: "Snake", value: "Arrow keys, eat fish, don't crash" },
      { label: "Pong", value: "2 player, W/S vs ↑/↓, first to 7" },
      { label: "Minesweeper", value: "16×16, 32 mines, right-click to flag" },
      { label: "High scores", value: "In your heart" },
    ],
    body: "Cat Town has a fully playable Games Room with three classic games: Cat Snake (eat fish, avoid walls), Cat Pong (2-player on one keyboard), and Meow-Sweeper (Minesweeper but with 💣). Click '🕹️ GAMES' in the navigation to play.",
  },
  {
    id: "site-browser",
    title: "CatScape Navigator — Help",
    emoji: "🌐",
    url: "catscope://help",
    tags: ["browser", "catscape", "navigator", "help", "how to", "search", "blocked", "banned"],
    content: [
      { label: "Browser name", value: "CatScape Navigator 3.0" },
      { label: "Supported content", value: "Cats only" },
      { label: "Blocked content", value: "Dogs, AI, vegetables, meetings, Mondays..." },
      { label: "Search tip", value: "Try: breed names, meme names, site sections" },
      { label: "Right-click", value: "Flags in Minesweeper (not here)" },
    ],
    body: "CatScape Navigator is Cat Town's built-in browser. Search for cat memes, cat breeds, or Cat Town site features. Certain keywords are permanently blocked (dogs, AI, Mondays, broccoli, etc.) and will return a firm NO. Try searching: 'maine coon', 'nyan cat', 'games', 'music'.",
  },
  {
    id: "site-music",
    title: "Cat Town Radio — Music Player",
    emoji: "🎵",
    url: "cattown.cat/radio",
    tags: ["music", "radio", "chiptune", "undertale", "sound", "player", "play", "song"],
    content: [
      { label: "Player location", value: "Bottom-left corner, always visible" },
      { label: "Genre", value: "Undertale-style chiptune" },
      { label: "Instruments", value: "Square wave melody + triangle bass" },
      { label: "Loop", value: "Infinite (it never stops)" },
      { label: "Volume control", value: "Press ▶ PLAY MUSIC to start" },
    ],
    body: "Cat Town Radio plays a custom Undertale-style chiptune composed specifically for this site. The player is always visible in the bottom-left corner as a Windows XP-style window. Click '▶ PLAY MUSIC' to start. The animated waveform bars are real-time. The music is synthesized in your browser — no files needed.",
  },
  {
    id: "site-about",
    title: "About Cat Town",
    emoji: "📜",
    url: "cattown.cat/about",
    tags: ["about", "history", "story", "founded", "1999", "rules", "stats", "webring"],
    content: [
      { label: "Section", value: "About" },
      { label: "Founded", value: "1999 (by a cat)" },
      { label: "Original builder", value: "Microsoft FrontPage" },
      { label: "Rules listed", value: "7 official rules" },
      { label: "Dogs mentioned", value: "Only to say NO" },
    ],
    body: "The About section covers Cat Town's full history since 1999, site stats (4,729 cats documented, zero AI used), and the 7 Official Cat Town Rules. Also includes the webring badge and a full stats table. Click 'ABOUT' in the navigation.",
  },
  {
    id: "site-more",
    title: "More — Timeline, Hall of Fame & Guestbook",
    emoji: "📋",
    url: "cattown.cat/more",
    tags: ["more", "timeline", "hall of fame", "guestbook", "sign", "history", "extra"],
    content: [
      { label: "Section", value: "More" },
      { label: "Timeline", value: "1999–2024, key cat internet moments" },
      { label: "Hall of Fame", value: "Top 5 memes ranked" },
      { label: "Guestbook", value: "3 historic entries + sign your own" },
      { label: "Dog Alert box", value: "Highly visible. Bright red." },
    ],
    body: "The More section contains the official Cat Town timeline (1999–2024), the Top 5 Meme Hall of Fame, a Dog Alert warning box, and the Cat Town Guestbook where you can leave a message for history. Click 'MORE' in the navigation.",
  },
];

const ALL_BROWSER_PAGES = [...MEME_PAGES, ...MORE_MEME_PAGES, ...BREED_PAGES, ...MORE_BREED_PAGES, ...SITE_PAGES];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [currentFact, setCurrentFact] = useState(0);
  const [hitCount] = useState(() => Math.floor(Math.random() * 900000) + 100000);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [soundPlaying, setSoundPlaying] = useState<string | null>(null);
  const { playing: musicPlaying, toggleMusic } = useCatTownMusic();
  const [waveFrame, setWaveFrame] = useState(0);

  // Games state
  const [activeGame, setActiveGame] = useState<"snake" | "pong" | "minesweeper">("snake");

  // Browser state
  const [browserQuery, setBrowserQuery] = useState("");
  const [browserInput, setBrowserInput] = useState("");
  const [browserPage, setBrowserPage] = useState<string | null>(null);
  const [browserBanned, setBrowserBanned] = useState(false);
  const [browserBanReason, setBrowserBanReason] = useState("");
  const [browserTab, setBrowserTab] = useState<"memes" | "breeds" | "site">("memes");
  const [browserHistory, setBrowserHistory] = useState<string[]>([]);

  useEffect(() => {
    if (!musicPlaying) return;
    const id = setInterval(() => setWaveFrame(f => f + 1), 120);
    return () => clearInterval(id);
  }, [musicPlaying]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupMsg("🐱 WELCOME TO CAT TOWN! You are visitor #" + hitCount.toLocaleString() + "! Congrats!!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(f => (f + 1) % CAT_FACTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  function handleSound(s: string) {
    setSoundPlaying(s);
    setTimeout(() => setSoundPlaying(null), 1000);
  }

  function handleNav(section: string) {
    setActiveSection(section);
    window.scrollTo({ top: 0 });
  }

  const DOG_WORDS = ["dog","dogs","doggo","doggy","puppy","puppies","pupper","pup","pups","canine","woof","bark","labrador","poodle","bulldog","beagle","dachshund","husky","corgi","golden retriever","german shepherd","rottweiler","chihuahua","pitbull","dalmatian","greyhound","spaniel","terrier","doberman"];
  const AI_WORDS = ["ai","artificial intelligence","chatgpt","openai","midjourney","dall-e","stable diffusion","machine learning","neural","robot","gpt","llm","deepmind","copilot","gemini","claude","bard","algorithm","generated"];
  const WORK_WORDS = ["monday","work","meeting","excel","powerpoint","boss","deadline"];
  const FOOD_WORDS = ["vegetables","broccoli","diet","exercise","gym","fish tank","hamster","parrot","bird","reptile","snake food","lizard"];

  function getBanReason(q: string): string {
    const lower = q.toLowerCase();
    if (DOG_WORDS.some(w => lower.includes(w))) return "dog";
    if (AI_WORDS.some(w => lower.includes(w))) return "ai";
    if (WORK_WORDS.some(w => lower.includes(w))) return "work";
    if (FOOD_WORDS.some(w => lower.includes(w))) return "other";
    return "other";
  }

  function isBanned(q: string) {
    const lower = q.toLowerCase();
    return BANNED_WORDS.some(w => lower.includes(w));
  }

  function handleBrowserSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = browserInput.trim();
    if (!q) return;
    if (isBanned(q)) {
      setBrowserBanned(true);
      setBrowserBanReason(getBanReason(q));
      setBrowserPage(null);
      setBrowserQuery(q);
      return;
    }
    setBrowserBanned(false);
    setBrowserPage(null);
    setBrowserQuery(q);
  }

  function openBrowserPage(id: string) {
    setBrowserPage(id);
    setBrowserBanned(false);
    setBrowserHistory(h => [...h, id]);
  }

  function browserBack() {
    const newHistory = [...browserHistory];
    newHistory.pop();
    setBrowserHistory(newHistory);
    setBrowserPage(newHistory[newHistory.length - 1] ?? null);
  }

  const browserResults = browserQuery
    ? ALL_BROWSER_PAGES.filter(p =>
        p.tags.some(t => t.includes(browserQuery.toLowerCase())) ||
        p.title.toLowerCase().includes(browserQuery.toLowerCase())
      )
    : null;

  const currentBrowserPage = browserPage
    ? ALL_BROWSER_PAGES.find(p => p.id === browserPage)
    : null;

  return (
    <div className="min-h-screen" style={{ background: "var(--ct-yellow)" }}>

      {/* Music Player — XP style, fixed bottom-left */}
      <div className="fixed bottom-6 left-6 z-50 xp-window" style={{ minWidth: 220 }}>
        <div className="xp-titlebar">
          <span>🎵 CAT TOWN RADIO</span>
          <span style={{ fontSize: "8px", color: musicPlaying ? "var(--ct-lime)" : "#888" }}>
            {musicPlaying ? "● LIVE" : "○ OFF"}
          </span>
        </div>
        <div className="p-3 flex flex-col gap-2" style={{ background: "white" }}>
          <div className="font-pixel text-center" style={{ fontSize: "8px", color: "#555" }}>
            {musicPlaying ? "♪ Cat Town Theme ♪" : "~ press play ~"}
          </div>
          {/* Fake waveform bars */}
          <div className="flex items-end justify-center gap-0.5" style={{ height: 24 }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  background: musicPlaying ? "var(--ct-blue)" : "#ccc",
                  height: musicPlaying
                    ? `${Math.abs(Math.sin((waveFrame / 3 + i) * 0.9)) * 20 + 4}px`
                    : 4,
                  transition: "height 0.15s ease, background 0.3s",
                  border: "1px solid var(--ct-black)",
                }}
              />
            ))}
          </div>
          <button
            onClick={toggleMusic}
            className="xp-btn w-full text-center"
            style={{
              background: musicPlaying ? "var(--ct-red)" : "var(--ct-black)",
              color: "var(--ct-yellow)",
              fontSize: "10px",
              padding: "6px",
            }}
          >
            {musicPlaying ? "⏹ STOP" : "▶ PLAY MUSIC"}
          </button>
          <div className="font-pixel text-center" style={{ fontSize: "7px", color: "#aaa" }}>
            Undertale-style chiptune
          </div>
        </div>
      </div>

      {/* Popup notification */}
      {showPopup && (
        <div className="popup-notif fixed bottom-6 right-6 z-50 xp-window max-w-xs">
          <div className="xp-titlebar">
            <span>📢 CAT TOWN ALERT</span>
            <button onClick={() => setShowPopup(false)} className="xp-btn xp-btn-red" style={{ padding: "2px 8px", fontSize: "10px" }}>X</button>
          </div>
          <div className="p-4 font-comic font-bold text-sm" style={{ color: "var(--ct-black)" }}>
            {popupMsg}
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav style={{ background: "var(--ct-black)", borderBottom: "4px solid var(--ct-yellow)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="bounce-cat text-3xl">🐱</span>
            <span className="font-pixel text-white" style={{ fontSize: "14px", letterSpacing: "1px" }}>
              CAT<span style={{ color: "var(--ct-yellow)" }}>TOWN</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {["home", "memes", "about", "cool-cats", "browser", "games", "more"].map(sec => (
              <button
                key={sec}
                onClick={() => handleNav(sec)}
                className={`nav-link ${activeSection === sec ? "active" : ""}`}
              >
                {sec === "cool-cats" ? "COOL CATS" : sec === "browser" ? "🌐 BROWSER" : sec === "games" ? "🕹️ GAMES" : sec.toUpperCase()}
              </button>
            ))}
            <a
              href="https://youtube.com/@CatTown"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              style={{ background: "#FF0000", color: "white", border: "2px solid #FF0000" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#cc0000"; (e.currentTarget as HTMLElement).style.color = "white"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#FF0000"; (e.currentTarget as HTMLElement).style.color = "white"; }}
            >
              ▶ YOUTUBE
            </a>
            <a
              href="https://discord.gg/cattown"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              style={{ background: "#5865F2", color: "white", border: "2px solid #5865F2" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#4752c4"; (e.currentTarget as HTMLElement).style.color = "white"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#5865F2"; (e.currentTarget as HTMLElement).style.color = "white"; }}
            >
              # DISCORD
            </a>
          </div>
        </div>
      </nav>

      {/* TICKER */}
      <div className="ticker">
        <span className="ticker-inner">
          🐾 WELCOME TO CAT TOWN — THE GREATEST CAT SITE ON THE ENTIRE INTERNET 🐾 &nbsp;&nbsp;&nbsp;
          ★ NO AI CATS HERE — ONLY 100% REAL INTERNET CATS ★ &nbsp;&nbsp;&nbsp;
          🎹 KEYBOARD CAT WILL PLAY YOU OFF &nbsp;&nbsp;&nbsp;
          🌈 NYAN CAT IS STILL GOING &nbsp;&nbsp;&nbsp;
          📢 CEILING CAT IS WATCHING &nbsp;&nbsp;&nbsp;
          ⭐ VISITOR #{hitCount.toLocaleString()} — THAT'S YOU! ⭐ &nbsp;&nbsp;&nbsp;
          🐾 WELCOME TO CAT TOWN — THE GREATEST CAT SITE ON THE ENTIRE INTERNET 🐾
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* ===== HOME ===== */}
        {activeSection === "home" && (
          <div className="space-y-10">
            {/* Hero */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 star-border" style={{ background: "white" }}>
              <div className="p-8 flex flex-col justify-center" style={{ borderRight: "4px solid var(--ct-black)" }}>
                <div className="font-pixel text-xs mb-2 blink" style={{ color: "var(--ct-red)", fontSize: "9px" }}>
                  ★ ESTABLISHED 1999 ★
                </div>
                <h1 className="text-6xl md:text-7xl mb-4 leading-none" style={{ fontFamily: "Fredoka One", color: "var(--ct-black)" }}>
                  Welcome to<br />
                  <span style={{ color: "var(--ct-blue)" }}>CAT</span>
                  <span style={{ color: "var(--ct-red)" }}>TOWN</span>
                </h1>
                <p className="font-comic font-bold text-lg mb-6" style={{ color: "#333" }}>
                  The internet's #1 destination for cool cats, dank memes, and pure feline excellence.
                  No dogs. No AI. Just cats.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleNav("memes")} className="xp-btn" style={{ background: "var(--ct-red)", color: "white" }}>
                    SEE THE MEMES
                  </button>
                  <button onClick={() => handleNav("cool-cats")} className="xp-btn">
                    MEET THE CATS
                  </button>
                </div>
              </div>
              <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
                <img src={CAT_HERO} alt="Cool Cat at Computer" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 font-pixel text-center py-2"
                     style={{ background: "var(--ct-black)", color: "var(--ct-yellow)", fontSize: "9px" }}>
                  🐱 OFFICIAL CAT TOWN COMPUTER CAT 🐱
                </div>
              </div>
            </div>

            {/* Hit counter + cat fact row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="xp-window">
                <div className="xp-titlebar">
                  <span>📊 VISITOR COUNTER</span>
                  <span>_  □  X</span>
                </div>
                <div className="p-6 text-center">
                  <div className="font-pixel text-xs mb-4" style={{ color: "#666", fontSize: "9px" }}>YOU ARE VISITOR NUMBER:</div>
                  <div className="hit-counter">{hitCount.toLocaleString()}</div>
                  <div className="font-pixel text-xs mt-4" style={{ color: "#999", fontSize: "8px" }}>
                    Best viewed in Internet Explorer 6.0 at 800×600
                  </div>
                </div>
              </div>

              <div className="fact-box p-6">
                <div className="font-pixel text-xs mb-3" style={{ color: "var(--ct-yellow)", fontSize: "9px" }}>🐾 CAT FACT #{currentFact + 1}</div>
                <p className="font-comic font-bold text-lg text-white leading-snug">
                  {CAT_FACTS[currentFact]}
                </p>
                <div className="flex gap-1 mt-4">
                  {CAT_FACTS.map((_, i) => (
                    <button key={i} onClick={() => setCurrentFact(i)}
                      style={{ width: 12, height: 12, background: i === currentFact ? "var(--ct-yellow)" : "white", border: "2px solid var(--ct-black)" }} />
                  ))}
                </div>
              </div>
            </div>

            {/* XP Sound Panel */}
            <div className="xp-window">
              <div className="xp-titlebar">
                <span>🔊 WINDOWS CAT SOUNDS</span>
                <span>_  □  X</span>
              </div>
              <div className="p-6">
                <p className="font-comic font-bold mb-4">Click to play the classic Windows sounds (in your imagination — feel free to hum along):</p>
                <div className="flex flex-wrap gap-3">
                  {SOUNDS_XP.map(s => (
                    <button key={s} onClick={() => handleSound(s)} className="xp-btn"
                      style={{ background: soundPlaying === s ? "var(--ct-lime)" : undefined }}>
                      {soundPlaying === s ? "♪ PLAYING..." : s}
                    </button>
                  ))}
                </div>
                {soundPlaying && (
                  <div className="mt-4 font-pixel text-xs blink" style={{ color: "var(--ct-blue)", fontSize: "9px" }}>
                    ♪ {soundPlaying} IS PLAYING IN YOUR HEAD RIGHT NOW ♪
                  </div>
                )}
              </div>
            </div>

            {/* Cat Town City */}
            <div className="star-border overflow-hidden" style={{ borderWidth: "4px" }}>
              <img src={CAT_TOWN_IMG} alt="Cat Town City" className="w-full" style={{ maxHeight: "350px", objectFit: "cover" }} />
              <div className="font-pixel text-center py-3" style={{ background: "var(--ct-black)", color: "var(--ct-yellow)", fontSize: "10px" }}>
                🏙️ ACTUAL AERIAL VIEW OF CAT TOWN — POPULATION: MANY CATS 🏙️
              </div>
            </div>
          </div>
        )}

        {/* ===== MEMES ===== */}
        {activeSection === "memes" && (
          <div className="space-y-8">
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="text-5xl" style={{ fontFamily: "Fredoka One" }}>THE MEME VAULT</h2>
              <div className="font-pixel blink" style={{ color: "var(--ct-red)", fontSize: "9px" }}>
                ★ HALL OF FAME ★
              </div>
            </div>

            <div className="xp-window mb-6">
              <div className="xp-titlebar">
                <span>ℹ️ MEME DISCLAIMER</span>
                <span>_  □  X</span>
              </div>
              <div className="p-4 font-comic font-bold">
                All memes rated by the Cat Town Council of Elders. Ratings are final. Appeals will be ignored.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MEMES.map(meme => (
                <div key={meme.id} className="meme-card">
                  <div className="p-4 text-4xl text-center" style={{ background: meme.bg, borderBottom: "4px solid black", minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 56 }}>{meme.emoji}</span>
                  </div>
                  <div className="p-4">
                    <div className="font-pixel text-xs mb-1" style={{ color: "#999", fontSize: "8px" }}>SINCE {meme.year}</div>
                    <h3 className="text-xl mb-2" style={{ fontFamily: "Fredoka One" }}>{meme.title}</h3>
                    <p className="font-comic text-sm mb-3" style={{ color: "#444" }}>{meme.caption}</p>
                    <div className="star-rating">
                      {"★".repeat(meme.rating)}{"☆".repeat(5 - meme.rating)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="star-border overflow-hidden mt-8" style={{ borderWidth: "4px" }}>
              <img src={CAT_MEMES} alt="Cat Meme Collage" className="w-full" style={{ maxHeight: "400px", objectFit: "cover" }} />
              <div className="font-pixel text-center py-2" style={{ background: "var(--ct-black)", color: "var(--ct-yellow)", fontSize: "9px" }}>
                CERTIFIED VINTAGE MEME ARCHIVE — EST. 2003
              </div>
            </div>
          </div>
        )}

        {/* ===== ABOUT ===== */}
        {activeSection === "about" && (
          <div className="space-y-8">
            <h2 className="text-5xl" style={{ fontFamily: "Fredoka One" }}>ABOUT CAT TOWN</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="xp-window md:col-span-2">
                <div className="xp-titlebar">
                  <span>📜 OUR STORY</span>
                  <span>_  □  X</span>
                </div>
                <div className="p-6 space-y-4 font-comic font-bold">
                  <p>Cat Town was founded in 1999 by a cat. No one knows which cat. The original site was made in Microsoft FrontPage, had a background with repeating paw prints, and loaded in 45 seconds on a 56k modem. It was perfect.</p>
                  <p>We survived the browser wars. We survived Flash dying. We survived when everyone switched to smartphones. We are still here. Like a cat on a warm keyboard, we refuse to move.</p>
                  <p>Our mission: To document every significant cat on the internet. To rate memes fairly and without bias. To celebrate the culture of cool cats everywhere. No dogs. No exceptions.</p>
                  <p style={{ color: "var(--ct-red)" }}>⚠️ This site contains NO AI-generated content about cats. All cat opinions are genuine cat opinions.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="xp-window">
                  <div className="xp-titlebar"><span>📊 STATS</span><span>_  □  X</span></div>
                  <div className="p-4">
                    <table className="retro-table">
                      <tbody>
                        <tr><td>Cats documented</td><td><strong>4,729</strong></td></tr>
                        <tr><td>Memes rated</td><td><strong>892</strong></td></tr>
                        <tr><td>Dog rejections</td><td><strong>∞</strong></td></tr>
                        <tr><td>Years online</td><td><strong>25+</strong></td></tr>
                        <tr><td>AI used</td><td><strong>ZERO</strong></td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ background: "var(--ct-black)", border: "4px solid var(--ct-yellow)", padding: 16 }}>
                  <div className="font-pixel text-center" style={{ color: "var(--ct-yellow)", fontSize: "9px", marginBottom: 8 }}>
                    WEBRING MEMBER
                  </div>
                  <div className="font-comic font-bold text-center text-white text-sm">
                    ← Cool Cat Sites →
                  </div>
                  <div className="font-pixel text-center mt-2" style={{ fontSize: "8px", color: "#888" }}>
                    #1347 in the web ring
                  </div>
                </div>
              </div>
            </div>

            <div className="xp-window">
              <div className="xp-titlebar">
                <span>📜 THE CAT TOWN RULES</span>
                <span>_  □  X</span>
              </div>
              <div className="p-6">
                <ol className="space-y-3 font-comic font-bold list-decimal list-inside">
                  <li>No dogs. Not even small ones. Not even "cat-like" dogs. No.</li>
                  <li>All memes must be rated honestly. The integrity of the ratings is sacred.</li>
                  <li>Keyboard Cat is to be respected at all times.</li>
                  <li>If a cat is sitting on your keyboard, the cat has priority.</li>
                  <li>Nyan Cat's song is acceptable to hum in public spaces.</li>
                  <li>You may not claim a cat is "just okay." It is either legendary or it needs more time.</li>
                  <li>No AI cats. Every cat on this site is a real internet cat.</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* ===== COOL CATS ===== */}
        {activeSection === "cool-cats" && (
          <div className="space-y-8">
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="text-5xl" style={{ fontFamily: "Fredoka One" }}>THE COOL CATS</h2>
              <div className="font-pixel blink" style={{ color: "var(--ct-red)", fontSize: "9px" }}>
                ★ OFFICIAL ROSTER ★
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COOL_CATS.map((cat, i) => (
                <div key={i} className="meme-card">
                  <div className="xp-titlebar">
                    <span>🐱 COOL CAT PROFILE</span>
                    <span>_  □  X</span>
                  </div>
                  <div className="p-6 flex gap-4">
                    <div className="text-5xl flex-shrink-0">{cat.emoji}</div>
                    <div>
                      <h3 className="text-2xl mb-1" style={{ fontFamily: "Fredoka One" }}>{cat.name}</h3>
                      <div className="font-pixel text-xs mb-3" style={{ color: "var(--ct-blue)", fontSize: "9px" }}>
                        {cat.title}
                      </div>
                      <p className="font-comic text-sm" style={{ color: "#444" }}>{cat.fact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="xp-window">
              <div className="xp-titlebar">
                <span>📋 APPLY TO JOIN THE ROSTER</span>
                <span>_  □  X</span>
              </div>
              <div className="p-6">
                <p className="font-comic font-bold mb-4">
                  Think your cat deserves to be on the official Cool Cats roster?
                  We accept applications. We reject most of them. But we accept them.
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="font-pixel text-xs block mb-1" style={{ fontSize: "9px" }}>CAT NAME:</label>
                    <input type="text" placeholder="e.g. Lord Fluffington III"
                      className="w-full font-comic font-bold p-2"
                      style={{ border: "3px solid black", outline: "none", background: "white" }} />
                  </div>
                  <div>
                    <label className="font-pixel text-xs block mb-1" style={{ fontSize: "9px" }}>REASON THIS CAT IS COOL:</label>
                    <textarea placeholder="Be specific. 'Because it's cute' is not a reason." rows={3}
                      className="w-full font-comic font-bold p-2"
                      style={{ border: "3px solid black", outline: "none", background: "white", resize: "none" }} />
                  </div>
                </div>
                <button className="xp-btn">SUBMIT APPLICATION</button>
              </div>
            </div>
          </div>
        )}

        {/* ===== MORE ===== */}
        {activeSection === "more" && (
          <div className="space-y-8">
            <h2 className="text-5xl" style={{ fontFamily: "Fredoka One" }}>MORE CAT STUFF</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="xp-window">
                <div className="xp-titlebar">
                  <span>📅 CAT TOWN TIMELINE</span>
                  <span>_  □  X</span>
                </div>
                <div className="p-6">
                  <table className="retro-table">
                    <thead>
                      <tr><th>YEAR</th><th>EVENT</th></tr>
                    </thead>
                    <tbody>
                      <tr><td className="font-pixel" style={{ fontSize: "9px" }}>1999</td><td>Cat Town founded. The internet was ready.</td></tr>
                      <tr><td className="font-pixel" style={{ fontSize: "9px" }}>2006</td><td>Ceiling Cat and Longcat join the pantheon.</td></tr>
                      <tr><td className="font-pixel" style={{ fontSize: "9px" }}>2007</td><td>I Can Has Cheezburger changes everything.</td></tr>
                      <tr><td className="font-pixel" style={{ fontSize: "9px" }}>2009</td><td>Keyboard Cat plays everyone off. Peak internet.</td></tr>
                      <tr><td className="font-pixel" style={{ fontSize: "9px" }}>2011</td><td>Nyan Cat ascends to legend status.</td></tr>
                      <tr><td className="font-pixel" style={{ fontSize: "9px" }}>2012</td><td>Grumpy Cat debuts. We are not worthy.</td></tr>
                      <tr><td className="font-pixel" style={{ fontSize: "9px" }}>2024</td><td>Cat Town relaunches. Bigger. Bolder. No AI.</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4">
                <div className="xp-window">
                  <div className="xp-titlebar">
                    <span>🏆 MEME HALL OF FAME</span>
                    <span>_  □  X</span>
                  </div>
                  <div className="p-4 space-y-2">
                    {["Keyboard Cat", "Nyan Cat", "Grumpy Cat", "I Can Has Cheezburger", "Ceiling Cat"].map((m, i) => (
                      <div key={m} className="flex items-center gap-3 font-comic font-bold p-2"
                           style={{ borderBottom: i < 4 ? "2px solid #eee" : "none" }}>
                        <span className="font-pixel text-xs" style={{ color: "var(--ct-orange)", fontSize: "9px", minWidth: 24 }}>#{i + 1}</span>
                        <span>🐱 {m}</span>
                        <span className="ml-auto" style={{ color: "var(--ct-orange)" }}>{"★".repeat(5)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "var(--ct-red)", border: "4px solid black", boxShadow: "5px 5px 0 black" }} className="p-5">
                  <div className="font-pixel text-white mb-2 blink" style={{ fontSize: "10px" }}>⚠️ DOG ALERT ⚠️</div>
                  <p className="font-comic font-bold text-white">
                    If you have arrived here looking for dogs: wrong website.
                    Please close this tab and reflect on your choices.
                  </p>
                </div>
              </div>

              <div className="xp-window md:col-span-2">
                <div className="xp-titlebar">
                  <span>📻 CAT TOWN GUESTBOOK</span>
                  <span>_  □  X</span>
                </div>
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {[
                      { user: "CoolCatFan2004", msg: "BEST SITE ON THE INTERNET!!!! bookmarked!!!", date: "Jan 12, 2004" },
                      { user: "meow_master_99", msg: "My cat Whiskers says hi. He typed this himself.", date: "Mar 3, 2008" },
                      { user: "xX_KittehQueen_Xx", msg: "nyan nyan nyan nyan nyan nyan nyan nyan nyan", date: "Apr 5, 2011" },
                    ].map((entry, i) => (
                      <div key={i} style={{ border: "2px solid var(--ct-black)", background: i % 2 === 0 ? "#fffbe6" : "white", padding: "12px" }}>
                        <div className="flex justify-between mb-1">
                          <span className="font-pixel" style={{ fontSize: "9px", color: "var(--ct-blue)" }}>{entry.user}</span>
                          <span className="font-pixel" style={{ fontSize: "8px", color: "#999" }}>{entry.date}</span>
                        </div>
                        <p className="font-comic font-bold">{entry.msg}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <input type="text" placeholder="Your cool username"
                      className="w-full font-comic font-bold p-2"
                      style={{ border: "3px solid black", outline: "none", background: "white" }} />
                    <textarea placeholder="Sign the guestbook!" rows={2}
                      className="w-full font-comic font-bold p-2"
                      style={{ border: "3px solid black", outline: "none", background: "white", resize: "none" }} />
                    <button className="xp-btn">SIGN GUESTBOOK</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ===== GAMES ===== */}
        {activeSection === "games" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="text-5xl" style={{ fontFamily: "Fredoka One" }}>🕹️ GAMES ROOM</h2>
              <div className="font-pixel blink" style={{ color: "var(--ct-red)", fontSize: "9px" }}>★ BOSS IS AWAY ★</div>
            </div>

            {/* Game selector tabs */}
            <div className="flex gap-0" style={{ borderBottom: "4px solid var(--ct-black)" }}>
              {([
                { id: "snake", label: "🐍 CAT SNAKE" },
                { id: "pong", label: "🏓 CAT PONG" },
                { id: "minesweeper", label: "💣 MEOW-SWEEPER" },
              ] as const).map(g => (
                <button key={g.id} onClick={() => setActiveGame(g.id)}
                  className="font-pixel px-5 py-3"
                  style={{
                    fontSize: "9px",
                    background: activeGame === g.id ? "var(--ct-yellow)" : "var(--ct-black)",
                    color: activeGame === g.id ? "var(--ct-black)" : "var(--ct-yellow)",
                    border: "3px solid var(--ct-black)",
                    borderBottom: activeGame === g.id ? "3px solid var(--ct-yellow)" : "3px solid var(--ct-black)",
                    marginBottom: activeGame === g.id ? -4 : 0,
                    cursor: "pointer",
                  }}>
                  {g.label}
                </button>
              ))}
            </div>

            {/* Game window */}
            <div className="xp-window">
              <div className="xp-titlebar">
                <span>
                  {activeGame === "snake" && "🐍 Cat Snake — Eat the fish, don't eat yourself"}
                  {activeGame === "pong" && "🏓 Cat Pong — 2 players, 1 keyboard"}
                  {activeGame === "minesweeper" && "💣 Meow-sweeper — Find the bombs (don't)"}
                </span>
                <span>_  □  X</span>
              </div>
              <div className="p-4 flex justify-center" style={{ background: "#1a1a1a" }}>
                {activeGame === "snake" && <SnakeGame />}
                {activeGame === "pong" && <PongGame />}
                {activeGame === "minesweeper" && <MinesweeperGame />}
              </div>
            </div>

            {/* Controls cheatsheet */}
            <div className="xp-window">
              <div className="xp-titlebar"><span>⌨️ CONTROLS</span><span>_  □  X</span></div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { game: "🐍 Cat Snake", controls: ["Arrow keys — move", "R — restart", "Tap buttons on mobile"] },
                  { game: "🏓 Cat Pong", controls: ["P1: W / S keys", "P2: ↑ / ↓ arrows", "Space — start  |  R — restart"] },
                  { game: "💣 Meow-Sweeper", controls: ["Left click — reveal", "Right click — flag 🚩", "Find all cats without hitting 💣"] },
                ].map(item => (
                  <div key={item.game} style={{ border: "3px solid var(--ct-black)", padding: 12, background: "#fffbe6" }}>
                    <div className="font-pixel mb-2" style={{ fontSize: "9px", color: "var(--ct-blue)" }}>{item.game}</div>
                    {item.controls.map(c => (
                      <div key={c} className="font-comic font-bold text-sm" style={{ color: "#444" }}>• {c}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== BROWSER ===== */}
        {activeSection === "browser" && (
          <div className="space-y-0">
            {/* Browser chrome */}
            <div className="xp-window">
              <div className="xp-titlebar">
                <span>🌐 CatScape Navigator 3.0 — The Only Browser You Need</span>
                <span>_  □  X</span>
              </div>

              {/* Toolbar */}
              <div style={{ background: "#d4d0c8", borderBottom: "3px solid var(--ct-black)", padding: "6px 8px" }} className="flex items-center gap-2 flex-wrap">
                {/* Back button */}
                <button
                  onClick={browserBack}
                  disabled={browserHistory.length === 0}
                  className="xp-btn"
                  style={{ padding: "4px 10px", fontSize: "10px", background: browserHistory.length === 0 ? "#eee" : undefined, color: browserHistory.length === 0 ? "#aaa" : undefined, cursor: browserHistory.length === 0 ? "not-allowed" : undefined }}
                >
                  ◀ BACK
                </button>
                <button
                  onClick={() => { setBrowserPage(null); setBrowserQuery(""); setBrowserInput(""); setBrowserBanned(false); setBrowserHistory([]); }}
                  className="xp-btn"
                  style={{ padding: "4px 10px", fontSize: "10px" }}
                >
                  🏠 HOME
                </button>

                {/* Address bar */}
                <form onSubmit={handleBrowserSearch} className="flex-1 flex gap-2" style={{ minWidth: 200 }}>
                  <div className="flex-1 flex items-center" style={{ background: "white", border: "3px solid var(--ct-black)", padding: "2px 8px" }}>
                    <span className="font-pixel mr-2" style={{ fontSize: "8px", color: "#888" }}>
                      {currentBrowserPage ? currentBrowserPage.url : "catscope://home"}
                    </span>
                    <input
                      type="text"
                      value={browserInput}
                      onChange={e => setBrowserInput(e.target.value)}
                      placeholder="Search cats, memes, breeds..."
                      className="flex-1 font-comic font-bold"
                      style={{ outline: "none", border: "none", fontSize: "13px", background: "transparent" }}
                    />
                  </div>
                  <button type="submit" className="xp-btn" style={{ padding: "4px 14px", fontSize: "10px", background: "var(--ct-blue)", color: "white" }}>GO!</button>
                </form>
              </div>

              {/* Browser content */}
              <div style={{ background: "white", minHeight: 500, padding: 0 }}>

                {/* BANNED */}
                {browserBanned && (
                  <div className="flex flex-col items-center justify-center p-12 text-center" style={{ background: "white", minHeight: 400 }}>
                    <div style={{ fontSize: 100, lineHeight: 1 }}>
                      {browserBanReason === "dog" ? "🐾" : browserBanReason === "ai" ? "🤖" : browserBanReason === "work" ? "📊" : "🚫"}
                    </div>
                    <div className="font-pixel mt-5 mb-3" style={{ fontSize: "32px", color: "var(--ct-red)" }}>NO</div>
                    <div className="font-pixel mb-3" style={{ fontSize: "10px", color: "#888" }}>
                      {browserBanReason === "dog" && "Error 403 — DOG_CONTENT_BLOCKED"}
                      {browserBanReason === "ai" && "Error 403 — AI_CONTENT_PROHIBITED"}
                      {browserBanReason === "work" && "Error 403 — WORK_CONTENT_REJECTED"}
                      {browserBanReason === "other" && "Error 403 — CONTENT_NOT_CAT"}
                    </div>
                    <div className="font-comic font-bold text-lg mt-1" style={{ color: "#222", maxWidth: 440 }}>
                      {browserBanReason === "dog" && <>CatScape has detected <strong>dog content</strong> in your search for "{browserQuery}". Dogs are not supported, endorsed, or acknowledged on this network.</>}
                      {browserBanReason === "ai" && <>Your search for "{browserQuery}" triggered the <strong>Anti-AI Filter</strong>. CatScape Navigator contains zero artificial intelligence. All opinions are genuine cat opinions.</>}
                      {browserBanReason === "work" && <>"{browserQuery}"? On Cat Town? You came to a cat website to think about <strong>work</strong>? Please. Sit down. Look at some cats. Relax.</>}
                      {browserBanReason === "other" && <>CatScape Navigator has blocked your search for <strong>"{browserQuery}"</strong>. This browser only indexes cat content.</>}
                    </div>
                    <div className="mt-5 p-4 font-comic font-bold text-sm" style={{ background: "#fffbe6", border: "3px solid var(--ct-black)", maxWidth: 400 }}>
                      💡 <strong>Try instead:</strong> nyan cat · maine coon · grumpy · keyboard cat · sphynx · games · music · memes · ragdoll · loaf
                    </div>
                    <div className="font-pixel mt-5 blink" style={{ fontSize: "9px", color: "var(--ct-red)" }}>
                      ⚠️ THIS SEARCH HAS BEEN LOGGED, JUDGED, AND FOUND WANTING ⚠️
                    </div>
                    <button onClick={() => { setBrowserBanned(false); setBrowserQuery(""); setBrowserInput(""); }} className="xp-btn mt-4" style={{ fontSize: "9px" }}>
                      ← GO BACK AND SEARCH FOR CATS
                    </button>
                  </div>
                )}

                {/* PAGE VIEW */}
                {!browserBanned && currentBrowserPage && (
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-6 pb-4" style={{ borderBottom: "3px solid var(--ct-black)" }}>
                      <span style={{ fontSize: 56 }}>{currentBrowserPage.emoji}</span>
                      <div>
                        <h2 style={{ fontFamily: "Fredoka One", fontSize: "2.5rem", lineHeight: 1 }}>{currentBrowserPage.title}</h2>
                        <div className="font-pixel" style={{ fontSize: "9px", color: "#888", marginTop: 4 }}>
                          📍 {currentBrowserPage.url}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-comic font-bold text-lg leading-relaxed mb-6" style={{ color: "#333" }}>
                          {currentBrowserPage.body}
                        </p>
                        <button onClick={browserBack} className="xp-btn" style={{ fontSize: "10px" }}>← BACK TO RESULTS</button>
                      </div>
                      <div className="xp-window">
                        <div className="xp-titlebar"><span>📋 QUICK FACTS</span><span>_  □  X</span></div>
                        <div className="p-4">
                          <table className="retro-table">
                            <tbody>
                              {currentBrowserPage.content.map((row, i) => (
                                <tr key={i}>
                                  <td className="font-pixel" style={{ fontSize: "8px", background: "#fffbe6", whiteSpace: "nowrap" }}>{row.label}</td>
                                  <td className="font-comic font-bold">{row.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SEARCH RESULTS */}
                {!browserBanned && !currentBrowserPage && browserQuery && (
                  <div className="p-6">
                    <div className="font-pixel mb-4" style={{ fontSize: "9px", color: "#888" }}>
                      CatScape found {browserResults?.length ?? 0} result(s) for "{browserQuery}"
                    </div>
                    {browserResults && browserResults.length > 0 ? (
                      <div className="space-y-3">
                        {browserResults.map(page => (
                          <div key={page.id}
                            onClick={() => openBrowserPage(page.id)}
                            className="cursor-pointer p-4"
                            style={{ border: "3px solid var(--ct-black)", background: "#fffbe6", transition: "all 0.1s", boxShadow: "3px 3px 0 black" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "5px 5px 0 black"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 black"; }}
                          >
                            <div className="flex items-center gap-3">
                              <span style={{ fontSize: 28 }}>{page.emoji}</span>
                              <div>
                                <div className="font-pixel" style={{ fontSize: "9px", color: "var(--ct-blue)", textDecoration: "underline" }}>
                                  {page.title}
                                </div>
                                <div className="font-pixel" style={{ fontSize: "8px", color: "#888" }}>{page.url}</div>
                                <div className="font-comic font-bold text-sm mt-1" style={{ color: "#444" }}>
                                  {page.body.slice(0, 100)}...
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div style={{ fontSize: 64 }}>🐾</div>
                        <div className="font-pixel mt-4 mb-2" style={{ fontSize: "11px" }}>NO RESULTS FOUND</div>
                        <div className="font-comic font-bold" style={{ color: "#666" }}>
                          We couldn't find anything for "{browserQuery}". Try: nyan cat · grumpy · maine coon · sphynx · ragdoll · games · music · guestbook · loaf · surprised
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* HOME / DIRECTORY */}
                {!browserBanned && !currentBrowserPage && !browserQuery && (
                  <div className="p-6">
                    <div className="font-pixel text-center mb-6" style={{ fontSize: "10px", color: "#888" }}>
                      🐱 CATSCOPE NAVIGATOR — CAT INTERNET DIRECTORY 🐱
                    </div>

                    {/* Tab switcher */}
                    <div className="flex mb-4 flex-wrap" style={{ borderBottom: "3px solid var(--ct-black)" }}>
                      {([
                        { id: "memes", label: "🐾 MEMES" },
                        { id: "breeds", label: "📖 BREEDS" },
                        { id: "site", label: "🏠 THIS SITE" },
                      ] as const).map(tab => (
                        <button key={tab.id} onClick={() => setBrowserTab(tab.id)}
                          className="font-pixel px-5 py-2"
                          style={{
                            fontSize: "9px",
                            background: browserTab === tab.id ? "var(--ct-yellow)" : "white",
                            border: "3px solid var(--ct-black)",
                            borderBottom: browserTab === tab.id ? "3px solid var(--ct-yellow)" : "3px solid var(--ct-black)",
                            marginBottom: browserTab === tab.id ? -3 : 0,
                            fontWeight: "bold",
                          }}>
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {browserTab === "site" && (
                      <div className="mb-4 p-3 font-comic font-bold text-sm" style={{ background: "#fffbe6", border: "3px solid var(--ct-black)" }}>
                        💡 Search for features on this website — music, games, memes, cool cats, guestbook, and more!
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(browserTab === "memes"
                        ? [...MEME_PAGES, ...MORE_MEME_PAGES]
                        : browserTab === "breeds"
                        ? [...BREED_PAGES, ...MORE_BREED_PAGES]
                        : SITE_PAGES
                      ).map(page => (
                        <div key={page.id}
                          onClick={() => openBrowserPage(page.id)}
                          className="cursor-pointer p-4 flex items-center gap-3"
                          style={{ border: "3px solid var(--ct-black)", background: "white", boxShadow: "3px 3px 0 black", transition: "all 0.1s" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; (e.currentTarget as HTMLElement).style.background = "#fffbe6"; (e.currentTarget as HTMLElement).style.boxShadow = "5px 5px 0 black"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.background = "white"; (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 black"; }}
                        >
                          <span style={{ fontSize: 36 }}>{page.emoji}</span>
                          <div>
                            <div className="font-pixel" style={{ fontSize: "9px", color: "var(--ct-blue)", textDecoration: "underline" }}>{page.title}</div>
                            <div className="font-pixel" style={{ fontSize: "7px", color: "#aaa" }}>{page.url}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Status bar */}
              <div style={{ background: "#d4d0c8", borderTop: "2px solid var(--ct-black)", padding: "3px 8px" }} className="flex justify-between">
                <span className="font-pixel" style={{ fontSize: "8px", color: "#555" }}>
                  {browserBanned ? "⛔ ACCESS DENIED" : currentBrowserPage ? `✅ Loaded: ${currentBrowserPage.url}` : "🌐 CatScape Navigator 3.0 — Ready"}
                </span>
                <span className="font-pixel" style={{ fontSize: "8px", color: "#888" }}>🔒 catscope:// safe zone</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <hr style={{ border: "none", borderTop: "4px solid black", margin: 0, marginTop: 48 }} />
      <footer style={{ background: "var(--ct-black)" }} className="py-8">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
          <div className="font-pixel text-xs" style={{ color: "var(--ct-yellow)", fontSize: "9px" }}>
            ★ CAT TOWN ★ EST. 1999 ★ NO DOGS ★ NO AI ★ YES CATS ★
          </div>
          <div className="font-comic font-bold text-sm" style={{ color: "#888" }}>
            Best viewed in Internet Explorer 6.0 at 800×600 resolution
          </div>
          <div className="flex justify-center gap-6 flex-wrap">
            {[["Home", "home"], ["Memes", "memes"], ["About", "about"], ["Cool Cats", "cool-cats"], ["More", "more"]].map(([label, sec]) => (
              <span key={sec} className="font-pixel cursor-pointer"
                    style={{ color: "var(--ct-yellow)", fontSize: "9px", textDecoration: "underline" }}
                    onClick={() => handleNav(sec)}>
                {label}
              </span>
            ))}
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="hit-counter" style={{ fontSize: "11px" }}>{hitCount.toLocaleString()}</div>
            <div className="font-pixel text-xs" style={{ color: "#555", fontSize: "8px" }}>TOTAL VISITORS</div>
          </div>
          <div className="font-pixel" style={{ color: "#555", fontSize: "8px" }}>
            © 1999–{new Date().getFullYear()} CAT TOWN. ALL CATS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}