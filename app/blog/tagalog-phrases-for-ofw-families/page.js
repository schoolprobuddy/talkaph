import Link from "next/link";
import { pageMetadata } from "../../../lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Tagalog Phrases for OFW Families and Kids Abroad",
    description: "Grew up abroad or married into a Filipino family? Learn warm Tagalog phrases for video calls, visits and family gatherings, with free native audio.",
    path: "/blog/tagalog-phrases-for-ofw-families",
    type: "article",
  }),
  keywords: [
    "tagalog phrases for family",
    "learn tagalog for kids abroad",
    "ofw family tagalog",
    "tagalog for filipino americans",
    "how to talk to lola in tagalog",
  ],
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
const linkStyle = { color: "#fbbf24", fontWeight: "700", textDecoration: "underline" };

export default function Page() {
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
          <Link href="/blog" style={{ color: "#94a3b8", textDecoration: "none" }}>Blog</Link> › Family
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: "900", lineHeight: 1.2, margin: "0 0 0.75rem" }}>
          {"💛 Tagalog Phrases for OFW Families and Kids Abroad"}
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "0 0 2.5rem" }}>
          {"By Drew, native Filipino speaker · October 2026 · 7 min read"}
        </p>
        <p style={P}>
          {"Millions of Filipinos live and work overseas: nurses in the UK, seafarers on every ocean, caregivers in Canada, engineers in the Middle East, families building new lives in Australia, New Zealand and the US. And with them comes a whole generation of kids who grew up abroad, plus partners who married into a Filipino family."}
        </p>
        <p style={P}>
          {"If that's you, you might know this feeling. Lola calls on Messenger, the conversation flows fast in Tagalog, and you're nodding along, catching one word in five. Maybe you understand more than you can say. Maybe you can't follow at all, and that quietly bothers you."}
        </p>
        <p style={P}>
          {"Here's the good news: you don't need to be fluent to make a huge difference. A handful of the right phrases, said with warmth, will mean the world to your relatives back home. This guide is built around the moments that actually matter in Filipino family life: greeting your elders, video calls, sitting down to eat, and visiting home. You can hear these phrases spoken by a native speaker on our free "}
          <Link href="/learn/tagalog" style={linkStyle}>{"Tagalog phrases page"}</Link>
          {"."}
        </p>
        <SectionHeading icon="✨">{"Start with respect: po, opo and mano po"}</SectionHeading>
        <p style={P}>
          {"Filipino families run on respect for elders, and Tagalog builds that respect right into the language."}
        </p>
        <p style={P}>
          <strong style={{ color: "#fff" }}>{"Po"}</strong>
          {" is a small word with no direct translation. You add it when you're speaking to someone older: grandparents, aunts, uncles, parents' friends. "}
          <strong style={{ color: "#fff" }}>{"Opo"}</strong>
          {" is the polite form of \"yes\". If there's one habit to build, it's this: when you talk to Lola or Tito, add "}
          <em>{"po"}</em>
          {"."}
        </p>
        <p style={P}>
          <strong style={{ color: "#fff" }}>{"Mano po"}</strong>
          {" goes with a gesture. You take an elder's hand and gently press the back of it to your forehead, asking for their blessing. Do this when you arrive at a relative's house or greet an older family member, and you'll see faces soften immediately. For many lolas, a grandchild from abroad doing "}
          <em>{"mano"}</em>
          {" without being reminded is pure joy."}
        </p>
        <Phrase tagalog="Mano po" pron="MAH-noh poh" meaning="(Asking for an elder's blessing, with the hand gesture)" />
        <Phrase tagalog="Opo / Hindi po" pron="OH-poh / hin-DEE poh" meaning="Yes / No (polite)" />
        <Phrase tagalog="Kumusta po kayo?" pron="koo-MOOS-tah poh KAH-yoh" meaning="How are you? (polite)" />
        <Phrase tagalog="Magandang umaga po" pron="mah-gan-DANG oo-MAH-gah poh" meaning="Good morning (polite)" />
        <Phrase tagalog="Magandang gabi po" pron="mah-gan-DANG gah-BEE poh" meaning="Good evening (polite)" />
        <Phrase tagalog="Salamat po" pron="sah-LAH-mat poh" meaning="Thank you (polite)" />
        <Phrase tagalog="Maraming salamat po" pron="mah-RAH-ming sah-LAH-mat poh" meaning="Thank you very much (polite)" />
        <Phrase tagalog="Pasensya na po" pron="pah-SEN-shah nah poh" meaning="I'm sorry (polite)" />
        <p style={P}>
          {"You'll also see \"kamusta\" in texts and on social media. It's the same word, but \"kumusta\" is the standard spelling."}
        </p>
        <SectionHeading icon="📱">{"On the video call"}</SectionHeading>
        <p style={P}>
          {"For many OFW families, the video call "}
          <em>{"is"}</em>
          {" family time. It's where birthdays get celebrated, homework gets checked and Lola asks, every single time, whether you've eaten."}
        </p>
        <Phrase tagalog="Kumusta ka?" pron="koo-MOOS-tah kah" meaning="How are you? (casual, to a cousin or sibling)" />
        <Phrase tagalog="Kumain na po kayo?" pron="koo-mah-EEN nah poh KAH-yoh" meaning="Have you eaten? (polite)" />
        <Phrase tagalog="Kumain ka na?" pron="koo-mah-EEN kah nah" meaning="Have you eaten? (casual)" />
        <Phrase tagalog="Ano'ng ginagawa mo?" pron="ah-NONG gee-nah-GAH-wah moh" meaning="What are you doing?" />
        <Phrase tagalog="Miss na kita" pron="MISS nah kee-TAH" meaning="I miss you" />
        <Phrase tagalog="Mahal kita" pron="mah-HAL kee-TAH" meaning="I love you" />
        <Phrase tagalog="Mahal na mahal kita" pron="mah-HAL nah mah-HAL kee-TAH" meaning="I love you so much" />
        <Phrase tagalog="Kailan ka uuwi?" pron="kah-EE-lan kah oo-OO-wee" meaning="When are you coming home?" />
        <Phrase tagalog="Ingat po kayo" pron="EE-ngat poh KAH-yoh" meaning="Take care (polite)" />
        <p style={P}>
          <em>{"\"Kumain ka na?\""}</em>
          {" deserves a special mention. In Filipino culture, asking if someone has eaten is a way of saying \"I care about you\". When your relatives ask it, they're not really asking about food. Asking it back is one of the most loving things you can say."}
        </p>
        <p style={P}>
          <em>{"\"Miss na kita\""}</em>
          {" is a perfect example of Taglish, the everyday mix of Tagalog and English. Don't feel like you're \"cheating\" by mixing languages. Filipinos do it all the time, at home and on TV."}
        </p>
        <p style={P}>
          {"If you're the one who sends money home, or you help a parent do it, the cost of transfers adds up. It's worth comparing services before you send."}
        </p>
        <SectionHeading icon="👨‍👩‍👧">{"Who's who: family words"}</SectionHeading>
        <p style={P}>
          {"Filipino families are big, and everyone has a title. Using the right one shows you understand how the family fits together."}
        </p>
        <Phrase tagalog="Nanay / Tatay" pron="NAH-nai / TAH-tai" meaning="Mum / Dad" />
        <Phrase tagalog="Lola / Lolo" pron="LOH-lah / LOH-loh" meaning="Grandmother / Grandfather" />
        <Phrase tagalog="Tita / Tito" pron="TEE-tah / TEE-toh" meaning="Aunt / Uncle" />
        <Phrase tagalog="Ate" pron="AH-teh" meaning="Older sister (or older girl)" />
        <Phrase tagalog="Kuya" pron="KOO-yah" meaning="Older brother (or older boy)" />
        <Phrase tagalog="Pinsan" pron="pin-SAN" meaning="Cousin" />
        <Phrase tagalog="Apo" pron="AH-poh" meaning="Grandchild" />
        <Phrase tagalog="Anak" pron="ah-NAK" meaning="Child (son or daughter)" />
        <p style={P}>
          {"Here's something that surprises many people raised abroad: "}
          <em>{"Tita"}</em>
          {", "}
          <em>{"Tito"}</em>
          {", "}
          <em>{"Ate"}</em>
          {" and "}
          <em>{"Kuya"}</em>
          {" aren't only for blood relatives. Your mum's close friends are Tita. An older cousin is Ate or Kuya. Even a friendly older shop assistant might be called Ate. Calling an elder by their first name alone can feel rude, so when in doubt, put a title in front."}
        </p>
        <SectionHeading icon="🍲">{"At the table"}</SectionHeading>
        <p style={P}>
          {"Family gatherings in the Philippines revolve around food, and lots of it. Whether you're visiting home or at a party with the Filipino community where you live, these will get plenty of use."}
        </p>
        <Phrase tagalog="Kain tayo!" pron="kah-EEN TAH-yoh" meaning="Let's eat!" />
        <Phrase tagalog="Masarap po!" pron="mah-sah-RAP poh" meaning="It's delicious! (polite)" />
        <Phrase tagalog="Busog na po ako" pron="BOO-sog nah poh ah-KOH" meaning="I'm full (polite)" />
        <Phrase tagalog="Gutom na ako" pron="GOO-tom nah ah-KOH" meaning="I'm hungry" />
        <Phrase tagalog="Pagod na ako" pron="PAH-god nah ah-KOH" meaning="I'm tired" />
        <Phrase tagalog="Sandali lang" pron="san-dah-LEE lang" meaning="Just a moment" />
        <p style={P}>
          {"A fair warning: "}
          <em>{"\"Busog na po ako\""}</em>
          {" rarely works on the first try. Filipino hosts and lolas tend to treat \"I'm full\" as an opening offer. Saying "}
          <em>{"\"Masarap po!\""}</em>
          {" first, then "}
          <em>{"\"busog na po ako\""}</em>
          {" with a hand on your stomach and a smile, gives you the best odds."}
        </p>
        <SectionHeading icon="✈️">{"Visiting home"}</SectionHeading>
        <p style={P}>
          {"That first trip back, or your first trip ever, to meet the relatives is a big moment. Many families save up for it for years, and a few words in Tagalog make it even more special."}
        </p>
        <Phrase tagalog="Tuloy po kayo" pron="TOO-loy poh KAH-yoh" meaning="Please come in (polite)" />
        <Phrase tagalog="Masaya po akong makilala kayo" pron="mah-SAH-yah poh ah-KONG mah-kee-LAH-lah KAH-yoh" meaning="Nice to meet you (polite)" />
        <Phrase tagalog="Maligayang kaarawan po" pron="mah-lee-GAH-yang kah-ah-RAH-wan poh" meaning="Happy birthday (polite)" />
        <Phrase tagalog="Maligayang Pasko" pron="mah-lee-GAH-yang PAS-koh" meaning="Merry Christmas" />
        <Phrase tagalog="Proud ako sa iyo" pron="PROWD ah-KOH sah ee-YOH" meaning="I'm proud of you" />
        <Phrase tagalog="Salamat sa lahat" pron="sah-LAH-mat sah lah-HAT" meaning="Thank you for everything" />
        <Phrase tagalog="Ingat sa biyahe" pron="EE-ngat sah bee-YAH-heh" meaning="Safe travels" />
        <p style={P}>
          <em>{"\"Salamat sa lahat\""}</em>
          {" is one to keep for the right moment, perhaps for the parent or grandparent who worked abroad so the family could have more. It's simple, and it says a lot."}
        </p>
        <SectionHeading icon="🙈">{"When you don't understand"}</SectionHeading>
        <p style={P}>
          {"Let's be honest: your relatives will speak fast. These phrases let you stay in the conversation instead of quietly drifting out of it."}
        </p>
        <Phrase tagalog="Hindi ko po naiintindihan" pron="hin-DEE koh poh nah-ee-in-tin-DEE-han" meaning="I don't understand (polite)" />
        <Phrase tagalog="Pakiulit po" pron="pah-kee-OO-lit poh" meaning="Please say that again (polite)" />
        <Phrase tagalog="Dahan-dahan lang po" pron="dah-HAN dah-HAN lang poh" meaning="Slowly, please (polite)" />
        <Phrase tagalog="Konti lang po ang alam kong Tagalog" pron="KON-tee lang poh ang ah-LAM kong tah-GAH-log" meaning="I only know a little Tagalog (polite)" />
        <Phrase tagalog="Ano po ang ibig sabihin ng ___?" pron="ah-NOH poh ang EE-big sah-bee-HIN nang" meaning="What does ___ mean? (polite)" />
        <p style={P}>
          {"That last one is a secret weapon. Ask a lola what a word means, and you may get a story along with the answer. It turns her into your teacher, and most lolas love that role."}
        </p>
        <SectionHeading icon="💡">{"One last tip"}</SectionHeading>
        <p style={P}>
          {"Don't wait until your Tagalog is \"good enough\". Your family isn't grading you. A shaky "}
          <em>{"\"Mahal kita, Lola\""}</em>
          {" on a video call means more than a perfect sentence you never say. Start with "}
          <em>{"po"}</em>
          {", "}
          <em>{"mano po"}</em>
          {" and "}
          <em>{"kumain ka na?"}</em>
          {", and build from there."}
        </p>
        <p style={P}>
          {"If your family speaks another Filipino language at home, we can help there too. We also have free phrase pages for "}
          <Link href="/learn/cebuano" style={linkStyle}>{"Cebuano"}</Link>
          {" and "}
          <Link href="/learn/ilonggo" style={linkStyle}>{"Ilonggo"}</Link>
          {"."}
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
              {"Ready to practise?"}
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: "0.25rem 0 0" }}>
              {"Every phrase on our "}
              <Link href="/learn/tagalog" style={linkStyle}>{"Tagalog page"}</Link>
              {" comes with free native-speaker audio. No signup, no app download. Listen a few times, say it out loud, and surprise someone on your next family call."}
            </p>
          </div>
          <Link href="/learn/tagalog" style={{
            background: "#fbbf24", color: "#0f172a", textDecoration: "none",
            borderRadius: "999px", padding: "0.65rem 1.5rem", fontWeight: "700", fontSize: "0.95rem",
            whiteSpace: "nowrap",
          }}>
            {"Listen to free Tagalog phrases →"}
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
          <a href="https://www.facebook.com/profile.php?id=61591506690001" target="_blank" rel="noopener noreferrer" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Facebook</a>
        </nav>
        <p style={{ color: "#475569", fontSize: "0.8rem", margin: 0 }}>© 2026 talkaPH - Learn Filipino languages</p>
      </footer>
    </main>
  );
}
