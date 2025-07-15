import { HeroSection } from '@/components/sections/hero';
import { ServicesSection } from '@/components/sections/services';
import { SuccessStoriesSection } from '@/components/sections/success-stories';
import { PricingSection } from '@/components/sections/pricing';
import { AboutUsSection } from '@/components/sections/about-us';
import { ContactSection } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <HeroSection />
      <ServicesSection />
      <SuccessStoriesSection />
      <PricingSection />
      <AboutUsSection />
      <ContactSection />
    </div>
  );
}
