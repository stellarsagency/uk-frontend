import { motion } from 'framer-motion';
import HeroSearch from '@/components/home/HeroSearch';
import TrustBadges from '@/components/home/TrustBadges';
import FeaturedDeals from '@/components/home/FeaturedDeals';
import PopularDestinations from '@/components/home/PopularDestinations';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import FlightFreeSection from '@/components/home/FlightFreeSection';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import TrustpilotReviews from '@/components/home/TrustpilotReviews';
import InsidersSection from '@/components/home/InsidersSection';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSearch />
      <TrustBadges />
      <FeaturedDeals />
      <PopularDestinations />
      <WhyChooseUs />
      <FlightFreeSection />
      <TrustpilotReviews />
      <InsidersSection />
      <NewsletterSignup />
    </motion.div>
  );
}
