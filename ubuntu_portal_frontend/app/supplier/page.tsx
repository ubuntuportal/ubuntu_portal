import Footer from '@/components/buyer/Footer';
import HeroSection from '@/components/supplier/landing-page/HeroSection';
import HomeHeader from '@/components/supplier/landing-page/HomeHeader';
import Pricing from '@/components/supplier/landing-page/Pricing';
import StatsSection from '@/components/supplier/landing-page/StatsSection';
import React from 'react';

function SipplierLandingPage() {
  return (
    <main className="">
      <HomeHeader />
      <HeroSection />
      <StatsSection />
      <Pricing />
      <Footer />
    </main>
  );
}

export default SipplierLandingPage;
