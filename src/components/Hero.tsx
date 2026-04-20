import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { LightBloom } from './LightBloom';

export function Hero({ onOpenFounder }: { onOpenFounder: () => void }) {
  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
      <LightBloom />

      <div className="relative mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-10 bg-bone/30" />
          <span className="eyebrow">Opusai · AI consulting, design &amp; deployment</span>
        </div>

        <h1 className="font-display font-semibold text-[48px] sm:text-[72px] md:text-[112px] lg:text-[136px] leading-[0.95] tracking-tightest text-bone max-w-[13ch]">
          Human-first AI,
          <br />
          built with{' '}
          <span className="relative inline-block">
            <span className="relative z-10">intent.</span>
            <span
              aria-hidden
              className="absolute left-0 right-0 bottom-[0.12em] h-[6px] md:h-[10px] prism-bar rounded-full"
            />
          </span>
        </h1>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
          <p className="md:col-span-7 text-[17px] md:text-[20px] leading-[1.55] text-bone/75 max-w-[58ch]">
            OpusAI is the applied arm of a technology house working toward a fairer, more
            verifiable future of knowledge. We design, build and deploy AI that businesses and
            people can actually trust.
          </p>

          <div className="md:col-span-5 flex flex-col sm:flex-row md:justify-end gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-between gap-4 bg-bone text-obsidian rounded-full px-6 py-4 text-[14px] font-medium hover:bg-ember hover:text-obsidian transition-colors duration-500"
            >
              Book a discovery call
              <ArrowUpRight size={16} />
            </a>
            <button
              onClick={onOpenFounder}
              className="inline-flex items-center justify-between gap-4 border border-bone/20 rounded-full px-6 py-4 text-[14px] text-bone hover:border-bone/60 transition-colors"
            >
              Meet the founder
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-white/5 pt-8">
          <Stat value="3" label="Three E's framework" />
          <Stat value="3" label="Ecosystem pillars" />
          <Stat value="6" label="Products in motion" />
          <Stat value="18yr" label="Operational grounding" />
        </div>

        <div className="mt-14 flex items-center gap-2 text-bone/40 text-[12px] tracking-[0.2em] uppercase">
          <ArrowDown size={14} />
          Scroll to read
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display font-semibold text-[32px] md:text-[44px] text-bone tracking-tightest">
        {value}
      </div>
      <div className="mt-1 text-[12px] text-bone/50 tracking-[0.14em] uppercase">{label}</div>
    </div>
  );
}
