import { HeroSection } from '@/components/sections/hero';
import { ServicesSection } from '@/components/sections/services';
import { AboutUsSection } from '@/components/sections/about-us';
import { ContactSection } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <HeroSection />
      <ServicesSection />
      <AboutUsSection />
      <ContactSection />
    </div>
  );
}
