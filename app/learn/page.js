import Link from "next/link";

export default function Learn() {
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
          <span style={{ fontSize: "1.5rem", fontWeight: "800", letterSpacing: "-0.5px" }}>
            talka<span style={{ color: "#fbbf24" }}>PH</span>
          </span>
        </Link>
      </nav>

      {/* Header */}
      <section style={{ textAlign: "center", padding: "3rem 2rem 2rem" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "900", marginBottom: "1rem" }}>
          Choose a Language
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "480px", margin: "0 auto" }}>
          Pick the Filipino language you want to learn today.
        </p>
      </section>

      {/* Language Cards */}
      <section style={{ padding: "2rem", maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {[
            {
              lang: "Tagalog",
              native: "Filipino",
              flag: "🗺️",
              color: "#3b82f6",
              note: "The national language, spoken across the Philippines",
              phrases: "90 phrases",
              href: "/learn/tagalog",
            },
            {
              lang: "Cebuano",
              native: "Bisaya",
              flag: "🌊",
              color: "#10b981",
              note: "Spoken in Visayas and Mindanao",
              phrases: "90 phrases",
              href: "/learn/cebuano",
            },
            {
              lang: "Ilonggo",
              native: "Hiligaynon",
              flag: "🌺",
              color: "#f59e0b",
              note: "The language of Western Visayas",
              phrases: "90 phrases",
              href: "/learn/ilonggo",
            },
          ].map(({ lang, native, flag, color, note, phrases, href }) => (
            <Link key={lang} href={href} style={{ textDecoration: "none" }}>
              <div style={{
                background: "rgba(255,255,255,0.05)",
                border: `2px solid ${color}50`,
                borderRadius: "1.25rem",
                padding: "2rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{flag}</div>
                <div style={{ fontWeight: "800", fontSize: "1.4rem", color, marginBottom: "0.25rem" }}>{lang}</div>
                <div style={{ color: "#64748b", fontSize: "0.8rem", marginBottom: "0.75rem", fontStyle: "italic" }}>{native}</div>
                <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1rem" }}>{note}</p>
                <div style={{
                  display: "inline-block",
                  background: `${color}20`,
                  border: `1px solid ${color}40`,
                  color,
                  padding: "0.3rem 0.75rem",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                }}>
                  {phrases} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "3rem 2rem", color: "#334155", fontSize: "0.8rem" }}>
        © 2026 talkaPH · Learn Filipino languages
      </footer>
    </main>
  );
}
