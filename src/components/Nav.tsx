import { useEffect, useState } from 'react';
import { Shield, ArrowUpRight, Menu, X } from 'lucide-react';

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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled || mobileOpen ? 'backdrop-blur-xl bg-obsidian/85 border-b border-white/5' : ''
      }`}
    >
      <nav className="mx-auto max-w-[1360px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <Shield size={14} strokeWidth={1.75} className="text-bone" />
          <span className="flex flex-col leading-none">
            <span className="text-[13px] font-medium tracking-[0.18em] text-bone">
              ETHAN JAMES FARRELL
            </span>
            <span className="hidden md:block mt-1 text-[10px] tracking-[0.24em] text-bone/60">
              OPUSAI
            </span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-[12.5px] tracking-[0.14em] uppercase text-bone/70">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-bone transition-colors duration-300">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <div className="hidden sm:flex items-center gap-2 text-[12px] text-bone/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-prism opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-prism" />
            </span>
            Accepting clients
          </div>
          <button
            onClick={onOpenFounder}
            className="group hidden md:inline-flex items-center gap-2 text-[13px] text-bone border border-bone/20 rounded-full px-4 py-2 hover:border-bone/60 transition-colors min-h-[44px]"
          >
            Meet Ethan
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-bone/20 text-bone hover:border-bone/60 transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 bg-obsidian/95 backdrop-blur-xl transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="px-6 py-8 flex flex-col gap-1 h-full overflow-y-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-4 text-[18px] tracking-tight text-bone/85 hover:text-bone border-b border-white/10"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenFounder();
            }}
            className="mt-8 inline-flex items-center justify-between gap-3 bg-bone text-obsidian rounded-full px-5 py-3.5 text-[14px] font-medium hover:bg-ember transition-colors min-h-[48px]"
          >
            Meet Ethan
            <ArrowUpRight size={16} />
          </button>
          <div className="mt-6 flex items-center gap-2 text-[12px] text-bone/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-prism opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-prism" />
            </span>
            Accepting clients
          </div>
        </div>
      </div>
    </header>
  );
}
