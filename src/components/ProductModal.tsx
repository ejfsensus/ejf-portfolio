import { useEffect } from 'react';
import { X, ArrowUpRight, Wrench, PoundSterling, Compass, Users } from 'lucide-react';
import type { Product } from '../lib/types';
import { PrismArtefact } from './PrismArtefact';

export function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.wordmark} — product brief`}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-obsidian/80 backdrop-blur-md"
      />
      <div className="relative z-10 w-full max-w-[880px] max-h-[92vh] overflow-y-auto canvas-card border-white/10">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 py-5 bg-ink/95 backdrop-blur border-b border-white/5">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.18em] uppercase text-bone/55">
            <span>{product.category}</span>
            <span className="h-1 w-1 rounded-full bg-bone/30" />
            <span>{product.status}</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 md:p-10">
          <PrismArtefact hue={product.accent_hue} seed={product.slug} imageUrl={product.artefact_url} alt={product.wordmark} />

          <h2 className="mt-10 font-display font-semibold text-[36px] md:text-[54px] leading-[1.02] text-bone tracking-tightest">
            {product.wordmark}
          </h2>
          <p className="mt-4 font-serif italic text-[20px] md:text-[24px] text-bone/85 leading-[1.35]">
            {product.tagline}
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <div className="eyebrow mb-3">What it is</div>
              <p className="text-[16px] leading-[1.65] text-bone/75">{product.description}</p>

              <div className="eyebrow mt-10 mb-3 flex items-center gap-2">
                <Users size={12} />
                Who it's for
              </div>
              <p className="text-[15.5px] leading-[1.6] text-bone/70">{product.audience}</p>
            </div>

            <div className="md:col-span-5 space-y-5 md:border-l md:border-white/5 md:pl-8">
              <Row icon={Wrench} title="Technical feasibility" body={product.feasibility_tech} />
              <Row icon={PoundSterling} title="Economic viability" body={product.feasibility_econ} />
              <Row icon={Compass} title="End-user focus" body={product.feasibility_user} />
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center justify-between gap-4 bg-bone text-obsidian rounded-full px-6 py-3.5 text-[13.5px] font-medium hover:bg-ember transition-colors"
            >
              Talk about this product
              <ArrowUpRight size={16} />
            </a>
            {product.cta_href && product.cta_href !== '#' && (
              <a
                href={product.cta_href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between gap-4 border border-white/15 rounded-full px-6 py-3.5 text-[13.5px] text-bone hover:border-white/40 transition-colors"
              >
                {product.cta_label}
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Wrench;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-bone/50 mb-2">
        <Icon size={12} strokeWidth={1.5} />
        {title}
      </div>
      <p className="text-[14.5px] leading-[1.6] text-bone/75">{body}</p>
    </div>
  );
}
