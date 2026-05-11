import { useState, useEffect } from "react";

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

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [currentFact, setCurrentFact] = useState(0);
  const [hitCount] = useState(() => Math.floor(Math.random() * 900000) + 100000);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [soundPlaying, setSoundPlaying] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen" style={{ background: "var(--ct-yellow)" }}>

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
            {["home", "memes", "about", "cool-cats", "more"].map(sec => (
              <button
                key={sec}
                onClick={() => handleNav(sec)}
                className={`nav-link ${activeSection === sec ? "active" : ""}`}
              >
                {sec === "cool-cats" ? "COOL CATS" : sec.toUpperCase()}
              </button>
            ))}
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
