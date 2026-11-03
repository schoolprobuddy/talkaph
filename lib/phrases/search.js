import { TAGALOG_AUDIO } from "./tagalog-data.js";

/**
 * Tagalog rows in the /learn search box, in their original order.
 * English here is the search-page wording (two formal rows add "(formal)").
 * Audio filenames always come from TAGALOG_AUDIO.
 */
const TAGALOG_SEARCH_GLOSSES = [
  ["Kumusta ka?", "How are you?"],
  ["Kumusta po kayo?", "How are you? (formal)"],
  ["Magandang umaga", "Good morning"],
  ["Magandang tanghali", "Good noon"],
  ["Magandang hapon", "Good afternoon"],
  ["Magandang gabi", "Good evening"],
  ["Salamat", "Thank you"],
  ["Maraming salamat", "Thank you very much"],
  ["Paalam", "Goodbye"],
  ["Oo", "Yes"],
  ["Opo", "Yes (formal)"],
  ["Hindi", "No"],
  ["Ingat ka", "Take care"],
  ["Maligayang kaarawan", "Happy birthday"],
  ["Pasensya na", "I am sorry"],
  ["Tuloy ka", "Please come in"],
  ["Isa", "One"],
  ["Dalawa", "Two"],
  ["Tatlo", "Three"],
  ["Apat", "Four"],
  ["Lima", "Five"],
  ["Anim", "Six"],
  ["Pito", "Seven"],
  ["Walo", "Eight"],
  ["Siyam", "Nine"],
  ["Sampu", "Ten"],
  ["Ama / Tatay", "Father"],
  ["Ina / Nanay", "Mother"],
  ["Kuya", "Older brother"],
  ["Ate", "Older sister"],
  ["Lolo", "Grandfather"],
  ["Lola", "Grandmother"],
  ["Kanin", "Cooked rice"],
  ["Tubig", "Water"],
  ["Manok", "Chicken"],
  ["Baboy", "Pork"],
  ["Isda", "Fish"],
  ["Kape", "Coffee"],
  ["Sige", "Okay / Sure"],
  ["Ay nako!", "Oh my! (surprise)"],
  ["Gutom na ako", "I am already hungry"],
  ["Pagod na ako", "I am already tired"],
  ["Mahal kita", "I love you"],
  ["Diretso lang", "Go straight"],
  ["Lumiko sa kaliwa", "Turn left"],
  ["Lumiko sa kanan", "Turn right"],
];

export const TAGALOG_SEARCH_PHRASES = TAGALOG_SEARCH_GLOSSES.map(([tl, en]) => ({
  tl,
  en,
  lang: "Tagalog",
  langColor: "#3b82f6",
  href: "/learn/tagalog",
  audio: TAGALOG_AUDIO[tl],
}));
