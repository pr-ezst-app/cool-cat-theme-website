import { useEffect, useRef, useState, useCallback } from "react";

const W = 480;
const H = 300;
const PAD_W = 10;
const PAD_H = 60;
const BALL_SIZE = 10;
const PAD_SPEED = 5;
const WINNING = 7;

type GameState = {
  ballX: number; ballY: number;
  ballDX: number; ballDY: number;
  p1Y: number; p2Y: number;
  score1: number; score2: number;
  started: boolean; over: boolean; winner: number;
  keys: Set<string>;
};

function freshState(): GameState {
  return {
    ballX: W / 2, ballY: H / 2,
    ballDX: 3.5 * (Math.random() > 0.5 ? 1 : -1),
    ballDY: 2.5 * (Math.random() > 0.5 ? 1 : -1),
    p1Y: H / 2 - PAD_H / 2,
    p2Y: H / 2 - PAD_H / 2,
    score1: 0, score2: 0,
    started: false, over: false, winner: 0,
    keys: new Set(),
  };
}

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(freshState());
  const rafRef = useRef<number>(0);
  const [scores, setScores] = useState([0, 0]);
  const [over, setOver] = useState(false);
  const [winner, setWinner] = useState(0);
  const [started, setStarted] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const s = stateRef.current;

    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);

    // Center line
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = "#333"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();
    ctx.setLineDash([]);

    // Score
    ctx.fillStyle = "#FFE600";
    ctx.font = "bold 28px 'Press Start 2P', monospace";
    ctx.textAlign = "center";
    ctx.fillText(`${s.score1}`, W / 2 - 60, 40);
    ctx.fillText(`${s.score2}`, W / 2 + 60, 40);

    // Paddles
    ctx.fillStyle = "#FFE600";
    ctx.fillRect(8, s.p1Y, PAD_W, PAD_H);
    ctx.fillRect(W - 8 - PAD_W, s.p2Y, PAD_W, PAD_H);

    // Ball — cat face
    ctx.font = `${BALL_SIZE * 2}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🐱", s.ballX, s.ballY);

    // Labels
    ctx.fillStyle = "#555";
    ctx.font = "7px 'Press Start 2P', monospace";
    ctx.textAlign = "left"; ctx.textBaseline = "bottom";
    ctx.fillText("W/S", 12, H - 4);
    ctx.textAlign = "right";
    ctx.fillText("↑/↓", W - 12, H - 4);

    if (!s.started && !s.over) {
      ctx.fillStyle = "rgba(0,0,0,0.65)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#FFE600";
      ctx.font = "10px 'Press Start 2P', monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("PRESS SPACE TO START", W / 2, H / 2 - 10);
      ctx.fillStyle = "#aaa";
      ctx.font = "8px 'Press Start 2P', monospace";
      ctx.fillText("P1: W/S   P2: ↑/↓", W / 2, H / 2 + 16);
    }

    if (s.over) {
      ctx.fillStyle = "rgba(0,0,0,0.72)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#FF2222";
      ctx.font = "20px 'Press Start 2P', monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(`PLAYER ${s.winner} WINS!`, W / 2, H / 2 - 18);
      ctx.fillStyle = "#FFE600";
      ctx.font = "9px 'Press Start 2P', monospace";
      ctx.fillText("PRESS R TO RESTART", W / 2, H / 2 + 16);
    }
  }, []);

  const loop = useCallback(() => {
    const s = stateRef.current;
    if (!s.started || s.over) { draw(); rafRef.current = requestAnimationFrame(loop); return; }

    // Move paddles
    if (s.keys.has("w") || s.keys.has("W")) s.p1Y = Math.max(0, s.p1Y - PAD_SPEED);
    if (s.keys.has("s") || s.keys.has("S")) s.p1Y = Math.min(H - PAD_H, s.p1Y + PAD_SPEED);
    if (s.keys.has("ArrowUp")) s.p2Y = Math.max(0, s.p2Y - PAD_SPEED);
    if (s.keys.has("ArrowDown")) s.p2Y = Math.min(H - PAD_H, s.p2Y + PAD_SPEED);

    // Move ball
    s.ballX += s.ballDX; s.ballY += s.ballDY;

    // Wall bounce top/bottom
    if (s.ballY <= BALL_SIZE || s.ballY >= H - BALL_SIZE) s.ballDY *= -1;

    // Paddle 1 hit
    if (s.ballX - BALL_SIZE <= 18 + PAD_W && s.ballY >= s.p1Y && s.ballY <= s.p1Y + PAD_H && s.ballDX < 0) {
      s.ballDX = Math.abs(s.ballDX) * 1.05;
      const rel = (s.ballY - (s.p1Y + PAD_H / 2)) / (PAD_H / 2);
      s.ballDY = rel * 4;
    }
    // Paddle 2 hit
    if (s.ballX + BALL_SIZE >= W - 18 - PAD_W && s.ballY >= s.p2Y && s.ballY <= s.p2Y + PAD_H && s.ballDX > 0) {
      s.ballDX = -Math.abs(s.ballDX) * 1.05;
      const rel = (s.ballY - (s.p2Y + PAD_H / 2)) / (PAD_H / 2);
      s.ballDY = rel * 4;
    }

    // Score
    if (s.ballX < 0) {
      s.score2++;
      setScores([s.score1, s.score2]);
      if (s.score2 >= WINNING) { s.over = true; s.winner = 2; setOver(true); setWinner(2); }
      else { s.ballX = W / 2; s.ballY = H / 2; s.ballDX = -3.5; s.ballDY = 2.5 * (Math.random() > 0.5 ? 1 : -1); }
    }
    if (s.ballX > W) {
      s.score1++;
      setScores([s.score1, s.score2]);
      if (s.score1 >= WINNING) { s.over = true; s.winner = 1; setOver(true); setWinner(1); }
      else { s.ballX = W / 2; s.ballY = H / 2; s.ballDX = 3.5; s.ballDY = 2.5 * (Math.random() > 0.5 ? 1 : -1); }
    }

    // Speed cap
    const speed = Math.sqrt(s.ballDX ** 2 + s.ballDY ** 2);
    if (speed > 9) { s.ballDX = (s.ballDX / speed) * 9; s.ballDY = (s.ballDY / speed) * 9; }

    draw();
    rafRef.current = requestAnimationFrame(loop);
  }, [draw]);

  const reset = useCallback(() => {
    stateRef.current = freshState();
    setScores([0, 0]); setOver(false); setWinner(0); setStarted(false);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loop]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (["ArrowUp","ArrowDown"," "].includes(e.key)) e.preventDefault();
      if (e.key === " " && !s.started && !s.over) { s.started = true; setStarted(true); }
      if ((e.key === "r" || e.key === "R") && s.over) reset();
      s.keys.add(e.key);
    };
    const up = (e: KeyboardEvent) => { stateRef.current.keys.delete(e.key); };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [reset]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center justify-between w-full px-2">
        <span className="font-pixel" style={{ fontSize: "9px", color: "#FFE600" }}>
          P1: {scores[0]} — P2: {scores[1]}
        </span>
        <button onClick={reset} className="xp-btn" style={{ fontSize: "9px", padding: "4px 10px", background: "#FF2222", color: "white" }}>R — RESTART</button>
      </div>
      <canvas ref={canvasRef} width={W} height={H}
        style={{ border: "4px solid var(--ct-yellow)", display: "block", maxWidth: "100%" }} />
      {!started && !over && (
        <button onClick={() => { stateRef.current.started = true; setStarted(true); }}
          className="xp-btn" style={{ background: "var(--ct-blue)", color: "white", fontSize: "10px" }}>
          ▶ START GAME
        </button>
      )}
      {over && (
        <button onClick={reset} className="xp-btn" style={{ background: "var(--ct-red)", color: "white", fontSize: "10px" }}>
          PLAYER {winner} WON! PLAY AGAIN
        </button>
      )}
    </div>
  );
}
