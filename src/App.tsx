import { useState } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { FounderStrip } from './components/FounderStrip';
import { Positioning } from './components/Positioning';
import { Pillars } from './components/Pillars';
import { Products } from './components/Products';
import { Approach } from './components/Approach';
import { Vision } from './components/Vision';
import { Acuity } from './components/Acuity';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FounderModal } from './components/FounderModal';
import { CursorGlass } from './components/CursorGlass';
import { usePortfolioData } from './lib/usePortfolioData';

export default function App() {
  const data = usePortfolioData();
  const [founderOpen, setFounderOpen] = useState(false);

  return (
    <div className="bg-obsidian text-bone min-h-screen">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Nav onOpenFounder={() => setFounderOpen(true)} />
      <main id="main-content">
        <Hero onOpenFounder={() => setFounderOpen(true)} />
        <FounderStrip onOpen={() => setFounderOpen(true)} />
        <Positioning />
        <Pillars pillars={data.pillars} />
        <Products products={data.products} />
        <Approach steps={data.steps} capabilities={data.capabilities} />
        <Vision />
        <Acuity offerings={data.acuity} videos={data.recentVideos} />
        <Faq items={data.faqs} />
        <Contact />
      </main>
      <Footer />

      <FounderModal
        open={founderOpen}
        onClose={() => setFounderOpen(false)}
        experience={data.experience}
      />
      <CursorGlass />
    </div>
  );
}
