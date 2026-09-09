(() => {
  "use strict";

  const translations = {
    zh: {
      brand: "奶龙激光点名器",
      awaiting: "等待名单",
      setupEyebrow: "名单控制台",
      setupTitle: "今天点谁？",
      peopleUnit: "人",
      setupCopy: "每行输入一个名字，或直接导入 TXT / CSV 名单。",
      nameLabel: "人物姓名",
      namePlaceholder: "例如：\n林晓\n陈一\n周予",
      importFile: "导入文件",
      clear: "清空",
      helper: "支持换行、逗号或制表符分隔，重复姓名会自动合并。",
      loadRoster: "装载名单",
      arenaEyebrow: "激光选择区",
      readyTitle: "奶龙准备就绪",
      scanLabel: "扫描状态",
      standby: "待机",
      characterReady: "双眼能量稳定",
      characterAlt: "戴睡帽、抱着枕头的奶龙",
      emptyTitle: "目标区尚未装载",
      emptyCopy: "在左侧添加姓名，奶龙就能开始扫描。",
      space: "空格",
      shortcut: "可快速启动",
      fire: "发射激光",
      fairNote: "同一轮不重复 · 使用浏览器安全随机数",
      winnerKicker: "命中目标",
      winnerSubtitle: "确认后，此人将从本轮名单移除",
      again: "移除并返回",
      unofficial: "非官方互动页面 · 仅供课堂与日常使用",
      close: "关闭",
      candidateList: "候选名单",
      languageLabel: "Switch to English",
      soundOn: "音效",
      disableSoundLabel: "关闭音效",
      enableSoundLabel: "开启音效",
      invalidRoster: "请先输入至少两个姓名。",
      imported: (count) => `已从文件读取 ${count} 个姓名，请确认后装载。`,
      importFailed: "这个文件暂时无法读取，请换用 TXT 或 CSV。",
      capped: (count) => `名单较长，已装载前 ${count} 人。`,
      deduped: (count) => `已装载 ${count} 人，重复姓名已自动合并。`,
      loaded: (count, total) => `本轮剩余 ${count}/${total} 人`,
      targetsReady: (count) => `本轮还有 ${count} 个目标`,
      charging: "双眼蓄能中",
      scanning: "高速扫描中",
      locked: "目标锁定",
      hitAnnouncement: (name) => `奶龙选中了 ${name}`,
      removed: (name, count) => `${name} 已移出本轮，剩余 ${count} 人。`,
      roundComplete: "本轮已完成",
      roundCompleteTitle: "所有人都已选完",
      roundCompleteCopy: "重新装载名单，即可开始新一轮。",
      roundCompleteToast: "本轮已完成，没有自动开始下一轮。",
      cleared: "名单已清空。",
      inputCount: (count) => `当前识别到 ${count} 个姓名。`
    },
    en: {
      brand: "Nailoong Laser Picker",
      awaiting: "Awaiting roster",
      setupEyebrow: "Roster Console",
      setupTitle: "Who gets picked?",
      peopleUnit: "people",
      setupCopy: "Enter one name per line, or import a TXT / CSV roster.",
      nameLabel: "Names",
      namePlaceholder: "For example:\nAlex\nTaylor\nMorgan",
      importFile: "Import file",
      clear: "Clear",
      helper: "Use line breaks, commas, or tabs. Duplicate names are merged automatically.",
      loadRoster: "Load roster",
      arenaEyebrow: "Laser Selection Zone",
      readyTitle: "Nailoong is ready",
      scanLabel: "Scan status",
      standby: "Standby",
      characterReady: "Eye energy stable",
      characterAlt: "Nailoong wearing a sleeping cap and holding a pillow",
      emptyTitle: "No targets loaded",
      emptyCopy: "Add names on the left and Nailoong can start scanning.",
      space: "Space",
      shortcut: "to launch quickly",
      fire: "Fire laser",
      fairNote: "No repeats within a round · Secure browser randomness",
      winnerKicker: "Target acquired",
      winnerSubtitle: "Confirm to remove this person from the current round",
      again: "Remove & return",
      unofficial: "Unofficial interactive page · For classroom and everyday use",
      close: "Close",
      candidateList: "Candidate roster",
      languageLabel: "切换为中文",
      soundOn: "Sound",
      disableSoundLabel: "Mute sound effects",
      enableSoundLabel: "Enable sound effects",
      invalidRoster: "Enter at least two names first.",
      imported: (count) => `${count} names read from the file. Review them, then load the roster.`,
      importFailed: "This file could not be read. Please use TXT or CSV.",
      capped: (count) => `That roster is very long. The first ${count} names were loaded.`,
      deduped: (count) => `${count} people loaded. Duplicate names were merged.`,
      loaded: (count, total) => `${count}/${total} remaining this round`,
      targetsReady: (count) => `${count} targets remain this round`,
      charging: "Charging eye beams",
      scanning: "High-speed scan",
      locked: "Target locked",
      hitAnnouncement: (name) => `Nailoong picked ${name}`,
      removed: (name, count) => `${name} left this round. ${count} remaining.`,
      roundComplete: "Round complete",
      roundCompleteTitle: "Everyone has been picked",
      roundCompleteCopy: "Load the roster again when you are ready for a new round.",
      roundCompleteToast: "Round complete. A new round was not started automatically.",
      cleared: "Roster cleared.",
      inputCount: (count) => `${count} names detected.`
    }
  };

  const $ = (selector) => document.querySelector(selector);
  const elements = {
    html: document.documentElement,
    arena: $("#arena"),
    arenaTitle: $("#arenaTitle"),
    nameInput: $("#nameInput"),
    fileInput: $("#fileInput"),
    importButton: $("#importButton"),
    clearButton: $("#clearButton"),
    loadButton: $("#loadButton"),
    fireButton: $("#fireButton"),
    nameGrid: $("#nameGrid"),
    emptyState: $("#emptyState"),
    targetZone: $("#targetZone"),
    emptyTitleText: $("#emptyTitleText"),
    emptyCopyText: $("#emptyCopyText"),
    nameCount: $("#nameCount"),
    helperText: $("#helperText"),
    rosterStatus: $("#rosterStatus"),
    statusPill: $(".status-pill"),
    scanStatus: $("#scanStatus"),
    soundToggle: $("#soundToggle"),
    laserAudio: $("#laserAudio"),
    languageToggle: $("#languageToggle"),
    languageOptions: document.querySelectorAll("[data-lang-option]"),
    laserGroup: $("#laserGroup"),
    laserLeft: $("#laserLeft"),
    laserRight: $("#laserRight"),
    laserLeftGlow: $("#laserLeftGlow"),
    laserRightGlow: $("#laserRightGlow"),
    impactRing: $("#impactRing"),
    impactCore: $("#impactCore"),
    leftEye: $("#leftEye"),
    rightEye: $("#rightEye"),
    winnerReveal: $("#winnerReveal"),
    winnerTitle: $("#winnerTitle"),
    againButton: $("#againButton"),
    revealClose: $("#revealClose"),
    flashLayer: $("#flashLayer"),
    particleLayer: $("#particleLayer"),
    toast: $("#toast"),
    liveRegion: $("#liveRegion")
  };

  const MAX_NAMES = 240;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let language = getSavedLanguage();
  let soundEnabled = getSavedSoundPreference();
  let audioContext = null;
  let activeLaserSound = null;
  let roster = [];
  let originalRoster = [];
  let isBusy = false;
  let winnerIndex = null;
  let activeIndex = null;
  let uiState = "empty";
  let toastTimer = null;
  let lastFocused = null;

  function getSavedLanguage() {
    try {
      const saved = localStorage.getItem("nailoong-picker-language");
      if (saved === "zh" || saved === "en") return saved;
    } catch (_) {
      // Storage can be unavailable in private browsing; the switch still works.
    }
    return "zh";
  }

  function getSavedSoundPreference() {
    try {
      const saved = localStorage.getItem("nailoong-picker-sound-v2");
      if (saved === "off") return false;
    } catch (_) {
      // Sound still defaults to on when preference storage is unavailable.
    }
    return true;
  }

  function t(key, ...args) {
    const value = translations[language][key];
    return typeof value === "function" ? value(...args) : value;
  }

  function parseNames(raw) {
    const pieces = raw
      .replace(/^\uFEFF/, "")
      .split(/[\n\r,，;；\t]+/)
      .map((name) => name.trim().replace(/^['"]|['"]$/g, "").trim())
      .filter(Boolean);

    if (/^(姓名|名字|name|names|student|students)$/i.test(pieces[0] || "")) {
      pieces.shift();
    }

    const seen = new Set();
    return pieces.filter((name) => {
      const key = name.toLocaleLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage;
    elements.html.lang = language === "zh" ? "zh-CN" : "en";
    document.title = language === "zh" ? "奶龙激光点名器" : "Nailoong Laser Picker";
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      const value = translations[language][key];
      if (typeof value === "string") node.textContent = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.placeholder = t(node.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((node) => {
      node.alt = t(node.dataset.i18nAlt);
    });
    elements.languageOptions.forEach((option) => {
      option.classList.toggle("is-active", option.dataset.langOption === language);
    });
    elements.languageToggle.setAttribute("aria-label", t("languageLabel"));
    syncSoundButton();
    elements.revealClose.setAttribute("aria-label", t("close"));
    elements.nameGrid.setAttribute("aria-label", t("candidateList"));
    syncDynamicText();
    try {
      localStorage.setItem("nailoong-picker-language", language);
    } catch (_) {
      // Preference saving is optional.
    }
  }

  function syncSoundButton() {
    elements.soundToggle.classList.toggle("is-muted", !soundEnabled);
    elements.soundToggle.setAttribute("aria-pressed", String(soundEnabled));
    elements.soundToggle.setAttribute(
      "aria-label",
      soundEnabled ? t("disableSoundLabel") : t("enableSoundLabel")
    );
  }

  async function ensureAudioContext() {
    if (!soundEnabled) return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioContext) audioContext = new AudioContextClass();
    if (audioContext.state === "suspended") {
      try {
        await audioContext.resume();
      } catch (_) {
        return null;
      }
    }
    return audioContext;
  }

  async function startSequenceAudio() {
    if (!soundEnabled) return { usesFile: false, context: null };
    const audio = elements.laserAudio;
    audio.pause();
    audio.currentTime = 0;
    audio.muted = false;
    audio.volume = 0.92;
    audio.playbackRate = reducedMotion ? 1.8 : 1;
    const fallbackContextPromise = ensureAudioContext();
    try {
      await audio.play();
      return { usesFile: true, context: null };
    } catch (_) {
      return { usesFile: false, context: await fallbackContextPromise };
    }
  }

  function playChargeSound(context) {
    if (!context || !soundEnabled) return;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(92, now);
    oscillator.frequency.exponentialRampToValueAtTime(310, now + 0.62);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.075, now + 0.38);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.67);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.7);
  }

  function startLaserSound(context) {
    if (!context || !soundEnabled) return null;
    const now = context.currentTime;
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    const primary = context.createOscillator();
    const shimmer = context.createOscillator();
    const lfo = context.createOscillator();
    const lfoGain = context.createGain();

    primary.type = "sawtooth";
    primary.frequency.setValueAtTime(720, now);
    primary.frequency.exponentialRampToValueAtTime(165, now + 3.1);
    shimmer.type = "triangle";
    shimmer.frequency.setValueAtTime(1180, now);
    shimmer.frequency.exponentialRampToValueAtTime(290, now + 3.1);
    lfo.type = "sine";
    lfo.frequency.value = 18;
    lfoGain.gain.value = 0.018;
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1240, now);
    filter.frequency.exponentialRampToValueAtTime(430, now + 3.1);
    filter.Q.value = 5.5;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.04);

    primary.connect(filter);
    shimmer.connect(filter);
    filter.connect(gain).connect(context.destination);
    lfo.connect(lfoGain).connect(gain.gain);
    primary.start(now);
    shimmer.start(now);
    lfo.start(now);

    return { context, gain, oscillators: [primary, shimmer, lfo] };
  }

  function stopLaserSound(sound = activeLaserSound) {
    if (!sound) return;
    const now = sound.context.currentTime;
    sound.gain.gain.cancelScheduledValues(now);
    sound.gain.gain.setValueAtTime(Math.max(sound.gain.gain.value, 0.0001), now);
    sound.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
    sound.oscillators.forEach((oscillator) => {
      try {
        oscillator.stop(now + 0.11);
      } catch (_) {
        // The node may already have stopped.
      }
    });
    if (sound === activeLaserSound) activeLaserSound = null;
  }

  function playHitSound(context) {
    if (!context || !soundEnabled) return;
    const now = context.currentTime;
    const gain = context.createGain();
    const zap = context.createOscillator();
    const chime = context.createOscillator();
    const noise = context.createBufferSource();
    const noiseFilter = context.createBiquadFilter();
    const buffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.16), context.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let index = 0; index < channel.length; index += 1) {
      channel[index] = (Math.random() * 2 - 1) * (1 - index / channel.length);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.13, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);
    zap.type = "sawtooth";
    zap.frequency.setValueAtTime(940, now);
    zap.frequency.exponentialRampToValueAtTime(115, now + 0.24);
    chime.type = "sine";
    chime.frequency.setValueAtTime(660, now + 0.06);
    chime.frequency.exponentialRampToValueAtTime(440, now + 0.42);
    noise.buffer = buffer;
    noiseFilter.type = "highpass";
    noiseFilter.frequency.value = 1200;

    zap.connect(gain);
    chime.connect(gain);
    noise.connect(noiseFilter).connect(gain);
    gain.connect(context.destination);
    zap.start(now);
    chime.start(now + 0.06);
    noise.start(now);
    zap.stop(now + 0.26);
    chime.stop(now + 0.5);
    noise.stop(now + 0.17);
  }

  function syncDynamicText() {
    const draftCount = parseNames(elements.nameInput.value).length;
    elements.nameCount.textContent = draftCount;

    if (uiState === "empty") {
      elements.rosterStatus.textContent = t("awaiting");
      elements.arenaTitle.textContent = t("readyTitle");
      elements.scanStatus.textContent = t("standby");
      elements.emptyTitleText.textContent = t("emptyTitle");
      elements.emptyCopyText.textContent = t("emptyCopy");
    } else if (uiState === "ready") {
      elements.rosterStatus.textContent = t("loaded", roster.length, originalRoster.length);
      elements.arenaTitle.textContent = t("targetsReady", roster.length);
      elements.scanStatus.textContent = t("standby");
    } else if (uiState === "complete") {
      elements.rosterStatus.textContent = t("roundComplete");
      elements.arenaTitle.textContent = t("roundComplete");
      elements.scanStatus.textContent = t("standby");
      elements.emptyTitleText.textContent = t("roundCompleteTitle");
      elements.emptyCopyText.textContent = t("roundCompleteCopy");
    } else if (uiState === "charging") {
      elements.scanStatus.textContent = t("charging");
    } else if (uiState === "scanning") {
      elements.scanStatus.textContent = t("scanning");
    } else if (uiState === "locked" || uiState === "reveal") {
      elements.scanStatus.textContent = t("locked");
    }
  }

  function setHelper(message, isError = false) {
    elements.helperText.textContent = message;
    elements.helperText.classList.toggle("is-error", isError);
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => {
      elements.toast.classList.remove("is-visible");
    }, 2800);
  }

  function secureRandomIndex(length) {
    if (length <= 1) return 0;
    const maxUint = 0x100000000;
    const limit = maxUint - (maxUint % length);
    const buffer = new Uint32Array(1);
    do {
      crypto.getRandomValues(buffer);
    } while (buffer[0] >= limit);
    return buffer[0] % length;
  }

  function delay(milliseconds) {
    return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
  }

  function renderRoster() {
    const fragment = document.createDocumentFragment();
    roster.forEach((name, index) => {
      const card = document.createElement("div");
      card.className = "name-card";
      card.dataset.index = String(index);
      card.textContent = name;
      fragment.append(card);
    });
    elements.nameGrid.replaceChildren(fragment);
    elements.emptyState.hidden = true;
    elements.fireButton.disabled = false;
    elements.statusPill.classList.add("is-ready");
  }

  function clearCardStates() {
    document.querySelectorAll(".name-card").forEach((card) => {
      card.classList.remove("is-scanned", "is-winner");
    });
    activeIndex = null;
    winnerIndex = null;
    elements.arena.classList.remove("is-charging", "is-firing", "has-hit");
    elements.laserGroup.classList.remove("is-visible");
  }

  function loadRoster() {
    if (isBusy) return;
    const parsed = parseNames(elements.nameInput.value);
    elements.nameCount.textContent = parsed.length;

    if (parsed.length < 2) {
      setHelper(t("invalidRoster"), true);
      showToast(t("invalidRoster"));
      elements.nameInput.focus();
      return;
    }

    if (!elements.winnerReveal.hidden) {
      elements.winnerReveal.hidden = true;
      elements.arena.classList.remove("has-hit");
    }
    clearCardStates();
    originalRoster = parsed.slice(0, MAX_NAMES);
    roster = [...originalRoster];
    renderRoster();
    uiState = "ready";
    syncDynamicText();
    const message = parsed.length > MAX_NAMES ? t("capped", MAX_NAMES) : t("deduped", roster.length);
    setHelper(message);
    showToast(message);
  }

  function clearRoster() {
    if (isBusy) return;
    elements.nameInput.value = "";
    roster = [];
    originalRoster = [];
    elements.nameGrid.replaceChildren();
    elements.emptyState.hidden = false;
    elements.fireButton.disabled = true;
    elements.statusPill.classList.remove("is-ready");
    clearCardStates();
    hideWinner(false);
    uiState = "empty";
    setHelper(t("helper"));
    syncDynamicText();
    showToast(t("cleared"));
  }

  function pointFromElement(element) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  function setLine(line, start, end) {
    line.setAttribute("x1", start.x.toFixed(1));
    line.setAttribute("y1", start.y.toFixed(1));
    line.setAttribute("x2", end.x.toFixed(1));
    line.setAttribute("y2", end.y.toFixed(1));
  }

  function aimAt(card) {
    if (!card) return;
    const left = pointFromElement(elements.leftEye);
    const right = pointFromElement(elements.rightEye);
    const target = pointFromElement(card);
    setLine(elements.laserLeft, left, target);
    setLine(elements.laserRight, right, target);
    setLine(elements.laserLeftGlow, left, target);
    setLine(elements.laserRightGlow, right, target);
    elements.impactRing.setAttribute("cx", target.x.toFixed(1));
    elements.impactRing.setAttribute("cy", target.y.toFixed(1));
    elements.impactCore.setAttribute("cx", target.x.toFixed(1));
    elements.impactCore.setAttribute("cy", target.y.toFixed(1));
  }

  function setActiveCard(index, final = false) {
    if (activeIndex !== null) {
      elements.nameGrid.children[activeIndex]?.classList.remove("is-scanned");
    }
    const card = elements.nameGrid.children[index];
    if (!card) return;
    activeIndex = index;
    card.classList.add(final ? "is-winner" : "is-scanned");
    aimAt(card);
  }

  function visibleCardIndexes() {
    const zone = elements.targetZone.getBoundingClientRect();
    return [...elements.nameGrid.children]
      .map((card, index) => ({ card, index, rect: card.getBoundingClientRect() }))
      .filter(({ rect }) => rect.bottom > zone.top + 8 && rect.top < zone.bottom - 8)
      .map(({ index }) => index);
  }

  function createParticles() {
    elements.particleLayer.replaceChildren();
    const colors = ["#fff7be", "#ffdf55", "#ff5c47", "#ffffff"];
    const count = reducedMotion ? 8 : 34;
    for (let index = 0; index < count; index += 1) {
      const angle = (Math.PI * 2 * index) / count + Math.random() * 0.22;
      const distance = 90 + Math.random() * 260;
      const particle = document.createElement("i");
      particle.className = "particle";
      particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
      particle.style.setProperty("--r", `${Math.round(Math.random() * 620 - 310)}deg`);
      particle.style.setProperty("--size", `${Math.round(Math.random() * 7 + 4)}px`);
      particle.style.setProperty("--color", colors[index % colors.length]);
      elements.particleLayer.append(particle);
    }
    window.setTimeout(() => elements.particleLayer.replaceChildren(), 1000);
  }

  function flash() {
    elements.flashLayer.classList.remove("is-flashing");
    void elements.flashLayer.offsetWidth;
    elements.flashLayer.classList.add("is-flashing");
  }

  async function fireLaser() {
    if (isBusy || roster.length < 1) return;
    isBusy = true;
    const sequenceAudio = await startSequenceAudio();
    const soundContext = sequenceAudio.context;
    lastFocused = document.activeElement;
    hideWinner(false);
    clearCardStates();
    elements.fireButton.disabled = true;
    elements.loadButton.disabled = true;
    elements.clearButton.disabled = true;

    winnerIndex = secureRandomIndex(roster.length);
    uiState = "charging";
    syncDynamicText();
    elements.arena.classList.add("is-charging");
    if (!sequenceAudio.usesFile) playChargeSound(soundContext);
    await delay(reducedMotion ? 80 : 620);

    elements.arena.classList.remove("is-charging");
    elements.arena.classList.add("is-firing");
    elements.laserGroup.classList.add("is-visible");
    if (!sequenceAudio.usesFile) activeLaserSound = startLaserSound(soundContext);
    uiState = "scanning";
    syncDynamicText();

    const cycles = reducedMotion ? 5 : 23;
    for (let step = 0; step < cycles; step += 1) {
      const visible = visibleCardIndexes();
      const pool = visible.length ? visible : roster.map((_, index) => index);
      let nextIndex = pool[secureRandomIndex(pool.length)];
      if (pool.length > 1 && nextIndex === activeIndex) {
        nextIndex = pool[(pool.indexOf(nextIndex) + 1) % pool.length];
      }
      setActiveCard(nextIndex);
      const progress = step / Math.max(1, cycles - 1);
      const wait = reducedMotion ? 24 : 54 + Math.pow(progress, 2.4) * 150;
      await delay(wait);
    }

    const finalCard = elements.nameGrid.children[winnerIndex];
    finalCard.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
    await delay(reducedMotion ? 35 : 290);
    if (activeIndex !== null) {
      elements.nameGrid.children[activeIndex]?.classList.remove("is-scanned");
    }
    activeIndex = winnerIndex;
    setActiveCard(winnerIndex, true);
    elements.arena.classList.remove("is-firing");
    elements.arena.classList.add("has-hit");
    if (!sequenceAudio.usesFile) {
      stopLaserSound();
      playHitSound(soundContext);
    }
    uiState = "locked";
    syncDynamicText();
    flash();
    createParticles();
    elements.liveRegion.textContent = t("hitAnnouncement", roster[winnerIndex]);
    await delay(reducedMotion ? 100 : 620);
    elements.laserGroup.classList.remove("is-visible");
    showWinner(roster[winnerIndex]);

    isBusy = false;
    elements.fireButton.disabled = false;
    elements.loadButton.disabled = false;
    elements.clearButton.disabled = false;
  }

  function showWinner(name) {
    elements.winnerTitle.textContent = name;
    elements.winnerReveal.hidden = false;
    uiState = "reveal";
    syncDynamicText();
    window.setTimeout(() => elements.againButton.focus(), reducedMotion ? 0 : 240);
  }

  function hideWinner(restoreFocus = true) {
    if (elements.winnerReveal.hidden) return;
    const removedName = winnerIndex === null ? null : roster[winnerIndex];
    elements.winnerReveal.hidden = true;
    elements.arena.classList.remove("has-hit");
    elements.nameGrid.children[winnerIndex]?.classList.remove("is-winner");
    elements.winnerTitle.textContent = "—";

    if (winnerIndex !== null) {
      roster.splice(winnerIndex, 1);
    }

    const completedRound = roster.length === 0 && originalRoster.length > 0;

    winnerIndex = null;
    activeIndex = null;
    uiState = completedRound ? "complete" : roster.length ? "ready" : "empty";
    if (roster.length) {
      renderRoster();
    } else {
      elements.nameGrid.replaceChildren();
      elements.emptyState.hidden = false;
      elements.fireButton.disabled = true;
      elements.statusPill.classList.remove("is-ready");
    }
    syncDynamicText();
    if (removedName) {
      showToast(completedRound ? t("roundCompleteToast") : t("removed", removedName, roster.length));
    }
    if (restoreFocus) (lastFocused || elements.fireButton).focus();
  }

  elements.nameInput.addEventListener("input", () => {
    const count = parseNames(elements.nameInput.value).length;
    elements.nameCount.textContent = count;
    setHelper(count ? t("inputCount", count) : t("helper"));
  });

  elements.importButton.addEventListener("click", () => elements.fileInput.click());

  elements.fileInput.addEventListener("change", async () => {
    const [file] = elements.fileInput.files;
    if (!file) return;
    try {
      const text = await file.text();
      const names = parseNames(text);
      if (!names.length) throw new Error("empty file");
      elements.nameInput.value = names.join("\n");
      elements.nameCount.textContent = names.length;
      setHelper(t("imported", names.length));
      showToast(t("imported", names.length));
    } catch (_) {
      setHelper(t("importFailed"), true);
      showToast(t("importFailed"));
    } finally {
      elements.fileInput.value = "";
    }
  });

  elements.loadButton.addEventListener("click", loadRoster);
  elements.clearButton.addEventListener("click", clearRoster);
  elements.fireButton.addEventListener("click", fireLaser);
  elements.againButton.addEventListener("click", () => hideWinner());
  elements.revealClose.addEventListener("click", () => hideWinner());

  elements.languageToggle.addEventListener("click", () => {
    setLanguage(language === "zh" ? "en" : "zh");
  });

  elements.soundToggle.addEventListener("click", async () => {
    soundEnabled = !soundEnabled;
    if (!soundEnabled) {
      stopLaserSound();
      elements.laserAudio.pause();
      elements.laserAudio.currentTime = 0;
    }
    syncSoundButton();
    try {
      localStorage.setItem("nailoong-picker-sound-v2", soundEnabled ? "on" : "off");
    } catch (_) {
      // The switch remains usable without preference storage.
    }
    if (soundEnabled) await ensureAudioContext();
  });

  window.addEventListener("resize", () => {
    if (activeIndex !== null && elements.laserGroup.classList.contains("is-visible")) {
      aimAt(elements.nameGrid.children[activeIndex]);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.winnerReveal.hidden) {
      hideWinner();
      return;
    }
    if (
      event.code === "Space" &&
      !event.repeat &&
      document.activeElement !== elements.nameInput &&
      elements.winnerReveal.hidden
    ) {
      event.preventDefault();
      fireLaser();
    }
  });

  setLanguage(language);
})();
