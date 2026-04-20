import { ArrowUpRight, Wrench, PoundSterling, Compass } from 'lucide-react';
import type { Product } from '../lib/types';
import { PrismArtefact } from './PrismArtefact';

export function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group text-left canvas-card p-6 md:p-8 flex flex-col gap-6 hover:border-white/15 transition-all duration-500"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="relative">
        <PrismArtefact hue={product.accent_hue} seed={product.slug} imageUrl={product.artefact_url} alt={product.wordmark} />
      </div>

      <div className="flex items-center gap-3 text-[11px] tracking-[0.18em] uppercase text-bone/55">
        <span>{product.category}</span>
        <span className="h-1 w-1 rounded-full bg-bone/30" />
        <StatusChip status={product.status} />
      </div>

      <div>
        <h3 className="font-display font-semibold text-[28px] md:text-[34px] leading-[1.05] text-bone tracking-tightest">
          {product.wordmark}
        </h3>
        <p className="mt-3 font-serif italic text-[17px] md:text-[18px] text-bone/80 leading-[1.4]">
          {product.tagline}
        </p>
      </div>

      <p className="text-[14.5px] leading-[1.6] text-bone/60">{product.description}</p>

      <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
        <Feasibility icon={Wrench} label="Technical" text={product.feasibility_tech} />
        <Feasibility icon={PoundSterling} label="Economic" text={product.feasibility_econ} />
        <Feasibility icon={Compass} label="End-user" text={product.feasibility_user} />
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-[13px] text-bone/80 link-underline">
          {product.cta_label}
        </span>
        <ArrowUpRight
          size={18}
          className="text-bone/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </button>
  );
}

function StatusChip({ status }: { status: string }) {
  const color = status.toLowerCase().includes('build')
    ? 'text-ember'
    : status.toLowerCase().includes('access')
    ? 'text-prism'
    : status.toLowerCase().includes('roadmap')
    ? 'text-bone/45'
    : 'text-bone/75';
  return <span className={color}>{status}</span>;
}

function Feasibility({
  icon: Icon,
  label,
  text,
}: {
  icon: typeof Wrench;
  label: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={14} strokeWidth={1.5} className="mt-1 text-bone/45 shrink-0" />
      <div className="min-w-0">
        <span className="text-[11px] tracking-[0.18em] uppercase text-bone/40 mr-2">{label}</span>
        <span className="text-[13.5px] text-bone/70 leading-[1.55]">{text}</span>
      </div>
    </div>
  );
}
