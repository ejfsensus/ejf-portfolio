const principles = [
  {
    letter: 'E',
    word: 'Ethical',
    body: 'Privacy, compliance, and fairness built in from the first sketch — not patched on later.',
  },
  {
    letter: 'E',
    word: 'Effective',
    body: 'Measurable outcomes — time saved, revenue unlocked, ideas shipped — so AI pays for itself.',
  },
  {
    letter: 'E',
    word: 'Equitable',
    body: 'Pricing, tools, and training designed so small teams can access the same quality as enterprises.',
  },
];

export function Positioning() {
  return (
    <section className="section-pad border-t border-white/5">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-14">
          <span className="h-px w-10 bg-bone/30" />
          <span className="eyebrow">Positioning</span>
        </div>

        <h2 className="font-display font-semibold text-[36px] md:text-[64px] lg:text-[76px] leading-[1.02] tracking-tightest text-bone max-w-[18ch]">
          Fostering transformation through{' '}
          <span className="font-serif italic font-light text-bone/85">responsible AI.</span>
        </h2>

        <p className="mt-12 max-w-[62ch] text-[18px] leading-[1.65] text-bone/70">
          Advanced technology shouldn't feel complicated, extractive, or exclusive. Ethan's
          practice exists to make AI adoption accessible, ethical, and genuinely useful — for
          businesses of any size, and for the people those businesses serve. Every engagement
          and every product is anchored to three principles.
        </p>

        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
          {principles.map((p, i) => (
            <div
              key={p.word}
              className={`py-10 md:py-14 md:px-10 first:pl-0 ${
                i < 2 ? 'md:border-r border-white/10' : ''
              } border-b md:border-b-0 border-white/10`}
            >
              <div className="flex items-baseline gap-6">
                <span className="font-display font-semibold text-[90px] md:text-[140px] leading-[0.8] tracking-tightest text-bone/90">
                  {p.letter}
                </span>
                <span className="font-serif italic text-[22px] md:text-[26px] text-bone">{p.word}</span>
              </div>
              <p className="mt-6 text-[15.5px] leading-[1.6] text-bone/60 max-w-[32ch]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
