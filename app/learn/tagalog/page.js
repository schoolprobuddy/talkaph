"use client";
import { useState } from "react";
import Link from "next/link";
import { TAGALOG_AUDIO as AUDIO, TAGALOG_LESSONS as LESSONS } from "../../../lib/phrases/tagalog-data";

function playAudio(phrase) {
  const filename = AUDIO[phrase];
  if (!filename) return;
  const audio = new Audio("/" + filename);
  audio.play();
}

const TABS = ["basics", "vocabulary", "advanced"];
const TAB_LABELS = { basics: "Basics", vocabulary: "Vocabulary", advanced: "Advanced" };

function FormalTable({ lesson }) {
  const [expandedRows, setExpandedRows] = useState({});
  const toggleRow = (i) => setExpandedRows(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <>
      <style>{`
        .formal-col { display: table-cell; }
        .po-toggle-col { display: none; }
        @media (max-width: 600px) {
          .formal-col { display: none; }
          .po-toggle-col { display: table-cell; }
        }
      `}</style>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.05)" }}>
            <th style={th}>Informal</th>
            <th className="formal-col" style={th}>Formal (po)</th>
            <th className="po-toggle-col" style={{ ...th, textAlign: "center" }}>Po</th>
            <th style={th}>English</th>
          </tr>
        </thead>
        <tbody>
          {lesson.rows.map((row, i) => {
            const hasPo = row[1] && row[1] !== "—";
            return (
            <>
              <tr key={i} style={{ borderBottom: expandedRows[i] && hasPo ? "none" : "1px solid rgba(255,255,255,0.05)" }}>
                {/* Informal */}
                <td style={{ ...td, color: "#e2e8f0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {row[0]}
                    {AUDIO[row[0]] && (
                      <button onClick={() => playAudio(row[0])} style={speakBtn}>🔊</button>
                    )}
                  </div>
                </td>
                {/* Formal — desktop only */}
                <td className="formal-col" style={{ ...td, color: "#86efac" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {row[1]}
                    {AUDIO[row[1]] && (
                      <button onClick={() => playAudio(row[1])} style={speakBtn}>🔊</button>
                    )}
                  </div>
                </td>
                {/* Po toggle — mobile only */}
                <td className="po-toggle-col" style={{ ...td, textAlign: "center", verticalAlign: "middle" }}>
                  {hasPo && (
                  <button
                    onClick={() => toggleRow(i)}
                    style={{
                      background: expandedRows[i] ? "rgba(134,239,172,0.25)" : "rgba(134,239,172,0.12)",
                      border: "1px solid rgba(134,239,172,0.4)",
                      borderRadius: "20px",
                      padding: "4px 10px",
                      cursor: "pointer",
                      color: "#86efac",
                      fontSize: "11px",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {expandedRows[i] ? "po ▲" : "po ▼"}
                  </button>
                  )}
                </td>
                {/* English */}
                <td style={{ ...td, color: "#94a3b8" }}>{row[2]}</td>
              </tr>
              {/* Expanded formal row — mobile only */}
              {expandedRows[i] && hasPo && (
                <tr key={`${i}-formal`} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td colSpan={3} style={{ ...td, paddingTop: "0.25rem", paddingBottom: "0.6rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#86efac" }}>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Formal:</span>
                      {row[1]}
                      {AUDIO[row[1]] && (
                        <button onClick={() => playAudio(row[1])} style={speakBtn}>🔊</button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default function TagalogPage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f4c3a 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#fff",
    }}>
      <nav style={{ padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "800" }}>talka<span style={{ color: "#fbbf24" }}>PH</span></span>
        </Link>
        <Link href="/learn" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>← All languages</Link>
      </nav>

      <section style={{ textAlign: "center", padding: "2rem 2rem 1rem" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🗺️</div>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: "900", marginBottom: "0.5rem" }}>Tagalog</h1>
        <p style={{ color: "#94a3b8", fontSize: "1rem" }}>Filipino · National language of the Philippines</p>
      </section>

      {TABS.map(tab => (
        <section key={tab} style={{ padding: "1rem 2rem 2rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fbbf24", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1rem" }}>
            {TAB_LABELS[tab]}
          </h2>
          {LESSONS[tab].map(lesson => (
            <div key={lesson.id} style={{ marginBottom: "2rem", background: "rgba(255,255,255,0.05)", borderRadius: "1rem", overflow: "hidden" }}>
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.4rem" }}>{lesson.icon}</span>
                <span style={{ fontWeight: "700", fontSize: "1rem" }}>{lesson.title}</span>
              </div>
              <div style={{ overflowX: "auto" }}>
                {lesson.hasFormal ? (
                  <FormalTable lesson={lesson} />
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                    <thead>
                      <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                        <th style={th}>Tagalog</th>
                        <th style={th}>English</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lesson.rows.map((row, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <td style={{ ...td, color: "#e2e8f0" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              {row[0]}
                              {AUDIO[row[0]] && (
                                <button onClick={() => playAudio(row[0])} style={speakBtn}>🔊</button>
                              )}
                            </div>
                          </td>
                          <td style={{ ...td, color: "#94a3b8" }}>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ))}
        </section>
      ))}
      {/* Contribute Banner */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2rem 3rem" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(251,191,36,0.03) 100%)",
          border: "1px solid rgba(251,191,36,0.25)",
          borderRadius: "1.5rem",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}>
          <div style={{ fontSize: "3.5rem", flexShrink: 0 }}>🇵🇭</div>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{ fontWeight: "800", fontSize: "1.1rem", color: "#fbbf24", marginBottom: "0.4rem" }}>
              Are you a native speaker?
            </div>
            <div style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Help talkaPH grow! Submit a missing word, correct a phrase, or share how it sounds in your region. Every contribution keeps Filipino languages alive. 🌺
            </div>
          </div>
          <a href="/contribute" style={{
            background: "#fbbf24",
            color: "#0f172a",
            borderRadius: "999px",
            padding: "0.7rem 1.5rem",
            fontWeight: "800",
            textDecoration: "none",
            fontSize: "0.9rem",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}>
            🎙️ Share your knowledge →
          </a>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "2rem 1rem", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "1rem" }}>
        <nav style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1rem" }}>
          <a href="/" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>🏠 Home</a>
          <a href="/learn" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>🌐 All Languages</a>
          <a href="/about" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>About</a>
          <a href="/privacy" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Privacy Policy</a>
        </nav>
        <p style={{ color: "#475569", fontSize: "0.8rem", margin: 0 }}>© 2026 talkaPH - Learn Filipino languages</p>
      </footer>
    </main>
  );
}

const speakBtn = { background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", color: "#fbbf24", fontSize: "12px", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
const th = { padding: "0.75rem 1rem", textAlign: "left", color: "#94a3b8", fontWeight: "600", fontSize: "0.8rem", textTransform: "uppercase" };
const td = { padding: "0.65rem 1rem" };
