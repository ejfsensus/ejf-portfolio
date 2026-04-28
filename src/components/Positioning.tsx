const principles = [
  {
    index: '01',
    word: 'Ethical',
    body: 'Privacy, compliance, and fairness built in from the first sketch, not patched on later.',
  },
  {
    index: '02',
    word: 'Effective',
    body: 'Measurable outcomes: time saved, revenue unlocked, ideas shipped, so AI pays for itself.',
  },
  {
    index: '03',
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
          <span className="font-serif italic font-light text-bone/85">responsible solutions.</span>
        </h2>

        <p className="mt-12 max-w-[62ch] text-[18px] leading-[1.65] text-bone/70">
          Advanced technology shouldn't feel complicated, extractive, or exclusive. Ethan's
          practice exists to make AI adoption accessible, ethical, and genuinely useful: for
          businesses of any size, and for the people those businesses serve. Every engagement
          and every product is anchored to three principles.
        </p>

        <div className="mt-16 md:mt-24 flex items-center gap-3">
          <span className="h-px w-6 bg-bone/30" />
          <span className="eyebrow">The Three E&apos;s, our commitment</span>
        </div>

        <div className="relative mt-8 rounded-[28px] border border-white/10 bg-ink/80 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(90% 70% at 15% 0%, rgba(63,184,176,0.09) 0%, transparent 55%), radial-gradient(80% 80% at 100% 100%, rgba(217,122,74,0.10) 0%, transparent 60%)',
            }}
          />
          <div className="relative grid grid-cols-1 md:grid-cols-3">
            {principles.map((p, i) => (
              <div
                key={p.word}
                className={`group relative px-7 md:px-10 py-10 md:py-14 transition-colors duration-500 hover:bg-bone/[0.025] ${
                  i < 2 ? 'md:border-r border-white/10' : ''
                } ${i < principles.length - 1 ? 'border-b md:border-b-0 border-white/10' : ''}`}
              >
                <div className="flex items-center gap-3 text-[12px] font-semibold tracking-[0.24em] uppercase text-bone/80">
                  <span>{p.index}</span>
                  <span className="h-px w-6 bg-bone/30" />
                </div>

                <div className="mt-5 flex items-baseline gap-5">
                  <span
                    aria-hidden
                    className="font-serif italic font-normal text-[110px] md:text-[160px] leading-[0.8] tracking-tightest text-bone/85 transition-transform duration-500 ease-out group-hover:-translate-y-1"
                  >
                    E
                  </span>
                  <span className="font-serif italic font-normal text-[24px] md:text-[30px] text-bone">
                    {p.word}
                  </span>
                </div>

                <div className="mt-5 h-[2px] w-10 rounded-full prism-bar opacity-70 transition-all duration-500 ease-out group-hover:w-24 group-hover:opacity-100" />

                <p className="mt-6 text-[15.5px] leading-[1.6] text-bone/65 max-w-[32ch]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
