"use client";
import { useState } from "react";
import Link from "next/link";

const AUDIO = {
  "Kumusta ka?": "cb_142_kumusta_ka.mp3",
  "Kumusta man mo?": "cb_m032_kumusta_man_mo.mp3",
  "Maayong buntag": "fix_061_maayong_buntag.mp3",
  "Maayong hapon": "fix_062_maayong_hapon.mp3",
  "Maayong gabii": "fix_063_maayong_gabii.mp3",
  "Salamat": "cb_146_salamat.mp3",
  "Salamat kaayo": "cb_m036_salamat_kaayo.mp3",
  "Walay sapayan": "new_cb_expr_008_walay_sapayan.mp3",
  "Paalam": "cb_147_paalam.mp3",
  "Paalam na": "cb_m037_paalam_na.mp3",
  "Oo": "fix_064_oo.mp3",
  "Dili": "fix_065_dili.mp3",
  "Usa": "new_cb_num_001_usa.mp3",
  "Duha": "new_cb_num_002_duha.mp3",
  "Tulo": "new_cb_num_003_tulo.mp3",
  "Upat": "new_cb_num_004_upat.mp3",
  "Lima": "new_cb_num_005_lima.mp3",
  "Unom": "new_cb_num_006_unom.mp3",
  "Pito": "new_cb_num_007_pito.mp3",
  "Walo": "new_cb_num_008_walo.mp3",
  "Siyam": "new_cb_num_009_siyam.mp3",
  "Napulo": "new_cb_num_010_napulo.mp3",
  "Amahan": "new_cb_fam_001_amahan.mp3",
  "Inahan": "new_cb_fam_002_inahan.mp3",
  "Kuya": "fix_019_kuya.mp3",
  "Ate": "fix_020_ate.mp3",
  "Igsuon": "new_cb_fam_003_igsuon.mp3",
  "Lolo": "new_cb_fam_004_lolo.mp3",
  "Lola": "new_cb_fam_005_lola.mp3",
  "Tito": "fix_021_tito.mp3",
  "Tita": "fix_022_tita.mp3",
  "Anak": "new_cb_fam_006_anak.mp3",
  "Kan-on": "new_cb_food_001_kanon.mp3",
  "Bugas": "new_cb_food_002_bugas.mp3",
  "Tubig": "new_cb_food_003_tubig.mp3",
  "Tinapay": "new_cb_food_004_tinapay.mp3",
  "Manok": "fix_074_manok.mp3",
  "Baboy": "fix_075_baboy.mp3",
  "Isda": "new_cb_food_005_isda.mp3",
  "Itlog": "new_cb_food_006_itlog.mp3",
  "Utanon": "new_cb_food_007_utanon.mp3",
  "Gatas": "new_cb_food_008_gatas.mp3",
  "Pula": "new_cb_color_001_pula.mp3",
  "Asul": "new_cb_color_002_asul.mp3",
  "Berde": "new_cb_color_003_berde.mp3",
  "Dalag": "new_cb_color_004_dalag.mp3",
  "Puti": "new_cb_color_005_puti.mp3",
  "Itom": "new_cb_color_006_itom.mp3",
  "Kahel": "new_cb_color_007_kahel.mp3",
  "Lila": "new_cb_color_008_lila.mp3",
  "Rosas": "new_cb_color_009_rosas.mp3",
  "Kayumanggi": "new_cb_color_010_kayumanggi.mp3",
  "Merkado": "new_cb_place_001_merkado.mp3",
  "Tindahan": "new_cb_place_002_tindahan.mp3",
  "Ospital": "new_cb_place_003_ospital.mp3",
  "Eskwelahan": "new_cb_place_004_eskwelahan.mp3",
  "Simbahan": "new_cb_place_005_simbahan.mp3",
  "Banko": "new_cb_place_006_banko.mp3",
  "Parke": "new_cb_place_007_parke.mp3",
  "Balay": "new_cb_place_008_balay.mp3",
  "Karsada": "new_cb_place_009_karsada.mp3",
  "Sige": "new_cb_expr_001_sige.mp3",
  "Ayaw problema": "new_cb_expr_002_ayaw_problema.mp3",
  "Wala ko kahibalo": "new_cb_expr_003_wala_ko_kahibalo.mp3",
  "Hulat lang": "new_cb_expr_004_hulat_lang.mp3",
  "Gigutom na ko": "new_cb_expr_005_gigutom_na_ko.mp3",
  "Gikapoy na ko": "new_cb_expr_006_gikapoy_na_ko.mp3",
  "Palangga ko ikaw": "new_cb_expr_007_palangga_ko_ikaw.mp3",
  "Asa ang CR?": "new_cb_dir_001_asa_ang_cr.mp3",
  "Unsaon pagadto sa?": "new_cb_dir_002_unsaon_pagadto_sa.mp3",
  "Liko sa wala": "new_cb_dir_003_liko_sa_wala.mp3",
  "Liko sa tuo": "new_cb_dir_004_liko_sa_tuo.mp3",
  "Diretso lang": "new_cb_dir_005_diretso_lang.mp3",
  "Duol lang": "new_cb_dir_006_duol_lang.mp3",
  "Layo ba?": "new_cb_dir_007_layo_ba.mp3",
  "Ang akong ngalan mao si Maria": "new_cb_adv_001_ang_akong_ngalan.mp3",
  "Gikan ako sa Cebu": "new_cb_adv_002_gikan_ako_sa_cebu.mp3",
  "Nagsabot ko og Cebuano": "new_cb_adv_003_nagsabot_ko_og_cebuano.mp3",
  "Unsa imong ngalan?": "new_cb_adv_004_unsa_imong_ngalan.mp3",
  "Nalipay ko nga nakaila nimo": "new_cb_adv_005_nalipay_ko.mp3",
  "Palihug tabangi ko": "new_cb_custom_palihug_tabangi_ko.mp3",
  "Hulat una": "new_cb_custom_hulat_una.mp3",
  "Lakaw ta": "new_cb_custom_lakaw_ta.mp3",
  "Ania ko": "new_cb_custom_ania_ko.mp3",
  "Kadiyot lang": "new_cb_custom_kadiyot_lang.mp3",
  "Tua siya": "new_cb_custom_tua_siya.mp3",
  "Unsa nang orasa?": "new_cb_custom_unsa_nang_orasa.mp3",
  "Lisod ni": "new_cb_custom_lisod_ni.mp3",
  "Balik ra": "new_cb_custom_balik_ra.mp3",
  "Magkita ta pag-usab": "new_cb_custom_magkita_ta_pag_usab.mp3",
  "Molakaw na ko": "new_cb_custom_molakaw_na_ko.mp3",
  "Pag-amping": "new_cb_custom_pag_amping.mp3",
  "Taga asa ka?": "new_cb_custom_taga_asa_ka.mp3",
  "Saba": "new_cb_custom_saba.mp3",
  "Asa ka paingon?": "new_cb_custom_asa_ka_paingon.mp3",
  "Akoa": "new_cb_custom_akoa.mp3",
  "Atoa": "new_cb_custom_atoa.mp3",
  "Pwede ko manghulam?": "new_cb_custom_pwede_ko_manghulam.mp3",
  "Init karon": "new_cb_custom_init_karon.mp3",
  "Bugnaw karon": "new_cb_custom_bugnaw_karon.mp3",
  "Tam-is ni": "new_cb_custom_tam_is_ni.mp3",
  "Sakit akong ulo": "new_cb_custom_sakit_akong_ulo.mp3",
  "Parat ni": "new_cb_custom_parat_ni.mp3",
  "Pait ni": "new_cb_custom_pait_ni.mp3",
  "Aslom ni": "new_cb_custom_aslom_ni.mp3",
  "Halang ni": "new_cb_custom_halang_ni.mp3",
  "Lami ni": "new_cb_custom_lami_ni.mp3",
  "Walay lami ni": "new_cb_custom_walay_lami_ni.mp3",
  "Ayaw ug hilak": "new_cb_custom_ayaw_ug_hilak.mp3",
  "Nasakitan ko": "new_cb_custom_nasakitan_ko.mp3",
  "Ayaw ug dagan": "new_cb_custom_ayaw_ug_dagan.mp3",
  "Palihug Limpyo sa lamesa": "new_cb_custom_palihog_ug_limpyo_sa_lamesa.mp3",
  "Ablihi ang pultahan": "new_cb_custom_ablihi_ang_pultahan.mp3",
  "Ablihi ang bintana": "new_cb_custom_ablihi_ang_bintana.mp3",
  "Pagsul-ob ug sinelas": "new_cb_custom_pagsul_ob_ug_sinelas.mp3",
  "Mangaon na ta": "new_cb_custom_mangaon_na_ta.mp3",
  "Hugasi ang pinggan": "new_cb_custom_hagasi_ang_pinggan.mp3",
  "Kaligo na": "new_cb_custom_kaligo_na.mp3",
  "Asa ang tualya?": "new_cb_custom_asa_ang_tualya.mp3",
  "Naa ko sa kwarto": "new_cb_custom_naa_ko_sa_kwarto.mp3",
  "Pila diay imong edad?": "new_cb_custom_pila_diay_imong_edad.mp3",
  "Taga asa diay ka?": "new_cb_custom_taga_asa_diay_ka.mp3",
  "Unsay imong baligya?": "new_cb_custom_unsay_imong_baligya.mp3",
  "Asa diay ka nagpuyo?": "new_cb_custom_asa_diay_ka_nagpuyo.mp3",
  "Katulog na diha": "new_cb_custom_katulog_na_diha.mp3",
  "Hugaw imong sinena": "new_cb_custom_hugaw_imong_sinena.mp3",
  "Pawnga ang suga": "new_cb_custom_pawnga_ang_suga.mp3",
};

function playAudio(phrase) {
  const filename = AUDIO[phrase];
  if (!filename) return;
  const audio = new Audio("/" + filename);
  audio.play();
}

const LESSONS = {
  basics: [
    { id: "cb-b1", title: "I. Greetings", icon: "👋", hasFormal: true, col2Label: "Alternate / Intensified", toggleLabel: "alt", rows: [
      ["Kumusta ka?","Kumusta man mo?","How are you?"],
      ["Maayong buntag","—","Good morning"],
      ["Maayong hapon","—","Good afternoon"],
      ["Maayong gabii","—","Good evening"],
      ["Salamat","Salamat kaayo","Thank you / Thank you very much"],
      ["Walay sapayan","—","You're welcome"],
      ["Paalam","Paalam na","Goodbye"],
      ["Oo","—","Yes"],
      ["Dili","—","No"],
    ]},
    { id: "cb-b2", title: "II. Numbers", icon: "🔢", hasFormal: false, rows: [
      ["Usa","One"],["Duha","Two"],["Tulo","Three"],["Upat","Four"],["Lima","Five"],
      ["Unom","Six"],["Pito","Seven"],["Walo","Eight"],["Siyam","Nine"],["Napulo","Ten"],
    ]},
    { id: "cb-b3", title: "III. Family Members", icon: "👨‍👩‍👧", hasFormal: false, rows: [
      ["Amahan","Father"],["Inahan","Mother"],["Kuya","Older brother"],
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
      ["Ang akong ngalan mao si Maria","My name is ___"],
      ["Gikan ako sa Cebu","I am from Cebu"],
      ["Nagsabot ko og Cebuano","I speak Cebuano"],
      ["Unsa imong ngalan?","What is your name?"],
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
    ]},
    { id: "cb-a3", title: "III. Asking Directions", icon: "🗺️", hasFormal: false, rows: [
      ["Asa ang CR?","Where is the restroom?"],
      ["Unsaon pagadto sa?","How do I get to ___?"],
      ["Liko sa wala","Turn left"],
      ["Liko sa tuo","Turn right"],
      ["Diretso lang","Go straight"],
      ["Duol lang","It's just nearby"],
      ["Layo ba?","Is it far?"],
    ]},
    { id: "cb-a4", title: "IV. Common Phrases", icon: "🗨️", hasFormal: false, rows: [
      ["Palihug tabangi ko","Please, help me"],
      ["Hulat una","Wait a moment"],
      ["Lakaw ta","Let's go"],
      ["Ania ko","I'm here"],
      ["Kadiyot lang","Just a moment"],
      ["Tua siya","He/she is there"],
      ["Unsa nang orasa?","What time is it?"],
      ["Lisod ni","This is difficult"],
      ["Balik ra","Come back again"],
      ["Magkita ta pag-usab","See you again"],
      ["Molakaw na ko","I'm leaving now"],
      ["Pag-amping","Take care"],
      ["Taga asa ka?","Where are you from?"],
      ["Saba","Noisy"],
      ["Asa ka paingon?","Where are you going?"],
      ["Akoa","Mine"],
      ["Atoa","Our"],
      ["Pwede ko manghulam?","Can I borrow?"],
    ]},
    { id: "cb-a5", title: "V. Taste & Weather", icon: "🌶️", hasFormal: false, rows: [
      ["Init karon","It's hot today"],
      ["Bugnaw karon","It's cold today"],
      ["Tam-is ni","This is sweet"],
      ["Sakit akong ulo","I have a headache"],
      ["Parat ni","This is salty"],
      ["Pait ni","This is bitter"],
      ["Aslom ni","This is sour"],
      ["Halang ni","This is spicy"],
      ["Lami ni","This is delicious"],
      ["Walay lami ni","This is tasteless"],
    ]},
    { id: "cb-a6", title: "VI. Home & Daily Life", icon: "🏠", hasFormal: false, rows: [
      ["Ayaw ug hilak","Don't cry"],
      ["Nasakitan ko","I'm hurt"],
      ["Ayaw ug dagan","Don't run"],
      ["Palihug Limpyo sa lamesa","Please clean the table"],
      ["Ablihi ang pultahan","Open the door"],
      ["Ablihi ang bintana","Open the window"],
      ["Pagsul-ob ug sinelas","Wear your slippers"],
      ["Mangaon na ta","Let's eat"],
      ["Hugasi ang pinggan","Wash the plate"],
      ["Kaligo na","Take a bath now"],
      ["Asa ang tualya?","Where is the towel?"],
      ["Naa ko sa kwarto","I'm in my room"],
      ["Katulog na diha","Go to sleep"],
      ["Hugaw imong sinena","Your clothes are dirty"],
      ["Pawnga ang suga","Turn off the light"],
    ]},
    { id: "cb-a7", title: "VII. Getting to Know You", icon: "💬", hasFormal: false, rows: [
      ["Pila diay imong edad?","How old are you?"],
      ["Taga asa diay ka?","Where are you from?"],
      ["Unsay imong baligya?","What are you selling?"],
      ["Asa diay ka nagpuyo?","Where do you live?"],
    ]},
  ],
};

const TABS = ["basics", "vocabulary", "advanced"];
const TAB_LABELS = { basics: "Basics", vocabulary: "Vocabulary", advanced: "Advanced" };

function FormalTable({ lesson }) {
  const [expandedRows, setExpandedRows] = useState({});
  const toggleRow = (i) => setExpandedRows(prev => ({ ...prev, [i]: !prev[i] }));
  const toggleLabel = lesson.toggleLabel || "alt";
  const col2Label = lesson.col2Label || "Alternate";

  return (
    <>
      <style>{`
        .formal-col-cb { display: table-cell; }
        .alt-toggle-col-cb { display: none; }
        @media (max-width: 600px) {
          .formal-col-cb { display: none; }
          .alt-toggle-col-cb { display: table-cell; }
        }
      `}</style>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.05)" }}>
            <th style={th}>Cebuano</th>
            <th className="formal-col-cb" style={th}>{col2Label}</th>
            <th className="alt-toggle-col-cb" style={{ ...th, textAlign: "center" }}>{toggleLabel}</th>
            <th style={th}>English</th>
          </tr>
        </thead>
        <tbody>
          {lesson.rows.map((row, i) => {
            const hasAlt = row[1] && row[1] !== "—";
            return (
              <>
                <tr key={i} style={{ borderBottom: expandedRows[i] ? "none" : "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ ...td, color: "#e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {row[0]}
                      {AUDIO[row[0]] && (
                        <button onClick={() => playAudio(row[0])} style={speakBtn}>🔊</button>
                      )}
                    </div>
                  </td>
                  <td className="formal-col-cb" style={{ ...td, color: "#86efac" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {row[1]}
                      {hasAlt && AUDIO[row[1]] && (
                        <button onClick={() => playAudio(row[1])} style={speakBtn}>🔊</button>
                      )}
                    </div>
                  </td>
                  <td className="alt-toggle-col-cb" style={{ ...td, textAlign: "center", verticalAlign: "middle" }}>
                    {hasAlt && (
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
                        {expandedRows[i] ? `${toggleLabel} ▲` : `${toggleLabel} ▼`}
                      </button>
                    )}
                  </td>
                  <td style={{ ...td, color: "#94a3b8" }}>{row[2]}</td>
                </tr>
                {expandedRows[i] && hasAlt && (
                  <tr key={`${i}-alt`} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(134,239,172,0.05)" }}>
                    <td colSpan={3} style={{ ...td, paddingTop: "0.25rem", paddingBottom: "0.6rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#86efac" }}>
                        <span style={{ fontSize: "0.72rem", color: "#64748b" }}>{col2Label}:</span>
                        {row[1]}
                        {AUDIO[row[1]] && (
                          <button onClick={() => playAudio(row[1])} style={speakBtn}>🔊</button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

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
          <h2 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#10b981", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1rem" }}>
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
                        <th style={th}>Cebuano</th>
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
      {/* Contribute Banner */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2rem 3rem" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(251,191,36,0.03) 100%)",
          border: "1px solid rgba(251,191,36,0.25)",
          borderRadius: "1.5rem",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}>
          <div style={{ fontSize: "3.5rem", flexShrink: 0 }}>🇵🇭</div>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{ fontWeight: "800", fontSize: "1.1rem", color: "#fbbf24", marginBottom: "0.4rem" }}>
              Are you a native speaker?
            </div>
            <div style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Help talkaPH grow! Submit a missing word, correct a phrase, or share how it sounds in your region. Every contribution keeps Filipino languages alive. 🌺
            </div>
          </div>
          <a href="/contribute" style={{
            background: "#fbbf24",
            color: "#0f172a",
            borderRadius: "999px",
            padding: "0.7rem 1.5rem",
            fontWeight: "800",
            textDecoration: "none",
            fontSize: "0.9rem",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}>
            🎙️ Share your knowledge →
          </a>
        </div>
      </section>

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

const speakBtn = { background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", color: "#10b981", fontSize: "12px", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
const th = { padding: "0.75rem 1rem", textAlign: "left", color: "#94a3b8", fontWeight: "600", fontSize: "0.8rem", textTransform: "uppercase" };
const td = { padding: "0.65rem 1rem" };
