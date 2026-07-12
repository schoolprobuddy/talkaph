import Link from "next/link";

export const metadata = {
  title: "20 Tagalog Phrases Every Tourist Needs | talkaPH Blog",
  description:
    "The essential Tagalog phrases for your first trip to the Philippines — greetings, ordering food, haggling, and getting around, with pronunciation guides from a native Filipino speaker.",
};

function Phrase({ tagalog, pron, meaning }) {
  return (
    <div className="my-4 rounded-xl bg-slate-50 px-5 py-4">
      <p className="text-lg font-semibold text-blue-600">{tagalog}</p>
      <p className="text-sm text-slate-500">
        {pron} — {meaning}
      </p>
    </div>
  );
}

export default function TagalogPhrasesForTouristsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-xs text-slate-400">
        <Link href="/blog" className="hover:text-blue-600">
          Blog
        </Link>{" "}
        › Travel
      </p>
      <h1 className="mt-2 text-3xl font-bold leading-tight text-slate-900">
        20 Tagalog Phrases Every Tourist Needs
      </h1>
      <p className="mt-3 text-sm text-slate-400">
        By Drew, native Filipino speaker · July 2026 · 7 min read
      </p>

      <article className="mt-8 space-y-4 text-base leading-relaxed text-slate-700">
        <p>
          Landing in Manila for the first time? Here&apos;s some good news:
          most Filipinos speak at least some English, so you&apos;ll never be
          truly stuck. But here&apos;s the better news — the moment you try
          even one Tagalog phrase, everything changes. Vendors smile wider,
          tricycle drivers warm up, and lolas (grandmothers) will practically
          adopt you. Filipinos don&apos;t expect foreigners to speak Tagalog,
          which is exactly why trying means so much.
        </p>
        <p>
          I grew up in the Philippines speaking Ilonggo, Cebuano, and Tagalog,
          and I&apos;ve watched plenty of visitors transform their trip with a
          handful of phrases. These are the twenty I&apos;d teach a friend
          before their flight — no grammar lessons, just the words that
          actually come up.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-slate-900">
          The magic word: po
        </h2>
        <p>
          Before the phrases, one tiny word you&apos;ll hear constantly:{" "}
          <strong>po</strong>. It doesn&apos;t translate to anything —
          it&apos;s a respect marker. Add it when speaking to anyone older
          than you, anyone serving you, or anyone you&apos;ve just met.
          &quot;Salamat&quot; means thank you; &quot;salamat po&quot; means
          thank you with a small bow built into the sentence. When in doubt,
          add po. Nobody has ever been offended by too much politeness in the
          Philippines.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-slate-900">
          Greetings and courtesy
        </h2>
        <Phrase
          tagalog="Magandang umaga po"
          pron="ma-gan-DANG oo-MA-ga poh"
          meaning="Good morning (polite)"
        />
        <Phrase tagalog="Kumusta?" pron="koo-MOOS-tah" meaning="How are you?" />
        <Phrase
          tagalog="Salamat po"
          pron="sah-LAH-mat poh"
          meaning="Thank you (polite)"
        />
        <Phrase
          tagalog="Walang anuman"
          pron="wah-LANG ah-noo-MAN"
          meaning="You're welcome"
        />
        <Phrase tagalog="Paalam" pron="pah-AH-lam" meaning="Goodbye" />
        <p>
          &quot;Kumusta&quot; comes from the Spanish &quot;¿cómo está?&quot; —
          one of thousands of Spanish loanwords in Tagalog, a leftover from
          over 300 years of colonial history. If you speak any Spanish,
          you&apos;ll keep spotting familiar words: mesa (table), silya
          (chair), kwarto (room).
        </p>

        <h2 className="pt-4 text-xl font-semibold text-slate-900">
          At the restaurant and the market
        </h2>
        <Phrase
          tagalog="Magkano po ito?"
          pron="mag-KAH-no poh ee-TOH"
          meaning="How much is this?"
        />
        <Phrase tagalog="Masarap!" pron="ma-sa-RAP" meaning="Delicious!" />
        <Phrase
          tagalog="Isa pa po"
          pron="ee-SAH pah poh"
          meaning="One more, please"
        />
        <Phrase
          tagalog="Sobrang mahal naman"
          pron="SOH-brang ma-HAL na-MAN"
          meaning="That's too expensive (haggling starter)"
        />
        <Phrase
          tagalog="Ang bill po"
          pron="ang BILL poh"
          meaning="The bill, please"
        />
        <p>
          A cultural note on haggling: at malls and restaurants, prices are
          fixed. But at street markets and souvenir stalls, friendly haggling
          is normal and even expected. Say &quot;sobrang mahal naman&quot; with
          a smile, offer around 60-70% of the asking price, and meet somewhere
          in the middle. Keep it light — it&apos;s a social game, not a battle.
          And &quot;masarap&quot; might be the single most useful word in this
          list. Filipino food culture is generous to a fault; telling your host
          the food is delicious is the fastest way to be offered a second plate
          you cannot refuse.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-slate-900">
          Getting around
        </h2>
        <Phrase
          tagalog="Saan po ang CR?"
          pron="sah-AN poh ang see-AR"
          meaning="Where is the restroom? (CR = comfort room)"
        />
        <Phrase
          tagalog="Para po!"
          pron="PAH-rah poh"
          meaning="Stop here, please! (on a jeepney)"
        />
        <Phrase
          tagalog="Bayad po"
          pron="BAH-yad poh"
          meaning="Here's my fare (passing payment on a jeepney)"
        />
        <Phrase
          tagalog="Sa kanan / sa kaliwa"
          pron="sah kah-NAN / sah kah-lee-WAH"
          meaning="To the right / to the left"
        />
        <Phrase
          tagalog="Malapit lang ba?"
          pron="ma-LAH-pit lang bah"
          meaning="Is it nearby?"
        />
        <p>
          Two of these are jeepney-specific, and riding a jeepney at least once
          is practically mandatory. Payment travels hand to hand up to the
          driver — you say &quot;bayad po&quot; as you pass your coins forward,
          and when you want to get off, a firm &quot;para po!&quot; (or a knock
          on the roof) does the job. Also: restrooms in the Philippines are
          called CRs — comfort rooms. Asking for the &quot;bathroom&quot;
          works, but &quot;CR&quot; is what everyone actually says.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-slate-900">
          Making friends
        </h2>
        <Phrase
          tagalog="Ano ang pangalan mo?"
          pron="ah-NO ang pa-NGA-lan moh"
          meaning="What's your name?"
        />
        <Phrase
          tagalog="Ako si ..."
          pron="ah-KOH see"
          meaning="I am ... (your name)"
        />
        <Phrase
          tagalog="Taga-saan ka?"
          pron="ta-ga-sah-AN kah"
          meaning="Where are you from?"
        />
        <Phrase
          tagalog="Hindi ako marunong mag-Tagalog"
          pron="hin-DEE ah-KOH ma-ROO-nong mag-ta-GAH-log"
          meaning="I don't know how to speak Tagalog"
        />
        <Phrase
          tagalog="Mahal kita"
          pron="mah-HAL ki-TAH"
          meaning="I love you"
        />
        <p>
          Yes, &quot;I don&apos;t speak Tagalog&quot; said in Tagalog is a
          guaranteed laugh — in the best way. Filipinos find it charming, and
          it usually kicks off a friendly round of them teaching you more
          words. And &quot;mahal kita&quot;? Maybe you won&apos;t need it on a
          two-week trip. But plenty of visitors to the Philippines end up
          staying longer than planned, and it&apos;s not always because of the
          beaches.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-slate-900">
          One last tip
        </h2>
        <p>
          Don&apos;t worry about perfect pronunciation. Tagalog is mercifully
          phonetic — words sound like they&apos;re spelled — and Filipinos are
          among the most encouraging language teachers on earth. Every attempt
          gets a smile, every mistake gets a gentle correction, and every
          &quot;salamat po&quot; gets remembered.
        </p>
        <p>
          Want to hear all of these spoken aloud before your trip? Every
          phrase on talkaPH comes with native-speaker audio, and it&apos;s
          completely free — no signup, no app download.
        </p>
      </article>

      <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-blue-50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-slate-900">
            Ready to hear these phrases?
          </p>
          <p className="text-sm text-slate-600">
            270+ phrases with native audio in Tagalog, Cebuano, and Ilonggo.
          </p>
        </div>
        <Link
          href="/learn/tagalog"
          className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Start learning free →
        </Link>
      </div>
    </main>
  );
}
