import Link from "next/link";

export const metadata = {
  title: "20 Tagalog Phrases Every Tourist Needs | talkaPH Blog",
  description:
    "The essential Tagalog phrases for your first trip to the Philippines — greetings, ordering food, haggling, and getting around, with pronunciation guides from a native Filipino speaker.",
};

function Phrase({ tagalog, pron, meaning }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      border: "1px solid #3b82f630",
      borderRadius: "1rem",
      padding: "1rem 1.25rem",
      margin: "1rem 0",
    }}>
      <p style={{ color: "#3b82f6", fontSize: "1.15rem", fontWeight: "800", margin: 0 }}>{tagalog}</p>
      <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: "0.25rem 0 0" }}>
        {pron} — {meaning}
      </p>
    </div>
  );
}

function SectionHeading({ icon, children }) {
  return (
    <h2 style={{ color: "#fbbf24", fontSize: "1.4rem", fontWeight: "800", margin: "2.5rem 0 1rem" }}>
      {icon} {children}
    </h2>
  );
}

const P = { color: "#cbd5e1", fontSize: "1rem", lineHeight: 1.8, margin: "0 0 1.25rem" };

export default function TagalogPhrasesForTouristsPage() {
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
        <Link href="/learn" style={{
          background: "#fbbf24", color: "#0f172a", textDecoration: "none",
          borderRadius: "999px", padding: "0.5rem 1.25rem", fontWeight: "700", fontSize: "0.9rem",
        }}>
          Start Learning
        </Link>
      </nav>

      <article style={{ maxWidth: "720px", margin: "0 auto", padding: "1rem 2rem 4rem" }}>
        <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0 0 0.75rem" }}>
          <Link href="/blog" style={{ color: "#94a3b8", textDecoration: "none" }}>Blog</Link> › Travel
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: "900", lineHeight: 1.2, margin: "0 0 0.75rem" }}>
          🌴 20 Tagalog Phrases Every Tourist Needs
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "0 0 2.5rem" }}>
          By Drew, native Filipino speaker · July 2026 · 7 min read
        </p>

        <p style={P}>
          Landing in Manila for the first time? Here&apos;s some good news: most Filipinos speak at
          least some English, so you&apos;ll never be truly stuck. But here&apos;s the better news —
          the moment you try even one Tagalog phrase, everything changes. Vendors smile wider,
          tricycle drivers warm up, and lolas (grandmothers) will practically adopt you. Filipinos
          don&apos;t expect foreigners to speak Tagalog, which is exactly why trying means so much.
        </p>
        <p style={P}>
          I grew up in the Philippines speaking Ilonggo, Cebuano, and Tagalog, and I&apos;ve watched
          plenty of visitors transform their trip with a handful of phrases. These are the twenty
          I&apos;d teach a friend before their flight — no grammar lessons, just the words that
          actually come up.
        </p>

        <SectionHeading icon="✨">The magic word: po</SectionHeading>
        <p style={P}>
          Before the phrases, one tiny word you&apos;ll hear constantly: <strong style={{ color: "#fff" }}>po</strong>.
          It doesn&apos;t translate to anything — it&apos;s a respect marker. Add it when speaking
          to anyone older than you, anyone serving you, or anyone you&apos;ve just met.
          &quot;Salamat&quot; means thank you; &quot;salamat po&quot;
