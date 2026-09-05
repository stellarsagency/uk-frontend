import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Clock, Plane, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { featuredHolidays } from '@/data/mockData';
import { useWishlist } from '@/hooks/useWishlist';
import type { HolidayPackage } from '@/types';

function ArrowButton({ label, href, white }: { label: string; href: string; white?: boolean }) {
  return (
    <Link
      to={href}
      className={cn(
        'group/btn inline-flex items-center gap-3 font-bold text-sm transition-all duration-300',
        white
          ? 'text-white hover:text-[#ffd4e4]'
          : 'text-[#ff467c] hover:text-[#e63d6f]'
      )}
    >
      <span>{label}</span>
      <span className="relative flex items-center justify-center w-0 group-hover/btn:w-6 transition-all duration-300 overflow-hidden">
        <span className="absolute right-0 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-current opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
      </span>
    </Link>
  );
}

function DealCard({ holiday, index }: { holiday: HolidayPackage; index: number }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const liked = isInWishlist(holiday.id);
  const discount = holiday.originalPrice
    ? Math.round(((holiday.originalPrice - holiday.price) / holiday.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[360px]"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-[#e9e3da]/50">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={holiday.image}
            alt={holiday.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            {discount > 0 && (
              <span className="px-3 py-1.5 rounded-full bg-[#ff467c] text-white text-xs font-bold shadow-lg shadow-[#ff467c]/30">
                {discount}% OFF
              </span>
            )}
            <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-[#002f17]">
              {holiday.boardType}
            </span>
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(holiday);
            }}
            className={cn(
              'absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110',
              liked
                ? 'bg-[#ff467c] text-white shadow-lg shadow-[#ff467c]/30'
                : 'bg-white/90 backdrop-blur-sm text-[#002f17]/60 hover:text-[#ff467c]'
            )}
          >
            <Heart className={cn('w-5 h-5', liked && 'fill-current')} />
          </button>

          {/* Bottom badges */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-[#002f17]">{holiday.rating}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff467c] mb-1">
            {holiday.destination}, {holiday.country}
          </p>
          <h3 className="text-lg font-semibold text-[#002f17] mb-2 leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {holiday.name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-4 h-4',
                  i < holiday.starRating
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-[#e9e3da] fill-[#e9e3da]'
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-[#002f17]/50 mb-4" style={{ lineHeight: '1.618' }}>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {holiday.duration} nights
            </span>
            <span className="flex items-center gap-1">
              <Plane className="w-3.5 h-3.5" />
              {holiday.flightDetails?.departure.airport || 'UK'}
            </span>
          </div>

          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-3">
              {holiday.originalPrice && (
                <span className="text-sm text-[#002f17]/30 line-through">
                  {formatPrice(holiday.originalPrice)}
                </span>
              )}
              <span className="text-2xl font-bold text-[#002f17]">
                {formatPrice(holiday.price)}
              </span>
              <span className="text-sm text-[#002f17]/50">pp</span>
            </div>

            <ArrowButton label="View Deal" href={`/holiday/${holiday.id}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedDeals() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 390;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-[#faf5ed] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002f17] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Our Handpicked Selection
          </h2>
          <div className="w-20 h-1 bg-[#ff467c] rounded-full mx-auto mb-5" />
          <p className="text-[#002f17]/60 text-lg max-w-xl mx-auto" style={{ lineHeight: '1.618' }}>
            Exclusive deals curated by our travel experts
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-xl shadow-[#002f17]/10 items-center justify-center text-[#002f17]/60 hover:text-[#ff467c] hover:scale-110 transition-all duration-300 border border-[#e9e3da]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          >
            {featuredHolidays.map((holiday, i) => (
              <div key={holiday.id} className="snap-start">
                <DealCard holiday={holiday} index={i} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-xl shadow-[#002f17]/10 items-center justify-center text-[#002f17]/60 hover:text-[#ff467c] hover:scale-110 transition-all duration-300 border border-[#e9e3da]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
