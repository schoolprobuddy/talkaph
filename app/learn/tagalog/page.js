"use client";
import Link from "next/link";
import { useState } from "react";

const AUDIO = {
  "Kamusta ka?": "tl_001_kamusta_ka.mp3",
  "Kamusta po kayo?": "tl_002_kamusta_po_kayo.mp3",
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
  "Paalam po": "tl_017_paalam_po.mp3",
  "Oo": "tl_018_oo.mp3",
  "Opo": "tl_019_opo.mp3",
  "Hindi": "tl_020_hindi.mp3",
  "Hindi po": "tl_021_hindi_po.mp3",
  "Ingat ka": "tl_024_ingat_ka.mp3",
  "Ingat po kayo": "tl_025_ingat_po_kayo.mp3",
  "Maligayang kaarawan": "tl_028_maligayang_kaarawan.mp3",
  "Maligayang kaarawan po": "tl_029_maligayang_kaarawan_po.mp3",
  "Pasensya na": "tl_043_pasensya_na.mp3",
  "Pasensya na po": "tl_044_pasensya_na_po.mp3",
  "Tuloy ka": "tl_047_tuloy_ka.mp3",
  "Tuloy po kayo": "tl_048_tuloy_po_kayo.mp3",
  "Isa": "tl_062_isa.mp3",
  "Dalawa": "tl_063_dalawa.mp3",
  "Tatlo": "tl_064_tatlo.mp3",
  "Apat": "tl_065_apat.mp3",
  "Lima": "tl_066_lima.mp3",
  "Anim": "tl_067_anim.mp3",
  "Pito": "tl_068_pito.mp3",
  "Walo": "tl_069_walo.mp3",
  "Siyam": "tl_070_siyam.mp3",
  "Sampu": "tl_072_sampu.mp3",
  "Tatay": "tl_083_tatay.mp3",
  "Nanay": "tl_084_nanay.mp3",
  "Kuya": "tl_085_kuya.mp3",
  "Ate": "tl_086_ate.mp3",
  "Kapatid": "tl_087_kapatid.mp3",
  "Lolo": "tl_088_lolo.mp3",
  "Lola": "tl_089_lola.mp3",
  "Tito": "tl_090_tito.mp3",
  "Tita": "tl_091_tita.mp3",
  "Anak": "tl_092_anak.mp3",
  "Pinsan": "tl_093_pinsan.mp3",
  "Pula": "tl_094_pula.mp3",
  "Asul": "tl_095_asul.mp3",
  "Berde": "tl_096_berde.mp3",
  "Dilaw": "tl_097_dilaw.mp3",
  "Puti": "tl_098_puti.mp3",
  "Itim": "tl_099_itim.mp3",
  "Kahel": "tl_100_kahel.mp3",
  "Lila": "tl_101_lila.mp3",
  "Rosas": "tl_102_rosas.mp3",
  "Kayumanggi": "tl_103_kayumanggi.mp3",
  "Lunes": "tl_104_lunes.mp3",
  "Martes": "tl_105_martes.mp3",
  "Miyerkules": "tl_106_miyerkules.mp3",
  "Huwebes": "tl_107_huwebes.mp3",
  "Biyernes": "tl_108_biyernes.mp3",
  "Sabado": "tl_109_sabado.mp3",
  "Linggo": "tl_110_linggo.mp3",
  "Kanin": "tl_111_kanin.mp3",
  "Tubig": "tl_112_tubig.mp3",
  "Tinapay": "tl_113_tinapay.mp3",
  "Manok": "tl_114_manok.mp3",
  "Baboy": "tl_115_baboy.mp3",
  "Isda": "tl_116_isda.mp3",
  "Itlog": "tl_117_itlog.mp3",
  "Gulay": "tl_118_gulay.mp3",
  "Prutas": "tl_119_prutas.mp3",
  "Gatas": "tl_120_gatas.mp3",
  "Kape": "tl_121_kape.mp3",
  "Ulo": "tl_122_ulo.mp3",
  "Mukha": "tl_123_mukha.mp3",
  "Mata": "tl_124_mata.mp3",
  "Ilong": "tl_125_ilong.mp3",
  "Bibig": "tl_126_bibig.mp3",
  "Tainga": "tl_127_tainga.mp3",
  "Leeg": "tl_128_leeg.mp3",
  "Kamay": "tl_129_kamay.mp3",
  "Braso": "tl_130_braso.mp3",
  "Tiyan": "tl_131_tiyan.mp3",
  "Puso": "tl_132_puso.mp3",
  "Paa": "tl_133_paa.mp3",
  "Palengke": "tl_134_palengke.mp3",
  "Tindahan": "tl_135_tindahan.mp3",
  "Ospital": "tl_136_ospital.mp3",
  "Paaralan": "tl_137_paaralan.mp3",
  "Simbahan": "tl_138_simbahan.mp3",
  "Bangko": "tl_139_bangko.mp3",
  "Parke": "tl_140_parke.mp3",
  "Bahay": "tl_141_bahay.mp3",
  "Mainit": "fix_094_mainit.mp3",
  "Malamig": "fix_095_malamig.mp3",
  "Bagyo": "fix_096_bagyo.mp3",
  "Ang pangalan ko ay ___": "tl_001_kamusta_ka.mp3",
  "Nasaan ang banyo?": "fix_097_nasaan_ang_banyo.mp3",
  "Lumiko sa kaliwa": "fix_098_lumiko_sa_kaliwa.mp3",
  "Lumiko sa kanan": "fix_099_lumiko_sa_kanan.mp3",
  "Diretso lang": "fix_100_diretso_lang.mp3",
  "Sige": "fix_101_sige.mp3",
  "Hindi ko alam": "fix_102_hindi_ko_alam.mp3",
  "Sandali lang": "fix_103_sandali_lang.mp3",
  "Mahal kita": "fix_104_mahal_kita.mp3",
};

function playAudio(phrase) {
  const filename = AUDIO[phrase];
  if (!filename) return;
  const audio = new Audio(`/${filename}`);
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
      ["Lola","Grandmother"],["Tito","Uncle"],["Tita","Aunt"],["Anak","Child"],["Pinsan","Cousin"],
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
      ["Itlog","Egg"],["Gulay","Vegetables"],["Prutas","Fruit"],["Gatas","Milk"],["Kape","Coffee"],
    ]},
    { id: "tl-v2", title: "II. Body Parts", icon: "🧍", hasFormal: false, rows: [
      ["Ulo","Head"],["Mukha","Face"],["Mata","Eye"],["Ilong","Nose"],
      ["Bibig","Mouth"],["Tainga","Ear"],["Leeg","Neck"],["Kamay","Hand"],
      ["Braso","Arm"],["Tiyan","Stomach"],["Puso","Heart"],["Paa","Foot"],
    ]},
    { id: "tl-v3", title: "III. Places", icon: "🏘️", hasFormal: false, rows: [
      ["Palengke","Market"],["Tindahan","Store"],["Ospital","Hospital"],
      ["Paaralan","School"],["Simbahan","Church"],["Bangko","Bank"],
      ["Parke","Park"],["Bahay","House"],
    ]},
    { id: "tl-v4", title: "IV. Weather", icon: "🌤️", hasFormal: false, rows: [
      ["Mainit","Hot"],["Malamig","Cold"],["Bagyo","Typhoon"],
    ]},
  ],
  advanced: [
    { id: "tl-a1", title: "I. Introducing Yourself", icon: "💬", hasFormal: true, rows: [
      ["Ang pangalan ko ay ___","—","My name is ___"],
      ["Masaya akong makilala ka","Masaya po akong makilala kayo","Nice to meet you"],
    ]},
    { id: "tl-a2", title: "II. Asking Directions", icon: "🗺️", hasFormal: false, rows: [
      ["Nasaan ang banyo?","Where is the restroom?"],
      ["Lumiko sa kaliwa","Turn left"],
      ["Lumiko sa kanan","Turn right"],
      ["Diretso lang","Go straight"],
    ]},
    { id: "tl-a3", title: "III. Everyday Expressions", icon: "🗣️", hasFormal: false, rows: [
      ["Sige","Okay / Sure"],
      ["Hindi ko alam","I don't know"],
      ["Sandali lang","Just a moment"],
      ["Mahal kita","I love you"],
    ]},
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
                        ? <><th style={th}>Informal</th><th style={th}>Formal (po)</th><th style={th}>English</th><th style={th}></th></>
                        : <><th style={th}>Tagalog</th><th style={th}>English</th><th style={th}></th></>
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {lesson.rows.map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        {row.map((cell, j) => (
                          <td key={j} style={{ ...td, color: j === 0 ? "#e2e8f0" : j === 1 && lesson.hasFormal ? "#86efac" : "#94a3b8" }}>{cell}</td>
                        ))}
                        <td style={{ ...td, width: "48px" }}>
                          {AUDIO[row[0]] && (
                            <button onClick={() => playAudio(row[0])} style={{
                              background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)",
                              borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer",
                              color: "#fbbf24", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center"
                            }}>🔊</button>
                          )}
                        </td>
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
