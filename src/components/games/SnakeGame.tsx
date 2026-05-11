import { useEffect, useRef, useState, useCallback } from "react";

const COLS = 20;
const ROWS = 18;
const CELL = 20;
const TICK = 120;

type Dir = { x: number; y: number };
type Pt = { x: number; y: number };

function rand(max: number) { return Math.floor(Math.random() * max); }
function newFood(snake: Pt[]): Pt {
  let f: Pt;
  do { f = { x: rand(COLS), y: rand(ROWS) }; }
  while (snake.some(s => s.x === f.x && s.y === f.y));
  return f;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    snake: [{ x: 10, y: 9 }, { x: 9, y: 9 }, { x: 8, y: 9 }],
    dir: { x: 1, y: 0 } as Dir,
    nextDir: { x: 1, y: 0 } as Dir,
    food: { x: 15, y: 5 } as Pt,
    score: 0,
    dead: false,
    started: false,
  });
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);
  const [started, setStarted] = useState(false);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const s = stateRef.current;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

    // Grid
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, ROWS * CELL); ctx.stroke(); }
    for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(COLS * CELL, y * CELL); ctx.stroke(); }

    // Food 🐟
    ctx.font = `${CELL}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🐟", s.food.x * CELL + CELL / 2, s.food.y * CELL + CELL / 2);

    // Snake
    s.snake.forEach((seg, i) => {
      if (i === 0) {
        ctx.fillStyle = "#FFE600";
        ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
        ctx.font = `${CELL - 2}px serif`;
        ctx.fillText("😺", seg.x * CELL + CELL / 2, seg.y * CELL + CELL / 2);
      } else {
        ctx.fillStyle = i % 2 === 0 ? "#00AAAA" : "#0000CC";
        ctx.fillRect(seg.x * CELL + 2, seg.y * CELL + 2, CELL - 4, CELL - 4);
        ctx.strokeStyle = "#FFE600";
        ctx.lineWidth = 1;
        ctx.strokeRect(seg.x * CELL + 2, seg.y * CELL + 2, CELL - 4, CELL - 4);
      }
    });

    if (s.dead) {
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
      ctx.fillStyle = "#FF2222";
      ctx.font = "bold 28px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", COLS * CELL / 2, ROWS * CELL / 2 - 20);
      ctx.fillStyle = "#FFE600";
      ctx.font = "12px 'Press Start 2P', monospace";
      ctx.fillText(`SCORE: ${s.score}`, COLS * CELL / 2, ROWS * CELL / 2 + 16);
      ctx.fillStyle = "#fff";
      ctx.font = "9px 'Press Start 2P', monospace";
      ctx.fillText("PRESS R TO RESTART", COLS * CELL / 2, ROWS * CELL / 2 + 44);
    }

    if (!s.started && !s.dead) {
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
      ctx.fillStyle = "#FFE600";
      ctx.font = "10px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.fillText("PRESS ARROW KEYS", COLS * CELL / 2, ROWS * CELL / 2 - 10);
      ctx.fillText("TO START", COLS * CELL / 2, ROWS * CELL / 2 + 14);
    }
  }, []);

  const tick = useCallback(() => {
    const s = stateRef.current;
    if (s.dead || !s.started) return;
    s.dir = s.nextDir;
    const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS || s.snake.some(seg => seg.x === head.x && seg.y === head.y)) {
      s.dead = true;
      setDead(true);
      draw();
      return;
    }
    s.snake.unshift(head);
    if (head.x === s.food.x && head.y === s.food.y) {
      s.score++;
      setScore(s.score);
      s.food = newFood(s.snake);
    } else {
      s.snake.pop();
    }
    draw();
  }, [draw]);

  const reset = useCallback(() => {
    const s = stateRef.current;
    s.snake = [{ x: 10, y: 9 }, { x: 9, y: 9 }, { x: 8, y: 9 }];
    s.dir = { x: 1, y: 0 };
    s.nextDir = { x: 1, y: 0 };
    s.food = newFood(s.snake);
    s.score = 0;
    s.dead = false;
    s.started = false;
    setScore(0);
    setDead(false);
    setStarted(false);
    draw();
  }, [draw]);

  useEffect(() => {
    draw();
    tickRef.current = setInterval(tick, TICK);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [tick, draw]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();
      if (e.key === "r" || e.key === "R") { reset(); return; }
      if (!s.started && ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
        s.started = true; setStarted(true);
      }
      if (e.key === "ArrowUp" && s.dir.y !== 1) s.nextDir = { x: 0, y: -1 };
      if (e.key === "ArrowDown" && s.dir.y !== -1) s.nextDir = { x: 0, y: 1 };
      if (e.key === "ArrowLeft" && s.dir.x !== 1) s.nextDir = { x: -1, y: 0 };
      if (e.key === "ArrowRight" && s.dir.x !== -1) s.nextDir = { x: 1, y: 0 };
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reset]);

  function dirBtn(dx: number, dy: number) {
    const s = stateRef.current;
    if (!s.started) { s.started = true; setStarted(true); }
    if (dy === -1 && s.dir.y !== 1) s.nextDir = { x: 0, y: -1 };
    if (dy === 1 && s.dir.y !== -1) s.nextDir = { x: 0, y: 1 };
    if (dx === -1 && s.dir.x !== 1) s.nextDir = { x: -1, y: 0 };
    if (dx === 1 && s.dir.x !== -1) s.nextDir = { x: 1, y: 0 };
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center justify-between w-full px-2">
        <span className="font-pixel" style={{ fontSize: "10px", color: "#FFE600" }}>SCORE: {score}</span>
        <button onClick={reset} className="xp-btn" style={{ fontSize: "9px", padding: "4px 10px", background: "#FF2222", color: "white" }}>R — RESTART</button>
      </div>
      <canvas ref={canvasRef} width={COLS * CELL} height={ROWS * CELL}
        style={{ border: "4px solid var(--ct-yellow)", display: "block", imageRendering: "pixelated" }} />
      {/* Mobile controls */}
      <div className="flex flex-col items-center gap-1 mt-1">
        <button onPointerDown={() => dirBtn(0, -1)} className="xp-btn" style={{ width: 44, padding: "6px 0", fontSize: "14px" }}>▲</button>
        <div className="flex gap-1">
          <button onPointerDown={() => dirBtn(-1, 0)} className="xp-btn" style={{ width: 44, padding: "6px 0", fontSize: "14px" }}>◀</button>
          <button onPointerDown={() => dirBtn(0, 1)} className="xp-btn" style={{ width: 44, padding: "6px 0", fontSize: "14px" }}>▼</button>
          <button onPointerDown={() => dirBtn(1, 0)} className="xp-btn" style={{ width: 44, padding: "6px 0", fontSize: "14px" }}>▶</button>
        </div>
      </div>
    </div>
  );
}
