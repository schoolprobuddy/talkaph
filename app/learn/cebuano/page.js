import Link from "next/link";

const LESSONS = {
  basics: [
    { id: "cb-b1", title: "I. Greetings", icon: "👋", hasFormal: true, rows: [
      ["Kumusta ka?","Kumusta man mo?","How are you?"],
      ["Maayong buntag","Maayong buntag","Good morning"],
      ["Maayong hapon","Maayong hapon","Good afternoon"],
      ["Maayong gabii","Maayong gabii","Good evening"],
      ["Salamat","Salamat kaayo","Thank you / Thank you very much"],
      ["Walay sapayan","Walay sapayan","You're welcome"],
      ["Paalam","Paalam na","Goodbye"],
      ["Oo","Oo","Yes"],
      ["Dili","Dili","No"],
    ]},
    { id: "cb-b2", title: "II. Numbers", icon: "🔢", hasFormal: false, rows: [
      ["Usa","One"],["Duha","Two"],["Tulo","Three"],["Apat","Four"],["Lima","Five"],
      ["Unom","Six"],["Pito","Seven"],["Walo","Eight"],["Siyam","Nine"],["Pulo","Ten"],
    ]},
    { id: "cb-b3", title: "III. Family Members", icon: "👨‍👩‍👧", hasFormal: false, rows: [
      ["Amahan / Tatay","Father"],["Inahan / Nanay","Mother"],["Kuya","Older brother"],
      ["Ate","Older sister"],["Igsuon","Sibling"],["Lolo","Grandfather"],
      ["Lola","Grandmother"],["Tito","Uncle"],["Tita","Aunt"],["Anak","Child"],
    ]},
  ],
  vocabulary: [
    { id: "cb-v1", title: "I. Food & Drinks", icon: "🍚", hasFormal: false, rows: [
      ["Kan-on","Cooked rice"],["Bugas","Uncooked rice"],["Tubig","Water"],
      ["Tinapay","Bread"],["Manok","Chicken"],["Baboy","Pork"],
      ["Isda","Fish"],["Itlog","Egg"],["Utanon","Vegetables"],["Gatas","Milk"],
    ]},
    { id: "cb-v2", title: "II. Colors", icon: "🎨", hasFormal: false, rows: [
      ["Pula","Red"],["Asul","Blue"],["Berde","Green"],["Dalag","Yellow"],
      ["Puti","White"],["Itom","Black"],["Kahel","Orange"],["Lila","Purple"],
      ["Rosas","Pink"],["Kayumanggi","Brown"],
    ]},
    { id: "cb-v3", title: "III. Places", icon: "🏘️", hasFormal: false, rows: [
      ["Merkado","Market"],["Tindahan","Store"],["Ospital","Hospital"],
      ["Eskwelahan","School"],["Simbahan","Church"],["Banko","Bank"],
      ["Parke","Park"],["Balay","House"],["Karsada","Street"],
    ]},
  ],
  advanced: [
    { id: "cb-a1", title: "I. Introducing Yourself", icon: "💬", hasFormal: false, rows: [
      ["Ang akong ngalan mao si ___","My name is ___"],
      ["Gikan ako sa Cebu","I am from Cebu"],
      ["Nagsabot ko og Cebuano","I speak Cebuano"],
      ["Unsa imong ngalan?","What is your name?"],
      ["Tagpila ka?","How old are you?"],
      ["Nalipay ko nga nakaila nimo","Nice to meet you"],
    ]},
    { id: "cb-a2", title: "II. Everyday Expressions", icon: "🗣️", hasFormal: false, rows: [
      ["Sige","Okay / Sure"],
      ["Ayaw problema","No problem"],
      ["Wala ko kahibalo","I don't know"],
      ["Hulat lang","Just a moment"],
      ["Gigutom na ko","I am already hungry"],
      ["Gikapoy na ko","I am already tired"],
      ["Palangga ko ikaw","I love you"],
      ["Naa ka diri","You are here"],
    ]},
    { id: "cb-a3", title: "III. Asking Directions", icon: "🗺️", hasFormal: false, rows: [
      ["Asa ang CR?","Where is the restroom?"],
      ["Unsaon pagadto sa ___?","How do I get to ___?"],
      ["Liko sa wala","Turn left"],
      ["Liko sa tuo","Turn right"],
      ["Diretso lang","Go straight"],
      ["Duol lang","It's just nearby"],
      ["Layo ba?","Is it far?"],
    ]},
  ],
};

const TABS = ["basics", "vocabulary", "advanced"];
const TAB_LABELS = { basics: "Basics", vocabulary: "Vocabulary", advanced: "Advanced" };

export default function CebuanoPage() {
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
        <Link href="/learn" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>← All languages</Link>
      </nav>

      <section style={{ textAlign: "center", padding: "2rem 2rem 1rem" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🌊</div>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: "900", marginBottom: "0.5rem" }}>Cebuano</h1>
        <p style={{ color: "#94a3b8", fontSize: "1rem" }}>Bisaya · Spoken in Visayas & Mindanao</p>
      </section>

      {TABS.map(tab => (
        <section key={tab} style={{ padding: "1rem 2rem 2rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fbbf24", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1rem" }}>
            {TAB_LABELS[tab]}
          </h2>
          {LESSONS[tab].map(lesson => (
            <div key={lesson.id} style={{ marginBottom: "2rem", background: "rgba(255,255,255,0.05)", borderRadius: "1rem", overflow: "hidden" }}>
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.4rem" }}>{lesson.icon}</span>
                <span style={{ fontWeight: "700", fontSize: "1rem" }}>{lesson.title}</span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                      {lesson.hasFormal
                        ? <><th style={th}>Singular (ka)</th><th style={th}>Plural / Respectful (kamo)</th><th style={th}>English</th></>
                        : <><th style={th}>Cebuano</th><th style={th}>English</th></>
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {lesson.rows.map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        {row.map((cell, j) => (
                          <td key={j} style={{ ...td, color: j === 0 ? "#e2e8f0" : j === 1 && lesson.hasFormal ? "#86efac" : "#94a3b8" }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>
      ))}

      <footer style={{ textAlign: "center", padding: "2rem", color: "#334155", fontSize: "0.8rem" }}>
        © 2026 talkaPH · Learn Filipino languages
      </footer>
    </main>
  );
}

const th = { padding: "0.75rem 1rem", textAlign: "left", color: "#94a3b8", fontWeight: "600", fontSize: "0.8rem", textTransform: "uppercase" };
const td = { padding: "0.65rem 1rem" };
