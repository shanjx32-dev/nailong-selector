(() => {
  "use strict";

  const byId = (id) => document.getElementById(id);
  const ui = {
    arena: byId("arena"),
    stage: byId("chaseStage"), world: byId("chaseWorld"), runners: byId("chaseRunners"),
    hunter: byId("chaseHunter"), event: byId("chaseEvent"), phase: byId("chasePhase"),
    timer: byId("chaseTimer"), progress: byId("chaseProgress"), count: byId("chaseCount"),
    spark: byId("chaseSpark"), searchlight: byId("chaseSearchlight")
  };
  let frame = 0;
  let active = false;
  let complete = null;

  function cleanup() {
    active = false;
    cancelAnimationFrame(frame);
    ui.stage.hidden = true;
    ui.stage.setAttribute("aria-hidden", "true");
    ui.stage.className = "chase-stage";
    ui.arena.classList.remove("is-chasing");
    ui.runners.replaceChildren();
    ui.event.textContent = "";
    ui.spark.classList.remove("is-active");
    ui.hunter.classList.remove("is-lunging");
    if (complete) { complete(); complete = null; }
  }

  function run({ roster, winnerIndex, reducedMotion, translate, sound, finishSound }) {
    cleanup();
    active = true;
    ui.stage.hidden = false;
    ui.stage.setAttribute("aria-hidden", "false");
    ui.arena.classList.add("is-chasing");
    const duration = reducedMotion ? 3600 : 17800;
    const W = Math.max(200, ui.world.clientWidth);
    const H = Math.max(250, ui.world.clientHeight);
    const inset = Math.min(35, W * 0.055);
    const rand = (a, b) => a + Math.random() * (b - a);
    const middleX = W * 0.5;
    const middleY = H * 0.53;
    const cols = Math.ceil(Math.sqrt(roster.length * W / H));
    const rows = Math.ceil(roster.length / cols);
    const runners = roster.map((name, index) => {
      const chip = document.createElement("div");
      chip.className = "chase-runner";
      if (/^(山君行|kestrel)$/iu.test(name.replace(/\s/g, "")) || (name.includes("山君行") && /kestrel/i.test(name))) chip.classList.add("is-crowned");
      chip.style.setProperty("--chase-hue", String((index * 61 + 184) % 360));
      const dot = document.createElement("i");
      const label = document.createElement("b"); label.textContent = name;
      chip.append(dot, label);
      ui.runners.append(chip);
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = Math.min(W - inset, Math.max(inset, (col + 0.5) * W / cols + rand(-9, 9)));
      const y = Math.min(H - 36, Math.max(38, (row + 0.5) * (H - 62) / rows + 34 + rand(-8, 8)));
      return { name, index, chip, x, y, vx: rand(-68, 68), vy: rand(-55, 55),
        seed: rand(0, 20), bubbleUntil: 0, dashUntil: 0 };
    });
    if (roster.length > 35) ui.stage.classList.add("is-dense");
    if (roster.length > 85) ui.stage.classList.add("is-crowded");
    ui.count.textContent = translate("chaseRemaining", runners.length);
    ui.phase.textContent = translate("chaseWake");
    ui.event.textContent = "";
    const hunter = { x: middleX, y: middleY, vx: 0, vy: 0, target: null };
    let previous = 0;
    let lastPaint = 0;
    let start = 0;
    let nextGrab = 3750;
    let lastTarget = -1;
    const triggered = new Set();
    const surprises = [
      { key: "lights", text: "chaseLights", pitch: 330, style: "is-blackout" },
      { key: "slide", text: "chaseSlide", pitch: 620, style: "is-sliding" },
      { key: "pillows", text: "chasePillows", pitch: 920, style: "is-pillow-storm" }
    ].sort(() => Math.random() - 0.5);
    let caught = false;
    const eventAt = (key, message, pitch) => {
      if (triggered.has(key)) return;
      triggered.add(key);
      ui.event.textContent = message;
      ui.event.classList.remove("is-visible");
      void ui.event.offsetWidth;
      ui.event.classList.add("is-visible");
      if (pitch) sound(pitch, 0.12);
    };
    const pulse = (x, y) => {
      ui.spark.style.left = `${x}px`;
      ui.spark.style.top = `${y}px`;
      ui.spark.classList.remove("is-active");
      void ui.spark.offsetWidth;
      ui.spark.classList.add("is-active");
    };
    function tick(now) {
      if (!active) return;
      if (!start) start = now;
      if (roster.length > 80 && now - lastPaint < 30) {
        frame = requestAnimationFrame(tick);
        return;
      }
      lastPaint = now;
      const elapsed = Math.min(duration, now - start);
      const dt = Math.min(0.034, (now - (previous || now)) / 1000);
      previous = now;
      const p = elapsed / duration;
      const sleeping = p < 0.11;
      const final = p > 0.78;
      const catching = p > 0.92;
      ui.stage.classList.toggle("is-awake", !sleeping);
      ui.stage.classList.toggle("is-final", final);
      ui.stage.classList.toggle("is-catching", catching);
      ui.timer.textContent = ((duration - elapsed) / 1000).toFixed(1);
      ui.progress.style.transform = `scaleX(${p})`;
      if (!sleeping) eventAt("wake", translate("chaseRun"), 720);
      [0.31, 0.47, 0.61].forEach((threshold, index) => {
        const surprise = surprises[index];
        ui.stage.classList.toggle(surprise.style, p >= threshold && p < threshold + 0.11);
        if (p >= threshold) eventAt(surprise.key, translate(surprise.text), surprise.pitch);
      });
      if (final) { ui.phase.textContent = translate("chaseFinal"); eventAt("final", translate("chaseFinal"), 1040); }
      else ui.phase.textContent = translate(sleeping ? "chaseWake" : "chaseRun");

      const winner = runners[winnerIndex];
      if (final) hunter.target = winner;
      else if (!hunter.target || elapsed - lastTarget > 850) {
        let best = null;
        let distance = Infinity;
        for (const contender of runners) {
          if (contender.bubbleUntil > elapsed) continue;
          const d = (contender.x - hunter.x) ** 2 + (contender.y - hunter.y) ** 2;
          if (d < distance) { best = contender; distance = d; }
        }
        hunter.target = best || winner;
        lastTarget = elapsed;
      }

      for (const runner of runners) {
        if (!sleeping && !catching) {
          const dx = runner.x - hunter.x;
          const dy = runner.y - hunter.y;
          const distance = Math.hypot(dx, dy) || 1;
          const flee = Math.max(0, 1 - distance / Math.max(140, W * 0.28));
          runner.vx += (dx / distance * flee * 390 + Math.sin(elapsed * 0.0018 + runner.seed) * 70) * dt;
          runner.vy += (dy / distance * flee * 310 + Math.cos(elapsed * 0.0021 + runner.seed) * 66) * dt;
          if (ui.stage.classList.contains("is-sliding")) { runner.vx += Math.sin(runner.seed * 8) * 110 * dt; runner.vy += 35 * dt; }
          const limit = final ? 205 : 145;
          const speed = Math.hypot(runner.vx, runner.vy) || 1;
          if (speed > limit) { runner.vx *= limit / speed; runner.vy *= limit / speed; }
          runner.x += runner.vx * dt;
          runner.y += runner.vy * dt;
          if (runner.x < inset || runner.x > W - inset) { runner.x = Math.min(W - inset, Math.max(inset, runner.x)); runner.vx *= -0.85; }
          if (runner.y < 30 || runner.y > H - 29) { runner.y = Math.min(H - 29, Math.max(30, runner.y)); runner.vy *= -0.85; }
          runner.vx *= 1 - dt * 0.22;
          runner.vy *= 1 - dt * 0.22;
        }
        runner.chip.style.transform = `translate3d(${runner.x}px, ${runner.y}px, 0) translate(-50%, -50%)`;
        runner.chip.classList.toggle("is-bubbled", runner.bubbleUntil > elapsed);
        runner.chip.classList.toggle("is-targeted", final && runner === winner);
      }
      if (!sleeping && !catching) {
        const cells = new Map();
        const cellSize = roster.length > 85 ? 28 : 42;
        for (const runner of runners) {
          const cx = Math.floor(runner.x / cellSize);
          const cy = Math.floor(runner.y / cellSize);
          for (let ox = -1; ox <= 1; ox += 1) {
            for (let oy = -1; oy <= 1; oy += 1) {
              const neighbors = cells.get(`${cx + ox}:${cy + oy}`) || [];
              for (const other of neighbors) {
                const dx = runner.x - other.x;
                const dy = runner.y - other.y;
                const distance = Math.hypot(dx, dy) || 0.1;
                if (distance > cellSize * 0.72) continue;
                const impulse = Math.min(50, (cellSize * 0.72 - distance) * 2.5);
                runner.vx += dx / distance * impulse;
                runner.vy += dy / distance * impulse;
                other.vx -= dx / distance * impulse;
                other.vy -= dy / distance * impulse;
              }
            }
          }
          const key = `${cx}:${cy}`;
          if (!cells.has(key)) cells.set(key, []);
          cells.get(key).push(runner);
        }
      }
      if (!sleeping) {
        const target = hunter.target || winner;
        const dx = target.x - hunter.x;
        const dy = target.y - hunter.y;
        const d = Math.hypot(dx, dy) || 1;
        const drive = catching ? 440 : final ? 210 : 135;
        hunter.vx += dx / d * drive * dt;
        hunter.vy += dy / d * drive * dt;
        const topSpeed = catching ? 520 : final ? 175 : 126;
        const speed = Math.hypot(hunter.vx, hunter.vy) || 1;
        if (speed > topSpeed) { hunter.vx *= topSpeed / speed; hunter.vy *= topSpeed / speed; }
        hunter.x = Math.min(W - 46, Math.max(46, hunter.x + hunter.vx * dt));
        hunter.y = Math.min(H - 45, Math.max(55, hunter.y + hunter.vy * dt));
        hunter.vx *= 1 - dt * 0.8;
        hunter.vy *= 1 - dt * 0.8;
        if (!final && elapsed > nextGrab) {
          const near = d < 125 ? target : runners[Math.floor(Math.random() * runners.length)];
          ui.hunter.classList.remove("is-lunging");
          void ui.hunter.offsetWidth;
          ui.hunter.classList.add("is-lunging");
          pulse(near.x, near.y);
          if (d < 85 && Math.random() > 0.45) {
            near.bubbleUntil = elapsed + 1050;
            eventAt(`bubble-${Math.floor(elapsed)}`, translate("chaseBubble", near.name), 760);
          } else eventAt(`miss-${Math.floor(elapsed)}`, translate("chaseMiss"), 310);
          nextGrab = elapsed + 2100 + Math.random() * 750;
        }
      }
      ui.hunter.style.transform = `translate3d(${hunter.x}px, ${hunter.y}px, 0) translate(-50%, -50%) rotate(${Math.max(-9, Math.min(9, hunter.vx * 0.075))}deg)`;
      ui.searchlight.style.transform = `translate3d(${hunter.x}px, ${hunter.y}px, 0) translate(-50%, -50%)`;
      if (catching && !caught && (Math.hypot(winner.x - hunter.x, winner.y - hunter.y) < 52 || p > 0.985)) {
        caught = true;
        winner.chip.classList.add("is-caught");
        ui.stage.classList.add("has-caught");
        ui.phase.textContent = translate("chaseWinner");
        eventAt("caught", translate("chaseCaught", winner.name), 1200);
        pulse(winner.x, winner.y);
        finishSound();
      }
      if (elapsed >= duration) {
        if (!caught) { winner.chip.classList.add("is-caught"); eventAt("caught", translate("chaseCaught", winner.name), 1200); finishSound(); }
        window.setTimeout(cleanup, reducedMotion ? 180 : 550);
        return;
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return new Promise((resolve) => { complete = resolve; });
  }
  window.NailoongChase = { run, cleanup };
})();
