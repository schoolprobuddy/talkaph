"use client";
import { useState } from "react";
import Link from "next/link";

const SUPABASE_URL = "https://giwjutrehtfhpvrmnjsy.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_O90JRnbTVfuKsPhaluH3yw_qppVg72k";

const LANGUAGES = ["Tagalog", "Cebuano", "Ilonggo", "Other / Not sure"];
const TYPES = [
  { value: "new_word", label: "🆕 New word or phrase" },
  { value: "new_voice", label: "🎙️ New voice / pronunciation" },
  { value: "correction", label: "✏️ Correction to existing phrase" },
  { value: "review", label: "⭐ General feedback or review" },
];

export default function ContributePage() {
  const [form, setForm] = useState({
    language: "",
    type: "",
    word_or_phrase: "",
    english_meaning: "",
    notes: "",
    submitter_name: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.language || !form.type) {
      setErrorMsg("Please select a language and contribution type.");
      setStatus("error");
      return;
    }
    if (!form.word_or_phrase && !form.notes) {
      setErrorMsg("Please fill in at least a word/phrase or notes.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/contributions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          language: form.language,
          type: form.type,
          word_or_phrase: form.word_or_phrase || null,
          english_meaning: form.english_meaning || null,
          notes: form.notes || null,
          submitter_name: form.submitter_name || null,
          status: "pending",
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      setStatus("success");
      setForm({ language: "", type: "", word_or_phrase: "", english_meaning: "", notes: "", submitter_name: "" });
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

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
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🤝</div>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "900", marginBottom: "0.5rem" }}>
          Contribute
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1rem", maxWidth: "520px", margin: "0 auto" }}>
          Help us grow talkaPH! Submit a new word, correct a phrase, share your voice, or leave feedback.
        </p>
      </section>

      <section style={{ maxWidth: "600px", margin: "2rem auto", padding: "0 1.5rem 4rem" }}>

        {status === "success" ? (
          <div style={{
            background: "rgba(134,239,172,0.1)", border: "1px solid rgba(134,239,172,0.3)",
            borderRadius: "1.25rem", padding: "3rem 2rem", textAlign: "center"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
            <h2 style={{ color: "#86efac", fontWeight: "800", fontSize: "1.4rem", marginBottom: "0.75rem" }}>
              Thank you for contributing!
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Your submission has been received. We review all contributions and will add approved words and phrases to talkaPH.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => setStatus("idle")}
                style={{
                  background: "rgba(134,239,172,0.15)", border: "1px solid rgba(134,239,172,0.3)",
                  borderRadius: "999px", padding: "0.6rem 1.5rem",
                  color: "#86efac", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem"
                }}
              >
                Submit another
              </button>
              <Link href="/learn" style={{
                background: "#fbbf24", color: "#0f172a", borderRadius: "999px",
                padding: "0.6rem 1.5rem", fontWeight: "700", textDecoration: "none", fontSize: "0.9rem"
              }}>
                Back to learning →
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "1.25rem", padding: "2rem" }}>

            {/* Language */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>Which language? *</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "0.5rem" }}>
                {LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    onClick={() => set("language", lang)}
                    style={{
                      padding: "0.5rem 1rem", borderRadius: "999px", cursor: "pointer",
                      fontWeight: "600", fontSize: "0.85rem", transition: "all 0.15s",
                      background: form.language === lang ? "#fbbf24" : "rgba(255,255,255,0.07)",
                      border: form.language === lang ? "1px solid #fbbf24" : "1px solid rgba(255,255,255,0.15)",
                      color: form.language === lang ? "#0f172a" : "#e2e8f0",
                    }}
                  >{lang}</button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>What are you submitting? *</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                {TYPES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => set("type", t.value)}
                    style={{
                      padding: "0.65rem 1rem", borderRadius: "0.75rem", cursor: "pointer",
                      fontWeight: "600", fontSize: "0.9rem", textAlign: "left", transition: "all 0.15s",
                      background: form.type === t.value ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.05)",
                      border: form.type === t.value ? "1px solid rgba(251,191,36,0.5)" : "1px solid rgba(255,255,255,0.1)",
                      color: form.type === t.value ? "#fbbf24" : "#e2e8f0",
                    }}
                  >{t.label}</button>
                ))}
              </div>
            </div>

            {/* Word / Phrase */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={labelStyle}>Word or phrase</label>
              <input
                type="text"
                placeholder="e.g. Maupay nga aga"
                value={form.word_or_phrase}
                onChange={e => set("word_or_phrase", e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* English meaning */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={labelStyle}>English meaning</label>
              <input
                type="text"
                placeholder="e.g. Good morning (Waray)"
                value={form.english_meaning}
                onChange={e => set("english_meaning", e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Notes */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={labelStyle}>Additional notes</label>
              <textarea
                placeholder="Any context, corrections, pronunciation tips, or general feedback..."
                value={form.notes}
                onChange={e => set("notes", e.target.value)}
                rows={4}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              />
            </div>

            {/* Name */}
            <div style={{ marginBottom: "1.75rem" }}>
              <label style={labelStyle}>Your name <span style={{ color: "#475569", fontWeight: "400" }}>(optional)</span></label>
              <input
                type="text"
                placeholder="How should we credit you?"
                value={form.submitter_name}
                onChange={e => set("submitter_name", e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Error */}
            {status === "error" && (
              <div style={{
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "0.75rem", padding: "0.75rem 1rem",
                color: "#fca5a5", fontSize: "0.9rem", marginBottom: "1rem"
              }}>
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              style={{
                width: "100%", padding: "0.9rem",
                background: status === "loading" ? "rgba(251,191,36,0.5)" : "#fbbf24",
                border: "none", borderRadius: "999px",
                color: "#0f172a", fontWeight: "800", fontSize: "1rem",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                transition: "opacity 0.2s",
              }}
            >
              {status === "loading" ? "Submitting…" : "Submit contribution →"}
            </button>

            <p style={{ color: "#475569", fontSize: "0.78rem", textAlign: "center", marginTop: "1rem" }}>
              All submissions are reviewed before being added to talkaPH.
            </p>
          </div>
        )}
      </section>

      <footer style={{ textAlign: "center", padding: "2rem 1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <nav style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1rem" }}>
          <Link href="/" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>🏠 Home</Link>
          <Link href="/learn" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>🌐 All Languages</Link>
          <Link href="/about" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>About</Link>
          <Link href="/privacy" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Privacy Policy</Link>
        </nav>
        <p style={{ color: "#475569", fontSize: "0.8rem", margin: 0 }}>© 2026 talkaPH - Learn Filipino languages</p>
      </footer>
    </main>
  );
}

const labelStyle = { display: "block", fontSize: "0.85rem", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" };
const inputStyle = { width: "100%", padding: "0.75rem 1rem", marginTop: "0.4rem", borderRadius: "0.75rem", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: "0.95rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
