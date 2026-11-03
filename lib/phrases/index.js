import { TAGALOG_AUDIO, TAGALOG_LESSONS } from "./tagalog-data.js";

export { TAGALOG_AUDIO, TAGALOG_LESSONS };
export { TAGALOG_SEARCH_PHRASES } from "./search.js";

export const PHRASE_TABS = [
  ["basics", "Basics"],
  ["vocabulary", "Vocabulary"],
  ["advanced", "Advanced"],
];

/** Descriptions already used on /learn. Cebuano and Ilonggo are not in this preview. */
export const APP_LANGUAGES = [
  {
    id: "tagalog",
    name: "Tagalog",
    description: "The national language, spoken across the Philippines",
    available: true,
  },
  {
    id: "cebuano",
    name: "Cebuano",
    description: "Spoken in Visayas and Mindanao",
    available: false,
  },
  {
    id: "ilonggo",
    name: "Ilonggo",
    description: "Spoken in Western Visayas",
    available: false,
  },
];

const skippedTagalogPhrases = [];

function pushPhrase(list, text, english, unit, tab, formal) {
  if (!text || text === "—") return;
  const audio = TAGALOG_AUDIO[text];
  if (!audio) {
    skippedTagalogPhrases.push({ text, english, unitId: unit.id, reason: "no audio mapping" });
    return;
  }
  list.push({
    id: audio.replace(/\.mp3$/i, ""),
    lang: "tagalog",
    tab,
    unitId: unit.id,
    unitTitle: unit.title,
    unitIcon: unit.icon,
    text,
    english,
    audio,
    formal,
  });
}

/** Flat Tagalog phrase list. Informal forms of a unit come before its formal forms. */
export function listTagalogPhrases() {
  skippedTagalogPhrases.length = 0;
  const phrases = [];
  for (const [tab] of PHRASE_TABS) {
    for (const unit of TAGALOG_LESSONS[tab]) {
      const informal = [];
      const formal = [];
      for (const row of unit.rows) {
        if (unit.hasFormal) {
          pushPhrase(informal, row[0], row[2], unit, tab, false);
          pushPhrase(formal, row[1], row[2], unit, tab, true);
        } else {
          pushPhrase(informal, row[0], row[1], unit, tab, false);
        }
      }
      phrases.push(...informal, ...formal);
    }
  }
  return phrases;
}

export function getSkippedTagalogPhrases() {
  listTagalogPhrases();
  return skippedTagalogPhrases;
}

/**
 * Split a unit into lessons of 5–8 phrases, preferring sizes near 6.
 * A length that cannot be partitioned that way (only Places, with 9)
 * stays as one lesson so we never invent or move a phrase into another unit.
 */
export function chunkSizes(n, min = 5, max = 8) {
  if (n <= max) return [n];
  let best = null;
  let bestScore = Infinity;
  for (let parts = 2; parts <= Math.ceil(n / min); parts++) {
    const base = Math.floor(n / parts);
    const extra = n % parts;
    const lo = base;
    const hi = extra ? base + 1 : base;
    if (lo < min || hi > max) continue;
    const sizes = Array.from({ length: parts }, (_, i) => (i < extra ? base + 1 : base));
    const score = sizes.reduce((sum, size) => sum + (size - 6) ** 2, 0);
    if (score < bestScore) {
      bestScore = score;
      best = sizes;
    }
  }
  return best || [n];
}

export function buildTagalogCourse() {
  const phrases = listTagalogPhrases();
  const units = [];
  for (const phrase of phrases) {
    let unit = units.find((item) => item.id === phrase.unitId);
    if (!unit) {
      unit = {
        id: phrase.unitId,
        title: phrase.unitTitle,
        icon: phrase.unitIcon,
        tab: phrase.tab,
        phrases: [],
      };
      units.push(unit);
    }
    unit.phrases.push(phrase);
  }

  const lessons = [];
  for (const unit of units) {
    const sizes = chunkSizes(unit.phrases.length);
    let offset = 0;
    unit.lessons = sizes.map((size, index) => {
      const slice = unit.phrases.slice(offset, offset + size);
      offset += size;
      const lesson = {
        id: `${unit.id}-${index + 1}`,
        index: lessons.length,
        unitId: unit.id,
        unitTitle: unit.title,
        icon: unit.icon,
        tab: unit.tab,
        part: index + 1,
        parts: sizes.length,
        phrases: slice,
      };
      lessons.push(lesson);
      return lesson;
    });
  }

  return { phrases, units, lessons };
}

export const tagalogCourse = buildTagalogCourse();

function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(list, rng) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function choiceOptions(phrase, field, bank, rng) {
  const correctLabel = phrase[field];
  const pool = bank.filter(
    (item) => item.id !== phrase.id && item.english !== phrase.english && item.text !== phrase.text,
  );
  const picked = [];
  const seen = new Set();
  for (const item of shuffle(pool, rng)) {
    const label = item[field];
    if (!label || label === correctLabel || seen.has(label)) continue;
    seen.add(label);
    picked.push(item);
    if (picked.length === 3) break;
  }
  return shuffle([phrase, ...picked], rng).map((item) => ({
    id: item.id,
    label: item[field],
  }));
}

/**
 * About 10 exercises for one lesson: two of each listening/reading choice,
 * one match set, then flashcards up to 10.
 * `seedKey` keeps the same lesson stable between visits.
 */
export function buildExercises(lessonPhrases, bank, seedKey) {
  const rng = mulberry32(hashSeed(String(seedKey)));
  const phrases = lessonPhrases.slice();
  const exercises = [];
  let cursor = 0;
  const nextPhrase = () => phrases[cursor++ % phrases.length];

  const choicePlan = [
    ["listen-meaning", "english"],
    ["listen-meaning", "english"],
    ["read-phrase", "text"],
    ["read-phrase", "text"],
    ["listen-phrase", "text"],
    ["listen-phrase", "text"],
  ];

  for (const [type, field] of choicePlan) {
    const phrase = nextPhrase();
    exercises.push({
      id: `${seedKey}:${exercises.length}`,
      type,
      phraseId: phrase.id,
      prompt: type === "read-phrase" ? phrase.english : null,
      options: choiceOptions(phrase, field, bank, rng),
      answerId: phrase.id,
    });
  }

  const unique = [];
  const seenEnglish = new Set();
  for (const phrase of shuffle(phrases, rng)) {
    if (seenEnglish.has(phrase.english)) continue;
    seenEnglish.add(phrase.english);
    unique.push(phrase);
    if (unique.length === 5) break;
  }
  if (unique.length >= 2) {
    const pairs = unique.map((phrase) => ({
      id: phrase.id,
      text: phrase.text,
      english: phrase.english,
    }));
    exercises.push({
      id: `${seedKey}:${exercises.length}`,
      type: "match",
      pairs,
      rightOrder: shuffle(pairs, rng).map((pair) => pair.id),
    });
  }

  while (exercises.length < 10 && phrases.length > 0) {
    const phrase = nextPhrase();
    exercises.push({
      id: `${seedKey}:${exercises.length}`,
      type: "flashcard",
      phraseId: phrase.id,
    });
  }

  return exercises;
}

export function pickReviewPhrases(duePhrases, dateStr) {
  const rng = mulberry32(hashSeed(`review|${dateStr}`));
  return shuffle(duePhrases, rng).slice(0, 8);
}

export function summarizeSession(events, bonus) {
  let xp = bonus;
  let correct = 0;
  for (const event of events) {
    if (event.correct) correct += 1;
    if (event.type === "flashcard") xp += event.correct ? 5 : 0;
    else if (event.type === "match") xp += event.correct ? 10 : 4;
    else xp += event.correct ? 10 : 0;
  }
  return { xp, correct, total: events.length };
}
