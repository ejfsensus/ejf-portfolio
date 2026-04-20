import { useState } from 'react';
import type { Product } from '../lib/types';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';

export function Products({ products }: { products: Product[] }) {
  const [active, setActive] = useState<Product | null>(null);

  return (
    <section id="work" className="section-pad border-t border-white/5 bg-obsidian">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-14">
          <span className="h-px w-10 bg-bone/30" />
          <span className="eyebrow">Product design &amp; development initiatives</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end mb-20">
          <h2 className="md:col-span-7 font-display font-semibold text-[36px] md:text-[64px] lg:text-[76px] leading-[1.02] tracking-tightest text-bone">
            Proofs of purpose,<br />
            <span className="font-serif italic font-light text-bone/80">not just concept.</span>
          </h2>
          <p className="md:col-span-5 text-[17px] leading-[1.65] text-bone/65 max-w-[52ch]">
            Each initiative demonstrates three things at once: that the technology can be built
            today, that a viable business surrounds it, and that a real human need is answered
            thoughtfully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={() => setActive(p)} />
          ))}
        </div>
      </div>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}
