// ============ RANDOM NUMBER PICKER LOGIC ============
(function () {
  const minInput = document.getElementById("min-input");
  const maxInput = document.getElementById("max-input");
  const noRepeatCheck = document.getElementById("no-repeat-check");
  const reel = document.getElementById("reel");
  const reelDisplay = document.getElementById("reel-display");
  const pickBtn = document.getElementById("pick-btn");
  const historyRow = document.getElementById("history-row");

  const CHIP_COLORS = ["#2E5EFF", "#FF3D81", "#22C55E", "#FF9F1C"];
  let usedNumbers = new Set();
  let spinning = false;

  function cryptoRandomInt(min, max) {
    // inclusive random integer using crypto API for unbiased results
    const range = max - min + 1;
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return min + (array[0] % range);
  }

  function getRange() {
    let min = parseInt(minInput.value, 10);
    let max = parseInt(maxInput.value, 10);
    if (isNaN(min)) min = 1;
    if (isNaN(max)) max = 100;
    if (min > max) [min, max] = [max, min];
    return { min, max };
  }

  function pickNumber() {
    if (spinning) return;
    const { min, max } = getRange();

    if (noRepeatCheck.checked && usedNumbers.size >= max - min + 1) {
      usedNumbers.clear(); // pool exhausted, reset silently and continue
    }

    let result;
    let guard = 0;
    do {
      result = cryptoRandomInt(min, max);
      guard++;
    } while (noRepeatCheck.checked && usedNumbers.has(result) && guard < 5000);

    usedNumbers.add(result);
    spinReel(result, min, max);
  }

  function spinReel(result, min, max) {
    spinning = true;
    pickBtn.disabled = true;
    reel.classList.add("spinning");
    reel.classList.remove("landed");

    let ticks = 0;
    const maxTicks = 16;
    const interval = setInterval(() => {
      const fake = cryptoRandomInt(min, max);
      reelDisplay.textContent = fake;
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        reelDisplay.textContent = result;
        reel.classList.remove("spinning");
        reel.classList.add("landed");
        spinning = false;
        pickBtn.disabled = false;
        addHistoryChip(result);
        spinWheelTo(result, min, max);
      }
    }, 55);
  }

  function addHistoryChip(value) {
    const chip = document.createElement("span");
    chip.className = "history-chip";
    chip.textContent = value;
    chip.style.background = CHIP_COLORS[Math.floor(Math.random() * CHIP_COLORS.length)];
    historyRow.prepend(chip);
    while (historyRow.children.length > 10) {
      historyRow.removeChild(historyRow.lastChild);
    }
  }

  pickBtn.addEventListener("click", pickNumber);

  noRepeatCheck.addEventListener("change", () => usedNumbers.clear());
  minInput.addEventListener("change", () => usedNumbers.clear());
  maxInput.addEventListener("change", () => usedNumbers.clear());

  // ============ NUMBER PICKER WHEEL (decorative SVG) ============
  const wheelSegmentsGroup = document.getElementById("wheel-segments");
  const wheelSvg = document.getElementById("wheel-svg");
  const WHEEL_COLORS = ["#2E5EFF", "#FF3D81", "#22C55E", "#FF9F1C"];
  const SEGMENT_COUNT = 10;
  let wheelRotation = 0;

  function buildWheel() {
    if (!wheelSegmentsGroup) return;
    wheelSegmentsGroup.innerHTML = "";
    const cx = 150, cy = 150, r = 130;
    const anglePer = 360 / SEGMENT_COUNT;

    for (let i = 0; i < SEGMENT_COUNT; i++) {
      const startAngle = (i * anglePer - 90) * (Math.PI / 180);
      const endAngle = ((i + 1) * anglePer - 90) * (Math.PI / 180);
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute(
        "d",
        `M${cx},${cy} L${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 0,1 ${x2.toFixed(2)},${y2.toFixed(2)} Z`
      );
      path.setAttribute("fill", WHEEL_COLORS[i % WHEEL_COLORS.length]);
      path.setAttribute("opacity", "0.88");
      wheelSegmentsGroup.appendChild(path);

      const midAngle = (startAngle + endAngle) / 2;
      const labelX = cx + (r - 30) * Math.cos(midAngle);
      const labelY = cy + (r - 30) * Math.sin(midAngle);
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", labelX.toFixed(2));
      label.setAttribute("y", labelY.toFixed(2));
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("font-family", "JetBrains Mono, monospace");
      label.setAttribute("font-weight", "700");
      label.setAttribute("font-size", "16");
      label.setAttribute("fill", "#ffffff");
      label.textContent = (i + 1) * 7 - 3; // decorative sample numbers
      wheelSegmentsGroup.appendChild(label);
    }
  }

  function spinWheelTo() {
    if (!wheelSvg) return;
    wheelRotation += 720 + Math.floor(Math.random() * 360);
    wheelSvg.style.animation = "none";
    wheelSvg.style.transition = "transform 1.6s cubic-bezier(.15,.8,.2,1)";
    wheelSvg.style.transform = `rotate(${wheelRotation}deg)`;
  }

  buildWheel();
})();
