const ROWS = 6, COLS = 7;
let board, gameOver, difficulty = 'medium', busy = false;
const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');

function init() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  gameOver = false;
  busy = false;
  boardEl.innerHTML = '';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.onclick = () => play(c);
      boardEl.appendChild(cell);
    }
  }
  setStatus('YOUR TURN', 'cyan');
}

function setStatus(text, theme) {
  statusEl.className = `status title-font ${theme || ''}`;
  statusEl.textContent = text;
}

function drop(col, player) {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === 0) {
      board[r][col] = player;
      return r;
    }
  }
  return -1;
}

function render(r, c) {
  const cell = [...boardEl.children].find(x => +x.dataset.r === r && +x.dataset.c === c);
  const disc = document.createElement('div');
  disc.className = `disc ${board[r][c] === 1 ? 'p1' : 'p2'}`;
  cell.appendChild(disc);
}

function play(col) {
  if (gameOver || busy || board[0][col] !== 0) return;
  const r = drop(col, 1);
  render(r, col);
  if (check(1)) return end(1);
  if (full()) return end(0);
  busy = true;
  setStatus('AI THINKING...', 'pink');
  setTimeout(aiMove, 550);
}

function aiMove() {
  const col = chooseCol();
  const r = drop(col, 2);
  render(r, col);
  if (check(2)) return end(2);
  if (full()) return end(0);
  busy = false;
  setStatus('YOUR TURN', 'cyan');
}

function validCols() {
  return [...Array(COLS).keys()].filter(c => board[0][c] === 0);
}

function firstEmpty(c) {
  for (let r = ROWS - 1; r >= 0; r--) if (board[r][c] === 0) return r;
  return -1;
}

function allLines() {
  const lines = [];
  const dirs = [[0,1], [1,0], [1,1], [1,-1]];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      for (const [dr, dc] of dirs) {
        const cells = [];
        for (let k = 0; k < 4; k++) {
          const nr = r + dr * k, nc = c + dc * k;
          if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) { cells.length = 0; break; }
          cells.push([nr, nc]);
        }
        if (cells.length === 4) lines.push(cells);
      }
    }
  }
  return lines;
}

function check(p) {
  for (const line of allLines()) {
    if (line.every(([r, c]) => board[r][c] === p)) {
      highlight(line);
      return true;
    }
  }
  return false;
}

function highlight(line) {
  line.forEach(([r, c]) => {
    const cell = [...boardEl.children].find(x => +x.dataset.r === r && +x.dataset.c === c);
    cell.firstChild?.classList.add('win');
  });
}

function full() {
  return board[0].every(v => v !== 0);
}

function score() {
  let s = 0;
  for (const line of allLines()) {
    const vals = line.map(([r, c]) => board[r][c]);
    const ai = vals.filter(v => v === 2).length;
    const me = vals.filter(v => v === 1).length;
    const empty = vals.filter(v => v === 0).length;
    if (me === 0) {
      if (ai === 3 && empty === 1) s += 50;
      else if (ai === 2 && empty === 2) s += 10;
    }
    if (ai === 0 && me === 3 && empty === 1) s -= 60;
  }
  return s;
}

function chooseCol() {
  const cols = validCols();
  for (const p of [2, 1]) {
    for (const c of cols) {
      const r = firstEmpty(c);
      board[r][c] = p;
      const w = check(p);
      board[r][c] = 0;
      if (w && (p === 2 || difficulty !== 'easy')) return c;
    }
  }
  if (difficulty === 'hard') {
    let best = -1e9, bc = cols[0];
    for (const c of cols) {
      const r = firstEmpty(c);
      board[r][c] = 2;
      const s = score() + (c === 3 ? 4 : (c === 2 || c === 4 ? 2 : 0));
      board[r][c] = 0;
      if (s > best) { best = s; bc = c; }
    }
    return bc;
  }
  if (difficulty === 'medium' && Math.random() < 0.6) {
    return cols.reduce((a, c) => Math.abs(c - 3) < Math.abs(a - 3) ? c : a, cols[0]);
  }
  return cols[Math.floor(Math.random() * cols.length)];
}

function end(w) {
  gameOver = true;
  busy = false;
  if (w === 1) setStatus('YOU WIN!', 'neon-text');
  else if (w === 2) setStatus('AI WINS!', 'pink');
  else setStatus('DRAW!', 'purple');
}

document.querySelectorAll('.diffBtn').forEach(btn => {
  btn.onclick = () => {
    difficulty = btn.dataset.diff;
    document.querySelectorAll('.diffBtn').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    init();
  };
});

document.getElementById('reset').onclick = init;

window.onload = () => {
  document.querySelector('[data-diff="medium"]').classList.add('active');
  init();
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.style.opacity = 0;
    setTimeout(() => loader.remove(), 550);
  }, 1200);
};