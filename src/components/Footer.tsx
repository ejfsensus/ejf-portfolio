import { Triangle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-obsidian overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 pt-24 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-14">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <Triangle size={14} strokeWidth={1.75} className="text-bone" />
              <span className="text-[13px] font-medium tracking-[0.18em] text-bone">
                ETHAN JAMES FARRELL
              </span>
            </div>
            <p className="mt-6 font-serif italic text-[18px] text-bone/70 max-w-[36ch]">
              AI consulting, design &amp; deployment. Operating as OpusAI — the applied arm of
              Sensus InVista.
            </p>
          </div>

          <FooterCol
            title="Ecosystem"
            links={[
              { label: 'OpusAI', href: 'https://opusai.uk' },
              { label: 'Sensus Lab', href: 'https://sensuslab.uk' },
              { label: 'Liberty Rise', href: '#' },
            ]}
          />
          <FooterCol
            title="Aspiration"
            links={[
              { label: 'Sensus InVista', href: 'https://sensusinvista.ltd' },
              { label: 'InVista vision', href: 'https://sensusinvista.ltd' },
            ]}
          />
          <FooterCol
            title="Personal"
            links={[
              { label: 'Acuity Institute', href: 'https://acuity.institute' },
              { label: 'Ethan James Farrell', href: 'https://ethan-james.co.uk' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/ethanjamesfarrell' },
            ]}
          />
        </div>

        <div className="mt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="text-[11px] tracking-[0.18em] uppercase text-bone/45 leading-[1.8]">
            Sensus InVista Ltd · Registered Company No. 16491089<br />
            Bridge Grove, Southport, PR8 5AA · United Kingdom
          </div>
          <div className="text-[11px] tracking-[0.18em] uppercase text-bone/45">
            © {new Date().getFullYear()} Ethan James Farrell — All rights reserved
          </div>
        </div>

        <div
          aria-hidden
          className="mt-16 font-display font-semibold tracking-tightest text-bone/5 leading-[0.8] select-none whitespace-nowrap"
          style={{ fontSize: 'clamp(60px, 14vw, 200px)' }}
        >
          Ethan James Farrell
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="eyebrow mb-4">{title}</div>
      <ul className="space-y-2.5 text-[14px] text-bone/70">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="hover:text-bone transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
