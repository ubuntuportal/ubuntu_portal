import HeroSection from '@/components/supplier/landing-page/HeroSection';
import HomeHeader from '@/components/supplier/landing-page/HomeHeader';
import StatsSection from '@/components/supplier/landing-page/StatsSection';
import React from 'react';

function SipplierLandingPage() {
  return (
    <main className="">
      <HomeHeader />
      <HeroSection />
      <StatsSection />
    </main>
  );
}

export default SipplierLandingPage;
