import Link from "next/link";

export default function PrivacyPage() {
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
        <Link href="/learn" style={{
          background: "#fbbf24", color: "#0f172a", padding: "0.5rem 1.25rem",
          borderRadius: "999px", fontWeight: "700", textDecoration: "none", fontSize: "0.9rem"
        }}>
          Start Learning
        </Link>
      </nav>

      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "3rem 2rem" }}>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: "900", marginBottom: "0.5rem" }}>
          Privacy Policy
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "3rem" }}>
          Last updated: June 2026
        </p>

        {[
          {
            title: "1. Introduction",
            body: "Welcome to talkaPH (talkaph.com). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website."
          },
          {
            title: "2. Information We Collect",
            body: "talkaPH is a free language learning website. We do not require you to create an account or provide personal information to use the site. We may collect non-personal information automatically through analytics tools, including pages visited, time spent on the site, browser type, and general location (country/region)."
          },
          {
            title: "3. Cookies",
            body: "We may use cookies and similar tracking technologies to improve your experience on our site. Third-party services such as Google Analytics and Google AdSense may also place cookies on your device. You can control cookies through your browser settings."
          },
          {
            title: "4. Google AdSense",
            body: "We use Google AdSense to display advertisements on our site. Google AdSense may use cookies and web beacons to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting Google's Ad Settings at adssettings.google.com."
          },
          {
            title: "5. Third-Party Links",
            body: "Our website may contain links to third-party websites such as travel affiliate partners (Klook, Booking.com, GetYourGuide). We are not responsible for the privacy practices of these third-party sites and encourage you to review their privacy policies."
          },
          {
            title: "6. Data Security",
            body: "We take reasonable measures to protect the information on our site. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
          },
          {
            title: "7. Children's Privacy",
            body: "talkaPH is intended for general audiences. We do not knowingly collect personal information from children under the age of 13. If you believe a child has provided us with personal information, please contact us."
          },
          {
            title: "8. Changes to This Policy",
            body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. We encourage you to review this page periodically."
          },
          {
            title: "9. Contact Us",
            body: "If you have any questions about this Privacy Policy, please contact us at: hello@talkaph.com"
          },
        ].map(({ title, body }) => (
          <div key={title} style={{ marginBottom: "2rem" }}>
            <h2 style={{ color: "#fbbf24", fontWeight: "700", fontSize: "1rem", marginBottom: "0.5rem" }}>
              {title}
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "0.95rem" }}>
              {body}
            </p>
          </div>
        ))}

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" style={{ color: "#fbbf24", textDecoration: "none", fontSize: "0.9rem" }}>
            ← Back to talkaPH
          </Link>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "2rem", color: "#334155", fontSize: "0.8rem" }}>
        2026 talkaPH - Learn Filipino languages
      </footer>
    </main>
  );
}
