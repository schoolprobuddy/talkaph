"use client";
import { useState } from "react";
import Link from "next/link";

const AUDIO = {
  "Kamusta ka?": "tl_001_kamusta_ka.mp3",
  "Kamusta po kayo?": "fix_001_kamusta_po_kayo.mp3",
  "Magandang umaga": "tl_004_magandang_umaga.mp3",
  "Magandang umaga po": "tl_005_magandang_umaga_po.mp3",
  "Magandang tanghali": "tl_006_magandang_tanghali.mp3",
  "Magandang tanghali po": "tl_007_magandang_tanghali_po.mp3",
  "Magandang hapon": "tl_008_magandang_hapon.mp3",
  "Magandang hapon po": "tl_009_magandang_hapon_po.mp3",
  "Magandang gabi": "tl_010_magandang_gabi.mp3",
  "Magandang gabi po": "tl_011_magandang_gabi_po.mp3",
  "Salamat": "tl_012_salamat.mp3",
  "Salamat po": "tl_013_salamat_po.mp3",
  "Maraming salamat": "tl_014_maraming_salamat.mp3",
  "Maraming salamat po": "tl_015_maraming_salamat_po.mp3",
  "Paalam": "tl_016_paalam.mp3",
  "Paalam po": "fix_002_paalam_po.mp3",
  "Oo": "tl_018_oo.mp3",
  "Opo": "fix_003_opo.mp3",
  "Hindi": "tl_020_hindi.mp3",
  "Hindi po": "tl_021_hindi_po.mp3",
  "Ingat ka": "fix_060_ingat_ka.mp3",
  "Ingat po kayo": "tl_025_ingat_po_kayo.mp3",
  "Maligayang kaarawan": "tl_028_maligayang_kaarawan.mp3",
  "Maligayang kaarawan po": "tl_029_maligayang_kaarawan_po.mp3",
  "Pasensya na": "tl_043_pasensya_na.mp3",
  "Pasensya na po": "tl_044_pasensya_na_po.mp3",
  "Tuloy ka": "tl_047_tuloy_ka.mp3",
  "Tuloy po kayo": "tl_048_tuloy_po_kayo.mp3",
  "Isa": "fix_007_isa.mp3",
  "Dalawa": "fix_008_dalawa.mp3",
  "Tatlo": "fix_009_tatlo.mp3",
  "Apat": "fix_010_apat.mp3",
  "Lima": "fix_011_lima.mp3",
  "Anim": "fix_012_anim.mp3",
  "Pito": "fix_013_pito.mp3",
  "Walo": "fix_014_walo.mp3",
  "Siyam": "fix_015_siyam.mp3",
  "Sampu": "fix_016_sampu.mp3",
  "Ama / Tatay": "fix_017_ama_tatay.mp3",
  "Ina / Nanay": "fix_018_ina_nanay.mp3",
  "Kuya": "fix_019_kuya.mp3",
  "Ate": "fix_020_ate.mp3",
  "Kapatid": "new_tl_fam_kapatid.mp3",
  "Lolo": "new_tl_fam_lolo.mp3",
  "Lola": "new_tl_fam_lola.mp3",
  "Tito": "fix_021_tito.mp3",
  "Tita": "fix_022_tita.mp3",
  "Anak": "new_tl_fam_anak.mp3",
  "Apo": "fix_023_apo.mp3",
  "Pinsan": "fix_024_pinsan.mp3",
  "Pula": "fix_025_pula.mp3",
  "Asul": "fix_026_asul.mp3",
  "Berde": "fix_027_berde.mp3",
  "Dilaw": "new_tl_color_dilaw.mp3",
  "Puti": "new_tl_color_puti.mp3",
  "Itim": "new_tl_color_itim.mp3",
  "Kahel": "new_tl_color_kahel.mp3",
  "Lila": "fix_028_lila.mp3",
  "Rosas": "new_tl_color_rosas.mp3",
  "Kayumanggi": "new_tl_color_kayumanggi.mp3",
  "Lunes": "new_tl_day_lunes.mp3",
  "Martes": "new_tl_day_martes.mp3",
  "Miyerkules": "new_tl_day_miyerkules.mp3",
  "Huwebes": "new_tl_day_huwebes.mp3",
  "Biyernes": "new_tl_day_biyernes.mp3",
  "Sabado": "new_tl_day_sabado.mp3",
  "Linggo": "new_tl_day_linggo.mp3",
  "Kanin": "new_tl_food_001_kanin.mp3",
  "Tubig": "new_tl_food_002_tubig.mp3",
  "Tinapay": "new_tl_food_003_tinapay.mp3",
  "Manok": "fix_074_manok.mp3",
  "Baboy": "fix_075_baboy.mp3",
  "Isda": "new_tl_food_004_isda.mp3",
  "Itlog": "new_tl_food_005_itlog.mp3",
  "Gulay": "new_tl_food_006_gulay.mp3",
  "Prutas": "new_tl_food_007_prutas.mp3",
  "Gatas": "new_tl_food_008_gatas.mp3",
  "Kape": "new_tl_food_009_kape.mp3",
  "Ulo": "fix_029_ulo.mp3",
  "Mukha": "new_tl_body_001_mukha.mp3",
  "Mata": "new_tl_body_002_mata.mp3",
  "Ilong": "fix_030_ilong.mp3",
  "Bibig": "new_tl_body_003_bibig.mp3",
  "Tainga": "fix_031_tainga.mp3",
  "Leeg": "fix_033_leeg.mp3",
  "Kamay": "new_tl_body_004_kamay.mp3",
  "Braso": "new_tl_body_005_braso.mp3",
  "Tiyan": "fix_036_tiyan.mp3",
  "Puso": "fix_037_puso.mp3",
  "Paa": "new_tl_body_006_paa.mp3",
  "Palengke": "new_tl_place_001_palengke.mp3",
  "Tindahan": "fix_038_tindahan.mp3",
  "Ospital": "fix_039_ospital.mp3",
  "Paaralan": "new_tl_place_002_paaralan.mp3",
  "Simbahan": "fix_040_simbahan.mp3",
  "Bangko": "fix_041_bangko.mp3",
  "Parke": "new_tl_place_003_parke.mp3",
  "Bahay": "new_tl_place_004_bahay.mp3",
  "Kalsada": "fix_042_kalsada.mp3",
  "Mainit": "fix_043_mainit.mp3",
  "Malamig": "fix_044_malamig.mp3",
  "Maulan": "fix_045_maulan.mp3",
  "Maaraw": "new_tl_weather_001_maaraw.mp3",
  "Mahangin": "fix_046_mahangin.mp3",
  "Maulap": "new_tl_weather_002_maulap.mp3",
  "Ulan": "fix_047_ulan.mp3",
  "Araw": "fix_048_araw.mp3",
  "Hangin": "fix_049_hangin.mp3",
  "Bagyo": "fix_050_bagyo.mp3",
  "Tag-araw": "new_tl_weather_003_tagaraw.mp3",
  "Tag-ulan": "new_tl_weather_004_tagulan.mp3",
  "Masaya akong makilala ka": "tl_039_masaya_akong_makilala_ka.mp3",
  "Masaya po akong makilala kayo": "tl_040_masaya_po_akong_makilala_kayo.mp3",
  "Lumiko sa kaliwa": "new_tl_dir_kaliwa.mp3",
  "Lumiko sa kanan": "new_tl_dir_kanan.mp3",
  "Diretso lang": "new_tl_dir_diretso.mp3",
  "Malayo ba?": "tl_133_malayo_ba.mp3",
  "Sige": "fix_055_sige.mp3",
  "Ay nako!": "fix_056_ay_nako.mp3",
  "Sandali lang": "tl_138_sandali_lang.mp3",
  "Gutom na ako": "tl_139_gutom_na_ako.mp3",
  "Pagod na ako": "tl_140_pagod_na_ako.mp3",
  "Mahal kita": "tl_141_mahal_kita.mp3",
  "Hindi ko alam": "tl_020_hindi.mp3",
};

function playAudio(phrase) {
  const filename = AUDIO[phrase];
  if (!filename) return;
  const audio = new Audio("/" + filename);
  audio.play();
}

const LESSONS = {
  basics: [
    { id: "tl-b1", title: "I. Greetings", icon: "👋", hasFormal: true, rows: [
      ["Kamusta ka?","Kamusta po kayo?","How are you?"],
      ["Magandang umaga","Magandang umaga po","Good morning"],
      ["Magandang tanghali","Magandang tanghali po","Good noon"],
      ["Magandang hapon","Magandang hapon po","Good afternoon"],
      ["Magandang gabi","Magandang gabi po","Good evening"],
      ["Salamat","Salamat po","Thank you"],
      ["Maraming salamat","Maraming salamat po","Thank you very much"],
      ["Paalam","Paalam po","Goodbye"],
      ["Oo","Opo","Yes"],
      ["Hindi","Hindi po","No"],
      ["Ingat ka","Ingat po kayo","Take care"],
      ["Maligayang kaarawan","Maligayang kaarawan po","Happy birthday"],
      ["Pasensya na","Pasensya na po","I am sorry"],
      ["Tuloy ka","Tuloy po kayo","Please come in"],
    ]},
    { id: "tl-b2", title: "II. Numbers", icon: "🔢", hasFormal: false, rows: [
      ["Isa","One"],["Dalawa","Two"],["Tatlo","Three"],["Apat","Four"],["Lima","Five"],
      ["Anim","Six"],["Pito","Seven"],["Walo","Eight"],["Siyam","Nine"],["Sampu","Ten"],
    ]},
    { id: "tl-b3", title: "III. Family Members", icon: "👨‍👩‍👧", hasFormal: false, rows: [
      ["Ama / Tatay","Father"],["Ina / Nanay","Mother"],["Kuya","Older brother"],
      ["Ate","Older sister"],["Kapatid","Sibling"],["Lolo","Grandfather"],
      ["Lola","Grandmother"],["Tito","Uncle"],["Tita","Aunt"],
      ["Anak","Child"],["Apo","Grandchild"],["Pinsan","Cousin"],
    ]},
    { id: "tl-b4", title: "IV. Colors", icon: "🎨", hasFormal: false, rows: [
      ["Pula","Red"],["Asul","Blue"],["Berde","Green"],["Dilaw","Yellow"],
      ["Puti","White"],["Itim","Black"],["Kahel","Orange"],["Lila","Purple"],
      ["Rosas","Pink"],["Kayumanggi","Brown"],
    ]},
    { id: "tl-b5", title: "V. Days of the Week", icon: "📅", hasFormal: false, rows: [
      ["Lunes","Monday"],["Martes","Tuesday"],["Miyerkules","Wednesday"],
      ["Huwebes","Thursday"],["Biyernes","Friday"],["Sabado","Saturday"],["Linggo","Sunday"],
    ]},
  ],
  vocabulary: [
    { id: "tl-v1", title: "I. Food & Drinks", icon: "🍚", hasFormal: false, rows: [
      ["Kanin","Cooked rice"],["Tubig","Water"],["Tinapay","Bread"],
      ["Manok","Chicken"],["Baboy","Pork"],["Isda","Fish"],
      ["Itlog","Egg"],["Gulay","Vegetables"],["Prutas","Fruit"],
      ["Gatas","Milk"],["Kape","Coffee"],
    ]},
    { id: "tl-v2", title: "II. Body Parts", icon: "🧍", hasFormal: false, rows: [
      ["Ulo","Head"],["Mukha","Face"],["Mata","Eye"],["Ilong","Nose"],
      ["Bibig","Mouth"],["Tainga","Ear"],["Leeg","Neck"],["Kamay","Hand"],
      ["Braso","Arm"],["Tiyan","Stomach"],["Puso","Heart"],["Paa","Foot"],
    ]},
    { id: "tl-v3", title: "III. Places", icon: "🏘️", hasFormal: false, rows: [
      ["Palengke","Market"],["Tindahan","Store"],["Ospital","Hospital"],
      ["Paaralan","School"],["Simbahan","Church"],["Bangko","Bank"],
      ["Parke","Park"],["Bahay","House"],["Kalsada","Street"],
    ]},
    { id: "tl-v4", title: "IV. Weather", icon: "🌤️", hasFormal: false, rows: [
      ["Mainit","Hot"],["Malamig","Cold"],["Maulan","Rainy"],["Maaraw","Sunny"],
      ["Mahangin","Windy"],["Maulap","Cloudy"],["Ulan","Rain"],
      ["Araw","Sun / Day"],["Hangin","Wind"],["Bagyo","Typhoon"],
      ["Tag-araw","Dry season"],["Tag-ulan","Rainy season"],
    ]},
  ],
  advanced: [
    { id: "tl-a1", title: "I. Introducing Yourself", icon: "💬", hasFormal: true, rows: [
      ["Masaya akong makilala ka","Masaya po akong makilala kayo","Nice to meet you"],
    ]},
    { id: "tl-a2", title: "II. Asking Directions", icon: "🗺️", hasFormal: false, rows: [
      ["Lumiko sa kaliwa","Turn left"],
      ["Lumiko sa kanan","Turn right"],
      ["Diretso lang","Go straight"],
      ["Malayo ba?","Is it far?"],
    ]},
    { id: "tl-a3", title: "III. Everyday Expressions", icon: "🗣️", hasFormal: false, rows: [
      ["Sige","Okay / Sure"],
      ["Ay nako!","Oh my! (surprise)"],
      ["Sandali lang","Just a moment"],
      ["Gutom na ako","I am already hungry"],
      ["Pagod na ako","I am already tired"],
      ["Mahal kita","I love you"],
    ]},
  ],
};

const TABS = ["basics", "vocabulary", "advanced"];
const TAB_LABELS = { basics: "Basics", vocabulary: "Vocabulary", advanced: "Advanced" };

function FormalTable({ lesson }) {
  const [expandedRows, setExpandedRows] = useState({});
  const toggleRow = (i) => setExpandedRows(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <>
      <style>{`
        .formal-col { display: table-cell; }
        .po-toggle-col { display: none; }
        @media (max-width: 600px) {
          .formal-col { display: none; }
          .po-toggle-col { display: table-cell; }
        }
      `}</style>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.05)" }}>
            <th style={th}>Informal</th>
            <th className="formal-col" style={th}>Formal (po)</th>
            <th className="po-toggle-col" style={{ ...th, textAlign: "center" }}>Po</th>
            <th style={th}>English</th>
          </tr>
        </thead>
        <tbody>
          {lesson.rows.map((row, i) => (
            <>
              <tr key={i} style={{ borderBottom: expandedRows[i] ? "none" : "1px solid rgba(255,255,255,0.05)" }}>
                {/* Informal */}
                <td style={{ ...td, color: "#e2e8f0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {row[0]}
                    {AUDIO[row[0]] && (
                      <button onClick={() => playAudio(row[0])} style={speakBtn}>🔊</button>
                    )}
                  </div>
                </td>
                {/* Formal — desktop only */}
                <td className="formal-col" style={{ ...td, color: "#86efac" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {row[1]}
                    {AUDIO[row[1]] && (
                      <button onClick={() => playAudio(row[1])} style={speakBtn}>🔊</button>
                    )}
                  </div>
                </td>
                {/* Po toggle — mobile only */}
                <td className="po-toggle-col" style={{ ...td, textAlign: "center", verticalAlign: "middle" }}>
                  <button
                    onClick={() => toggleRow(i)}
                    style={{
                      background: expandedRows[i] ? "rgba(134,239,172,0.25)" : "rgba(134,239,172,0.12)",
                      border: "1px solid rgba(134,239,172,0.4)",
                      borderRadius: "20px",
                      padding: "4px 10px",
                      cursor: "pointer",
                      color: "#86efac",
                      fontSize: "11px",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {expandedRows[i] ? "po ▲" : "po ▼"}
                  </button>
                </td>
                {/* English */}
                <td style={{ ...td, color: "#94a3b8" }}>{row[2]}</td>
              </tr>
              {/* Expanded formal row — mobile only */}
              {expandedRows[i] && (
                <tr key={`${i}-formal`} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td colSpan={3} style={{ ...td, paddingTop: "0.25rem", paddingBottom: "0.6rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#86efac" }}>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Formal:</span>
                      {row[1]}
                      {AUDIO[row[1]] && (
                        <button onClick={() => playAudio(row[1])} style={speakBtn}>🔊</button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

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
                {lesson.hasFormal ? (
                  <FormalTable lesson={lesson} />
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                    <thead>
                      <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                        <th style={th}>Tagalog</th>
                        <th style={th}>English</th>
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
                          <td style={{ ...td, color: "#94a3b8" }}>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ))}
        </section>
      ))}
      <footer style={{ textAlign: "center", padding: "2rem 1rem", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "1rem" }}>
        <nav style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1rem" }}>
          <a href="/" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>🏠 Home</a>
          <a href="/learn" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>🌐 All Languages</a>
          <a href="/about" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>About</a>
          <a href="/privacy" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Privacy Policy</a>
        </nav>
        <p style={{ color: "#475569", fontSize: "0.8rem", margin: 0 }}>© 2026 talkaPH - Learn Filipino languages</p>
      </footer>
    </main>
  );
}

const speakBtn = { background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", color: "#fbbf24", fontSize: "12px", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
const th = { padding: "0.75rem 1rem", textAlign: "left", color: "#94a3b8", fontWeight: "600", fontSize: "0.8rem", textTransform: "uppercase" };
const td = { padding: "0.65rem 1rem" };
