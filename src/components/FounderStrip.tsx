import { ArrowUpRight, MapPin, Mail } from 'lucide-react';
import ejfPortrait from '../ejf1.png';

export function FounderStrip({ onOpen }: { onOpen: () => void }) {
  return (
    <section id="about" className="relative section-pad border-t border-white/5">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-14">
          <span className="h-px w-10 bg-bone/30" />
          <span className="eyebrow">Who you work with</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ink border border-white/5 ring-1 ring-white/5">
              <img
                src={ejfPortrait}
                alt="Ethan James Farrell"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div
                  className="font-display font-semibold text-[40px] md:text-[52px] leading-[0.95] tracking-tightest text-bone"
                  style={{ textShadow: '0 2px 24px rgba(10,10,12,0.55)' }}
                >
                  Ethan
                  <br />
                  James
                  <br />
                  Farrell
                </div>
              </div>
              <div className="absolute top-5 left-5 flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-bone/80">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-prism opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-prism" />
                </span>
                Available
              </div>
            </div>
          </div>

          <div className="md:col-span-7 md:pt-6">
            <p className="font-serif italic text-[26px] md:text-[34px] leading-[1.25] text-bone">
              Multi-faceted by design, unconventional by instinct — fuelled by innovation, guided
              by purpose.
            </p>

            <p className="mt-10 text-[17px] md:text-[18px] leading-[1.65] text-bone/70 max-w-[60ch]">
              Ethan leads the practice. OpusAI is the studio name he operates through, and the
              architecture behind Sensus InVista is his long arc. With a career spanning retail
              leadership at Telefónica (O2), business development at Vasco Carbon, and eight years
              of research facilitation at the University of Central Lancashire's Applied Health
              Research Hub, he brings a rare blend of commercial instinct, operational rigour and
              ethical grounding to applied AI.
            </p>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[13.5px] text-bone/60">
              <span className="inline-flex items-center gap-2">
                <Mail size={14} />
                ethan@sensusinvista.ltd
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} />
                Southport, United Kingdom
              </span>
            </div>

            <button
              onClick={onOpen}
              className="mt-12 group inline-flex items-center gap-3 text-[14px] text-bone link-underline"
            >
              Read Ethan's story
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
