/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Services } from './components/Services';
import { AboutShop } from './components/AboutShop';
import { InsuranceAdvocacy } from './components/InsuranceAdvocacy';
import { ReviewsAndTrust } from './components/ReviewsAndTrust';
import { EstimateCalculator } from './components/EstimateCalculator';
import { LocationAndHours } from './components/LocationAndHours';
import { Footer } from './components/Footer';
import { MobileFloatingBar } from './components/MobileFloatingBar';

export default function App() {
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);

  const handleOpenEstimate = () => {
    setIsEstimateModalOpen(true);
  };

  const handleCloseEstimate = () => {
    setIsEstimateModalOpen(false);
  };

  const handleSelectService = (serviceId: string) => {
    const estimateElement = document.getElementById('estimate');
    if (estimateElement) {
      estimateElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsEstimateModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A1D20] font-sans selection:bg-[#E7A622]/30 selection:text-[#16203B]">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar onOpenEstimate={handleOpenEstimate} />

      <main className="flex-1">
        {/* 10-Second Hero: What We Are, What We Do, How To Get Service */}
        <Hero onOpenEstimate={handleOpenEstimate} />

        {/* 3-Step Clear Action Flow */}
        <HowItWorks onOpenEstimate={handleOpenEstimate} />

        {/* Verified Auto Body & Repair Services */}
        <Services onSelectService={handleSelectService} />

        {/* About Our Torrance Shop & Authentic Facility Atmosphere */}
        <AboutShop />

        {/* California Insurance Claims & Code § 758.5 Rights */}
        <InsuranceAdvocacy onOpenEstimate={handleOpenEstimate} />

        {/* Real Customer Feedback (Verified 4.7 Google Rating) */}
        <ReviewsAndTrust />

        {/* Free Online Estimate Calculator */}
        <EstimateCalculator />

        {/* Shop Hours, Live Status, Location Map & Inquiry */}
        <LocationAndHours />
      </main>

      {/* Global Footer */}
      <Footer onOpenEstimate={handleOpenEstimate} />

      {/* Mobile Floating Bottom Bar (<15% Mobile Viewport) */}
      <MobileFloatingBar onOpenEstimate={handleOpenEstimate} />

      {/* Full Estimate Modal */}
      {isEstimateModalOpen && (
        <EstimateCalculator
          isModal={true}
          isOpen={isEstimateModalOpen}
          onClose={handleCloseEstimate}
        />
      )}
    </div>
  );
}
