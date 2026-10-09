(() => {
  "use strict";

  const stage = document.getElementById("pinballStage");
  const canvas = document.getElementById("pinballCanvas");
  const timer = document.getElementById("pinballTime");
  const focus = document.getElementById("pinballFocus");
  const impact = document.getElementById("pinballImpact");
  const outcome = document.getElementById("pinballOutcome");
  const arena = document.getElementById("arena");
  const ctx = canvas.getContext("2d");
  const crest = new Image();
  crest.src = "./assets/wlsa-crest.jpeg";
  let running = false;
  let frame = 0;
  let resolver = null;

  function cleanup() {
    running = false;
    cancelAnimationFrame(frame);
    stage.hidden = true;
    stage.setAttribute("aria-hidden", "true");
    arena.classList.remove("is-pinball");
    stage.classList.remove("has-landed");
    impact.classList.remove("is-active");
    outcome.classList.remove("is-visible");
    outcome.textContent = "";
    if (resolver) { resolver(); resolver = null; }
  }

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

  function run({ roster, winnerIndex, reducedMotion, isCrowned, translate, sound }) {
    cleanup();
    running = true;
    stage.hidden = false;
    stage.setAttribute("aria-hidden", "false");
    arena.classList.add("is-pinball");
    timer.textContent = "8.0";
    focus.textContent = translate("pinballReady", roster.length);

    const duration = reducedMotion ? 700 : 8000;
    const travelTime = reducedMotion ? 500 : 7200;
    const slotWidth = roster.length > 70 ? 84 : 100;
    const worldWidth = Math.max(canvas.clientWidth, roster.length * slotWidth);
    const target = (winnerIndex + .5) * (worldWidth / roster.length);
    let x = clamp(target + (Math.random() - .5) * Math.min(worldWidth * .65, 1350), 28, worldWidth - 28);
    let vx = (Math.random() - .5) * 205;
    let cameraX = clamp(x - Math.max(1, canvas.clientWidth) * .5, 0, Math.max(0, worldWidth - canvas.clientWidth));
    let start = 0;
    let previous = 0;
    let rowHit = -1;
    let lastSound = 0;
    let hits = 0;
    let announced = false;
    const trail = [];
    const sparks = [];
    const portalTimes = reducedMotion || Math.random() < .15 ? []
      : Math.random() < .4 ? [.24 + Math.random() * .07, .53 + Math.random() * .06]
      : [.33 + Math.random() * .16];
    let portalIndex = 0;
    let portal = null;
    let verticalLift = 0;
    let liftBorn = 0;
    const colors = document.body.classList.contains("theme-wlsa")
      ? { wood: "#a9c6d2", woodDark: "#506d80", glow: "#68d9ff", line: "#73bfe9", ink: "#e2f4ff", dim: "#5595b5" }
      : { wood: "#d8af77", woodDark: "#8d5c36", glow: "#ffde81", line: "#eac18b", ink: "#fff1cf", dim: "#a98860" };

    function rounded(x, y, width, height, radius, fill, stroke, lineWidth = 1) {
      ctx.beginPath();
      ctx.roundRect(x, y, Math.max(0, width), Math.max(0, height), radius);
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (stroke) { ctx.lineWidth = lineWidth; ctx.strokeStyle = stroke; ctx.stroke(); }
    }

    function drawPeg(px, py, tilt, hot) {
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(tilt);
      ctx.shadowColor = "#000b";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 5;
      const grain = ctx.createLinearGradient(0, -7, 0, 7);
      grain.addColorStop(0, "#f5d7a4");
      grain.addColorStop(.25, colors.wood);
      grain.addColorStop(1, colors.woodDark);
      rounded(-23, -6, 46, 12, 5, grain, "#ffe1b766", 1);
      ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
      ctx.fillStyle = "#fff8de9c";
      rounded(-18, -3.5, 33, 1.5, 1, ctx.fillStyle);
      ctx.restore();
      ctx.save();
      ctx.shadowColor = hot ? colors.glow : "#96b7d688";
      ctx.shadowBlur = hot ? 18 : 5;
      ctx.beginPath(); ctx.arc(px, py + 13, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = hot ? colors.glow : "#7197ad"; ctx.fill();
      ctx.beginPath(); ctx.arc(px, py + 13, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#f2f9ff"; ctx.fill();
      ctx.restore();
    }

    function draw(now) {
      if (!running) return;
      if (!start) start = now;
      const elapsed = Math.min(duration, now - start);
      const p = clamp(elapsed / travelTime, 0, 1);
      const dt = Math.min(.05, (now - (previous || now)) / 1000);
      previous = now;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.max(1, canvas.clientWidth);
      const h = Math.max(1, canvas.clientHeight);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const top = 72;
      const slotTop = h - 92;
      let ballY = top + (slotTop + 34 - top) * (1 - Math.pow(1 - p, 1.6));
      ballY -= verticalLift * Math.max(0, 1 - (elapsed - liftBorn) / 1400);
      if (!portal && portalIndex < portalTimes.length && p >= portalTimes[portalIndex]) {
        portalIndex += 1;
        const distance = Math.min(worldWidth * .42, 650);
        const direction = x < worldWidth / 2 ? 1 : -1;
        portal = { born: now, entryX: x, entryY: ballY,
          exitX: clamp(x + direction * distance * (.65 + Math.random() * .35), 32, worldWidth - 32),
          exitY: Math.max(top + 10, ballY - 60), jumped: false };
        focus.textContent = translate("pinballPortal");
        sound();
      }
      if (portal && !portal.jumped && now - portal.born >= 320) {
        x = portal.exitX;
        verticalLift = ballY - portal.exitY;
        liftBorn = elapsed;
        ballY = portal.exitY;
        vx = (Math.random() - .5) * 260;
        cameraX = clamp(x - w * .5, 0, Math.max(0, worldWidth - w));
        portal.jumped = true;
        trail.length = 0;
        rowHit = -1;
        impact.classList.remove("is-active");
        void impact.offsetWidth;
        impact.classList.add("is-active");
        sound();
      }
      if (portal && now - portal.born > 1250) portal = null;
      const rows = 7;
      const rowGap = Math.max(26, (slotTop - top - 45) / rows);
      const currentRow = clamp(Math.floor((ballY - top - 19) / rowGap), 0, rows - 1);
      if (currentRow > rowHit && !portal) {
        rowHit = currentRow;
        const spacing = 106;
        const offset = currentRow % 2 ? spacing / 2 : 0;
        const pegX = Math.round((x - offset) / spacing) * spacing + offset;
        if (Math.abs(x - pegX) < 43) {
          const direction = x >= pegX ? 1 : -1;
          vx += direction * (115 + Math.random() * 95);
          hits += 1;
          focus.textContent = translate("pinballHits", hits);
          sparks.push({ x: pegX, y: top + 24 + currentRow * rowGap, born: now });
          impact.classList.remove("is-active");
          void impact.offsetWidth;
          impact.classList.add("is-active");
          if (now - lastSound > 160) { sound(); lastSound = now; }
        }
      }
      if (p < 1 && !(portal && !portal.jumped)) {
        vx += (target - x) * (p > .64 ? 8 : 1.15) * dt;
        vx *= Math.pow(.982, dt * 60);
        x = clamp(x + vx * dt, 26, worldWidth - 26);
        if (p > .80) {
          const settle = Math.pow((p - .80) / .20, 2);
          x += (target - x) * clamp(settle, 0, 1);
        }
      } else if (p >= 1) {
        x = target;
      }
      const wantedCamera = clamp(x - w * .5, 0, Math.max(0, worldWidth - w));
      cameraX += (wantedCamera - cameraX) * clamp(dt * 4.5, 0, 1);
      const camera = cameraX;
      const left = camera - 60;
      const right = camera + w + 60;

      const backdrop = ctx.createLinearGradient(0, 0, 0, h);
      backdrop.addColorStop(0, "#123359");
      backdrop.addColorStop(.32, "#0c2342");
      backdrop.addColorStop(1, "#07152b");
      ctx.fillStyle = backdrop;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(151,208,241,.065)";
      ctx.lineWidth = 1;
      for (let grid = 10; grid < w; grid += 35) {
        ctx.beginPath(); ctx.moveTo(grid, 0); ctx.lineTo(grid, h); ctx.stroke();
      }
      for (let grid = 16; grid < h; grid += 35) {
        ctx.beginPath(); ctx.moveTo(0, grid); ctx.lineTo(w, grid); ctx.stroke();
      }
      const ambient = ctx.createRadialGradient(w * .52, h * .48, 15, w * .52, h * .48, Math.max(w, h) * .7);
      ambient.addColorStop(0, "rgba(69,173,221,.19)");
      ambient.addColorStop(1, "rgba(4,10,25,0)");
      ctx.fillStyle = ambient; ctx.fillRect(0, 0, w, h);
      rounded(10, 8, w - 20, h - 18, 18, null, "rgba(161,224,255,.24)", 2);
      ctx.save();
      ctx.shadowColor = colors.glow; ctx.shadowBlur = 16;
      ctx.fillStyle = colors.glow;
      ctx.fillRect(17, 28, 3, Math.max(0, slotTop - 42));
      ctx.fillRect(w - 20, 28, 3, Math.max(0, slotTop - 42));
      ctx.restore();

      // The narrow display above the pegs locates the moving camera in a long roster.
      rounded(38, 19, Math.max(0, w - 76), 8, 4, "#0b1830", "#8bc6e056");
      rounded(39 + (w - 78) * (camera / worldWidth), 20,
        Math.max(15, (w - 78) * Math.min(1, w / worldWidth)), 6, 3, "#6bcbedb5");
      ctx.save(); ctx.shadowColor = colors.glow; ctx.shadowBlur = 13;
      ctx.beginPath(); ctx.arc(39 + (w - 78) * (x / worldWidth), 23, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#eafdff"; ctx.fill(); ctx.restore();

      for (let row = 0; row < rows; row += 1) {
        const y = top + 24 + row * rowGap;
        const spacing = 106;
        const offset = row % 2 ? spacing / 2 : 0;
        const first = Math.max(0, Math.floor((left - offset) / spacing));
        const last = Math.min(Math.ceil(worldWidth / spacing), Math.ceil((right - offset) / spacing));
        for (let j = first; j <= last; j += 1) {
          const px = j * spacing + offset - camera;
          drawPeg(px, y, (row + j) % 2 ? -.31 : .31, Math.abs(x - (px + camera)) < 44 && Math.abs(ballY - y) < 45);
        }
      }

      // Arched return rails guide the ball toward the illuminated name bank.
      ctx.save();
      ctx.strokeStyle = "#8cc6e760"; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(22, 45); ctx.quadraticCurveTo(33, slotTop - 8, 25, slotTop - 5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(w - 22, 45); ctx.quadraticCurveTo(w - 33, slotTop - 8, w - 25, slotTop - 5); ctx.stroke();
      ctx.restore();

      const exactSlot = worldWidth / roster.length;
      const firstSlot = Math.max(0, Math.floor(left / exactSlot));
      const lastSlot = Math.min(roster.length - 1, Math.ceil(right / exactSlot));
      for (let i = firstSlot; i <= lastSlot; i += 1) {
        const sx = i * exactSlot - camera;
        const activeSlot = p >= 1 && i === winnerIndex;
        const slotGradient = ctx.createLinearGradient(0, slotTop, 0, h);
        slotGradient.addColorStop(0, activeSlot ? "#1c6d9d" : "#172b48");
        slotGradient.addColorStop(1, activeSlot ? "#0d395c" : "#0a172b");
        ctx.save();
        if (activeSlot) { ctx.shadowColor = colors.glow; ctx.shadowBlur = 25; }
        rounded(sx + 4, slotTop + 3, exactSlot - 8, h - slotTop - 11, 10, slotGradient,
          activeSlot ? colors.glow : "#7da7bf77", activeSlot ? 2.5 : 1);
        ctx.restore();
        ctx.strokeStyle = activeSlot ? colors.glow : "#b1d4e676";
        ctx.lineWidth = activeSlot ? 3 : 2;
        ctx.beginPath(); ctx.moveTo(sx + 4, slotTop - 24); ctx.lineTo(sx + 4, slotTop + 16); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(sx + exactSlot - 4, slotTop - 24); ctx.lineTo(sx + exactSlot - 4, slotTop + 16); ctx.stroke();
        ctx.textAlign = "center";
        ctx.fillStyle = activeSlot ? "#fff" : colors.ink;
        ctx.font = `800 ${exactSlot < 92 ? 12 : 13}px system-ui, sans-serif`;
        const display = Array.from(roster[i]).slice(0, 8).join("") + (Array.from(roster[i]).length > 8 ? "…" : "");
        ctx.fillText(display, sx + exactSlot / 2, slotTop + 62, exactSlot - 14);
        if (isCrowned(roster[i])) {
          ctx.font = "21px Georgia, serif";
          ctx.fillStyle = "#ffe596";
          ctx.fillText("♛", sx + exactSlot / 2, slotTop + 45);
        }
      }

      const bx = x - camera;
      if (portal) {
        const age = now - portal.born;
        const fade = Math.min(1, age / 150, (1250 - age) / 300);
        for (const [px, py, color] of [[portal.entryX, portal.entryY, "#b893ff"], [portal.exitX, portal.exitY, "#67f2ff"]]) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, fade);
          ctx.translate(px - camera, py);
          ctx.rotate(age * .004);
          const vortex = ctx.createRadialGradient(0, 0, 4, 0, 0, 49);
          vortex.addColorStop(0, "#040b26"); vortex.addColorStop(.7, "#18385ccc"); vortex.addColorStop(1, "#14304b00");
          ctx.fillStyle = vortex; ctx.beginPath(); ctx.arc(0, 0, 49, 0, Math.PI * 2); ctx.fill();
          ctx.shadowColor = color; ctx.shadowBlur = 22; ctx.strokeStyle = color; ctx.lineWidth = 4;
          for (let ring = 0; ring < 3; ring += 1) {
            ctx.beginPath(); ctx.ellipse(0, 0, 37 + ring * 5, 26 + ring * 4, ring * .8, .3, Math.PI * 1.85); ctx.stroke();
          }
          for (let dot = 0; dot < 10; dot += 1) {
            const a = dot * Math.PI / 5;
            ctx.beginPath(); ctx.arc(Math.cos(a) * 49, Math.sin(a) * 49, 2, 0, Math.PI * 2); ctx.fillStyle = "#e8ffff"; ctx.fill();
          }
          ctx.restore();
        }
      }
      trail.push({ x, y: ballY, time: now });
      while (trail.length > 15) trail.shift();
      trail.forEach((point, i) => {
        const opacity = (i / trail.length) * .24;
        ctx.beginPath(); ctx.arc(point.x - camera, point.y, 6 + (i / trail.length) * 12, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(115,219,255,${opacity})`; ctx.fill();
      });
      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const spark = sparks[i];
        const life = (now - spark.born) / 600;
        if (life >= 1) { sparks.splice(i, 1); continue; }
        ctx.save(); ctx.globalAlpha = 1 - life;
        ctx.strokeStyle = colors.glow; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(spark.x - camera, spark.y, 7 + 30 * life, 0, Math.PI * 2); ctx.stroke();
        for (let ray = 0; ray < 7; ray += 1) {
          const angle = ray * Math.PI * 2 / 7;
          const px = spark.x - camera + Math.cos(angle) * (12 + life * 33);
          const py = spark.y + Math.sin(angle) * (12 + life * 33);
          ctx.beginPath(); ctx.arc(px, py, 2.5 * (1 - life), 0, Math.PI * 2);
          ctx.fillStyle = "#fff"; ctx.fill();
        }
        ctx.restore();
      }
      ctx.save();
      const portalAge = portal ? now - portal.born : 0;
      const ballScale = portal ? (portal.jumped ? Math.min(1, .12 + (portalAge - 320) / 260) : Math.max(.12, 1 - portalAge / 350)) : 1;
      ctx.translate(bx, ballY); ctx.scale(ballScale, ballScale); ctx.translate(-bx, -ballY);
      ctx.shadowColor = colors.glow; ctx.shadowBlur = p >= 1 ? 39 : 25;
      ctx.beginPath(); ctx.arc(bx, ballY, 29, 0, Math.PI * 2);
      ctx.fillStyle = "#f6f9ff"; ctx.fill();
      ctx.clip();
      ctx.translate(bx, ballY);
      ctx.rotate(Math.min(elapsed, travelTime) * .00135 + vx * .002);
      if (crest.complete && crest.naturalWidth) {
        ctx.drawImage(crest, 20, 54, 172, 181, -27, -27, 54, 54);
      } else {
        ctx.fillStyle = "#142963"; ctx.font = "bold 13px system-ui";
        ctx.textAlign = "center"; ctx.fillText("WLSA", 0, 4);
      }
      ctx.restore();
      ctx.save(); ctx.translate(bx, ballY); ctx.scale(ballScale, ballScale); ctx.translate(-bx, -ballY);
      ctx.beginPath(); ctx.arc(bx, ballY, 29, 0, Math.PI * 2);
      ctx.strokeStyle = "#f6f9ff"; ctx.lineWidth = 3; ctx.stroke();
      ctx.beginPath(); ctx.arc(bx - 9, ballY - 10, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffffb0"; ctx.fill();
      ctx.restore();

      const fill = ctx.createLinearGradient(0, 0, w, 0);
      fill.addColorStop(0, colors.line); fill.addColorStop(1, colors.glow);
      ctx.fillStyle = fill;
      ctx.fillRect(0, 0, w * (elapsed / duration), 4);
      timer.textContent = Math.max(0, (duration - elapsed) / 1000).toFixed(1);
      if (p >= 1 && !announced) {
        announced = true;
        stage.classList.add("has-landed");
        outcome.textContent = translate("pinballLanding", roster[winnerIndex]);
        outcome.classList.add("is-visible");
        focus.textContent = roster[winnerIndex];
        sound();
      }
      if (elapsed >= duration) {
        frame = requestAnimationFrame(() => cleanup());
      } else {
        frame = requestAnimationFrame(draw);
      }
    }

    return new Promise((resolve) => {
      resolver = resolve;
      frame = requestAnimationFrame(draw);
    });
  }

  window.NailoongPinball = { run, cleanup };
})();
