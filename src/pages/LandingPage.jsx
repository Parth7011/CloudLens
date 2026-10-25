import React from 'react';
import Navbar from '../components/Navbar.jsx';
import HeroSection from '../components/HeroSection.jsx';
import DashboardPreviewSection from '../components/DashboardPreviewSection.jsx';
import InfrastructureLayersSection from '../components/InfrastructureLayersSection.jsx';
import SavingsCalculatorSection from '../components/SavingsCalculatorSection.jsx';
import FinalCTASection from '../components/FinalCTASection.jsx';
import Footer from '../components/Footer.jsx';

export default function LandingPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#ffffff', color: '#181824' }}>
      <Navbar />
      <main>
        <HeroSection />
        <DashboardPreviewSection />
        <InfrastructureLayersSection />
        <SavingsCalculatorSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
