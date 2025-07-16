import { HeroSection } from '@/components/sections/hero';
import { ServicesSection } from '@/components/sections/services';
import { PricingSection } from '@/components/sections/pricing';
import { AboutUsSection } from '@/components/sections/about-us';
import { ContactSection } from '@/components/sections/contact';
import { FaqSection } from '@/components/sections/faq';

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <FaqSection />
      <AboutUsSection />
      <ContactSection />
    </div>
  );
}
