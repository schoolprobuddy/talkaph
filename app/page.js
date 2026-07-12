import Link from "next/link";

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f4c3a 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Nav */}
      <nav style={{ padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "1.5rem", fontWeight: "800", letterSpacing: "-0.5px" }}>
          talka<span style={{ color: "#fbbf24" }}>PH</span>
        </span>
        <Link href="/learn" style={{
          background: "#fbbf24", color: "#0f172a", padding: "0.5rem 1.25rem",
          borderRadius: "999px", fontWeight: "700", textDecoration: "none", fontSize: "0.9rem"
        }}>
          Start Learning
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌴</div>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: "900", lineHeight: 1.1, marginBottom: "1.5rem", letterSpacing: "-1px" }}>
          Learn Filipino<br />
          <span style={{ color: "#fbbf24" }}>the way it&apos;s spoken</span>
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#94a3b8", maxWidth: "540px", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          Not just Tagalog. Learn Cebuano and Ilonggo too — the real languages of the Philippines, with native audio from a Filipino voice.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/learn" style={{
            background: "#fbbf24", color: "#0f172a", padding: "0.9rem 2rem",
            borderRadius: "999px", fontWeight: "800", textDecoration: "none", fontSize: "1.1rem"
          }}>
            Start for free →
          </Link>
          <Link href="/about" style={{
            border: "2px solid rgba(255,255,255,0.2)", color: "#fff", padding: "0.9rem 2rem",
            borderRadius: "999px", fontWeight: "600", textDecoration: "none", fontSize: "1.1rem"
          }}>
            Our story
          </Link>
        </div>
      </section>

      {/* Language Cards */}
      <section style={{ padding: "3rem 2rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "2rem" }}>
          3 Languages · 270+ Phrases · Native Audio
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          {[
            { lang: "Tagalog", flag: "🗺️", note: "National language", color: "#3b82f6", href: "/learn/tagalog" },
            { lang: "Cebuano", flag: "🌊", note: "Visayas & Mindanao", color: "#10b981", href: "/learn/cebuano" },
            { lang: "Ilonggo", flag: "🌺", note: "Western Visayas", color: "#f59e0b", href: "/learn/ilonggo" },
          ].map(({ lang, flag, note, color, href }) => (
            <Link key={lang} href={href} style={{ textDecoration: "none" }}>
              <div style={{
                background: "rgba(255,255,255,0.05)", border: `1px solid ${color}40`,
                borderRadius: "1rem", padding: "1.5rem", cursor: "pointer",
                transition: "transform 0.2s", textAlign: "center"
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{flag}</div>
                <div style={{ fontWeight: "800", fontSize: "1.2rem", color }}>{lang}</div>
                <div style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "0.25rem" }}>{note}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "2rem 1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <nav style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1rem" }}>
          <Link href="/learn" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Learn</Link>
          <Link href="/blog" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Blog</Link>
          <Link href="/about" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>About</Link>
          <Link href="/privacy" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Privacy Policy</Link>
        </nav>
        <p style={{ color: "#334155", fontSize: "0.8rem", margin: 0 }}>© 2026 talkaPH · Learn Filipino languages</p>
      </footer>
    </main>
  );
}
