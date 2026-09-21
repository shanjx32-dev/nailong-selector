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
      modeLabel: "选择演出模式",
      classicMode: "经典激光",
      classicDesc: "快速扫描，直接锁定",
      epicMode: "奶龙能量抢夺",
      epicDesc: "全员争夺核心，最终激光锁定",
      modeGuideTitle: "模式介绍",
      classicGuide: "快速扫描全部姓名并直接锁定，适合课堂点名和快速选择。",
      epicGuide: "姓名在竞技场中碰撞传递核心，扰乱球与能量雨会改变局势，最终由奶龙激光揭晓结果。",
      modeGuideFair: "两种模式使用相同的安全随机规则；动画只负责演出，不会改变任何人的概率。",
      raceSequence: "奶龙杯 · 全员能量争夺",
      startShort: "唤醒",
      battleShort: "争夺",
      sprintShort: "过载",
      photoShort: "锁定",
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
      fireClassic: "发射激光",
      fireEpic: "启动能量争夺",
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
      raceStartStatus: "能量核心正在唤醒",
      raceBattleStatus: "全员争夺中",
      raceSprintStatus: "核心进入过载",
      racePhotoStatus: "最终激光锁定",
      raceStartTitle: "核心唤醒",
      raceStartCopy: "全员进入轨道，能量反应持续增强",
      raceBattleTitle: "全员争夺",
      raceBattleCopy: "核心不断易主，能量排名随时可能反转",
      raceSprintTitle: "能量过载",
      raceSprintCopy: "转移速度加快，领先者只剩微弱优势",
      racePhotoTitle: "最终锁定",
      racePhotoCopy: "竞技场熄灯，奶龙双眼正在确认最高能量",
      photoReview: "ENERGY OVERLOAD · 正在锁定",
      liveRanking: "能量排行",
      energyAwake: "核心已唤醒",
      energyTransfer: (name) => `${name} 抢到能量核心`,
      energyCollision: (from, to) => `${from} 撞上 ${to} · 能量已传递`,
      chaosHit: (name) => `扰乱球撞击 ${name} · 轨道偏转`,
      energySurge: "全场能量重排",
      energyRain: "随机能量雨 · 多人获得充能",
      energyFinal: (name) => `最终能量锁定：${name}`,
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
      modeLabel: "Choose show mode",
      classicMode: "Classic Laser",
      classicDesc: "Quick scan and direct lock",
      epicMode: "Nailoong Energy Clash",
      epicDesc: "Everyone fights for the core until laser lock",
      modeGuideTitle: "How the modes work",
      classicGuide: "Scans every name and locks the result quickly—ideal for roll call and fast picks.",
      epicGuide: "Names collide to pass the core while the chaos ball and energy rain reshape the match. Nailoong’s laser reveals the final result.",
      modeGuideFair: "Both modes use the same secure random selection. The animation never changes anyone’s odds.",
      raceSequence: "NAILOONG CUP · ALL-PLAYER ENERGY CLASH",
      startShort: "Awaken",
      battleShort: "Clash",
      sprintShort: "Overload",
      photoShort: "Lock",
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
      fireClassic: "Fire laser",
      fireEpic: "Start Energy Clash",
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
      raceStartStatus: "Energy core awakening",
      raceBattleStatus: "All-player clash in progress",
      raceSprintStatus: "Core overload in progress",
      racePhotoStatus: "Final laser lock",
      raceStartTitle: "Core awakening",
      raceStartCopy: "Everyone enters orbit as the energy reaction builds",
      raceBattleTitle: "All-player clash",
      raceBattleCopy: "The core keeps changing hands and the ranking can flip anytime",
      raceSprintTitle: "Energy overload",
      raceSprintCopy: "Transfers accelerate and the leaders are nearly tied",
      racePhotoTitle: "Final lock",
      racePhotoCopy: "The arena goes dark while Nailoong confirms the strongest signal",
      photoReview: "ENERGY OVERLOAD · LOCKING",
      liveRanking: "ENERGY RANKING",
      energyAwake: "CORE AWAKENED",
      energyTransfer: (name) => `${name} captured the energy core`,
      energyCollision: (from, to) => `${from} collided with ${to} · energy transferred`,
      chaosHit: (name) => `Chaos ball hit ${name} · orbit disrupted`,
      energySurge: "ARENA ENERGY RESHUFFLED",
      energyRain: "RANDOM ENERGY RAIN · MULTIPLE BOOSTS",
      energyFinal: (name) => `FINAL ENERGY LOCK: ${name}`,
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
    modeOptions: document.querySelectorAll("[data-mode]"),
    languageToggle: $("#languageToggle"),
    languageOptions: document.querySelectorAll("[data-lang-option]"),
    laserGroup: $("#laserGroup"),
    laserLeft: $("#laserLeft"),
    laserRight: $("#laserRight"),
    laserLeftGlow: $("#laserLeftGlow"),
    laserRightGlow: $("#laserRightGlow"),
    impactRing: $("#impactRing"),
    impactCore: $("#impactCore"),
    raceStage: $("#raceStage"),
    raceVisual: $("#raceVisual"),
    raceField: $("#raceField"),
    energyTether: $("#energyTether"),
    energyTetherLines: document.querySelectorAll("#energyTether line"),
    energyRain: $("#energyRain"),
    raceCountdown: $("#raceCountdown"),
    energyCore: $("#energyCore"),
    chaosBall: $("#chaosBall"),
    energyEvent: $("#energyEvent"),
    racePhaseTitle: $("#racePhaseTitle"),
    racePhaseCopy: $("#racePhaseCopy"),
    photoFinish: $("#photoFinish"),
    leaderboardRows: $("#leaderboardRows"),
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
  let selectionMode = getSavedMode();
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
  let energyAnimationFrame = null;
  let currentEnergyHolderIndex = null;
  let energyCollisionCooldown = 0;
  let chaosCollisionCooldown = 0;
  let energyFieldWidth = 1;
  let energyFieldHeight = 1;

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

  function getSavedMode() {
    try {
      const saved = localStorage.getItem("nailoong-picker-mode-v2");
      if (saved === "classic" || saved === "epic") return saved;
    } catch (_) {
      // The epic mode remains the default when storage is unavailable.
    }
    return "epic";
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
    syncModeUI();
    syncDynamicText();
    try {
      localStorage.setItem("nailoong-picker-language", language);
    } catch (_) {
      // Preference saving is optional.
    }
  }

  function syncModeUI() {
    elements.modeOptions.forEach((option) => {
      const isActive = option.dataset.mode === selectionMode;
      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-pressed", String(isActive));
    });
    const label = elements.fireButton.querySelector(".fire-label");
    if (label) label.textContent = t(selectionMode === "epic" ? "fireEpic" : "fireClassic");
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
    audio.playbackRate = reducedMotion ? 1.8 : selectionMode === "epic" ? 0.72 : 1;
    const fallbackContextPromise = ensureAudioContext();
    try {
      await audio.play();
      return { usesFile: true, context: await fallbackContextPromise };
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
    } else if (uiState === "raceStart") {
      elements.scanStatus.textContent = t("raceStartStatus");
      elements.racePhaseTitle.textContent = t("raceStartTitle");
      elements.racePhaseCopy.textContent = t("raceStartCopy");
    } else if (uiState === "raceBattle") {
      elements.scanStatus.textContent = t("raceBattleStatus");
      elements.racePhaseTitle.textContent = t("raceBattleTitle");
      elements.racePhaseCopy.textContent = t("raceBattleCopy");
    } else if (uiState === "raceSprint") {
      elements.scanStatus.textContent = t("raceSprintStatus");
      elements.racePhaseTitle.textContent = t("raceSprintTitle");
      elements.racePhaseCopy.textContent = t("raceSprintCopy");
    } else if (uiState === "racePhoto") {
      elements.scanStatus.textContent = t("racePhotoStatus");
      elements.racePhaseTitle.textContent = t("racePhotoTitle");
      elements.racePhaseCopy.textContent = t("racePhotoCopy");
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

  function isCrownedName(name) {
    const normalized = name
      .normalize("NFKC")
      .replace(/[\s·._\-—|/\\]+/g, "")
      .toLowerCase();
    return normalized === "山君行" || normalized === "kestrel" || (normalized.includes("山君行") && normalized.includes("kestrel"));
  }

  function renderRoster() {
    const fragment = document.createDocumentFragment();
    roster.forEach((name, index) => {
      const card = document.createElement("div");
      card.className = "name-card";
      card.dataset.index = String(index);
      card.textContent = name;
      card.classList.toggle("is-crowned", isCrownedName(name));
      fragment.append(card);
    });
    elements.nameGrid.replaceChildren(fragment);
    elements.emptyState.hidden = true;
    elements.fireButton.disabled = false;
    elements.statusPill.classList.add("is-ready");
  }

  function secureShuffle(values) {
    const result = [...values];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swapIndex = secureRandomIndex(index + 1);
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  }

  function secureRandomUnit() {
    const buffer = new Uint32Array(1);
    crypto.getRandomValues(buffer);
    return buffer[0] / 0x100000000;
  }

  function playPhasePing(context, frequency = 520, duration = 0.1) {
    if (!context || !soundEnabled) return;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.34, now + duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  }

  function energyToken(index) {
    return elements.raceField.querySelector(`[data-roster-index="${index}"]`);
  }

  function createEnergyArena() {
    const contenders = roster.map((name, index) => ({
      index,
      name,
      score: secureRandomIndex(4),
      angle: (Math.PI * 2 * index) / Math.max(1, roster.length) + secureRandomUnit() * 0.18,
      ring: index % (roster.length > 42 ? 4 : 3),
      speed: 0.00016 + secureRandomUnit() * 0.00013,
      direction: index % 2 ? 1 : -1,
      wobble: secureRandomUnit() * Math.PI * 2,
      magnetUntil: 0,
      x: 50,
      y: 50,
      previousRank: index + 1
    }));
    const fragment = document.createDocumentFragment();
    contenders.forEach((contender) => {
      const token = document.createElement("div");
      token.className = "energy-token";
      token.classList.toggle("is-crowned", isCrownedName(contender.name));
      token.dataset.rosterIndex = String(contender.index);
      token.style.setProperty("--racer-hue", String((contender.index * 47 + 34) % 360));
      token.innerHTML = `<i aria-hidden="true"></i><b></b><em>${contender.score}</em>`;
      token.querySelector("b").textContent = contender.name;
      contender.token = token;
      fragment.append(token);
    });
    elements.raceField.replaceChildren(fragment);
    elements.raceStage.classList.toggle("is-dense", roster.length > 28);
    elements.raceStage.classList.toggle("is-mega", roster.length > 70);
    updateEnergyLeaderboard(contenders);
    return contenders;
  }

  function rankedContenders(contenders) {
    return [...contenders].sort((a, b) => b.score - a.score || a.index - b.index);
  }

  function showEnergyEvent(message) {
    elements.energyEvent.textContent = message;
    elements.energyEvent.classList.remove("is-visible");
    void elements.energyEvent.offsetWidth;
    elements.energyEvent.classList.add("is-visible");
  }

  function startEnergyMotion(contenders, soundContext) {
    const startedAt = performance.now();
    let lastFrame = startedAt;
    energyFieldWidth = Math.max(1, elements.raceVisual.clientWidth);
    energyFieldHeight = Math.max(1, elements.raceVisual.clientHeight);
    const ringCount = contenders.length > 42 ? 4 : 3;
    const chaos = {
      x: 20 + secureRandomUnit() * 18,
      y: 20 + secureRandomUnit() * 22,
      vx: (secureRandomUnit() < 0.5 ? -1 : 1) * (0.035 + secureRandomUnit() * 0.018),
      vy: (secureRandomUnit() < 0.5 ? -1 : 1) * (0.028 + secureRandomUnit() * 0.016)
    };
    const tick = (now) => {
      const elapsed = now - startedAt;
      const delta = Math.min(32, Math.max(0, now - lastFrame));
      lastFrame = now;
      const phase = elements.raceStage.dataset.phase;
      const speedFactor = phase === "sprint" ? 2.15 : phase === "battle" ? 1.48 : 1.12;
      contenders.forEach((contender) => {
        contender.angle += delta * contender.speed * contender.direction * speedFactor;
        const radiusStep = ringCount === 4 ? 6.7 : 8.8;
        const radiusX = 18 + contender.ring * radiusStep;
        const radiusY = 15 + contender.ring * (radiusStep * 0.72);
        const breathing = Math.sin(elapsed * 0.0012 + contender.wobble) * 1.4;
        contender.x = 48 + Math.cos(contender.angle) * (radiusX + breathing);
        contender.y = 51 + Math.sin(contender.angle) * (radiusY + breathing * 0.55);
      });

      const holder = contenders.find((contender) => contender.index === currentEnergyHolderIndex);
      contenders.forEach((contender) => {
        if (holder && contender.index !== holder.index && contender.magnetUntil > now) {
          const remaining = Math.max(0, contender.magnetUntil - now);
          const pull = 0.11 + (1 - remaining / 720) * 0.24;
          contender.x += (holder.x - contender.x) * pull;
          contender.y += (holder.y - contender.y) * pull;
        } else if (contender.magnetUntil && contender.magnetUntil <= now) {
          contender.magnetUntil = 0;
          contender.token.classList.remove("is-on-course");
        }
        const token = contender.token;
        if (!token) return;
        token.style.translate = `${(contender.x * energyFieldWidth) / 100}px ${(contender.y * energyFieldHeight) / 100}px`;
      });

      const chaosFactor = phase === "sprint" ? 1.5 : 1;
      chaos.x += chaos.vx * delta * chaosFactor;
      chaos.y += chaos.vy * delta * chaosFactor;
      if (chaos.x < 7 || chaos.x > 89) {
        chaos.x = Math.max(7, Math.min(89, chaos.x));
        chaos.vx *= -1;
      }
      if (chaos.y < 10 || chaos.y > 90) {
        chaos.y = Math.max(10, Math.min(90, chaos.y));
        chaos.vy *= -1;
      }
      elements.chaosBall.style.left = `${chaos.x}%`;
      elements.chaosBall.style.top = `${chaos.y}%`;

      if ((phase === "battle" || phase === "sprint") && now >= chaosCollisionCooldown) {
        const chaosHit = contenders.find((contender) => {
          const dx = (contender.x - chaos.x) / 6.8;
          const dy = (contender.y - chaos.y) / 5.4;
          return dx * dx + dy * dy < 1;
        });
        if (chaosHit) {
          chaosCollisionCooldown = now + 620;
          chaosHit.direction *= -1;
          chaosHit.speed = Math.min(0.00031, chaosHit.speed * (1.12 + secureRandomUnit() * 0.18));
          chaosHit.ring = secureRandomIndex(ringCount);
          chaosHit.wobble += 1.4;
          chaosHit.token.classList.remove("is-bumped");
          void chaosHit.token.offsetWidth;
          chaosHit.token.classList.add("is-bumped");
          elements.chaosBall.classList.remove("is-impact");
          void elements.chaosBall.offsetWidth;
          elements.chaosBall.classList.add("is-impact");
          chaos.vx *= -1.06;
          chaos.vy *= -1.06;
          showEnergyEvent(t("chaosHit", chaosHit.name));
          playPhasePing(soundContext, 350 + secureRandomIndex(180), 0.07);
        }
      }

      if (holder && (phase === "battle" || phase === "sprint") && now >= energyCollisionCooldown) {
        const collision = contenders
          .filter((contender) => contender.index !== holder.index)
          .map((contender) => {
            const dx = (contender.x - holder.x) / 9.4;
            const dy = (contender.y - holder.y) / 7.2;
            return { contender, distance: dx * dx + dy * dy };
          })
          .filter((item) => item.distance < 1)
          .sort((a, b) => a.distance - b.distance)[0];
        if (collision) {
          energyCollisionCooldown = now + (phase === "sprint" ? 360 : 610);
          transferEnergy(contenders, collision.contender.index, 4 + secureRandomIndex(7), soundContext, phase === "sprint", holder);
        }
      }

      elements.energyCore.style.left = `${holder ? holder.x : 48}%`;
      elements.energyCore.style.top = `${holder ? holder.y : 51}%`;
      elements.energyTetherLines.forEach((line) => {
        line.setAttribute("x2", `${holder ? holder.x : 48}%`);
        line.setAttribute("y2", `${holder ? holder.y : 51}%`);
      });
      energyAnimationFrame = requestAnimationFrame(tick);
    };
    energyAnimationFrame = requestAnimationFrame(tick);
  }

  function updateEnergyLeaderboard(contenders) {
    const previous = new Map(contenders.map((contender) => [contender.index, contender.previousRank]));
    const ranked = rankedContenders(contenders);
    const top = ranked.slice(0, 4);
    const fragment = document.createDocumentFragment();
    top.forEach((contender, position) => {
      const row = document.createElement("li");
      const prior = previous.get(contender.index) || position + 1;
      const direction = prior > position + 1 ? "↑" : prior < position + 1 ? "↓" : "–";
      row.innerHTML = `<em>${position + 1}</em><span></span><b>${direction} ⚡${contender.score}</b>`;
      row.querySelector("span").textContent = contender.name;
      fragment.append(row);
    });
    elements.leaderboardRows.replaceChildren(fragment);
    ranked.forEach((contender, position) => {
      contender.previousRank = position + 1;
      energyToken(contender.index)?.classList.toggle("is-leading", position < 3);
    });
  }

  function setRacePhase(phase) {
    elements.raceStage.dataset.phase = phase;
    uiState = phase === "start" ? "raceStart" : phase === "battle" ? "raceBattle" : phase === "sprint" ? "raceSprint" : "racePhoto";
    syncDynamicText();
  }

  function transferEnergy(contenders, nextIndex, points, soundContext, intense = false, collisionFrom = null) {
    const previousToken = energyToken(currentEnergyHolderIndex);
    previousToken?.classList.remove("is-holder");
    currentEnergyHolderIndex = nextIndex;
    const contender = contenders.find((item) => item.index === nextIndex);
    if (!contender) return;
    contender.score += points;
    const token = energyToken(nextIndex);
    token?.classList.add("is-holder");
    contender.magnetUntil = 0;
    token?.classList.remove("is-on-course");
    token?.querySelector("em")?.replaceChildren(String(contender.score));
    elements.energyCore.classList.remove("is-jumping");
    void elements.energyCore.offsetWidth;
    elements.energyCore.classList.add("is-jumping");
    showEnergyEvent(collisionFrom ? t("energyCollision", collisionFrom.name, contender.name) : t("energyTransfer", contender.name));
    if (collisionFrom) {
      elements.raceStage.style.setProperty("--collision-x", `${(collisionFrom.x + contender.x) / 2}%`);
      elements.raceStage.style.setProperty("--collision-y", `${(collisionFrom.y + contender.y) / 2}%`);
      elements.raceStage.classList.remove("is-colliding");
      void elements.raceStage.offsetWidth;
      elements.raceStage.classList.add("is-colliding");
      previousToken?.classList.add("is-collider");
      token?.classList.add("is-collider");
      window.setTimeout(() => {
        previousToken?.classList.remove("is-collider");
        token?.classList.remove("is-collider");
      }, 430);
    }
    updateEnergyLeaderboard(contenders);
    playPhasePing(soundContext, intense ? 790 + secureRandomIndex(250) : 470 + secureRandomIndex(210), intense ? 0.12 : 0.075);
  }

  function chooseEnergyHolder(contenders, avoidIndex, allowedIndexes = null) {
    const pool = contenders.filter((contender) => {
      if (contender.index === avoidIndex) return false;
      return !allowedIndexes || allowedIndexes.has(contender.index);
    });
    return (pool[secureRandomIndex(pool.length)] || contenders[0]).index;
  }

  function setCollisionCourse(contenders, targetIndex) {
    const target = contenders.find((contender) => contender.index === targetIndex);
    if (!target) return;
    target.magnetUntil = performance.now() + 720;
    target.token.classList.remove("is-on-course");
    void target.token.offsetWidth;
    target.token.classList.add("is-on-course");
  }

  function triggerEnergySurge(contenders, soundContext) {
    const shuffled = secureShuffle(contenders).slice(0, Math.min(5, contenders.length));
    shuffled.forEach((contender) => {
      contender.score += 2 + secureRandomIndex(6);
      energyToken(contender.index)?.querySelector("em")?.replaceChildren(String(contender.score));
    });
    elements.raceStage.classList.remove("is-surging");
    void elements.raceStage.offsetWidth;
    elements.raceStage.classList.add("is-surging");
    elements.energyEvent.textContent = t("energySurge");
    updateEnergyLeaderboard(contenders);
    playPhasePing(soundContext, 980, 0.18);
  }

  function triggerEnergyRain(contenders, soundContext) {
    const fragment = document.createDocumentFragment();
    const dropCount = reducedMotion ? 10 : 34;
    for (let index = 0; index < dropCount; index += 1) {
      const drop = document.createElement("i");
      drop.className = "energy-drop";
      drop.style.setProperty("--rain-x", `${3 + secureRandomUnit() * 94}%`);
      drop.style.setProperty("--rain-delay", `${secureRandomUnit() * 0.6}s`);
      drop.style.setProperty("--rain-duration", `${0.75 + secureRandomUnit() * 0.75}s`);
      drop.style.setProperty("--rain-hue", String(36 + secureRandomIndex(170)));
      fragment.append(drop);
    }
    elements.energyRain.replaceChildren(fragment);
    elements.energyRain.classList.remove("is-active");
    void elements.energyRain.offsetWidth;
    elements.energyRain.classList.add("is-active");
    const boosted = secureShuffle(contenders).slice(0, Math.min(6, contenders.length));
    boosted.forEach((contender) => {
      contender.score += 2 + secureRandomIndex(6);
      contender.token.querySelector("em")?.replaceChildren(String(contender.score));
      contender.token.classList.remove("is-rain-boosted");
      void contender.token.offsetWidth;
      contender.token.classList.add("is-rain-boosted");
    });
    updateEnergyLeaderboard(contenders);
    showEnergyEvent(t("energyRain"));
    playPhasePing(soundContext, 1060, 0.22);
    window.setTimeout(() => {
      elements.energyRain.classList.remove("is-active");
      elements.energyRain.replaceChildren();
      boosted.forEach((contender) => contender.token?.classList.remove("is-rain-boosted"));
    }, reducedMotion ? 180 : 1900);
  }

  function cleanupRaceStage() {
    if (energyAnimationFrame !== null) cancelAnimationFrame(energyAnimationFrame);
    energyAnimationFrame = null;
    currentEnergyHolderIndex = null;
    energyCollisionCooldown = 0;
    chaosCollisionCooldown = 0;
    elements.raceStage.hidden = true;
    elements.raceStage.setAttribute("aria-hidden", "true");
    elements.raceStage.removeAttribute("data-phase");
    elements.raceStage.classList.remove("is-dense", "is-mega", "is-photo", "is-surging", "is-locking", "is-colliding");
    elements.raceStage.style.removeProperty("--collision-x");
    elements.raceStage.style.removeProperty("--collision-y");
    elements.raceField.replaceChildren();
    elements.leaderboardRows.replaceChildren();
    elements.raceCountdown.textContent = "";
    elements.energyEvent.textContent = "";
    elements.energyEvent.classList.remove("is-visible");
    elements.energyRain.classList.remove("is-active");
    elements.energyRain.replaceChildren();
    elements.energyCore.classList.remove("is-jumping", "is-locked");
    elements.energyCore.style.left = "48%";
    elements.energyCore.style.top = "51%";
    elements.energyTetherLines.forEach((line) => {
      line.setAttribute("x2", "48%");
      line.setAttribute("y2", "51%");
    });
    elements.chaosBall.classList.remove("is-impact");
    elements.chaosBall.style.left = "20%";
    elements.chaosBall.style.top = "20%";
    elements.photoFinish.hidden = true;
    elements.arena.classList.remove("is-epic");
  }

  async function runNailoongCup(selectedWinnerIndex, soundContext) {
    const speed = reducedMotion ? 0.1 : 1;
    elements.raceStage.hidden = false;
    elements.raceStage.setAttribute("aria-hidden", "false");
    elements.targetZone.scrollTop = 0;
    elements.arena.classList.add("is-epic", "is-charging");
    const contenders = createEnergyArena();
    startEnergyMotion(contenders, soundContext);
    setRacePhase("start");
    for (const mark of ["3", "2", "1", "GO"]) {
      elements.raceCountdown.textContent = mark;
      elements.raceCountdown.classList.remove("is-popping");
      void elements.raceCountdown.offsetWidth;
      elements.raceCountdown.classList.add("is-popping");
      playPhasePing(soundContext, mark === "GO" ? 740 : 310 + Number(mark || 0) * 65, 0.12);
      await delay((mark === "GO" ? 360 : 330) * speed);
    }
    elements.raceCountdown.textContent = "";
    elements.energyEvent.textContent = t("energyAwake");
    elements.energyEvent.classList.add("is-visible");
    elements.arena.classList.remove("is-charging");
    elements.arena.classList.add("is-firing");
    setRacePhase("battle");
    transferEnergy(contenders, secureRandomIndex(contenders.length), 5, soundContext);
    await delay((reducedMotion ? 30 : 330) * speed);
    const battleTransfers = reducedMotion ? 3 : 7;
    for (let step = 0; step < battleTransfers; step += 1) {
      const nextIndex = chooseEnergyHolder(contenders, currentEnergyHolderIndex);
      setCollisionCourse(contenders, nextIndex);
      if (step === 2) triggerEnergyRain(contenders, soundContext);
      if (step === 5) triggerEnergySurge(contenders, soundContext);
      await delay((reducedMotion ? 36 : 430 + secureRandomIndex(170)) * speed);
    }

    setRacePhase("sprint");
    const nearLeaders = rankedContenders(contenders).filter((contender) => contender.index !== selectedWinnerIndex).slice(0, Math.min(4, contenders.length - 1));
    const finalistIndexes = new Set([selectedWinnerIndex, ...nearLeaders.map((contender) => contender.index)]);
    const highScore = Math.max(...contenders.map((contender) => contender.score));
    contenders.forEach((contender) => {
      if (finalistIndexes.has(contender.index)) contender.score = highScore - secureRandomIndex(5);
    });
    updateEnergyLeaderboard(contenders);
    const overloadTransfers = reducedMotion ? 3 : 6;
    for (let step = 0; step < overloadTransfers; step += 1) {
      const nextIndex = chooseEnergyHolder(contenders, currentEnergyHolderIndex, finalistIndexes);
      setCollisionCourse(contenders, nextIndex);
      await delay((reducedMotion ? 34 : 250 + secureRandomIndex(120)) * speed);
    }

    setRacePhase("photo");
    elements.raceStage.classList.add("is-photo", "is-locking");
    energyToken(currentEnergyHolderIndex)?.classList.remove("is-holder");
    currentEnergyHolderIndex = null;
    contenders.forEach((contender) => energyToken(contender.index)?.classList.toggle("is-dim", !finalistIndexes.has(contender.index)));
    elements.photoFinish.hidden = false;
    playPhasePing(soundContext, 920, 0.28);
    await delay((reducedMotion ? 70 : 760) * speed);

    const selectedWinner = contenders.find((contender) => contender.index === selectedWinnerIndex);
    selectedWinner.score = Math.max(...contenders.map((contender) => contender.score)) + 7;
    transferEnergy(contenders, selectedWinnerIndex, 0, soundContext, true);
    const winningToken = energyToken(selectedWinnerIndex);
    winningToken?.classList.remove("is-dim");
    winningToken?.classList.add("is-winner");
    elements.energyCore.classList.add("is-locked");
    elements.energyEvent.textContent = t("energyFinal", selectedWinner.name);
    flash();
    createParticles();
    playPhasePing(soundContext, 1180, 0.34);
    await delay((reducedMotion ? 90 : 980) * speed);
    cleanupRaceStage();
  }

  function clearCardStates() {
    document.querySelectorAll(".name-card").forEach((card) => {
      card.classList.remove("is-scanned", "is-winner");
    });
    activeIndex = null;
    winnerIndex = null;
    elements.arena.classList.remove("is-charging", "is-firing", "has-hit");
    elements.laserGroup.classList.remove("is-visible");
    cleanupRaceStage();
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
    if (selectionMode === "epic") {
      if (!sequenceAudio.usesFile) playChargeSound(soundContext);
      await runNailoongCup(winnerIndex, soundContext);
      elements.laserGroup.classList.add("is-visible");
    } else {
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

  elements.modeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      if (isBusy) return;
      selectionMode = option.dataset.mode;
      syncModeUI();
      try {
        localStorage.setItem("nailoong-picker-mode-v2", selectionMode);
      } catch (_) {
        // Mode selection remains available without preference storage.
      }
    });
  });

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
    if (!elements.raceStage.hidden) {
      energyFieldWidth = Math.max(1, elements.raceVisual.clientWidth);
      energyFieldHeight = Math.max(1, elements.raceVisual.clientHeight);
    }
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
