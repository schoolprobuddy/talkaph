import Link from "next/link";
import { pageMetadata } from "../../../lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Ilonggo Phrases for Iloilo and Bacolod Travellers",
    description: "Visiting Iloilo or Bacolod? Learn 30+ Ilonggo (Hiligaynon) phrases for greetings, food, markets and directions, with pronunciation and free audio.",
    path: "/blog/ilonggo-phrases-iloilo-bacolod",
    type: "article",
  }),
  keywords: [
    "ilonggo phrases",
    "hiligaynon phrases for tourists",
    "iloilo travel tips",
    "bacolod travel phrases",
    "how to say thank you in ilonggo",
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
          <Link href="/blog" style={{ color: "#94a3b8", textDecoration: "none" }}>Blog</Link> › Travel
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: "900", lineHeight: 1.2, margin: "0 0 0.75rem" }}>
          {"🌺 Ilonggo Phrases for Iloilo and Bacolod"}
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "0 0 2.5rem" }}>
          {"By Drew, native Filipino speaker · October 2026 · 6 min read"}
        </p>
        <p style={P}>
          {"Ask Filipinos which language sounds the sweetest, and a lot of them will say "}
          <strong style={{ color: "#fff" }}>{"Ilonggo"}</strong>
          {". It has a gentle, sing-song rhythm, and even an argument in Ilonggo can sound like a lullaby. People joke that Ilonggos sound "}
          <em>{"malambing"}</em>
          {" (affectionate) no matter what they're actually saying."}
        </p>
        <p style={P}>
          {"Ilonggo, also called "}
          <strong style={{ color: "#fff" }}>{"Hiligaynon"}</strong>
          {", is the language of Western Visayas. You'll hear it in Iloilo City, across Guimaras and Capiz, and over the water in Bacolod and the rest of Negros Occidental. If your trip includes batchoy in Iloilo, chicken inasal in Bacolod, or the short ferry ride between the two cities, this is the language you'll be surrounded by."}
        </p>
        <p style={P}>
          {"English works fine here, as it does across most of the Philippines. But I grew up speaking Ilonggo, and I can tell you that hearing a visitor try it is a real treat for locals. These are the phrases I'd teach a friend before they go. You can hear most of them spoken by a native speaker on our free "}
          <Link href="/learn/ilonggo" style={linkStyle}>{"Ilonggo phrases page"}</Link>
          {"."}
        </p>
        <SectionHeading icon="✨">{"The magic word: gid"}</SectionHeading>
        <p style={P}>
          {"If you only learn one Ilonggo word, make it "}
          <strong style={{ color: "#fff" }}>{"gid"}</strong>
          {". It means \"really\" or \"very\", and Ilonggos use it constantly. "}
          <em>{"Salamat"}</em>
          {" is \"thank you\"; "}
          <em>{"salamat gid"}</em>
          {" is \"thank you so much\". "}
          <em>{"Namit"}</em>
          {" is \"delicious\"; "}
          <em>{"namit gid"}</em>
          {" is \"really delicious\". Sprinkle it in and you'll instantly sound more local."}
        </p>
        <SectionHeading icon="👋">{"Greetings and courtesy"}</SectionHeading>
        <Phrase tagalog="Maayong aga" pron="ma-AH-yong AH-gah" meaning="Good morning" />
        <Phrase tagalog="Maayong hapon" pron="ma-AH-yong HAH-pon" meaning="Good afternoon" />
        <Phrase tagalog="Maayong gab-i" pron="ma-AH-yong GAB-ee" meaning="Good evening" />
        <Phrase tagalog="Kamusta ka?" pron="kah-MOOS-tah kah" meaning="How are you? (to one person)" />
        <Phrase tagalog="Kamusta kamo?" pron="kah-MOOS-tah kah-MOH" meaning="How are you? (to a group)" />
        <Phrase tagalog="Salamat / Salamat gid" pron="sah-LAH-mat / sah-LAH-mat GEED" meaning="Thank you / Thank you so much" />
        <Phrase tagalog="Oo / Indi" pron="OH-oh / in-DEE" meaning="Yes / No" />
        <Phrase tagalog="Palihog" pron="pah-LEE-hog" meaning="Please" />
        <p style={P}>
          {"Notice the \"good morning\" here is "}
          <em>{"maayong aga"}</em>
          {", not the Cebuano "}
          <em>{"maayong buntag"}</em>
          {". Ilonggo and Cebuano are cousins, and they share a lot of words, but they're separate languages. If you're coming from Cebu, don't be surprised when some of your new Bisaya words don't quite fit. (Our "}
          <Link href="/blog/cebuano-phrases-for-cebu-trip" style={linkStyle}>{"Cebu phrase guide"}</Link>
          {" covers the Cebuano side.)"}
        </p>
        <p style={P}>
          {"A note on "}
          <em>{"Indi"}</em>
          {": the Ilonggo \"no\" is "}
          <em>{"indi"}</em>
          {", while Cebuano uses "}
          <em>{"dili"}</em>
          {" and Tagalog uses "}
          <em>{"hindi"}</em>
          {". It's a tiny word, but it's a quick way to show you know where you are."}
        </p>
        <SectionHeading icon="🍜">{"Food: batchoy, inasal and more"}</SectionHeading>
        <p style={P}>
          {"Western Visayas is one of the best food regions in the country, and food is how Ilonggos show love. In Iloilo, go for "}
          <strong style={{ color: "#fff" }}>{"La Paz batchoy"}</strong>
          {", a rich noodle soup topped with crushed chicharon. In Bacolod, head to Manokan Country for "}
          <strong style={{ color: "#fff" }}>{"chicken inasal"}</strong>
          {", grilled chicken basted in annatto oil, eaten with your hands and a mountain of rice."}
        </p>
        <Phrase tagalog="Namit ni!" pron="NAH-mit nee" meaning="This is delicious!" />
        <Phrase tagalog="Namit gid!" pron="NAH-mit GEED" meaning="Really delicious!" />
        <Phrase tagalog="Ginagutom na ako" pron="gee-nah-GOO-tom nah ah-KOH" meaning="I'm hungry already" />
        <Phrase tagalog="Kaon ta" pron="KAH-on tah" meaning="Let's eat" />
        <Phrase tagalog="Tubig, palihog" pron="TOO-big, pah-LEE-hog" meaning="Water, please" />
        <Phrase tagalog="Kan-on" pron="KAN-on" meaning="Cooked rice" />
        <Phrase tagalog="Ka tam-is sini" pron="kah tam-IS SEE-nee" meaning="This is sweet" />
        <p style={P}>
          {"Unlimited rice (\"unli-rice\") is a proud tradition at many inasal places, so pace yourself. And if you're offered a Guimaras mango, take it. Many Filipinos will tell you they're the sweetest mangoes in the country, and after one bite you'll probably agree. A heartfelt "}
          <em>{"\"Namit gid!\""}</em>
          {" to the cook will earn you a friend for life."}
        </p>
        <SectionHeading icon="🛍️">{"At the market"}</SectionHeading>
        <Phrase tagalog="Tagpila ini?" pron="tag-PEE-lah ee-NEE" meaning="How much is this?" />
        <Phrase tagalog="Mahal gid" pron="mah-HAL GEED" meaning="That's really expensive" />
        <Phrase tagalog="Isa, duha, tatlo" pron="ee-SAH, DOO-hah, tat-LOH" meaning="One, two, three" />
        <Phrase tagalog="Sige" pron="SEE-geh" meaning="Okay / Sure" />
        <p style={P}>
          {"As elsewhere in the Philippines, prices in markets are often quoted in English or in Spanish-derived numbers rather than Ilonggo ones, so don't panic if the reply doesn't match your number list. Friendly haggling is fine at street stalls and souvenir shops, but not in malls or restaurants. Keep it light: a smiling "}
          <em>{"\"Mahal gid!\""}</em>
          {" is half the fun."}
        </p>
        <p style={P}>
          {"Bacolod is also the home of the MassKara Festival every October, and Iloilo hosts Dinagyang every January. If your trip lines up with either, book your room early. The cities fill up fast."}
        </p>
        <SectionHeading icon="🛺">{"Getting around"}</SectionHeading>
        <Phrase tagalog="Diin ang CR?" pron="dee-IN ang see-AR" meaning="Where is the restroom?" />
        <Phrase tagalog="Paano makakadto sa ___?" pron="pah-AH-noh mah-kah-KAD-toh sah" meaning="How do I get to ___?" />
        <Phrase tagalog="Liko sa wala" pron="LEE-koh sah wah-LAH" meaning="Turn left" />
        <Phrase tagalog="Liko sa tuo" pron="LEE-koh sah TOO-oh" meaning="Turn right" />
        <Phrase tagalog="Diretso lang" pron="dee-RET-soh lang" meaning="Go straight" />
        <Phrase tagalog="Malapit lang" pron="mah-LAH-pit lang" meaning="It's just nearby" />
        <Phrase tagalog="Ano ka layo?" pron="ah-NOH kah LAH-yoh" meaning="How far is it?" />
        <Phrase tagalog="Lugar lang" pron="loo-GAR lang" meaning="Stop here, please (jeepney or taxi)" />
        <p style={P}>
          {"Iloilo's jeepneys have their own distinctive look, and locals are rightly proud of them. When you want to get off, "}
          <em>{"lugar lang"}</em>
          {" or the nationwide "}
          <em>{"\"para!\""}</em>
          {" both work."}
        </p>
        <p style={P}>
          {"Travelling between the two cities is easy. Fast ferries cross the Guimaras Strait between Iloilo and Bacolod several times a day, and the trip takes roughly an hour. Guimaras itself is only a short boat ride from Iloilo City and makes a lovely day trip."}
        </p>
        <SectionHeading icon="🤝">{"Making friends"}</SectionHeading>
        <Phrase tagalog="Ano ang imo ngalan?" pron="ah-NOH ang EE-moh NGAH-lan" meaning="What is your name?" />
        <Phrase tagalog="Taga diin ka?" pron="tah-gah dee-IN kah" meaning="Where are you from?" />
        <Phrase tagalog="Taga-___ ako" pron="TAH-gah ___ ah-KOH" meaning="I'm from ___" />
        <Phrase tagalog="Nalipay ako nga nakilala ta ka" pron="nah-LEE-pai ah-KOH ngah nah-kee-LAH-lah tah kah" meaning="Nice to meet you" />
        <Phrase tagalog="Indi ko kabalo mag-Ilonggo" pron="in-DEE koh kah-BAH-loh mag-ee-LONG-goh" meaning="I don't know how to speak Ilonggo" />
        <Phrase tagalog="Wala ako kahibalo" pron="wah-LAH ah-KOH kah-hee-BAH-loh" meaning="I don't know" />
        <Phrase tagalog="Lakat ta" pron="LAH-kat tah" meaning="Let's go" />
        <p style={P}>
          {"You'll also hear Ilonggos say "}
          <strong style={{ color: "#fff" }}>{"ambot"}</strong>
          {" all the time. It means \"I don't know\" (or, with the right shrug, \"who knows?\"). Use it with a laugh and people will love it."}
        </p>
        <p style={P}>
          {"Expect to be called "}
          <strong style={{ color: "#fff" }}>{"Inday"}</strong>
          {" (for women) or "}
          <strong style={{ color: "#fff" }}>{"Toto"}</strong>
          {" (for men). They're everyday terms of affection, a bit like \"love\" or \"mate\", and they're a sign you're being treated warmly."}
        </p>
        <SectionHeading icon="👋">{"Saying goodbye"}</SectionHeading>
        <Phrase tagalog="Hulat anay" pron="HOO-lat ah-NAI" meaning="Wait a moment" />
        <Phrase tagalog="Buligi ko palihog" pron="boo-LEE-gee koh pah-LEE-hog" meaning="Please help me" />
        <Phrase tagalog="Ka init subong" pron="kah EE-nit SOO-bong" meaning="It's hot today" />
        <Phrase tagalog="Halong ka" pron="HAH-long kah" meaning="Take care" />
        <Phrase tagalog="Kitaay ta liwat" pron="kee-TAH-ai tah LEE-wat" meaning="See you again" />
        <Phrase tagalog="Palangga ko ikaw" pron="pah-LANG-gah koh ee-KAW" meaning="I love you" />
        <p style={P}>
          <em>{"Halong ka"}</em>
          {" is the warm Ilonggo send-off, the equivalent of the Tagalog "}
          <em>{"ingat"}</em>
          {". You'll hear it from hotel staff, tricycle drivers and new friends alike. And "}
          <em>{"palangga"}</em>
          {"? It's one of the most beautiful words in the language, used for anyone dear to you, from a partner to a grandchild."}
        </p>
        <SectionHeading icon="🎬">{"Putting it together: dinner at Manokan Country"}</SectionHeading>
        <p style={P}>
          {"Here's what a real evening might look like in Bacolod. You arrive at one of the inasal stalls and greet the server with "}
          <em>{"\"Maayong gab-i!\""}</em>
          {" Follow it with "}
          <em>{"\"Kamusta ka?\""}</em>
          {" and you've already made a friend. Point at the skewers on the grill, order with your fingers if you need to, and ask for "}
          <em>{"\"Tubig, palihog.\""}</em>
          {" When the chicken arrives, smoky and glistening, the only correct response after the first bite is "}
          <em>{"\"Namit gid!\""}</em>
          {" When it's time to pay, ask "}
          <em>{"\"Tagpila ini?\""}</em>
          {", then finish with a warm "}
          <em>{"\"Salamat gid.\""}</em>
          {" Expect a "}
          <em>{"\"Halong ka!\""}</em>
          {" as you leave. Say it right back. Six or seven phrases, one meal, and a much better memory of Bacolod."}
        </p>
        <SectionHeading icon="💡">{"One last tip"}</SectionHeading>
        <p style={P}>
          {"Ilonggo is phonetic, so if you can read it, you can say it. Speak slowly and softly; the gentle tone is part of the language's charm. And don't worry about mistakes. In a region famous for its hospitality, every attempt is welcome."}
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
              {"Want to hear the real thing?"}
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: "0.25rem 0 0" }}>
              {"Every phrase on our "}
              <Link href="/learn/ilonggo" style={linkStyle}>{"Ilonggo page"}</Link>
              {" comes with free native-speaker audio. No signup, no app, just tap and listen. Learn a few before you land, and your first "}
              <em>{"\"Salamat gid!\""}</em>
              {" will get the biggest smile of your trip."}
            </p>
          </div>
          <Link href="/learn/ilonggo" style={{
            background: "#fbbf24", color: "#0f172a", textDecoration: "none",
            borderRadius: "999px", padding: "0.65rem 1.5rem", fontWeight: "700", fontSize: "0.95rem",
            whiteSpace: "nowrap",
          }}>
            {"Listen to free Ilonggo phrases →"}
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
