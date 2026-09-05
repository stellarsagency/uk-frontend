import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { allHolidays } from '@/data/mockData';

interface SimilarPropertiesProps {
  propertyIds: string[];
}

export function SimilarProperties({ propertyIds }: SimilarPropertiesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const properties = propertyIds
    .map((id) => allHolidays.find((h) => h.id === id))
    .filter(Boolean) as typeof allHolidays;

  if (properties.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#002f17]">Similar properties</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e9e3da] bg-white text-[#818085] shadow-sm transition-all duration-200 hover:border-[#ff467c] hover:text-[#ff467c] hover:shadow-md hover:scale-105"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e9e3da] bg-white text-[#818085] shadow-sm transition-all duration-200 hover:border-[#ff467c] hover:text-[#ff467c] hover:shadow-md hover:scale-105"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {properties.map((property, idx) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            style={{ scrollSnapAlign: 'start' }}
          >
            <Link
              to={`/property/${property.id}`}
              className="group block w-72 flex-shrink-0 overflow-hidden rounded-lg border border-[#e9e3da] bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                {property.originalPrice && (
                  <div className="absolute left-3 top-3 rounded bg-[#ff467c] px-3 py-1 text-xs font-bold text-white">
                    Save {formatPrice(property.originalPrice - property.price)}
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#002f17] line-clamp-1 transition-colors group-hover:text-[#ff467c]">
                  {property.name}
                </h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#555]">
                  <MapPin className="h-3.5 w-3.5 text-[#818085]" />
                  <span className="truncate">
                    {property.destination}, {property.country}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center gap-0.5">
                  {Array.from({ length: property.starRating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#ff467c] text-[#ff467c]" />
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-[#002f17]">{formatPrice(property.price)}</span>
                    <span className="text-xs text-[#818085]">pp</span>
                  </div>
                  {property.reviewCount > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="flex h-6 min-w-[24px] items-center justify-center rounded bg-[#ff467c] px-1.5 text-xs font-bold text-white">
                        {property.rating}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
