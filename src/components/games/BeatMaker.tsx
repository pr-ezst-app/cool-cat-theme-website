import { useState, useEffect, useRef, useCallback } from "react";

const STEPS = 16;
const BPM_DEFAULT = 120;

// Drum sounds via Web Audio
function createAudioCtx() {
  const W = window as Window & { webkitAudioContext?: typeof AudioContext };
  return new (W.AudioContext || W.webkitAudioContext!)();
}

function playKick(ctx: AudioContext, time: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(150, time);
  osc.frequency.exponentialRampToValueAtTime(0.001, time + 0.5);
  gain.gain.setValueAtTime(1, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
  osc.start(time); osc.stop(time + 0.5);
}

function playSnare(ctx: AudioContext, time: number) {
  const noise = ctx.createOscillator();
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const gain = ctx.createGain();
  src.connect(gain); gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.6, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
  src.start(time); src.stop(time + 0.2);
  noise.disconnect();
}

function playHihat(ctx: AudioContext, time: number, open = false) {
  const buf = ctx.createBuffer(1, ctx.sampleRate * (open ? 0.3 : 0.05), ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass"; filter.frequency.value = 7000;
  const gain = ctx.createGain();
  src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.4, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + (open ? 0.3 : 0.05));
  src.start(time); src.stop(time + (open ? 0.3 : 0.05));
}

function playTom(ctx: AudioContext, time: number, freq = 80) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(freq, time);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.3, time + 0.3);
  gain.gain.setValueAtTime(0.7, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
  osc.start(time); osc.stop(time + 0.3);
}

function playCowbell(ctx: AudioContext, time: number) {
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  osc1.type = "square"; osc1.frequency.value = 562;
  osc2.type = "square"; osc2.frequency.value = 845;
  osc1.connect(gain); osc2.connect(gain); gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.3, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);
  osc1.start(time); osc1.stop(time + 0.4);
  osc2.start(time); osc2.stop(time + 0.4);
}

function playMeow(ctx: AudioContext, time: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine"; 
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(400, time);
  osc.frequency.linearRampToValueAtTime(700, time + 0.1);
  osc.frequency.linearRampToValueAtTime(300, time + 0.35);
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.5, time + 0.05);
  gain.gain.linearRampToValueAtTime(0, time + 0.35);
  osc.start(time); osc.stop(time + 0.4);
}

const TRACKS = [
  { id: "kick",    label: "KICK 🥁",    color: "#FF2222", play: (ctx: AudioContext, t: number) => playKick(ctx, t) },
  { id: "snare",   label: "SNARE 💥",   color: "#FF6600", play: (ctx: AudioContext, t: number) => playSnare(ctx, t) },
  { id: "hihat",   label: "HI-HAT 🎩",  color: "#FFE600", play: (ctx: AudioContext, t: number) => playHihat(ctx, t, false) },
  { id: "openhat", label: "OPEN HAT 🔔",color: "#88FF00", play: (ctx: AudioContext, t: number) => playHihat(ctx, t, true) },
  { id: "tom",     label: "TOM 🪘",     color: "#00AAAA", play: (ctx: AudioContext, t: number) => playTom(ctx, t, 90) },
  { id: "tom2",    label: "TOM 2 🪘",   color: "#0000CC", play: (ctx: AudioContext, t: number) => playTom(ctx, t, 55) },
  { id: "cowbell", label: "COWBELL 🔔", color: "#9900CC", play: (ctx: AudioContext, t: number) => playCowbell(ctx, t) },
  { id: "meow",    label: "MEOW 🐱",    color: "#FF00AA", play: (ctx: AudioContext, t: number) => playMeow(ctx, t) },
];

const PRESETS: Record<string, boolean[][]> = {
  "Cat Bop": [
    [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
    [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0],
  ],
  "Purrfect Trap": [
    [1,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0],
  ],
  "Midnight Meow": [
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0],
    [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0],
  ],
};

function emptyGrid(): boolean[][] {
  return TRACKS.map(() => Array(STEPS).fill(false));
}

export default function BeatMaker() {
  const [grid, setGrid] = useState<boolean[][]>(emptyGrid);
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(-1);
  const [bpm, setBpm] = useState(BPM_DEFAULT);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const stepRef = useRef(-1);
  const gridRef = useRef(grid);
  const bpmRef = useRef(bpm);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  gridRef.current = grid;
  bpmRef.current = bpm;

  const tick = useCallback(() => {
    if (!ctxRef.current) return;
    const ctx = ctxRef.current;
    const now = ctx.currentTime;
    stepRef.current = (stepRef.current + 1) % STEPS;
    setStep(stepRef.current);
    const g = gridRef.current;
    TRACKS.forEach((track, ti) => {
      if (g[ti][stepRef.current]) track.play(ctx, now);
    });
    const interval = (60 / bpmRef.current / 4) * 1000;
    timerRef.current = setTimeout(tick, interval);
  }, []);

  function startStop() {
    if (playing) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setPlaying(false);
      setStep(-1);
      stepRef.current = -1;
      if (ctxRef.current) { ctxRef.current.close(); ctxRef.current = null; }
    } else {
      ctxRef.current = createAudioCtx();
      stepRef.current = -1;
      setPlaying(true);
      tick();
    }
  }

  function toggleCell(ti: number, si: number) {
    setGrid(g => g.map((row, ri) => ri === ti ? row.map((v, ci) => ci === si ? !v : v) : row));
  }

  function loadPreset(name: string) {
    setGrid(PRESETS[name].map(row => row.map(v => !!v)));
    setActivePreset(name);
  }

  function clearGrid() {
    setGrid(emptyGrid());
    setActivePreset(null);
  }

  function previewTrack(ti: number) {
    if (!ctxRef.current) {
      ctxRef.current = createAudioCtx();
    }
    TRACKS[ti].play(ctxRef.current, ctxRef.current.currentTime);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (ctxRef.current) ctxRef.current.close();
    };
  }, []);

  return (
    <div className="w-full" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {/* Controls bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4 p-3" style={{ background: "#111", border: "3px solid var(--ct-yellow)" }}>
        <button onClick={startStop} className="xp-btn"
          style={{ background: playing ? "#FF2222" : "var(--ct-lime)", color: "#000", fontSize: "10px", minWidth: 90 }}>
          {playing ? "⏹ STOP" : "▶ PLAY"}
        </button>
        <button onClick={clearGrid} className="xp-btn" style={{ fontSize: "9px", background: "#333", color: "#aaa" }}>
          🗑 CLEAR
        </button>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: "8px", color: "#FFE600" }}>BPM:</span>
          <input type="range" min={60} max={200} value={bpm}
            onChange={e => setBpm(Number(e.target.value))}
            style={{ width: 80, accentColor: "var(--ct-yellow)" }} />
          <span style={{ fontSize: "9px", color: "#FFE600", minWidth: 30 }}>{bpm}</span>
        </div>
        <div className="flex gap-1 flex-wrap">
          {Object.keys(PRESETS).map(p => (
            <button key={p} onClick={() => loadPreset(p)} className="xp-btn"
              style={{ fontSize: "7px", padding: "3px 7px", background: activePreset === p ? "var(--ct-yellow)" : "#222", color: activePreset === p ? "#000" : "#FFE600" }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex mb-1 ml-28">
        {Array.from({ length: STEPS }).map((_, i) => (
          <div key={i} style={{
            width: 28, height: 8, flexShrink: 0,
            background: i === step ? "var(--ct-yellow)" : i % 4 === 0 ? "#333" : "#222",
            border: "1px solid #000",
            transition: "background 0.05s",
          }} />
        ))}
      </div>

      {/* Grid */}
      <div className="space-y-1">
        {TRACKS.map((track, ti) => (
          <div key={track.id} className="flex items-center gap-1">
            {/* Track label */}
            <button onClick={() => previewTrack(ti)}
              className="flex items-center justify-center text-center"
              style={{
                width: 108, minWidth: 108, fontSize: "7px", padding: "4px 2px",
                background: track.color, color: "#000",
                border: "2px solid #000", cursor: "pointer",
                fontFamily: "'Press Start 2P', monospace",
                lineHeight: 1.4,
              }}>
              {track.label}
            </button>
            {/* Step buttons */}
            {Array.from({ length: STEPS }).map((_, si) => (
              <button
                key={si}
                onClick={() => toggleCell(ti, si)}
                style={{
                  width: 28, height: 28, flexShrink: 0,
                  background: grid[ti][si]
                    ? track.color
                    : si === step
                    ? "#333"
                    : si % 4 === 0 ? "#1a1a1a" : "#111",
                  border: `2px solid ${grid[ti][si] ? "#fff" : "#333"}`,
                  cursor: "pointer",
                  transition: "background 0.05s",
                  outline: si === step && !grid[ti][si] ? "1px solid #666" : "none",
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-3 font-pixel text-center" style={{ fontSize: "7px", color: "#555" }}>
        CLICK TRACK NAME TO PREVIEW SOUND &nbsp;|&nbsp; CLICK CELLS TO TOGGLE &nbsp;|&nbsp; {STEPS} STEPS, {bpm} BPM
      </div>
    </div>
  );
}