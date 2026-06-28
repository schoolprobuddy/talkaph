import Link from "next/link";

export default function AboutPage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f4c3a 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#fff",
    }}>
      {/* Nav */}
      <nav style={{ padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "800" }}>talka<span style={{ color: "#fbbf24" }}>PH</span></span>
        </Link>
        <Link href="/learn" style={{
          background: "#fbbf24", color: "#0f172a", padding: "0.5rem 1.25rem",
          borderRadius: "999px", fontWeight: "700", textDecoration: "none", fontSize: "0.9rem"
        }}>
          Start Learning
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "3rem 2rem 2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌺</div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "900", marginBottom: "1rem" }}>
          Our Story
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          talkaPH was built by a Filipino who knows that the Philippines is not one language — it is many.
        </p>
      </section>

      {/* Content */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem" }}>

        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "1.25rem", padding: "2rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#fbbf24", fontWeight: "800", fontSize: "1.2rem", marginBottom: "1rem" }}>
            Why talkaPH exists
          </h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.8, marginBottom: "1rem" }}>
            Most language learning apps teach Tagalog and call it Filipino. But if you travel to Cebu, Davao, or Iloilo, Tagalog alone will not get you far. The Philippines has over 180 languages, and millions of Filipinos speak Cebuano or Ilonggo as their first language.
          </p>
          <p style={{ color: "#cbd5e1", lineHeight: 1.8 }}>
            talkaPH was created to bridge that gap — a free resource where travelers, overseas workers, and language lovers can learn real Filipino languages the way they are actually spoken, with native audio from a Filipino voice.
          </p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "1.25rem", padding: "2rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#fbbf24", fontWeight: "800", fontSize: "1.2rem", marginBottom: "1rem" }}>
            What makes us different
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: "🗣️", title: "3 languages, not just Tagalog", desc: "Tagalog, Cebuano (Bisaya), and Ilonggo (Hiligaynon) — covering the major language regions of the Philippines." },
              { icon: "🔊", title: "Native Filipino audio", desc: "Every phrase is recorded by a professional Filipino voice actor so you hear the real pronunciation, not a robot." },
              { icon: "📚", title: "Practical phrases", desc: "Greetings, family, food, directions, everyday expressions — vocabulary you will actually use." },
              { icon: "💸", title: "Free to use", desc: "No paywalls, no subscriptions. talkaPH is free because language should be accessible to everyone." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: "700", color: "#e2e8f0", marginBottom: "0.25rem" }}>{title}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "1.25rem", padding: "2rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#fbbf24", fontWeight: "800", fontSize: "1.2rem", marginBottom: "1rem" }}>
            The languages we cover
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            {[
              { flag: "🗺️", lang: "Tagalog", note: "National language, spoken across the Philippines", color: "#3b82f6" },
              { flag: "🌊", lang: "Cebuano", note: "Spoken in Visayas and Mindanao — over 20 million speakers", color: "#10b981" },
              { flag: "🌺", lang: "Ilonggo", note: "Hiligaynon, spoken in Western Visayas — Iloilo, Bacolod and beyond", color: "#f59e0b" },
            ].map(({ flag, lang, note, color }) => (
              <div key={lang} style={{ background: `rgba(255,255,255,0.05)`, border: `1px solid ${color}30`, borderRadius: "1rem", padding: "1.25rem", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{flag}</div>
                <div style={{ fontWeight: "800", color, marginBottom: "0.25rem" }}>{lang}</div>
                <div style={{ color: "#64748b", fontSize: "0.8rem", lineHeight: 1.5 }}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "1.25rem", padding: "2rem", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🚀</div>
          <h2 style={{ color: "#fbbf24", fontWeight: "800", fontSize: "1.2rem", marginBottom: "0.75rem" }}>
            What is coming next
          </h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            We are building community voice contributions so native speakers from across the Philippines can add their own recordings. More languages, more phrases, and more regional dialects are on the way.
          </p>
          <Link href="/learn" style={{
            background: "#fbbf24", color: "#0f172a", padding: "0.8rem 2rem",
            borderRadius: "999px", fontWeight: "800", textDecoration: "none", fontSize: "1rem",
            display: "inline-block"
          }}>
            Start learning now →
          </Link>
        </div>

      </section>

      <footer style={{ textAlign: "center", padding: "2rem", color: "#334155", fontSize: "0.8rem" }}>
        2026 talkaPH - Learn Filipino languages
      </footer>
    </main>
  );
}
