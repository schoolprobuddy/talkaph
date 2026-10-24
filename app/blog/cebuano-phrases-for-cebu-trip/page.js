import Link from "next/link";
import { pageMetadata } from "../../../lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Cebuano Phrases for Your Cebu Trip (Bisaya Basics)",
    description: "Heading to Cebu? Learn 30+ Cebuano (Bisaya) phrases for greetings, markets, jeepneys and food, with pronunciation and free native audio.",
    path: "/blog/cebuano-phrases-for-cebu-trip",
    type: "article",
  }),
  keywords: [
    "cebuano phrases",
    "bisaya phrases for tourists",
    "cebu travel phrases",
    "basic cebuano words",
    "how to say thank you in cebuano",
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
          {"🏝️ Cebuano Phrases for Your Cebu Trip"}
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "0 0 2.5rem" }}>
          {"By Drew, native Filipino speaker · October 2026 · 7 min read"}
        </p>
        <p style={P}>
          {"Flying into Mactan-Cebu? Here's something a lot of visitors don't realise until they land: Cebu doesn't run on Tagalog. The local language is "}
          <strong style={{ color: "#fff" }}>{"Cebuano"}</strong>
          {", which almost everyone in Cebu calls "}
          <strong style={{ color: "#fff" }}>{"Bisaya"}</strong>
          {" (or Binisaya). It's one of the most widely spoken languages in the Philippines, heard across Cebu, Bohol, Negros Oriental and much of Mindanao, including Davao."}
        </p>
        <p style={P}>
          {"English will get you through your trip without trouble. But a few words of Bisaya get you something better: the grin of a lechon vendor who wasn't expecting it, a boatman who suddenly wants to show you his favourite snorkelling spot, a tita at your homestay who starts calling you \"day\" or \"dong\" like family. Cebuanos are proud of their language, and they notice when you make the effort."}
        </p>
        <p style={P}>
          {"I grew up speaking Cebuano alongside Ilonggo and Tagalog, and these are the phrases I'd give a friend before their Cebu trip. You can hear most of them spoken by a native speaker on our free "}
          <Link href="/learn/cebuano" style={linkStyle}>{"Cebuano phrases page"}</Link>
          {"."}
        </p>
        <SectionHeading icon="✨">{"First, a quick word on \"po\""}</SectionHeading>
        <p style={P}>
          {"If you've read our "}
          <Link href="/blog/tagalog-phrases-for-tourists" style={linkStyle}>{"Tagalog phrases for tourists"}</Link>
          {", you'll know about "}
          <em>{"po"}</em>
          {", the Tagalog respect word. Cebuano doesn't really use it. Instead, politeness comes through tone and through small words like "}
          <strong style={{ color: "#fff" }}>{"palihug"}</strong>
          {" (please). Speak softly, smile, and add "}
          <em>{"palihug"}</em>
          {" when you ask for something, and you'll come across as perfectly polite."}
        </p>
        <SectionHeading icon="👋">{"Greetings and courtesy"}</SectionHeading>
        <Phrase tagalog="Maayong buntag" pron="ma-AH-yong BOON-tag" meaning="Good morning" />
        <Phrase tagalog="Maayong hapon" pron="ma-AH-yong HAH-pon" meaning="Good afternoon" />
        <Phrase tagalog="Maayong gabii" pron="ma-AH-yong ga-BEE-ee" meaning="Good evening" />
        <Phrase tagalog="Kumusta ka?" pron="koo-MOOS-tah kah" meaning="How are you?" />
        <Phrase tagalog="Salamat / Salamat kaayo" pron="sah-LAH-mat / sah-LAH-mat ka-AH-yo" meaning="Thank you / Thank you very much" />
        <Phrase tagalog="Walay sapayan" pron="WAH-lai sah-PAH-yan" meaning="You're welcome" />
        <Phrase tagalog="Oo / Dili" pron="OH-oh / DEE-lee" meaning="Yes / No" />
        <Phrase tagalog="Palihug" pron="pah-LEE-hoog" meaning="Please" />
        <p style={P}>
          <strong style={{ color: "#fff" }}>{"Kaayo"}</strong>
          {" is a word worth remembering on its own. It means \"very\", and it goes after the word it boosts. "}
          <em>{"Salamat kaayo"}</em>
          {" is \"thank you very much\", and you'll use the same word below for food and prices."}
        </p>
        <SectionHeading icon="🛍️">{"At the market and the sari-sari store"}</SectionHeading>
        <Phrase tagalog="Tagpila ni?" pron="tag-PEE-lah nee" meaning="How much is this?" />
        <Phrase tagalog="Mahal kaayo" pron="mah-HAL ka-AH-yo" meaning="That's very expensive" />
        <Phrase tagalog="Usa, duha, tulo" pron="OO-sah, DOO-hah, TOO-loh" meaning="One, two, three" />
        <Phrase tagalog="Sige" pron="SEE-geh" meaning="Okay / Sure" />
        <p style={P}>
          {"A useful tip for markets like Carbon Market in Cebu City: although Cebuano has its own numbers ("}
          <em>{"usa, duha, tulo"}</em>
          {"), prices are very often said in Spanish-derived numbers or simply in English. Don't be surprised if a vendor answers "}
          <em>{"\"Tagpila ni?\""}</em>
          {" with \"singkwenta\" (50) or \"one hundred\". Just smile and keep going."}
        </p>
        <p style={P}>
          {"Haggling works the same way as elsewhere in the Philippines. Fixed prices at malls and restaurants, friendly bargaining at street stalls and souvenir shops. A cheerful "}
          <em>{"\"Mahal kaayo!\""}</em>
          {" is the classic opening line. Keep it light and you'll often get a \"sige, sige\" and a better price."}
        </p>
        <SectionHeading icon="🍖">{"Food: the most important section"}</SectionHeading>
        <p style={P}>
          {"Cebu is famous across the Philippines for one thing above all: "}
          <strong style={{ color: "#fff" }}>{"lechon"}</strong>
          {", whole roasted pig with crackling skin. Cebuanos will tell you, with total confidence, that theirs is the best in the country. You'll want these phrases ready."}
        </p>
        <Phrase tagalog="Lami ni!" pron="lah-MEE nee" meaning="This is delicious!" />
        <Phrase tagalog="Lami kaayo!" pron="lah-MEE ka-AH-yo" meaning="Very delicious!" />
        <Phrase tagalog="Halang ni" pron="hah-LANG nee" meaning="This is spicy" />
        <Phrase tagalog="Mangaon na ta" pron="mah-ngah-ON nah tah" meaning="Let's eat" />
        <Phrase tagalog="Gigutom na ko" pron="gee-GOO-tom nah koh" meaning="I'm hungry already" />
        <Phrase tagalog="Tubig, palihug" pron="TOO-big, pah-LEE-hoog" meaning="Water, please" />
        <Phrase tagalog="Kan-on" pron="KAN-on" meaning="Cooked rice" />
        <p style={P}>
          <em>{"Lami"}</em>
          {" is your magic word in Cebu. Say it at a carinderia (a small local eatery), at a lechon stall, or at someone's dinner table, and watch the cook light up. Fair warning: telling a Filipino host the food is "}
          <em>{"lami kaayo"}</em>
          {" is a guaranteed way to get another serving put on your plate."}
        </p>
        <p style={P}>
          {"On rice: Cebu has its own famous rice style, "}
          <strong style={{ color: "#fff" }}>{"puso"}</strong>
          {", which is rice cooked inside a small pouch of woven coconut leaves. You'll see it hanging in bunches at barbecue stalls. Order a few with grilled pork or chicken for a cheap, very Cebuano meal."}
        </p>
        <SectionHeading icon="🛺">{"Getting around"}</SectionHeading>
        <Phrase tagalog="Asa ang CR?" pron="AH-sah ang see-AR" meaning="Where is the restroom?" />
        <Phrase tagalog="Unsaon pag-adto sa ___?" pron="oon-SAH-on pag-AD-toh sah" meaning="How do I get to ___?" />
        <Phrase tagalog="Liko sa wala" pron="LEE-koh sah wah-LAH" meaning="Turn left" />
        <Phrase tagalog="Liko sa tuo" pron="LEE-koh sah TOO-oh" meaning="Turn right" />
        <Phrase tagalog="Diretso lang" pron="dee-RET-soh lang" meaning="Go straight" />
        <Phrase tagalog="Duol lang" pron="doo-OL lang" meaning="It's just nearby" />
        <Phrase tagalog="Layo ba?" pron="LAH-yoh bah" meaning="Is it far?" />
        <Phrase tagalog="Lugar lang" pron="loo-GAR lang" meaning="Stop here, please (on a jeepney)" />
        <p style={P}>
          <strong style={{ color: "#fff" }}>{"Lugar lang"}</strong>
          {" is the Cebu way of asking a jeepney or taxi to stop. In Manila you'd shout \"para po!\", and that's understood in Cebu too, but "}
          <em>{"lugar lang"}</em>
          {" sounds instantly local. And yes, restrooms here are called CRs (comfort rooms), just like everywhere else in the country."}
        </p>
        <p style={P}>
          {"Directions are worth practising before you take a jeepney or a habal-habal (motorbike taxi) into the hills. Even if the answer comes back in fast Bisaya, catching "}
          <em>{"duol lang"}</em>
          {" (\"it's close\") or "}
          <em>{"layo"}</em>
          {" (\"far\") tells you whether to walk or flag a ride."}
        </p>
        <SectionHeading icon="🤝">{"Making friends"}</SectionHeading>
        <Phrase tagalog="Unsa imong ngalan?" pron="OON-sah EE-mong NGAH-lan" meaning="What is your name?" />
        <Phrase tagalog="Taga asa ka?" pron="tah-gah AH-sah kah" meaning="Where are you from?" />
        <Phrase tagalog="Gikan ko sa ___" pron="GEE-kan koh sah" meaning="I'm from ___" />
        <Phrase tagalog="Nalipay ko nga nakaila nimo" pron="nah-LEE-pai koh ngah nah-ka-EE-lah NEE-moh" meaning="Nice to meet you" />
        <Phrase tagalog="Wala ko kahibalo" pron="wah-LAH koh ka-hee-BAH-loh" meaning="I don't know" />
        <Phrase tagalog="Gamay ra akong Bisaya" pron="gah-MAI rah AH-kong bee-SAH-yah" meaning="I only speak a little Bisaya" />
        <Phrase tagalog="Lakaw ta" pron="LAH-kaw tah" meaning="Let's go" />
        <p style={P}>
          <em>{"Taga asa ka?"}</em>
          {" is one of the first questions you'll be asked, often by a curious kid or a tricycle driver. Answer with "}
          <em>{"Gikan ko sa"}</em>
          {" plus your country, and you've just had your first real Cebuano conversation. Admitting "}
          <em>{"gamay ra akong Bisaya"}</em>
          {" (\"my Bisaya is only a little\") usually earns a laugh and an instant language lesson."}
        </p>
        <SectionHeading icon="🌊">{"Out on the islands"}</SectionHeading>
        <p style={P}>
          {"Cebu is a jumping-off point for some of the best day trips in the Philippines: island hopping off Mactan, the sardine run at Moalboal, canyoneering down to Kawasan Falls, or slower days on Bantayan and Malapascua. A few last phrases come in handy here."}
        </p>
        <Phrase tagalog="Init karon" pron="EE-nit kah-RON" meaning="It's hot today" />
        <Phrase tagalog="Kadiyot lang" pron="kah-DEE-yot lang" meaning="Just a moment" />
        <Phrase tagalog="Palihug tabangi ko" pron="pah-LEE-hoog tah-BAH-ngee koh" meaning="Please help me" />
        <Phrase tagalog="Pag-amping" pron="pag-AM-ping" meaning="Take care" />
        <Phrase tagalog="Magkita ta pag-usab" pron="mag-KEE-tah tah pag-OO-sab" meaning="See you again" />
        <p style={P}>
          <em>{"Pag-amping"}</em>
          {" is the lovely send-off you'll hear when you leave a resort, a homestay or a boat crew at the end of the day. Say it back, and add a "}
          <em>{"salamat kaayo"}</em>
          {"."}
        </p>
        <SectionHeading icon="🎬">{"Putting it together: a morning at the lechon stall"}</SectionHeading>
        <p style={P}>
          {"Here's how these phrases fit into a real moment. You walk up to a lechon stall near the market and greet the vendor with "}
          <em>{"\"Maayong buntag!\""}</em>
          {" She smiles, a little surprised. You point at the crispiest-looking piece and ask, "}
          <em>{"\"Tagpila ni?\""}</em>
          {" She names a price, probably in English or Spanish numbers. If it feels high, try a playful "}
          <em>{"\"Mahal kaayo!\""}</em>
          {" and see if she knocks a little off. When she does, a quick "}
          <em>{"\"Sige!\""}</em>
          {" seals the deal. Take a bite, tell her "}
          <em>{"\"Lami kaayo!\""}</em>
          {", and leave with a "}
          <em>{"\"Salamat kaayo\""}</em>
          {". Don't be surprised if she sends you off with "}
          <em>{"\"Pag-amping!\""}</em>
          {" That's six phrases, one short exchange, and a vendor who'll remember you next time."}
        </p>
        <SectionHeading icon="💡">{"One last tip"}</SectionHeading>
        <p style={P}>
          {"Cebuano, like Tagalog, is mostly phonetic: words sound the way they're spelled, so you can read a phrase off your phone and be understood. Don't stress about getting the stress right. Cebuanos are famously warm, and you'll be gently corrected and cheered on in the same breath."}
        </p>
        <p style={P}>
          {"If you're also stopping in Manila, Bohol or Iloilo, it's worth knowing that each region has its own language. Tagalog in Manila, Cebuano in Cebu and Bohol, and Ilonggo in Iloilo and Bacolod. We've got free phrase pages for all three."}
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
              {"Want to hear these before your flight?"}
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: "0.25rem 0 0" }}>
              {"Every phrase on our "}
              <Link href="/learn/cebuano" style={linkStyle}>{"Cebuano page"}</Link>
              {" has free native-speaker audio. No signup, no app download, just tap and listen. Practise a few on the plane, and your first "}
              <em>{"\"Maayong buntag!\""}</em>
              {" in Cebu will land perfectly."}
            </p>
          </div>
          <Link href="/learn/cebuano" style={{
            background: "#fbbf24", color: "#0f172a", textDecoration: "none",
            borderRadius: "999px", padding: "0.65rem 1.5rem", fontWeight: "700", fontSize: "0.95rem",
            whiteSpace: "nowrap",
          }}>
            {"Listen to free Cebuano phrases →"}
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
