import { ArrowUpRight, Eye, BookOpen, Mic, Archive, Compass, Sparkles } from 'lucide-react';
import type { AcuityOffering } from '../lib/types';

const iconFor = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('library')) return BookOpen;
  if (t.includes('philosophy')) return Eye;
  if (t.includes('webinar')) return Mic;
  if (t.includes('testimony')) return Archive;
  if (t.includes('instrument')) return Compass;
  return Sparkles;
};

export function Acuity({ offerings }: { offerings: AcuityOffering[] }) {
  const main = offerings.filter((o) => o.category === 'offering');
  const process = offerings.filter((o) => o.category === 'process');

  return (
    <section
      id="acuity"
      className="relative section-pad overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A0C 0%, #14100E 100%)' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 40% at 20% 20%, rgba(217,122,74,0.18) 0%, transparent 60%), radial-gradient(50% 40% at 85% 80%, rgba(43,42,99,0.25) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-14">
          <span className="h-px w-10 bg-bone/30" />
          <span className="eyebrow">A personal initiative · Est. 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
          <h2 className="md:col-span-8 font-serif italic font-light text-[44px] md:text-[84px] lg:text-[104px] leading-[0.98] text-bone">
            Acuity Institute —<br />
            pathways to wisdom.
          </h2>
          <div className="md:col-span-4 md:pb-4">
            <div className="text-[11px] tracking-[0.2em] uppercase text-ember/80 mb-3">
              Constellation of trust
            </div>
            <div className="flex flex-wrap gap-2 text-[12px] text-bone/60">
              {['Discernment', 'Foresight', 'Lucidity', 'Sagacity'].map((w) => (
                <span key={w} className="border border-white/10 rounded-full px-3 py-1">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>

        <figure className="mt-20 max-w-[52ch]">
          <blockquote className="font-serif italic text-[24px] md:text-[32px] leading-[1.35] text-bone/90">
            "Quiet over loud. Technology should earn attention, not demand it. Data integrity,
            trust, and knowledge all get healthier when power is spread out."
          </blockquote>
          <figcaption className="mt-5 text-[12px] tracking-[0.2em] uppercase text-bone/45">
            — Ethan, on the standards Acuity quietly brings back to the commercial work.
          </figcaption>
        </figure>

        <p className="mt-16 max-w-[60ch] text-[17px] leading-[1.65] text-bone/70">
          Alongside the commercial work, Ethan stewards the Acuity Institute — an independent
          project dedicated to truth and the expansion of accurate knowledge. Acuity holds space
          for the parts of the journey that sit outside product roadmaps: spirituality, personal
          testimony, lived experience, and applied discernment.
        </p>

        <div className="mt-20">
          <div className="eyebrow mb-8">What Acuity offers</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            {main.map((o) => {
              const Icon = iconFor(o.title);
              return (
                <div key={o.id} className="bg-obsidian/80 p-7 md:p-9 min-h-[220px]">
                  <Icon size={22} strokeWidth={1.25} className="text-ember/80" />
                  <div className="mt-8 font-serif italic text-[22px] text-bone">{o.title}</div>
                  <p className="mt-3 text-[14px] leading-[1.6] text-bone/60">{o.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20">
          <div className="eyebrow mb-8">Personal development process</div>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
            {process.map((p, i) => (
              <li key={p.id} className="border-t border-bone/15 pt-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif italic text-ember/80 text-[18px]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif italic text-[22px] text-bone">{p.title}</span>
                </div>
                <p className="mt-3 text-[13.5px] leading-[1.6] text-bone/55">{p.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-t border-bone/10 pt-10">
          <p className="font-serif italic text-[18px] md:text-[22px] text-bone/75 max-w-[48ch]">
            Acuity is intentionally personal. Connected to — but distinct from — the commercial
            pillars. It honours a founder perspective that is inseparable from the work.
          </p>
          <a
            href="https://acuity.institute"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-[14px] text-bone link-underline"
          >
            Visit acuity.institute
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
