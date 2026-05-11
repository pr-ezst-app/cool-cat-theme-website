import { useState } from "react";

type Extension = {
  id: string;
  name: string;
  emoji: string;
  author: string;
  version: string;
  rating: number;
  downloads: string;
  category: string;
  description: string;
  features: string[];
  warning?: string;
  size: string;
};

const EXTENSIONS: Extension[] = [
  {
    id: "cat-new-tab",
    name: "Cat New Tab",
    emoji: "🐱",
    author: "CatTown Labs",
    version: "4.2.0",
    rating: 5,
    downloads: "4,729,000",
    category: "Productivity",
    description: "Replaces every new tab with a random cat photo. Studies show this increases productivity by 0%. You will not care.",
    features: ["Random cat every new tab", "Breeds filter", "Daily cat fact", "No settings (cats decide)"],
    size: "420 KB",
  },
  {
    id: "dog-blocker",
    name: "Dog Content Blocker Pro",
    emoji: "🚫",
    author: "Anti-Woof Inc.",
    version: "9.9.9",
    rating: 5,
    downloads: "12,000,000",
    category: "Security",
    description: "Automatically detects and replaces all dog content on the internet with cats. Uses a highly advanced algorithm (a list of dog words).",
    features: ["Blocks 99.9% of dog content", "Replaces dogs with cats", "Barking sound detection", "Sends strongly-worded emails to dog websites"],
    warning: "May cause existential crisis in dog owners.",
    size: "69 KB",
  },
  {
    id: "nyan-cursor",
    name: "Nyan Cat Cursor",
    emoji: "🌈",
    author: "prguitarman_fan",
    version: "2011.1",
    rating: 5,
    downloads: "8,100,000",
    category: "Themes",
    description: "Replaces your cursor with Nyan Cat leaving a rainbow trail. The song will play. You cannot turn it off. This is intentional.",
    features: ["Full Nyan Cat cursor", "Rainbow trail", "Nyan sound (cannot disable)", "Works even when laptop is closed (somehow)"],
    warning: "⚠️ The song will be stuck in your head for 3–5 business days.",
    size: "2011 KB",
  },
  {
    id: "cat-translator",
    name: "Cat Language Translator",
    emoji: "🗣️",
    author: "Dr. Meowsworth PhD",
    version: "1.0.4",
    rating: 4,
    downloads: "991,337",
    category: "Tools",
    description: "Translates all text on any webpage into Cat Language (meows, purrs, and the occasional hiss). Untranslatable back. You're welcome.",
    features: ["Full page translation", "Meow dialect options", "Hiss for negative content", "Purr for good news"],
    size: "128 KB",
  },
  {
    id: "monday-blocker",
    name: "Monday Blocker",
    emoji: "📅",
    author: "Weekend Enthusiasts LLC",
    version: "7.0.0",
    rating: 5,
    downloads: "999,999,999",
    category: "Productivity",
    description: "Detects when it is Monday and displays a full-screen cat instead of whatever you were about to do. Resumes normal operation on Tuesday.",
    features: ["Monday detection", "Full-screen cat override", "Boss key (shows spreadsheet for 0.3 seconds)", "Snooze until Tuesday"],
    warning: "Does not actually block Monday from happening.",
    size: "1 MB",
  },
  {
    id: "ceiling-cat-watch",
    name: "Ceiling Cat Watcher",
    emoji: "👁️",
    author: "Omniscient Feline Corp",
    version: "∞",
    rating: 4,
    downloads: "2,006,000",
    category: "Security",
    description: "Adds a small Ceiling Cat to the top of every webpage, watching silently. You cannot remove it. It was always there.",
    features: ["Always watching", "Judges your browsing habits", "Weekly surveillance report (to the cats)", "Cannot be disabled"],
    warning: "Ceiling Cat has always been watching. This just makes it visible.",
    size: "4 KB (the cat is very efficient)",
  },
  {
    id: "keyboard-cat-tabs",
    name: "Keyboard Cat Tab Manager",
    emoji: "🎹",
    author: "Charlie Schmidt Memorial",
    version: "RIP.1",
    rating: 5,
    downloads: "3,500,000",
    category: "Tools",
    description: "When you close a tab, Keyboard Cat plays you off. Every tab closing is now a moment of dignity. RIP to whatever you were reading.",
    features: ["Plays you off on every tab close", "Volume slider (min: loud)", "Keyboard Cat skin options", "Memorial mode for important tabs"],
    size: "1984 KB",
  },
  {
    id: "ai-replacer",
    name: "AI → Cat Replacer",
    emoji: "🤖➡️🐱",
    author: "CatScape Security",
    version: "2024.1",
    rating: 5,
    downloads: "7,777,777",
    category: "Security",
    description: "Detects any mention of AI, ChatGPT, machine learning, or robots on any webpage and replaces all text with 'meow'. Significantly improves most tech blogs.",
    features: ["Replaces 'AI' with 'a cat'", "Replaces 'algorithm' with 'a cat decision'", "Replaces all robot images with cats", "Improves 94% of LinkedIn posts"],
    warning: "Some websites become 100% meow. This is an improvement.",
    size: "0 KB (it's just cats)",
  },
  {
    id: "cat-typing",
    name: "Cat Walking on Keyboard Simulator",
    emoji: "🚶",
    author: "YourCatProbably",
    version: "3.14",
    rating: 3,
    downloads: "420,000",
    category: "Productivity",
    description: "Periodically sends random keystrokes to whatever you're typing, simulating a cat walking across your keyboard. For realism.",
    features: ["Random keystroke injection", "Timing based on real cat data", "Occasional sit on Enter key", "Cannot tell the difference from real cat"],
    warning: "⚠️ Do not use during important documents, emails, or anything that matters.",
    size: "meow KB",
  },
];

const CATEGORIES = ["All", "Productivity", "Security", "Themes", "Tools"];

type InstalledState = "idle" | "installing" | "done";

export default function ExtensionStore() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [installing, setInstalling] = useState<Record<string, InstalledState>>({});
  const [selected, setSelected] = useState<Extension | null>(null);
  const [installLog, setInstallLog] = useState<string[]>([]);

  const filtered = EXTENSIONS.filter(e => {
    const matchCat = category === "All" || e.category === category;
    const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function fakeInstall(ext: Extension) {
    if (installing[ext.id] === "done") return;
    setInstalling(s => ({ ...s, [ext.id]: "installing" }));
    setInstallLog([]);

    const logs = [
      `Connecting to CatScape Extension Store...`,
      `Downloading ${ext.name} v${ext.version}...`,
      `Size: ${ext.size}`,
      `Checking for dogs... none found ✅`,
      `Verifying cat content... confirmed 🐱`,
      `Installing extension...`,
      `Updating cat database...`,
      `Running meow verification...`,
      `✅ ${ext.name} installed successfully!`,
      `⚠️ Note: ${ext.warning ?? "No cats were harmed in this installation."}`,
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setInstallLog(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setInstalling(s => ({ ...s, [ext.id]: "done" }));
      }
    }, 250);
  }

  function getStatus(id: string): InstalledState {
    return installing[id] ?? "idle";
  }

  return (
    <div className="w-full" style={{ fontFamily: "'Comic Neue', cursive" }}>

      {/* Store header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 p-4"
        style={{ background: "#1a1a2e", border: "4px solid var(--ct-yellow)" }}>
        <div>
          <div className="font-pixel" style={{ fontSize: "12px", color: "var(--ct-yellow)" }}>🐱 CATSCAPE EXTENSION STORE</div>
          <div className="font-pixel mt-1" style={{ fontSize: "7px", color: "#888" }}>v3.0 — Only Cat-Approved Extensions</div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search extensions..."
            className="font-comic font-bold p-2"
            style={{ border: "3px solid var(--ct-yellow)", background: "#111", color: "white", outline: "none", width: 200 }}
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-1 mb-4">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className="font-pixel"
            style={{
              fontSize: "8px", padding: "5px 12px",
              background: category === cat ? "var(--ct-yellow)" : "#222",
              color: category === cat ? "#000" : "var(--ct-yellow)",
              border: "2px solid var(--ct-yellow)", cursor: "pointer",
            }}>
            {cat.toUpperCase()}
          </button>
        ))}
        <span className="font-pixel ml-auto" style={{ fontSize: "7px", color: "#555", alignSelf: "center" }}>
          {filtered.length} extension{filtered.length !== 1 ? "s" : ""} found
        </span>
      </div>

      <div className="flex gap-4" style={{ alignItems: "flex-start" }}>
        {/* Extension list */}
        <div className="flex-1 space-y-3" style={{ minWidth: 0 }}>
          {filtered.map(ext => {
            const status = getStatus(ext.id);
            return (
              <div key={ext.id}
                style={{
                  border: `3px solid ${selected?.id === ext.id ? "var(--ct-yellow)" : "var(--ct-black)"}`,
                  background: selected?.id === ext.id ? "#fffbe6" : "white",
                  boxShadow: "4px 4px 0 black",
                  cursor: "pointer",
                  transition: "all 0.1s",
                }}
                onClick={() => setSelected(ext)}
              >
                <div className="flex items-center justify-between p-3 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: 36 }}>{ext.emoji}</span>
                    <div>
                      <div className="font-bold" style={{ fontFamily: "Fredoka One", fontSize: "1.2rem" }}>{ext.name}</div>
                      <div className="font-pixel" style={{ fontSize: "7px", color: "#888" }}>
                        by {ext.author} · v{ext.version} · {ext.category}
                      </div>
                      <div style={{ color: "#FF6600", fontSize: "13px" }}>{"★".repeat(ext.rating)}{"☆".repeat(5 - ext.rating)}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="font-pixel" style={{ fontSize: "7px", color: "#aaa" }}>⬇ {ext.downloads}</div>
                    <button
                      onClick={e => { e.stopPropagation(); fakeInstall(ext); }}
                      className="font-pixel"
                      style={{
                        fontSize: "8px", padding: "5px 12px",
                        background: status === "done" ? "var(--ct-lime)" : status === "installing" ? "#888" : "var(--ct-blue)",
                        color: status === "done" ? "#000" : "white",
                        border: "2px solid black", cursor: status === "installing" ? "wait" : "pointer",
                        minWidth: 90,
                      }}
                    >
                      {status === "done" ? "✅ INSTALLED" : status === "installing" ? "INSTALLING..." : "⬇ INSTALL"}
                    </button>
                  </div>
                </div>
                <div className="px-3 pb-3 font-comic text-sm" style={{ color: "#555", borderTop: "2px solid #eee", paddingTop: 8 }}>
                  {ext.description}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <div style={{ fontSize: 64 }}>🔍</div>
              <div className="font-pixel mt-3" style={{ fontSize: "10px" }}>NO EXTENSIONS FOUND</div>
              <div className="font-comic font-bold mt-2" style={{ color: "#666" }}>Try: cat, dog blocker, nyan, Monday...</div>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div style={{ width: 260, flexShrink: 0 }} className="space-y-4">
          {/* Install log */}
          {installLog.length > 0 && (
            <div className="xp-window">
              <div className="xp-titlebar"><span>⚙️ INSTALL LOG</span><span>_  □  X</span></div>
              <div className="p-3" style={{ background: "#000", maxHeight: 200, overflowY: "auto" }}>
                {installLog.map((line, i) => (
                  <div key={i} className="font-pixel" style={{ fontSize: "7px", color: "#0f0", marginBottom: 3 }}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detail panel */}
          {selected && (
            <div className="xp-window">
              <div className="xp-titlebar"><span>📋 {selected.name}</span><span>_  □  X</span></div>
              <div className="p-4 space-y-3">
                <div className="text-center" style={{ fontSize: 48 }}>{selected.emoji}</div>
                <div className="font-pixel" style={{ fontSize: "8px", color: "#555" }}>FEATURES:</div>
                {selected.features.map((f, i) => (
                  <div key={i} className="font-comic font-bold text-sm">✓ {f}</div>
                ))}
                {selected.warning && (
                  <div className="font-comic font-bold text-sm p-2 mt-2"
                    style={{ background: "#fff3cd", border: "2px solid #FF6600" }}>
                    {selected.warning}
                  </div>
                )}
                <div className="font-pixel" style={{ fontSize: "7px", color: "#aaa" }}>Size: {selected.size}</div>
                <button onClick={() => fakeInstall(selected)} className="xp-btn w-full"
                  style={{ background: getStatus(selected.id) === "done" ? "var(--ct-lime)" : "var(--ct-blue)", color: getStatus(selected.id) === "done" ? "#000" : "white", fontSize: "9px" }}>
                  {getStatus(selected.id) === "done" ? "✅ INSTALLED" : "⬇ INSTALL NOW"}
                </button>
              </div>
            </div>
          )}

          {/* Installed count */}
          {Object.values(installing).filter(v => v === "done").length > 0 && (
            <div className="xp-window">
              <div className="xp-titlebar"><span>📦 MY EXTENSIONS</span><span>_  □  X</span></div>
              <div className="p-3 space-y-2">
                {EXTENSIONS.filter(e => installing[e.id] === "done").map(e => (
                  <div key={e.id} className="flex items-center gap-2 font-comic font-bold text-sm">
                    <span>{e.emoji}</span><span>{e.name}</span>
                    <span className="ml-auto font-pixel" style={{ fontSize: "7px", color: "var(--ct-lime)" }}>ON</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
