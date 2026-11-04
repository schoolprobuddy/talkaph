import { TAGALOG_AUDIO, TAGALOG_LESSONS } from "./tagalog-data.js";
import { CEBUANO_AUDIO, CEBUANO_LESSONS } from "./cebuano-data.js";
import { ILONGGO_AUDIO, ILONGGO_LESSONS } from "./ilonggo-data.js";

export { TAGALOG_AUDIO, TAGALOG_LESSONS };
export { TAGALOG_SEARCH_PHRASES } from "./search.js";

export const PHRASE_TABS = [
  ["basics", "Basics"],
  ["vocabulary", "Vocabulary"],
  ["advanced", "Advanced"],
];

/** Descriptions already used on /learn. */
export const APP_LANGUAGES = [
  {
    id: "tagalog",
    name: "Tagalog",
    description: "The national language, spoken across the Philippines",
  },
  {
    id: "cebuano",
    name: "Cebuano",
    description: "Spoken in Visayas and Mindanao",
  },
  {
    id: "ilonggo",
    name: "Ilonggo",
    description: "Spoken in Western Visayas",
  },
];

const LANGUAGE_SOURCES = {
  tagalog: { audio: TAGALOG_AUDIO, lessons: TAGALOG_LESSONS },
  cebuano: { audio: CEBUANO_AUDIO, lessons: CEBUANO_LESSONS },
  ilonggo: { audio: ILONGGO_AUDIO, lessons: ILONGGO_LESSONS },
};

/**
 * Lines we do not turn into cards. "—" alternate cells are empty columns, not phrases.
 * "Ano Oras" has a recording but no English gloss in the Ilonggo lesson tables.
 */
const EXTRA_SKIPPED = [
  {
    lang: "ilonggo",
    text: "Ano Oras",
    english: "",
    unitId: "",
    unitTitle: "",
    audio: "new_il_custom_ano_oras.mp3",
    reason: "A recording exists, but the lesson tables never give this line an English meaning.",
  },
];

function blankPhrase(text) {
  return !text || text === "—" || text === "-" || text === "...";
}

function listLanguagePhrases(lang, skipped) {
  const { audio, lessons } = LANGUAGE_SOURCES[lang];
  const phrases = [];
  const seen = new Set();
  for (const [tab] of PHRASE_TABS) {
    for (const unit of lessons[tab]) {
      const primary = [];
      const alternate = [];
      const rows = unit.hasFormal
        ? unit.rows.flatMap((row) => [
            [row[0], row[2], false],
            [row[1], row[2], true],
          ])
        : unit.rows.map((row) => [row[0], row[1], false]);
      for (const [text, english, isAlternate] of rows) {
        if (blankPhrase(text)) continue;
        const target = isAlternate ? alternate : primary;
        if (!english || blankPhrase(english)) {
          skipped.push({
            lang,
            text,
            english: english || "",
            unitId: unit.id,
            unitTitle: unit.title,
            reason: "The lesson row has no English meaning.",
          });
          continue;
        }
        if (seen.has(text)) {
          skipped.push({
            lang,
            text,
            english,
            unitId: unit.id,
            unitTitle: unit.title,
            reason: "The same phrase and recording are already in an earlier unit.",
          });
          continue;
        }
        const file = audio[text];
        if (!file) {
          skipped.push({
            lang,
            text,
            english,
            unitId: unit.id,
            unitTitle: unit.title,
            reason: "No audio file is mapped for this phrase.",
          });
          continue;
        }
        seen.add(text);
        target.push({
          id: `${lang}:${file.replace(/\.mp3$/i, "")}`,
          lang,
          tab,
          unitId: unit.id,
          unitTitle: unit.title,
          unitIcon: unit.icon,
          text,
          english,
          audio: file,
          variant: isAlternate ? unit.col2Label || "Formal (po)" : "",
        });
      }
      phrases.push(...primary, ...alternate);
    }
  }
  return phrases;
}

const skippedPhrases = [];

export function listLanguagePhrasesFresh(lang) {
  return listLanguagePhrases(lang, []);
}

export function getSkippedPhrases() {
  return skippedPhrases;
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

export function buildCourse(lang) {
  const phrases = listLanguagePhrases(lang, skippedPhrases);
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
        lang,
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

  return { lang, phrases, units, lessons };
}

// Build every course once so skipped phrases are collected in order.
skippedPhrases.push(...EXTRA_SKIPPED);
export const courses = Object.fromEntries(APP_LANGUAGES.map((language) => [language.id, buildCourse(language.id)]));
export const tagalogCourse = courses.tagalog;

export function findLesson(lessonId) {
  for (const course of Object.values(courses)) {
    const lesson = course.lessons.find((item) => item.id === lessonId);
    if (lesson) return { course, lesson };
  }
  return null;
}

export const phrasesById = new Map(
  Object.values(courses).flatMap((course) => course.phrases.map((phrase) => [phrase.id, phrase])),
);

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
