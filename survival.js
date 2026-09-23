(() => {
  "use strict";

  const get = (id) => document.getElementById(id);
  const ui = {
    arena: get("arena"), stage: get("chaseStage"), world: get("chaseWorld"),
    runners: get("chaseRunners"), hunter: get("chaseHunter"),
    event: get("chaseEvent"), phase: get("chasePhase"), count: get("chaseCount"),
    timer: get("chaseTimer"), progress: get("chaseProgress"), spark: get("chaseSpark"),
    beams: get("survivalBeams"), left: get("survivalBeamLeft"), right: get("survivalBeamRight"),
    reviveCard: get("reviveCard"), reviveCount: get("reviveCount")
  };
  let active = false;
  let frame = 0;
  let resolveRun = null;
  let timers = [];

  function later(callback, delay) {
    const timer = window.setTimeout(callback, delay);
    timers.push(timer);
    return timer;
  }

  function pause(ms) {
    return new Promise((resolve) => later(resolve, ms));
  }

  function cleanup() {
    active = false;
    cancelAnimationFrame(frame);
    timers.forEach(clearTimeout);
    timers = [];
    ui.stage.hidden = true;
    ui.stage.setAttribute("aria-hidden", "true");
    ui.stage.className = "chase-stage";
    ui.arena.classList.remove("is-chasing");
    ui.runners.replaceChildren();
    ui.event.textContent = "";
    ui.reviveCard.classList.remove("is-visible");
    ui.beams.classList.remove("is-firing");
    ui.spark.replaceChildren();
    if (resolveRun) { resolveRun(); resolveRun = null; }
  }

  async function run({ roster, winnerIndex, eliminationOrder, reviveIndices, reducedMotion, translate, isCrowned, sound, shotSound, finishSound }) {
    cleanup();
    active = true;
    ui.stage.hidden = false;
    ui.stage.setAttribute("aria-hidden", "false");
    ui.arena.classList.add("is-chasing");
    const width = Math.max(220, ui.world.clientWidth);
    const height = Math.max(250, ui.world.clientHeight);
    ui.beams.setAttribute("viewBox", `0 0 ${width} ${height}`);
    const center = { x: width * 0.5, y: height * 0.51 };
    ui.hunter.style.transform = `translate3d(${center.x}px,${center.y}px,0) translate(-50%,-50%)`;
    ui.stage.classList.toggle("is-dense", roster.length > 35);
    ui.stage.classList.toggle("is-crowded", roster.length > 85);
    ui.stage.classList.add("is-awake");
    ui.phase.textContent = translate("chaseWake");
    ui.count.textContent = translate("chaseRemaining", roster.length);
    ui.event.textContent = "";
    ui.reviveCard.classList.remove("is-visible");
    ui.progress.style.transform = "scaleX(0)";
    const columns = Math.max(2, Math.ceil(Math.sqrt(roster.length * width / height)));
    const rows = Math.ceil(roster.length / columns);
    const random = (min, max) => min + Math.random() * (max - min);
    const contenders = roster.map((name, index) => {
      const chip = document.createElement("div");
      chip.className = "chase-runner";
      chip.classList.toggle("is-crowned", isCrowned(name));
      chip.style.setProperty("--chase-hue", String((index * 61 + 184) % 360));
      const dot = document.createElement("i");
      const label = document.createElement("b");
      label.textContent = name;
      chip.append(dot, label);
      ui.runners.append(chip);
      const col = index % columns;
      const row = Math.floor(index / columns);
      let x = (col + 0.5) * width / columns + random(-6, 6);
      let y = 29 + (row + 0.5) * (height - 65) / rows + random(-5, 5);
      const dx = x - center.x;
      const dy = y - center.y;
      const distance = Math.hypot(dx, dy) || 1;
      const clearRadius = roster.length > 85 ? 59 : 82;
      if (distance < clearRadius) {
        x = center.x + dx / distance * clearRadius;
        y = center.y + dy / distance * clearRadius;
      }
      return { name, chip, x, y, phase: random(0, 6.28), alive: true, hideTimer: null };
    });

    const shotInterval = reducedMotion ? 10 : Math.min(405, Math.max(82, 18000 / Math.max(5, eliminationOrder.length + 1)));
    const prelude = reducedMotion ? 80 : 1000;
    const revivalPause = reducedMotion ? 150 : 1650;
    const finale = reducedMotion ? 200 : 1250;
    const suspenseShots = Math.min(3, eliminationOrder.length);
    const totalShots = eliminationOrder.length + reviveIndices.length;
    const fullDuration = prelude + totalShots * shotInterval + revivalPause + finale + (reducedMotion ? 0 : (suspenseShots * 0.65 + reviveIndices.length * 0.45) * shotInterval);
    let shotCount = 0;
    let aliveCount = roster.length;
    let motionStart = 0;
    function animate(now) {
      if (!active) return;
      if (!motionStart) motionStart = now;
      if (roster.length < 120 || Math.floor(now / 32) !== Math.floor((now - 16) / 32)) {
        for (const contender of contenders) {
          if (!contender.alive) continue;
          const sway = reducedMotion ? 0 : 7;
          contender.chip.style.transform = `translate3d(${contender.x + Math.sin(now * 0.0016 + contender.phase) * sway}px, ${contender.y + Math.cos(now * 0.0018 + contender.phase) * sway}px, 0) translate(-50%,-50%)`;
        }
      }
      ui.timer.textContent = Math.max(0, (fullDuration - (now - motionStart)) / 1000).toFixed(1);
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);

    function announce(message) {
      ui.event.textContent = message;
      ui.event.classList.remove("is-visible");
      void ui.event.offsetWidth;
      ui.event.classList.add("is-visible");
    }

    function makeShards(contender, revival = false) {
      if (reducedMotion) return;
      const colors = revival ? ["#a5f9ff", "#d4ffff", "#77e7c3"] : ["#ffe583", "#fff5c4", "#ff7a87"];
      const impact = document.createElement("i");
      impact.className = revival ? "survival-impact is-revival" : "survival-impact";
      impact.style.left = `${contender.x}px`;
      impact.style.top = `${contender.y}px`;
      ui.spark.append(impact);
      later(() => impact.remove(), 720);
      if (!revival) {
        const chipWidth = contender.chip.offsetWidth;
        const chipHeight = contender.chip.offsetHeight;
        for (let i = 0; i < 5; i += 1) {
          const fragment = contender.chip.cloneNode(true);
          fragment.className = `chase-runner survival-fragment${contender.chip.classList.contains("is-crowned") ? " is-crowned" : ""}`;
          fragment.style.left = `${contender.x}px`;
          fragment.style.top = `${contender.y}px`;
          fragment.style.width = `${chipWidth}px`;
          fragment.style.height = `${chipHeight}px`;
          fragment.style.setProperty("--slice-top", `${i * 20}%`);
          fragment.style.setProperty("--slice-bottom", `${(i + 1) * 20 + 2}%`);
          fragment.style.setProperty("--fragment-x", `${(i - 2) * 22 + random(-12, 12)}px`);
          fragment.style.setProperty("--fragment-y", `${(i - 2) * 10 + random(-30, 25)}px`);
          fragment.style.setProperty("--fragment-rotate", `${(i - 2) * 15 + random(-16, 16)}deg`);
          ui.spark.append(fragment);
          later(() => fragment.remove(), 760);
        }
      }
      for (let i = 0; i < 8; i += 1) {
        const shard = document.createElement("i");
        shard.className = revival ? "survival-shard is-revival" : "survival-shard";
        shard.style.left = `${contender.x}px`;
        shard.style.top = `${contender.y}px`;
        const angle = i * Math.PI / 4 + random(-0.14, 0.14);
        shard.style.setProperty("--dx", `${Math.cos(angle) * random(36, 94)}px`);
        shard.style.setProperty("--dy", `${Math.sin(angle) * random(29, 80)}px`);
        shard.style.background = colors[i % colors.length];
        ui.spark.append(shard);
        later(() => shard.remove(), 720);
      }
    }

    function aim(contender) {
      const eyes = [
        { node: ui.left, x: center.x - 10, y: center.y - 34 },
        { node: ui.right, x: center.x + 18, y: center.y - 35 }
      ];
      for (const { node, x, y } of eyes) {
        node.setAttribute("x1", x.toFixed(1));
        node.setAttribute("y1", y.toFixed(1));
        node.setAttribute("x2", contender.x.toFixed(1));
        node.setAttribute("y2", contender.y.toFixed(1));
      }
      ui.beams.classList.remove("is-firing");
      ui.beams.classList.add("is-firing");
      later(() => ui.beams.classList.remove("is-firing"), Math.min(160, shotInterval * 0.8));
    }

    function shoot(index) {
      if (!active) return;
      const contender = contenders[index];
      aim(contender);
      makeShards(contender);
      contender.alive = false;
      contender.chip.classList.remove("is-returning");
      contender.chip.classList.add("is-shattering");
      contender.hideTimer = later(() => contender.chip.classList.add("is-gone"), reducedMotion ? 1 : 170);
      shotSound();
      shotCount += 1;
      aliveCount -= 1;
      ui.count.textContent = translate("chaseRemaining", aliveCount);
      ui.progress.style.transform = `scaleX(${Math.min(1, shotCount / totalShots)})`;
      if (roster.length < 28 || shotCount % Math.max(2, Math.ceil(roster.length / 14)) === 0) announce(translate("chaseCaught", contender.name));
    }

    const outcome = new Promise((resolve) => { resolveRun = resolve; });
    (async () => {
      await pause(prelude);
      if (!active) return;
      ui.phase.textContent = translate("chaseRun");
      const split = Math.max(1, Math.ceil(eliminationOrder.length * 0.55));
      for (let i = 0; i <= eliminationOrder.length; i += 1) {
        if (!active) return;
        if (i === split) {
          ui.reviveCount.textContent = `×${reviveIndices.length}`;
          ui.reviveCard.classList.add("is-visible");
          ui.stage.classList.add("is-reviving");
          for (const index of reviveIndices) {
            const restored = contenders[index];
            clearTimeout(restored.hideTimer);
            restored.alive = true;
            aliveCount += 1;
            restored.chip.classList.remove("is-shattering", "is-gone");
            restored.chip.classList.add("is-returning");
            makeShards(restored, true);
          }
          announce(translate("chaseRevive", reviveIndices.length));
          sound(680, 0.25);
          ui.count.textContent = translate("chaseRemaining", aliveCount);
          await pause(revivalPause);
          ui.reviveCard.classList.remove("is-visible");
          ui.stage.classList.remove("is-reviving");
          for (const index of reviveIndices) contenders[index].chip.classList.remove("is-returning");
        }
        if (i === eliminationOrder.length) break;
        if (i >= eliminationOrder.length - suspenseShots) {
          ui.stage.classList.add("is-final");
          ui.phase.textContent = translate("chaseFinal");
        }
        shoot(eliminationOrder[i]);
        await pause(shotInterval * (!reducedMotion && i >= eliminationOrder.length - suspenseShots ? 1.65 : 1));
      }
      if (!active) return;
      ui.phase.textContent = translate("chaseFinal");
      for (const index of reviveIndices) {
        if (!active) return;
        shoot(index);
        await pause(shotInterval * (reducedMotion ? 1 : 1.45));
      }
      if (!active) return;
      const winner = contenders[winnerIndex];
      winner.chip.classList.add("is-last-one");
      ui.stage.classList.add("has-caught");
      ui.count.textContent = translate("chaseRemaining", 1);
      ui.progress.style.transform = "scaleX(1)";
      announce(translate("chaseSurvivor", winner.name));
      ui.phase.textContent = translate("chaseWinner");
      finishSound();
      await pause(finale);
      cleanup();
    })();
    return outcome;
  }

  window.NailoongChase = { run, cleanup };
})();
