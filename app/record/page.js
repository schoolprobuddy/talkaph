"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxQoJw7o_XGhZw-dBRR2knJE4Ts9DePZvxIEBC7G_9eer71rEcvAHsxL6SwuR2udt6lOA/exec";
const PAGE_PASSWORD = "ilonggo2026";
const SHARED_SECRET = "talkaph-il-9f3k2m";

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function RecordButton({ row, onDone }) {
  const [state, setState] = useState(row.Status === "Recorded" ? "done" : "idle");
  const [seconds, setSeconds] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const blobRef = useRef(null);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        blobRef.current = blob;
        setPreviewUrl(URL.createObjectURL(blob));
        setState("preview");
      };

      recorder.start();
      setState("recording");
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch (err) {
      alert("Couldn't access the microphone. Please allow microphone permission and try again.");
    }
  }

  function stopRecording() {
    clearInterval(timerRef.current);
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
  }

  function reRecord() {
    setPreviewUrl(null);
    blobRef.current = null;
    setState("idle");
  }

  async function submitRecording() {
    setState("uploading");
    try {
      const base64 = await blobToBase64(blobRef.current);
      const form = new URLSearchParams();
      form.append("action", "upload");
      form.append("secret", SHARED_SECRET);
      form.append("rowNumber", row.rowNumber);
      form.append("filename", row["Audio filename"]);
      form.append("audioData", base64);

      const res = await fetch(SCRIPT_URL, { method: "POST", body: form });
      const data = await res.json();

      if (data.success) {
        setState("done");
        onDone();
      } else {
        setState("preview");
        alert("Upload failed: " + (data.error || "unknown error"));
      }
    } catch (err) {
      setState("preview");
      alert("Upload failed. Check your internet connection and try again.");
    }
  }

  if (state === "recording") {
    return (
      <button onClick={stopRecording} style={{
        padding: "0.4rem 0.9rem", borderRadius: "999px",
        background: "#ef4444", border: "none", color: "#fff",
        cursor: "pointer", fontSize: "0.8rem", fontWeight: "700",
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        ⏹ Stop · {seconds}s
      </button>
    );
  }

  if (state === "preview") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
        <audio src={previewUrl} controls style={{ height: "32px", maxWidth: "160px" }} />
        <div style={{ display: "flex", gap: "6px" }}>
          <button onClick={reRecord} style={{
            padding: "0.3rem 0.7rem", borderRadius: "999px",
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            color: "#94a3b8", cursor: "pointer", fontSize: "0.75rem",
          }}>
            🔄 Re-record
          </button>
          <button onClick={submitRecording} style={{
            padding: "0.3rem 0.9rem", borderRadius: "999px",
            background: "#fbbf24", border: "none",
            color: "#0f172a", cursor: "pointer", fontSize: "0.75rem", fontWeight: "700",
          }}>
            ✓ Submit
          </button>
        </div>
      </div>
    );
  }

  if (state === "uploading") {
    return (
      <button disabled style={{
        width: "44px", height: "44px", borderRadius: "50%",
        background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
        color: "#94a3b8", cursor: "default", fontSize: "0.75rem",
      }}>
        …
      </button>
    );
  }

  if (state === "done") {
    return (
      <button onClick={startRecording} style={{
        width: "44px", height: "44px", borderRadius: "50%",
        background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.5)",
        color: "#10b981", cursor: "pointer", fontSize: "1.1rem",
      }} title="Recorded — tap to re-record">
        ✓
      </button>
    );
  }

  return (
    <button onClick={startRecording} style={{
      width: "44px", height: "44px", borderRadius: "50%",
      background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.5)",
      color: "#fbbf24", cursor: "pointer", fontSize: "1.2rem",
    }} title="Tap to record">
      🎙️
    </button>
  );
}

function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  function submit() {
    if (input === PAGE_PASSWORD) {
      sessionStorage.setItem("talkaph_record_unlocked", "yes");
      onUnlock();
    } else {
      setError(true);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f4c3a 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{ maxWidth: "320px", width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔒</div>
        <p style={{ fontWeight: "800", fontSize: "1.2rem", marginBottom: "0.25rem" }}>talkaPH recording</p>
        <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "1.5rem" }}>Enter the access code to continue.</p>
        <input
          type="password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Access code"
          style={{
            width: "100%", padding: "0.75rem 1rem", marginBottom: "0.75rem",
            borderRadius: "0.6rem", border: error ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.07)", color: "#fff", fontSize: "0.95rem",
            outline: "none", boxSizing: "border-box", textAlign: "center",
          }}
        />
        {error && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "0.75rem" }}>Incorrect code, try again.</p>}
        <button onClick={submit} style={{
          width: "100%", padding: "0.7rem", borderRadius: "999px",
          background: "#fbbf24", color: "#0f172a", border: "none",
          fontWeight: "800", fontSize: "0.9rem", cursor: "pointer",
        }}>
          Continue
        </button>
      </div>
    </main>
  );
}

export default function RecordPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPhrase, setNewPhrase] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("talkaph_record_unlocked") === "yes") {
      setUnlocked(true);
    }
    setChecked(true);
  }, []);

  async function loadRows() {
    setLoading(true);
    try {
      const res = await fetch(SCRIPT_URL);
      const data = await res.json();
      setRows(data.rows || []);
    } catch (err) {
      alert("Couldn't load the phrase list. Check your internet connection.");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (unlocked) loadRows();
  }, [unlocked]);

  async function addPhrase() {
    if (!newPhrase.trim()) {
      alert("Please enter the Ilonggo phrase.");
      return;
    }
    setAdding(true);
    try {
      const form = new URLSearchParams();
      form.append("action", "addPhrase");
      form.append("secret", SHARED_SECRET);
      form.append("phrase", newPhrase.trim());
      form.append("meaning", newMeaning.trim() || "(not provided)");

      const res = await fetch(SCRIPT_URL, { method: "POST", body: form });
      const data = await res.json();

      if (data.success) {
        setNewPhrase("");
        setNewMeaning("");
        await loadRows();
      } else {
        alert("Couldn't add phrase: " + (data.error || "unknown error"));
      }
    } catch (err) {
      alert("Couldn't add phrase. Check your internet connection.");
    }
    setAdding(false);
  }

  if (!checked) return null;
  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const recordedCount = rows.filter((r) => r.Status === "Recorded").length;

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f4c3a 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#fff",
    }}>
      <nav style={{ padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff" }}>talka<span style={{ color: "#fbbf24" }}>PH</span></span>
        </Link>
      </nav>

      <section style={{ maxWidth: "700px", margin: "0 auto", padding: "1rem 1.25rem 3rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: "900", marginBottom: "0.25rem" }}>
          🌺 Ilonggo recording
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
          {loading ? "Loading…" : `${recordedCount} of ${rows.length} recorded`}
        </p>

        {loading ? (
          <p style={{ color: "#64748b" }}>Loading phrases…</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {rows.map((row) => (
              <div key={row.rowNumber} style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "0.9rem",
                padding: "0.8rem 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
              }}>
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: "700", fontSize: "1rem", color: "#e2e8f0" }}>{row.Phrase}</p>
                  <p style={{ margin: "2px 0 0", fontSize: "0.85rem", color: "#94a3b8" }}>{row.Meaning}</p>
                  {row.Status === "New — pending review" && (
                    <span style={{
                      display: "inline-block", marginTop: "4px",
                      background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.4)",
                      color: "#38bdf8", fontSize: "0.7rem", fontWeight: "700",
                      padding: "2px 8px", borderRadius: "999px",
                    }}>
                      New
                    </span>
                  )}
                </div>
                <RecordButton row={row} onDone={loadRows} />
              </div>
            ))}

            <div style={{
              background: "rgba(251,191,36,0.06)",
              border: "1px dashed rgba(251,191,36,0.4)",
              borderRadius: "0.9rem",
              padding: "1rem",
              marginTop: "0.5rem",
            }}>
              <p style={{ margin: "0 0 0.6rem", fontSize: "0.85rem", fontWeight: "700", color: "#fbbf24" }}>
                + Add a new phrase
              </p>
              <input
                type="text"
                placeholder="Ilonggo phrase"
                value={newPhrase}
                onChange={(e) => setNewPhrase(e.target.value)}
                style={{
                  width: "100%", padding: "0.6rem 0.8rem", marginBottom: "0.5rem",
                  borderRadius: "0.6rem", border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.07)", color: "#fff", fontSize: "0.9rem",
                  outline: "none", boxSizing: "border-box",
                }}
              />
              <input
                type="text"
                placeholder="English meaning (optional)"
                value={newMeaning}
                onChange={(e) => setNewMeaning(e.target.value)}
                style={{
                  width: "100%", padding: "0.6rem 0.8rem", marginBottom: "0.75rem",
                  borderRadius: "0.6rem", border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.07)", color: "#fff", fontSize: "0.9rem",
                  outline: "none", boxSizing: "border-box",
                }}
              />
              <button
                onClick={addPhrase}
                disabled={adding}
                style={{
                  width: "100%", padding: "0.65rem", borderRadius: "999px",
                  background: "#fbbf24", color: "#0f172a", border: "none",
                  fontWeight: "800", fontSize: "0.9rem", cursor: adding ? "default" : "pointer",
                  opacity: adding ? 0.6 : 1,
                }}
              >
                {adding ? "Adding…" : "Add to sheet"}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
