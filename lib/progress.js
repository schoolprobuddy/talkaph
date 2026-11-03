const PROFILE_KEY = "talkaph.profile.v1";
const DB_NAME = "talkaph";
const DB_STORE = "kv";
const PHRASES_KEY = "phrases";

/** Leitner intervals in days. Box 5 is mastered and leaves the review queue. */
export const LEITNER_INTERVAL_DAYS = { 1: 1, 2: 2, 3: 4, 4: 7 };

export const DEFAULT_PROFILE = {
  version: 1,
  xp: 0,
  streak: 0,
  lastActive: null,
  dailyGoalMin: 10,
  minutesByDate: {},
  completedLessons: [],
  favourites: [],
  offlineReady: false,
};

export function localDate(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(iso, days) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  return localDate(date);
}

function clampInt(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.round(n);
}

export function sanitizeProfile(input) {
  const source = input && typeof input === "object" ? input : {};
  const goal = [5, 10, 15].includes(source.dailyGoalMin) ? source.dailyGoalMin : 10;
  const minutesByDate = {};
  if (source.minutesByDate && typeof source.minutesByDate === "object") {
    for (const [day, minutes] of Object.entries(source.minutesByDate)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) continue;
      const amount = Number(minutes);
      if (!Number.isFinite(amount) || amount < 0) continue;
      minutesByDate[day] = Math.round(amount * 10) / 10;
    }
  }
  return {
    version: 1,
    xp: clampInt(source.xp),
    streak: clampInt(source.streak),
    lastActive: typeof source.lastActive === "string" ? source.lastActive : null,
    dailyGoalMin: goal,
    minutesByDate,
    completedLessons: Array.isArray(source.completedLessons)
      ? source.completedLessons.filter((id) => typeof id === "string")
      : [],
    favourites: Array.isArray(source.favourites)
      ? source.favourites.filter((id) => typeof id === "string")
      : [],
    offlineReady: Boolean(source.offlineReady),
  };
}

export function sanitizePhraseMap(input) {
  const source = input && typeof input === "object" ? input : {};
  const next = {};
  for (const [id, record] of Object.entries(source)) {
    if (!record || typeof record !== "object") continue;
    const box = clampInt(record.box);
    next[id] = {
      id,
      box: box >= 5 ? 5 : Math.max(1, box || 1),
      due: typeof record.due === "string" ? record.due : null,
      seen: clampInt(record.seen),
      correct: clampInt(record.correct),
    };
  }
  return next;
}

export function loadProfile() {
  if (typeof localStorage === "undefined") return sanitizeProfile(DEFAULT_PROFILE);
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return sanitizeProfile(DEFAULT_PROFILE);
    return sanitizeProfile(JSON.parse(raw));
  } catch {
    return sanitizeProfile(DEFAULT_PROFILE);
  }
}

export function saveProfile(profile) {
  const clean = sanitizeProfile(profile);
  localStorage.setItem(PROFILE_KEY, JSON.stringify(clean));
  return clean;
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(DB_STORE)) {
        request.result.createObjectStore(DB_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function idbGet(key) {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(DB_STORE, "readonly");
        const request = tx.objectStore(DB_STORE).get(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      }),
  );
}

function idbSet(key, value) {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(DB_STORE, "readwrite");
        tx.objectStore(DB_STORE).put(value, key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      }),
  );
}

export async function loadPhraseProgress() {
  try {
    return sanitizePhraseMap(await idbGet(PHRASES_KEY));
  } catch {
    return {};
  }
}

export async function savePhraseProgress(map) {
  const clean = sanitizePhraseMap(map);
  await idbSet(PHRASES_KEY, clean);
  return clean;
}

export async function loadProgress() {
  const profile = loadProfile();
  const phrases = await loadPhraseProgress();
  return { profile, phrases };
}

/**
 * Correct answers move up a box. Wrong answers return to box 1 and stay due today.
 * Box 5 is mastered (`due` null), so Review stops offering it.
 */
export function gradePhrase(record, phraseId, correct, today) {
  const prev = record || { id: phraseId, box: 0, due: null, seen: 0, correct: 0 };
  const box = correct ? Math.min(5, (prev.box || 0) + 1) : 1;
  const due = !correct ? today : box >= 5 ? null : addDays(today, LEITNER_INTERVAL_DAYS[box]);
  return {
    id: phraseId,
    box,
    due,
    seen: (prev.seen || 0) + 1,
    correct: (prev.correct || 0) + (correct ? 1 : 0),
  };
}

export function isDue(record, today) {
  return Boolean(record && record.due && record.due <= today);
}

export function markActive(profile, today) {
  if (profile.lastActive === today) return profile;
  const yesterday = addDays(today, -1);
  const streak = profile.lastActive === yesterday ? profile.streak + 1 : 1;
  return { ...profile, streak, lastActive: today };
}

export function addMinutes(profile, today, minutes) {
  const add = Number(minutes);
  if (!Number.isFinite(add) || add <= 0) return profile;
  const prev = Number(profile.minutesByDate[today] || 0);
  const total = Math.round((prev + add) * 10) / 10;
  return {
    ...profile,
    minutesByDate: { ...profile.minutesByDate, [today]: total },
  };
}

export async function exportProgress() {
  const { profile, phrases } = await loadProgress();
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    profile,
    phrases,
  };
}

export async function importProgress(data) {
  if (!data || data.version !== 1 || !data.profile || typeof data.profile !== "object") {
    throw new Error("This file is not a talkaPH progress export.");
  }
  const profile = saveProfile(data.profile);
  const phrases = await savePhraseProgress(data.phrases || {});
  return { profile, phrases };
}
