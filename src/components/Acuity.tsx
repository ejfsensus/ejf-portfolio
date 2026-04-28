import { ArrowUpRight, Eye, BookOpen, Mic, Archive, Compass, Sparkles, PlayCircle, Youtube } from 'lucide-react';
import type { AcuityOffering, RecentVideo } from '../lib/types';

const iconFor = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('library')) return BookOpen;
  if (t.includes('philosophy')) return Eye;
  if (t.includes('webinar')) return Mic;
  if (t.includes('testimony')) return Archive;
  if (t.includes('instrument')) return Compass;
  return Sparkles;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export function Acuity({
  offerings,
  videos,
  channelHandle = 'EthanJamesFarrell_uk',
}: {
  offerings: AcuityOffering[];
  videos: RecentVideo[];
  channelHandle?: string;
}) {
  const main = offerings.filter((o) => o.category === 'offering');
  const channelUrl = `https://www.youtube.com/@${channelHandle}`;

  return (
    <section
      id="acuity"
      className="relative section-pad overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0A0A0C 0%, #0F0F12 100%)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 40% at 20% 80%, rgba(217,122,74,0.08) 0%, transparent 60%), radial-gradient(50% 40% at 85% 20%, rgba(43,42,99,0.18) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-14">
          <span className="h-px w-10 bg-bone/30" />
          <span className="eyebrow">A personal initiative · Est. 2026</span>
        </div>

        <div className="relative rounded-[28px] overflow-hidden border border-white/10 shadow-[0_50px_120px_-60px_rgba(0,0,0,0.9)]">
          <img
            src="/acuitybg.png"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,12,0.45) 0%, rgba(10,10,12,0.65) 60%, rgba(10,10,12,0.85) 100%)',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(55% 45% at 25% 30%, rgba(217,122,74,0.18) 0%, transparent 65%)',
            }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center px-6 md:px-12 py-14 md:py-20">
            <div className="md:col-span-7">
              <h2 className="font-serif italic font-light text-[44px] md:text-[80px] lg:text-[96px] leading-[0.98] text-bone">
                Acuity Institute —<br />
                pathways to wisdom.
              </h2>
              <div className="mt-10">
                <div className="text-[11px] tracking-[0.2em] uppercase text-ember/80 mb-3">
                  Constellation of trust
                </div>
                <div className="flex flex-wrap gap-2 text-[12px] text-bone/80">
                  {['Discernment', 'Foresight', 'Lucidity', 'Sagacity'].map((w) => (
                    <span key={w} className="border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm bg-black/20">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative mx-auto max-w-[380px] md:max-w-none">
                <div
                  aria-hidden
                  className="absolute -inset-6 rounded-[32px] blur-2xl opacity-70"
                  style={{
                    background:
                      'radial-gradient(60% 50% at 50% 50%, rgba(217,122,74,0.3) 0%, transparent 70%)',
                  }}
                />
                <img
                  src="/acuitycard.png"
                  alt="Acuity Institute artefact card"
                  loading="lazy"
                  decoding="async"
                  className="relative w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
                />
              </div>
            </div>
          </div>
        </div>

        <figure className="mt-20 max-w-[52ch]">
          <blockquote className="font-serif italic text-[24px] md:text-[32px] leading-[1.35] text-bone/95">
            "Quiet over loud. Technology should earn attention, not demand it. Data integrity,
            trust, and knowledge all get healthier when power is spread out."
          </blockquote>
          <figcaption className="mt-5 text-[12px] tracking-[0.2em] uppercase text-bone/55">
            — Ethan, on the standards Acuity quietly brings back to the commercial work.
          </figcaption>
        </figure>

        <p className="mt-16 max-w-[60ch] text-[17px] leading-[1.65] text-bone/80">
          Alongside the commercial work, Ethan stewards the Acuity Institute — an independent
          project dedicated to truth and the expansion of accurate knowledge. Acuity holds space
          for the parts of the journey that sit outside product roadmaps: spirituality, personal
          testimony, lived experience, and applied discernment.
        </p>

        <div className="mt-20">
          <div className="eyebrow mb-8">What Acuity offers</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {main.map((o) => {
              const Icon = iconFor(o.title);
              return (
                <div key={o.id} className="bg-obsidian/85 backdrop-blur-sm p-7 md:p-9 min-h-[220px]">
                  <Icon size={22} strokeWidth={1.25} className="text-ember/80" />
                  <div className="mt-8 font-serif italic text-[22px] text-bone">{o.title}</div>
                  <p className="mt-3 text-[14px] leading-[1.6] text-bone/70">{o.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {videos.length > 0 && (
          <div className="mt-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="eyebrow mb-3">Recent webinars · Auto-updating from YouTube</div>
                <h3 className="font-serif italic text-[28px] md:text-[36px] text-bone leading-[1.15] max-w-[28ch]">
                  Conversations from the Acuity Institute.
                </h3>
              </div>
              <a
                href={`${channelUrl}/videos`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 self-start md:self-end text-[13px] tracking-wide text-bone border border-white/20 hover:border-ember/60 rounded-full px-4 py-2 transition-colors"
              >
                <Youtube size={16} />
                View all on YouTube
                <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((v) => (
                <a
                  key={v.id}
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-obsidian/70 hover:border-ember/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(217,122,74,0.4)]"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={v.thumbnail_url}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <PlayCircle size={56} strokeWidth={1.25} className="text-bone drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 p-5">
                    <div className="text-[11px] tracking-[0.18em] uppercase text-ember/80">
                      {formatDate(v.published_at)}
                    </div>
                    <div className="font-serif italic text-[18px] leading-[1.3] text-bone line-clamp-3">
                      {v.title}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-t border-bone/15 pt-10">
          <p className="font-serif italic text-[18px] md:text-[22px] text-bone/85 max-w-[48ch]">
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
