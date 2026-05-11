import { useState, useCallback } from "react";

const COLS = 16;
const ROWS = 16;
const MINES = 32;

type Cell = {
  mine: boolean; revealed: boolean; flagged: boolean; adj: number;
};

function buildGrid(): Cell[][] {
  const grid: Cell[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ mine: false, revealed: false, flagged: false, adj: 0 }))
  );
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!grid[r][c].mine) { grid[r][c].mine = true; placed++; }
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr; const nc = c + dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc].mine) count++;
      }
      grid[r][c].adj = count;
    }
  }
  return grid;
}

function clone(grid: Cell[][]): Cell[][] {
  return grid.map(row => row.map(cell => ({ ...cell })));
}

function reveal(grid: Cell[][], r: number, c: number): Cell[][] {
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return grid;
  const cell = grid[r][c];
  if (cell.revealed || cell.flagged) return grid;
  cell.revealed = true;
  if (cell.adj === 0 && !cell.mine) {
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      reveal(grid, r + dr, c + dc);
    }
  }
  return grid;
}

const ADJ_COLORS = ["", "#0000FF", "#006600", "#FF0000", "#000099", "#660000", "#006666", "#000", "#555"];

export default function MinesweeperGame() {
  const [grid, setGrid] = useState<Cell[][]>(() => buildGrid());
  const [status, setStatus] = useState<"playing" | "won" | "dead">("playing");
  const [flagsLeft, setFlagsLeft] = useState(MINES);
  const [firstClick, setFirstClick] = useState(true);

  const reset = useCallback(() => {
    setGrid(buildGrid());
    setStatus("playing");
    setFlagsLeft(MINES);
    setFirstClick(true);
  }, []);

  function checkWin(g: Cell[][]): boolean {
    return g.every(row => row.every(cell => cell.mine ? true : cell.revealed));
  }

  function handleClick(r: number, c: number) {
    if (status !== "playing") return;
    const g = clone(grid);
    const cell = g[r][c];
    if (cell.flagged || cell.revealed) return;

    // On first click, regenerate if mine
    if (firstClick) {
      setFirstClick(false);
      if (cell.mine) {
        // Reroll until safe start
        let safe = buildGrid();
        while (safe[r][c].mine) safe = buildGrid();
        const ng = clone(safe);
        reveal(ng, r, c);
        setGrid(ng);
        if (checkWin(ng)) setStatus("won");
        return;
      }
    }

    if (cell.mine) {
      // Reveal all mines
      g.forEach(row => row.forEach(c => { if (c.mine) c.revealed = true; }));
      setGrid(g);
      setStatus("dead");
      return;
    }
    reveal(g, r, c);
    setGrid(g);
    if (checkWin(g)) setStatus("won");
  }

  function handleFlag(e: React.MouseEvent, r: number, c: number) {
    e.preventDefault();
    if (status !== "playing") return;
    const g = clone(grid);
    const cell = g[r][c];
    if (cell.revealed) return;
    if (!cell.flagged && flagsLeft === 0) return;
    cell.flagged = !cell.flagged;
    setFlagsLeft(fl => fl + (cell.flagged ? -1 : 1));
    setGrid(g);
  }

  function cellDisplay(cell: Cell, r: number, c: number) {
    if (!cell.revealed) {
      return (
        <button
          key={c}
          onClick={() => handleClick(r, c)}
          onContextMenu={e => handleFlag(e, r, c)}
          style={{
            width: 22, height: 22, fontSize: 12,
            background: "#c0c0c0",
            border: "3px solid",
            borderColor: "#fff #888 #888 #fff",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {cell.flagged ? "🚩" : ""}
        </button>
      );
    }
    // Revealed
    const isMine = cell.mine;
    return (
      <div
        key={c}
        style={{
          width: 22, height: 22, fontSize: 12,
          background: isMine ? "#FF2222" : "#d4d0c8",
          border: "1px solid #888",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Press Start 2P', monospace",
          fontWeight: "bold",
          color: isMine ? "white" : ADJ_COLORS[cell.adj] || "transparent",
          flexShrink: 0,
        }}
      >
        {isMine ? "💣" : cell.adj > 0 ? cell.adj : ""}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Header */}
      <div className="flex items-center justify-between w-full px-2">
        <span className="font-pixel" style={{ fontSize: "9px", color: "#FFE600" }}>
          🚩 {flagsLeft} left
        </span>
        <span className="font-pixel" style={{ fontSize: "9px", color: status === "won" ? "var(--ct-lime)" : status === "dead" ? "#FF2222" : "#FFE600" }}>
          {status === "won" ? "😺 YOU WIN!" : status === "dead" ? "💥 BOOM!" : "😼 PLAYING"}
        </span>
        <button onClick={reset} className="xp-btn" style={{ fontSize: "9px", padding: "4px 10px", background: "#FF2222", color: "white" }}>NEW GAME</button>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, 22px)`,
        gap: 1,
        background: "#888",
        border: "4px solid var(--ct-yellow)",
        padding: 4,
        overflowX: "auto",
      }}>
        {grid.map((row, r) =>
          row.map((cell, c) => cellDisplay(cell, r, c))
        )}
      </div>

      {status !== "playing" && (
        <button onClick={reset} className="xp-btn" style={{ background: status === "won" ? "var(--ct-blue)" : "var(--ct-red)", color: "white", fontSize: "10px" }}>
          {status === "won" ? "🎉 PLAY AGAIN" : "😿 TRY AGAIN"}
        </button>
      )}

      <div className="font-pixel text-center" style={{ fontSize: "8px", color: "#888" }}>
        LEFT CLICK = reveal &nbsp;|&nbsp; RIGHT CLICK = flag
      </div>
    </div>
  );
}
