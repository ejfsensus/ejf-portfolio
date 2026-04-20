import { useEffect, useState } from 'react';
import { X, ArrowUpRight, Mail, Linkedin, MapPin, Phone } from 'lucide-react';
import type { Experience } from '../lib/types';

const TABS = ['Introduction', 'Why this work', 'Experience', 'Capabilities', 'Beyond', 'Contact'] as const;
type Tab = (typeof TABS)[number];

export function FounderModal({
  open,
  onClose,
  experience,
}: {
  open: boolean;
  onClose: () => void;
  experience: Experience[];
}) {
  const [tab, setTab] = useState<Tab>('Introduction');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Meet the founder — Ethan James Farrell"
    >
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-obsidian/80 backdrop-blur-md" />

      <div className="relative z-10 w-full max-w-[760px] max-h-[94vh] overflow-y-auto canvas-card border-white/10">
        <header className="sticky top-0 z-10 bg-ink/95 backdrop-blur border-b border-white/5">
          <div className="px-6 md:px-10 py-6 flex items-start gap-5">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-obsidian border border-white/10">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(217,122,74,0.6) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(43,42,99,0.7) 0%, transparent 60%)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-serif italic text-bone/80">
                EF
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-semibold text-[22px] text-bone tracking-tight">
                  Ethan James Farrell
                </h2>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-prism/90 border border-prism/30 rounded-full px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-prism" />
                  Accepting clients
                </span>
              </div>
              <div className="text-[13px] text-bone/60 mt-1">
                Founder · Sensus InVista · OpusAI · Southport, UK
              </div>
              <p className="mt-3 font-serif italic text-[15px] text-bone/80 leading-[1.4]">
                Multi-faceted by design, unconventional by instinct — fuelled by innovation, guided
                by purpose.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="px-6 md:px-10 flex gap-2 md:gap-6 overflow-x-auto no-scrollbar border-t border-white/5">
            {TABS.map((t) => {
              const active = t === tab;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative py-4 text-[12.5px] tracking-[0.14em] uppercase whitespace-nowrap transition-colors ${
                    active ? 'text-bone' : 'text-bone/50 hover:text-bone/80'
                  }`}
                >
                  {t}
                  {active && (
                    <span aria-hidden className="absolute left-0 right-0 bottom-0 h-[2px] bg-ember" />
                  )}
                </button>
              );
            })}
          </nav>
        </header>

        <div className="p-6 md:p-10 min-h-[320px]">
          {tab === 'Introduction' && <Introduction />}
          {tab === 'Why this work' && <Why />}
          {tab === 'Experience' && <ExperienceList experience={experience} />}
          {tab === 'Capabilities' && <Capabilities />}
          {tab === 'Beyond' && <Beyond />}
          {tab === 'Contact' && <ContactTab />}
        </div>
      </div>
    </div>
  );
}

function Introduction() {
  return (
    <div className="space-y-8">
      <div>
        <div className="eyebrow mb-3">Short bio</div>
        <p className="text-[16px] leading-[1.7] text-bone/80">
          Ethan is the founder of OpusAI and the architect of the Sensus InVista vision. Across
          eighteen years of work — from retail leadership at Telefónica (O2), through business
          development at Vasco Carbon, to eight years of research facilitation at the University of
          Central Lancashire's Applied Health Research Hub — he has built a rare mix of commercial
          instinct, operational rigour and ethical grounding. OpusAI is where that combination
          becomes applied AI that businesses, teams and individuals can actually trust.
        </p>
      </div>
      <div>
        <div className="eyebrow mb-3">What he's building right now</div>
        <ul className="space-y-3 text-[15px] leading-[1.6] text-bone/75">
          <li><strong className="text-bone">OpusAI</strong> — AI consulting, design and deployment, guided by the Three E's: Ethical, Effective, Equitable.</li>
          <li><strong className="text-bone">ObsidianAI &amp; .studio</strong> — productised platforms bringing enterprise-grade AI into reach for teams of any size.</li>
          <li><strong className="text-bone">Sensus Lab</strong> — the experimental R&amp;D pillar feeding tomorrow's work.</li>
          <li><strong className="text-bone">Sensus InVista / InVista</strong> — the long-arc vision: a verifiable, blockchain-backed knowledge network.</li>
          <li><strong className="text-bone">Acuity Institute</strong> — a personal initiative holding space for philosophy, testimony and applied discernment.</li>
        </ul>
      </div>
      <div>
        <div className="eyebrow mb-3">How he works with clients</div>
        <p className="text-[15px] leading-[1.6] text-bone/70">
          Calm, methodical, pragmatic. Every engagement begins with a free, pressure-free
          discovery call. Expect clear thinking, honest timelines, and work that is built to last
          rather than built to impress.
        </p>
      </div>
    </div>
  );
}

function Why() {
  const principles = [
    { w: 'Ethical', q: 'Privacy and fairness aren\'t features you add on. They\'re the starting point.' },
    { w: 'Effective', q: 'If it doesn\'t save time, unlock revenue, or create real capacity, I\'ll tell you — and we won\'t ship it.' },
    { w: 'Equitable', q: 'Small teams deserve the same quality of thinking as enterprises. Pricing, access, and attention should reflect that.' },
  ];
  return (
    <div className="space-y-10">
      <p className="font-serif italic text-[22px] md:text-[26px] leading-[1.35] text-bone">
        "Advanced technology shouldn't feel complicated, extractive, or exclusive. I build AI that
        keeps humanity at the core — not the other way round."
      </p>
      <div className="space-y-6">
        {principles.map((p) => (
          <div key={p.w} className="border-l-2 border-ember/70 pl-5">
            <div className="font-display font-semibold text-[18px] text-bone">{p.w}</div>
            <p className="mt-1 font-serif italic text-[15.5px] text-bone/75 leading-[1.5]">{p.q}</p>
          </div>
        ))}
      </div>
      <div>
        <div className="eyebrow mb-3">What informs the perspective</div>
        <p className="text-[15px] leading-[1.65] text-bone/70">
          Ethan's path into ethical AI hasn't been purely academic. It has been shaped by years of
          close operational work inside public-sector research, by direct experience of how
          systems and data can be mishandled when accountability is thin, and by a disciplined
          personal practice of reflection. That combination — commercial, operational, human — is
          why OpusAI's work on privacy, data integrity and human oversight is lived rather than
          theoretical.
        </p>
      </div>
    </div>
  );
}

function ExperienceList({ experience }: { experience: Experience[] }) {
  return (
    <div className="space-y-8">
      <div className="eyebrow">A condensed CV</div>
      <ol className="space-y-8">
        {experience.map((e) => (
          <li key={e.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t border-white/10 pt-6">
            <div className="md:col-span-4 text-[12px] tracking-[0.18em] uppercase text-bone/50">
              {e.period}
            </div>
            <div className="md:col-span-8">
              <div className="font-display font-semibold text-[18px] text-bone tracking-tight">
                {e.role}
              </div>
              <div className="mt-1 text-[13.5px] text-bone/60">{e.organisation}</div>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-bone/70">{e.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Capabilities() {
  const groups: Record<string, string[]> = {
    'Strategy & delivery': [
      'Strategic planning', 'Process improvement', 'Operational mapping', 'Tool selection',
      'Project management', 'Reporting & analysis',
    ],
    'Operations & finance': [
      'Admin operations', 'CRM (Salesforce, HubSpot)', 'ERP (Unit4)', 'Budgeting', 'Compliance',
    ],
    Technology: [
      'Web & domain management', 'DNS / hosting / CMS', 'Automation & APIs', 'AI-integrated workflows',
      'Mac OS + Windows fluency',
    ],
    'People & communication': [
      'Training design', 'Inclusion & accessibility', 'Consultative selling', 'Executive presentation',
    ],
    'Events & engagement': [
      'Full event lifecycle', 'Bespoke booking systems', 'On-the-day execution', 'Risk & safety',
    ],
  };
  return (
    <div className="space-y-8">
      {Object.entries(groups).map(([cat, items]) => (
        <div key={cat}>
          <div className="eyebrow mb-3">{cat}</div>
          <div className="flex flex-wrap gap-2">
            {items.map((i) => (
              <span key={i} className="text-[12.5px] text-bone/75 border border-white/10 rounded-full px-3 py-1.5">
                {i}
              </span>
            ))}
          </div>
        </div>
      ))}
      <a
        href="https://ethan-james.co.uk"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-[13px] text-bone link-underline"
      >
        See full capability map at ethan-james.co.uk
        <ArrowUpRight size={14} />
      </a>
    </div>
  );
}

function Beyond() {
  return (
    <div className="space-y-8">
      <div>
        <div className="eyebrow mb-3">Acuity Institute — a personal initiative</div>
        <p className="text-[15.5px] leading-[1.65] text-bone/75">
          Alongside the commercial work, Ethan stewards the Acuity Institute — pathways to wisdom
          through library, philosophy, and webinars. Acuity holds space for spirituality, lived
          testimony, and applied discernment — the parts of the journey that don't belong on a
          product roadmap but quietly shape the standards he brings to everything else.
        </p>
        <a
          href="https://acuity.institute"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-[13px] text-bone link-underline"
        >
          Visit acuity.institute
          <ArrowUpRight size={14} />
        </a>
      </div>
      <div>
        <div className="eyebrow mb-3">Values he keeps coming back to</div>
        <ul className="space-y-3 text-[15px] leading-[1.6] text-bone/75 font-serif italic">
          <li>Quiet over loud. Technology should earn attention, not demand it.</li>
          <li>Decentralise what matters. Data integrity, trust, and knowledge thrive when power is spread out.</li>
          <li>Forgiveness is a given; honesty is non-negotiable.</li>
          <li>Refuse to sell yourself short — or anyone else.</li>
        </ul>
      </div>
      <div>
        <div className="eyebrow mb-3">A note on resilience</div>
        <p className="text-[15px] leading-[1.65] text-bone/70">
          Ethan is open about the fact that the last few years have required him to rebuild —
          professionally, personally, spiritually. The work at OpusAI is deliberately shaped by
          that: every system is designed with the assumption that people are the most important
          variable, and that protecting them is the whole point.
        </p>
      </div>
    </div>
  );
}

function ContactTab() {
  return (
    <div className="space-y-8">
      <p className="font-serif italic text-[20px] md:text-[24px] leading-[1.4] text-bone">
        "If you feel you can contribute meaningfully — as a client, a collaborator, or an
        investor — schedule a call. Let's shape what's next together."
      </p>

      <ul className="space-y-4 text-[15px] text-bone/80">
        <li className="flex items-center gap-3"><Mail size={15} className="text-bone/60" /> ethan@sensusinvista.ltd</li>
        <li className="flex items-center gap-3"><Linkedin size={15} className="text-bone/60" /> linkedin.com/in/ethanjamesfarrell</li>
        <li className="flex items-center gap-3"><MapPin size={15} className="text-bone/60" /> Bridge Grove, Southport, PR8 5AA, UK</li>
        <li className="flex items-center gap-3"><Phone size={15} className="text-bone/60" /> +44 (0) 20 3769 1450</li>
      </ul>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <a
          href="#contact"
          className="inline-flex items-center justify-between gap-4 bg-bone text-obsidian rounded-full px-6 py-3.5 text-[13.5px] font-medium hover:bg-ember transition-colors"
        >
          Book a call
          <ArrowUpRight size={16} />
        </a>
        <a
          href="https://ethan-james.co.uk"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-between gap-4 border border-white/15 rounded-full px-6 py-3.5 text-[13.5px] text-bone hover:border-white/40 transition-colors"
        >
          Full profile
          <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
}
