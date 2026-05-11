import { useEffect, useRef, useState } from "react";

// Undertale-style chiptune melody for Cat Town
// Notes in Hz
const NOTE = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77,
  Bb3: 233.08, Eb4: 311.13, Ab4: 415.3, Bb4: 466.16, Db5: 554.37, Eb5: 622.25, Ab5: 830.61,
  REST: 0,
};

// BPM = 120, each step = 0.25s (sixteenth note)
const BPM = 120;
const STEP = (60 / BPM) / 2; // eighth note duration in seconds

// Melody line — Undertale-ish catchy looping tune
const MELODY: [number, number][] = [
  // bar 1
  [NOTE.E4, STEP], [NOTE.G4, STEP], [NOTE.A4, STEP * 2],
  [NOTE.G4, STEP], [NOTE.E4, STEP], [NOTE.C4, STEP * 2],
  // bar 2
  [NOTE.D4, STEP], [NOTE.F4, STEP], [NOTE.G4, STEP * 2],
  [NOTE.A4, STEP], [NOTE.G4, STEP], [NOTE.E4, STEP * 2],
  // bar 3
  [NOTE.C5, STEP], [NOTE.B4, STEP], [NOTE.A4, STEP],  [NOTE.G4, STEP],
  [NOTE.E4, STEP], [NOTE.D4, STEP], [NOTE.C4, STEP * 2],
  // bar 4
  [NOTE.G4, STEP], [NOTE.A4, STEP], [NOTE.B4, STEP * 2],
  [NOTE.A4, STEP], [NOTE.G4, STEP], [NOTE.REST, STEP * 2],
  // bar 5 — second phrase
  [NOTE.F4, STEP], [NOTE.A4, STEP], [NOTE.Bb4, STEP * 2],
  [NOTE.A4, STEP], [NOTE.F4, STEP], [NOTE.D4, STEP * 2],
  // bar 6
  [NOTE.Eb4, STEP], [NOTE.G4, STEP], [NOTE.Ab4, STEP * 2],
  [NOTE.Bb4, STEP], [NOTE.Ab4, STEP], [NOTE.F4, STEP * 2],
  // bar 7
  [NOTE.C5, STEP], [NOTE.Bb4, STEP], [NOTE.Ab4, STEP], [NOTE.G4, STEP],
  [NOTE.F4, STEP], [NOTE.Eb4, STEP], [NOTE.D4, STEP * 2],
  // bar 8 — resolve
  [NOTE.G4, STEP * 2], [NOTE.E4, STEP * 2],
  [NOTE.C4, STEP * 2], [NOTE.REST, STEP * 2],
];

// Bass line
const BASS: [number, number][] = [
  [NOTE.C3, STEP * 2], [NOTE.G3, STEP * 2], [NOTE.A3, STEP * 2], [NOTE.E3, STEP * 2],
  [NOTE.F3, STEP * 2], [NOTE.C3, STEP * 2], [NOTE.G3, STEP * 2], [NOTE.G3, STEP * 2],
  [NOTE.C3, STEP * 2], [NOTE.G3, STEP * 2], [NOTE.A3, STEP * 2], [NOTE.E3, STEP * 2],
  [NOTE.F3, STEP * 2], [NOTE.C3, STEP * 2], [NOTE.G3, STEP * 4],
  [NOTE.Bb3, STEP * 2], [NOTE.F3, STEP * 2], [NOTE.Ab3 ?? NOTE.G3, STEP * 2], [NOTE.Eb3 ?? NOTE.E3, STEP * 2],
  [NOTE.Bb3, STEP * 2], [NOTE.F3, STEP * 2], [NOTE.G3, STEP * 4],
  [NOTE.C3, STEP * 2], [NOTE.G3, STEP * 2], [NOTE.A3, STEP * 2], [NOTE.E3, STEP * 2],
  [NOTE.F3, STEP * 2], [NOTE.C3, STEP * 2], [NOTE.G3, STEP * 2], [NOTE.C3, STEP * 2],
];

function playNote(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  type: OscillatorType = "square",
  gainVal = 0.15,
  detune = 0
) {
  if (freq === 0) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  osc.detune.setValueAtTime(detune, startTime);

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.01);
  gain.gain.setValueAtTime(gainVal, startTime + duration - 0.05);
  gain.gain.linearRampToValueAtTime(0, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

function scheduleSong(ctx: AudioContext, startTime: number) {
  // Melody (square wave — classic chiptune)
  let t = startTime;
  for (const [freq, dur] of MELODY) {
    playNote(ctx, freq, t, dur * 0.85, "square", 0.12);
    t += dur;
  }
  const melodyDuration = t - startTime;

  // Bass (triangle wave — warmer low end)
  let tb = startTime;
  for (const [freq, dur] of BASS) {
    playNote(ctx, freq, tb, dur * 0.8, "triangle", 0.1);
    tb += dur;
  }

  return melodyDuration;
}

export function useCatTownMusic() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const ctxRef = useRef<AudioContext | null>(null);
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);
  const loopStartRef = useRef<number>(0);

  function startMusic() {
    if (ctxRef.current) {
      ctxRef.current.close();
    }
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const now = ctx.currentTime + 0.1;
    startTimeRef.current = now;
    loopStartRef.current = Date.now();

    const duration = scheduleSong(ctx, now);

    function loop() {
      if (!ctxRef.current || ctxRef.current.state === "closed") return;
      const elapsed = (Date.now() - loopStartRef.current) / 1000;
      const nextStart = now + Math.ceil(elapsed / duration) * duration;
      scheduleSong(ctxRef.current, nextStart);
      loopTimeoutRef.current = setTimeout(loop, (duration - 2) * 1000);
    }

    loopTimeoutRef.current = setTimeout(loop, (duration - 2) * 1000);
    setPlaying(true);
  }

  function stopMusic() {
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
    }
    setPlaying(false);
  }

  function toggleMusic() {
    if (playing) {
      stopMusic();
    } else {
      startMusic();
    }
  }

  useEffect(() => {
    return () => {
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
      if (ctxRef.current) ctxRef.current.close();
    };
  }, []);

  return { playing, toggleMusic, volume, setVolume };
}
