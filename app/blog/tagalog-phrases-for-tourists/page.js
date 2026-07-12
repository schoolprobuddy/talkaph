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
          &quot;Salamat&quot; means thank you; &quot;salamat po&quot; means thank you with a small
          bow built into the sentence. When in doubt, add po. Nobody has ever been offended by too
          much politeness in the Philippines.
        </p>

        <SectionHeading icon="👋">Greetings and courtesy</SectionHeading>
        <Phrase tagalog="Magandang umaga po" pron="ma-gan-DANG oo-MA-ga poh" meaning="Good morning (polite)" />
        <Phrase tagalog="Kumusta?" pron="koo-MOOS-tah" meaning="How are you?" />
        <Phrase tagalog="Salamat po" pron="sah-LAH-mat poh" meaning="Thank you (polite)" />
        <Phrase tagalog="Walang anuman" pron="wah-LANG ah-noo-MAN" meaning="You're welcome" />
        <Phrase tagalog="Paalam" pron="pah-AH-lam" meaning="Goodbye" />
        <p style={P}>
          &quot;Kumusta&quot; comes from the Spanish &quot;¿cómo está?&quot; — one of thousands of
          Spanish loanwords in Tagalog, a leftover from over 300 years of colonial history. If you
          speak any Spanish, you&apos;ll keep spotting familiar words: mesa (table), silya (chair),
          kwarto (room).
        </p>

        <SectionHeading icon="🍽️">At the restaurant and the market</SectionHeading>
        <Phrase tagalog="Magkano po ito?" pron="mag-KAH-no poh ee-TOH" meaning="How much is this?" />
        <Phrase tagalog="Masarap!" pron="ma-sa-RAP" meaning="Delicious!" />
        <Phrase tagalog="Isa pa po" pron="ee-SAH pah poh" meaning="One more, please" />
        <Phrase tagalog="Sobrang mahal naman" pron="SOH-brang ma-HAL na-MAN" meaning="That's too expensive (haggling starter)" />
        <Phrase tagalog="Ang bill po" pron="ang BILL poh" meaning="The bill, please" />
        <p style={P}>
          A cultural note on haggling: at malls and restaurants, prices are fixed. But at street
          markets and souvenir stalls, friendly haggling is normal and even expected. Say
          &quot;sobrang mahal naman&quot; with a smile, offer around 60-70% of the asking price, and
          meet somewhere in the middle. Keep it light — it&apos;s a social game, not a battle. And
          &quot;masarap&quot; might be the single most useful word in this list. Filipino food
          culture is generous to a fault; telling your host the food is delicious is the fastest way
          to be offered a second plate you cannot refuse.
        </p>

        <SectionHeading icon="🛺">Getting around</SectionHeading>
        <Phrase tagalog="Saan po ang CR?" pron="sah-AN poh ang see-AR" meaning="Where is the restroom? (CR = comfort room)" />
        <Phrase tagalog="Para po!" pron="PAH-rah poh" meaning="Stop here, please! (on a jeepney)" />
        <Phrase tagalog="Bayad po" pron="BAH-yad poh" meaning="Here's my fare (passing payment on a jeepney)" />
        <Phrase tagalog="Sa kanan / sa kaliwa" pron="sah kah-NAN / sah kah-lee-WAH" meaning="To the right / to the left" />
        <Phrase tagalog="Malapit lang ba?" pron="ma-LAH-pit lang bah" meaning="Is it nearby?" />
        <p style={P}>
          Two of these are jeepney-specific, and riding a jeepney at least once is practically
          mandatory. Payment travels hand to hand up to the driver — you say &quot;bayad po&quot; as
          you pass your coins forward, and when you want to get off, a firm &quot;para po!&quot; (or
          a knock on the roof) does the job. Also: restrooms in the Philippines are called CRs —
          comfort rooms. Asking for the &quot;bathroom&quot; works, but &quot;CR&quot; is what
          everyone actually says.
        </p>

        <SectionHeading icon="🤝">Making friends</SectionHeading>
        <Phrase tagalog="Ano ang pangalan mo?" pron="ah-NO ang pa-NGA-lan moh" meaning="What's your name?" />
        <Phrase tagalog="Ako si ..." pron="ah-KOH see" meaning="I am ... (your name)" />
        <Phrase tagalog="Taga-saan ka?" pron="ta-ga-sah-AN kah" meaning="Where are you from?" />
        <Phrase tagalog="Hindi ako marunong mag-Tagalog" pron="hin-DEE ah-KOH ma-ROO-nong mag-ta-GAH-log" meaning="I don't know how to speak Tagalog" />
        <Phrase tagalog="Mahal kita" pron="mah-HAL ki-TAH" meaning="I love you" />
        <p style={P}>
          Yes, &quot;I don&apos;t speak Tagalog&quot; said in Tagalog is a guaranteed laugh — in the
          best way. Filipinos find it charming, and it usually kicks off a friendly round of them
          teaching you more words. And &quot;mahal kita&quot;? Maybe you won&apos;t need it on a
          two-week trip. But plenty of visitors to the Philippines end up staying longer than
          planned, and it&apos;s not always because of the beaches.
        </p>

        <SectionHeading icon="💡">One last tip</SectionHeading>
        <p style={P}>
          Don&apos;t worry about perfect pronunciation. Tagalog is mercifully phonetic — words sound
          like they&apos;re spelled — and Filipinos are among the most encouraging language teachers
          on earth. Every attempt gets a smile, every mistake gets a gentle correction, and every
          &quot;salamat po&quot; gets remembered.
        </p>
        <p style={P}>
          Want to hear all of these spoken aloud before your trip? Every phrase on talkaPH comes
          with native-speaker audio, and it&apos;s completely free — no signup, no app download.
        </p>

        <div style={{
          background: "rgba(251,191,36,0.08)",
          border: "1px solid rgba(251,191,36,0.3)",
          borderRadius: "1.25rem",
          padding: "1.75rem",
          marginTop: "2.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div>
            <p style={{ color: "#fff", fontWeight: "800", fontSize: "1.05rem", margin: 0 }}>
              Ready to hear these phrases? 🔊
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: "0.25rem 0 0" }}>
              270+ phrases with native audio in Tagalog, Cebuano, and Ilonggo.
            </p>
          </div>
          <Link href="/learn/tagalog" style={{
            background: "#fbbf24", color: "#0f172a", textDecoration: "none",
            borderRadius: "999px", padding: "0.65rem 1.5rem", fontWeight: "700", fontSize: "0.95rem",
            whiteSpace: "nowrap",
          }}>
            Start learning free →
          </Link>
        </div>
      </article>

      <footer style={{ textAlign: "center", padding: "2rem 1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <nav style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1rem" }}>
          <Link href="/" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>🏠 Home</Link>
          <Link href="/learn" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Learn</Link>
          <Link href="/blog" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Blog</Link>
          <Link href="/about" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>About</Link>
          <Link href="/privacy" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Privacy Policy</Link>
        </nav>
        <p style={{ color: "#475569", fontSize: "0.8rem", margin: 0 }}>© 2026 talkaPH - Learn Filipino languages</p>
      </footer>
    </main>
  );
}
