import Link from "next/link";

const LESSONS = {
  basics: [
    { id: "il-b1", title: "I. Greetings", icon: "👋", hasFormal: true, rows: [
      ["Kamusta ka?","Kamusta kamo?","How are you?"],
      ["Maayong aga","Maayong aga (kamo)","Good morning"],
      ["Maayong hapon","Maayong hapon","Good afternoon"],
      ["Maayong gab-i","Maayong gab-i (kamo)","Good evening"],
      ["Salamat","Salamat gid","Thank you / Thank you very much"],
      ["Wala sing sapayan","Wala sing sapayan","You're welcome"],
      ["Paalam","Paalam na","Goodbye"],
      ["Oo","Oo","Yes"],
      ["Indi","Indi","No"],
      ["Palangga ko ikaw","—","I love you"],
    ]},
    { id: "il-b2", title: "II. Numbers", icon: "🔢", hasFormal: false, rows: [
      ["Isa","One"],["Duha","Two"],["Tatlo","Three"],["Apat","Four"],["Lima","Five"],
      ["Anom","Six"],["Pito","Seven"],["Walo","Eight"],["Siyam","Nine"],["Pulo","Ten"],
    ]},
    { id: "il-b3", title: "III. Family Members", icon: "👨‍👩‍👧", hasFormal: false, rows: [
      ["Amay / Tatay","Father"],["Nanay / Iloy","Mother"],["Kuya","Older brother"],
      ["Ate","Older sister"],["Utod","Sibling"],["Lolo","Grandfather"],
      ["Lola","Grandmother"],["Tito","Uncle"],["Tita","Aunt"],["Anak","Child"],
    ]},
  ],
  vocabulary: [
    { id: "il-v1", title: "I. Food & Drinks", icon: "🍚", hasFormal: false, rows: [
      ["Kan-on","Cooked rice"],["Bugas","Uncooked rice"],["Tubig","Water"],
      ["Tinapay","Bread"],["Manok","Chicken"],["Baboy","Pork"],
      ["Isda","Fish"],["Itlog","Egg"],["Utan","Vegetables"],["Gatas","Milk"],
    ]},
    { id: "il-v2", title: "II. Colors", icon: "🎨", hasFormal: false, rows: [
      ["Pula","Red"],["Asul","Blue"],["Berde","Green"],["Dilaw","Yellow"],
      ["Puti","White"],["Itom","Black"],["Kahel","Orange"],["Lila","Purple"],
      ["Rosas","Pink"],["Kayumanggi","Brown"],
    ]},
    { id: "il-v3", title: "III. Places", icon: "🏘️", hasFormal: false, rows: [
      ["Merkado","Market"],["Tindahan","Store"],["Ospital","Hospital"],
      ["Eskwelahan","School"],["Simbahan","Church"],["Banko","Bank"],
      ["Parke","Park"],["Balay","House"],["Dalan","Street"],
    ]},
  ],
  advanced: [
    { id: "il-a1", title: "I. Introducing Yourself", icon: "💬", hasFormal: false, rows: [
      ["Ang akon ngalan ay si ___","My name is ___"],
      ["Taga-[lugar] ako","I am from [place]"],
      ["Nalipay ako nga nakilala ta ka","Nice to meet you"],
      ["Kabalo ko maghambal Ilonggo","I speak Ilonggo"],
      ["Ano ang imo ngalan?","What is your name?"],
      ["Pila ang imo edad?","How old are you?"],
    ]},
    { id: "il-a2", title: "II. Everyday Expressions", icon: "🗣️", hasFormal: false, rows: [
      ["Sige","Okay / Sure"],
      ["Wala ako kahibalo","I don't know"],
      ["Hulat lang","Just a moment"],
      ["Ginagutom na ako","I am already hungry"],
      ["Ginakapoy na ako","I am already tired"],
      ["Palangga ko ikaw","I love you"],
      ["Kamusta na?","How are things?"],
      ["Kumain ka na?","Have you eaten?"],
    ]},
    { id: "il-a3", title: "III. Asking Directions", icon: "🗺️", hasFormal: false, rows: [
      ["Diin ang CR?","Where is the restroom?"],
      ["Paano maabot ang ___?","How do I get to ___?"],
      ["Liko sa wala","Turn left"],
      ["Liko sa tuo","Turn right"],
      ["Diretso lang","Go straight"],
      ["Malapit lang","It's just nearby"],
      ["Malayo bala?","Is it far?"],
    ]},
  ],
};

const TABS = ["basics", "vocabulary", "advanced"];
const TAB_LABELS = { basics: "Basics", vocabulary: "Vocabulary", advanced: "Advanced" };

export default function IlonggoPage() {
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
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🌺</div>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: "900", marginBottom: "0.5rem" }}>Ilonggo</h1>
        <p style={{ color: "#94a3b8", fontSize: "1rem" }}>Hiligaynon · Spoken in Western Visayas</p>
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
                        ? <><th style={th}>Singular (ka)</th><th style={th}>Plural / Group (kamo)</th><th style={th}>English</th></>
                        : <><th style={th}>Ilonggo</th><th style={th}>English</th></>
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
