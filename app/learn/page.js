"use client";
import { useState } from "react";
import Link from "next/link";

// All phrases across all 3 languages for cross-language search
const ALL_PHRASES = [
  // TAGALOG - Greetings
  { tl: "Kamusta ka?", en: "How are you?", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_001_kamusta_ka.mp3" },
  { tl: "Kamusta po kayo?", en: "How are you? (formal)", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_001_kamusta_po_kayo.mp3" },
  { tl: "Magandang umaga", en: "Good morning", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_004_magandang_umaga.mp3" },
  { tl: "Magandang tanghali", en: "Good noon", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_006_magandang_tanghali.mp3" },
  { tl: "Magandang hapon", en: "Good afternoon", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_008_magandang_hapon.mp3" },
  { tl: "Magandang gabi", en: "Good evening", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_010_magandang_gabi.mp3" },
  { tl: "Salamat", en: "Thank you", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_012_salamat.mp3" },
  { tl: "Maraming salamat", en: "Thank you very much", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_014_maraming_salamat.mp3" },
  { tl: "Paalam", en: "Goodbye", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_016_paalam.mp3" },
  { tl: "Oo", en: "Yes", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_018_oo.mp3" },
  { tl: "Opo", en: "Yes (formal)", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_003_opo.mp3" },
  { tl: "Hindi", en: "No", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_020_hindi.mp3" },
  { tl: "Ingat ka", en: "Take care", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_060_ingat_ka.mp3" },
  { tl: "Maligayang kaarawan", en: "Happy birthday", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_028_maligayang_kaarawan.mp3" },
  { tl: "Pasensya na", en: "I am sorry", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_043_pasensya_na.mp3" },
  { tl: "Tuloy ka", en: "Please come in", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_047_tuloy_ka.mp3" },
  // TAGALOG - Numbers
  { tl: "Isa", en: "One", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_007_isa.mp3" },
  { tl: "Dalawa", en: "Two", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_008_dalawa.mp3" },
  { tl: "Tatlo", en: "Three", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_009_tatlo.mp3" },
  { tl: "Apat", en: "Four", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_010_apat.mp3" },
  { tl: "Lima", en: "Five", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_011_lima.mp3" },
  { tl: "Anim", en: "Six", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_012_anim.mp3" },
  { tl: "Pito", en: "Seven", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_013_pito.mp3" },
  { tl: "Walo", en: "Eight", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_014_walo.mp3" },
  { tl: "Siyam", en: "Nine", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_015_siyam.mp3" },
  { tl: "Sampu", en: "Ten", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_016_sampu.mp3" },
  // TAGALOG - Family
  { tl: "Ama / Tatay", en: "Father", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_017_ama_tatay.mp3" },
  { tl: "Ina / Nanay", en: "Mother", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_018_ina_nanay.mp3" },
  { tl: "Kuya", en: "Older brother", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_019_kuya.mp3" },
  { tl: "Ate", en: "Older sister", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_020_ate.mp3" },
  { tl: "Lolo", en: "Grandfather", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "new_tl_fam_lolo.mp3" },
  { tl: "Lola", en: "Grandmother", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "new_tl_fam_lola.mp3" },
  // TAGALOG - Food
  { tl: "Kanin", en: "Cooked rice", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "new_tl_food_001_kanin.mp3" },
  { tl: "Tubig", en: "Water", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "new_tl_food_002_tubig.mp3" },
  { tl: "Manok", en: "Chicken", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_074_manok.mp3" },
  { tl: "Baboy", en: "Pork", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_075_baboy.mp3" },
  { tl: "Isda", en: "Fish", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "new_tl_food_004_isda.mp3" },
  { tl: "Kape", en: "Coffee", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "new_tl_food_009_kape.mp3" },
  // TAGALOG - Expressions
  { tl: "Sige", en: "Okay / Sure", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_055_sige.mp3" },
  { tl: "Ay nako!", en: "Oh my! (surprise)", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "fix_056_ay_nako.mp3" },
  { tl: "Gutom na ako", en: "I am already hungry", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_139_gutom_na_ako.mp3" },
  { tl: "Pagod na ako", en: "I am already tired", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_140_pagod_na_ako.mp3" },
  { tl: "Mahal kita", en: "I love you", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "tl_141_mahal_kita.mp3" },
  { tl: "Diretso lang", en: "Go straight", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "new_tl_dir_diretso.mp3" },
  { tl: "Lumiko sa kaliwa", en: "Turn left", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "new_tl_dir_kaliwa.mp3" },
  { tl: "Lumiko sa kanan", en: "Turn right", lang: "Tagalog", langColor: "#3b82f6", href: "/learn/tagalog", audio: "new_tl_dir_kanan.mp3" },

  // CEBUANO - Greetings
  { tl: "Kumusta ka?", en: "How are you?", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "cb_142_kumusta_ka.mp3" },
  { tl: "Maayong buntag", en: "Good morning", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "fix_061_maayong_buntag.mp3" },
  { tl: "Maayong hapon", en: "Good afternoon", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "fix_062_maayong_hapon.mp3" },
  { tl: "Maayong gabii", en: "Good evening", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "fix_063_maayong_gabii.mp3" },
  { tl: "Salamat", en: "Thank you", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "cb_146_salamat.mp3" },
  { tl: "Salamat kaayo", en: "Thank you very much", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "cb_m036_salamat_kaayo.mp3" },
  { tl: "Paalam", en: "Goodbye", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "cb_147_paalam.mp3" },
  { tl: "Oo", en: "Yes", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "fix_064_oo.mp3" },
  { tl: "Dili", en: "No", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "fix_065_dili.mp3" },
  { tl: "Walay sapayan", en: "You're welcome", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_expr_001_sige.mp3" },
  // CEBUANO - Numbers
  { tl: "Usa", en: "One", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_num_001_usa.mp3" },
  { tl: "Duha", en: "Two", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_num_002_duha.mp3" },
  { tl: "Tulo", en: "Three", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_num_003_tulo.mp3" },
  { tl: "Upat", en: "Four", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_num_004_upat.mp3" },
  { tl: "Napulo", en: "Ten", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_num_010_napulo.mp3" },
  // CEBUANO - Food & expressions
  { tl: "Kan-on", en: "Cooked rice", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_food_001_kanon.mp3" },
  { tl: "Bugas", en: "Uncooked rice", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_food_002_bugas.mp3" },
  { tl: "Gigutom na ko", en: "I am already hungry", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_expr_005_gigutom_na_ko.mp3" },
  { tl: "Gikapoy na ko", en: "I am already tired", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_expr_006_gikapoy_na_ko.mp3" },
  { tl: "Palangga ko ikaw", en: "I love you", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_expr_007_palangga_ko_ikaw.mp3" },
  { tl: "Sige", en: "Okay / Sure", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_expr_001_sige.mp3" },
  { tl: "Wala ko kahibalo", en: "I don't know", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_expr_003_wala_ko_kahibalo.mp3" },
  { tl: "Liko sa wala", en: "Turn left", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_dir_003_liko_sa_wala.mp3" },
  { tl: "Liko sa tuo", en: "Turn right", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_dir_004_liko_sa_tuo.mp3" },
  { tl: "Diretso lang", en: "Go straight", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_dir_005_diretso_lang.mp3" },
  { tl: "Asa ang CR?", en: "Where is the restroom?", lang: "Cebuano", langColor: "#10b981", href: "/learn/cebuano", audio: "new_cb_dir_001_asa_ang_cr.mp3" },

  // ILONGGO - Greetings
  { tl: "Kamusta ka?", en: "How are you?", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "fix_076_kamusta_ka.mp3" },
  { tl: "Kamusta kamo?", en: "How are you? (plural)", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "fix_077_kamusta_kamo.mp3" },
  { tl: "Maayong aga", en: "Good morning", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "fix_078_maayong_aga.mp3" },
  { tl: "Maayong hapon", en: "Good afternoon", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_gr_maayong_hapon.mp3" },
  { tl: "Maayong gab-i", en: "Good evening", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_gr_maayong_gabi.mp3" },
  { tl: "Salamat", en: "Thank you", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_gr_salamat.mp3" },
  { tl: "Salamat gid", en: "Thank you very much", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_gr_salamat_gid.mp3" },
  { tl: "Oo", en: "Yes", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "fix_064_oo.mp3" },
  { tl: "Indi", en: "No", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_indi.mp3" },
  { tl: "Palangga ko ikaw", en: "I love you", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_expr_006_palangga_ko_ikaw.mp3" },
  // ILONGGO - Numbers
  { tl: "Isa", en: "One", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_num_001_isa.mp3" },
  { tl: "Duha", en: "Two", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_num_002_duha.mp3" },
  { tl: "Pulo", en: "Ten", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_num_010_pulo.mp3" },
  // ILONGGO - Food & expressions
  { tl: "Kan-on", en: "Cooked rice", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_food_001_kanon.mp3" },
  { tl: "Bugas", en: "Uncooked rice", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_food_002_bugas.mp3" },
  { tl: "Ginagutom na ako", en: "I am already hungry", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_expr_004_ginagutom_na_ako.mp3" },
  { tl: "Ginakapoy na ako", en: "I am already tired", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_expr_005_ginakapoy_na_ako.mp3" },
  { tl: "Sige", en: "Okay / Sure", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_expr_001_sige.mp3" },
  { tl: "Wala ako kahibalo", en: "I don't know", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_expr_002_wala_ako_kahibalo.mp3" },
  { tl: "Hulat lang", en: "Just a moment", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_expr_003_hulat_lang.mp3" },
  { tl: "Liko sa wala", en: "Turn left", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_dir_003_liko_sa_wala.mp3" },
  { tl: "Liko sa tuo", en: "Turn right", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_dir_004_liko_sa_tuo.mp3" },
  { tl: "Diretso lang", en: "Go straight", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_dir_005_diretso_lang.mp3" },
  { tl: "Diin ang CR?", en: "Where is the restroom?", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_dir_001_diin_ang_cr.mp3" },
  { tl: "Malapit lang", en: "It's just nearby", lang: "Ilonggo", langColor: "#f59e0b", href: "/learn/ilonggo", audio: "new_il_dir_006_malapit_lang.mp3" },
];

function playAudio(filename) {
  if (!filename) return;
  const audio = new Audio("/" + filename);
  audio.play();
}

const LANGUAGES = [
  { name: "Tagalog", sub: "Filipino", desc: "The national language, spoken across the Philippines", icon: "🗺️", color: "#3b82f6", href: "/learn/tagalog", phrases: "90 phrases" },
  { name: "Cebuano", sub: "Bisaya", desc: "Spoken in Visayas and Mindanao", icon: "🌊", color: "#10b981", href: "/learn/cebuano", phrases: "90 phrases" },
  { name: "Ilonggo", sub: "Hiligaynon", desc: "Spoken in Western Visayas", icon: "🌺", color: "#f59e0b", href: "/learn/ilonggo", phrases: "80 phrases" },
];

export default function LearnPage() {
  const [query, setQuery] = useState("");

  const results = query.trim().length >= 2
    ? ALL_PHRASES.filter(p =>
        p.tl.toLowerCase().includes(query.toLowerCase()) ||
        p.en.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const showResults = query.trim().length >= 2;

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
      </nav>

      <section style={{ textAlign: "center", padding: "2rem 2rem 1.5rem" }}>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: "900", marginBottom: "0.5rem" }}>
          Choose a Language
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1rem", marginBottom: "2rem" }}>
          Pick the Filipino language you want to learn today.
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: "520px", margin: "0 auto 2.5rem", position: "relative" }}>
          <div style={{ position: "relative" }}>
            <span style={{
              position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
              fontSize: "1.1rem", pointerEvents: "none"
            }}>🔍</span>
            <input
              type="text"
              placeholder="Search phrases in English or Filipino…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.85rem 1rem 0.85rem 2.75rem",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.07)",
                color: "#fff",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(251,191,36,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{
                  position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "1rem"
                }}
              >✕</button>
            )}
          </div>

          {/* Search Results */}
          {showResults && (
            <div style={{
              position: "absolute", top: "calc(100% + 0.5rem)", left: 0, right: 0,
              background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "1rem", overflow: "hidden", zIndex: 100,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              maxHeight: "420px", overflowY: "auto",
              textAlign: "left",
            }}>
              {results.length === 0 ? (
                <div style={{ padding: "1.5rem", color: "#64748b", textAlign: "center" }}>
                  No phrases found for "{query}"
                </div>
              ) : (
                <>
                  <div style={{ padding: "0.6rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.06)", color: "#64748b", fontSize: "0.75rem" }}>
                    {results.length} result{results.length !== 1 ? "s" : ""} across all languages
                  </div>
                  {results.map((p, i) => (
                    <div key={i} style={{
                      padding: "0.75rem 1rem",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      display: "flex", alignItems: "center", gap: "0.75rem",
                    }}>
                      <button
                        onClick={() => playAudio(p.audio)}
                        style={{
                          background: `${p.langColor}20`,
                          border: `1px solid ${p.langColor}40`,
                          borderRadius: "50%", width: "32px", height: "32px",
                          cursor: "pointer", color: p.langColor,
                          fontSize: "13px", display: "inline-flex",
                          alignItems: "center", justifyContent: "center", flexShrink: 0
                        }}
                      >🔊</button>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: "700", color: "#e2e8f0", fontSize: "0.95rem" }}>{p.tl}</div>
                        <div style={{ color: "#94a3b8", fontSize: "0.82rem" }}>{p.en}</div>
                      </div>
                      <Link href={p.href} style={{
                        background: `${p.langColor}20`,
                        border: `1px solid ${p.langColor}30`,
                        borderRadius: "999px", padding: "3px 10px",
                        color: p.langColor, fontSize: "0.75rem",
                        fontWeight: "600", textDecoration: "none", flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}>
                        {p.lang}
                      </Link>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Language Cards */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {LANGUAGES.map(lang => (
            <Link key={lang.name} href={lang.href} style={{ textDecoration: "none" }}>
              <div style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${lang.color}30`,
                borderRadius: "1.25rem", padding: "1.75rem",
                cursor: "pointer", transition: "transform 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = `${lang.color}60`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = `${lang.color}30`; }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{lang.icon}</div>
                <div style={{ fontWeight: "800", fontSize: "1.3rem", color: lang.color, marginBottom: "0.2rem" }}>{lang.name}</div>
                <div style={{ color: "#64748b", fontSize: "0.8rem", fontStyle: "italic", marginBottom: "0.6rem" }}>{lang.sub}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1rem" }}>{lang.desc}</div>
                <span style={{
                  background: `${lang.color}20`, border: `1px solid ${lang.color}40`,
                  borderRadius: "999px", padding: "4px 14px",
                  color: lang.color, fontSize: "0.8rem", fontWeight: "600"
                }}>
                  {lang.phrases} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "2rem 1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <nav style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1rem" }}>
          <Link href="/" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>🏠 Home</Link>
          <Link href="/about" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>About</Link>
          <Link href="/privacy" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>Privacy Policy</Link>
        </nav>
        <p style={{ color: "#475569", fontSize: "0.8rem", margin: 0 }}>© 2026 talkaPH - Learn Filipino languages</p>
      </footer>
    </main>
  );
}
