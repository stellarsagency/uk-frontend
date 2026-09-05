import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { trendingDestinations } from '@/data/mockData';

export default function FlightFreeSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const checkScroll = () => {
      setShowLeftFade(el.scrollLeft > 10);
      setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    };
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth < 768 ? window.innerWidth * 0.85 : 380;
      scrollRef.current.scrollBy({ left: dir === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #002f17 0%, #001a0d 100%)' }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff467c] rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff467c] rounded-full blur-[128px] opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Trending Last Minute
            </h2>
            <p className="text-white/50 text-lg" style={{ lineHeight: '1.618' }}>
              Spontaneous escapes at unbeatable prices
            </p>
          </motion.div>

          <div className="hidden md:flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              disabled={showLeftFade === false}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#ff467c] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={showRightFade === false}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#ff467c] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Mobile fade edges */}
          {showLeftFade && (
            <div className="md:hidden absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#002f17] to-transparent z-10 pointer-events-none" />
          )}
          {showRightFade && (
            <div className="md:hidden absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#001a0d] to-transparent z-10 pointer-events-none" />
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          >
            {trendingDestinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[calc(33.333%-16px)] snap-start"
              >
                <Link
                  to={`/search?destination=${encodeURIComponent(dest.name)}`}
                  className="group block relative aspect-[4/5] md:aspect-[4/5] rounded-2xl overflow-hidden"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002f17]/80 via-[#002f17]/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                    <div className="flex items-center gap-1.5 text-white/60 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      {dest.country}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {dest.name}
                    </h3>
                    <p className="text-white/50 text-sm mb-4 line-clamp-2 hidden sm:block" style={{ lineHeight: '1.618' }}>
                      {dest.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-white/80 text-sm">
                        From{' '}
                        <span className="text-white font-bold text-lg">
                          {formatPrice(dest.startingPrice)}
                        </span>{' '}
                        pp
                      </p>
                      <span className="px-5 py-2.5 rounded-full bg-white text-[#002f17] font-bold text-sm group-hover:bg-[#ff467c] group-hover:text-white transition-all duration-300">
                        Book Now
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
