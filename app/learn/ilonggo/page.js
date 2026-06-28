"use client";
import Link from "next/link";

const AUDIO = {
  "Kamusta ka?": "fix_076_kamusta_ka.mp3",
  "Kamusta kamo?": "fix_077_kamusta_kamo.mp3",
  "Maayong aga": "fix_078_maayong_aga.mp3",
  "Maayong aga sa inyo": "new_il_gr_maayong_aga_inyo.mp3",
  "Maayong hapon": "new_il_gr_maayong_hapon.mp3",
  "Maayong hapon sa inyo": "new_il_gr_maayong_hapon_inyo2.mp3",
  "Maayong gab-i": "new_il_gr_maayong_gabi.mp3",
  "Maayong gab-i sa inyo": "new_il_gr_maayong_gabi_inyo2.mp3",
  "Salamat": "new_il_gr_salamat.mp3",
  "Salamat gid": "new_il_gr_salamat_gid.mp3",
  "Oo": "fix_064_oo.mp3",
  "Indi": "new_il_indi.mp3",
  "Palangga ko ikaw": "new_il_expr_006_palangga_ko_ikaw.mp3",
  "Isa": "new_il_num_001_isa.mp3",
  "Duha": "new_il_num_002_duha.mp3",
  "Tatlo": "new_il_num_003_tatlo.mp3",
  "Apat": "new_il_num_004_apat.mp3",
  "Lima": "new_il_num_005_lima.mp3",
  "Anom": "new_il_num_006_anom.mp3",
  "Pito": "new_il_num_007_pito.mp3",
  "Walo": "new_il_num_008_walo.mp3",
  "Siyam": "new_il_num_009_siyam.mp3",
  "Pulo": "new_il_num_010_pulo.mp3",
  "Amay": "new_il_fam_001_amay.mp3",
  "Nanay": "new_il_fam_002_nanay.mp3",
  "Kuya / Toto": "new_il_toto.mp3",
  "Ate / Inday": "new_il_inday.mp3",
  "Utod": "new_il_fam_005_utod.mp3",
  "Manghod": "new_il_manghod.mp3",
  "Lolo": "new_il_fam_006_lolo.mp3",
  "Lola": "new_il_fam_007_lola.mp3",
  "Tito": "new_il_fam_008_tito.mp3",
  "Tita": "new_il_fam_009_tita.mp3",
  "Bata": "new_il_bata.mp3",
  "Kan-on": "new_il_food_001_kanon.mp3",
  "Bugas": "new_il_food_002_bugas.mp3",
  "Tubig": "new_il_food_003_tubig.mp3",
  "Tinapay": "new_il_food_004_tinapay.mp3",
  "Manok": "new_il_food_005_manok.mp3",
  "Baboy": "new_il_food_006_baboy.mp3",
  "Isda": "new_il_food_007_isda.mp3",
  "Itlog": "new_il_food_008_itlog.mp3",
  "Utan": "new_il_food_009_utan.mp3",
  "Gatas": "new_il_food_010_gatas.mp3",
  "Pula": "new_il_color_001_pula.mp3",
  "Asul": "new_il_color_002_asul.mp3",
  "Berde": "new_il_color_003_berde.mp3",
  "Dilaw": "new_il_color_004_dilaw.mp3",
  "Puti": "new_il_color_005_puti.mp3",
  "Itom": "new_il_color_006_itom.mp3",
  "Kahel": "new_il_color_007_kahel.mp3",
  "Lila": "new_il_color_008_lila.mp3",
  "Rosas": "new_il_color_009_rosas.mp3",
  "Kayumanggi": "new_il_color_010_kayumanggi.mp3",
  "Merkado": "new_il_place_001_merkado.mp3",
  "Tindahan": "new_il_place_002_tindahan.mp3",
  "Ospital": "new_il_place_003_ospital.mp3",
  "Eskwelahan": "new_il_place_004_eskwelahan.mp3",
  "Simbahan": "new_il_place_005_simbahan.mp3",
  "Banko": "new_il_place_006_banko.mp3",
  "Parke": "new_il_place_007_parke.mp3",
  "Balay": "new_il_place_008_balay.mp3",
  "Dalan": "new_il_place_009_dalan.mp3",
  "Sige": "new_il_expr_001_sige.mp3",
  "Wala ako kahibalo": "new_il_expr_002_wala_ako_kahibalo.mp3",
  "Hulat lang": "new_il_expr_003_hulat_lang.mp3",
  "Ginagutom na ako": "new_il_expr_004_ginagutom_na_ako.mp3",
  "Ginakapoy na ako": "new_il_expr_005_ginakapoy_na_ako.mp3",
  "Kamusta na?": "new_il_expr_007_kamusta_na.mp3",
  "Diin ang CR?": "new_il_dir_001_diin_ang_cr.mp3",
  "Diin nayon?": "new_il_dir_diin_nayon.mp3",
  "Paano makakadto sa?": "new_il_dir_makakadto.mp3",
  "Liko sa wala": "new_il_dir_003_liko_sa_wala.mp3",
  "Liko sa tuo": "new_il_dir_004_liko_sa_tuo.mp3",
  "Diretso lang": "new_il_dir_005_diretso_lang.mp3",
  "Malapit lang": "new_il_dir_006_malapit_lang.mp3",
  "Ano ka layo?": "new_il_dir_ano_ka_layo.mp3",
  "Ang akon ngalan ay si Ana": "new_il_adv_001_ang_akon_ngalan.mp3",
  "Taga-Iloilo ako": "new_il_adv_002_taga_iloilo_ako.mp3",
  "Nalipay ako nga nakilala ta ka": "new_il_adv_003_nalipay_ako.mp3",
  "Kabalo ko maghambal Ilonggo": "new_il_adv_004_kabalo_ko.mp3",
  "Ano ang imo ngalan?": "new_il_adv_005_ano_ang_imo_ngalan.mp3",
};

function playAudio(phrase) {
  const filename = AUDIO[phrase];
  if (!filename) return;
  const audio = new Audio("/" + filename);
  audio.play();
}

const LESSONS = {
  basics: [
    { id: "il-b1", title: "I. Greetings", icon: "👋", hasFormal: true, rows: [
      ["Kamusta ka?","Kamusta kamo?","How are you?"],
      ["Maayong aga","Maayong aga sa inyo","Good morning"],
      ["Maayong hapon","Maayong hapon sa inyo","Good afternoon"],
      ["Maayong gab-i","Maayong gab-i sa inyo","Good evening"],
      ["Salamat","Salamat gid","Thank you / Thank you very much"],
      ["Oo","—","Yes"],
      ["Indi","—","No"],
      ["Palangga ko ikaw","—","I love you"],
    ]},
    { id: "il-b2", title: "II. Numbers", icon: "🔢", hasFormal: false, rows: [
      ["Isa","One"],["Duha","Two"],["Tatlo","Three"],["Apat","Four"],["Lima","Five"],
      ["Anom","Six"],["Pito","Seven"],["Walo","Eight"],["Siyam","Nine"],["Pulo","Ten"],
    ]},
    { id: "il-b3", title: "III. Family Members", icon: "👨‍👩‍👧", hasFormal: false, rows: [
      ["Amay","Father"],["Nanay","Mother"],["Kuya / Toto","Older brother"],
      ["Ate / Inday","Older sister"],["Utod","Sibling"],["Manghod","Youngest sibling"],
      ["Lolo","Grandfather"],["Lola","Grandmother"],
      ["Tito","Uncle"],["Tita","Aunt"],["Bata","Child"],
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
      ["Ang akon ngalan ay si Ana","My name is ___"],
      ["Taga-Iloilo ako","I am from Iloilo"],
      ["Nalipay ako nga nakilala ta ka","Nice to meet you"],
      ["Kabalo ko maghambal Ilonggo","I speak Ilonggo"],
      ["Ano ang imo ngalan?","What is your name?"],
    ]},
    { id: "il-a2", title: "II. Everyday Expressions", icon: "🗣️", hasFormal: false, rows: [
      ["Sige","Okay / Sure"],
      ["Wala ako kahibalo","I don't know"],
      ["Hulat lang","Just a moment"],
      ["Ginagutom na ako","I am already hungry"],
      ["Ginakapoy na ako","I am already tired"],
      ["Palangga ko ikaw","I love you"],
      ["Kamusta na?","How are things?"],
    ]},
    { id: "il-a3", title: "III. Asking Directions", icon: "🗺️", hasFormal: false, rows: [
      ["Diin ang CR?","Where is the restroom?"],
      ["Diin nayon?","Where is it?"],
      ["Paano makakadto sa?","How do I get to ___?"],
      ["Liko sa wala","Turn left"],
      ["Liko sa tuo","Turn right"],
      ["Diretso lang","Go straight"],
      ["Malapit lang","It's just nearby"],
      ["Ano ka layo?","How far is it?"],
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
          <h2 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f59e0b", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1rem" }}>
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
                        ? <><th style={th}>Singular (ka)</th><th style={th}>Plural (kamo)</th><th style={th}>English</th></>
                        : <><th style={th}>Ilonggo</th><th style={th}>English</th></>
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {lesson.rows.map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ ...td, color: "#e2e8f0" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {row[0]}
                            {AUDIO[row[0]] && (
                              <button onClick={() => playAudio(row[0])} style={speakBtn}>🔊</button>
                            )}
                          </div>
                        </td>
                        {lesson.hasFormal ? (
                          <>
                            <td style={{ ...td, color: "#86efac" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                {row[1]}
                                {row[1] !== "—" && AUDIO[row[1]] && (
                                  <button onClick={() => playAudio(row[1])} style={speakBtn}>🔊</button>
                                )}
                              </div>
                            </td>
                            <td style={{ ...td, color: "#94a3b8" }}>{row[2]}</td>
                          </>
                        ) : (
                          <td style={{ ...td, color: "#94a3b8" }}>{row[1]}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>
      ))}

      {/* Travel Section */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "1rem 2rem 3rem" }}>
        <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "1.25rem", padding: "2rem" }}>
          <h2 style={{ color: "#f59e0b", fontWeight: "800", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            🌴 Planning a trip to the Philippines?
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Now that you know some Ilonggo, put it to use! Book tours, activities and experiences across the Philippines.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="https://affiliate.klook.com/redirect?aid=125678&aff_adid=1319478&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Flist%2Fphilippines%2F"
              target="_blank" rel="noopener noreferrer"
              style={{ background: "#ff5722", color: "#fff", padding: "0.7rem 1.5rem", borderRadius: "999px", fontWeight: "700", textDecoration: "none", fontSize: "0.9rem" }}>
              🎯 Find Activities on Klook
            </a>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "2rem 2rem 3rem", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <Link href="/" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.9rem" }}>🏠 Home</Link>
          <Link href="/learn" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.9rem" }}>🌐 All Languages</Link>
          <Link href="/about" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.9rem" }}>About</Link>
          <Link href="/privacy" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.9rem" }}>Privacy Policy</Link>
        </div>
        <div style={{ color: "#334155", fontSize: "0.8rem" }}>2026 talkaPH - Learn Filipino languages</div>
      </footer>
    </main>
  );
}

const speakBtn = { background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", color: "#f59e0b", fontSize: "12px", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
const th = { padding: "0.75rem 1rem", textAlign: "left", color: "#94a3b8", fontWeight: "600", fontSize: "0.8rem", textTransform: "uppercase" };
const td = { padding: "0.65rem 1rem" };
