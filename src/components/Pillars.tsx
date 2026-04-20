import { ArrowUpRight, FlaskConical, Layers, Scale } from 'lucide-react';
import type { Pillar } from '../lib/types';

const glyphFor = (slug: string) => {
  if (slug === 'sensus-lab') return FlaskConical;
  if (slug === 'opusai') return Layers;
  return Scale;
};

export function Pillars({ pillars }: { pillars: Pillar[] }) {
  return (
    <section id="pillars" className="section-pad border-t border-white/5">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-14">
          <span className="h-px w-10 bg-bone/30" />
          <span className="eyebrow">The three pillars</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <h2 className="md:col-span-5 font-display font-semibold text-[36px] md:text-[52px] leading-[1.05] tracking-tightest text-bone">
            One ecosystem.<br />
            <span className="font-serif italic font-light text-bone/80">Three pillars.</span>
          </h2>
          <p className="md:col-span-7 md:pt-3 text-[17px] md:text-[18px] leading-[1.65] text-bone/70 max-w-[62ch]">
            OpusAI stands side-by-side with a research arm and a humanitarian arm. Together they
            form a closed loop: ideas are tested in the lab, productised through OpusAI, and kept
            accountable by Liberty Rise.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
          {pillars.map((pillar) => {
            const Glyph = glyphFor(pillar.slug);
            return (
              <article
                key={pillar.id}
                className={`relative p-8 md:p-10 lg:p-12 min-h-[420px] flex flex-col ${
                  pillar.is_home ? 'bg-ink' : 'bg-obsidian'
                }`}
              >
                {pillar.is_home && (
                  <span className="absolute top-6 right-6 text-[10px] tracking-[0.2em] uppercase text-ember">
                    Home pillar
                  </span>
                )}
                <Glyph
                  size={28}
                  strokeWidth={1.25}
                  className={pillar.is_home ? 'text-ember' : 'text-bone/60'}
                />
                <div className="mt-auto">
                  <div className="text-[11px] tracking-[0.2em] uppercase text-bone/45 mb-3">
                    {pillar.label}
                  </div>
                  <h3 className="font-display font-semibold text-[30px] md:text-[36px] leading-[1.05] text-bone tracking-tightest">
                    {pillar.name}
                  </h3>
                  <p className="mt-4 font-serif italic text-[16px] text-bone/75">{pillar.tagline}</p>
                  <p className="mt-5 text-[14.5px] leading-[1.6] text-bone/60">{pillar.body}</p>
                  {pillar.href && pillar.href !== '#' && (
                    <a
                      href={pillar.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex items-center gap-2 text-[13.5px] text-bone link-underline"
                    >
                      Visit
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                  {pillar.is_home && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 right-0 h-[2px] prism-bar opacity-60"
                    />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
