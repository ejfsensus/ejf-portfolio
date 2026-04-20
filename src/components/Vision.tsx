import { ArrowUpRight } from 'lucide-react';

export function Vision() {
  return (
    <section id="vision" className="relative section-pad bg-bone text-obsidian">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-14">
          <span className="h-px w-10 bg-obsidian/25" />
          <span className="eyebrow" style={{ color: 'rgba(10,10,12,0.55)' }}>
            The north star · Aspirational
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <h2 className="md:col-span-7 font-display font-semibold text-[40px] md:text-[80px] lg:text-[96px] leading-[0.98] tracking-tightest text-obsidian">
            Sensus InVista<br />
            <span className="font-serif italic font-light">&amp; InVista —</span><br />
            where this is<br />
            all heading.
          </h2>

          <div className="md:col-span-5 md:pt-6 space-y-8">
            <p className="text-[17px] md:text-[18px] leading-[1.65] text-obsidian/75">
              Everything OpusAI ships is also fuel for a longer arc. Sensus InVista is the parent
              vision: a world where technology harmonises with human values to create a fairer,
              more inclusive society.
            </p>
            <p className="text-[17px] md:text-[18px] leading-[1.65] text-obsidian/75">
              InVista is its flagship aspiration — a blockchain-backed, AI-driven knowledge
              network designed to democratise access to trusted information, explored in three
              dimensions and tailored to every user.
            </p>
            <p className="text-[14.5px] italic font-serif text-obsidian/65 leading-[1.5]">
              Both are deliberately framed as aspirational goals, not products on the shelf. They
              define why the work exists and where it's going — not what's for sale today.
            </p>

            <a
              href="https://sensusinvista.ltd"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-[14px] text-obsidian link-underline"
            >
              Explore the vision at sensusinvista.ltd
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div aria-hidden className="mt-24 h-[1px] w-full bg-obsidian/15" />
        <div className="mt-10 flex items-center justify-between text-[12px] tracking-[0.2em] uppercase text-obsidian/50">
          <span>Parent vision</span>
          <span>Est. 2025</span>
        </div>
      </div>
    </section>
  );
}
