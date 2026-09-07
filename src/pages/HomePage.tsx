import HeroSearch from '@/components/home/HeroSearch';
import CategoryIcons from '@/components/home/CategoryIcons';
import OurPicks from '@/components/home/OurPicks';
import FeaturedDeals from '@/components/home/FeaturedDeals';
import TrendingDestinations from '@/components/home/TrendingDestinations';
import USPBanner from '@/components/home/USPBanner';
import TrustpilotReviews from '@/components/home/TrustpilotReviews';
import InsidersSection from '@/components/home/InsidersSection';
import PromoBanner from '@/components/home/PromoBanner';

export default function HomePage() {
  return (
    <>
      <HeroSearch />
      <CategoryIcons />
      <OurPicks />
      <FeaturedDeals />
      <TrendingDestinations />
      <USPBanner />
      <TrustpilotReviews />
      <InsidersSection />
      <PromoBanner />
    </>
  );
}
