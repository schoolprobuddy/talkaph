import Link from "next/link";

const LESSONS = {
  basics: [
    { id: "tl-b1", title: "I. Greetings", icon: "👋", rows: [
      ["Kamusta ka?","Kamusta po kayo?","How are you?"],
      ["Magandang umaga","Magandang umaga po","Good morning"],
      ["Magandang tanghali","Magandang tanghali po","Good noon"],
      ["Magandang hapon","Magandang hapon po","Good afternoon"],
      ["Magandang gabi","Magandang gabi po","Good evening"],
      ["Salamat","Salamat po","Thank you"],
      ["Maraming salamat","Maraming salamat po","Thank you very much"],
      ["Walang anuman","Walang anuman po","You're welcome"],
      ["Paalam","Paalam po","Goodbye"],
      ["Oo","Opo","Yes"],
      ["Hindi","Hindi po","No"],
      ["Ingat ka","Ingat po kayo","Take care"],
      ["Maligayang kaarawan","Maligayang kaarawan po","Happy birthday"],
      ["Pasensya na","Pasensya na po","I am sorry"],
      ["Tuloy ka","Tuloy po kayo","Please come in"],
    ], hasFormal: true },
    { id: "tl-b2", title: "II. Numbers", icon: "🔢", rows: [
      ["Isa","One"],["Dalawa","Two"],["Tatlo","Three"],["Apat","Four"],["Lima","Five"],
      ["Anim","Six"],["Pito","Seven"],["Walo","Eight"],["Siyam","Nine"],["Sampu","Ten"],
    ], hasFormal: false },
    { id: "tl-b3", title: "III. Family Members", icon: "👨‍👩‍👧", rows: [
      ["Ama / Tatay","Father"],["Ina / Nanay","Mother"],["Kuya","Older brother"],
      ["Ate","Older sister"],["Kapatid","Sibling"],["Lolo","Grandfather"],
      ["Lola","Grandmother"],["Tito","Uncle"],["Tita","Aunt"],["Anak","Child"],["Pinsan","Cousin"],
    ], hasFormal: false },
    { id: "tl-b4", title: "IV. Colors", icon: "🎨", rows: [
      ["Pula","Red"],["Asul","Blue"],["Berde","Green"],["Dilaw","Yellow"],
      ["Puti","White"],["Itim","Black"],["Kahel","Orange"],["Lila","Purple"],
      ["Rosas","Pink"],["Kayumanggi","Brown"],
    ], hasFormal: false },
    { id: "tl-b5", title: "V. Days of the Week", icon: "📅", rows: [
      ["Lunes","Monday"],["Martes","Tuesday"],["Miyerkules","Wednesday"],
      ["Huwebes","Thursday"],["Biyernes","Friday"],["Sabado","Saturday"],["Linggo","Sunday"],
    ], hasFormal: false },
  ],
  vocabulary: [
    { id: "tl-v1", title: "I. Food & Drinks", icon: "🍚", rows: [
      ["Kanin","Cooked rice"],["Bigas","Uncooked rice"],["Tubig","Water"],
      ["Tinapay","Bread"],["Manok","Chicken"],["Baboy","Pork"],["Isda","Fish"],
      ["Itlog","Egg"],["Gulay","Vegetables"],["Prutas","Fruit"],["Gatas","Milk"],["Kape","Coffee"],
    ], hasFormal: false },
    { id: "tl-v2", title: "II. Body Parts", icon: "🧍", rows: [
      ["Ulo","Head"],["Mukha","Face"],["Mata","Eye"],["Ilong","Nose"],
      ["Bibig","Mouth"],["Tainga","Ear"],["Leeg","Neck"],["Kamay","Hand"],
      ["Braso","Arm"],["Tiyan","Stomach"],["Puso","Heart"],["Paa","Foot"],
    ], hasFormal: false },
    { id: "tl-v3", title: "III. Places", icon: "🏘️", rows: [
      ["Palengke","Market"],["Tindahan","Store"],["Ospital","Hospital"],
      ["Paaralan","School"],["Simbahan","Church"],["Bangko","Bank"],
      ["Parke","Park"],["Bahay","House"],["Kalsada","Street"],
    ], hasFormal: false },
    { id: "tl-v4", title: "IV. Weather", icon: "🌤️", rows: [
      ["Mainit","Hot"],["Malamig","Cold"],["Maulan","Rainy"],["Maaraw","Sunny"],
      ["Mahangin","Windy"],["Maulap","Cloudy"],["Bagyo","Typhoon"],
      ["Tag-araw","Dry season"],["Tag-ulan","Rainy season"],
    ], hasFormal: false },
  ],
  advanced: [
    { id: "tl-a1", title: "I. Introducing Yourself", icon: "💬", rows: [
      ["Ang pangalan ko ay ___","—","My name is ___"],
      ["Ako ay taga-[lugar]","Ako po ay taga-[lugar]","I am from [place]"],
      ["Masaya akong makilala ka","Masaya po akong makilala kayo","Nice to meet you"],
      ["Ano ang trabaho mo?","Ano po ang trabaho ninyo?","What is your work?"],
      ["Ilang taon ka na?","Ilang taon na po kayo?","How old are you?"],
    ], hasFormal: true },
    { id: "tl-a2", title: "II. Asking Directions", icon: "🗺️", rows: [
      ["Nasaan ang banyo?","Nasaan po ang banyo?","Where is the restroom?"],
      ["Paano pumunta sa ___?","Paano po pumunta sa ___?","How do I get to ___?"],
      ["Lumiko sa kaliwa","Lumiko po sa kaliwa","Turn left"],
      ["Lumiko sa kanan","Lumiko po sa kanan","Turn right"],
      ["Diretso lang","Diretso lang po","Go straight"],
      ["Malapit lang","Malapit lang po","It's just nearby"],
      ["Malayo ba?","Malayo po ba?","Is it far?"],
    ], hasFormal: true },
    { id: "tl-a3", title: "III. Everyday Expressions", icon: "🗣️", rows: [
      ["Sige","Sige po","Okay / Sure"],
      ["Ay nako!","—","Oh my! (surprise)"],
      ["Hindi ko alam","Hindi ko po alam","I don't know"],
      ["Sandali lang","Sandali lang po","Just a moment"],
      ["Gutom na ako","Gutom na po ako","I am already hungry"],
      ["Pagod na ako","Pagod na po ako","I am already tired"],
      ["Mahal kita","—","I love you"],
      ["Kumain ka na ba?","Kumain na po kayo?","Have you eaten?"],
    ], hasFormal: true },
  ],
};

const TABS = ["basics", "vocabulary", "advanced"];
const TAB_LABELS = { basics: "Basics", vocabulary: "Vocabulary", advanced: "Advanced" };

export default function TagalogPage() {
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
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🗺️</div>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: "900", marginBottom: "0.5rem" }}>Tagalog</h1>
        <p style={{ color: "#94a3b8", fontSize: "1rem" }}>Filipino · National language of the Philippines</p>
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
                        ? <><th style={th}>Informal</th><th style={th}>Formal (po)</th><th style={th}>English</th></>
                        : <><th style={th}>Tagalog</th><th style={th}>English</th></>
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
