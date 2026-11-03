"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  APP_LANGUAGES,
  PHRASE_TABS,
  buildExercises,
  pickReviewPhrases,
  summarizeSession,
  tagalogCourse,
} from "../../lib/phrases";
import { downloadTagalogOffline } from "../../lib/offline";
import {
  addMinutes,
  exportProgress,
  gradePhrase,
  importProgress,
  isDue,
  loadProgress,
  localDate,
  markActive,
  savePhraseProgress,
  saveProfile,
} from "../../lib/progress";

const course = tagalogCourse;
const phraseById = new Map(course.phrases.map((phrase) => [phrase.id, phrase]));

let currentAudio = null;
function playFile(filename) {
  if (!filename || typeof Audio === "undefined") return;
  if (currentAudio) currentAudio.pause();
  const audio = new Audio(`/${filename.replace(/^\//, "")}`);
  currentAudio = audio;
  audio.play().catch(() => {});
}

function formatMin(value) {
  const rounded = Math.round(Number(value || 0) * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function viewFromHash(hash) {
  const path = (hash || "").replace(/^#/, "") || "/";
  if (path.startsWith("/lesson/")) {
    return { name: "lesson", lessonId: decodeURIComponent(path.slice("/lesson/".length)) };
  }
  if (path === "/review") return { name: "review" };
  if (path === "/phrasebook") return { name: "phrasebook" };
  if (path === "/more") return { name: "more" };
  return { name: "map" };
}

export default function PracticeApp() {
  const [view, setView] = useState({ name: "map" });
  const [profile, setProfile] = useState(null);
  const [phraseProgress, setPhraseProgress] = useState({});
  const [ready, setReady] = useState(false);
  const [today, setToday] = useState("");
  const [soon, setSoon] = useState(null);
  const [download, setDownload] = useState({ state: "idle", pct: 0, error: "" });
  const [session, setSession] = useState(null);
  const profileRef = useRef(null);
  const progressRef = useRef({});
  const activeProfile = profile || emptyProfile();

  useEffect(() => {
    let cancel = false;
    loadProgress().then(({ profile: stored, phrases }) => {
      if (cancel) return;
      profileRef.current = stored;
      progressRef.current = phrases;
      setProfile(stored);
      setPhraseProgress(phrases);
      setToday(localDate());
      setReady(true);
    });
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    function apply() {
      setView(viewFromHash(window.location.hash));
    }
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {});
  }, []);

  function commitProfile(updater) {
    const next = updater(profileRef.current || emptyProfile());
    profileRef.current = next;
    setProfile(next);
    saveProfile(next);
    return next;
  }

  function commitGrades(grades) {
    const day = localDate();
    let cursor = progressRef.current;
    for (const grade of grades) {
      cursor = {
        ...cursor,
        [grade.id]: gradePhrase(cursor[grade.id], grade.id, grade.correct, day),
      };
    }
    progressRef.current = cursor;
    setPhraseProgress(cursor);
    savePhraseProgress(cursor);
  }

  function go(hash) {
    const next = hash.startsWith("#") ? hash : `#${hash}`;
    if (window.location.hash === next) setView(viewFromHash(next));
    else window.location.hash = next;
  }

  function openLesson(lesson) {
    if (!ready) return;
    const unlocked = isLessonUnlocked(lesson, activeProfile.completedLessons);
    if (!unlocked) return;
    go(`/lesson/${lesson.id}`);
  }

  function leaveSession(elapsedMin = 0) {
    if (elapsedMin > 0) commitProfile((prev) => addMinutes(prev, localDate(), elapsedMin));
    go("/");
  }

  function finishSession(kind, title, lessonId, events, elapsedMin) {
    const summary = summarizeSession(events, kind === "lesson" ? 20 : 10);
    const day = localDate();
    commitProfile((prev) => {
      let next = markActive(addMinutes(prev, day, elapsedMin), day);
      next = { ...next, xp: next.xp + summary.xp };
      if (kind === "lesson" && lessonId && !next.completedLessons.includes(lessonId)) {
        next = { ...next, completedLessons: [...next.completedLessons, lessonId] };
      }
      return next;
    });
    setSession({ ...summary, elapsedMin, title, kind });
    setView({ name: "complete" });
  }

  const due = useMemo(() => {
    if (!today) return [];
    return course.phrases.filter((phrase) => isDue(phraseProgress[phrase.id], today));
  }, [phraseProgress, today]);

  const showNav = view.name !== "lesson" && view.name !== "review";
  const minutes = today ? activeProfile.minutesByDate[today] || 0 : 0;

  return (
    <div style={shell} className="practice-app" data-ready={ready ? "true" : "false"}>
      <style>{css}</style>
      <div style={column}>
        {view.name === "map" && (
          <CourseMap
            profile={activeProfile}
            minutes={minutes}
            dueCount={due.length}
            download={download}
            onGoal={(minutesGoal) => commitProfile((prev) => ({ ...prev, dailyGoalMin: minutesGoal }))}
            onOpenLesson={openLesson}
            onDownload={() => startDownload(setDownload, commitProfile)}
            onSoon={setSoon}
            onNavigate={go}
          />
        )}
        {view.name === "lesson" && (
          <RunnerGate
            lessonId={view.lessonId}
            profile={activeProfile}
            ready={ready}
            onExit={leaveSession}
            onFinish={(events, elapsedMin, lesson) =>
              finishSession("lesson", lesson.unitTitle, lesson.id, events, elapsedMin)
            }
            onGrade={commitGrades}
          />
        )}
        {view.name === "review" && (
          <ReviewGate
            due={due}
            ready={ready}
            today={today || localDate()}
            onExit={leaveSession}
            onFinish={(events, elapsedMin) => finishSession("review", "Review", null, events, elapsedMin)}
            onGrade={commitGrades}
          />
        )}
        {view.name === "phrasebook" && (
          <Phrasebook
            favourites={activeProfile.favourites}
            onToggle={(id) =>
              commitProfile((prev) => ({
                ...prev,
                favourites: prev.favourites.includes(id)
                  ? prev.favourites.filter((item) => item !== id)
                  : [...prev.favourites, id],
              }))
            }
          />
        )}
        {view.name === "more" && (
          <MoreScreen
            profile={activeProfile}
            minutes={minutes}
            onGoal={(minutesGoal) => commitProfile((prev) => ({ ...prev, dailyGoalMin: minutesGoal }))}
            onImported={(next) => {
              profileRef.current = next.profile;
              progressRef.current = next.phrases;
              setProfile(next.profile);
              setPhraseProgress(next.phrases);
              setToday(localDate());
            }}
          />
        )}
        {view.name === "complete" && session && (
          <CompleteScreen
            result={session}
            profile={activeProfile}
            minutes={minutes}
            onMap={() => go("/")}
            onReview={() => go("/review")}
            dueCount={due.length}
          />
        )}
        {soon && (
          <div style={modalBackdrop} role="dialog" aria-modal="true" aria-labelledby="soon-title">
            <div style={modalCard}>
              <p style={kicker}>Coming soon</p>
              <h2 id="soon-title" style={h2}>
                {soon.name}
              </h2>
              <p style={mutedText}>{soon.description}</p>
              <button type="button" style={primaryBtn} onClick={() => setSoon(null)}>
                Back to Tagalog
              </button>
            </div>
          </div>
        )}
        {showNav && <BottomNav view={view.name} dueCount={due.length} onNavigate={go} />}
      </div>
    </div>
  );
}

function emptyProfile() {
  return {
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
}

function isLessonUnlocked(lesson, completed) {
  if (lesson.index === 0) return true;
  const previous = course.lessons[lesson.index - 1];
  return completed.includes(previous.id);
}

async function startDownload(setDownload, commitProfile) {
  setDownload({ state: "working", pct: 0, error: "" });
  try {
    await downloadTagalogOffline(course.phrases, (pct) => {
      setDownload({ state: "working", pct, error: "" });
    });
    commitProfile((prev) => ({ ...prev, offlineReady: true }));
    setDownload({ state: "done", pct: 1, error: "" });
  } catch (error) {
    setDownload({
      state: "error",
      pct: 0,
      error: error instanceof Error ? error.message : "Download failed",
    });
  }
}

function CourseMap({ profile, minutes, dueCount, download, onGoal, onOpenLesson, onDownload, onSoon, onNavigate }) {
  const goal = profile.dailyGoalMin;
  const pct = Math.min(100, goal ? (minutes / goal) * 100 : 0);
  const current = course.lessons.find((lesson) => isLessonUnlocked(lesson, profile.completedLessons) && !profile.completedLessons.includes(lesson.id));

  return (
    <main data-screen="map" style={screen}>
      <header style={topBar}>
        <Link href="/" style={logo}>
          talka<span style={{ color: "#fbbf24" }}>PH</span>
        </Link>
        <div style={{ display: "flex", gap: 8 }}>
          <Stat label="Day streak" value={`${profile.streak}`} icon="🔥" />
          <Stat label="Experience points" value={`${profile.xp}`} icon="✦" />
        </div>
      </header>
      <h1 style={h1}>Practice Tagalog</h1>
      <p style={{ ...mutedText, marginTop: 0 }}>Native audio. Progress stays on this device.</p>
      <div style={goalCard}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <span style={{ fontWeight: 800 }}>Daily goal</span>
          <span style={mutedText}>
            {formatMin(minutes)} / {goal} min
          </span>
        </div>
        <div style={track} aria-hidden="true">
          <div style={{ ...fill, width: `${pct}%` }} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[5, 10, 15].map((option) => (
            <button
              key={option}
              type="button"
              data-testid="daily-goal"
              data-goal={option}
              aria-pressed={goal === option}
              onClick={() => onGoal(option)}
              style={{ ...chip, ...(goal === option ? chipOn : null), flex: 1 }}
            >
              {option} min
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        {APP_LANGUAGES.map((language) =>
          language.available ? (
            <div key={language.id} style={{ ...langCard, borderColor: "rgba(251,191,36,0.7)" }}>
              <strong>Tagalog</strong>
              <span style={tiny}>{language.description}</span>
            </div>
          ) : (
            <button
              key={language.id}
              type="button"
              onClick={() => onSoon(language)}
              style={{ ...langCard, cursor: "pointer", textAlign: "left" }}
            >
              <strong>{language.name}</strong>
              <span style={tiny}>{language.description}</span>
              <span style={soonBadge}>Coming soon</span>
            </button>
          ),
        )}
      </div>
      <button
        type="button"
        data-testid="download-offline"
        onClick={onDownload}
        disabled={download.state === "working"}
        style={secondaryBtn}
      >
        {download.state === "working"
          ? `Downloading… ${Math.round(download.pct * 100)}%`
          : "Download Tagalog for offline"}
      </button>
      {profile.offlineReady && download.state !== "working" && (
        <p style={{ ...tiny, margin: "8px 0 0" }}>Tagalog audio is saved on this device.</p>
      )}
      {download.error && <p style={errorText}>{download.error}</p>}
      <button type="button" onClick={() => onNavigate("/review")} style={reviewRow}>
        <span>
          <strong>Review</strong>
          <span style={{ ...tiny, display: "block" }}>
            {dueCount ? `${dueCount} due` : "Leitner boxes · nothing due yet"}
          </span>
        </span>
        <span style={pill}>{dueCount}</span>
      </button>
      {PHRASE_TABS.map(([tab, label]) => (
        <section key={tab} style={{ marginTop: 14 }}>
          <h2 style={sectionLabel}>{label}</h2>
          {course.units
            .filter((unit) => unit.tab === tab)
            .map((unit) => (
              <div key={unit.id} style={{ marginBottom: 8 }}>
                <h3 style={unitTitle}>
                  <span aria-hidden="true">{unit.icon}</span> {unit.title}
                </h3>
                <div style={path}>
                  {unit.lessons.map((lesson, index) => {
                    const unlocked = isLessonUnlocked(lesson, profile.completedLessons);
                    const done = profile.completedLessons.includes(lesson.id);
                    const isCurrent = current && current.id === lesson.id;
                    return (
                      <div key={lesson.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {index > 0 && <div style={{ ...connector, background: unlocked ? "rgba(251,191,36,0.8)" : "rgba(255,255,255,0.12)" }} />}
                        <button
                          type="button"
                          data-testid="lesson-node"
                          data-lesson-id={lesson.id}
                          data-unlocked={unlocked ? "true" : "false"}
                          disabled={!unlocked}
                          onClick={() => onOpenLesson(lesson)}
                          style={{
                            ...node,
                            ...(done ? nodeDone : null),
                            ...(isCurrent ? nodeCurrent : null),
                            ...(!unlocked ? nodeLocked : null),
                          }}
                        >
                          <span style={{ fontSize: "1.15rem", fontWeight: 800 }}>{done ? "✓" : lesson.part}</span>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "inherit" }}>{lesson.phrases.length} phrases</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </section>
      ))}
    </main>
  );
}

function Stat({ label, value, icon }) {
  return (
    <span aria-label={`${label} ${value}`} style={stat}>
      <span aria-hidden="true">{icon}</span> {value}
    </span>
  );
}

function RunnerGate({ lessonId, profile, ready, onExit, onFinish, onGrade }) {
  const lesson = course.lessons.find((item) => item.id === lessonId);
  const exercises = useMemo(
    () => (lesson ? buildExercises(lesson.phrases, course.phrases, lesson.id) : []),
    [lesson],
  );
  if (!lesson) {
    return (
      <main data-screen="lesson" style={screen}>
        <p>That lesson is not in the Tagalog course.</p>
        <button type="button" style={primaryBtn} onClick={onExit}>
          Back to the course
        </button>
      </main>
    );
  }
  if (!ready) {
    return (
      <main data-screen="lesson" style={screen}>
        <p>Loading your progress…</p>
      </main>
    );
  }
  const unlocked = isLessonUnlocked(lesson, profile.completedLessons);
  if (!unlocked) {
    return (
      <main data-screen="lesson" style={screen}>
        <p>Finish the previous lesson to unlock this one.</p>
        <button type="button" style={primaryBtn} onClick={onExit}>
          Back to the course
        </button>
      </main>
    );
  }
  return (
    <LessonRunner
      title={lesson.unitTitle}
      subtitle={lesson.parts > 1 ? `Lesson ${lesson.part} of ${lesson.parts}` : "Lesson 1"}
      exercises={exercises}
      onExit={onExit}
      onFinish={(events, elapsedMin) => onFinish(events, elapsedMin, lesson)}
      onGrade={onGrade}
    />
  );
}

function ReviewGate({ due, ready, today, onExit, onFinish, onGrade }) {
  if (!ready) {
    return (
      <main data-screen="review" style={screen}>
        <p>Loading your progress…</p>
      </main>
    );
  }
  return <ReviewSession due={due} today={today} onExit={onExit} onFinish={onFinish} onGrade={onGrade} />;
}

function ReviewSession({ due, today, onExit, onFinish, onGrade }) {
  const [pack] = useState(() => {
    const phrases = due.length ? pickReviewPhrases(due, today) : [];
    return {
      phrases,
      exercises: phrases.length
        ? buildExercises(phrases, course.phrases, `review:${today}:${phrases.map((phrase) => phrase.id).join(",")}`)
        : [],
    };
  });
  if (pack.phrases.length === 0) {
    return (
      <main data-screen="review" style={screen}>
        <button type="button" onClick={onExit} style={textBtn}>
          ← Course
        </button>
        <h1 style={h1}>Review</h1>
        <p style={mutedText}>No phrases are due today. Phrases join the queue after a lesson.</p>
        <ol style={leitnerList}>
          <li>Box 1 · daily</li>
          <li>Box 2 · every 2 days</li>
          <li>Box 3 · every 4 days</li>
          <li>Box 4 · weekly</li>
          <li>Box 5 · mastered</li>
        </ol>
      </main>
    );
  }
  return (
    <LessonRunner
      title="Review"
      subtitle={`${pack.phrases.length} due phrases`}
      exercises={pack.exercises}
      onExit={onExit}
      onFinish={onFinish}
      onGrade={onGrade}
    />
  );
}

function LessonRunner({ title, subtitle, exercises, onExit, onFinish, onGrade }) {
  const [index, setIndex] = useState(0);
  const eventsRef = useRef([]);
  const started = useRef(0);
  const exercise = exercises[index];

  useEffect(() => {
    started.current = Date.now();
  }, []);

  function elapsed() {
    if (!started.current) return 0;
    return Math.min(20, (Date.now() - started.current) / 60000);
  }

  function leave() {
    onExit(elapsed());
  }

  function handleResult(result) {
    onGrade(result.grades);
    const events = [...eventsRef.current, { type: result.type, correct: result.correct }];
    eventsRef.current = events;
    if (index + 1 >= exercises.length) onFinish(events, elapsed());
    else setIndex(index + 1);
  }

  if (!exercise) {
    return (
      <main data-screen="lesson" style={screen}>
        <p>This lesson has no exercises.</p>
        <button type="button" style={primaryBtn} onClick={leave}>
          Back
        </button>
      </main>
    );
  }

  return (
    <main data-screen="lesson" style={{ ...screen, paddingBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button type="button" onClick={leave} style={iconBtn} aria-label="Back to course">
          ←
        </button>
        <div style={{ flex: 1 }}>
          <div style={tiny}>{subtitle}</div>
          <div style={{ fontWeight: 800 }}>{title}</div>
        </div>
        <div style={tiny}>
          {index + 1}/{exercises.length}
        </div>
      </div>
      <div style={{ ...track, margin: "12px 0 18px" }} aria-hidden="true">
        <div style={{ ...fill, width: `${(index / exercises.length) * 100}%` }} />
      </div>
      <ExerciseCard key={exercise.id} exercise={exercise} onResult={handleResult} />
    </main>
  );
}

function ExerciseCard({ exercise, onResult }) {
  if (exercise.type === "match") return <MatchExercise exercise={exercise} onResult={onResult} />;
  if (exercise.type === "flashcard") return <FlashExercise exercise={exercise} onResult={onResult} />;
  return <ChoiceExercise exercise={exercise} onResult={onResult} />;
}

function ChoiceExercise({ exercise, onResult }) {
  const [picked, setPicked] = useState(null);
  const phrase = phraseById.get(exercise.phraseId);
  const prompts = {
    "listen-meaning": "Listen and choose the meaning",
    "read-phrase": "Read the English and choose the phrase",
    "listen-phrase": "Listen and choose the written phrase",
  };

  function pick(id) {
    if (picked) return;
    setPicked(id);
    playFile(phrase.audio);
  }

  return (
    <section data-answer-id={exercise.answerId} aria-live="polite">
      <p style={kicker}>{prompts[exercise.type]}</p>
      {exercise.type === "read-phrase" ? (
        <div style={promptCard}>{exercise.prompt}</div>
      ) : (
        <button type="button" data-testid="play-audio" onClick={() => playFile(phrase.audio)} style={playBtn} aria-label="Play the phrase">
          ▶
        </button>
      )}
      <div style={{ display: "grid", gap: 10 }}>
        {exercise.options.map((option) => {
          const isAnswer = option.id === exercise.answerId;
          const isPicked = option.id === picked;
          const tone = !picked ? choiceBtn : isAnswer ? choiceRight : isPicked ? choiceWrong : choiceDim;
          return (
            <button
              key={option.id}
              type="button"
              data-testid="choice"
              data-choice-id={option.id}
              lang={exercise.type === "listen-meaning" ? "en" : "tl"}
              onClick={() => pick(option.id)}
              style={tone}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {picked && (
        <div style={{ marginTop: 16 }}>
          <p style={{ fontWeight: 800, color: picked === exercise.answerId ? "#86efac" : "#fca5a5" }}>
            {picked === exercise.answerId ? "Correct" : "Not quite"}
          </p>
          <p lang="tl" style={{ fontWeight: 800, margin: "4px 0" }}>
            {phrase.text}
          </p>
          <p style={{ ...mutedText, marginTop: 0 }}>{phrase.english}</p>
          <button
            type="button"
            data-testid="continue"
            style={primaryBtn}
            onClick={() =>
              onResult({
                type: exercise.type,
                correct: picked === exercise.answerId,
                grades: [{ id: phrase.id, correct: picked === exercise.answerId }],
              })
            }
          >
            Continue
          </button>
        </div>
      )}
    </section>
  );
}

function MatchExercise({ exercise, onResult }) {
  const [leftId, setLeftId] = useState(null);
  const [done, setDone] = useState({});
  const [missed, setMissed] = useState({});
  const [mistakes, setMistakes] = useState(0);
  const [note, setNote] = useState("");
  const right = exercise.rightOrder.map((id) => exercise.pairs.find((pair) => pair.id === id));
  const finished = Object.keys(done).length === exercise.pairs.length;

  function chooseLeft(id) {
    if (done[id]) return;
    setLeftId(id);
    setNote("");
  }

  function chooseRight(id) {
    if (done[id] || !leftId) {
      if (!leftId) setNote("Choose a Tagalog phrase first.");
      return;
    }
    if (leftId === id) {
      playFile(phraseById.get(id).audio);
      setDone((prev) => ({ ...prev, [id]: true }));
      setLeftId(null);
      setNote("Correct");
      return;
    }
    playFile(phraseById.get(leftId).audio);
    setMissed((prev) => ({ ...prev, [leftId]: true }));
    setMistakes((count) => count + 1);
    setLeftId(null);
    setNote("Not a match");
  }

  return (
    <section aria-live="polite">
      <p style={kicker}>Match the pairs</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div style={{ display: "grid", gap: 8 }}>
          {exercise.pairs.map((pair) => (
            <button
              key={pair.id}
              type="button"
              data-testid="match-left"
              data-pair-id={pair.id}
              lang="tl"
              disabled={Boolean(done[pair.id])}
              onClick={() => chooseLeft(pair.id)}
              style={{
                ...matchBtn,
                ...(leftId === pair.id ? matchOn : null),
                ...(done[pair.id] ? matchDone : null),
              }}
            >
              {pair.text}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {right.map((pair) => (
            <button
              key={pair.id}
              type="button"
              data-testid="match-right"
              data-pair-id={pair.id}
              lang="en"
              disabled={Boolean(done[pair.id])}
              onClick={() => chooseRight(pair.id)}
              style={{ ...matchBtn, ...(done[pair.id] ? matchDone : null) }}
            >
              {pair.english}
            </button>
          ))}
        </div>
      </div>
      {note && <p style={{ fontWeight: 700 }}>{note}</p>}
      {finished && (
        <button
          type="button"
          data-testid="continue"
          style={{ ...primaryBtn, marginTop: 16 }}
          onClick={() =>
            onResult({
              type: "match",
              correct: mistakes === 0,
              grades: exercise.pairs.map((pair) => ({ id: pair.id, correct: !missed[pair.id] })),
            })
          }
        >
          Continue
        </button>
      )}
    </section>
  );
}

function FlashExercise({ exercise, onResult }) {
  const [revealed, setRevealed] = useState(false);
  const phrase = phraseById.get(exercise.phraseId);

  function rate(knew) {
    onResult({
      type: "flashcard",
      correct: knew,
      grades: [{ id: phrase.id, correct: knew }],
    });
  }

  return (
    <section>
      <p style={kicker}>Flashcard</p>
      <div style={promptCard}>
        <div lang="tl" style={{ fontSize: "1.6rem", fontWeight: 800 }}>
          {phrase.text}
        </div>
        {revealed && <div style={{ marginTop: 8, color: "#94a3b8" }}>{phrase.english}</div>}
      </div>
      <button type="button" data-testid="play-audio" aria-label="Play the phrase" onClick={() => playFile(phrase.audio)} style={{ ...secondaryBtn, marginBottom: 10 }}>
        Play audio
      </button>
      {!revealed ? (
        <button
          type="button"
          data-testid="show-meaning"
          style={primaryBtn}
          onClick={() => {
            setRevealed(true);
            playFile(phrase.audio);
          }}
        >
          Show meaning
        </button>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <button type="button" data-testid="didnt-know" style={secondaryBtn} onClick={() => rate(false)}>
            Didn&apos;t know
          </button>
          <button type="button" data-testid="knew-it" style={primaryBtn} onClick={() => rate(true)}>
            Knew it
          </button>
        </div>
      )}
    </section>
  );
}

function Phrasebook({ favourites, onToggle }) {
  const [query, setQuery] = useState("");
  const [onlyStars, setOnlyStars] = useState(false);
  const needle = query.trim().toLowerCase();
  const rows = course.phrases.filter((phrase) => {
    if (onlyStars && !favourites.includes(phrase.id)) return false;
    if (!needle) return true;
    return phrase.text.toLowerCase().includes(needle) || phrase.english.toLowerCase().includes(needle);
  });

  return (
    <main data-screen="phrasebook" style={screen}>
      <h1 style={h1}>Phrasebook</h1>
      <p style={{ ...mutedText, marginTop: 0 }}>{course.phrases.length} Tagalog phrases</p>
      <input
        data-testid="phrasebook-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search phrases in English or Tagalog"
        aria-label="Search phrases"
        style={searchInput}
      />
      <button type="button" aria-pressed={onlyStars} onClick={() => setOnlyStars((value) => !value)} style={{ ...chip, ...(onlyStars ? chipOn : null), margin: "10px 0 14px" }}>
        Favourites
      </button>
      {rows.length === 0 && <p style={mutedText}>No phrases found.</p>}
      <ul style={listReset}>
        {rows.map((phrase) => {
          const starred = favourites.includes(phrase.id);
          return (
            <li key={phrase.id} style={phraseRow}>
              <button type="button" aria-label={`Play ${phrase.text}`} onClick={() => playFile(phrase.audio)} style={speakBtn}>
                ▶
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div lang="tl" style={{ fontWeight: 800 }}>
                  {phrase.text}
                </div>
                <div style={tiny}>{phrase.english}</div>
                <div style={tiny}>
                  {phrase.unitTitle}
                  {phrase.formal ? " · Formal (po)" : ""}
                </div>
              </div>
              <button
                type="button"
                aria-pressed={starred}
                aria-label={starred ? "Remove from favourites" : "Add to favourites"}
                onClick={() => onToggle(phrase.id)}
                style={{ ...iconBtn, color: starred ? "#fbbf24" : "#64748b" }}
              >
                {starred ? "★" : "☆"}
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

function MoreScreen({ profile, minutes, onGoal, onImported }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  async function onExport() {
    const data = await exportProgress();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "talkaph-progress.json";
    link.click();
    URL.revokeObjectURL(url);
    setError("");
    setMessage("Progress file downloaded.");
  }

  async function onFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const next = await importProgress(data);
      onImported(next);
      setError("");
      setMessage("Progress restored on this device.");
    } catch (err) {
      setMessage("");
      setError(err instanceof Error ? err.message : "Could not import that file.");
    }
  }

  return (
    <main data-screen="more" style={screen}>
      <h1 style={h1}>Your progress</h1>
      <p style={mutedText}>Saved on this device. No account.</p>
      <p style={mutedText}>
        {formatMin(minutes)} / {profile.dailyGoalMin} min today · {profile.xp} XP · {profile.streak} day streak
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[5, 10, 15].map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={profile.dailyGoalMin === option}
            onClick={() => onGoal(option)}
            style={{ ...chip, ...(profile.dailyGoalMin === option ? chipOn : null), flex: 1 }}
          >
            {option} min
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        <button type="button" data-testid="export-progress" style={secondaryBtn} onClick={onExport}>
          Export progress
        </button>
        <button type="button" data-testid="import-progress" style={secondaryBtn} onClick={() => fileRef.current?.click()}>
          Import progress
        </button>
        <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={onFile} />
      </div>
      {message && <p style={{ color: "#86efac" }}>{message}</p>}
      {error && <p style={errorText}>{error}</p>}
      <p style={mutedText}>Review uses a Leitner box: daily, 2 days, 4 days, weekly, then mastered.</p>
      <p>
        <Link href="/learn/tagalog" style={{ color: "#fbbf24" }}>
          Open the Tagalog phrase list
        </Link>
      </p>
    </main>
  );
}

function CompleteScreen({ result, profile, minutes, onMap, onReview, dueCount }) {
  const goal = profile.dailyGoalMin;
  return (
    <main data-screen="complete" style={{ ...screen, textAlign: "center" }}>
      <p style={{ fontSize: "3rem", margin: "12px 0" }} aria-hidden="true">
        🎉
      </p>
      <h1 style={h1}>{result.kind === "review" ? "Review complete" : "Lesson complete"}</h1>
      <p style={mutedText}>{result.title}</p>
      <div style={completeGrid}>
        <div style={goalCard}>
          <div style={tiny}>XP</div>
          <div style={bigStat}>+{result.xp}</div>
        </div>
        <div style={goalCard}>
          <div style={tiny}>Correct</div>
          <div style={bigStat}>
            {result.correct}/{result.total}
          </div>
        </div>
        <div style={goalCard}>
          <div style={tiny}>Streak</div>
          <div style={bigStat}>{profile.streak}</div>
        </div>
        <div style={goalCard}>
          <div style={tiny}>Today</div>
          <div style={bigStat}>
            {formatMin(minutes)}/{goal}
          </div>
        </div>
      </div>
      <button type="button" style={{ ...primaryBtn, marginTop: 8 }} onClick={onMap}>
        Back to the course
      </button>
      <button type="button" style={{ ...secondaryBtn, marginTop: 10 }} onClick={onReview}>
        Review{dueCount ? ` (${dueCount} due)` : ""}
      </button>
    </main>
  );
}

function BottomNav({ view, dueCount, onNavigate }) {
  const items = [
    ["/", "map", "Learn"],
    ["/review", "review", dueCount ? `Review ${dueCount}` : "Review"],
    ["/phrasebook", "phrasebook", "Phrasebook"],
    ["/more", "more", "More"],
  ];
  return (
    <nav style={nav} aria-label="Practice">
      {items.map(([hash, name, label]) => (
        <button key={name} type="button" onClick={() => onNavigate(hash)} aria-current={view === name ? "page" : undefined} style={{ ...navBtn, ...(view === name ? navOn : null) }}>
          {label}
        </button>
      ))}
    </nav>
  );
}

const shell = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f4c3a 100%)",
  color: "#e2e8f0",
  fontFamily: "'Segoe UI', system-ui, sans-serif",
  display: "flex",
  justifyContent: "center",
};
const column = { width: "100%", maxWidth: 480, minHeight: "100vh", position: "relative" };
const screen = { padding: "16px 16px 108px" };
const topBar = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 };
const logo = { color: "#fff", textDecoration: "none", fontWeight: 800, fontSize: "1.35rem" };
const h1 = { fontSize: "1.55rem", lineHeight: 1.15, margin: "8px 0 4px" };
const h2 = { fontSize: "1.45rem", margin: "0 0 8px" };
const kicker = { color: "#fbbf24", fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.78rem" };
const mutedText = { color: "#94a3b8", lineHeight: 1.5 };
const tiny = { color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600 };
const errorText = { color: "#fca5a5" };
const stat = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 999, padding: "6px 10px", fontWeight: 800, fontSize: "0.85rem" };
const goalCard = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 10, display: "grid", gap: 8, marginBottom: 8 };
const track = { height: 8, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" };
const fill = { height: "100%", background: "#fbbf24", borderRadius: 999 };
const chip = { borderRadius: 999, border: "1px solid rgba(255,255,255,0.16)", background: "transparent", color: "#e2e8f0", padding: "8px 12px", fontWeight: 700, minHeight: 40 };
const chipOn = { background: "#fbbf24", color: "#0f172a", borderColor: "#fbbf24" };
const langCard = { border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "#e2e8f0", borderRadius: 14, padding: "8px 12px", display: "grid", gap: 2 };
const soonBadge = { color: "#fbbf24", fontSize: "0.75rem", fontWeight: 800 };
const primaryBtn = { width: "100%", minHeight: 52, border: 0, borderRadius: 999, background: "#fbbf24", color: "#0f172a", fontWeight: 800, fontSize: "1rem", cursor: "pointer" };
const secondaryBtn = { width: "100%", minHeight: 48, borderRadius: 999, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.06)", color: "#fff", fontWeight: 700, cursor: "pointer" };
const textBtn = { background: "none", border: 0, color: "#94a3b8", fontWeight: 700, padding: 0, cursor: "pointer" };
const iconBtn = { width: 44, height: 44, borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "#fff", fontWeight: 800, cursor: "pointer" };
const reviewRow = { width: "100%", marginTop: 10, padding: "12px 14px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left", cursor: "pointer" };
const pill = { minWidth: 28, height: 28, borderRadius: 999, background: "#fbbf24", color: "#0f172a", fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center" };
const sectionLabel = { color: "#fbbf24", fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 8px" };
const unitTitle = { fontSize: "1rem", margin: "0 0 8px" };
const path = { display: "flex", flexDirection: "column", alignItems: "center" };
const connector = { width: 4, height: 18 };
const node = { width: 92, minHeight: 72, borderRadius: 24, border: "2px solid rgba(251,191,36,0.45)", background: "rgba(15,23,42,0.35)", color: "#fff", display: "grid", placeItems: "center", gap: 2, cursor: "pointer" };
const nodeCurrent = { background: "#fbbf24", color: "#0f172a", borderColor: "#fbbf24" };
const nodeDone = { background: "rgba(134,239,172,0.18)", borderColor: "#86efac" };
const nodeLocked = { opacity: 0.45, cursor: "not-allowed" };
const promptCard = { background: "rgba(255,255,255,0.06)", borderRadius: 20, padding: "22px 16px", textAlign: "center", fontSize: "1.35rem", fontWeight: 800, margin: "8px 0 16px" };
const playBtn = { width: 96, height: 96, borderRadius: "50%", border: 0, background: "#fbbf24", color: "#0f172a", fontSize: "1.8rem", display: "grid", placeItems: "center", margin: "8px auto 18px", cursor: "pointer" };
const choiceBtn = { width: "100%", textAlign: "left", minHeight: 52, padding: "12px 14px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.05)", color: "#fff", fontWeight: 700, fontSize: "1.02rem", cursor: "pointer" };
const choiceRight = { ...choiceBtn, background: "rgba(134,239,172,0.2)", borderColor: "#86efac" };
const choiceWrong = { ...choiceBtn, background: "rgba(252,165,165,0.16)", borderColor: "#fca5a5" };
const choiceDim = { ...choiceBtn, opacity: 0.55 };
const matchBtn = { minHeight: 64, borderRadius: 14, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.05)", color: "#fff", fontWeight: 700, padding: 8, cursor: "pointer" };
const matchOn = { borderColor: "#fbbf24", background: "rgba(251,191,36,0.15)" };
const matchDone = { borderColor: "#86efac", background: "rgba(134,239,172,0.16)", opacity: 0.7 };
const searchInput = { width: "100%", boxSizing: "border-box", borderRadius: 999, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.07)", color: "#fff", padding: "12px 16px", fontSize: "1rem" };
const listReset = { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 };
const phraseRow = { display: "flex", gap: 10, alignItems: "center", padding: "8px 4px", borderBottom: "1px solid rgba(255,255,255,0.06)" };
const speakBtn = { width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(251,191,36,0.35)", background: "rgba(251,191,36,0.15)", color: "#fbbf24", cursor: "pointer", flexShrink: 0 };
const completeGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, textAlign: "left", margin: "12px 0 16px" };
const bigStat = { fontSize: "1.6rem", fontWeight: 900 };
const leitnerList = { display: "grid", gap: 6, paddingLeft: 18, color: "#e2e8f0" };
const modalBackdrop = { position: "fixed", inset: 0, background: "rgba(2,6,23,0.72)", display: "grid", placeItems: "center", padding: 20, zIndex: 20 };
const modalCard = { width: "min(100%, 400px)", background: "#0f172a", border: "1px solid rgba(251,191,36,0.35)", borderRadius: 20, padding: 20 };
const nav = { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "min(100%, 480px)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, padding: "8px 8px calc(8px + env(safe-area-inset-bottom))", background: "rgba(15,23,42,0.94)", borderTop: "1px solid rgba(255,255,255,0.08)", zIndex: 10 };
const navBtn = { minHeight: 44, border: 0, borderRadius: 12, background: "transparent", color: "#94a3b8", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer" };
const navOn = { color: "#0f172a", background: "#fbbf24" };
const css = `
.practice-app button:focus-visible, .practice-app a:focus-visible, .practice-app input:focus-visible {
  outline: 2px solid #fbbf24;
  outline-offset: 2px;
}
.practice-app button { touch-action: manipulation; }
`;
