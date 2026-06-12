/* ============================================================
   NUMBER PICKER — Main App JS
   ============================================================ */

// ── State ──────────────────────────────────────────────────
const state = {
  mode: 'wheel',          // 'wheel' | 'digital'
  isSpinning: false,
  min: 1,
  max: 100,
  segments: 8,
  lastResult: null,
  history: [],
  wheelColors: ['#D4A853','#8E6B3E','#C4956A','#7A5230','#E8C07A','#B07840','#DEBA90','#6B4120'],
  currentAngle: 0,
  animationId: null,
  velocity: 0,
  excludeNumbers: [],
};

// ── DOM refs ───────────────────────────────────────────────
const canvas = document.getElementById('wheel-canvas');
const ctx = canvas.getContext('2d');
const resultDisplay = document.getElementById('result-display');
const spinBtn = document.getElementById('spin-btn');
const modeToggleBtn = document.getElementById('mode-toggle');
const digitalSection = document.getElementById('digital-section');
const wheelSection = document.getElementById('wheel-section');
const minInput = document.getElementById('min-input');
const maxInput = document.getElementById('max-input');
const segmentsInput = document.getElementById('segments-input');
const historyList = document.getElementById('history-list');
const historyCount = document.getElementById('history-count');
const clearHistoryBtn = document.getElementById('clear-history');
const excludeInput = document.getElementById('exclude-input');
const resultBig = document.getElementById('digital-result');
const generateBtn = document.getElementById('generate-btn');

// ── Utility ────────────────────────────────────────────────
function clamp(val, min, max) { return Math.min(max, Math.max(min, val)); }

function getRandomInt(min, max, exclude = []) {
  const range = Array.from({length: max - min + 1}, (_, i) => i + min)
    .filter(n => !exclude.includes(n));
  if (!range.length) return min;
  return range[Math.floor(Math.random() * range.length)];
}

// ── Canvas Setup ───────────────────────────────────────────
function resizeCanvas() {
  const size = Math.min(canvas.parentElement.clientWidth, 420);
  canvas.width = size;
  canvas.height = size;
  drawWheel();
}

// ── Wheel Drawing ──────────────────────────────────────────
function buildWheelNumbers() {
  const nums = [];
  const step = Math.max(1, Math.round((state.max - state.min) / (state.segments - 1)));
  for (let i = 0; i < state.segments; i++) {
    nums.push(clamp(state.min + i * step, state.min, state.max));
  }
  nums[nums.length - 1] = state.max;
  return nums;
}

function drawWheel() {
  const size = canvas.width;
  const cx = size / 2, cy = size / 2, r = size / 2 - 8;
  ctx.clearRect(0, 0, size, size);

  const nums = buildWheelNumbers();
  const sliceAngle = (2 * Math.PI) / nums.length;

  // Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.18)';
  ctx.shadowBlur = 24;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.restore();

  // Slices
  nums.forEach((num, i) => {
    const startAngle = state.currentAngle + i * sliceAngle;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = state.wheelColors[i % state.wheelColors.length];
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Number label
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(startAngle + sliceAngle / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${clamp(size * 0.045, 11, 20)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 3;
    ctx.fillText(num, r - 14, 5);
    ctx.restore();
  });

  // Center circle
  const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.14);
  cGrad.addColorStop(0, '#FFF8EE');
  cGrad.addColorStop(1, '#E8C07A');
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.13, 0, 2 * Math.PI);
  ctx.fillStyle = cGrad;
  ctx.shadowColor = 'rgba(0,0,0,0.25)';
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.strokeStyle = '#D4A853';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Pointer arrow (top center)
  const pointerSize = size * 0.055;
  ctx.save();
  ctx.translate(cx, 6);
  ctx.fillStyle = '#C0392B';
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.moveTo(0, pointerSize * 1.6);
  ctx.lineTo(-pointerSize * 0.6, 0);
  ctx.lineTo(pointerSize * 0.6, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// ── Spin Physics ───────────────────────────────────────────
function getResultFromAngle() {
  const nums = buildWheelNumbers();
  const sliceAngle = (2 * Math.PI) / nums.length;
  // Pointer is at top (–π/2). Normalize angle.
  let normalized = ((-state.currentAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  // Add half-slice offset because pointer is top, angles start at right
  normalized = (normalized + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI);
  const idx = Math.floor(normalized / sliceAngle) % nums.length;
  return nums[idx];
}

function spinWheel() {
  if (state.isSpinning) return;
  state.isSpinning = true;
  spinBtn.disabled = true;
  spinBtn.textContent = 'Spinning…';
  resultDisplay.textContent = '?';
  resultDisplay.classList.remove('pop');

  const totalRotation = (5 + Math.random() * 6) * 2 * Math.PI;
  const duration = 3500 + Math.random() * 1500;
  const startAngle = state.currentAngle;
  const startTime = performance.now();

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function frame(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    state.currentAngle = startAngle + totalRotation * easeOut(t);
    drawWheel();

    if (t < 1) {
      state.animationId = requestAnimationFrame(frame);
    } else {
      state.currentAngle = startAngle + totalRotation;
      drawWheel();
      const result = getResultFromAngle();
      finishSpin(result);
    }
  }

  state.animationId = requestAnimationFrame(frame);
}

function finishSpin(result) {
  state.isSpinning = false;
  state.lastResult = result;
  spinBtn.disabled = false;
  spinBtn.textContent = 'Spin!';

  resultDisplay.textContent = result;
  resultDisplay.classList.remove('pop');
  void resultDisplay.offsetWidth;
  resultDisplay.classList.add('pop');

  addToHistory(result);
  showConfetti();
}

// ── Digital Mode ───────────────────────────────────────────
let digitalAnimInterval = null;

function generateDigital() {
  if (digitalAnimInterval) clearInterval(digitalAnimInterval);
  generateBtn.disabled = true;
  resultBig.classList.add('rolling');

  let ticks = 0;
  const totalTicks = 24;

  digitalAnimInterval = setInterval(() => {
    ticks++;
    const fake = getRandomInt(state.min, state.max, state.excludeNumbers);
    resultBig.textContent = fake;

    if (ticks >= totalTicks) {
      clearInterval(digitalAnimInterval);
      const final = getRandomInt(state.min, state.max, state.excludeNumbers);
      resultBig.textContent = final;
      resultBig.classList.remove('rolling');
      resultBig.classList.add('final-pop');
      setTimeout(() => resultBig.classList.remove('final-pop'), 600);
      state.lastResult = final;
      addToHistory(final);
      generateBtn.disabled = false;
      showConfetti();
    }
  }, 60);
}

// ── History ────────────────────────────────────────────────
function addToHistory(num) {
  state.history.unshift({ num, time: new Date().toLocaleTimeString() });
  if (state.history.length > 20) state.history.pop();
  renderHistory();
}

function renderHistory() {
  historyCount.textContent = state.history.length;
  if (!state.history.length) {
    historyList.innerHTML = '<li class="history-empty">No spins yet</li>';
    return;
  }
  historyList.innerHTML = state.history.map((h, i) =>
    `<li class="history-item ${i === 0 ? 'newest' : ''}">
      <span class="h-num">${h.num}</span>
      <span class="h-time">${h.time}</span>
    </li>`
  ).join('');
}

clearHistoryBtn.addEventListener('click', () => {
  state.history = [];
  renderHistory();
});

// ── Confetti ───────────────────────────────────────────────
function showConfetti() {
  const container = document.getElementById('confetti-container');
  container.innerHTML = '';
  const colors = ['#D4A853','#8E6B3E','#C4956A','#E8C07A','#C0392B','#27AE60','#2980B9','#8E44AD'];
  for (let i = 0; i < 52; i++) {
    const dot = document.createElement('div');
    dot.className = 'confetti-piece';
    dot.style.cssText = `
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-delay:${Math.random()*0.5}s;
      animation-duration:${0.9 + Math.random()*0.8}s;
      width:${6+Math.random()*7}px;
      height:${6+Math.random()*7}px;
      border-radius:${Math.random()>0.5?'50%':'2px'};
    `;
    container.appendChild(dot);
  }
  setTimeout(() => { container.innerHTML = ''; }, 2000);
}

// ── Settings ───────────────────────────────────────────────
function applySettings() {
  const min = parseInt(minInput.value) || 1;
  const max = parseInt(maxInput.value) || 100;
  const segs = clamp(parseInt(segmentsInput.value) || 8, 2, 16);

  state.min = Math.min(min, max - 1);
  state.max = Math.max(max, min + 1);
  state.segments = segs;

  minInput.value = state.min;
  maxInput.value = state.max;
  segmentsInput.value = state.segments;

  drawWheel();
}

[minInput, maxInput, segmentsInput].forEach(el => {
  el.addEventListener('change', applySettings);
});

excludeInput.addEventListener('change', () => {
  state.excludeNumbers = excludeInput.value
    .split(',')
    .map(s => parseInt(s.trim()))
    .filter(n => !isNaN(n));
});

// ── Mode Toggle ────────────────────────────────────────────
modeToggleBtn.addEventListener('click', () => {
  state.mode = state.mode === 'wheel' ? 'digital' : 'wheel';
  const isDigital = state.mode === 'digital';

  wheelSection.classList.toggle('hidden', isDigital);
  digitalSection.classList.toggle('hidden', !isDigital);
  modeToggleBtn.innerHTML = isDigital
    ? '<span class="mode-icon">🎡</span> Switch to Spin Wheel'
    : '<span class="mode-icon">🔢</span> Switch to Digital Picker';
  modeToggleBtn.classList.toggle('digital-active', isDigital);
});

// ── Spin Button ────────────────────────────────────────────
spinBtn.addEventListener('click', spinWheel);
generateBtn.addEventListener('click', generateDigital);

// ── Copy result ────────────────────────────────────────────
document.getElementById('copy-result')?.addEventListener('click', () => {
  const val = state.lastResult;
  if (val === null) return;
  navigator.clipboard.writeText(String(val)).then(() => {
    const btn = document.getElementById('copy-result');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1500);
  });
});

// ── FAQ accordion ─────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Scroll animations ──────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
}, { threshold: 0.12 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ── Init ───────────────────────────────────────────────────
renderHistory();
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
