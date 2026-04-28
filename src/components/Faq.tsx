import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { Faq as FaqType } from '../lib/types';

export function Faq({ items }: { items: FaqType[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section className="relative section-pad border-t border-white/10 overflow-hidden bg-bone/[0.04]">
      <span aria-hidden className="absolute top-0 left-0 right-0 h-[2px] prism-bar opacity-50" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 50% at 80% 0%, rgba(63,184,176,0.07) 0%, transparent 60%), radial-gradient(50% 40% at 10% 100%, rgba(217,122,74,0.06) 0%, transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-14">
          <span className="h-px w-10 bg-bone/30" />
          <span className="eyebrow">Ask anything · Frequently asked</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <h2 className="md:col-span-5 font-display font-semibold text-[36px] md:text-[52px] leading-[1.05] tracking-tightest text-bone">
            Plain language.<br />
            <span className="font-serif italic font-light text-bone/80">No surprises.</span>
          </h2>

          <div className="md:col-span-7">
            <div className="border-t border-white/10">
              {items.map((f) => {
                const isOpen = open === f.id;
                return (
                  <div key={f.id} className="border-b border-white/10">
                    <button
                      onClick={() => setOpen(isOpen ? null : f.id)}
                      className="w-full flex items-start justify-between gap-6 text-left py-6 group"
                    >
                      <span className="font-display text-[18px] md:text-[22px] text-bone tracking-tight leading-[1.3]">
                        {f.question}
                      </span>
                      <span className="mt-1 shrink-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-bone/70 group-hover:border-white/40 transition">
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isOpen ? 'max-h-60 opacity-100 pb-6' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-[15.5px] leading-[1.65] text-bone/65 max-w-[62ch]">
                        {f.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
