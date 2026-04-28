import { useEffect, useState } from 'react';
import { Shield, ArrowUpRight } from 'lucide-react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#pillars', label: 'Pillars' },
  { href: '#work', label: 'Work' },
  { href: '#vision', label: 'Vision' },
  { href: '#acuity', label: 'Acuity' },
  { href: '#contact', label: 'Contact' },
];

export function Nav({ onOpenFounder }: { onOpenFounder: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-obsidian/70 border-b border-white/5' : ''
      }`}
    >
      <nav className="mx-auto max-w-[1360px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <Shield size={14} strokeWidth={1.75} className="text-bone" />
          <span className="flex flex-col leading-none">
            <span className="text-[13px] font-medium tracking-[0.18em] text-bone">
              ETHAN JAMES FARRELL
            </span>
            <span className="hidden md:block mt-1 text-[10px] tracking-[0.24em] text-bone/45">
              OPUSAI
            </span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-[12.5px] tracking-[0.14em] uppercase text-bone/60">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-bone transition-colors duration-300">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-2 text-[12px] text-bone/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-prism opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-prism" />
            </span>
            Accepting clients
          </div>
          <button
            onClick={onOpenFounder}
            className="group inline-flex items-center gap-2 text-[13px] text-bone border border-bone/20 rounded-full px-4 py-2 hover:border-bone/60 transition-colors"
          >
            Meet Ethan
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </nav>
    </header>
  );
}
