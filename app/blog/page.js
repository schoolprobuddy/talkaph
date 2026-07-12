import Link from "next/link";

export const metadata = {
  title: "Blog | talkaPH — Learn Filipino Languages Free",
  description:
    "Tips, culture, and guides for learning Tagalog, Cebuano, and Ilonggo — written by a native Filipino speaker.",
};

const POSTS = [
  {
    slug: "tagalog-phrases-for-tourists",
    category: "Travel",
    color: "#3b82f6",
    title: "20 Tagalog Phrases Every Tourist Needs",
    excerpt:
      "The essential phrases for your first trip to the Philippines — greetings, ordering food, getting around, and the one little word that makes every Filipino smile.",
    date: "July 2026",
    readTime: "7 min read",
  },
];

export default function BlogIndexPage() {
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

      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 2rem 4rem" }}>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: "900", marginBottom: "0.5rem" }}>
          talkaPH Blog
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1rem", marginBottom: "2.5rem" }}>
          Tips, culture, and guides for learning Filipino languages — written by a native speaker.
        </p>

        <div style={{ display: "grid", gap: "1.5rem" }}>
          {POSTS.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <div style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${post.color}30`,
                borderRadius: "1.25rem",
                padding: "1.75rem",
              }}>
                <span style={{
                  background: `${post.color}20`, border: `1px solid ${post.color}40`,
                  borderRadius: "999px", padding: "3px 12px",
                  color: post.color, fontSize: "0.75rem", fontWeight: "600",
                }}>
                  {post.category}
                </span>
                <h2 style={{ color: "#fff", fontSize: "1.35rem", fontWeight: "800", margin: "0.9rem 0 0.5rem" }}>
                  {post.title}
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6, margin: "0 0 0.9rem" }}>
                  {post.excerpt}
                </p>
                <p style={{ color: "#475569", fontSize: "0.8rem", margin: 0 }}>
                  {post.date} · {post.readTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "2rem 1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <nav style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1rem" }}>
          <Link href="/" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>🏠 Home</Link>
          <Link href="/learn" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Learn</Link>
          <Link href="/about" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>About</Link>
          <Link href="/privacy" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Privacy Policy</Link>
        </nav>
        <p style={{ color: "#475569", fontSize: "0.8rem", margin: 0 }}>© 2026 talkaPH - Learn Filipino languages</p>
      </footer>
    </main>
  );
}
