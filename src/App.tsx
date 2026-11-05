import { useCallback, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileFloatingBar } from './components/layout/MobileFloatingBar';
import { Hero } from './components/sections/Hero';
import { HowItWorks } from './components/sections/HowItWorks';
import { Services } from './components/sections/Services';
import { AboutShop } from './components/sections/AboutShop';
import { InsuranceAdvocacy } from './components/sections/InsuranceAdvocacy';
import { ReviewsAndTrust } from './components/sections/ReviewsAndTrust';
import { EstimateCalculator } from './components/sections/EstimateCalculator';
import { LocationAndHours } from './components/sections/LocationAndHours';
import type { ServiceId } from './content/services';

export default function App() {
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [preselect, setPreselect] = useState<{ id: ServiceId; nonce: number }>();

  const handleOpenEstimate = useCallback(() => setIsEstimateModalOpen(true), []);
  const handleCloseEstimate = useCallback(() => setIsEstimateModalOpen(false), []);

  // Pre-fill the inline wizard's damage type and scroll to it.
  const handleSelectService = useCallback((id: ServiceId) => {
    setPreselect((prev) => ({ id, nonce: (prev?.nonce ?? 0) + 1 }));
    document.getElementById('estimate')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-vcream text-vink font-sans selection:bg-vamber/30 selection:text-vnavy">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-vamber focus:text-vnavy focus:font-bold focus:rounded-md"
      >
        Skip to main content
      </a>

      <Navbar onOpenEstimate={handleOpenEstimate} />

      <main id="main" className="flex-1">
        <Hero onOpenEstimate={handleOpenEstimate} />
        <HowItWorks onOpenEstimate={handleOpenEstimate} />
        <Services onSelectService={handleSelectService} />
        <AboutShop />
        <InsuranceAdvocacy onOpenEstimate={handleOpenEstimate} />
        <ReviewsAndTrust />
        <EstimateCalculator preselect={preselect} />
        <LocationAndHours />
      </main>

      <Footer onOpenEstimate={handleOpenEstimate} />
      <MobileFloatingBar onOpenEstimate={handleOpenEstimate} />

      {isEstimateModalOpen && <EstimateCalculator isModal onClose={handleCloseEstimate} />}

      <Analytics />
    </div>
  );
}
