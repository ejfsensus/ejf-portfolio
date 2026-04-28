import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ApproachStep, Capability } from '../lib/types';

export function Approach({ steps, capabilities }: { steps: ApproachStep[]; capabilities: Capability[] }) {
  const [open, setOpen] = useState(false);
  const grouped = capabilities.reduce<Record<string, Capability[]>>((acc, c) => {
    (acc[c.category] ||= []).push(c);
    return acc;
  }, {});

  return (
    <section className="py-20 md:py-28 border-t border-white/5 bg-obsidian/60">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-10 bg-bone/30" />
          <span className="eyebrow">How OpusAI handles new projects</span>
        </div>

        <h2 className="font-display font-medium text-[22px] md:text-[32px] leading-[1.15] tracking-tightest text-bone/85 max-w-[40ch]">
          A five-step engagement model, consistent across every project.
        </h2>

        <ol className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          {steps.map((s) => (
            <li key={s.id} className="bg-obsidian/80 p-5 md:p-6 min-h-[150px] flex flex-col">
              <div className="font-display font-semibold text-[24px] text-bone/25 tracking-tightest">
                {String(s.step_number).padStart(2, '0')}
              </div>
              <div className="mt-auto">
                <div className="font-display font-medium text-[16px] text-bone tracking-tightest">
                  {s.title}
                </div>
                <p className="mt-2 text-[12.5px] leading-[1.5] text-bone/55">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-20 border-t border-white/5 pt-10">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-3 text-[13px] tracking-[0.18em] uppercase text-bone/70 hover:text-bone transition"
          >
            <span>Operational grounding behind the AI work</span>
            <ChevronDown
              size={14}
              className={`transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              open ? 'max-h-[800px] opacity-100 mt-10' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat}>
                  <div className="eyebrow mb-4">{cat}</div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((c) => (
                      <span
                        key={c.id}
                        className="text-[12.5px] text-bone/75 border border-white/10 rounded-full px-3 py-1.5"
                      >
                        {c.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
