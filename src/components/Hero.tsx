import { ArrowDown, ArrowUpRight } from 'lucide-react';
import heroVideo from '../20250717_1813_Colorful-Gradient-Dreams_loop_01k0cp05x1f2z8nwhk3pqbf7x2.mp4';

export function Hero({ onOpenFounder }: { onOpenFounder: () => void }) {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-end pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden"
    >
      <video
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,12,0.82) 0%, rgba(10,10,12,0.55) 38%, rgba(10,10,12,0.72) 78%, #0A0A0C 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-multiply"
        style={{
          background:
            'radial-gradient(65% 50% at 20% 110%, rgba(10,10,12,0.9) 0%, transparent 60%), radial-gradient(55% 45% at 85% 10%, rgba(10,10,12,0.6) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-10 bg-bone/40" />
          <span className="eyebrow text-bone/75">
            Ethan James Farrell · AI consulting, design &amp; deployment
          </span>
        </div>

        <h1
          className="font-display font-semibold text-[48px] sm:text-[72px] md:text-[112px] lg:text-[136px] leading-[0.95] tracking-tightest text-bone max-w-[13ch]"
          style={{ textShadow: '0 2px 40px rgba(10,10,12,0.55)' }}
        >
          Unique perspectives,
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
          <p className="md:col-span-7 text-[17px] md:text-[20px] leading-[1.55] text-bone/85 max-w-[58ch]">
            Ethan James Farrell is an AI consultant, designer and builder. Through{' '}
            <span className="text-bone">OpusAI</span> — the applied arm of Sensus InVista — he helps
            organisations design, build and deploy solutions they can actually trust.
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
              className="inline-flex items-center justify-between gap-4 border border-bone/30 backdrop-blur-sm bg-obsidian/20 rounded-full px-6 py-4 text-[14px] text-bone hover:border-bone/60 transition-colors"
            >
              Read Ethan's story
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-white/15 pt-8">
          <Stat value="3" label="Three E's framework" />
          <Stat value="3" label="Ecosystem pillars" />
          <Stat value="∞" label="Concepts in motion" />
          <Stat value="18yr" label="Operational grounding" />
        </div>

        <div className="mt-14 flex items-center gap-2 text-bone/55 text-[12px] tracking-[0.2em] uppercase">
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
      <div
        className="font-display font-semibold text-[32px] md:text-[44px] text-bone tracking-tightest"
        style={{ textShadow: '0 2px 24px rgba(10,10,12,0.5)' }}
      >
        {value}
      </div>
      <div className="mt-1 text-[12px] text-bone/65 tracking-[0.14em] uppercase">{label}</div>
    </div>
  );
}
